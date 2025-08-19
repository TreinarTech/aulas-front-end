import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type Method = { id: string; label: string; desc?: string };

const METHODS: Method[] = [
  { id: 'pix', label: 'Pix', desc: 'Chave QR ou copia e cola' },
  { id: 'card', label: 'Cartão de crédito', desc: 'Visa, Master, etc.' },
  { id: 'cash', label: 'Dinheiro', desc: 'Levar troco se necessário' },
];

const PAY_SELECTED_KEY = 'flash.payment.selected.v1';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(PAY_SELECTED_KEY).then((v) => setSelectedId(v));
  }, []);

  const select = async (id: string) => {
    setSelectedId(id);
    await AsyncStorage.setItem(PAY_SELECTED_KEY, id);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Meios de pagamento</Text>
      <Text style={{ color: '#6c757d', marginTop: 4 }}>Selecione como deseja pagar.</Text>

      <FlatList
        style={{ marginTop: 12 }}
        data={METHODS}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => select(item.id)} style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: selectedId === item.id ? '#0d6efd' : '#e9ecef', borderRadius: 12, padding: 12 }}>
            <Text style={{ color: '#0b2135', fontWeight: '700' }}>{item.label}</Text>
            {!!item.desc && <Text style={{ color: '#6c757d' }}>{item.desc}</Text>}
            {selectedId === item.id && <Text style={{ color: '#0d6efd', marginTop: 6, fontWeight: '700' }}>Selecionado</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
