
import ProductImage from '@/components/ui/ProductImage';
import { type Product } from '@/constants/data';
import { useTheme } from '@/context/theme-context';
import { useShop } from '@/context/shop-context';
import { formatRupees } from '@/utils/currency';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductCardProps = {
  product: Product;
  width?: number | `${number}%`;
};

export default function ProductCard({
  product,
  width = '48%',
}: ProductCardProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { isWishlisted, toggleWishlist } = useShop();
  const saved = isWishlisted(product.id);

  return (
    <TouchableOpacity
      style={[styles.productCard, { width }]}
      onPress={() =>
        router.push({
          pathname: '/product-detail',
          params: { id: product.id },
        })
      }
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.name}`}
    >
      <View style={styles.productCardImageWrap}>
        <ProductImage
          uri={product.image}
          style={styles.productCardImage}
          label={product.name}
        />

        <TouchableOpacity
          style={styles.productCardHeart}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          accessibilityState={{ selected: saved }}
        >
          <Text
            style={[
              styles.productCardHeartIcon,
              saved && styles.productCardHeartSaved,
            ]}
          >
            {saved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.productCardName} numberOfLines={1}>
        {product.name}
      </Text>

      <View style={styles.productCardMeta}>
        <Text style={styles.productCardStar}>★</Text>
        <Text style={styles.productCardRating}>
          {product.rating.toFixed(1)}
        </Text>

        <View style={styles.productCardDivider} />

        <View style={styles.productCardSold}>
          <Text style={styles.productCardSoldText}>
            {product.sold?.toLocaleString() ??
              product.reviews.toLocaleString()} sold
          </Text>
        </View>
      </View>

      <Text style={styles.productCardPrice}>
        {formatRupees(product.price)}
      </Text>
    </TouchableOpacity>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    productCard: {
      marginBottom: 18,
    },
    productCardImageWrap: {
      aspectRatio: 4 / 5,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: colors.card,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    productCardImage: {
      width: '100%',
      height: '100%',
    },
    productCardHeart: {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.accent,
    },
    productCardHeartIcon: {
      color: colors.text,
      fontSize: 19,
    },
    productCardHeartSaved: {
      color: colors.danger,
    },
    productCardName: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    productCardMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
      gap: 6,
    },
    productCardStar: {
      color: colors.star,
      fontSize: 13,
    },
    productCardRating: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    productCardDivider: {
      width: 1,
      height: 12,
      backgroundColor: colors.border,
    },
    productCardSold: {
      backgroundColor: colors.accentSoft,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    productCardSoldText: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.primary,
    },
    productCardPrice: {
      marginTop: 6,
      fontSize: 18,
      fontWeight: '800',
      color: colors.text,
    },
  });
}
