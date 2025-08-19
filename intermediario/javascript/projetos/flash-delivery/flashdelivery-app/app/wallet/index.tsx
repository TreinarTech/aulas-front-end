import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function WalletScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Carteira e Pagamentos</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Cartões, Pix e dinheiro (mock).</Text>
      <TouchableOpacity style={{ marginTop: 16, backgroundColor: '#dc3545', padding: 12, borderRadius: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Adicionar método</Text>
      </TouchableOpacity>
    </View>
  );
}
