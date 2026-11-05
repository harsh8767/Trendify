import Logo from '@/components/brand/Logo';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/walkthrough');
    }, 1600);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.splashScreen}>
      <View style={styles.splashBrand}>
        <Logo size={108} inverted />
        <Text style={styles.splashTitle}>Trendify</Text>
      </View>

      <ActivityIndicator
        size="large"
        color="#FFFFFF"
        style={styles.splashLoader}
      />
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    splashScreen: {
      flex: 1,
      backgroundColor: colors.primaryDark,
      alignItems: 'center',
      justifyContent: 'center',
    },
    splashBrand: {
      alignItems: 'center',
      gap: 22,
    },
    splashTitle: {
      color: '#FFFFFF',
      fontSize: 36,
      fontWeight: '700',
    },
    splashLoader: {
      position: 'absolute',
      bottom: 92,
    },
  });
}