import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  restaurantId: string;
  itemId: string;
  name: string;
  price: number;
  qty: number;
};

const STORAGE_KEY = 'flash.cart.v1';
const METRICS_KEY = 'flash.metrics.restaurantCounts.v1';

type RestCount = Record<string, number>;

async function incrementRestaurantCount(restaurantId: string, delta: number) {
  try {
    const raw = await AsyncStorage.getItem(METRICS_KEY);
    const obj: RestCount = raw ? JSON.parse(raw) : {};
    obj[restaurantId] = Math.max(0, (obj[restaurantId] || 0) + delta);
    await AsyncStorage.setItem(METRICS_KEY, JSON.stringify(obj));
  } catch {}
}

type CartContextType = {
  items: CartItem[];
  add: (restaurantId: string, itemId: string, name: string, price: number, delta?: number) => void;
  remove: (restaurantId: string, itemId: string, delta?: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // load persisted cart
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  // persist cart
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items]);

  const add: CartContextType['add'] = useCallback((restaurantId, itemId, name, price, delta = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.restaurantId === restaurantId && it.itemId === itemId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + delta };
        if (next[idx].qty <= 0) return next.filter((_, i) => i !== idx);
        // fire-and-forget: update metrics when increasing qty
        if (delta > 0) incrementRestaurantCount(restaurantId, delta);
        return next;
      }
      // new item added
      if (delta > 0) incrementRestaurantCount(restaurantId, delta);
      return [...prev, { restaurantId, itemId, name, price, qty: delta }];
    });
  }, []);

  const remove: CartContextType['remove'] = useCallback((restaurantId, itemId, delta = 1) => {
    add(restaurantId, itemId, '', 0, -delta);
  }, [add]);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, add, remove, clear }), [items, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
