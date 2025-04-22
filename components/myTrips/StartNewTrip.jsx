import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';
import { LinearGradient } from 'expo-linear-gradient';
import AppCard from '../ui/AppCard';

export default function StartNewTrip() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <AppCard style={styles.card} noPadding>
        <LinearGradient
          colors={[Colors.BACKGROUND_CARD, Colors.BACKGROUND_ELEVATED]}
          style={styles.gradient}
        >
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={Colors.GRADIENT_PRIMARY}
              style={styles.iconBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="airplane" size={30} color="white" />
            </LinearGradient>
          </View>
          
          {/* Use adaptive-icon.png instead of the missing empty-state-map.png */}
          <Image
            source={require('../../assets/images/adaptive-icon.png')}
            style={styles.mapImage}
            resizeMode="contain"
          />
          
          <AppText variant="h4" align="center" style={styles.title}>
            No Trips Planned Yet!
          </AppText>
          
          <AppText variant="body" align="center" color="secondary" style={styles.subtitle}>
            Start planning your next adventure with AI assistance. Create personalized itineraries in seconds.
          </AppText>
          
          <AppButton
            title="Plan a New Trip"
            onPress={() => router.push("/Create_trip/SearchPlace")}
            variant="primary"
            size="medium"
            style={styles.button}
            icon={<Ionicons name="add-circle" size={20} color="white" style={{ marginRight: 8 }} />}
          />
        </LinearGradient>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    padding: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '80%',
    height: 150,
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 25,
    lineHeight: 22,
  },
  button: {
    minWidth: 200,
  },
});