import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.successScreen}>
      <View style={styles.successHero}>
        <Logo size={88} />
        <Text style={styles.successTitle}>Reset Password Successful!</Text>
        <Text style={styles.successBody}>Please login again with your new password.</Text>
      </View>
      <PrimaryButton label="Go to Sign In" style={{ marginBottom: 16 }} onPress={() => router.replace('/sign-in')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  successScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  successHero: {
    alignItems: 'center',
    marginBottom: 48,
  },
  successTitle: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: Palette.text,
  },
  successBody: {
    marginTop: 10,
    textAlign: 'center',
    color: Palette.textSecondary,
  },
});
