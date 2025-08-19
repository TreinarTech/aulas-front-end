import React from 'react';
import { View, Text } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Notificações</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Inbox in-app (mock).</Text>
    </View>
  );
}
