import PrimaryButton from '@/components/ui/PrimaryButton';
import { WALKTHROUGH } from '@/constants/data';
import { useTheme } from '@/context/theme-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalkthroughScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [index, setIndex] = useState(0);
  const slide = WALKTHROUGH[index];

  const continueSlide = () => {
    if (index < WALKTHROUGH.length - 1) {
      setIndex(index + 1);
      return;
    }

    router.replace('/welcome');
  };

  return (
    <View style={styles.walkthroughScreen}>
      <Image
        source={{ uri: slide.image }}
        style={styles.walkthroughImage}
        contentFit="cover"
      />

      <SafeAreaView style={styles.walkthroughSheet} edges={['bottom']}>
        <Text style={styles.walkthroughTitle}>{slide.title}</Text>

        <Text style={styles.walkthroughBody}>{slide.body}</Text>

        <View style={styles.walkthroughDots}>
          {WALKTHROUGH.map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={[
                styles.walkthroughDot,
                dotIndex === index && styles.walkthroughDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.walkthroughActions}>
          <PrimaryButton
            label="Skip"
            variant="soft"
            style={{ flex: 1 }}
            onPress={() => router.replace('/welcome')}
          />

          <PrimaryButton
            label="Continue"
            style={{ flex: 1 }}
            onPress={continueSlide}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    walkthroughScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    walkthroughImage: {
      flex: 1.2,
      width: '100%',
    },
    walkthroughSheet: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 48,
      borderTopRightRadius: 48,
      paddingHorizontal: 28,
      paddingTop: 32,
      marginTop: -40,
    },
    walkthroughTitle: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '800',
      textAlign: 'center',
      color: colors.text,
    },
    walkthroughBody: {
      marginTop: 14,
      fontSize: 15,
      lineHeight: 22,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    walkthroughDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginTop: 22,
    },
    walkthroughDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
    },
    walkthroughDotActive: {
      width: 28,
      backgroundColor: colors.accent,
    },
    walkthroughActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 28,
      marginBottom: 12,
    },
  });
}