import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '@/state/auth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ color: '#0b2135', fontWeight: '800', fontSize: 18 }}>Perfil</Text>
      <Text style={{ color: '#0b2135' }}>Email: {user?.email}</Text>

      <TouchableOpacity onPress={signOut} style={{ marginTop: 'auto', backgroundColor: '#dc3545', borderRadius: 9999, padding: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '800' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
