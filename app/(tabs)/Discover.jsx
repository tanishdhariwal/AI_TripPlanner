import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppCard from '../../components/ui/AppCard';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export default function Discover() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [isNavigating, setIsNavigating] = useState(false);

  // Reset navigation state when screen gains focus
  useFocusEffect(
    useCallback(() => {
      setIsNavigating(false);
      return () => {};
    }, [])
  );

  const handleDestinationPress = useCallback((destination) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    router.push({
      pathname: '/Create_trip/SelectTraveler',
      params: { destination: destination.name }
    });
  }, [isNavigating, router]);

  const categories = [
    { id: 'Popular', label: 'Popular' },
    { id: 'Beach', label: 'Beach' },
    { id: 'Mountain', label: 'Mountain' },
    { id: 'City', label: 'City' },
    { id: 'Adventure', label: 'Adventure' },
    { id: 'Cultural', label: 'Cultural' },
  ];

  const popularDestinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      description: 'Island paradise with beaches, temples, and stunning landscapes',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      tags: ['Beach', 'Cultural'],
    },
    {
      id: 2,
      name: 'Paris, France',
      description: 'The city of lights with iconic monuments and romantic ambiance',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      tags: ['City', 'Cultural'],
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      description: 'Ultra-modern city with traditional culture and amazing food',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      tags: ['City', 'Cultural'],
    },
    {
      id: 4,
      name: 'Santorini, Greece',
      description: 'Stunning island with white-washed buildings and blue domes',
      image: 'https://images.unsplash.com/photo-1469796466635-455ede028aca',
      tags: ['Beach'],
    },
  ];
  
  const travelTips = [
    {
      id: 1,
      title: 'Pack Light, Travel Right',
      content: 'Learn the art of minimalist packing for stress-free travel',
      icon: 'bag-handle-outline',
    },
    {
      id: 2,
      title: 'Save on Flights',
      content: 'Best days to book and fly for maximum savings on airfare',
      icon: 'airplane-outline',
    },
    {
      id: 3,
      title: 'Stay Safe Abroad',
      content: 'Essential safety tips for international travelers',
      icon: 'shield-checkmark-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
        style={styles.headerGradient}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="h2">Discover</AppText>
          <AppText variant="body" color="secondary" style={styles.subtitle}>
            Explore destinations and get inspired
          </AppText>
          
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.TEXT_SECONDARY} />
            <TouchableOpacity 
              style={styles.searchInput} 
              onPress={() => router.push('/Create_trip/SearchPlace')}
              activeOpacity={0.7}
            >
              <AppText variant="body2" color="tertiary">
                Where do you want to go?
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color={Colors.TEXT_SECONDARY} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <AppText 
                variant="body2" 
                color={activeCategory === category.id ? 'primary' : 'secondary'}
              >
                {category.label}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Featured Destinations */}
        <View style={styles.sectionHeader}>
          <AppText variant="h5">Featured Destinations</AppText>
          <TouchableOpacity>
            <AppText variant="body2" color="primary">See All</AppText>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.destinationsContainer}
          snapToInterval={CARD_WIDTH + 15}
          decelerationRate="fast"
        >
          {popularDestinations.map(destination => (
            <TouchableOpacity 
              key={destination.id} 
              style={styles.destinationCard}
              onPress={() => handleDestinationPress(destination)}
            >
              <Image 
                source={{ uri: destination.image }} 
                style={styles.destinationImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.destinationGradient}
              />
              <View style={styles.destinationContent}>
                <AppText variant="subtitle1" style={styles.destinationName}>
                  {destination.name}
                </AppText>
                <AppText variant="caption" color="secondary" style={styles.destinationDesc}>
                  {destination.description}
                </AppText>
                
                <View style={styles.tagsContainer}>
                  {destination.tags.map((tag, index) => (
                    <View key={index} style={styles.tagBadge}>
                      <AppText variant="caption" style={styles.tagText}>{tag}</AppText>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Travel Tips */}
        <View style={styles.sectionHeader}>
          <AppText variant="h5">Travel Tips</AppText>
          <TouchableOpacity>
            <AppText variant="body2" color="primary">More</AppText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tipsContainer}>
          {travelTips.map(tip => (
            <AppCard key={tip.id} style={styles.tipCard} onPress={() => {}}>
              <View style={styles.tipIconContainer}>
                <Ionicons name={tip.icon} size={24} color={Colors.PRIMARY} />
              </View>
              <AppText variant="subtitle2" style={styles.tipTitle}>{tip.title}</AppText>
              <AppText variant="caption" color="secondary" style={styles.tipContent}>
                {tip.content}
              </AppText>
            </AppCard>
          ))}
        </View>
        
        {/* Just Added */}
        <View style={styles.exploreSection}>
          <AppCard style={styles.exploreCard} noPadding>
            <LinearGradient
              colors={Colors.GRADIENT_SECONDARY}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.exploreGradient}
            >
              <View style={styles.exploreContent}>
                <AppText variant="subtitle1" color="white">Explore with AI</AppText>
                <AppText variant="body2" color="white" style={styles.exploreDesc}>
                  Let our AI assistant create a personalized trip just for you
                </AppText>
                <TouchableOpacity 
                  style={styles.exploreButton}
                  onPress={() => router.push('/Create_trip/SearchPlace')}
                >
                  <AppText variant="button" style={styles.exploreButtonText}>
                    Start Planning
                  </AppText>
                  <Ionicons name="arrow-forward" size={16} color={Colors.TEXT_INVERSE} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.exploreImageContainer}>
                <Image 
                  source={require('../../assets/images/adaptive-icon.png')}
                  style={styles.exploreImage}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </AppCard>
        </View>
        
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  headerGradient: {
    position: 'absolute',
    height: 200,
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_CARD,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterButton: {
    padding: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.BACKGROUND_CARD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  activeCategoryButton: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    borderColor: Colors.PRIMARY,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  destinationsContainer: {
    paddingLeft: 20,
    paddingRight: 5,
  },
  destinationCard: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 15,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  destinationContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  destinationName: {
    color: Colors.WHITE,
    marginBottom: 5,
  },
  destinationDesc: {
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    color: Colors.WHITE,
    fontSize: 10,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  tipCard: {
    marginBottom: 10,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    marginBottom: 5,
  },
  tipContent: {
    lineHeight: 18,
  },
  exploreSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  exploreCard: {
    overflow: 'hidden',
  },
  exploreGradient: {
    flexDirection: 'row',
    padding: 20,
  },
  exploreContent: {
    flex: 1,
    paddingRight: 10,
  },
  exploreDesc: {
    marginTop: 5,
    marginBottom: 15,
    opacity: 0.9,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: Colors.TEXT_INVERSE,
    marginRight: 6,
  },
  exploreImageContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreImage: {
    width: 60,
    height: 60,
    opacity: 0.9,
  },
  footer: {
    height: 80,
  },
});