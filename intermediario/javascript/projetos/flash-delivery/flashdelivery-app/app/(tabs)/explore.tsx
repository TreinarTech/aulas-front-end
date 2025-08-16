import React, { useMemo } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { RESTAURANTS } from '@/data/mock';

export default function ExploreScreen() {
  const router = useRouter();

  const byCat = (catId: string) => RESTAURANTS.filter((r) => r.categories.includes(catId));

  const restaurantes = RESTAURANTS; // todos
  const bares = useMemo(() => byCat('c7'), []);
  const sorveterias = useMemo(() => byCat('c6'), []); // usando categoria Açaí para sorveterias
  const supermercados = useMemo(() => byCat('c8'), []);

  const Card = ({ id, name, coverImg, rating }: { id: string; name: string; coverImg: string; rating: number }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/restaurant/${id}`)} style={{ width: 220 }}>
      <View style={{ backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#e9ecef' }}>
        <Image source={{ uri: coverImg }} style={{ width: '100%', height: 120 }} />
        <View style={{ padding: 10, gap: 4 }}>
          <Text numberOfLines={1} style={{ color: '#0b2135', fontWeight: '700' }}>{name}</Text>
          <Text style={{ color: '#6c757d' }}>⭐ {rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const Section = ({ title, data }: { title: string; data: typeof RESTAURANTS }) => (
    <View style={{ marginBottom: 16 }}>
      <View style={{ paddingHorizontal: 16, marginVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: '#0b2135', fontSize: 18, fontWeight: '700' }}>{title}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        renderItem={({ item }) => <Card {...item} />}
      />
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Section title="Restaurantes" data={restaurantes} />
      <Section title="Bares" data={bares} />
      <Section title="Sorveterias" data={sorveterias} />
      <Section title="Supermercados" data={supermercados} />
    </ScrollView>
  );
}
