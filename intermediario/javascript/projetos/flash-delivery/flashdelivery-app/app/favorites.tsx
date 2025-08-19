import React from 'react';
import { View, Text } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Favoritos</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Restaurantes e itens salvos (mock).</Text>
    </View>
  );
}
