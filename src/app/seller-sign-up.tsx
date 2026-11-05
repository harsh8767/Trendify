
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

const categories = [
  'Fashion & Clothing',
  'Beauty & Personal Care',
  'Electronics',
  'Home & Living',
  'Footwear',
  'Jewellery & Accessories',
  'Other',
];

export default function SellerSignUpScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (
      !fullName.trim() ||
      !storeName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !category ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing details', 'Please complete all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      Alert.alert(
        'Invalid phone number',
        'Enter a valid 10-digit Indian mobile number.'
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Weak password',
        'Your password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Your passwords do not match.');
      return;
    }

    Alert.alert(
      'Registration details completed',
      'Your seller registration form is ready. Account creation and approval are not connected yet.',
      [
        {
          text: 'Go to seller login',
          onPress: () => router.replace('/seller-sign-in'),
        },
      ]
    );
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (value: string) => void,
    placeholder: string,
    options?: {
      keyboardType?: 'default' | 'email-address' | 'phone-pad';
      autoCapitalize?: 'none' | 'sentences' | 'words';
    }
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType={options?.keyboardType || 'default'}
        autoCapitalize={options?.autoCapitalize || 'words'}
        autoCorrect={false}
      />
    </View>
  );

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
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={16} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Logo />
            <View style={styles.sellerBadge}>
              <FontAwesome name="shopping-bag" size={10} color={colors.primary} />
              <Text style={styles.sellerBadgeText}>BECOME A SELLER</Text>
            </View>
          </View>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Start selling with us</Text>
            <Text style={styles.subtitle}>
              Create your seller profile and take your store online with Trendify.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Create seller account</Text>
            <Text style={styles.formSubtitle}>
              Enter your details to get started.
            </Text>

            {renderInput(
              'Full name',
              fullName,
              setFullName,
              'Enter your full name'
            )}

            {renderInput(
              'Store name',
              storeName,
              setStoreName,
              'Enter your store name'
            )}

            {renderInput(
              'Email address',
              email,
              setEmail,
              'Enter your email address',
              { keyboardType: 'email-address', autoCapitalize: 'none' }
            )}

            {renderInput(
              'Mobile number',
              phone,
              value => setPhone(value.replace(/\D/g, '').slice(0, 10)),
              '10-digit mobile number',
              { keyboardType: 'phone-pad', autoCapitalize: 'none' }
            )}

            <Text style={styles.label}>Store category</Text>
            <View style={styles.categoryContainer}>
              {categories.map(item => {
                const selected = category === item;

                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setCategory(item)}
                    style={[
                      styles.categoryOption,
                      selected && styles.selectedCategory,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.selectedCategoryText,
                      ]}
                    >
                      {item}
                    </Text>

                    {selected && (
                      <FontAwesome
                        name="check"
                        size={12}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor={colors.muted}
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
            <Text style={styles.helperText}>
              Use at least 8 characters.
            </Text>

            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter your password again"
                placeholderTextColor={colors.muted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <FontAwesome name="lock" size={16} color={colors.muted} />
            </View>

            <View style={styles.notice}>
              <FontAwesome
                name="info-circle"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.noticeText}>
                This is a frontend demo. Your details are not saved or submitted
                to a real seller account yet.
              </Text>
            </View>

            <PrimaryButton
              label="Create seller account"
              onPress={handleRegister}
              style={styles.registerButton}
            />

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have a seller account?</Text>
              <TouchableOpacity
                onPress={() => router.replace('/seller-sign-in')}
              >
                <Text style={styles.loginLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            By creating an account, you agree to Trendify's seller terms and policies.
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
      marginTop: 22,
      marginBottom: 24,
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
      marginBottom: 19,
    },
    heading: {
      fontSize: 25,
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
      padding: 18,
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
      marginBottom: 20,
    },
    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      height: 49,
      paddingHorizontal: 13,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 11,
      backgroundColor: colors.input,
      fontSize: 12,
      color: colors.text,
    },
    categoryContainer: {
      gap: 8,
      marginBottom: 17,
    },
    categoryOption: {
      minHeight: 43,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.input,
    },
    selectedCategory: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },
    categoryText: {
      fontSize: 11,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    selectedCategoryText: {
      color: colors.primary,
      fontWeight: '900',
    },
    passwordContainer: {
      height: 49,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 13,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 11,
      backgroundColor: colors.input,
      gap: 10,
    },
    passwordInput: {
      flex: 1,
      fontSize: 12,
      color: colors.text,
      paddingVertical: 0,
    },
    helperText: {
      fontSize: 9,
      color: colors.muted,
      marginTop: 6,
      marginBottom: 16,
    },
    notice: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 9,
      backgroundColor: colors.primarySoft,
      padding: 12,
      borderRadius: 11,
      marginTop: 19,
      marginBottom: 18,
    },
    noticeText: {
      flex: 1,
      fontSize: 10,
      lineHeight: 16,
      color: colors.textSecondary,
    },
    registerButton: {
      marginTop: 2,
    },
    loginRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 19,
    },
    loginText: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    loginLink: {
      fontSize: 11,
      fontWeight: '900',
      color: colors.primary,
    },
    footer: {
      fontSize: 9,
      lineHeight: 15,
      color: colors.muted,
      textAlign: 'center',
      marginTop: 20,
    },
  });
}
