import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Perfil</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Dados pessoais e preferências (mock).</Text>
    </View>
  );
}
