import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

// Simple in-memory placeholder list
const MOCK_ORDERS = Array.from({ length: 5 }).map((_, i) => ({
  id: `ORD-${(1000 + i).toString()}`,
  status: i % 2 === 0 ? 'Entregue' : 'Em preparo',
  total: 20 + i * 5,
}));

export default function OrdersScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/orders/${item.id}`)} style={{ borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12, gap: 6, backgroundColor: '#fff' }}>
            <Text style={{ color: '#0b2135', fontWeight: '700' }}>{item.id}</Text>
            <Text style={{ color: '#6c757d' }}>{item.status}</Text>
            <Text style={{ color: '#0b2135' }}>R$ {item.total.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
