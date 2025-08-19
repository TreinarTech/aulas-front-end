import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COUPONS, CATEGORIES, PROMOS, RESTAURANTS, MENU } from '@/data/mock';
import { useRouter } from 'expo-router';
import styles from '@/styles/(tabs)/index.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  const filtered = useMemo(() => {
    const byQuery = (list: typeof RESTAURANTS) => {
      if (!query) return list;
      const q = query.toLowerCase();
      return list.filter(
        (r) => r.name.toLowerCase().includes(q) || r.categories.some((id) => CATEGORIES.find((c) => c.id === id && c.name.toLowerCase().includes(q)))
      );
    };

    const byPrice = (list: typeof RESTAURANTS) => {
      if (priceFilter === 'all') return list;
      return list.filter((r) => {
        const menu = MENU[r.id];
        if (!menu || menu.length === 0) return true; // se não houver menu, não excluir
        const avg = menu.reduce((sum, m) => sum + m.price, 0) / menu.length;
        if (priceFilter === 'low') return avg <= 25;
        if (priceFilter === 'mid') return avg > 25 && avg <= 40;
        return avg > 40;
      });
    };

    return byQuery(byPrice(RESTAURANTS));
  }, [query, priceFilter]);

  // Load most bought restaurants metrics
  const [mostBought, setMostBought] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('flash.metrics.restaurantCounts.v1');
        if (!raw) return;
        const obj = JSON.parse(raw) as Record<string, number>;
        const sorted = Object.entries(obj)
          .filter(([, v]) => v > 0)
          .sort((a, b) => b[1] - a[1])
          .map(([k]) => k)
          .slice(0, 6);
        setMostBought(sorted);
      } catch {}
    })();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.searchRow}>
        <View style={styles.searchPill}>
          <Ionicons name="search" size={18} color="#6c757d" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar restaurantes e pratos"
            placeholderTextColor="#6c757d"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Price filter chips */}
      <View style={styles.priceRow}>
        <TouchableOpacity
          onPress={() => setPriceFilter('all')}
          style={[styles.chip, priceFilter === 'all' && styles.chipActive]}
        >
          <Ionicons name="pricetags-outline" size={14} color={priceFilter === 'all' ? '#fff' : '#0b2135'} />
          <Text style={[styles.chipText, priceFilter === 'all' && styles.chipTextActive]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPriceFilter('low')}
          style={[styles.chip, priceFilter === 'low' && styles.chipActive]}
        >
          <Text style={[styles.chipText, priceFilter === 'low' && styles.chipTextActive]}>Até R$25</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPriceFilter('mid')}
          style={[styles.chip, priceFilter === 'mid' && styles.chipActive]}
        >
          <Text style={[styles.chipText, priceFilter === 'mid' && styles.chipTextActive]}>R$25–40</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPriceFilter('high')}
          style={[styles.chip, priceFilter === 'high' && styles.chipActive]}
        >
          <Text style={[styles.chipText, priceFilter === 'high' && styles.chipTextActive]}>R$40+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addrRow}>
        <Text style={styles.muted}>Entrega em</Text>
        <TouchableOpacity style={styles.addrButton}>
          <Ionicons name="location-outline" size={16} color="#0b2135" />
          <Text style={styles.addrButtonText}>Seu endereço</Text>
          <Ionicons name="chevron-down" size={16} color="#0b2135" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color="#0b2135" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <Text style={styles.linkPrimary}>Ver tudo</Text>
        </View>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.catCircle}>
              <Ionicons name={item.icon as any} size={20} color="#0b2135" />
              <Text style={styles.catText}>{item.name}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Promoções</Text>
          <Text style={styles.linkPrimary}>Ver tudo</Text>
        </View>
        <FlatList
          data={PROMOS}
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.banner}>
              <Image source={{ uri: item.img }} style={styles.bannerImg} />
              <View style={styles.bannerBadge}>
                <Text style={styles.badgeText}>{item.label}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cupons</Text>
          <Text style={styles.linkPrimary}>Ver tudo</Text>
        </View>
        <FlatList
          data={COUPONS}
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.coupon}>
              <Ionicons name="ticket-outline" size={16} color="#0d6efd" />
              <Text style={styles.couponText}>{item.code}</Text>
              <Text style={styles.couponSmall}>• {item.desc}</Text>
            </View>
          )}
        />
      </View>

      {mostBought.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mais comprados</Text>
            <TouchableOpacity onPress={() => router.push('/restaurants')}>
              <Text style={styles.linkPrimary}>Ver tudo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            {mostBought
              .map((rid) => RESTAURANTS.find((r) => r.id === rid))
              .filter((r): r is typeof RESTAURANTS[number] => Boolean(r))
              .slice(0, 4)
              .map((r) => (
                <TouchableOpacity key={r.id} activeOpacity={0.8} onPress={() => router.push(`/restaurant/${r.id}`)} style={styles.card}>
                  <Image source={{ uri: r.coverImg }} style={styles.cardImg} />
                  <View style={styles.cardBody}>
                    <View style={styles.cardTopRow}>
                      <Text numberOfLines={1} style={styles.cardTitle}>{r.name}</Text>
                      <TouchableOpacity accessibilityRole="button" onPress={() => router.push({ pathname: '/chat/[id]', params: { id: r.id } })} style={styles.chatBtn}>
                        <Ionicons name="chatbubbles-outline" size={14} color="#0d6efd" />
                        <Text style={styles.chatBtnText}>Chat</Text>
                      </TouchableOpacity>
                      <View style={styles.badge}>
                        <Ionicons name="star" size={12} color="#664d03" />
                        <Text style={styles.rateText}>{r.rating.toFixed(1)}</Text>
                      </View>
                    </View>
                    <Text style={styles.cardMuted}>
                      {r.eta} min • {r.categories.map((id) => CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(', ')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurantes e Bares Favoritos</Text>
          <TouchableOpacity onPress={() => router.push('/restaurants')}>
            <Text style={styles.linkPrimary}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          {RESTAURANTS.filter((r) => r.rating >= 4.6)
            .slice(0, 4)
            .map((r) => (
              <TouchableOpacity key={r.id} activeOpacity={0.8} onPress={() => router.push(`/restaurant/${r.id}`)} style={styles.card}>
                <Image source={{ uri: r.coverImg }} style={styles.cardImg} />
                <View style={styles.cardBody}>
                  <View style={styles.cardTopRow}>
                    <Text numberOfLines={1} style={styles.cardTitle}>{r.name}</Text>
                    <TouchableOpacity accessibilityRole="button" onPress={() => router.push({ pathname: '/chat/[id]', params: { id: r.id } })} style={styles.chatBtn}>
                      <Ionicons name="chatbubbles-outline" size={14} color="#0d6efd" />
                      <Text style={styles.chatBtnText}>Chat</Text>
                    </TouchableOpacity>
                    <View style={styles.badge}>
                      <Ionicons name="star" size={12} color="#664d03" />
                      <Text style={styles.rateText}>{r.rating.toFixed(1)}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardMuted}>
                    {r.eta} min • {r.categories.map((id) => CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(', ')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurantes</Text>
          <TouchableOpacity onPress={() => router.push('/restaurants')}>
            <Text style={styles.linkPrimary}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          {filtered.map((r) => (
            <TouchableOpacity key={r.id} activeOpacity={0.8} onPress={() => router.push(`/restaurant/${r.id}`)} style={styles.card}>
              <Image source={{ uri: r.coverImg }} style={styles.cardImg} />
              <View style={styles.cardBody}>
                <View style={styles.cardTopRow}>
                  <Text numberOfLines={1} style={styles.cardTitle}>{r.name}</Text>
                  <TouchableOpacity accessibilityRole="button" onPress={() => router.push({ pathname: '/chat/[id]', params: { id: r.id } })} style={styles.chatBtn}>
                    <Ionicons name="chatbubbles-outline" size={14} color="#0d6efd" />
                    <Text style={styles.chatBtnText}>Chat</Text>
                  </TouchableOpacity>
                  <View style={styles.badge}>
                    <Ionicons name="star" size={12} color="#664d03" />
                    <Text style={styles.rateText}>{r.rating.toFixed(1)}</Text>
                  </View>
                </View>
                <Text style={styles.cardMuted}>
                  {r.eta} min • {r.categories.map((id) => CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(', ')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
