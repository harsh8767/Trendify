import ProductImage from '@/components/ui/ProductImage';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { type OrderStatus } from '@/constants/data';
import { useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { formatRupees } from '@/utils/currency';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS: OrderStatus[] = ['In Delivery', 'Completed', 'Canceled'];

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useShop();
  const { colors } = useTheme();
  const [tab, setTab] = useState<OrderStatus>('In Delivery');

  const styles = createStyles(colors);

  const visibleOrders = useMemo(
    () => orders.filter((order) => order.status === tab),
    [orders, tab]
  );

  const orderCounts = useMemo(
    () => ({
      'In Delivery': orders.filter(
        (order) => order.status === 'In Delivery'
      ).length,
      Completed: orders.filter(
        (order) => order.status === 'Completed'
      ).length,
      Canceled: orders.filter(
        (order) => order.status === 'Canceled'
      ).length,
    }),
    [orders]
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader
        title="My Orders"
        onSearch={() => router.push('/search')}
      />

      <View style={styles.intro}>
        <Text style={styles.heading}>Your orders</Text>
        <Text style={styles.subtitle}>
          Keep track of your purchases and deliveries.
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        {TABS.map((item) => {
          const active = item === tab;
          const label = item === 'In Delivery' ? 'Active' : item;

          return (
            <TouchableOpacity
              key={item}
              style={styles.tab}
              onPress={() => setTab(item)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <View style={styles.tabContent}>
                <Text
                  style={[
                    styles.tabText,
                    active && styles.tabTextActive,
                  ]}
                >
                  {label}
                </Text>

                {orderCounts[item] > 0 && (
                  <View
                    style={[
                      styles.tabCount,
                      active && styles.tabCountActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabCountText,
                        active && styles.tabCountTextActive,
                      ]}
                    >
                      {orderCounts[item]}
                    </Text>
                  </View>
                )}
              </View>

              {active && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>
                {tab === 'In Delivery'
                  ? '📦'
                  : tab === 'Completed'
                    ? '✓'
                    : '↺'}
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              {tab === 'In Delivery'
                ? 'No active orders'
                : tab === 'Completed'
                  ? 'No completed orders'
                  : 'No canceled orders'}
            </Text>

            <Text style={styles.emptyDescription}>
              {tab === 'In Delivery'
                ? 'Your upcoming deliveries will appear here once you place an order.'
                : tab === 'Completed'
                  ? 'Orders you successfully receive will be listed here.'
                  : 'You currently have no canceled orders.'}
            </Text>

            {tab === 'In Delivery' && (
              <TouchableOpacity
                style={styles.shopButton}
                onPress={() => router.replace('/(tabs)')}
                accessibilityRole="button"
              >
                <Text style={styles.shopButtonText}>
                  Explore Products
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <Text style={styles.sectionLabel}>
              {tab === 'In Delivery'
                ? 'CURRENT ORDERS'
                : `${tab.toUpperCase()} ORDERS`}
            </Text>

            {visibleOrders.map((order) => {
              const firstItem = order.items[0];

              if (!firstItem) return null;

              const itemCount = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
                <TouchableOpacity
                  key={order.id}
                  style={styles.orderCard}
                  activeOpacity={0.9}
                  onPress={() =>
                    router.push({
                      pathname: '/order-details',
                      params: { orderId: order.id },
                    })
                  }
                  accessibilityRole="button"
                  accessibilityLabel={`View order ${order.id}`}
                >
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.orderIdLabel}>ORDER ID</Text>
                      <Text style={styles.orderId}>{order.id}</Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        order.status === 'Completed' &&
                          styles.completedBadge,
                        order.status === 'Canceled' &&
                          styles.canceledBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          order.status === 'Completed' &&
                            styles.completedText,
                          order.status === 'Canceled' &&
                            styles.canceledText,
                        ]}
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.productRow}>
                    <ProductImage
                      uri={firstItem.image}
                      style={styles.productImage}
                      label={firstItem.name}
                    />

                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {firstItem.name}
                        {order.items.length > 1
                          ? ` + ${order.items.length - 1} more`
                          : ''}
                      </Text>

                      <Text style={styles.productMeta}>
                        {itemCount} item{itemCount !== 1 ? 's' : ''}
                      </Text>

                      <Text style={styles.orderDate}>
                        Placed on {order.placedOn}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
                      <Text style={styles.orderPrice}>
                        {formatRupees(order.total)}
                      </Text>
                    </View>

                    <View style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>
                        {tab === 'In Delivery' ? 'Track Order' : 'View Details'}
                      </Text>
                      <Text style={styles.viewArrow}>›</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    intro: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 18,
    },
    heading: {
      fontSize: 22,
      fontWeight: '800',
      letterSpacing: -0.5,
      color: colors.text,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 5,
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
    },
    tabContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    tabText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.muted,
    },
    tabTextActive: {
      color: colors.accent,
      fontWeight: '800',
    },
    tabCount: {
      minWidth: 19,
      height: 19,
      paddingHorizontal: 5,
      borderRadius: 10,
      backgroundColor: colors.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabCountActive: {
      backgroundColor: colors.accentSoft,
    },
    tabCountText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    tabCountTextActive: {
      color: colors.primary,
    },
    activeIndicator: {
      position: 'absolute',
      bottom: 0,
      height: 3,
      width: '65%',
      borderRadius: 3,
      backgroundColor: colors.accent,
    },
    scrollContent: {
      paddingHorizontal: 18,
      paddingTop: 20,
      paddingBottom: 32,
      gap: 14,
      flexGrow: 1,
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 1.3,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    orderCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    orderIdLabel: {
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
      color: colors.muted,
    },
    orderId: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text,
      marginTop: 4,
    },
    statusBadge: {
      backgroundColor: colors.primarySoft,
      borderRadius: 7,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    statusText: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.primaryDark,
    },
    completedBadge: {
      backgroundColor: colors.primarySoft,
    },
    completedText: {
      color: colors.primary,
    },
    canceledBadge: {
      backgroundColor: colors.input,
    },
    canceledText: {
      color: colors.textSecondary,
    },
    cardDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 13,
    },
    productRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
    },
    productImage: {
      width: 76,
      height: 84,
      borderRadius: 11,
      backgroundColor: colors.input,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '700',
      color: colors.text,
    },
    productMeta: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 6,
    },
    orderDate: {
      fontSize: 11,
      color: colors.muted,
      marginTop: 4,
    },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    totalLabel: {
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 0.8,
      color: colors.muted,
    },
    orderPrice: {
      fontSize: 17,
      fontWeight: '900',
      color: colors.text,
      marginTop: 4,
    },
    viewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: colors.primary,
      borderRadius: 20,
      paddingHorizontal: 13,
      paddingVertical: 9,
    },
    viewButtonText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    viewArrow: {
      fontSize: 18,
      lineHeight: 18,
      color: '#FFFFFF',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 28,
      paddingBottom: 40,
    },
    emptyIconCircle: {
      width: 94,
      height: 94,
      borderRadius: 47,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    emptyIcon: {
      fontSize: 36,
      color: colors.primary,
    },
    emptyTitle: {
      fontSize: 21,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
    },
    emptyDescription: {
      fontSize: 13,
      lineHeight: 21,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 9,
      maxWidth: 290,
    },
    shopButton: {
      marginTop: 24,
      backgroundColor: colors.primary,
      paddingHorizontal: 26,
      paddingVertical: 13,
      borderRadius: 24,
    },
    shopButtonText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '800',
    },
  });
}