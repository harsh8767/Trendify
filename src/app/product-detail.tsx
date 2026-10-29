import PrimaryButton from '@/components/ui/PrimaryButton';
import { PRODUCTS } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { useShop } from '@/context/shop-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = ['#111111', '#C4A484', '#7A7A7A', '#E7D7C6'];
const SIZES = ['S', 'M', 'L', 'XL'];

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const product = useMemo(() => PRODUCTS.find((item) => item.id === id) ?? PRODUCTS[0], [id]);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(product.size);
  const saved = isWishlisted(product.id);

  return (
    <SafeAreaView style={styles.productScreen} edges={['top']}>
      <View style={styles.productHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.productIconBtn}>
          <Text style={styles.productIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.productHeaderActions}>
          <TouchableOpacity style={styles.productIconBtn} onPress={() => toggleWishlist(product.id)}>
            <Text style={styles.productIcon}>{saved ? '♥' : '♡'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productIconBtn}>
            <Text style={styles.productIcon}>⇪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
        <Image source={{ uri: product.image }} style={styles.productImage} contentFit="cover" />
        <View style={styles.productBody}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productMeta}>
            <View style={styles.productSold}>
              <Text style={styles.productSoldText}>{product.sold?.toLocaleString()} sold</Text>
            </View>
            <Text style={styles.productStar}>★ {product.rating.toFixed(1)}</Text>
            <Text style={styles.productReviews}>({product.reviews.toLocaleString()} reviews)</Text>
          </View>

          <Text style={styles.productSection}>Description</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.productRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productSection}>Color</Text>
              <View style={styles.productColors}>
                {COLORS.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setColor(item)}
                    style={[styles.productSwatch, { backgroundColor: item }, color === item && styles.productSwatchOn]}
                  />
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.productSection}>Size</Text>
              <View style={styles.productSizes}>
                {SIZES.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setSize(item)}
                    style={[styles.productSize, size === item && styles.productSizeOn]}
                  >
                    <Text style={[styles.productSizeText, size === item && styles.productSizeTextOn]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.productFooter}>
        <View>
          <Text style={styles.productTotalLabel}>Total Price</Text>
          <Text style={styles.productTotal}>${product.price.toFixed(2)}</Text>
        </View>
        <PrimaryButton
          label="Add to Cart"
          style={{ flex: 1, marginLeft: 16 }}
          onPress={() => {
            addToCart({ ...product, color, size });
            router.push('/(tabs)/cart');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  productHeaderActions: {
    flexDirection: 'row',
  },
  productIconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productIcon: {
    fontSize: 24,
  },
  productScroll: {
    paddingBottom: 24,
  },
  productImage: {
    height: 380,
    marginHorizontal: 24,
    borderRadius: 36,
    backgroundColor: '#F3F3F3',
  },
  productBody: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: '800',
    color: Palette.text,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  productSold: {
    backgroundColor: Palette.primarySoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productSoldText: {
    color: Palette.primaryDark,
    fontWeight: '700',
    fontSize: 12,
  },
  productStar: {
    fontWeight: '700',
  },
  productReviews: {
    color: Palette.textSecondary,
  },
  productSection: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '800',
  },
  productDescription: {
    color: Palette.textSecondary,
    lineHeight: 22,
    fontSize: 14,
  },
  productRow: {
    flexDirection: 'row',
    gap: 16,
  },
  productColors: {
    flexDirection: 'row',
    gap: 10,
  },
  productSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  productSwatchOn: {
    borderWidth: 3,
    borderColor: Palette.primary,
  },
  productSizes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  productSize: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productSizeOn: {
    backgroundColor: Palette.primary,
  },
  productSizeText: {
    fontWeight: '700',
    color: Palette.text,
  },
  productSizeTextOn: {
    color: '#FFFFFF',
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  productTotalLabel: {
    color: Palette.muted,
    fontSize: 12,
  },
  productTotal: {
    fontSize: 22,
    fontWeight: '800',
  },
});
