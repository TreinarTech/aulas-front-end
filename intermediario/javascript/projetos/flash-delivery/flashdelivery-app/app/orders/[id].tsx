import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const eta = useMemo(() => 15 + Math.floor(Math.random() * 10), []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ color: '#0b2135', fontWeight: '800', fontSize: 18 }}>Pedido {id}</Text>
      <Text style={{ color: '#0b2135' }}>Status: Em preparo</Text>
      <Text style={{ color: '#0b2135' }}>Previsão de entrega: {eta} min</Text>
    </View>
  );
}
