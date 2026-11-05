
import PrimaryButton from '@/components/ui/PrimaryButton';
import ProductImage from '@/components/ui/ProductImage';
import {
  getCartLineKey,
  useShop,
  type PaymentMethod,
} from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import { formatRupees } from '@/utils/currency';
import { useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UPI_APPS = ['Google Pay', 'PhonePe', 'Paytm'];

export default function CheckoutScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    selectedCart,
    cartTotal,
    placeOrder,
    deliveryAddress,
  } = useShop();

  const hasPlacedOrder = useRef(false);

  const [shipping, setShipping] = useState('Economy');
  const [address, setAddress] = useState(deliveryAddress || '');
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('Cash on Delivery');
  const [upiApp, setUpiApp] = useState('Google Pay');

  const shippingFee = shipping === 'Express' ? 12 : 0;
  const total = cartTotal + shippingFee;

  const handlePlaceOrder = () => {
    if (hasPlacedOrder.current || selectedCart.length === 0) return;

    if (!address.trim()) {
      Alert.alert(
        'Delivery address required',
        'Please enter your delivery address.'
      );
      return;
    }

    if (paymentMethod === 'UPI') {
      Alert.alert(
        'Demo UPI Payment',
        `This is a frontend demo. Simulate a successful payment using ${upiApp}?`,
        [
          { text: 'Go Back', style: 'cancel' },
          {
            text: 'Confirm Demo Payment',
            onPress: () => finishOrder(),
          },
        ]
      );
      return;
    }

    finishOrder();
  };

  const finishOrder = () => {
    if (hasPlacedOrder.current || selectedCart.length === 0) return;

    hasPlacedOrder.current = true;

    placeOrder(
      shipping,
      shippingFee,
      address.trim(),
      'Delivery Address',
      paymentMethod,
      paymentMethod === 'UPI' ? upiApp : undefined
    );

    router.replace('/checkout-success');
  };

  return (
    <SafeAreaView style={styles.checkoutScreen} edges={['top']}>
      <View style={styles.checkoutHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.checkoutBack}>←</Text>
        </TouchableOpacity>

        <Text style={styles.checkoutTitle}>Checkout</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.checkoutScroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.checkoutSection}>Shipping Address</Text>

        <View style={styles.checkoutCard}>
          <Text style={styles.checkoutHome}>Delivery Address</Text>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your complete delivery address"
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
            style={styles.addressInput}
          />

          <Text style={styles.addressHint}>
            Enter your house number, street, area, city and PIN code.
          </Text>
        </View>

        <Text style={styles.checkoutSection}>Order List</Text>

        {selectedCart.map((item) => (
          <View key={getCartLineKey(item)} style={styles.checkoutItem}>
            <ProductImage
              uri={item.image}
              style={styles.checkoutImage}
              label={item.name}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.checkoutName} numberOfLines={1}>
                {item.name}
              </Text>

              <Text style={styles.checkoutMeta}>
                {item.color} · {item.size} · Qty = {item.quantity}
              </Text>

              <Text style={styles.checkoutPrice}>
                {formatRupees(item.price)}
              </Text>
            </View>
          </View>
        ))}

        <Text style={styles.checkoutSection}>Choose Shipping</Text>

        {['Economy', 'Regular', 'Cargo', 'Express'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.checkoutShip,
              shipping === item && styles.checkoutShipOn,
            ]}
            onPress={() => setShipping(item)}
          >
            <Text style={styles.checkoutShipText}>{item}</Text>

            <Text style={styles.checkoutShipFee}>
              {item === 'Express' ? formatRupees(12) : 'Free'}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.checkoutSection}>Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'UPI' && styles.checkoutShipOn,
          ]}
          onPress={() => setPaymentMethod('UPI')}
        >
          <View style={styles.paymentOptionTop}>
            <View style={styles.paymentRadio}>
              {paymentMethod === 'UPI' && (
                <View style={styles.paymentRadioDot} />
              )}
            </View>

            <View style={styles.paymentTextWrap}>
              <Text style={styles.paymentTitle}>UPI</Text>

              <Text style={styles.paymentSubtitle}>
                Pay using your preferred UPI app
              </Text>
            </View>

            <Text style={styles.paymentSymbol}>₹</Text>
          </View>

          {paymentMethod === 'UPI' && (
            <View style={styles.upiApps}>
              {UPI_APPS.map((app) => (
                <TouchableOpacity
                  key={app}
                  style={[
                    styles.upiAppButton,
                    upiApp === app && styles.upiAppButtonActive,
                  ]}
                  onPress={() => setUpiApp(app)}
                >
                  <Text
                    style={[
                      styles.upiAppText,
                      upiApp === app && styles.upiAppTextActive,
                    ]}
                  >
                    {app}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'Cash on Delivery' && styles.checkoutShipOn,
          ]}
          onPress={() => setPaymentMethod('Cash on Delivery')}
        >
          <View style={styles.paymentOptionTop}>
            <View style={styles.paymentRadio}>
              {paymentMethod === 'Cash on Delivery' && (
                <View style={styles.paymentRadioDot} />
              )}
            </View>

            <View style={styles.paymentTextWrap}>
              <Text style={styles.paymentTitle}>Cash on Delivery</Text>

              <Text style={styles.paymentSubtitle}>
                Pay when your order arrives
              </Text>
            </View>

            <Text style={styles.codIcon}>💵</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.checkoutSection}>Promo Code</Text>

        <View style={styles.checkoutPromo}>
          <TextInput
            placeholder="Enter promo code"
            placeholderTextColor={colors.muted}
            style={styles.checkoutPromoInput}
          />

          <View style={styles.checkoutPromoAdd}>
            <Text style={styles.checkoutPromoAddText}>+</Text>
          </View>
        </View>

        <View style={styles.checkoutSummary}>
          <View style={styles.checkoutSummaryRow}>
            <Text style={styles.checkoutSummaryLabel}>Amount</Text>

            <Text style={styles.checkoutSummaryValue}>
              {formatRupees(cartTotal)}
            </Text>
          </View>

          <View style={styles.checkoutSummaryRow}>
            <Text style={styles.checkoutSummaryLabel}>Shipping</Text>

            <Text style={styles.checkoutSummaryValue}>
              {shippingFee ? formatRupees(shippingFee) : 'Free'}
            </Text>
          </View>

          <View
            style={[
              styles.checkoutSummaryRow,
              styles.checkoutTotalRow,
            ]}
          >
            <Text style={styles.checkoutTotalLabel}>Total</Text>

            <Text style={styles.checkoutTotalValue}>
              {formatRupees(total)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutFooter}>
        <PrimaryButton
          label={
            paymentMethod === 'UPI'
              ? 'Pay & Place Order'
              : 'Place Order'
          }
          disabled={selectedCart.length === 0}
          onPress={handlePlaceOrder}
        />

        <Text style={styles.demoNote}>
          {paymentMethod === 'UPI'
            ? 'UPI payment is simulated for this frontend demo.'
            : 'You will pay when your order is delivered.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    checkoutScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    checkoutHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    checkoutBack: {
      fontSize: 26,
      color: colors.text,
    },
    checkoutTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
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
      color: colors.text,
    },
    checkoutCard: {
      backgroundColor: colors.input,
      borderRadius: 20,
      padding: 16,
    },
    checkoutHome: {
      fontWeight: '800',
      marginBottom: 10,
      color: colors.text,
    },
    addressInput: {
      minHeight: 90,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      lineHeight: 20,
    },
    addressHint: {
      color: colors.muted,
      fontSize: 11,
      marginTop: 8,
    },
    checkoutItem: {
      flexDirection: 'row',
      gap: 12,
      backgroundColor: colors.input,
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
      color: colors.text,
    },
    checkoutMeta: {
      color: colors.textSecondary,
      marginTop: 4,
      fontSize: 12,
    },
    checkoutPrice: {
      marginTop: 6,
      fontWeight: '800',
      color: colors.text,
    },
    checkoutShip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.input,
      borderRadius: 16,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    checkoutShipOn: {
      borderColor: colors.primary,
    },
    checkoutShipText: {
      fontWeight: '700',
      color: colors.text,
    },
    checkoutShipFee: {
      color: colors.primary,
      fontWeight: '700',
    },
    paymentOption: {
      backgroundColor: colors.input,
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    paymentOptionTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paymentRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    paymentRadioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    paymentTextWrap: {
      flex: 1,
    },
    paymentTitle: {
      fontWeight: '800',
      fontSize: 15,
      color: colors.text,
    },
    paymentSubtitle: {
      color: colors.textSecondary,
      fontSize: 12,
      marginTop: 4,
    },
    paymentSymbol: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.primary,
    },
    codIcon: {
      fontSize: 20,
    },
    upiApps: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 16,
      paddingLeft: 32,
    },
    upiAppButton: {
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    upiAppButtonActive: {
      borderColor: colors.primary,
      backgroundColor: colors.input,
    },
    upiAppText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    upiAppTextActive: {
      color: colors.primary,
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
      backgroundColor: colors.input,
      paddingHorizontal: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    checkoutPromoAdd: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primary,
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
      backgroundColor: colors.input,
      borderRadius: 20,
      padding: 16,
    },
    checkoutSummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    checkoutSummaryLabel: {
      color: colors.textSecondary,
    },
    checkoutSummaryValue: {
      fontWeight: '700',
      color: colors.text,
    },
    checkoutTotalRow: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
      marginBottom: 0,
    },
    checkoutTotalLabel: {
      fontWeight: '800',
      fontSize: 16,
      color: colors.text,
    },
    checkoutTotalValue: {
      fontWeight: '800',
      fontSize: 16,
      color: colors.primary,
    },
    checkoutFooter: {
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 18,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    demoNote: {
      color: colors.muted,
      fontSize: 11,
      textAlign: 'center',
      marginTop: 8,
    },
  });
}
