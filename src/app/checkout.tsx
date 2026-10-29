import PrimaryButton from '@/components/ui/PrimaryButton';
import { PROFILE } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { useShop } from '@/context/shop-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutScreen() {
  const router = useRouter();
  const { selectedCart, cartTotal } = useShop();
  const [shipping, setShipping] = useState('Economy');
  const shippingFee = shipping === 'Express' ? 12 : 0;
  const total = cartTotal + shippingFee;

  return (
    <SafeAreaView style={styles.checkoutScreen} edges={['top']}>
      <View style={styles.checkoutHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.checkoutBack}>←</Text>
        </TouchableOpacity>
        <Text style={styles.checkoutTitle}>Checkout</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.checkoutScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.checkoutSection}>Shipping Address</Text>
        <View style={styles.checkoutCard}>
          <Text style={styles.checkoutHome}>Home</Text>
          <Text style={styles.checkoutAddress}>{PROFILE.address}</Text>
        </View>

        <Text style={styles.checkoutSection}>Order List</Text>
        {selectedCart.map((item) => (
          <View key={item.id} style={styles.checkoutItem}>
            <Image source={{ uri: item.image }} style={styles.checkoutImage} contentFit="cover" />
            <View style={{ flex: 1 }}>
              <Text style={styles.checkoutName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.checkoutMeta}>
                {item.color}  ·  {item.size}  ·  Qty = {item.quantity}
              </Text>
              <Text style={styles.checkoutPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.checkoutSection}>Choose Shipping</Text>
        {['Economy', 'Regular', 'Cargo', 'Express'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.checkoutShip, shipping === item && styles.checkoutShipOn]}
            onPress={() => setShipping(item)}
          >
            <Text style={styles.checkoutShipText}>{item}</Text>
            <Text style={styles.checkoutShipFee}>{item === 'Express' ? '$12.00' : 'Free'}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.checkoutSection}>Promo Code</Text>
        <View style={styles.checkoutPromo}>
          <TextInput placeholder="Enter promo code" placeholderTextColor={Palette.muted} style={styles.checkoutPromoInput} />
          <View style={styles.checkoutPromoAdd}>
            <Text style={styles.checkoutPromoAddText}>+</Text>
          </View>
        </View>

        <View style={styles.checkoutSummary}>
          <View style={styles.checkoutSummaryRow}>
            <Text style={styles.checkoutSummaryLabel}>Amount</Text>
            <Text style={styles.checkoutSummaryValue}>${cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.checkoutSummaryRow}>
            <Text style={styles.checkoutSummaryLabel}>Shipping</Text>
            <Text style={styles.checkoutSummaryValue}>{shippingFee ? `$${shippingFee.toFixed(2)}` : 'Free'}</Text>
          </View>
          <View style={[styles.checkoutSummaryRow, styles.checkoutTotalRow]}>
            <Text style={styles.checkoutTotalLabel}>Total</Text>
            <Text style={styles.checkoutTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutFooter}>
        <PrimaryButton label="Continue to Payment" onPress={() => router.replace('/checkout-success')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkoutScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  checkoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  checkoutBack: {
    fontSize: 26,
  },
  checkoutTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  checkoutScroll: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  checkoutSection: {
    marginTop: 18,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 16,
  },
  checkoutHome: {
    fontWeight: '800',
    marginBottom: 6,
  },
  checkoutAddress: {
    color: Palette.textSecondary,
    lineHeight: 20,
  },
  checkoutItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
  },
  checkoutImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  checkoutName: {
    fontWeight: '700',
    fontSize: 15,
  },
  checkoutMeta: {
    color: Palette.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
  checkoutPrice: {
    marginTop: 6,
    fontWeight: '800',
  },
  checkoutShip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  checkoutShipOn: {
    borderColor: Palette.primary,
  },
  checkoutShipText: {
    fontWeight: '700',
  },
  checkoutShipFee: {
    color: Palette.primary,
    fontWeight: '700',
  },
  checkoutPromo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkoutPromoInput: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  checkoutPromoAdd: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutPromoAddText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  checkoutSummary: {
    marginTop: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 16,
  },
  checkoutSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkoutSummaryLabel: {
    color: Palette.textSecondary,
  },
  checkoutSummaryValue: {
    fontWeight: '700',
  },
  checkoutTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    paddingTop: 12,
    marginBottom: 0,
  },
  checkoutTotalLabel: {
    fontWeight: '800',
    fontSize: 16,
  },
  checkoutTotalValue: {
    fontWeight: '800',
    fontSize: 16,
  },
  checkoutFooter: {
    padding: 24,
  },
});
