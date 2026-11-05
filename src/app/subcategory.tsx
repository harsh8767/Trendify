
import ProductCard from '@/components/ui/ProductCard';
import {
  findCategory,
  findSubcategory,
} from '@/constants/catalogue';
import { useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubcategoryScreen() {
  const router = useRouter();
  const { subcategoryId } = useLocalSearchParams<{
    subcategoryId?: string;
  }>();
  const { colors } = useTheme();
  const { products: allProducts } = useShop();
  const styles = createStyles(colors);

  const subcategory = subcategoryId
    ? findSubcategory(subcategoryId)
    : undefined;

  const category = subcategory
    ? findCategory(subcategory.categoryId)
    : undefined;

  const products = subcategory
    ? allProducts.filter(
        (product) => product.subcategoryId === subcategory.id
      )
    : [];

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>
            {subcategory?.name ?? 'Products'}
          </Text>
          {category ? (
            <Text style={styles.breadcrumb}>{category.name}</Text>
          ) : null}
        </View>
      </View>

      {!subcategory ? (
        <Text style={styles.emptyMessage}>
          This subcategory could not be found.
        </Text>
      ) : (
        <>
          <View style={styles.countRow}>
            <Text style={styles.countText}>
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          >
            {products.length === 0 ? (
              <Text style={styles.emptyMessage}>
                No products here yet.
              </Text>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 8,
    },
    backArrow: {
      fontSize: 26,
      padding: 8,
      color: colors.text,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
    },
    breadcrumb: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    countRow: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    countText: {
      color: colors.textSecondary,
      fontWeight: '600',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    emptyMessage: {
      width: '100%',
      textAlign: 'center',
      marginTop: 48,
      color: colors.muted,
    },
  });
}
