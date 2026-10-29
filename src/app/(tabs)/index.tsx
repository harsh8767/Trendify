import Logo from '@/components/brand/Logo';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { CATEGORIES, PRODUCTS, PROMO } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FILTERS = ['All', 'Women', 'Men', 'Kids'];

export default function HomeScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(
    () => (filter === 'All' ? PRODUCTS : PRODUCTS.filter((item) => item.category === filter)),
    [filter]
  );

  return (
    <SafeAreaView style={styles.homeScreen} edges={['top']}>
      <View style={styles.homeHeader}>
        <Logo size={40} />
        <Text style={styles.homeBrand}>Trendify</Text>
        <TouchableOpacity style={styles.homeIconBtn} onPress={() => router.push('/notifications')}>
          <Text style={styles.homeIcon}>🔔</Text>
          <View style={styles.homeBellDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeIconBtn} onPress={() => router.push('/(tabs)/wishlist')}>
          <Text style={styles.homeIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.homeScroll}>
        <TouchableOpacity style={styles.homeSearch} onPress={() => router.push('/search')} activeOpacity={0.85}>
          <Text style={styles.homeSearchIcon}>⌕</Text>
          <Text style={styles.homeSearchPlaceholder}>Search</Text>
        </TouchableOpacity>

        <SectionHeader title="Special Offers" onAction={() => router.push('/search')} />
        <View style={styles.homePromo}>
          <View style={styles.homePromoCopy}>
            <Text style={styles.homePromoTitle}>{PROMO.title}</Text>
            <Text style={styles.homePromoSubtitle}>{PROMO.subtitle}</Text>
            <Text style={styles.homePromoCaption}>{PROMO.caption}</Text>
          </View>
          <Image source={{ uri: PROMO.image }} style={styles.homePromoImage} contentFit="cover" />
        </View>
        <View style={styles.homeDots}>
          <View style={[styles.homeDot, styles.homeDotActive]} />
          <View style={styles.homeDot} />
          <View style={styles.homeDot} />
        </View>

        <View style={styles.homeCategoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.homeCategoryItem}
              onPress={() => router.push({ pathname: '/search', params: { category: category.name } })}
            >
              <Image source={{ uri: category.image }} style={styles.homeCategoryImage} contentFit="cover" />
              <Text style={styles.homeCategoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionHeader title="Most Popular" onAction={() => router.push('/search')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.homeFilters}>
          {FILTERS.map((item) => {
            const active = item === filter;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setFilter(item)}
                style={[styles.homeChip, active && styles.homeChipActive]}
              >
                <Text style={[styles.homeChipText, active && styles.homeChipTextActive]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.homeProductGrid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 10,
  },
  homeBrand: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: Palette.text,
  },
  homeIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    fontSize: 22,
  },
  homeBellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.danger,
  },
  homeScroll: {
    paddingBottom: 32,
  },
  homeSearch: {
    marginHorizontal: 24,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  homeSearchIcon: {
    fontSize: 20,
    marginRight: 10,
    color: Palette.muted,
  },
  homeSearchPlaceholder: {
    color: Palette.muted,
    fontSize: 16,
  },
  homePromo: {
    marginHorizontal: 24,
    backgroundColor: Palette.primary,
    borderRadius: 32,
    minHeight: 180,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  homePromoCopy: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
  },
  homePromoTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  homePromoSubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  homePromoCaption: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: 150,
  },
  homePromoImage: {
    width: 150,
    height: '100%',
  },
  homeDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 22,
  },
  homeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primaryMuted,
  },
  homeDotActive: {
    width: 24,
    backgroundColor: Palette.primary,
  },
  homeCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  homeCategoryItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 16,
  },
  homeCategoryImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EEE',
    marginBottom: 8,
  },
  homeCategoryName: {
    fontSize: 12,
    color: Palette.text,
    fontWeight: '600',
  },
  homeFilters: {
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 18,
  },
  homeChip: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  homeChipActive: {
    backgroundColor: Palette.primary,
  },
  homeChipText: {
    fontWeight: '700',
    color: Palette.primary,
  },
  homeChipTextActive: {
    color: '#FFFFFF',
  },
  homeProductGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
});
