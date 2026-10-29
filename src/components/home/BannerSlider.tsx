import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BannerSlider() {
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
            <Text style={styles.bannerSliderTitle}>Latest Tech{'\n'}& Gadgets</Text>
            <View style={styles.bannerSliderButton}>
              <Text style={styles.bannerSliderButtonText}>Shop Now</Text>
            </View>
          </View>
          <Text style={styles.bannerSliderImage}>🎧</Text>
        </View>
        
        <View style={[styles.bannerSliderCard, styles.bannerSliderCardSecondary]}>
          <View style={styles.bannerSliderContent}>
            <Text style={styles.bannerSliderLabel}>Special Offer</Text>
            <Text style={styles.bannerSliderTitle}>Fashion{'\n'}Collection</Text>
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

const styles = StyleSheet.create({
  bannerSliderContainer: {
    paddingVertical: 10,
  },
  bannerSliderScroll: {
    paddingHorizontal: 15,
  },
  bannerSliderCard: {
    width: 320,
    backgroundColor: '#FFE5D9',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerSliderCardSecondary: {
    backgroundColor: '#E3F2FD',
  },
  bannerSliderContent: {
    flex: 1,
  },
  bannerSliderLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  bannerSliderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  bannerSliderButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerSliderButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  bannerSliderImage: {
    fontSize: 80,
  },
});
