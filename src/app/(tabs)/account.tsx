import ScreenHeader from '@/components/ui/ScreenHeader';
import { PROFILE } from '@/constants/data';
import { useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import { signOut } from '@/services/auth-service';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ModalType =
  | 'profile'
  | 'address'
  | 'payment'
  | 'security'
  | 'language'
  | 'privacy'
  | 'help'
  | null;

export default function AccountScreen() {
  const router = useRouter();
  const { isDark, toggleTheme, colors } = useTheme();

  const styles = createStyles(colors);

  const {
    profile,
    deliveryAddress,
    updateProfile,
    updateDeliveryAddress,
  } = useShop();

  const [notifications, setNotifications] = useState(true);
  const [modal, setModal] = useState<ModalType>(null);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const [address, setAddress] = useState(deliveryAddress);
  const [language, setLanguage] = useState('English (US)');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const closeModal = () => {
    setModal(null);
    setPassword('');
    setConfirmPassword('');
  };

  const saveProfile = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter your name.');
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });

    closeModal();

    Alert.alert(
      'Profile updated',
      'Your profile changes are saved for this session.'
    );
  };

  const saveAddress = () => {
    if (!address.trim()) {
      Alert.alert('Missing address', 'Please enter your delivery address.');
      return;
    }

    updateDeliveryAddress(address.trim());
    closeModal();

    Alert.alert(
      'Address updated',
      'Your address is updated on this Account screen for this session.'
    );
  };

  const savePassword = () => {
    if (password.length < 6) {
      Alert.alert('Invalid password', 'Use at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please check both entries.');
      return;
    }

    closeModal();

    Alert.alert(
      'Password updated',
      'This is a demo confirmation. No account password is changed because the app has no authentication backend.'
    );
  };

  const handleMenu = (label: string) => {
    switch (label) {
      case 'Edit Profile':
        setModal('profile');
        break;

      case 'Address':
        setModal('address');
        break;

      case 'Notification':
        router.push('/notifications');
        break;

      case 'Payment':
        setModal('payment');
        break;

      case 'Security':
        setModal('security');
        break;

      case 'Language':
        setModal('language');
        break;

      case 'Privacy Policy':
        setModal('privacy');
        break;

      case 'Help Center':
        setModal('help');
        break;

      case 'Invite Friends':
        Share.share({
          message:
            'Check out Trendify! Discover great products and shop your favorites.',
        }).catch(() => {
          Alert.alert('Unable to share', 'Please try again.');
        });
        break;
    }
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to leave Trendify?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/sign-in');
          } catch {
            Alert.alert(
              'Logout failed',
              'Something went wrong. Please try again.'
            );
          }
        },
      },
    ]);
  };

  const MENU = [
    { label: 'Edit Profile', icon: '☺' },
    { label: 'Address', icon: '📍' },
    { label: 'Notification', icon: '🔔' },
    { label: 'Payment', icon: '💳' },
    { label: 'Security', icon: '🛡' },
    { label: 'Language', icon: '🌐' },
    { label: 'Privacy Policy', icon: '👁' },
    { label: 'Help Center', icon: '?' },
    { label: 'Invite Friends', icon: '👥' },
  ];

  const renderModalContent = () => {
    switch (modal) {
      case 'profile':
        return (
          <>
            <Text style={styles.modalDescription}>
              Update your personal information.
            </Text>

            <Text style={styles.fieldLabel}>Full name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={styles.input}
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.fieldLabel}>Email address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.fieldLabel}>Phone number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor={colors.muted}
            />

            <ActionButton
              label="Save Profile"
              onPress={saveProfile}
              colors={colors}
            />
          </>
        );

      case 'address':
        return (
          <>
            <Text style={styles.modalDescription}>
              Edit the address you use for deliveries.
            </Text>

            <Text style={styles.fieldLabel}>Delivery address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="House number, street, area, city and PIN code"
              multiline
              textAlignVertical="top"
              style={[styles.input, styles.addressInput]}
              placeholderTextColor={colors.muted}
            />

            <ActionButton
              label="Save Address"
              onPress={saveAddress}
              colors={colors}
            />
          </>
        );

      case 'payment':
        return (
          <>
            <Text style={styles.modalDescription}>
              Payment options currently available in Trendify.
            </Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>UPI</Text>
              <Text style={styles.infoText}>
                Google Pay, PhonePe and Paytm (simulated payment).
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Cash on Delivery</Text>
              <Text style={styles.infoText}>
                Pay when your order is delivered.
              </Text>
            </View>
          </>
        );

      case 'security':
        return (
          <>
            <Text style={styles.modalDescription}>
              Set a new password for this demo account.
            </Text>

            <Text style={styles.fieldLabel}>New password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              secureTextEntry
              style={styles.input}
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.fieldLabel}>Confirm password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor={colors.muted}
            />

            <ActionButton
              label="Update Password"
              onPress={savePassword}
              colors={colors}
            />
          </>
        );

      case 'language':
        return (
          <>
            <Text style={styles.modalDescription}>
              Choose your app language.
            </Text>

            {['English (US)', 'English (UK)', 'Hindi'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.choiceRow}
                onPress={() => {
                  setLanguage(item);
                  closeModal();
                }}
              >
                <Text style={styles.choiceText}>{item}</Text>
                <Text style={styles.choiceCheck}>
                  {language === item ? '✓' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        );

      case 'privacy':
        return (
          <Text style={styles.modalDescription}>
            Trendify demo privacy information:
            {'\n\n'}This frontend-only app does not send your profile details
            to a server. Information entered into local screen state is not
            guaranteed to persist after closing or restarting the app.
            {'\n\n'}No real payment details are collected by this demo.
          </Text>
        );

      case 'help':
        return (
          <>
            <Text style={styles.modalDescription}>
              Need help with Trendify?
              {'\n\n'}For this demo, you can use the My Order tab to view your
              orders, open an order to see its details, and use the Address
              and Payment options on this screen to review your settings.
              {'\n\n'}There is no live customer-support service connected yet.
            </Text>

            <ActionButton
              label="View My Orders"
              onPress={() => {
                closeModal();
                router.push('/orders');
              }}
              colors={colors}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.accountScreen} edges={['top']}>
      <ScreenHeader
        title="Account"
        onSearch={() => router.push('/search')}
      />

      <ScrollView
        contentContainerStyle={styles.accountScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accountProfile}>
          <Image
            source={{ uri: PROFILE.image }}
            style={styles.accountAvatar}
            contentFit="cover"
          />

          <TouchableOpacity
            style={styles.accountEdit}
            onPress={() => setModal('profile')}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Text style={styles.accountEditIcon}>✎</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.accountName}>{profile.name}</Text>

        {!!profile.email && (
          <Text style={styles.accountEmail}>{profile.email}</Text>
        )}

        <View style={styles.section}>
          {MENU.slice(0, 5).map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.accountRow}
              onPress={() => handleMenu(item.label)}
              accessibilityRole="button"
            >
              <Text style={styles.accountIcon}>{item.icon}</Text>
              <Text style={styles.accountLabel}>{item.label}</Text>
              <Text style={styles.accountChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.accountRow}
            onPress={() => handleMenu('Language')}
            accessibilityRole="button"
          >
            <Text style={styles.accountIcon}>🌐</Text>
            <Text style={styles.accountLabel}>Language</Text>
            <Text style={styles.accountValue}>{language}</Text>
            <Text style={styles.accountChevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.accountRow}>
            <Text style={styles.accountIcon}>🔔</Text>
            <Text style={styles.accountLabel}>Push Notifications</Text>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                true: colors.accent,
                false: colors.border,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.accountIcon}>◐</Text>
            <Text style={styles.accountLabel}>Dark Mode</Text>

            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                true: colors.accent,
                false: colors.border,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          {MENU.slice(6).map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.accountRow}
              onPress={() => handleMenu(item.label)}
              accessibilityRole="button"
            >
              <Text style={styles.accountIcon}>{item.icon}</Text>
              <Text style={styles.accountLabel}>{item.label}</Text>
              <Text style={styles.accountChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.accountRow}
          onPress={confirmLogout}
          accessibilityRole="button"
        >
          <Text style={styles.accountIcon}>⎋</Text>
          <Text style={[styles.accountLabel, styles.accountLogout]}>
            Logout
          </Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Trendify · Demo App</Text>
      </ScrollView>

      <Modal
        visible={modal !== null}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modal === 'profile'
                  ? 'Edit Profile'
                  : modal === 'address'
                    ? 'Delivery Address'
                    : modal === 'payment'
                      ? 'Payment'
                      : modal === 'security'
                        ? 'Security'
                        : modal === 'language'
                          ? 'Language'
                          : modal === 'privacy'
                            ? 'Privacy Policy'
                            : 'Help Center'}
              </Text>

              <TouchableOpacity
                onPress={closeModal}
                accessibilityRole="button"
                accessibilityLabel="Close modal"
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {renderModalContent()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ActionButton({
  label,
  onPress,
  colors,
}: {
  label: string;
  onPress: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
}) {
  return (
    <TouchableOpacity
      style={[
        stylesActionButton,
        { backgroundColor: colors.primary },
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={stylesActionButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const stylesActionButton = {
  borderRadius: 12,
  paddingVertical: 15,
  alignItems: 'center' as const,
  marginTop: 8,
};

const stylesActionButtonText = {
  color: '#FFFFFF',
  fontWeight: '800' as const,
  fontSize: 15,
};

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    accountScreen: {
      flex: 1,
      backgroundColor: colors.background,
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
      backgroundColor: colors.primarySoft,
    },
    accountEdit: {
      position: 'absolute',
      right: 4,
      bottom: 4,
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: colors.accent,
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
      marginTop: 16,
      color: colors.text,
    },
    accountEmail: {
      textAlign: 'center',
      color: colors.muted,
      marginTop: 4,
      marginBottom: 16,
    },
    section: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 4,
      paddingBottom: 4,
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
      color: colors.text,
    },
    accountLabel: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    accountValue: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 12,
    },
    accountChevron: {
      fontSize: 22,
      color: colors.muted,
    },
    accountLogout: {
      color: colors.danger,
    },
    versionText: {
      textAlign: 'center',
      color: colors.muted,
      fontSize: 12,
      marginTop: 18,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'flex-end',
    },
    modalCard: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 36,
      maxHeight: '85%',
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 21,
      fontWeight: '800',
      color: colors.text,
    },
    closeButton: {
      fontSize: 20,
      color: colors.muted,
      padding: 4,
    },
    modalDescription: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.textSecondary,
      marginBottom: 18,
    },
    fieldLabel: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 7,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      color: colors.text,
      fontSize: 15,
      marginBottom: 16,
    },
    addressInput: {
      minHeight: 105,
    },
    infoCard: {
      backgroundColor: colors.input,
      borderRadius: 12,
      padding: 15,
      marginBottom: 12,
    },
    infoTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '800',
      marginBottom: 5,
    },
    infoText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
    },
    choiceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    choiceText: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '600',
    },
    choiceCheck: {
      color: colors.accent,
      fontWeight: '900',
      fontSize: 18,
    },
  });
}