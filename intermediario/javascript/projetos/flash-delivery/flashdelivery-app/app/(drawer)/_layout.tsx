import React from 'react';
import { Alert, Image, TouchableOpacity, View, Text } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '@/state/auth';
import { useLoading } from '@/state/ui';
import { useCart } from '@/state/cart';
// no RESTAURANTS needed; we navigate directly to chat screen

export default function DrawerLayout() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const { setLoading } = useLoading();
  const { items } = useCart();
  const activeRestaurantId = items[0]?.restaurantId;

  return (
    <View style={{ flex: 1 }}>
      <Drawer
      initialRouteName="(tabs)"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image
              source={{ uri: user?.avatar || 'https://i.pravatar.cc/80' }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
            />
            <View>
              <TouchableOpacity onPress={() => { setLoading(true); router.push('/(drawer)/(tabs)/profile'); setTimeout(() => setLoading(false), 400); }}>
                <View style={{ gap: 2 }}>
                  <Text style={{ color: '#0b2135', fontWeight: '800' }}>{user?.name || 'Usuário'}</Text>
                  <Text style={{ color: '#475569', fontSize: 12 }}>{user?.email}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Drawer items explicit to avoid showing index/(tabs) */}
          <DrawerItem
            label="Meus Cupons"
            onPress={() => {
              setLoading(true);
              props.navigation.navigate('coupons' as never);
              setTimeout(() => setLoading(false), 400);
            }}
            icon={({ size, color }) => <Ionicons name="pricetags-outline" size={size} color={color} />}
          />
          <DrawerItem
            label="Configurações"
            onPress={() => {
              setLoading(true);
              props.navigation.navigate('settings' as never);
              setTimeout(() => setLoading(false), 400);
            }}
            icon={({ size, color }) => <Ionicons name="settings-outline" size={size} color={color} />}
          />
          <DrawerItem
            label="Suporte"
            onPress={() => {
              setLoading(true);
              props.navigation.navigate('support' as never);
              setTimeout(() => setLoading(false), 400);
            }}
            icon={({ size, color }) => <Ionicons name="help-buoy-outline" size={size} color={color} />}
          />
          <DrawerItem
            label="Trabalhe Conosco"
            onPress={() => {
              setLoading(true);
              props.navigation.navigate('work-with-us' as never);
              setTimeout(() => setLoading(false), 400);
            }}
            icon={({ size, color }) => <Ionicons name="briefcase-outline" size={size} color={color} />}
          />
          <DrawerItem
            label="Sair"
            labelStyle={{ color: '#842029', fontWeight: '700' }}
            icon={({ size, color }) => <Ionicons name="log-out-outline" size={size} color="#842029" />}
            onPress={() => {
              signOut();
              // Garantir retorno ao login
              router.replace('/login');
            }}
          />
        </DrawerContentScrollView>
      )}
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
            <TouchableOpacity onPress={() => router.push('/(drawer)/(tabs)/profile')}>
              <Image
                source={{ uri: user?.avatar || 'https://i.pravatar.cc/80' }}
                style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)' }}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Início',
          headerShown: true,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen name="coupons" options={{ title: 'Meus Cupons' }} />
      <Drawer.Screen name="settings" options={{ title: 'Configurações' }} />
      <Drawer.Screen name="support" options={{ title: 'Suporte' }} />
      <Drawer.Screen name="work-with-us" options={{ title: 'Trabalhe Conosco' }} />
      </Drawer>

      {/* Floating Chat Button -> navigates to chat screen */}
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.9}
        onPress={() => {
          if (activeRestaurantId) {
            router.push({ pathname: '/chat/[id]', params: { id: activeRestaurantId } });
          } else {
            Alert.alert('Chat', 'Adicione itens de um restaurante ao carrinho para iniciar o chat.');
          }
        }}
        style={{ position: 'absolute', right: 16, bottom: 24, backgroundColor: '#E11D48', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 6 }}
      >
        <Ionicons name="chatbubbles" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
