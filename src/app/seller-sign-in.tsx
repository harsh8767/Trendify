
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@/context/theme-context';
import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function SellerSignInScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    // Demo navigation only. Real seller authentication is not connected.
    router.replace('/(seller)/seller-dashboard');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/welcome')}
          >
            <FontAwesome name="arrow-left" size={16} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Logo />
            <View style={styles.sellerBadge}>
              <FontAwesome name="shopping-bag" size={10} color={colors.primary} />
              <Text style={styles.sellerBadgeText}>SELLER CENTRE</Text>
            </View>
          </View>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Welcome back!</Text>
            <Text style={styles.subtitle}>
              Sign in to manage your store, products and orders.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Seller login</Text>
            <Text style={styles.formSubtitle}>
              Enter your seller account details below.
            </Text>

            <Text style={styles.label}>Email address</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope-o" size={16} color={colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={18} color={colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={16}
                  color={colors.muted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() =>
                Alert.alert(
                  'Password recovery',
                  'Password recovery will be available when seller authentication is connected.'
                )
              }
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <PrimaryButton
              label="Sign in to Seller Centre"
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>New to selling on Trendify?</Text>
              <TouchableOpacity onPress={() => router.push('/seller-sign-up')}>
                <Text style={styles.registerLink}> Create account</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.customerCard}>
            <FontAwesome name="user-o" size={17} color={colors.primary} />
            <View style={styles.customerInfo}>
              <Text style={styles.customerTitle}>Shopping on Trendify?</Text>
              <Text style={styles.customerSubtitle}>
                Go to your customer account instead.
              </Text>
              <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                <Text style={styles.customerLink}>Customer sign in</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            By continuing, you agree to Trendify's seller terms and policies.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 22,
      paddingTop: 12,
      paddingBottom: 28,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 23,
      marginBottom: 27,
    },
    sellerBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: colors.primarySoft,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 20,
      marginTop: 12,
    },
    sellerBadgeText: {
      fontSize: 9,
      fontWeight: '900',
      letterSpacing: 1,
      color: colors.primary,
    },
    headingContainer: {
      marginBottom: 21,
    },
    heading: {
      fontSize: 27,
      fontWeight: '900',
      color: colors.text,
    },
    subtitle: {
      fontSize: 12,
      lineHeight: 19,
      color: colors.textSecondary,
      marginTop: 7,
    },
    formCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 19,
      padding: 19,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: '900',
      color: colors.text,
    },
    formSubtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 5,
      marginBottom: 22,
    },
    label: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      height: 51,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
      paddingHorizontal: 14,
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 18,
    },
    input: {
      flex: 1,
      fontSize: 12,
      color: colors.text,
      paddingVertical: 0,
    },
    forgotButton: {
      alignSelf: 'flex-end',
      marginTop: -5,
      marginBottom: 20,
    },
    forgotText: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.primary,
    },
    loginButton: {
      marginTop: 2,
    },
    registerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 20,
    },
    registerText: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    registerLink: {
      fontSize: 11,
      fontWeight: '900',
      color: colors.primary,
    },
    customerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 15,
      padding: 16,
      marginTop: 17,
    },
    customerInfo: {
      flex: 1,
    },
    customerTitle: {
      fontSize: 12,
      fontWeight: '900',
      color: colors.text,
    },
    customerSubtitle: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    customerLink: {
      fontSize: 11,
      fontWeight: '900',
      color: colors.primary,
      marginTop: 7,
    },
    footer: {
      fontSize: 9,
      lineHeight: 15,
      color: colors.muted,
      textAlign: 'center',
      marginTop: 22,
    },
  });
}
