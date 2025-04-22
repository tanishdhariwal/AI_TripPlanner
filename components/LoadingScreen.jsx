import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import AppText from './ui/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, Colors.BACKGROUND_ELEVATED]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
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
        
        <AppText variant="h2" style={styles.title}>AI TripPlanner</AppText>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
          <AppText variant="body" color="secondary" style={styles.loadingText}>
            {message}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    textAlign: 'center',
  },
});
