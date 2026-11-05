import FormError from '@/components/ui/FormError';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useTheme } from '@/context/theme-context';
import {
  requestPasswordReset,
  verifyOtpCode,
} from '@/services/auth-service';
import { validateOtpCode } from '@/utils/validation';
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

export default function EnterOtpScreen() {
  const router = useRouter();
  const { email = '' } = useLocalSearchParams<{ email?: string }>();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendNotice, setResendNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleDigitChange = (index: number, value: string) => {
    const digitOnly = value.replace(/\D/g, '').slice(-1);
    const nextOtp = [...otp];

    nextOtp[index] = digitOnly;
    setOtp(nextOtp);
    setOtpError(null);
  };

  const handleVerify = async () => {
    if (isSubmitting) return;

    const code = otp.join('');
    const nextOtpError = validateOtpCode(code);

    setOtpError(nextOtpError);

    if (nextOtpError) return;

    setIsSubmitting(true);

    try {
      const result = await verifyOtpCode(email, code);

      if (!result.ok) {
        setOtpError(result.message);
        return;
      }

      router.push({
        pathname: '/reset-password',
        params: { email },
      });
    } catch {
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (isResending || isSubmitting) return;

    setIsResending(true);
    setResendNotice(null);
    setOtpError(null);

    try {
      const result = await requestPasswordReset(email);

      setResendNotice(
        result.ok
          ? 'A new code has been sent.'
          : result.message
      );
    } catch {
      setResendNotice('Unable to resend the code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.otpScreen}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.otpBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.otpBackText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.otpTitle}>Enter OTP Code</Text>

      <Text style={styles.otpSubtitle}>
        We have sent an OTP code to your email.
      </Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.otpBox}
            accessibilityLabel={`Digit ${index + 1} of 4`}
            onChangeText={(value) => handleDigitChange(index, value)}
          />
        ))}
      </View>

      <FormError message={otpError} />

      <TouchableOpacity
        onPress={handleResend}
        disabled={isResending || isSubmitting}
        accessibilityRole="button"
      >
        <Text style={styles.otpResend}>
          {isResending
            ? 'Sending new code…'
            : resendNotice ?? "Didn't get a code? Resend"}
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        label={isSubmitting ? 'Verifying…' : 'Verify'}
        disabled={isSubmitting || isResending}
        style={styles.verifyButton}
        onPress={handleVerify}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    otpScreen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    otpBack: {
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    otpBackText: {
      fontSize: 26,
      color: colors.text,
    },
    otpTitle: {
      marginTop: 12,
      fontSize: 32,
      fontWeight: '800',
      color: colors.text,
    },
    otpSubtitle: {
      marginTop: 8,
      marginBottom: 28,
      color: colors.textSecondary,
    },
    otpRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    otpBox: {
      flex: 1,
      height: 64,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.accent,
      backgroundColor: colors.input,
      color: colors.text,
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '800',
    },
    otpResend: {
      textAlign: 'center',
      marginTop: 24,
      color: colors.accent,
      fontWeight: '600',
    },
    verifyButton: {
      marginTop: 'auto',
      marginBottom: 16,
    },
  });
}