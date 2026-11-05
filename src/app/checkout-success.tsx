
import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useTheme } from '@/context/theme-context';
import { useShop } from '@/context/shop-context';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { formatRupees } from '@/utils/currency';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutSuccessScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { orders } = useShop();
  const latestOrder = orders[0];

  return (
    <SafeAreaView style={styles.successScreen}>
      <View style={styles.successHero}>
        <Logo size={88} />

        <Text style={styles.successTitle}>Order Successful!</Text>

        <Text style={styles.successBody}>
          {latestOrder
            ? `Order ${latestOrder.id} for ${formatRupees(latestOrder.total)} is being processed and will appear in My Order.`
            : 'Your order is being processed and will appear in My Order.'}
        </Text>
      </View>

      <PrimaryButton
        label="View My Order"
        onPress={() => router.replace('/(tabs)/orders')}
      />

      <PrimaryButton
        label="Back to Home"
        variant="soft"
        style={{ marginTop: 12, marginBottom: 16 }}
        onPress={() => router.replace('/(tabs)')}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    successScreen: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.text,
    },
    successBody: {
      marginTop: 10,
      textAlign: 'center',
      color: colors.textSecondary,
      lineHeight: 22,
    },
  });
}
