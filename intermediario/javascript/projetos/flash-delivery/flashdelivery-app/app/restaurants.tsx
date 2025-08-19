import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { RESTAURANTS, CATEGORIES } from '@/data/mock';

export default function RestaurantsListScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: '#0b2135', fontSize: 20, fontWeight: '800' }}>Todos os Estabelecimentos</Text>
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <FlatList
          data={RESTAURANTS}
          keyExtractor={(i) => i.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/restaurant/${item.id}`)} style={{ flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#e9ecef' }}>
                <Image source={{ uri: item.coverImg }} style={{ width: '100%', height: 110 }} />
                <View style={{ padding: 10, gap: 4 }}>
                  <Text numberOfLines={1} style={{ color: '#0b2135', fontWeight: '800' }}>{item.name}</Text>
                  <Text style={{ color: '#6c757d' }}>{item.eta} min • {item.categories.map((id) => CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(', ')}</Text>
                  <View style={{ alignSelf: 'flex-start', backgroundColor: '#fff3cd', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 }}>
                    <Text style={{ color: '#664d03', fontWeight: '700', fontSize: 12 }}>⭐ {item.rating.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}
