import ScreenHeader from '@/components/ui/ScreenHeader';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useShop } from '@/context/shop-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const router = useRouter();
  const { cart, toggleCartItem, changeQuantity, removeFromCart, cartTotal, selectedCart } = useShop();

  return (
    <SafeAreaView style={styles.cartScreen} edges={['top']}>
      <ScreenHeader title="Cart" onSearch={() => router.push('/search')} onMore={() => undefined} />
      <ScrollView contentContainerStyle={styles.cartScroll} showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <TouchableOpacity
              style={[styles.cartCheck, item.selected && styles.cartCheckOn]}
              onPress={() => toggleCartItem(item.id)}
            >
              {item.selected ? <Text style={styles.cartCheckMark}>✓</Text> : null}
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.cartImage} contentFit="cover" />
            <View style={styles.cartDetails}>
              <View style={styles.cartTitleRow}>
                <Text style={styles.cartName} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.cartTrash}>🗑</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cartPills}>
                <View style={styles.cartSwatch} />
                <Text style={styles.cartPill}>{item.color}</Text>
                <Text style={styles.cartPill}>{item.size}</Text>
              </View>
              <View style={styles.cartBottomRow}>
                <Text style={styles.cartPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.cartQty}>
                  <TouchableOpacity style={styles.cartQtyBtn} onPress={() => changeQuantity(item.id, -1)}>
                    <Text style={styles.cartQtyText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.cartQtyValue}>{item.quantity}</Text>
                  <TouchableOpacity style={[styles.cartQtyBtn, styles.cartQtyBtnOn]} onPress={() => changeQuantity(item.id, 1)}>
                    <Text style={[styles.cartQtyText, styles.cartQtyTextOn]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.cartFooter}>
        <PrimaryButton
          label={`Checkout  $${cartTotal.toFixed(2)}`}
          onPress={() => selectedCart.length > 0 && router.push('/checkout')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cartScroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    padding: 14,
    gap: 12,
  },
  cartCheck: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCheckOn: {
    backgroundColor: Palette.primary,
  },
  cartCheckMark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  cartImage: {
    width: 88,
    height: 88,
    borderRadius: 18,
    backgroundColor: '#EAEAEA',
  },
  cartDetails: {
    flex: 1,
  },
  cartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cartName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
  },
  cartTrash: {
    fontSize: 16,
  },
  cartPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  cartSwatch: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#111',
  },
  cartPill: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 12,
    color: Palette.textSecondary,
    fontWeight: '600',
  },
  cartBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cartPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Palette.text,
  },
  cartQty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartQtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartQtyBtnOn: {
    backgroundColor: Palette.primary,
  },
  cartQtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.primaryDark,
  },
  cartQtyTextOn: {
    color: '#FFFFFF',
  },
  cartQtyValue: {
    minWidth: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  cartFooter: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});
