
import PrimaryButton from '@/components/ui/PrimaryButton';
import ProductCard from '@/components/ui/ProductCard';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { PRODUCTS } from '@/constants/data';
import { useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist, cart, addToCart } = useShop();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  // Keep the newest saved products at the top.
  const savedProducts = [...wishlist].reverse().flatMap((productId) => {
    const product = PRODUCTS.find((item) => item.id === productId);
    return product ? [product] : [];
  });

  const hasSavedProducts = savedProducts.length > 0;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
  title="Wishlist"
  onSearch={() => router.push('/search')}
/>

      {hasSavedProducts ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.intro}>
            <View>
              <Text style={styles.heading}>Your saved styles</Text>
              <Text style={styles.subtitle}>
                Keep the pieces you love close.
              </Text>
            </View>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>
                {savedProducts.length}
              </Text>
            </View>
          </View>

          <Text style={styles.savedLabel}>
            {savedProducts.length}{' '}
            {savedProducts.length === 1 ? 'ITEM' : 'ITEMS'} SAVED
          </Text>

          <View style={styles.productGrid}>
            {savedProducts.map((product) => {
              const isInCart = cart.some(
                (line) => line.id === product.id
              );

              return (
                <View key={product.id} style={styles.productItem}>
                  <ProductCard product={product} width="100%" />

                  <TouchableOpacity
                    style={[
                      styles.cartButton,
                      isInCart && styles.cartButtonInCart,
                    ]}
                    onPress={() =>
                      isInCart
                        ? router.push('/(tabs)/cart')
                        : addToCart(product)
                    }
                    accessibilityRole="button"
                    accessibilityLabel={
                      isInCart
                        ? `${product.name} is in your cart. Go to cart`
                        : `Add ${product.name} to cart`
                    }
                  >
                    <Text
                      style={[
                        styles.cartButtonText,
                        isInCart && styles.cartButtonTextInCart,
                      ]}
                    >
                      {isInCart ? 'In Cart ✓' : 'Add to Cart'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyHeart}>♡</Text>
          </View>

          <Text style={styles.emptyTitle}>
            Your wishlist is waiting
          </Text>

          <Text style={styles.emptyDescription}>
            Save your favorite pieces by tapping the heart on any product.
            They'll be waiting here whenever you're ready.
          </Text>

          <PrimaryButton
            label="Explore Products"
            onPress={() => router.replace('/(tabs)')}
            style={styles.emptyButton}
          />

          <Text style={styles.emptyFootnote}>
            A little inspiration goes a long way.
          </Text>
        </View>
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
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 36,
    },
    intro: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    heading: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 5,
    },
    countBadge: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primarySoft,
    },
    countText: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.primary,
    },
    savedLabel: {
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 1.4,
      color: colors.textSecondary,
      marginBottom: 14,
    },
    productGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    productItem: {
      width: '48%',
      marginBottom: 14,
    },
    cartButton: {
      height: 42,
      borderRadius: 10,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    cartButtonInCart: {
      backgroundColor: colors.primarySoft,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cartButtonText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 13,
    },
    cartButtonTextInCart: {
      color: colors.primary,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
      paddingBottom: 40,
    },
    emptyIconCircle: {
      width: 104,
      height: 104,
      borderRadius: 52,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 26,
    },
    emptyHeart: {
      fontSize: 58,
      lineHeight: 66,
      color: colors.primary,
    },
    emptyTitle: {
      fontSize: 23,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
    },
    emptyDescription: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 10,
      maxWidth: 300,
    },
    emptyButton: {
      alignSelf: 'stretch',
      marginTop: 26,
    },
    emptyFootnote: {
      fontSize: 11,
      color: colors.muted,
      marginTop: 18,
    },
  });
}
