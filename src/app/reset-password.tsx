import FormError from '@/components/ui/FormError';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useTheme } from '@/context/theme-context';
import { resetPassword } from '@/services/auth-service';
import {
  validateNewPassword,
  validatePasswordConfirmation,
} from '@/utils/validation';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email = '' } = useLocalSearchParams<{ email?: string }>();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (isSubmitting) return;

    const nextPasswordError = validateNewPassword(password);
    const nextConfirmError = validatePasswordConfirmation(
      password,
      confirm
    );

    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);
    setFormError(null);

    if (nextPasswordError || nextConfirmError) return;

    setIsSubmitting(true);

    try {
      const result = await resetPassword(email, password);

      if (!result.ok) {
        setFormError(result.message);
        return;
      }

      router.replace('/reset-success');
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.resetScreen}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.resetBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.resetBackText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.resetTitle}>Create New Password</Text>

      <Text style={styles.resetSubtitle}>
        Create your new password. If you forget it, you can reset it again
        using Forgot Password.
      </Text>

      <Text style={styles.resetLabel}>Password</Text>

      <View style={styles.resetField}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters, with a letter and a number"
          placeholderTextColor={colors.muted}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          style={styles.resetInput}
        />
      </View>

      <FormError message={passwordError} />

      <Text style={styles.resetLabel}>Confirm Password</Text>

      <View style={styles.resetField}>
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm Password"
          placeholderTextColor={colors.muted}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          style={styles.resetInput}
        />
      </View>

      <FormError message={confirmError} />
      <FormError message={formError} />

      <PrimaryButton
        label={isSubmitting ? 'Saving…' : 'Continue'}
        disabled={isSubmitting}
        style={styles.continueButton}
        onPress={handleContinue}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    resetScreen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    resetBack: {
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    resetBackText: {
      fontSize: 26,
      color: colors.text,
    },
    resetTitle: {
      marginTop: 12,
      fontSize: 32,
      fontWeight: '800',
      color: colors.text,
    },
    resetSubtitle: {
      marginTop: 8,
      marginBottom: 24,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    resetLabel: {
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    resetField: {
      minHeight: 56,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      justifyContent: 'center',
      paddingHorizontal: 14,
      marginBottom: 12,
    },
    resetInput: {
      fontSize: 15,
      color: colors.text,
    },
    continueButton: {
      marginTop: 'auto',
      marginBottom: 16,
    },
  });
}