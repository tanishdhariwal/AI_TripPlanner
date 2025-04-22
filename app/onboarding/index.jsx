import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const onboardingData = [
  {
    id: '1',
    title: 'AI-Powered Trip Planning',
    description: 'Let our advanced AI create personalized travel itineraries tailored to your preferences.',
    // Use existing app icon as fallback
    image: require('../../assets/images/adaptive-icon.png'),
    icon: 'bulb-outline',
  },
  {
    id: '2',
    title: 'Discover Amazing Places',
    description: 'Browse through our curated collection of destinations and find your next adventure.',
    // Use existing app icon as fallback
    image: require('../../assets/images/adaptive-icon.png'),
    icon: 'compass-outline',
  },
  {
    id: '3',
    title: 'Complete Travel Solution',
    description: 'Get flight recommendations, accommodation options, and daily itineraries all in one place.',
    // Use existing app icon as fallback
    image: require('../../assets/images/adaptive-icon.png'),
    icon: 'map-outline',
  },
];

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      router.replace('/');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={Colors.GRADIENT_PRIMARY}
            style={styles.iconBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={item.icon} size={30} color={Colors.WHITE} />
          </LinearGradient>
        </View>
        
        <AppText variant="h2" style={styles.title}>{item.title}</AppText>
        <AppText variant="body" color="secondary" style={styles.description}>
          {item.description}
        </AppText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, Colors.BACKGROUND_ELEVATED]}
        style={StyleSheet.absoluteFill}
      />
      
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={completeOnboarding}
      >
        <AppText variant="body2" color="secondary">Skip</AppText>
      </TouchableOpacity>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        
        <AppButton
          title={currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          variant="primary"
          size="large"
          icon={{
            component: <Ionicons name="arrow-forward" size={18} color={Colors.WHITE} />,
            position: 'right'
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 20,
    opacity: 0.85,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 40,
    paddingTop: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.TEXT_TERTIARY,
    marginHorizontal: 6,
  },
  paginationDotActive: {
    backgroundColor: Colors.PRIMARY,
    width: 20,
  },
});
