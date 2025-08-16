import React, { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MENU, RESTAURANTS, CATEGORIES } from '@/data/mock';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '@/state/cart';
import styles from '@/styles/restaurant/[id].styles';

export default function RestaurantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = useMemo(() => RESTAURANTS.find((r) => r.id === id), [id]);
  const menu = useMemo(() => (id ? MENU[id] || [] : []), [id]);
  const { items, add, remove } = useCart();

  if (!restaurant) return null;

  const qtyOf = (mid: string) => items.find((it) => it.restaurantId === id && it.itemId === mid)?.qty || 0;
  const totalItems = items.filter((it) => it.restaurantId === id).reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = items
    .filter((it) => it.restaurantId === id)
    .reduce((sum, it) => sum + it.qty * (menu.find((m) => m.id === it.itemId)?.price || it.price), 0);

  return (
    <View style={styles.screen}>
      <View style={styles.headerImageBox}>
        <Image source={{ uri: restaurant.coverImg }} style={styles.headerImage} />
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.back()} style={styles.circleBtnTranslucent}>
            <Ionicons name="chevron-back" size={22} color="#0b2135" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtnTranslucent}>
            <Ionicons name="heart-outline" size={20} color="#0b2135" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.rateBadge}>
            <Ionicons name="star" size={12} color="#664d03" />
            <Text style={styles.rateText}>{restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.muted}>
          {restaurant.eta} min • {restaurant.categories.map((id) => CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(', ')}
        </Text>

        <Text style={styles.sectionTitle}>Cardápio</Text>
        <FlatList
          data={menu}
          keyExtractor={(i) => i.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <View style={styles.menuTitleRow}>
                  <Text style={styles.menuTitle} numberOfLines={1}>{item.name}</Text>
                  {item.badge ? (
                    <View style={styles.menuBadge}>
                      <Text style={styles.menuBadgeText}>{item.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.menuDesc} numberOfLines={2}>{item.desc}</Text>
                <Text style={styles.menuPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.menuRight}>
                <View style={styles.qtyRow}>
                  <TouchableOpacity disabled={!qtyOf(item.id)} onPress={() => remove(String(id), item.id, 1)} activeOpacity={0.7} style={[styles.qtyBtn, !qtyOf(item.id) && styles.qtyBtnDisabled]}>
                    <Ionicons name="remove" size={16} color="#0b2135" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{qtyOf(item.id)}</Text>
                  <TouchableOpacity onPress={() => add(String(id), item.id, item.name, item.price, 1)} activeOpacity={0.7} style={styles.qtyBtn}>
                    <Ionicons name="add" size={16} color="#0b2135" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {totalItems > 0 && (
        <TouchableOpacity activeOpacity={0.9} style={styles.cartBar} onPress={() => router.push('/(tabs)/cart')}>
          <Text style={styles.cartBarTextBold}>
            {totalItems} item{totalItems > 1 ? 's' : ''} • R$ {totalPrice.toFixed(2)}
          </Text>
          <Text style={styles.cartBarTextStrong}>Ver sacola</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
