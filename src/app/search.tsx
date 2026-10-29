import ProductCard from '@/components/ui/ProductCard';
import { PRODUCTS } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState(category ?? '');

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return PRODUCTS;
    return PRODUCTS.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.searchScreen} edges={['top']}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.searchBack}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchField}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor={Palette.muted}
            style={styles.searchInput}
            autoFocus={!category}
          />
        </View>
      </View>
      <View style={styles.searchResultRow}>
        <Text style={styles.searchResultTitle}>{query || 'All Products'}</Text>
        <Text style={styles.searchResultCount}>{results.length} founds</Text>
      </View>
      <ScrollView contentContainerStyle={styles.searchGrid} showsVerticalScrollIndicator={false}>
        {results.length === 0 ? (
          <Text style={styles.searchEmpty}>Not Found. Try another keyword.</Text>
        ) : (
          results.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  searchBack: {
    fontSize: 26,
    padding: 8,
  },
  searchField: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 8,
    color: Palette.muted,
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Palette.text,
  },
  searchResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchResultTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  searchResultCount: {
    color: Palette.textSecondary,
    fontWeight: '600',
  },
  searchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  searchEmpty: {
    width: '100%',
    textAlign: 'center',
    marginTop: 48,
    color: Palette.muted,
  },
});
