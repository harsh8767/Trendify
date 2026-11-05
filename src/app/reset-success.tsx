import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetSuccessScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.successScreen}>
      <View style={styles.successHero}>
        <Logo size={88} />

        <Text style={styles.successTitle}>
          Reset Password Successful!
        </Text>

        <Text style={styles.successBody}>
          Please log in again with your new password.
        </Text>
      </View>

      <PrimaryButton
        label="Go to Sign In"
        style={styles.signInButton}
        onPress={() => router.replace('/sign-in')}
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
    signInButton: {
      marginBottom: 16,
    },
  });
}