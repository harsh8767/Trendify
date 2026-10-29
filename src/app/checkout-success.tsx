import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.successScreen}>
      <View style={styles.successHero}>
        <Logo size={88} />
        <Text style={styles.successTitle}>Order Successful!</Text>
        <Text style={styles.successBody}>Your order is being processed and will appear in My Order.</Text>
      </View>
      <PrimaryButton label="View My Order" onPress={() => router.replace('/(tabs)/orders')} />
      <PrimaryButton
        label="Back to Home"
        variant="soft"
        style={{ marginTop: 12, marginBottom: 16 }}
        onPress={() => router.replace('/(tabs)')}
      />
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
    lineHeight: 22,
  },
});
