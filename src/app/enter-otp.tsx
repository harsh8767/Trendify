import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EnterOtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);

  return (
    <SafeAreaView style={styles.otpScreen}>
      <TouchableOpacity onPress={() => router.back()} style={styles.otpBack}>
        <Text style={styles.otpBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.otpTitle}>Enter OTP Code</Text>
      <Text style={styles.otpSubtitle}>We have sent an OTP code to your email.</Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.otpBox}
            onChangeText={(value) => {
              const next = [...otp];
              next[index] = value;
              setOtp(next);
            }}
          />
        ))}
      </View>

      <Text style={styles.otpResend}>Resend code in 55 s</Text>
      <PrimaryButton label="Verify" style={{ marginTop: 'auto', marginBottom: 16 }} onPress={() => router.push('/reset-password')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  otpScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  otpBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  otpBackText: {
    fontSize: 26,
  },
  otpTitle: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '800',
  },
  otpSubtitle: {
    marginTop: 8,
    marginBottom: 28,
    color: Palette.textSecondary,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  otpBox: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },
  otpResend: {
    textAlign: 'center',
    marginTop: 24,
    color: Palette.muted,
  },
});
