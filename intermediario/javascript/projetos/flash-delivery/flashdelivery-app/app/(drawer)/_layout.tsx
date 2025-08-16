import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <Drawer
      screenOptions={{
        headerTitle: 'FlashDelivery',
        headerStyle: { backgroundColor: '#E11D48' }, // red-600
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '800' },
        drawerActiveTintColor: '#E11D48',
        drawerLabelStyle: { fontSize: 16 },
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => (navigation as any).openDrawer?.()} style={{ marginRight: 12 }}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/80' }}
                style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)' }}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: 'Início', headerShown: true }} />
      <Drawer.Screen name="coupons" options={{ title: 'Meus Cupons' }} />
      <Drawer.Screen name="settings" options={{ title: 'Configurações' }} />
      <Drawer.Screen name="work-with-us" options={{ title: 'Trabalhe Conosco' }} />
    </Drawer>
  );
}
