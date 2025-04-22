import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppText from './ui/AppText';
import AppButton from './ui/AppButton';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', Colors.BACKGROUND_DARK]}
        style={styles.overlay}
      />
      
      <Image 
        source={require('./../assets/images/LoginPage.png')}
        style={styles.backgroundImage}
        blurRadius={2}
      />
      
      <View style={styles.content}>
        {/* App Logo/Icon */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={Colors.GRADIENT_PRIMARY}
            style={styles.logoBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="airplane" size={40} color={Colors.WHITE} />
          </LinearGradient>
        </View>
        
        <AppText variant="h1" align="center" style={styles.title}>
          AI TRAVEL PLANNER
        </AppText>
        
        <AppText variant="body" align="center" color="secondary" style={styles.subtitle}>
          Discover the best trip at your fingertips. Travel smart with AI-Driven Insights.
        </AppText>
        
        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, {backgroundColor: Colors.ACCENT_1}]}>
              <Ionicons name="map-outline" size={24} color={Colors.WHITE} />
            </View>
            <AppText variant="subtitle2" style={styles.featureText}>Smart Itineraries</AppText>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, {backgroundColor: Colors.ACCENT_2}]}>
              <Ionicons name="calendar-outline" size={24} color={Colors.WHITE} />
            </View>
            <AppText variant="subtitle2" style={styles.featureText}>Custom Plans</AppText>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, {backgroundColor: Colors.ACCENT_3}]}>
              <Ionicons name="cash-outline" size={24} color={Colors.WHITE} />
            </View>
            <AppText variant="subtitle2" style={styles.featureText}>Budget Friendly</AppText>
          </View>
        </View>
        
        <AppButton 
          title="Get Started"
          onPress={() => router.push('auth/Sign-in')}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-end',
    paddingBottom: 80,
    zIndex: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    color: Colors.WHITE,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  subtitle: {
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    width: '30%',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    textAlign: 'center',
    color: Colors.TEXT_SECONDARY,
  },
  button: {
    marginTop: 20,
  },
});

