import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  restaurantId: string;
  itemId: string;
  name: string;
  price: number;
  qty: number;
};

const STORAGE_KEY = 'flash.cart.v1';

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

  const add: CartContextType['add'] = (restaurantId, itemId, name, price, delta = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.restaurantId === restaurantId && it.itemId === itemId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + delta };
        if (next[idx].qty <= 0) return next.filter((_, i) => i !== idx);
        return next;
      }
      return [...prev, { restaurantId, itemId, name, price, qty: delta }];
    });
  };

  const remove: CartContextType['remove'] = (restaurantId, itemId, delta = 1) => {
    add(restaurantId, itemId, '', 0, -delta);
  };

  const clear = () => setItems([]);

  return <CartContext.Provider value={{ items, add, remove, clear }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
