import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type Address = { id: string; label: string; details?: string };

const ADDR_KEY = 'flash.addresses.v1';

export default function NewAddressScreen() {
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [details, setDetails] = useState('');

  const save = async () => {
    if (!label.trim()) return;
    const raw = await AsyncStorage.getItem(ADDR_KEY);
    const list: Address[] = raw ? JSON.parse(raw) : [];
    const item: Address = { id: Math.random().toString(36).slice(2, 10), label: label.trim(), details: details.trim() || undefined };
    const next = [...list, item];
    await AsyncStorage.setItem(ADDR_KEY, JSON.stringify(next));
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#0b2135' }}>Novo endereço</Text>
      <TextInput
        placeholder="Etiqueta (ex: Casa, Trabalho)"
        value={label}
        onChangeText={setLabel}
        style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, paddingHorizontal: 12, height: 44 }}
      />
      <TextInput
        placeholder="Detalhes (rua, número, complemento)"
        value={details}
        onChangeText={setDetails}
        style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, paddingHorizontal: 12, height: 44 }}
      />
      <TouchableOpacity onPress={save} style={{ marginTop: 8, backgroundColor: label.trim() ? '#0d6efd' : '#adb5bd', borderRadius: 12, padding: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '800' }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
