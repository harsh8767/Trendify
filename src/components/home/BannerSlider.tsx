import { useTheme } from '@/context/theme-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BannerSlider() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.bannerSliderContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannerSliderScroll}
      >
        <View style={styles.bannerSliderCard}>
          <View style={styles.bannerSliderContent}>
            <Text style={styles.bannerSliderLabel}>Premium Quality</Text>
            <Text style={styles.bannerSliderTitle}>
              Latest Tech{'\n'}& Gadgets
            </Text>

            <View style={styles.bannerSliderButton}>
              <Text style={styles.bannerSliderButtonText}>Shop Now</Text>
            </View>
          </View>

          <Text style={styles.bannerSliderImage}>🎧</Text>
        </View>

        <View
          style={[
            styles.bannerSliderCard,
            styles.bannerSliderCardSecondary,
          ]}
        >
          <View style={styles.bannerSliderContent}>
            <Text style={styles.bannerSliderLabel}>Special Offer</Text>
            <Text style={styles.bannerSliderTitle}>
              Fashion{'\n'}Collection
            </Text>

            <View style={styles.bannerSliderButton}>
              <Text style={styles.bannerSliderButtonText}>Shop Now</Text>
            </View>
          </View>

          <Text style={styles.bannerSliderImage}>👕</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    bannerSliderContainer: {
      paddingVertical: 10,
    },
    bannerSliderScroll: {
      paddingHorizontal: 15,
    },
    bannerSliderCard: {
      width: 320,
      backgroundColor: colors.primarySoft,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bannerSliderCardSecondary: {
      backgroundColor: colors.accentSoft,
    },
    bannerSliderContent: {
      flex: 1,
    },
    bannerSliderLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    bannerSliderTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
    },
    bannerSliderButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    bannerSliderButtonText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    bannerSliderImage: {
      fontSize: 80,
    },
  });
}