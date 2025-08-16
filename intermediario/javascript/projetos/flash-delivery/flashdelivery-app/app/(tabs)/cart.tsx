import React, { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useCart } from '@/state/cart';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { items, add, remove, clear } = useCart();
  const router = useRouter();

  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Ionicons name="cart-outline" size={40} color="#6c757d" />
        <Text style={{ color: '#6c757d' }}>Seu carrinho está vazio</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(it) => `${it.restaurantId}:${it.itemId}`}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12, gap: 8, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: '#0b2135', fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ color: '#0b2135' }}>
                {item.qty} x R$ {item.price.toFixed(2)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={() => remove(item.restaurantId, item.itemId)} style={{ backgroundColor: '#e9ecef', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => add(item.restaurantId, item.itemId, item.name, item.price)} style={{ backgroundColor: '#e9ecef', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
                <Text>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remove(item.restaurantId, item.itemId, item.qty)} style={{ marginLeft: 'auto', backgroundColor: '#fff5f5', borderColor: '#f1aeb5', borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
                <Text style={{ color: '#842029' }}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={{ borderTopWidth: 1, borderColor: '#e9ecef', padding: 16, gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#0b2135', fontWeight: '700' }}>Total</Text>
          <Text style={{ color: '#0b2135', fontWeight: '700' }}>R$ {total.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={() => clear()} style={{ flex: 1, backgroundColor: '#e9ecef', borderRadius: 9999, padding: 14, alignItems: 'center' }}>
            <Text style={{ color: '#0b2135', fontWeight: '700' }}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/checkout')} style={{ flex: 2, backgroundColor: '#0d6efd', borderRadius: 9999, padding: 14, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
