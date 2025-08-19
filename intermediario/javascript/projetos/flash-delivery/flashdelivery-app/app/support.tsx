import React from 'react';
import { View, Text } from 'react-native';

export default function SupportScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Ajuda e Suporte</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>FAQ, chat e abertura de chamados (mock).</Text>
    </View>
  );
}
