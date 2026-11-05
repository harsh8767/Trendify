
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@/context/theme-context';

type NotificationType = 'order' | 'stock' | 'update';

type SellerNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const initialNotifications: SellerNotification[] = [
  {
    id: '1',
    type: 'order',
    title: 'New order received',
    message: 'You have received a new customer order.',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'stock',
    title: 'Low stock alert',
    message: 'One of your products is running low on stock.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'order',
    title: 'Order status reminder',
    message: 'Remember to process your pending orders.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    type: 'update',
    title: 'Welcome to Trendify Seller Centre',
    message: 'Complete your store profile to get started.',
    time: '2 days ago',
    read: true,
  },
];

export default function SellerNotificationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [notifications, setNotifications] =
    useState<SellerNotification[]>(initialNotifications);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(item => !item.read).length;

  const visibleNotifications = notifications.filter(item =>
    filter === 'all' ? true : !item.read
  );

  const markAsRead = (id: string) => {
    setNotifications(current =>
      current.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(current =>
      current.map(item => ({ ...item, read: true }))
    );
  };

  const clearAll = () => {
    Alert.alert(
      'Clear notifications',
      'Are you sure you want to remove all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear all',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return 'shopping-cart';
      case 'stock':
        return 'exclamation-triangle';
      default:
        return 'bullhorn';
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return 'ORDER';
      case 'stock':
        return 'INVENTORY';
      default:
        return 'UPDATE';
    }
  };

  const renderNotification = ({ item }: { item: SellerNotification }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.notificationCard,
        !item.read && styles.unreadCard,
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>
        <FontAwesome
          name={getIcon(item.type)}
          size={17}
          color={colors.primary}
        />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationTop}>
          <Text style={styles.typeLabel}>{getTypeLabel(item.type)}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>

        {!item.read && (
          <Text style={styles.tapHint}>Tap to mark as read</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={17} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.heading}>Notifications</Text>
            <Text style={styles.subtitle}>
              Stay updated with your store activity
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>Unread notifications</Text>
            <Text style={styles.summaryCount}>{unreadCount}</Text>
          </View>

          <View style={styles.summaryIcon}>
            <FontAwesome
              name="bell"
              size={22}
              color={colors.primary}
            />
          </View>
        </View>

        <View style={styles.toolbar}>
          <View style={styles.filters}>
            <TouchableOpacity
              onPress={() => setFilter('all')}
              style={[
                styles.filterButton,
                filter === 'all' && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'all' && styles.activeFilterText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter('unread')}
              style={[
                styles.filterButton,
                filter === 'unread' && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'unread' && styles.activeFilterText,
                ]}
              >
                Unread ({unreadCount})
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.actionText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={visibleNotifications}
          keyExtractor={item => item.id}
          renderItem={renderNotification}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <FontAwesome
                  name="bell-slash"
                  size={27}
                  color={colors.muted}
                />
              </View>
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyMessage}>
                {filter === 'unread'
                  ? 'You are all caught up!'
                  : 'Your store notifications will appear here.'}
              </Text>
            </View>
          }
        />

        {notifications.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearAll}
          >
            <FontAwesome
              name="trash-o"
              size={15}
              color={colors.danger}
            />
            <Text style={styles.clearButtonText}>Clear all notifications</Text>
          </TouchableOpacity>
        )}
      </View>
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
      flex: 1,
      paddingHorizontal: 19,
      paddingTop: 13,
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
    summaryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primarySoft,
      padding: 17,
      borderRadius: 16,
      marginBottom: 20,
    },
    summaryLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    summaryCount: {
      fontSize: 28,
      fontWeight: '900',
      color: colors.text,
      marginTop: 3,
    },
    summaryIcon: {
      width: 48,
      height: 48,
      borderRadius: 15,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 13,
    },
    filters: {
      flexDirection: 'row',
      gap: 7,
    },
    filterButton: {
      paddingHorizontal: 13,
      paddingVertical: 9,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeFilter: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.textSecondary,
    },
    activeFilterText: {
      color: '#FFFFFF',
    },
    actionText: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.primary,
    },
    listContent: {
      paddingBottom: 12,
      flexGrow: 1,
    },
    notificationCard: {
      flexDirection: 'row',
      gap: 12,
      padding: 14,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 15,
      marginBottom: 11,
    },
    unreadCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },
    notificationIcon: {
      width: 39,
      height: 39,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationContent: {
      flex: 1,
    },
    notificationTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeLabel: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 0.8,
      color: colors.primary,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    notificationTitle: {
      fontSize: 13,
      fontWeight: '900',
      color: colors.text,
      marginTop: 7,
    },
    notificationMessage: {
      fontSize: 11,
      lineHeight: 17,
      color: colors.textSecondary,
      marginTop: 5,
    },
    notificationTime: {
      fontSize: 9,
      color: colors.muted,
      marginTop: 8,
    },
    tapHint: {
      fontSize: 9,
      color: colors.primary,
      fontWeight: '700',
      marginTop: 7,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 55,
    },
    emptyIcon: {
      width: 65,
      height: 65,
      borderRadius: 22,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: '900',
      color: colors.text,
    },
    emptyMessage: {
      fontSize: 11,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 6,
    },
    clearButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    clearButtonText: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.danger,
    },
  });
}
