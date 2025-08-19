import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Address = { id: string; label: string; details?: string };

const ADDR_KEY = 'flash.addresses.v1';
const ADDR_SELECTED_KEY = 'flash.address.selected.v1';

export default function AddressesScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [raw, sel] = await Promise.all([
        AsyncStorage.getItem(ADDR_KEY),
        AsyncStorage.getItem(ADDR_SELECTED_KEY),
      ]);
      setItems(raw ? JSON.parse(raw) : []);
      setSelectedId(sel);
    })();
  }, []);

  const select = async (id: string) => {
    setSelectedId(id);
    await AsyncStorage.setItem(ADDR_SELECTED_KEY, id);
    router.back();
  };

  const remove = async (id: string) => {
    const next = items.filter((a) => a.id !== id);
    setItems(next);
    await AsyncStorage.setItem(ADDR_KEY, JSON.stringify(next));
    if (selectedId === id) await AsyncStorage.removeItem(ADDR_SELECTED_KEY);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Endereços</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Gerencie seus endereços de entrega.</Text>

      <FlatList
        style={{ marginTop: 12 }}
        data={items}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12 }}>
            <Text style={{ color: '#0b2135', fontWeight: '700' }}>{item.label}</Text>
            {!!item.details && <Text style={{ color: '#6c757d' }}>{item.details}</Text>}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <TouchableOpacity onPress={() => select(item.id)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: selectedId === item.id ? '#0d6efd' : '#e9ecef' }}>
                <Text style={{ color: selectedId === item.id ? '#fff' : '#0b2135', fontWeight: '700' }}>{selectedId === item.id ? 'Selecionado' : 'Selecionar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.id)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#fff0f0', borderWidth: 1, borderColor: '#f5c2c7' }}>
                <Text style={{ color: '#dc3545', fontWeight: '700' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: '#6c757d', marginTop: 12 }}>Nenhum endereço cadastrado.</Text>
        )}
      />

      <TouchableOpacity onPress={() => router.push('/addresses/new' as any)} style={{ marginTop: 16, backgroundColor: '#dc3545', padding: 12, borderRadius: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Adicionar novo endereço</Text>
      </TouchableOpacity>
    </View>
  );
}
