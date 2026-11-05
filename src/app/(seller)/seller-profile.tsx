
import React from 'react';
import {
  Alert,
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

export default function SellerProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const showNotConnected = () => {
    Alert.alert(
      'Coming soon',
      'Profile editing will be available once seller account storage is connected.'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out of Seller Centre?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => router.replace('/seller-sign-in'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.heading}>My Account</Text>
            <Text style={styles.subtitle}>
              Manage your seller account and store
            </Text>
          </View>

          <TouchableOpacity
            style={styles.settingsButton}
            activeOpacity={0.7}
            onPress={() => router.push('/seller-settings')}
          >
            <FontAwesome name="cog" size={21} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.storeIcon}>
            <FontAwesome name="shopping-bag" size={30} color="#FFFFFF" />
          </View>

          <Text style={styles.storeName}>My Trendify Store</Text>
          <Text style={styles.storeCategory}>Fashion & Accessories</Text>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Demo account</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={showNotConnected}
          >
            <FontAwesome name="pencil" size={12} color={colors.primary} />
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Seller information</Text>

          <InfoRow icon="user" label="Full name" value="Seller Name" colors={colors} />
          <InfoRow icon="envelope" label="Email address" value="seller@example.com" colors={colors} />
          <InfoRow icon="phone" label="Phone number" value="+91 98765 43210" colors={colors} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Store information</Text>

          <InfoRow icon="shopping-bag" label="Store name" value="My Trendify Store" colors={colors} />
          <InfoRow icon="tags" label="Store category" value="Fashion & Accessories" colors={colors} />
          <InfoRow icon="calendar" label="Member since" value="Not available" colors={colors} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account status</Text>

          <View style={styles.accountStatusRow}>
            <View style={styles.accountStatusIcon}>
              <FontAwesome
                name="info-circle"
                size={18}
                color={colors.primary}
              />
            </View>

            <View style={styles.accountStatusInfo}>
              <Text style={styles.accountStatusTitle}>
                Demo seller profile
              </Text>
              <Text style={styles.accountStatusDescription}>
                This profile currently displays sample information. Your
                actual registration details and approval status will appear
                when account storage is connected.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={17} color={colors.danger} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Trendify Seller Centre</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  label,
  value,
  colors,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>['colors'];
}) {
  const styles = createStyles(colors);

  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <FontAwesome name={icon} size={15} color={colors.primary} />
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
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
      paddingTop: 18,
      paddingBottom: 35,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 19,
      gap: 12,
    },
    headerText: {
      flex: 1,
    },
    heading: {
      fontSize: 23,
      fontWeight: '900',
      color: colors.text,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    settingsButton: {
      width: 43,
      height: 43,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileCard: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 23,
      marginBottom: 17,
    },
    storeIcon: {
      width: 76,
      height: 76,
      borderRadius: 24,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 13,
    },
    storeName: {
      fontSize: 19,
      fontWeight: '900',
      color: colors.text,
    },
    storeCategory: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 5,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 20,
      marginTop: 13,
    },
    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    statusText: {
      fontSize: 10,
      fontWeight: '800',
      color: colors.primary,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      marginTop: 16,
    },
    editButtonText: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.primary,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '900',
      color: colors.text,
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 13,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoIcon: {
      width: 35,
      height: 35,
      borderRadius: 11,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text,
    },
    accountStatusRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 11,
      paddingTop: 8,
    },
    accountStatusIcon: {
      width: 36,
      height: 36,
      borderRadius: 11,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountStatusInfo: {
      flex: 1,
    },
    accountStatusTitle: {
      fontSize: 12,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 6,
    },
    accountStatusDescription: {
      fontSize: 11,
      lineHeight: 17,
      color: colors.textSecondary,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      paddingVertical: 15,
      borderWidth: 1,
      borderColor: colors.danger,
      borderRadius: 13,
      marginTop: 8,
    },
    logoutText: {
      fontSize: 13,
      fontWeight: '900',
      color: colors.danger,
    },
    footer: {
      fontSize: 10,
      color: colors.muted,
      textAlign: 'center',
      marginTop: 22,
    },
  });
}
