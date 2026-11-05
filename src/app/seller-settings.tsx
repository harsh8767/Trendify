
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@/context/theme-context';

export default function SellerSettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [orderNotifications, setOrderNotifications] = useState(true);
  const [stockNotifications, setStockNotifications] = useState(true);
  const [promotionNotifications, setPromotionNotifications] = useState(false);

  const showComingSoon = (feature: string) => {
    Alert.alert(
      'Coming soon',
      `${feature} will be available when seller account settings are connected.`
    );
  };

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
          >
            <FontAwesome name="arrow-left" size={17} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.subtitle}>
              Manage your seller account preferences
            </Text>
          </View>
        </View>

        <View style={styles.storeBanner}>
          <View style={styles.storeIcon}>
            <FontAwesome name="shopping-bag" size={23} color="#FFFFFF" />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>My Trendify Store</Text>
            <Text style={styles.storeEmail}>seller@example.com</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/seller-profile')}
            style={styles.viewProfile}
          >
            <FontAwesome name="chevron-right" size={14} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Notifications</Text>
        <View style={styles.sectionCard}>
          <SettingSwitch
            icon="shopping-cart"
            title="New order alerts"
            description="Get notified when a customer places an order"
            value={orderNotifications}
            onValueChange={setOrderNotifications}
            colors={colors}
          />

          <SettingSwitch
            icon="exclamation-triangle"
            title="Low stock alerts"
            description="Get notified when your product stock is low"
            value={stockNotifications}
            onValueChange={setStockNotifications}
            colors={colors}
          />

          <SettingSwitch
            icon="bullhorn"
            title="Promotions and updates"
            description="Receive Trendify seller announcements"
            value={promotionNotifications}
            onValueChange={setPromotionNotifications}
            colors={colors}
            last
          />
        </View>

        <Text style={styles.sectionHeading}>Store management</Text>
        <View style={styles.sectionCard}>
          <SettingLink
            icon="user"
            title="Store profile"
            description="Manage your store and contact information"
            onPress={() => router.push('/seller-profile')}
            colors={colors}
          />
          <SettingLink
            icon="credit-card"
            title="Payment settings"
            description="Manage your payment preferences"
            onPress={() => showComingSoon('Payment settings')}
            colors={colors}
          />
          <SettingLink
            icon="map-marker"
            title="Shipping preferences"
            description="Configure your shipping preferences"
            onPress={() => showComingSoon('Shipping preferences')}
            colors={colors}
            last
          />
        </View>

        <Text style={styles.sectionHeading}>Help and support</Text>
        <View style={styles.sectionCard}>
          <SettingLink
            icon="question-circle"
            title="Help centre"
            description="Find answers to common seller questions"
            onPress={() => showComingSoon('Help centre')}
            colors={colors}
          />
          <SettingLink
            icon="envelope"
            title="Contact support"
            description="Get assistance with your seller account"
            onPress={() => showComingSoon('Contact support')}
            colors={colors}
            last
          />
        </View>

        <Text style={styles.footer}>Trendify Seller Centre</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingSwitch({
  icon,
  title,
  description,
  value,
  onValueChange,
  colors,
  last = false,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  colors: ReturnType<typeof useTheme>['colors'];
  last?: boolean;
}) {
  const styles = createStyles(colors);

  return (
    <View style={[styles.settingRow, last && styles.lastRow]}>
      <View style={styles.settingIcon}>
        <FontAwesome name={icon} size={15} color={colors.primary} />
      </View>

      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function SettingLink({
  icon,
  title,
  description,
  onPress,
  colors,
  last = false,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
  onPress: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
  last?: boolean;
}) {
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.settingRow, last && styles.lastRow]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIcon}>
        <FontAwesome name={icon} size={15} color={colors.primary} />
      </View>

      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>

      <FontAwesome name="chevron-right" size={12} color={colors.muted} />
    </TouchableOpacity>
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
      marginBottom: 21,
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
    storeBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 15,
      marginBottom: 24,
    },
    storeIcon: {
      width: 47,
      height: 47,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    storeInfo: {
      flex: 1,
      marginLeft: 12,
    },
    storeName: {
      fontSize: 13,
      fontWeight: '900',
      color: colors.text,
    },
    storeEmail: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    viewProfile: {
      padding: 9,
    },
    sectionHeading: {
      fontSize: 14,
      fontWeight: '900',
      color: colors.text,
      marginBottom: 10,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      paddingHorizontal: 14,
      marginBottom: 22,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 11,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    settingIcon: {
      width: 35,
      height: 35,
      borderRadius: 11,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.text,
    },
    settingDescription: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
      lineHeight: 15,
    },
    footer: {
      textAlign: 'center',
      color: colors.muted,
      fontSize: 10,
      marginTop: 23,
    },
    version: {
      textAlign: 'center',
      color: colors.muted,
      fontSize: 9,
      marginTop: 5,
    },
  });
}
