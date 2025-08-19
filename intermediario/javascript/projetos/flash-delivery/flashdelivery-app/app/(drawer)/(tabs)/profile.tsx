import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '@/state/auth';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Image
          source={{ uri: user?.avatar || 'https://i.pravatar.cc/120' }}
          style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: '#e9ecef' }}
        />
        <View style={{ gap: 2 }}>
          <Text style={{ color: '#0b2135', fontWeight: '800', fontSize: 18 }}>{user?.name || 'Usuário'}</Text>
          <Text style={{ color: '#475569' }}>{user?.email}</Text>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        {user?.address ? <Text style={{ color: '#0b2135' }}>Endereço: {user.address}</Text> : null}
        {user?.phone ? <Text style={{ color: '#0b2135' }}>Contato: {user.phone}</Text> : null}
        {user?.status ? <Text style={{ color: '#0b2135' }}>Status: {user.status}</Text> : null}
      </View>

      <TouchableOpacity
        onPress={() => {
          signOut();
          router.replace('/login');
        }}
        style={{ marginTop: 'auto', backgroundColor: '#dc3545', borderRadius: 9999, padding: 14, alignItems: 'center' }}
      >
        <Text style={{ color: '#fff', fontWeight: '800' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
