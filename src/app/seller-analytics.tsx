
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
  { id: '1', name: 'Classic Cotton T-Shirt', sold: 24, revenue: 14376 },
  { id: '2', name: 'Everyday Casual Shoes', sold: 18, revenue: 23382 },
  { id: '3', name: 'Minimalist Backpack', sold: 12, revenue: 10788 },
];

const orderBreakdown = [
  { label: 'Delivered', count: 18, color: '#16A34A' },
  { label: 'Processing', count: 7, color: '#2563EB' },
  { label: 'Pending', count: 4, color: '#D97706' },
  { label: 'Cancelled', count: 2, color: '#DC2626' },
];

export default function SellerAnalyticsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const maxRevenue = Math.max(...weeklyRevenue.map((item) => item.amount));
  const totalOrders = orderBreakdown.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const totalRevenue = 68450;
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
          >
            <FontAwesome name="arrow-left" size={17} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.heading}>Sales Analytics</Text>
            <Text style={styles.subtitle}>
              Understand your store performance
            </Text>
          </View>
        </View>

        <View style={styles.periodCard}>
          <View>
            <Text style={styles.periodLabel}>REPORT PERIOD</Text>
            <Text style={styles.periodValue}>Sample overview</Text>
          </View>
          <FontAwesome
            name="bar-chart"
            size={22}
            color={colors.primary}
          />
        </View>

        <View style={styles.revenueCard}>
          <Text style={styles.revenueLabel}>Total revenue</Text>
          <Text style={styles.revenueValue}>
            {formatRupees(totalRevenue)}
          </Text>
          <View style={styles.revenueFooter}>
            <FontAwesome name="line-chart" size={14} color="#FFFFFF" />
            <Text style={styles.revenueFooterText}>
              Sample sales performance
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <FontAwesome name="shopping-bag" size={17} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{totalOrders}</Text>
            <Text style={styles.statLabel}>Total orders</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <FontAwesome name="check-circle" size={17} color="#16A34A" />
            </View>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Delivered orders</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <FontAwesome name="rupee" size={17} color="#8B5CF6" />
            </View>
            <Text style={styles.statValue}>
              {formatRupees(averageOrderValue)}
            </Text>
            <Text style={styles.statLabel}>Average order value</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <FontAwesome name="clock-o" size={17} color="#D97706" />
            </View>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Pending orders</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Weekly revenue</Text>
              <Text style={styles.sectionSubtitle}>
                Sample daily sales figures
              </Text>
            </View>
            <FontAwesome
              name="bar-chart"
              size={19}
              color={colors.primary}
            />
          </View>

          <View style={styles.chart}>
            {weeklyRevenue.map((item) => (
              <View key={item.day} style={styles.chartColumn}>
                <Text style={styles.chartAmount}>
                  {item.amount >= 1000
                    ? `${(item.amount / 1000).toFixed(1)}k`
                    : item.amount}
                </Text>

                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(item.amount / maxRevenue) * 100}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.chartDay}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Best-selling products</Text>
              <Text style={styles.sectionSubtitle}>
                Your top-performing items
              </Text>
            </View>
            <FontAwesome
              name="trophy"
              size={19}
              color="#D99B2B"
            />
          </View>

          {bestSellers.map((product, index) => (
            <View key={product.id} style={styles.bestSellerRow}>
              <View style={styles.rankCircle}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>

              <View style={styles.bestSellerInfo}>
                <Text style={styles.bestSellerName}>
                  {product.name}
                </Text>
                <Text style={styles.bestSellerSold}>
                  {product.sold} units sold
                </Text>
              </View>

              <Text style={styles.bestSellerRevenue}>
                {formatRupees(product.revenue)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order breakdown</Text>
          <Text style={styles.sectionSubtitle}>
            Status of your sample orders
          </Text>

          {orderBreakdown.map((item) => (
            <View key={item.label} style={styles.breakdownItem}>
              <View style={styles.breakdownHeader}>
                <View style={styles.breakdownLabelContainer}>
                  <View
                    style={[
                      styles.breakdownDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.breakdownLabel}>
                    {item.label}
                  </Text>
                </View>

                <Text style={styles.breakdownCount}>
                  {item.count} orders
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${(item.count / totalOrders) * 100}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.noticeCard}>
          <FontAwesome
            name="info-circle"
            size={18}
            color={colors.primary}
          />
          <Text style={styles.noticeText}>
            These are demonstration figures. Actual revenue, order statistics
            and product performance will be calculated from your seller's
            real order and product records.
          </Text>
        </View>

        <Text style={styles.footer}>Trendify Seller Analytics</Text>
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
      gap: 12,
      marginBottom: 20,
    },
    backButton: {
      width: 41,
      height: 41,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      flex: 1,
    },
    heading: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.text,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    periodCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderRadius: 14,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 14,
    },
    periodLabel: {
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
      color: colors.textSecondary,
    },
    periodValue: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.text,
      marginTop: 5,
    },
    revenueCard: {
      backgroundColor: colors.primary,
      borderRadius: 18,
      padding: 19,
      marginBottom: 14,
    },
    revenueLabel: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.8)',
      fontWeight: '600',
    },
    revenueValue: {
      fontSize: 29,
      fontWeight: '900',
      color: '#FFFFFF',
      marginTop: 9,
    },
    revenueFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      marginTop: 13,
    },
    revenueFooterText: {
      fontSize: 10,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 11,
      marginBottom: 16,
    },
    statCard: {
      width: '48%',
      flexGrow: 1,
      flexBasis: '44%',
      padding: 14,
      minHeight: 123,
      borderRadius: 15,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statIcon: {
      width: 33,
      height: 33,
      borderRadius: 10,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 9,
    },
    statValue: {
      fontSize: 17,
      fontWeight: '900',
      color: colors.text,
    },
    statLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 5,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 15,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
    },
    sectionSubtitle: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 5,
    },
    chart: {
      height: 175,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 8,
      paddingTop: 12,
    },
    chartColumn: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 7,
    },
    chartAmount: {
      fontSize: 9,
      color: colors.textSecondary,
    },
    barBackground: {
      width: '100%',
      height: 105,
      borderRadius: 7,
      backgroundColor: colors.input,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    bar: {
      width: '100%',
      backgroundColor: colors.primary,
      borderRadius: 7,
      minHeight: 5,
    },
    chartDay: {
      fontSize: 9,
      color: colors.textSecondary,
    },
    bestSellerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 13,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rankCircle: {
      width: 29,
      height: 29,
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
    bestSellerInfo: {
      flex: 1,
    },
    bestSellerName: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.text,
    },
    bestSellerSold: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    bestSellerRevenue: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.primary,
    },
    breakdownItem: {
      marginTop: 17,
    },
    breakdownHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    breakdownLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    breakdownDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    breakdownLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text,
    },
    breakdownCount: {
      fontSize: 10,
      color: colors.textSecondary,
    },
    progressBackground: {
      height: 7,
      borderRadius: 5,
      backgroundColor: colors.input,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      borderRadius: 5,
    },
    noticeCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      padding: 14,
      borderRadius: 14,
      backgroundColor: colors.primarySoft,
    },
    noticeText: {
      flex: 1,
      fontSize: 10,
      lineHeight: 16,
      color: colors.textSecondary,
    },
    footer: {
      fontSize: 10,
      color: colors.muted,
      textAlign: 'center',
      marginTop: 22,
    },
  });
}
