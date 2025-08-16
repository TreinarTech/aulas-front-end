import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function CouponsScreen() {
  const coupons = [
    { id: 'cp1', code: 'FLASH10', desc: '10% OFF hoje' },
    { id: 'cp2', code: 'FRETEGRATIS', desc: 'Entrega grátis' },
  ];
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0b2135', marginBottom: 8 }}>Meus Cupons</Text>
      {coupons.map((c) => (
        <View key={c.id} style={{ padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e9ecef' }}>
          <Text style={{ fontWeight: '800', color: '#E11D48' }}>{c.code}</Text>
          <Text style={{ color: '#475569' }}>{c.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
