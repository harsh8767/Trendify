
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@/context/theme-context';
import { formatRupees } from '@/utils/currency';

const weeklyRevenue = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 2100 },
  { day: 'Wed', amount: 1600 },
  { day: 'Thu', amount: 2800 },
  { day: 'Fri', amount: 1900 },
  { day: 'Sat', amount: 3500 },
  { day: 'Sun', amount: 2600 },
];

const bestSellers = [
  { name: 'Classic Cotton T-Shirt', sold: 24, revenue: 14376 },
  { name: 'Everyday Casual Shoes', sold: 18, revenue: 23382 },
  { name: 'Minimalist Backpack', sold: 12, revenue: 10788 },
];

const orderBreakdown = [
  { label: 'Delivered', count: 18, color: '#16A34A' },
  { label: 'Processing', count: 7, color: '#2563EB' },
  { label: 'Pending', count: 4, color: '#D97706' },
  { label: 'Cancelled', count: 2, color: '#DC2626' },
];

const totalRevenue = 68450;
const totalOrders = orderBreakdown.reduce(
  (sum, item) => sum + item.count,
  0
);
const averageOrderValue = totalRevenue / totalOrders;
const maxRevenue = Math.max(...weeklyRevenue.map((item) => item.amount));
const maxOrderCount = Math.max(...orderBreakdown.map((item) => item.count));

export default function SellerDashboardScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const selectedRevenue = weeklyRevenue.find(
    (item) => item.day === selectedDay
  );

  const stats = [
    {
      label: 'Total Revenue',
      value: formatRupees(totalRevenue),
      icon: 'money',
    },
    {
      label: 'Total Orders',
      value: String(totalOrders),
      icon: 'shopping-cart',
    },
    {
      label: 'Average Order',
      value: formatRupees(averageOrderValue),
      icon: 'line-chart',
    },
    {
      label: 'Best Sellers',
      value: String(bestSellers.length),
      icon: 'star',
    },
  ] as const;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>SELLER CENTRE</Text>
            <Text style={styles.heading}>Dashboard</Text>
            <Text style={styles.subtitle}>Welcome back, Seller!</Text>
          </View>

          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.push('/seller-notifications')}
            accessibilityRole="button"
            accessibilityLabel="Open notifications"
          >
            <FontAwesome name="bell-o" size={19} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeEyebrow}>YOUR STORE</Text>
            <Text style={styles.welcomeTitle}>My Trendify Store</Text>
            <Text style={styles.welcomeDescription}>
              Manage your products, orders and store performance.
            </Text>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/seller-profile')}
            >
              <Text style={styles.profileButtonText}>View store profile</Text>
              <FontAwesome
                name="arrow-right"
                size={11}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeIcon}>
            <FontAwesome name="shopping-bag" size={30} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Store overview</Text>
            <Text style={styles.sectionSubtitle}>
              Your business at a glance
            </Text>
          </View>
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>SAMPLE DATA</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <View style={styles.statTop}>
                <View style={styles.statIcon}>
                  <FontAwesome
                    name={item.icon}
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.statNumber}>{item.value}</Text>
              </View>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Weekly revenue</Text>
            <Text style={styles.sectionSubtitle}>
              Sample revenue for the last seven days
            </Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTotal}>
            {selectedRevenue
              ? formatRupees(selectedRevenue.amount)
              : formatRupees(15700)}
          </Text>
          <Text style={styles.chartCaption}>
            {selectedRevenue
              ? `${selectedRevenue.day} revenue · Selected day`
              : 'Total weekly revenue · Tap a bar to select a day'}
          </Text>

          <View style={styles.barChart}>
            {weeklyRevenue.map((item) => {
              const isSelected = selectedDay === item.day;

              return (
                <TouchableOpacity
                  key={item.day}
                  style={[
                    styles.barColumn,
                    isSelected && styles.selectedBarColumn,
                  ]}
                  onPress={() =>
                    setSelectedDay((previous) =>
                      previous === item.day ? null : item.day
                    )
                  }
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.day}, revenue ${formatRupees(item.amount)}`}
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      styles.barValue,
                      isSelected && styles.selectedBarValue,
                    ]}
                  >
                    {item.amount >= 1000
                      ? `${(item.amount / 1000).toFixed(1)}k`
                      : item.amount}
                  </Text>

                  <View
                    style={[
                      styles.barTrack,
                      isSelected && styles.selectedBarTrack,
                    ]}
                  >
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${(item.amount / maxRevenue) * 100}%`,
                          backgroundColor: isSelected
                            ? colors.primary
                            : colors.accent,
                        },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.barDay,
                      isSelected && styles.selectedBarDay,
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Best-selling products</Text>
            <Text style={styles.sectionSubtitle}>
              Your top-performing products
            </Text>
          </View>
        </View>

        <View style={styles.listCard}>
          {bestSellers.map((item, index) => (
            <View
              key={item.name}
              style={[
                styles.sellerProductRow,
                index === bestSellers.length - 1 && styles.noBorder,
              ]}
            >
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>

              <View style={styles.sellerProductInfo}>
                <Text style={styles.sellerProductName}>{item.name}</Text>
                <Text style={styles.sellerProductSold}>
                  {item.sold} units sold
                </Text>
              </View>

              <Text style={styles.sellerProductRevenue}>
                {formatRupees(item.revenue)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Order breakdown</Text>
            <Text style={styles.sectionSubtitle}>
              Overview of order statuses
            </Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          {orderBreakdown.map((item) => (
            <View key={item.label} style={styles.orderBreakdownRow}>
              <View style={styles.orderLabelRow}>
                <View
                  style={[
                    styles.orderDot,
                    { backgroundColor: item.color },
                  ]}
                />
                <Text style={styles.orderLabel}>{item.label}</Text>
              </View>

              <View style={styles.orderProgressArea}>
                <View style={styles.orderProgressTrack}>
                  <View
                    style={[
                      styles.orderProgressFill,
                      {
                        width: `${(item.count / maxOrderCount) * 100}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.orderCount}>{item.count}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sampleNotice}>
          Analytics figures are sample data and are not connected to live sales.
        </Text>

        <Text style={styles.footer}>Trendify Seller Centre</Text>
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
    content: {
      paddingHorizontal: 19,
      paddingTop: 13,
      paddingBottom: 35,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 21,
    },
    headerText: {
      flex: 1,
    },
    greeting: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.5,
      color: colors.primary,
    },
    heading: {
      fontSize: 25,
      fontWeight: '900',
      color: colors.text,
      marginTop: 4,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    headerIcon: {
      width: 43,
      height: 43,
      borderRadius: 14,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 19,
      padding: 19,
      marginBottom: 24,
    },
    welcomeTextContainer: {
      flex: 1,
    },
    welcomeEyebrow: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1.2,
      color: '#FFFFFF',
      opacity: 0.8,
    },
    welcomeTitle: {
      fontSize: 18,
      fontWeight: '900',
      color: '#FFFFFF',
      marginTop: 6,
    },
    welcomeDescription: {
      fontSize: 10,
      lineHeight: 16,
      color: '#FFFFFF',
      opacity: 0.9,
      marginTop: 6,
      maxWidth: 210,
    },
    profileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 8,
      backgroundColor: '#FFFFFF',
      borderRadius: 9,
      paddingHorizontal: 11,
      paddingVertical: 9,
      marginTop: 13,
    },
    profileButtonText: {
      fontSize: 10,
      fontWeight: '900',
      color: colors.primary,
    },
    welcomeIcon: {
      width: 55,
      height: 55,
      borderRadius: 18,
      backgroundColor: 'rgba(255,255,255,0.17)',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 9,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '900',
      color: colors.text,
    },
    sectionSubtitle: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    demoBadge: {
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 9,
      paddingVertical: 6,
      borderRadius: 8,
    },
    demoBadgeText: {
      fontSize: 8,
      fontWeight: '900',
      color: colors.primary,
      letterSpacing: 0.6,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 25,
    },
    statCard: {
      width: '48%',
      flexGrow: 1,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 15,
      padding: 13,
      minHeight: 100,
    },
    statTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statNumber: {
      fontSize: 14,
      fontWeight: '900',
      color: colors.text,
    },
    statLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      fontWeight: '700',
      marginTop: 12,
    },
    chartCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    chartTotal: {
      fontSize: 23,
      fontWeight: '900',
      color: colors.text,
    },
    chartCaption: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    barChart: {
      height: 155,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 22,
      gap: 8,
    },
    barColumn: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: 9,
      paddingTop: 4,
    },
    selectedBarColumn: {
      backgroundColor: colors.primarySoft,
    },
    barValue: {
      fontSize: 8,
      color: colors.textSecondary,
      marginBottom: 6,
    },
    selectedBarValue: {
      color: colors.primary,
      fontWeight: '900',
    },
    barTrack: {
      width: '75%',
      height: 105,
      justifyContent: 'flex-end',
      backgroundColor: colors.primarySoft,
      borderRadius: 7,
      overflow: 'hidden',
    },
    selectedBarTrack: {
      backgroundColor: colors.border,
    },
    bar: {
      width: '100%',
      borderRadius: 7,
      minHeight: 4,
    },
    barDay: {
      fontSize: 9,
      color: colors.textSecondary,
      marginTop: 8,
    },
    selectedBarDay: {
      color: colors.primary,
      fontWeight: '900',
    },
    listCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 14,
      marginBottom: 24,
    },
    sellerProductRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    noBorder: {
      borderBottomWidth: 0,
    },
    rankBadge: {
      width: 30,
      height: 30,
      borderRadius: 10,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rankText: {
      fontSize: 12,
      fontWeight: '900',
      color: colors.primary,
    },
    sellerProductInfo: {
      flex: 1,
    },
    sellerProductName: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.text,
    },
    sellerProductSold: {
      fontSize: 9,
      color: colors.textSecondary,
      marginTop: 5,
    },
    sellerProductRevenue: {
      fontSize: 11,
      fontWeight: '900',
      color: colors.primary,
    },
    orderBreakdownRow: {
      marginBottom: 17,
    },
    orderLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    orderDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    orderLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text,
    },
    orderProgressArea: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    orderProgressTrack: {
      flex: 1,
      height: 8,
      backgroundColor: colors.primarySoft,
      borderRadius: 8,
      overflow: 'hidden',
    },
    orderProgressFill: {
      height: '100%',
      borderRadius: 8,
    },
    orderCount: {
      width: 20,
      textAlign: 'right',
      fontSize: 10,
      fontWeight: '800',
      color: colors.text,
    },
    sampleNotice: {
      fontSize: 10,
      lineHeight: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
    footer: {
      textAlign: 'center',
      color: colors.muted,
      fontSize: 10,
      marginTop: 12,
    },
  });
}
