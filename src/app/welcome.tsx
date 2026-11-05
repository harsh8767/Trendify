
import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SOCIAL = [
  { name: 'Google', icon: 'G' },
  { name: 'Apple', icon: '' },
  { name: 'Facebook', icon: 'f' },
  { name: 'Twitter', icon: '𝕏' },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors, isDark);

  const handleSocialPress = (provider: string) => {
    Alert.alert(
      'Coming soon',
      `${provider} sign-in will be available soon. For now, continue with email.`
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.brand}>
            <Logo size={42} />
            <Text style={styles.brandName}>Trendify</Text>
          </View>

          <View style={styles.brandTag}>
            <Text style={styles.brandTagText}>STYLE YOUR WAY</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroArtwork}>
            <View style={styles.artCircleOuter} />
            <View style={styles.artCircleInner} />
            <View style={styles.artAccentOne} />
            <View style={styles.artAccentTwo} />

            <View style={styles.heroLogo}>
              <Logo size={82} />
            </View>

            <View style={styles.artLabel}>
              <Text style={styles.artLabelText}>
                YOUR STYLE. YOUR STORY.
              </Text>
            </View>
          </View>

          <Text style={styles.eyebrow}>WELCOME TO TRENDIFY</Text>

          <Text style={styles.title}>
            Discover your{'\n'}
            <Text style={styles.titleAccent}>
              next favourite look.
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            Find the styles you love, explore new trends,
            and make every outfit yours.
          </Text>
        </View>

        <View style={styles.actionSection}>
          <PrimaryButton
            label="Create an account"
            onPress={() => router.push('/sign-up')}
          />

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/sign-in')}
            activeOpacity={0.75}
            accessibilityRole="button"
          >
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInAccent}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          {SOCIAL.map((provider) => (
            <TouchableOpacity
              key={provider.name}
              style={styles.socialButton}
              onPress={() => handleSocialPress(provider.name)}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={`Continue with ${provider.name}`}
            >
              {provider.name === 'Apple' ? (
                <FontAwesome
                  name="apple"
                  size={27}
                  color={colors.text}
                />
              ) : (
                <Text
                  style={[
                    styles.socialIcon,
                    provider.name === 'Google' && styles.googleIcon,
                    provider.name === 'Facebook' && styles.facebookIcon,
                  ]}
                >
                  {provider.icon}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Seller entry point */}
        <View style={styles.sellerSection}>
          <View style={styles.sellerDivider} />

          <View style={styles.sellerCard}>
            <View style={styles.sellerIconCircle}>
              <FontAwesome
                name="shopping-bag"
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.sellerTextContainer}>
              <Text style={styles.sellerTitle}>
                Have products to sell?
              </Text>
              <Text style={styles.sellerDescription}>
                Grow your business with Trendify.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.sellerButton}
              onPress={() => router.push('/seller-sign-in')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Sell on Trendify"
            >
              <Text style={styles.sellerButtonText}>
                Sell on Trendify
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our
          </Text>

          <View style={styles.legalRow}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Privacy Policy',
                  'Privacy policy details will be added soon.'
                )
              }
            >
              <Text style={styles.legalLink}>Privacy Policy</Text>
            </TouchableOpacity>

            <Text style={styles.footerDot}>·</Text>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Terms of Service',
                  'Terms of service details will be added soon.'
                )
              }
            >
              <Text style={styles.legalLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(
  colors: ReturnType<typeof useTheme>['colors'],
  isDark: boolean
) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 25,
      paddingTop: 12,
      paddingBottom: 18,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    brand: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    brandName: {
      fontSize: 22,
      fontWeight: '900',
      letterSpacing: -0.7,
      color: colors.text,
    },
    brandTag: {
      backgroundColor: colors.primarySoft,
      borderRadius: 20,
      paddingHorizontal: 11,
      paddingVertical: 7,
    },
    brandTagText: {
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1,
      color: colors.primary,
    },
    hero: {
      alignItems: 'center',
    },
    heroArtwork: {
      height: 190,
      width: '100%',
      maxWidth: 330,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: colors.primarySoft,
    },
    artCircleOuter: {
      position: 'absolute',
      width: 190,
      height: 190,
      borderRadius: 95,
      backgroundColor: colors.primaryMuted,
      opacity: 0.55,
    },
    artCircleInner: {
      position: 'absolute',
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.primary,
      opacity: 0.13,
    },
    artAccentOne: {
      position: 'absolute',
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      opacity: 0.2,
      top: 22,
      right: 38,
    },
    artAccentTwo: {
      position: 'absolute',
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      opacity: 0.35,
      bottom: 30,
      left: 44,
    },
    heroLogo: {
      width: 112,
      height: 112,
      borderRadius: 32,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.15 : 0.08,
      shadowRadius: 16,
      elevation: 5,
    },
    artLabel: {
      position: 'absolute',
      bottom: 13,
      backgroundColor: colors.card,
      paddingHorizontal: 13,
      paddingVertical: 6,
      borderRadius: 20,
    },
    artLabelText: {
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1.5,
      color: colors.primary,
    },
    eyebrow: {
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 2,
      color: colors.primary,
      marginBottom: 10,
    },
    title: {
      fontSize: 34,
      lineHeight: 41,
      fontWeight: '900',
      letterSpacing: -1.3,
      textAlign: 'center',
      color: colors.text,
    },
    titleAccent: {
      color: colors.primary,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.muted,
      textAlign: 'center',
      maxWidth: 290,
      marginTop: 12,
    },
    actionSection: {
      marginTop: 27,
    },
    signInButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 17,
    },
    signInText: {
      color: colors.muted,
      fontSize: 13,
      fontWeight: '500',
    },
    signInAccent: {
      color: colors.primary,
      fontWeight: '800',
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 8,
      marginBottom: 18,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.muted,
      fontSize: 9,
      fontWeight: '800',
      letterSpacing: 1.3,
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 15,
    },
    socialButton: {
      width: 54,
      height: 50,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialIcon: {
      fontSize: 21,
      fontWeight: '800',
      color: colors.text,
    },
    googleIcon: {
      color: '#4285F4',
    },
    facebookIcon: {
      color: '#1877F2',
      fontSize: 25,
    },
    sellerSection: {
      marginTop: 25,
    },
    sellerDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 20,
    },
    sellerCard: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 15,
      alignItems: 'center',
    },
    sellerIconCircle: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    sellerTextContainer: {
      alignItems: 'center',
    },
    sellerTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
    },
    sellerDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    sellerButton: {
      marginTop: 13,
      paddingHorizontal: 22,
      paddingVertical: 11,
      borderRadius: 22,
      backgroundColor: colors.primary,
    },
    sellerButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '800',
    },
    footer: {
      alignItems: 'center',
      marginTop: 25,
    },
    footerText: {
      fontSize: 11,
      color: colors.muted,
    },
    legalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      marginTop: 5,
    },
    legalLink: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.primary,
    },
    footerDot: {
      color: colors.muted,
    },
  });
}
