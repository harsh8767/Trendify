import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('andrew.ainsley@yourdomain.com');

  return (
    <SafeAreaView style={styles.forgotScreen}>
      <TouchableOpacity onPress={() => router.back()} style={styles.forgotBack}>
        <Text style={styles.forgotBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.forgotTitle}>Forgot Password</Text>
      <Text style={styles.forgotSubtitle}>Enter your email and we will send you an OTP code.</Text>

      <Text style={styles.forgotLabel}>Email</Text>
      <View style={styles.forgotField}>
        <Text style={styles.forgotIcon}>✉</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Palette.muted}
          style={styles.forgotInput}
        />
      </View>

      <PrimaryButton label="Continue" style={{ marginTop: 'auto', marginBottom: 16 }} onPress={() => router.push('/enter-otp')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  forgotScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  forgotTitle: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '800',
    color: Palette.text,
  },
  forgotSubtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: Palette.textSecondary,
  },
  forgotLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  forgotField: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  forgotIcon: {
    marginRight: 8,
  },
  forgotInput: {
    flex: 1,
    fontSize: 15,
    color: Palette.text,
  },
});
