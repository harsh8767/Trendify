
import ProductCard from '@/components/ui/ProductCard';
import { useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { products } = useShop();

  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState(category ?? '');

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return products;

    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
    );
  }, [products, query]);

  return (
    <SafeAreaView style={styles.searchScreen} edges={['top']}>
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.searchBack}>←</Text>
        </TouchableOpacity>

        <View style={styles.searchField}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            autoFocus={!category}
          />
        </View>
      </View>

      <View style={styles.searchResultRow}>
        <Text style={styles.searchResultTitle}>
          {query || 'All Products'}
        </Text>
        <Text style={styles.searchResultCount}>
          {results.length} found
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.searchGrid}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {results.length === 0 ? (
          <Text style={styles.searchEmpty}>
            Not Found. Try another keyword.
          </Text>
        ) : (
          results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    searchScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 8,
      backgroundColor: colors.background,
    },
    searchBack: {
      fontSize: 26,
      padding: 8,
      color: colors.text,
    },
    searchField: {
      flex: 1,
      height: 52,
      borderRadius: 16,
      backgroundColor: colors.input,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
    },
    searchIcon: {
      marginRight: 8,
      color: colors.muted,
      fontSize: 18,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    searchResultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: colors.background,
    },
    searchResultTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text,
    },
    searchResultCount: {
      color: colors.textSecondary,
      fontWeight: '600',
    },
    searchGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 32,
      backgroundColor: colors.background,
    },
    searchEmpty: {
      width: '100%',
      textAlign: 'center',
      marginTop: 48,
      color: colors.muted,
    },
  });
}
