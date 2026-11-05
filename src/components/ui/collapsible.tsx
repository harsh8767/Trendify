import { useTheme } from '@/context/theme-context';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function Collapsible({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.heading,
          pressed && styles.pressedHeading,
        ]}
        onPress={() => setIsOpen((value) => !value)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        accessibilityLabel={`${title}, ${isOpen ? 'collapse' : 'expand'}`}
      >
        <View style={styles.button}>
          <SymbolView
            name={{
              ios: 'chevron.right',
              android: 'chevron_right',
              web: 'chevron_right',
            }}
            size={14}
            weight="bold"
            tintColor={colors.text}
            style={{
              transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
            }}
          />
        </View>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>

      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <Animated.View style={styles.content}>
            {children}
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.two,
    },
    pressedHeading: {
      opacity: 0.7,
    },
    button: {
      width: Spacing.four,
      height: Spacing.four,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accentSoft,
    },
    content: {
      marginTop: Spacing.three,
      borderRadius: Spacing.three,
      marginLeft: Spacing.four,
      padding: Spacing.four,
      backgroundColor: colors.card,
    },
  });
}