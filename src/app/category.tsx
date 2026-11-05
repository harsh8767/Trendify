
import ProductImage from '@/components/ui/ProductImage';
import {
  findCategory,
  getSubcategoriesForCategory,
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

export default function CategoryScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();
  const { colors } = useTheme();
  const { products: allProducts } = useShop();
  const styles = createStyles(colors);

  const category = categoryId ? findCategory(categoryId) : undefined;

  const subcategories = category
    ? getSubcategoriesForCategory(category.id)
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

        <Text style={styles.headerTitle}>
          {category?.name ?? 'Category'}
        </Text>
      </View>

      {!category ? (
        <Text style={styles.emptyMessage}>
          This category could not be found.
        </Text>
      ) : subcategories.length === 0 ? (
        <Text style={styles.emptyMessage}>
          No subcategories here yet.
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {subcategories.map((subcategory) => {
            const products = allProducts.filter(
              (product) => product.subcategoryId === subcategory.id
            );

            const coverImage = products[0]?.image;
            const itemLabel = `${products.length} ${
              products.length === 1 ? 'item' : 'items'
            }`;

            return (
              <TouchableOpacity
                key={subcategory.id}
                style={styles.subcategoryRow}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`${subcategory.name}, ${itemLabel}`}
                onPress={() =>
                  router.push({
                    pathname: '/subcategory',
                    params: { subcategoryId: subcategory.id },
                  })
                }
              >
                <ProductImage
                  uri={coverImage}
                  style={styles.subcategoryImage}
                  label={subcategory.name}
                />

                <View style={styles.subcategoryText}>
                  <Text style={styles.subcategoryName}>
                    {subcategory.name}
                  </Text>
                  <Text style={styles.subcategoryCount}>
                    {itemLabel}
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    list: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 32,
      gap: 14,
    },
    subcategoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },
    subcategoryImage: {
      width: 72,
      height: 72,
      borderRadius: 16,
      backgroundColor: colors.input,
    },
    subcategoryText: {
      flex: 1,
    },
    subcategoryName: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    subcategoryCount: {
      marginTop: 4,
      fontSize: 14,
      color: colors.textSecondary,
    },
    chevron: {
      fontSize: 28,
      color: colors.muted,
      paddingRight: 6,
    },
    emptyMessage: {
      textAlign: 'center',
      marginTop: 48,
      color: colors.muted,
    },
  });
}
