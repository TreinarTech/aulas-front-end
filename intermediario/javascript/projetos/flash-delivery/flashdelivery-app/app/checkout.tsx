import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useCart } from '@/state/cart';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const { items, clear } = useCart();
  const router = useRouter();

  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

  const placeOrder = () => {
    // Fake order id and clear cart
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    clear();
    router.replace(`/orders/${id}`);
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ color: '#0b2135', fontWeight: '800', fontSize: 18 }}>Checkout</Text>
      <Text style={{ color: '#0b2135' }}>Itens: {items.length}</Text>
      <Text style={{ color: '#0b2135' }}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity onPress={placeOrder} style={{ marginTop: 'auto', backgroundColor: '#0d6efd', borderRadius: 9999, padding: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '800' }}>Finalizar pedido</Text>
      </TouchableOpacity>
    </View>
  );
}
