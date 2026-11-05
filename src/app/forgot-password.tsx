import FormError from '@/components/ui/FormError';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useTheme } from '@/context/theme-context';
import { requestPasswordReset } from '@/services/auth-service';
import { validateEmail } from '@/utils/validation';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (isSubmitting) return;

    const nextEmailError = validateEmail(email);
    setEmailError(nextEmailError);
    setFormError(null);

    if (nextEmailError) return;

    setIsSubmitting(true);

    try {
      const result = await requestPasswordReset(email.trim());

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      router.push({
        pathname: '/enter-otp',
        params: { email: email.trim() },
      });
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.forgotScreen}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.forgotBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.forgotBackText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.forgotTitle}>Forgot Password</Text>

      <Text style={styles.forgotSubtitle}>
        Enter your email and we will send you an OTP code.
      </Text>

      <Text style={styles.forgotLabel}>Email</Text>

      <View style={styles.forgotField}>
        <Text style={styles.forgotIcon}>✉</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete="email"
          placeholder="Email"
          placeholderTextColor={colors.muted}
          style={styles.forgotInput}
        />
      </View>

      <FormError message={emailError} />
      <FormError message={formError} />

      <PrimaryButton
        label={isSubmitting ? 'Sending…' : 'Continue'}
        disabled={isSubmitting}
        style={styles.continueButton}
        onPress={handleContinue}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    forgotScreen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    forgotBack: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      marginTop: 4,
    },
    forgotBackText: {
      fontSize: 26,
      color: colors.text,
    },
    forgotTitle: {
      marginTop: 12,
      fontSize: 32,
      fontWeight: '800',
      color: colors.text,
    },
    forgotSubtitle: {
      marginTop: 8,
      marginBottom: 24,
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
    },
    forgotLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    forgotField: {
      height: 56,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
    },
    forgotIcon: {
      marginRight: 8,
      color: colors.accent,
      fontSize: 17,
    },
    forgotInput: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
    continueButton: {
      marginTop: 'auto',
      marginBottom: 16,
    },
  });
}