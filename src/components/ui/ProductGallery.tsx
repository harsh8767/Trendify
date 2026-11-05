import ProductImage from '@/components/ui/ProductImage';
import { useTheme } from '@/context/theme-context';
import { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

type ProductGalleryProps = {
  imageUrls: string[];
  productName: string;
};

const SIDE_MARGIN = 24;
const DEFAULT_PHOTO_RATIO = 4 / 5;
const MIN_GALLERY_HEIGHT = 260;
const MAX_GALLERY_HEIGHT = 500;

export default function ProductGallery({
  imageUrls,
  productName,
}: ProductGalleryProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { width: screenWidth } = useWindowDimensions();
  const galleryWidth = screenWidth - SIDE_MARGIN * 2;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstPhotoRatio, setFirstPhotoRatio] = useState(DEFAULT_PHOTO_RATIO);

  const galleryHeight = Math.round(
    Math.min(
      MAX_GALLERY_HEIGHT,
      Math.max(MIN_GALLERY_HEIGHT, galleryWidth / firstPhotoRatio)
    )
  );

  const slides = imageUrls.length > 0 ? imageUrls : [''];
  const hasSeveralPhotos = slides.length > 1;

  const showPhotoAt = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * galleryWidth,
      animated: true,
    });
    setActiveIndex(index);
  };

  const handleSwipeEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / galleryWidth
    );
    setActiveIndex(index);
  };

  const handleFirstPhotoLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    if (width > 0 && height > 0) {
      setFirstPhotoRatio(width / height);
    }
  };

  return (
    <View>
      <View style={[styles.frame, { height: galleryHeight }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEnabled={hasSeveralPhotos}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleSwipeEnd}
        >
          {slides.map((imageUrl, index) => (
            <ProductImage
              key={`${imageUrl}-${index}`}
              uri={imageUrl}
              label={productName}
              fit="contain"
              accessibilityLabel={`${productName}, photo ${index + 1} of ${slides.length}`}
              style={{ width: galleryWidth, height: galleryHeight }}
              onLoad={index === 0 ? handleFirstPhotoLoaded : undefined}
            />
          ))}
        </ScrollView>

        {hasSeveralPhotos ? (
          <View style={styles.dots} pointerEvents="none">
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        ) : null}
      </View>

      {hasSeveralPhotos ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailRow}
        >
          {slides.map((imageUrl, index) => (
            <TouchableOpacity
              key={`${imageUrl}-${index}`}
              onPress={() => showPhotoAt(index)}
              accessibilityRole="button"
              accessibilityLabel={`Show photo ${index + 1}`}
              accessibilityState={{ selected: index === activeIndex }}
              style={[
                styles.thumbnail,
                index === activeIndex && styles.thumbnailActive,
              ]}
            >
              <ProductImage
                uri={imageUrl}
                label={productName}
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    frame: {
      marginHorizontal: SIDE_MARGIN,
      borderRadius: 36,
      overflow: 'hidden',
      backgroundColor: colors.card,
    },
    dots: {
      position: 'absolute',
      bottom: 14,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: 'rgba(0,0,0,0.15)',
      paddingVertical: 6,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
    dotActive: {
      width: 22,
      backgroundColor: colors.accent,
    },
    thumbnailRow: {
      paddingHorizontal: SIDE_MARGIN,
      paddingTop: 12,
      gap: 10,
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: 'transparent',
      overflow: 'hidden',
    },
    thumbnailActive: {
      borderColor: colors.accent,
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
    },
  });
}