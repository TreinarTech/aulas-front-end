import React from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0b2135' }}>Configurações</Text>

      <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#e9ecef' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: '#0b2135', fontSize: 16, fontWeight: '600' }}>Notificações</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <Text style={{ color: '#64748b', marginTop: 6 }}>Receber push de promoções e atualizações de pedidos</Text>
      </View>

      <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#e9ecef' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: '#0b2135', fontSize: 16, fontWeight: '600' }}>Modo escuro</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <Text style={{ color: '#64748b', marginTop: 6 }}>Preferência de tema (demonstração)</Text>
      </View>
    </ScrollView>
  );
}
