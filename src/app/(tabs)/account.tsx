import ScreenHeader from '@/components/ui/ScreenHeader';
import { PROFILE } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU = [
  { label: 'Edit Profile', icon: '☺' },
  { label: 'Address', icon: '📍' },
  { label: 'Notification', icon: '🔔' },
  { label: 'Payment', icon: '💳' },
  { label: 'Security', icon: '🛡' },
  { label: 'Language', icon: '🌐', value: 'English (US)' },
  { label: 'Privacy Policy', icon: '👁' },
  { label: 'Help Center', icon: '?' },
  { label: 'Invite Friends', icon: '👥' },
];

export default function AccountScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.accountScreen} edges={['top']}>
      <ScreenHeader title="Account" onMore={() => undefined} />
      <ScrollView contentContainerStyle={styles.accountScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.accountProfile}>
          <Image source={{ uri: PROFILE.image }} style={styles.accountAvatar} contentFit="cover" />
          <View style={styles.accountEdit}>
            <Text style={styles.accountEditIcon}>✎</Text>
          </View>
        </View>
        <Text style={styles.accountName}>{PROFILE.name}</Text>

        {MENU.slice(0, 5).map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.accountRow}
            onPress={() => (item.label === 'Notification' ? router.push('/notifications') : undefined)}
          >
            <Text style={styles.accountIcon}>{item.icon}</Text>
            <Text style={styles.accountLabel}>{item.label}</Text>
            <Text style={styles.accountChevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.accountRow}>
          <Text style={styles.accountIcon}>🌐</Text>
          <Text style={styles.accountLabel}>Language</Text>
          <Text style={styles.accountValue}>English (US)</Text>
          <Text style={styles.accountChevron}>›</Text>
        </View>

        <View style={styles.accountRow}>
          <Text style={styles.accountIcon}>◐</Text>
          <Text style={styles.accountLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: Palette.primary, false: '#E5E5E5' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {MENU.slice(6).map((item) => (
          <TouchableOpacity key={item.label} style={styles.accountRow}>
            <Text style={styles.accountIcon}>{item.icon}</Text>
            <Text style={styles.accountLabel}>{item.label}</Text>
            <Text style={styles.accountChevron}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.accountRow} onPress={() => router.replace('/')}>
          <Text style={styles.accountIcon}>⎋</Text>
          <Text style={[styles.accountLabel, styles.accountLogout]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  accountScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  accountScroll: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  accountProfile: {
    alignSelf: 'center',
    marginTop: 8,
  },
  accountAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DDD',
  },
  accountEdit: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountEditIcon: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  accountName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 16,
    color: Palette.text,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 14,
  },
  accountIcon: {
    width: 24,
    fontSize: 18,
  },
  accountLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Palette.text,
  },
  accountValue: {
    color: Palette.text,
    fontWeight: '600',
  },
  accountChevron: {
    fontSize: 22,
    color: Palette.muted,
  },
  accountLogout: {
    color: Palette.danger,
  },
});
