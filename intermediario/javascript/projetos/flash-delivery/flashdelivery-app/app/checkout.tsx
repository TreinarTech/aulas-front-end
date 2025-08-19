import React, { useCallback, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useCart } from '@/state/cart';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckoutScreen() {
  const { items, clear } = useCart();
  const router = useRouter();

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
  const [coupon, setCoupon] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<number>(0);
  const [tipPct, setTipPct] = useState<number>(0);
  const deliveryFee = 6.9; // mock
  const serviceFee = Math.min(7, subtotal * 0.07); // mock capped
  const tip = useMemo(() => Math.round((subtotal * tipPct) * 100) / 100, [subtotal, tipPct]);
  const total = useMemo(() => Math.max(0, subtotal + deliveryFee + serviceFee + tip - couponApplied), [subtotal, deliveryFee, serviceFee, tip, couponApplied]);

  const [addressLabel, setAddressLabel] = useState<string>('Selecionar endereço');
  const [paymentLabel, setPaymentLabel] = useState<string>('Selecionar pagamento');

  const ADDR_KEY = 'flash.addresses.v1';
  const ADDR_SELECTED_KEY = 'flash.address.selected.v1';
  const PAY_SELECTED_KEY = 'flash.payment.selected.v1';

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        try {
          const [addrListRaw, selectedAddrId, payId] = await Promise.all([
            AsyncStorage.getItem(ADDR_KEY),
            AsyncStorage.getItem(ADDR_SELECTED_KEY),
            AsyncStorage.getItem(PAY_SELECTED_KEY),
          ]);
          if (!mounted) return;
          // address label
          if (selectedAddrId) {
            const list: { id: string; label: string; details?: string }[] = addrListRaw ? JSON.parse(addrListRaw) : [];
            const found = list.find((a) => a.id === selectedAddrId);
            if (found) setAddressLabel(found.label);
            else setAddressLabel('Selecionar endereço');
          } else setAddressLabel('Selecionar endereço');
          // payment label
          if (payId) {
            const map: Record<string, string> = { pix: 'Pix', card: 'Cartão de crédito', cash: 'Dinheiro' };
            setPaymentLabel(map[payId] || 'Selecionar pagamento');
          } else setPaymentLabel('Selecionar pagamento');
        } catch {}
      })();
      return () => {
        mounted = false;
      };
    }, [])
  );

  const placeOrder = async () => {
    // Fake order id
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      const ORDERS_KEY = 'flash.orders.v1';
      const raw = await AsyncStorage.getItem(ORDERS_KEY);
      const list: any[] = raw ? JSON.parse(raw) : [];
      const order = {
        id,
        createdAt: Date.now(),
        total,
        items: items.map((i) => ({ itemId: i.itemId, name: i.name, qty: i.qty, price: i.price, restaurantId: i.restaurantId })),
        status: 'placed',
        history: [{ status: 'placed', at: Date.now() }],
      };
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...list]));
    } catch {}
    clear();
    router.replace(`/orders/${id}/track`);
  };

  const applyCoupon = () => {
    if (!coupon) return;
    // mock rules
    if (coupon.toUpperCase() === 'FRETEGRATIS') {
      setCouponApplied(deliveryFee);
    } else if (coupon.toUpperCase() === 'DESCONTO10') {
      setCouponApplied(Math.min(10, subtotal * 0.1));
    } else {
      setCouponApplied(0);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ color: '#0b2135', fontWeight: '800', fontSize: 20 }}>Checkout</Text>

      <View style={{ marginTop: 12, gap: 8 }}>
        <Text style={{ color: '#6c757d', fontWeight: '700' }}>Entrega</Text>
        <TouchableOpacity onPress={() => router.push('/addresses' as any)} style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12 }}>
          <Text style={{ color: '#0b2135', fontWeight: '700' }}>{addressLabel}</Text>
          <Text style={{ color: '#6c757d' }}>Toque para escolher ou adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12, gap: 8 }}>
        <Text style={{ color: '#6c757d', fontWeight: '700' }}>Pagamento</Text>
        <TouchableOpacity onPress={() => router.push('/payment-methods' as any)} style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12 }}>
          <Text style={{ color: '#0b2135', fontWeight: '700' }}>{paymentLabel}</Text>
          <Text style={{ color: '#6c757d' }}>Toque para selecionar método</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 12, gap: 8 }}>
        <Text style={{ color: '#6c757d', fontWeight: '700' }}>Cupom</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput
            placeholder="Digite seu cupom"
            value={coupon}
            onChangeText={setCoupon}
            style={{ flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, paddingHorizontal: 12, height: 44 }}
          />
          <TouchableOpacity onPress={applyCoupon} style={{ backgroundColor: '#0d6efd', borderRadius: 12, paddingHorizontal: 14, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>Aplicar</Text>
          </TouchableOpacity>
        </View>
        {!!couponApplied && <Text style={{ color: '#198754' }}>Cupom aplicado: -R$ {couponApplied.toFixed(2)}</Text>}
      </View>

      <View style={{ marginTop: 12, gap: 8 }}>
        <Text style={{ color: '#6c757d', fontWeight: '700' }}>Gorjeta</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[0, 0.05, 0.1, 0.15].map((p) => (
            <TouchableOpacity key={p} onPress={() => setTipPct(p)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: tipPct === p ? '#0d6efd' : '#e9ecef', backgroundColor: tipPct === p ? '#0d6efd' : '#ffffff' }}>
              <Text style={{ color: tipPct === p ? '#ffffff' : '#0b2135', fontWeight: '700' }}>{p === 0 ? 'Sem' : `${Math.round(p * 100)}%`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={{ color: '#6c757d', fontWeight: '700', marginBottom: 8 }}>Itens</Text>
        <FlatList
          data={items}
          keyExtractor={(i, idx) => `${i.itemId}-${idx}`}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 12, padding: 12 }}>
              <Text style={{ color: '#0b2135' }}>{item.qty}x {item.name}</Text>
              <Text style={{ color: '#0b2135', fontWeight: '700' }}>R$ {(item.price * item.qty).toFixed(2)}</Text>
            </View>
          )}
        />
      </View>

      <View style={{ marginTop: 12, gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#6c757d' }}>Subtotal</Text>
          <Text style={{ color: '#0b2135' }}>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#6c757d' }}>Entrega</Text>
          <Text style={{ color: '#0b2135' }}>R$ {deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#6c757d' }}>Taxa de serviço</Text>
          <Text style={{ color: '#0b2135' }}>R$ {serviceFee.toFixed(2)}</Text>
        </View>
        {!!tip && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#6c757d' }}>Gorjeta</Text>
            <Text style={{ color: '#0b2135' }}>R$ {tip.toFixed(2)}</Text>
          </View>
        )}
        {!!couponApplied && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#198754' }}>Cupom</Text>
            <Text style={{ color: '#198754' }}>- R$ {couponApplied.toFixed(2)}</Text>
          </View>
        )}
        <View style={{ height: 8 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#0b2135', fontWeight: '800' }}>Total</Text>
          <Text style={{ color: '#0b2135', fontWeight: '800' }}>R$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity disabled={!items.length} onPress={placeOrder} style={{ marginTop: 16, backgroundColor: items.length ? '#0d6efd' : '#adb5bd', borderRadius: 9999, padding: 14, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '800' }}>Finalizar pedido</Text>
      </TouchableOpacity>
    </View>
  );
}
