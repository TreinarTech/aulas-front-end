import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OrderItem = { itemId: string; name: string; qty: number; price: number; restaurantId: string };
type History = { status: string; at: number };
type Order = { id: string; createdAt: number; total: number; status: string; items: OrderItem[]; history?: History[] };

const ORDERS_KEY = 'flash.orders.v1';
const FLOW = [
  { id: 'placed', label: 'Pedido realizado' },
  { id: 'preparing', label: 'Preparando' },
  { id: 'on_the_way', label: 'A caminho' },
  { id: 'delivered', label: 'Entregue' },
] as const;

export default function OrderTrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem(ORDERS_KEY);
    const list: Order[] = raw ? JSON.parse(raw) : [];
    setOrder(list.find((o) => o.id === id) || null);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const currentIndex = useMemo(() => FLOW.findIndex((s) => s.id === order?.status), [order]);
  const canAdvance = currentIndex >= 0 && currentIndex < FLOW.length - 1;

  const advance = useCallback(async () => {
    if (!order || !canAdvance) return;
    const nextStatus = FLOW[currentIndex + 1].id;
    const raw = await AsyncStorage.getItem(ORDERS_KEY);
    const list: Order[] = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((o) => o.id === order.id);
    if (idx >= 0) {
      const updated: Order = {
        ...list[idx],
        status: nextStatus,
        history: [...(list[idx].history || []), { status: nextStatus, at: Date.now() }],
      };
      list[idx] = updated;
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(list));
      setOrder(updated);
    }
  }, [order, canAdvance, currentIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Acompanhar pedido</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Pedido #{id}</Text>

      {!order ? (
        <Text style={{ color: '#6c757d', marginTop: 12 }}>Carregando…</Text>
      ) : (
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#0b2135', fontWeight: '700' }}>Total: R$ {order.total.toFixed(2)}</Text>
          <Text style={{ color: '#6c757d' }}>Criado em: {new Date(order.createdAt).toLocaleString()}</Text>

          <View style={{ marginTop: 16, gap: 10 }}>
            {FLOW.map((s, i) => {
              const active = i <= currentIndex;
              return (
                <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: active ? '#0d6efd' : '#e9ecef', marginRight: 8 }} />
                  <Text style={{ color: active ? '#0b2135' : '#6c757d', fontWeight: active ? '700' : '400' }}>{s.label}</Text>
                </View>
              );
            })}
          </View>

          {canAdvance && (
            <TouchableOpacity onPress={advance} style={{ marginTop: 20, backgroundColor: '#0d6efd', borderRadius: 12, padding: 14, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>Avançar status</Text>
            </TouchableOpacity>
          )}

          {!canAdvance && (
            <Text style={{ color: '#198754', fontWeight: '700', marginTop: 16 }}>Pedido entregue 🎉</Text>
          )}
        </View>
      )}
    </View>
  );
}
