import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type Slide = { image: string; title: string; subtitle: string };

const SLIDES: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop',
    title: 'Entrega Rápida e Confiável',
    subtitle: 'Receba seus pedidos quentinhos com rastreamento em tempo real.'
  },
  {
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop',
    title: 'Ofertas e Cupons Exclusivos',
    subtitle: 'Economize com promoções semanais e benefícios para assinantes.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop',
    title: 'Restaurantes Favoritos',
    subtitle: 'Dos clássicos aos gourmet — tudo em um só lugar.'
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const next = (index + 1) % SLIDES.length;
      setIndex(next);
      listRef.current?.scrollToIndex({ index: next, animated: true });
    }, 3500);
    return () => clearInterval(id);
  }, [index]);

  const onDone = async () => {
    await AsyncStorage.setItem('flash.welcome.seen', '1');
    router.replace('/login');
  };
  const onCreateAccount = async () => {
    await AsyncStorage.setItem('flash.welcome.seen', '1');
    router.replace('/register');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.title}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <ImageBackground source={{ uri: item.image }} style={{ width, flex: 1 }} resizeMode="cover">
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', padding: 24, paddingBottom: 200, justifyContent: 'flex-end', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E11D48', justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="flash-outline" size={22} color="#fff" />
                </View>
                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 20 }}>FlashDelivery</Text>
              </View>
              <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800' }}>{item.title}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.95)' }}>{item.subtitle}</Text>
            </View>
          </ImageBackground>
        )}
      />

      {/* Pagination Dots */}
      <View style={{ position: 'absolute', bottom: 130, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
        {SLIDES.map((s, i) => (
          <View key={s.title} style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 999, backgroundColor: i === index ? '#E11D48' : 'rgba(255,255,255,0.7)' }} />
        ))}
      </View>

      {/* CTAs */}
      <View style={{ position: 'absolute', bottom: 40, left: 24, right: 24, gap: 12 }}>
        <TouchableOpacity onPress={onCreateAccount} activeOpacity={0.9} style={{ backgroundColor: '#E11D48', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Criar conta grátis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone} activeOpacity={0.9} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
