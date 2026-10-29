import { type Product } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { useShop } from '@/context/shop-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductCardProps = {
  product: Product;
  width?: number | `${number}%`;
};

export default function ProductCard({ product, width = '48%' }: ProductCardProps) {
  const router = useRouter();
  const { isWishlisted, toggleWishlist } = useShop();
  const saved = isWishlisted(product.id);

  return (
    <TouchableOpacity
      style={[styles.productCard, { width }]}
      onPress={() => router.push({ pathname: '/product-detail', params: { id: product.id } })}
      activeOpacity={0.9}
    >
      <View style={styles.productCardImageWrap}>
        <Image source={{ uri: product.image }} style={styles.productCardImage} contentFit="cover" />
        <TouchableOpacity
          style={styles.productCardHeart}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={8}
        >
          <Text style={[styles.productCardHeartIcon, saved && styles.productCardHeartSaved]}>{saved ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productCardName} numberOfLines={1}>
        {product.name}
      </Text>
      <View style={styles.productCardMeta}>
        <Text style={styles.productCardStar}>★</Text>
        <Text style={styles.productCardRating}>{product.rating.toFixed(1)}</Text>
        <View style={styles.productCardDivider} />
        <View style={styles.productCardSold}>
          <Text style={styles.productCardSoldText}>{product.sold?.toLocaleString() ?? product.reviews.toLocaleString()} sold</Text>
        </View>
      </View>
      <Text style={styles.productCardPrice}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    marginBottom: 18,
  },
  productCardImageWrap: {
    height: 184,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#F3F3F3',
    marginBottom: 10,
  },
  productCardImage: {
    width: '100%',
    height: '100%',
  },
  productCardHeart: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCardHeartIcon: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  productCardHeartSaved: {
    color: '#FF5A5F',
  },
  productCardName: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
  },
  productCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  productCardStar: {
    color: Palette.star,
    fontSize: 13,
  },
  productCardRating: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.text,
  },
  productCardDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#D9D9D9',
  },
  productCardSold: {
    backgroundColor: Palette.primarySoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  productCardSoldText: {
    fontSize: 11,
    fontWeight: '600',
    color: Palette.primaryDark,
  },
  productCardPrice: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.text,
  },
});
