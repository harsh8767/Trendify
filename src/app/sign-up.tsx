
import FormError from '@/components/ui/FormError';
import { useTheme } from '@/context/theme-context';
import { signUp } from '@/services/auth-service';
import { validateEmail, validateNewPassword } from '@/utils/validation';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    if (isSubmitting) return;

    const nextEmailError = validateEmail(email);
    const nextPasswordError = validateNewPassword(password);

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setFormError(null);

    if (nextEmailError || nextPasswordError) return;

    setIsSubmitting(true);

    try {
      const result = await signUp(email.trim(), password);

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      router.replace('/(tabs)');
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    Alert.alert(
      'Coming soon',
      `${provider} sign-up will be available once social authentication is configured.`
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <View style={styles.brand}>
          <Text style={styles.brandName}>Trendify</Text>
          <Text style={styles.brandTagline}>YOUR STYLE. YOUR WAY.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Join Trendify and find something you'll love.
          </Text>

          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.muted}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>
          <FormError message={emailError} />

          <Text style={styles.label}>Create password</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters, with a letter and a number"
              placeholderTextColor={colors.muted}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
            />
          </View>
          <FormError message={passwordError} />

          <Text style={styles.passwordHint}>
            Use at least 8 characters, including a letter and a number.
          </Text>

          <FormError message={formError} />

          <TouchableOpacity
            style={[
              styles.primaryButton,
              isSubmitting && styles.disabledButton,
            ]}
            onPress={handleSignUp}
            disabled={isSubmitting}
            accessibilityRole="button"
          >
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? 'Creating account…' : 'Create your account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('Google')}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Google"
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialLabel}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('Facebook')}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Facebook"
            >
              <Text style={styles.facebookIcon}>f</Text>
              <Text style={styles.socialLabel}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('Apple')}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Apple"
            >
              <FontAwesome
                name="apple"
                size={23}
                color={colors.text}
              />
              <Text style={styles.socialLabel}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signInCard}>
          <Text style={styles.signInText}>
            Already have a Trendify account?
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/sign-in')}
            accessibilityRole="button"
          >
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          By creating an account, you agree to Trendify's terms and privacy policy.
        </Text>
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
    scrollContent: {
      paddingHorizontal: 22,
      paddingBottom: 28,
    },
    backButton: {
      width: 42,
      height: 42,
      justifyContent: 'center',
      marginTop: 4,
    },
    backArrow: {
      fontSize: 38,
      lineHeight: 42,
      color: colors.text,
    },
    brand: {
      alignItems: 'center',
      marginTop: 4,
      marginBottom: 22,
    },
    brandName: {
      fontSize: 30,
      fontWeight: '900',
      letterSpacing: -1,
      color: colors.primary,
    },
    brandTagline: {
      marginTop: 3,
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 2.5,
      color: colors.textSecondary,
    },
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 20,
    },
    title: {
      fontSize: 27,
      fontWeight: '800',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.textSecondary,
      marginTop: 7,
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    inputWrap: {
      height: 52,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 9,
      backgroundColor: colors.input,
      justifyContent: 'center',
      paddingHorizontal: 13,
      marginBottom: 8,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
    passwordHint: {
      fontSize: 11,
      lineHeight: 17,
      color: colors.muted,
      marginTop: 2,
      marginBottom: 14,
    },
    primaryButton: {
      height: 52,
      borderRadius: 9,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    disabledButton: {
      opacity: 0.6,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '800',
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginVertical: 22,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      fontSize: 12,
      color: colors.muted,
    },
    socialRow: {
      flexDirection: 'row',
      gap: 8,
    },
    socialButton: {
      flex: 1,
      minHeight: 66,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: colors.background,
    },
    googleIcon: {
      fontSize: 21,
      fontWeight: '800',
      color: '#4285F4',
    },
    facebookIcon: {
      fontSize: 23,
      fontWeight: '900',
      color: '#1877F2',
    },
    socialLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.text,
    },
    signInCard: {
      marginTop: 18,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      padding: 18,
      backgroundColor: colors.card,
      alignItems: 'center',
      gap: 10,
    },
    signInText: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    signInLink: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.primary,
    },
    footerText: {
      fontSize: 11,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.muted,
      marginTop: 20,
      paddingHorizontal: 12,
    },
  });
}
