import ScreenHeader from '@/components/ui/ScreenHeader';
import { ORDERS, type OrderStatus } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS: OrderStatus[] = ['In Delivery', 'Completed', 'Canceled'];

export default function OrdersScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<OrderStatus>('In Delivery');
  const items = useMemo(() => ORDERS.filter((order) => order.status === tab), [tab]);

  return (
    <SafeAreaView style={styles.ordersScreen} edges={['top']}>
      <ScreenHeader title="My Order" onSearch={() => router.push('/search')} onMore={() => undefined} />
      <View style={styles.ordersTabs}>
        {TABS.map((item) => {
          const active = item === tab;
          const label = item === 'In Delivery' ? 'Active' : item;
          return (
            <TouchableOpacity key={item} style={styles.ordersTab} onPress={() => setTab(item)}>
              <Text style={[styles.ordersTabText, active && styles.ordersTabTextActive]}>{label}</Text>
              {active ? <View style={styles.ordersTabLine} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView contentContainerStyle={styles.ordersScroll} showsVerticalScrollIndicator={false}>
        {items.map((order) => (
          <View key={order.id} style={styles.ordersCard}>
            <Image source={{ uri: order.product.image }} style={styles.ordersImage} contentFit="cover" />
            <View style={styles.ordersInfo}>
              <Text style={styles.ordersName} numberOfLines={1}>
                {order.product.name}
              </Text>
              <Text style={styles.ordersMeta}>
                Qty = 1  ·  {order.product.color}  ·  {order.product.size}
              </Text>
              <View style={styles.ordersBadge}>
                <Text style={styles.ordersBadgeText}>{order.status}</Text>
              </View>
              <View style={styles.ordersBottom}>
                <Text style={styles.ordersPrice}>${order.product.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.ordersTrack}
                  onPress={() => router.push({ pathname: '/product-detail', params: { id: order.product.id } })}
                >
                  <Text style={styles.ordersTrackText}>{tab === 'In Delivery' ? 'Track Order' : 'View'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ordersScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ordersTabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ordersTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  ordersTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.muted,
  },
  ordersTabTextActive: {
    color: Palette.primary,
  },
  ordersTabLine: {
    marginTop: 10,
    height: 3,
    width: '70%',
    borderRadius: 2,
    backgroundColor: Palette.primary,
  },
  ordersScroll: {
    padding: 20,
    gap: 16,
  },
  ordersCard: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    padding: 14,
    gap: 12,
  },
  ordersImage: {
    width: 88,
    height: 88,
    borderRadius: 18,
  },
  ordersInfo: {
    flex: 1,
  },
  ordersName: {
    fontSize: 16,
    fontWeight: '700',
  },
  ordersMeta: {
    marginTop: 4,
    color: Palette.textSecondary,
    fontSize: 12,
  },
  ordersBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: Palette.primarySoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ordersBadgeText: {
    color: Palette.primaryDark,
    fontWeight: '700',
    fontSize: 11,
  },
  ordersBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ordersPrice: {
    fontWeight: '800',
    fontSize: 16,
  },
  ordersTrack: {
    backgroundColor: Palette.primary,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  ordersTrackText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
});
