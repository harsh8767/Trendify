
import { useTheme } from '@/context/theme-context';
import { Image, type ImageStyle } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type ProductImageProps = {
  uri?: string | null;
  style?: StyleProp<ImageStyle>;
  fit?: 'cover' | 'contain';
  // Used for the placeholder (first letter) and for screen readers.
  label?: string;
  accessibilityLabel?: string;
  // Called once the photo has loaded, with the photo's own size.
  onLoad?: (size: { width: number; height: number }) => void;
};

// Waits get longer each time, because a busy image server often needs a few seconds to recover.
const RETRY_DELAYS_MS = [2000, 4000, 8000, 8000];

// Fills its slot without stretching the photo.
// "cover" fills the whole slot and crops the edges (keeping the top of tall photos in view);
// "contain" shows the whole photo with empty space around it, so nothing is ever cut off.
// A photo that fails to load is tried again a few times (phone networks are flaky);
// if it still fails, or there is no photo, a neutral placeholder is shown.
export default function ProductImage({
  uri,
  style,
  fit = 'cover',
  label,
  accessibilityLabel,
  onLoad,
}: ProductImageProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [retryCount, setRetryCount] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A new link gets a fresh start.
  useEffect(() => {
    setHasFailed(false);
    setRetryCount(0);
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [uri]);

  const handleLoadError = () => {
    if (retryCount >= RETRY_DELAYS_MS.length) {
      setHasFailed(true);
      return;
    }

    retryTimer.current = setTimeout(
      () => setRetryCount((count) => count + 1),
      RETRY_DELAYS_MS[retryCount]
    );
  };

  if (!uri || hasFailed) {
    const firstLetter = label?.trim().charAt(0).toUpperCase();

    return (
      <View
        style={[styles.placeholder, style as StyleProp<ViewStyle>]}
        accessibilityLabel={accessibilityLabel ?? label ?? 'Image not available'}
      >
        <Text style={styles.placeholderLetter}>{firstLetter || '·'}</Text>
      </View>
    );
  }

  return (
    <Image
      key={retryCount}
      source={{ uri }}
      style={style}
      contentFit={fit}
      contentPosition={fit === 'contain' ? 'center' : 'top'}
      cachePolicy="memory-disk"
      transition={150}
      accessibilityLabel={accessibilityLabel ?? label}
      onLoad={(event) =>
        onLoad?.({
          width: event.source.width,
          height: event.source.height,
        })
      }
      onError={handleLoadError}
    />
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    placeholder: {
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderLetter: {
      color: colors.primary,
      fontSize: 28,
      fontWeight: '800',
    },
  });
}
