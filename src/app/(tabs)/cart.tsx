import PrimaryButton from '@/components/ui/PrimaryButton';
import ProductImage from '@/components/ui/ProductImage';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { getColorHex } from '@/constants/product-options';
import { getCartLineKey, useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { formatRupees } from '@/utils/currency';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
  const router = useRouter();

  const {
    cart,
    toggleCartItem,
    changeQuantity,
    removeFromCart,
    cartTotal,
    selectedCart,
  } = useShop();

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const hasSelectedItems = selectedCart.length > 0;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
        title="Cart"
        onSearch={() => router.push('/search')}
      />

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyIcon}>🛍</Text>
          </View>

          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Text style={styles.emptyDescription}>
            Looks like you haven't added anything yet. Explore our collection
            and find something you'll love.
          </Text>

          <PrimaryButton
            label="Start Shopping"
            onPress={() => router.replace('/(tabs)')}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.intro}>
              <View>
                <Text style={styles.heading}>Your shopping bag</Text>
                <Text style={styles.subtitle}>
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in your
                  cart
                </Text>
              </View>

              <View style={styles.countBadge}>
                <Text style={styles.countText}>{cart.length}</Text>
              </View>
            </View>

            {cart.map((item) => {
              const lineKey = getCartLineKey(item);

              return (
                <View key={lineKey} style={styles.cartItem}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      item.selected && styles.checkboxSelected,
                    ]}
                    onPress={() => toggleCartItem(lineKey)}
                    accessibilityRole="checkbox"
                    accessibilityLabel={`Select ${item.name}`}
                    accessibilityState={{ checked: item.selected }}
                  >
                    {item.selected ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : null}
                  </TouchableOpacity>

                  <ProductImage
                    uri={item.image}
                    style={styles.productImage}
                    label={item.name}
                  />

                  <View style={styles.productDetails}>
                    <View style={styles.productTitleRow}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                      </Text>

                      <TouchableOpacity
                        onPress={() => removeFromCart(lineKey)}
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${item.name} from cart`}
                        hitSlop={8}
                      >
                        <Text style={styles.removeIcon}>×</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.variantRow}>
                      <View
                        style={[
                          styles.colorSwatch,
                          {
                            backgroundColor: getColorHex(item.color),
                            borderColor: colors.border,
                          },
                        ]}
                      />

                      <Text style={styles.variantText}>{item.color}</Text>
                      <Text style={styles.variantDivider}>·</Text>
                      <Text style={styles.variantText}>
                        Size {item.size}
                      </Text>
                    </View>

                    <View style={styles.productBottomRow}>
                      <Text style={styles.productPrice}>
                        {formatRupees(item.price)}
                      </Text>

                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => changeQuantity(lineKey, -1)}
                          accessibilityRole="button"
                          accessibilityLabel={`Decrease quantity of ${item.name}`}
                        >
                          <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantityValue}>
                          {item.quantity}
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.quantityButton,
                            styles.quantityButtonActive,
                          ]}
                          onPress={() => changeQuantity(lineKey, 1)}
                          accessibilityRole="button"
                          accessibilityLabel={`Increase quantity of ${item.name}`}
                        >
                          <Text style={styles.quantityButtonTextActive}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerSummary}>
              <View>
                <Text style={styles.totalLabel}>Selected items total</Text>
                <Text style={styles.totalHint}>
                  {selectedCart.length} of {cart.length} items selected
                </Text>
              </View>

              <Text style={styles.totalAmount}>
                {formatRupees(cartTotal)}
              </Text>
            </View>

            <PrimaryButton
              label={
                hasSelectedItems
                  ? `Proceed to Checkout · ${formatRupees(cartTotal)}`
                  : 'Select items to checkout'
              }
              disabled={!hasSelectedItems}
              onPress={() => router.push('/checkout')}
            />
          </View>
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
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyIconCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: colors.accentSoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    emptyIcon: {
      fontSize: 38,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 10,
    },
    emptyDescription: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 26,
    },
    emptyButton: {
      width: '100%',
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 24,
    },
    intro: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    heading: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 5,
    },
    countBadge: {
      minWidth: 34,
      height: 34,
      borderRadius: 17,
      paddingHorizontal: 10,
      backgroundColor: colors.accentSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countText: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
    },
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 12,
      marginBottom: 14,
      gap: 10,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 1.5,
      borderColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxSelected: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    productImage: {
      width: 84,
      height: 100,
      borderRadius: 10,
      backgroundColor: colors.primarySoft,
    },
    productDetails: {
      flex: 1,
      justifyContent: 'space-between',
      minHeight: 100,
    },
    productTitleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 6,
    },
    productName: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      lineHeight: 19,
    },
    removeIcon: {
      color: colors.textSecondary,
      fontSize: 23,
      lineHeight: 23,
    },
    variantRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 7,
      gap: 6,
    },
    colorSwatch: {
      width: 13,
      height: 13,
      borderRadius: 7,
      borderWidth: 1,
    },
    variantText: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    variantDivider: {
      fontSize: 12,
      color: colors.muted,
    },
    productBottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    productPrice: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
    },
    quantityButton: {
      width: 27,
      height: 27,
      borderRadius: 14,
      backgroundColor: colors.accentSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quantityButtonActive: {
      backgroundColor: colors.accent,
    },
    quantityButtonText: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    quantityButtonTextActive: {
      fontSize: 17,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    quantityValue: {
      minWidth: 14,
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerSummary: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    totalLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    totalHint: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
  });
}