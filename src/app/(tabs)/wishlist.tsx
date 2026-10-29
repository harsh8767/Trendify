import ProductCard from '@/components/ui/ProductCard';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { PRODUCTS } from '@/constants/data';
import { useShop } from '@/context/shop-context';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist } = useShop();
  const items = PRODUCTS.filter((product) => wishlist.includes(product.id));

  return (
    <SafeAreaView style={styles.wishlistScreen} edges={['top']}>
      <ScreenHeader title="Wishlist" onSearch={() => router.push('/search')} onMore={() => undefined} />
      <ScrollView contentContainerStyle={styles.wishlistScroll} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <Text style={styles.wishlistEmpty}>Your wishlist is empty.</Text>
        ) : (
          <View style={styles.wishlistGrid}>
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wishlistScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wishlistScroll: {
    paddingBottom: 32,
  },
  wishlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  wishlistEmpty: {
    textAlign: 'center',
    marginTop: 48,
    color: '#9A9A9A',
  },
});
