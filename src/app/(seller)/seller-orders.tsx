
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useShop, type SellerOrderStatus } from "@/context/shop-context";
import { useTheme } from "@/context/theme-context";
import { formatRupees } from "@/utils/currency";

const SELLER_ID = "demo-seller";

const statuses: SellerOrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const filters = ["All", ...statuses];

type DemoOrder = {
  id: string;
  date: string;
  status: SellerOrderStatus;
  customer: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
  amount: number;
  payment: string;
};

const sampleOrders: DemoOrder[] = [
  {
    id: "TRD-1001",
    date: "04 Nov 2026",
    status: "Pending",
    customer: "Aarav Sharma",
    items: [
      {
        id: "demo-1",
        name: "Classic Cotton T-Shirt",
        quantity: 2,
        price: 599,
      },
    ],
    shippingAddress: "Baner, Pune, Maharashtra",
    amount: 1198,
    payment: "Paid",
  },
  {
    id: "TRD-1002",
    date: "03 Nov 2026",
    status: "Processing",
    customer: "Priya Patel",
    items: [
      {
        id: "demo-2",
        name: "Everyday Casual Shoes",
        quantity: 1,
        price: 1299,
      },
      {
        id: "demo-7",
        name: "Leather Wallet",
        quantity: 1,
        price: 499,
      },
    ],
    shippingAddress: "Kothrud, Pune, Maharashtra",
    amount: 1798,
    payment: "Paid",
  },
  {
    id: "TRD-1003",
    date: "02 Nov 2026",
    status: "Shipped",
    customer: "Rohan Desai",
    items: [
      {
        id: "demo-3",
        name: "Minimalist Backpack",
        quantity: 1,
        price: 899,
      },
    ],
    shippingAddress: "Wakad, Pune, Maharashtra",
    amount: 899,
    payment: "Paid",
  },
  {
    id: "TRD-1004",
    date: "01 Nov 2026",
    status: "Delivered",
    customer: "Sneha Kulkarni",
    items: [
      {
        id: "demo-4",
        name: "Premium Denim Jeans",
        quantity: 1,
        price: 1199,
      },
      {
        id: "demo-1",
        name: "Classic Cotton T-Shirt",
        quantity: 1,
        price: 599,
      },
    ],
    shippingAddress: "Viman Nagar, Pune, Maharashtra",
    amount: 1798,
    payment: "Paid",
  },
  {
    id: "TRD-1005",
    date: "31 Oct 2026",
    status: "Delivered",
    customer: "Kabir Mehta",
    items: [
      {
        id: "demo-5",
        name: "Elegant Wrist Watch",
        quantity: 1,
        price: 1499,
      },
    ],
    shippingAddress: "Aundh, Pune, Maharashtra",
    amount: 1499,
    payment: "Paid",
  },
  {
    id: "TRD-1006",
    date: "30 Oct 2026",
    status: "Cancelled",
    customer: "Isha Shah",
    items: [
      {
        id: "demo-6",
        name: "Printed Summer Dress",
        quantity: 1,
        price: 999,
      },
    ],
    shippingAddress: "Hadapsar, Pune, Maharashtra",
    amount: 999,
    payment: "Refunded",
  },
];

export default function SellerOrdersScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { sellerOrders, updateSellerOrderStatus } = useShop();

  const liveOrders = sellerOrders(SELLER_ID);
  const isDemoMode = liveOrders.length === 0;

  const [demoOrders, setDemoOrders] = useState<DemoOrder[]>(sampleOrders);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const orders = isDemoMode ? demoOrders : liveOrders;

  const filteredOrders = useMemo(() => {
    if (selectedFilter === "All") {
      return orders;
    }

    return orders.filter((order) => order.status === selectedFilter);
  }, [orders, selectedFilter]);

  const updateOrderStatus = (
    orderId: string,
    currentStatus: SellerOrderStatus,
    nextStatus: SellerOrderStatus,
  ) => {
    Alert.alert(
      "Update order status",
      `Change ${orderId} from ${currentStatus} to ${nextStatus}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update",
          onPress: () => {
            if (isDemoMode) {
              setDemoOrders((previousOrders) =>
                previousOrders.map((order) =>
                  order.id === orderId
                    ? { ...order, status: nextStatus }
                    : order,
                ),
              );
            } else {
              updateSellerOrderStatus(orderId, SELLER_ID, nextStatus);
            }
          },
        },
      ],
    );
  };

  const getStatusColor = (status: SellerOrderStatus) => {
    switch (status) {
      case "Pending":
        return "#D97706";
      case "Processing":
        return "#2563EB";
      case "Shipped":
        return "#7C3AED";
      case "Delivered":
        return "#16A34A";
      case "Cancelled":
        return "#DC2626";
    }
  };

  const getAvailableStatuses = (status: SellerOrderStatus) => {
    switch (status) {
      case "Pending":
        return ["Processing", "Cancelled"] as SellerOrderStatus[];
      case "Processing":
        return ["Shipped", "Cancelled"] as SellerOrderStatus[];
      case "Shipped":
        return ["Delivered"] as SellerOrderStatus[];
      default:
        return [];
    }
  };

  const renderOrder = (item: (typeof orders)[number]) => {
    const statusColor = getStatusColor(item.status);
    const availableStatuses = getAvailableStatuses(item.status);

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderHeaderInfo}>
            <Text style={styles.orderId}>{item.id}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}18` },
            ]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusColor }]}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.customerRow}>
          <View style={styles.iconBox}>
            <FontAwesome name="user" size={17} color={colors.primary} />
          </View>

          <View style={styles.flex}>
            <Text style={styles.customerName}>{item.customer}</Text>
            <Text style={styles.smallText}>Customer</Text>
          </View>
        </View>

        <View style={styles.productSection}>
          <Text style={styles.productSectionTitle}>
            Your products in this order
          </Text>

          {item.items.map((product, index) => (
            <View key={`${product.id}-${index}`} style={styles.productRow}>
              <View style={styles.productIcon}>
                <FontAwesome
                  name="shopping-bag"
                  size={17}
                  color={colors.primary}
                />
              </View>

              <View style={styles.flex}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.smallText}>
                  Quantity: {product.quantity}
                </Text>
              </View>

              <Text style={styles.productPrice}>
                {formatRupees(product.price * product.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {item.shippingAddress ? (
          <View style={styles.addressSection}>
            <FontAwesome
              name="map-marker"
              size={15}
              color={colors.textSecondary}
            />
            <Text style={styles.addressText}>{item.shippingAddress}</Text>
          </View>
        ) : null}

        <View style={styles.orderFooter}>
          <View>
            <Text style={styles.smallText}>Order amount</Text>
            <Text style={styles.amount}>{formatRupees(item.amount)}</Text>
          </View>

          <View style={styles.paymentInfo}>
            <Text style={styles.smallText}>Payment</Text>
            <Text style={styles.paymentStatus}>{item.payment}</Text>
          </View>
        </View>

        {availableStatuses.length > 0 && (
          <View style={styles.updateSection}>
            <Text style={styles.updateLabel}>Update order status</Text>

            <View style={styles.statusButtons}>
              {availableStatuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.updateButton}
                  onPress={() =>
                    updateOrderStatus(item.id, item.status, status)
                  }
                  activeOpacity={0.7}
                  accessibilityRole="button"
                >
                  <Text style={styles.updateButtonText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const pendingCount = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityRole="button"
        >
          <FontAwesome name="arrow-left" size={17} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.heading}>Manage Orders</Text>
          <Text style={styles.subtitle}>
            Track and manage your customer orders
          </Text>
        </View>
      </View>

      {isDemoMode && (
        <View style={styles.demoBanner}>
          <FontAwesome name="info-circle" size={14} color={colors.accent} />
          <Text style={styles.demoBannerText}>
            Demo orders · Sample data for presentation
          </Text>
        </View>
      )}

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{orders.length}</Text>
          <Text style={styles.summaryLabel}>Total orders</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{pendingCount}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{deliveredCount}</Text>
          <Text style={styles.summaryLabel}>Delivered</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Customer orders</Text>

      {/* Filter row has a fixed height and does not depend on selection. */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          style={styles.filterScroll}
          contentContainerStyle={styles.filterList}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {filters.map((item) => {
            const isActive = selectedFilter === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.filterButton,
                  isActive && styles.activeFilterButton,
                ]}
                onPress={() => setSelectedFilter(item)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.activeFilterText,
                  ]}
                  numberOfLines={1}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* A regular ScrollView avoids nested list virtualization here. */}
      <ScrollView
        style={styles.ordersScroll}
        contentContainerStyle={styles.orderList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <View key={order.id}>{renderOrder(order)}</View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome name="inbox" size={35} color={colors.muted} />
            <Text style={styles.emptyTitle}>
              {selectedFilter === "All"
                ? "No customer orders yet"
                : "No orders found"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === "All"
                ? "Orders containing your products will appear here after a customer completes checkout."
                : "There are no orders in this category yet."}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>["colors"]) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 18,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingTop: 13,
      paddingBottom: 18,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: {
      flex: 1,
    },
    heading: {
      fontSize: 21,
      fontWeight: "900",
      color: colors.text,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    demoBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 11,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 14,
    },
    demoBannerText: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.textSecondary,
    },
    summaryCard: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 17,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 23,
    },
    summaryItem: {
      alignItems: "center",
    },
    summaryValue: {
      fontSize: 21,
      fontWeight: "900",
      color: colors.text,
    },
    summaryLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 5,
    },
    summaryDivider: {
      width: 1,
      height: 35,
      backgroundColor: colors.border,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 12,
    },
    filterContainer: {
      height: 40,
      flexGrow: 0,
      flexShrink: 0,
      marginBottom: 12,
      overflow: "hidden",
    },
    filterScroll: {
      height: 40,
      flexGrow: 0,
      flexShrink: 0,
    },
    filterList: {
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingRight: 4,
    },
    filterButton: {
      height: 36,
      flexGrow: 0,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeFilterButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.text,
      includeFontPadding: false,
    },
    activeFilterText: {
      color: "#FFFFFF",
    },
    ordersScroll: {
      flex: 1,
    },
    orderList: {
      paddingBottom: 30,
      flexGrow: 1,
    },
    orderCard: {
      padding: 15,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 13,
    },
    orderHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    orderHeaderInfo: {
      flex: 1,
    },
    orderId: {
      fontSize: 13,
      fontWeight: "900",
      color: colors.text,
    },
    orderDate: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 9,
      paddingVertical: 6,
      borderRadius: 20,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    statusText: {
      fontSize: 10,
      fontWeight: "800",
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 13,
    },
    customerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
    },
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 11,
      backgroundColor: colors.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    flex: {
      flex: 1,
    },
    customerName: {
      fontSize: 12,
      fontWeight: "800",
      color: colors.text,
    },
    smallText: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    productSection: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    productSectionTitle: {
      fontSize: 10,
      fontWeight: "800",
      color: colors.textSecondary,
      marginBottom: 10,
    },
    productRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
    },
    productIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: colors.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    productName: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.text,
    },
    productPrice: {
      fontSize: 11,
      fontWeight: "800",
      color: colors.text,
    },
    addressSection: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 11,
      marginTop: 3,
    },
    addressText: {
      flex: 1,
      fontSize: 10,
      lineHeight: 16,
      color: colors.textSecondary,
    },
    orderFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 12,
      paddingTop: 12,
    },
    amount: {
      fontSize: 15,
      fontWeight: "900",
      color: colors.primary,
      marginTop: 4,
    },
    paymentInfo: {
      alignItems: "flex-end",
    },
    paymentStatus: {
      fontSize: 11,
      fontWeight: "800",
      color: colors.text,
      marginTop: 4,
    },
    updateSection: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 13,
      paddingTop: 12,
    },
    updateLabel: {
      fontSize: 10,
      fontWeight: "800",
      color: colors.textSecondary,
      marginBottom: 9,
    },
    statusButtons: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 7,
    },
    updateButton: {
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 8,
      backgroundColor: colors.primarySoft,
    },
    updateButtonText: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.primary,
    },
    emptyState: {
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 55,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.text,
      marginTop: 13,
      textAlign: "center",
    },
    emptySubtitle: {
      fontSize: 11,
      lineHeight: 17,
      color: colors.textSecondary,
      marginTop: 6,
      textAlign: "center",
    },
  });
}
