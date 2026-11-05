
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useShop } from '../../context/shop-context';
import { useTheme } from '../../context/theme-context';

const TRACKING_STEPS = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

function formatRupees(amount: number) {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getItemName(item: any) {
  return item?.product?.name ?? item?.name ?? item?.title ?? 'Product';
}

function getItemImage(item: any) {
  const image =
    item?.product?.image ??
    item?.product?.images?.[0] ??
    item?.image ??
    item?.images?.[0];

  if (typeof image === 'string') {
    return { uri: image };
  }

  if (image && typeof image === 'object' && image.uri) {
    return image;
  }

  return null;
}

function getItemPrice(item: any) {
  return Number(
    item?.product?.price ??
      item?.price ??
      item?.product?.salePrice ??
      0
  );
}

function getTrackingProgress(status: string) {
  if (status === 'Completed') return 4;
  if (status === 'In Delivery') return 3;
  return 0;
}

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { orders, cancelOrder, completeOrder } = useShop();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const order = orders.find((item: any) => item.id === orderId);

  const paymentColor =
    order?.paymentMethod === 'UPI' ? colors.primary : colors.danger;

  const handleCancelOrder = () => {
    if (!order) return;

    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'Keep Order',
          style: 'cancel',
        },
        {
          text: 'Cancel Order',
          style: 'destructive',
          onPress: () => cancelOrder(order.id),
        },
      ]
    );
  };

  const handleMarkDelivered = () => {
    if (!order || order.status !== 'In Delivery') return;

    Alert.alert(
      'Mark as Delivered',
      'Move this demo order to the Completed tab?',
      [
        { text: 'Not Yet', style: 'cancel' },
        {
          text: 'Mark Delivered',
          onPress: () => completeOrder(order.id),
        },
      ]
    );
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Order not found</Text>
          <Text style={styles.emptyText}>
            We couldn't find the order you're looking for.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progress = getTrackingProgress(order.status);
  const isCanceled = order.status === 'Canceled';
  const canCancel = order.status === 'In Delivery';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <View style={styles.orderTopRow}>
            <View>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <Text style={styles.orderId}>Order #{order.id}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                isCanceled && styles.canceledBadge,
                order.status === 'Completed' && styles.completedBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isCanceled && styles.canceledText,
                  order.status === 'Completed' && styles.completedText,
                ]}
              >
                {order.status}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Date</Text>
            <Text style={styles.infoValue}>{order.placedOn}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Items</Text>
            <Text style={styles.infoValue}>
              {order.items?.length ?? 0} product(s)
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>
              {order.paymentMethod || 'Not specified'}
              {order.paymentApp ? ` · ${order.paymentApp}` : ''}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Total</Text>
            <Text style={[styles.totalValue, { color: paymentColor }]}>
              {formatRupees(Number(order.total ?? 0))}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Track Your Order</Text>

          {isCanceled ? (
            <View style={styles.messageBox}>
              <Text style={styles.canceledMessageTitle}>
                Order Canceled
              </Text>
              <Text style={styles.messageText}>
                This order has been canceled.
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.trackingSubtitle}>
                {order.status === 'Completed'
                  ? 'Your order has been delivered.'
                  : 'Your order is on its way.'}
              </Text>

              <View style={styles.timeline}>
                {TRACKING_STEPS.map((step, index) => {
                  const completed = index <= progress;
                  const isLast = index === TRACKING_STEPS.length - 1;

                  return (
                    <View style={styles.timelineRow} key={step}>
                      <View style={styles.timelineLeft}>
                        <View
                          style={[
                            styles.timelineDot,
                            completed && styles.timelineDotActive,
                          ]}
                        >
                          {completed && (
                            <Text style={styles.checkMark}>✓</Text>
                          )}
                        </View>

                        {!isLast && (
                          <View
                            style={[
                              styles.timelineLine,
                              index < progress &&
                                styles.timelineLineActive,
                            ]}
                          />
                        )}
                      </View>

                      <View style={styles.timelineContent}>
                        <Text
                          style={[
                            styles.timelineTitle,
                            completed && styles.timelineTitleActive,
                          ]}
                        >
                          {step}
                        </Text>

                        <Text style={styles.timelineDescription}>
                          {index === 0
                            ? 'We received your order'
                            : index === 1
                              ? 'Your order is being prepared'
                              : index === 2
                                ? 'Your order has been shipped'
                                : index === 3
                                  ? 'Your order is out for delivery'
                                  : 'Your order has been delivered'}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              <Text style={styles.simulatedNote}>
                Tracking progress is simulated for this demo.
              </Text>
            </>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>

          {order.items?.map((item: any, index: number) => {
            const imageSource = getItemImage(item);
            const quantity = Number(item.quantity ?? 1);
            const price = getItemPrice(item);

            return (
              <View
                style={styles.productRow}
                key={`${order.id}-${index}`}
              >
                <View style={styles.productImageContainer}>
                  {imageSource ? (
                    <Image
                      source={imageSource}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                  )}
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {getItemName(item)}
                  </Text>

                  <Text style={styles.productMeta}>
                    Qty: {quantity}
                  </Text>

                  {item.size ? (
                    <Text style={styles.productMeta}>
                      Size: {item.size}
                    </Text>
                  ) : null}

                  {item.color ? (
                    <Text style={styles.productMeta}>
                      Color: {item.color}
                    </Text>
                  ) : null}
                </View>

                <Text style={styles.productPrice}>
                  {formatRupees(price * quantity)}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shipping Details</Text>

          <View style={styles.addressLabelRow}>
            <Text style={styles.addressLabel}>
              {order.addressLabel || 'Shipping Address'}
            </Text>
          </View>

          <Text style={styles.addressText}>
            {order.shippingAddress || 'No shipping address available'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shipping Method</Text>
            <Text style={styles.infoValue}>
              {order.shippingMethod || 'Standard'}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Subtotal</Text>
            <Text style={styles.infoValue}>
              {formatRupees(Number(order.subtotal ?? 0))}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shipping Fee</Text>
            <Text style={styles.infoValue}>
              {formatRupees(Number(order.shippingFee ?? 0))}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={[styles.totalValue, { color: paymentColor }]}>
              {formatRupees(Number(order.total ?? 0))}
            </Text>
          </View>
        </View>

        {canCancel && (
          <>
            <TouchableOpacity
              style={styles.deliveredButton}
              onPress={handleMarkDelivered}
            >
              <Text style={styles.deliveredButtonText}>
                Mark as Delivered
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelOrder}
            >
              <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    backArrow: {
      fontSize: 34,
      color: colors.text,
      lineHeight: 38,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    headerSpacer: {
      width: 40,
    },
    scrollContent: {
      padding: 16,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    orderTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    orderId: {
      fontSize: 12,
      color: colors.muted,
    },
    statusBadge: {
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 11,
      paddingVertical: 6,
      borderRadius: 20,
    },
    statusText: {
      color: colors.primaryDark,
      fontSize: 11,
      fontWeight: '700',
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
      color: colors.danger,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 13,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 6,
    },
    infoLabel: {
      fontSize: 13,
      color: colors.muted,
    },
    infoValue: {
      fontSize: 13,
      color: colors.text,
      fontWeight: '600',
      maxWidth: '60%',
      textAlign: 'right',
    },
    totalLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    totalValue: {
      fontSize: 16,
      fontWeight: '700',
    },
    trackingSubtitle: {
      color: colors.muted,
      fontSize: 13,
      marginBottom: 18,
    },
    timeline: {
      marginTop: 4,
    },
    timelineRow: {
      flexDirection: 'row',
      minHeight: 66,
    },
    timelineLeft: {
      width: 28,
      alignItems: 'center',
    },
    timelineDot: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    timelineDotActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    checkMark: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
    timelineLine: {
      position: 'absolute',
      top: 22,
      width: 2,
      height: 44,
      backgroundColor: colors.border,
    },
    timelineLineActive: {
      backgroundColor: colors.primary,
    },
    timelineContent: {
      flex: 1,
      paddingLeft: 12,
      paddingBottom: 18,
    },
    timelineTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.muted,
    },
    timelineTitleActive: {
      color: colors.text,
    },
    timelineDescription: {
      fontSize: 11,
      color: colors.muted,
      marginTop: 4,
    },
    simulatedNote: {
      color: colors.muted,
      fontSize: 11,
      fontStyle: 'italic',
      marginTop: 4,
    },
    messageBox: {
      backgroundColor: colors.input,
      padding: 14,
      borderRadius: 10,
    },
    canceledMessageTitle: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 4,
    },
    messageText: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    productRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 11,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    productImageContainer: {
      width: 66,
      height: 72,
      borderRadius: 9,
      overflow: 'hidden',
      backgroundColor: colors.input,
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      fontSize: 9,
      color: colors.muted,
    },
    productInfo: {
      flex: 1,
      paddingHorizontal: 12,
    },
    productName: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 5,
    },
    productMeta: {
      fontSize: 11,
      color: colors.muted,
      marginTop: 2,
    },
    productPrice: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text,
    },
    addressLabelRow: {
      flexDirection: 'row',
      marginBottom: 7,
    },
    addressLabel: {
      fontSize: 13,
      color: colors.primary,
      fontWeight: '700',
    },
    addressText: {
      fontSize: 13,
      color: colors.text,
      lineHeight: 20,
    },
    cancelButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.danger,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 2,
    },
    cancelButtonText: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: '700',
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 13,
      borderRadius: 10,
      marginTop: 18,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    emptyText: {
      fontSize: 13,
      color: colors.muted,
      textAlign: 'center',
      marginTop: 8,
    },
    bottomSpace: {
      height: 20,
    },
    deliveredButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 2,
      marginBottom: 10,
    },
    deliveredButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
  });
}
