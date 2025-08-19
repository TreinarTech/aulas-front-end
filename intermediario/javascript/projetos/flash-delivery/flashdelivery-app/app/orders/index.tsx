import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';

type OrderItem = { itemId: string; name: string; qty: number; price: number; restaurantId: string };
type Order = { id: string; createdAt: number; total: number; status: string; items: OrderItem[] };

const ORDERS_KEY = 'flash.orders.v1';

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem(ORDERS_KEY);
    setOrders(raw ? JSON.parse(raw) : []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Meus pedidos</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Histórico e status dos pedidos.</Text>

      <FlatList
        style={{ marginTop: 12 }}
        data={orders}
        keyExtractor={(o) => o.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/orders/${item.id}/track` as any)} style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#0b2135', fontWeight: '700' }}>Pedido #{item.id}</Text>
              <Text style={{ color: '#0b2135', fontWeight: '700' }}>R$ {item.total.toFixed(2)}</Text>
            </View>
            <Text style={{ color: '#6c757d', marginTop: 4 }}>{new Date(item.createdAt).toLocaleString()}</Text>
            <Text style={{ color: '#6c757d' }}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: '#6c757d', marginTop: 12 }}>Você ainda não possui pedidos.</Text>
        )}
      />
    </View>
  );
}
