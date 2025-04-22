import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useCallback } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createTripContext } from './../../context/createTripContext';
import moment from 'moment';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import { LinearGradient } from 'expo-linear-gradient';
import AppCard from '../../components/ui/AppCard';

export default function ReviewTrip() {
  const { tripData } = useContext(createTripContext);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: Colors.TEXT_PRIMARY,
    });
  }, []);

  const handleBuildTrip = useCallback(() => {
    router.replace('Create_trip/GenerateTrip');
  }, [router]);

  const handleEditDetails = useCallback(() => {
    router.back();
  }, [router]);

  const renderTripInfoItem = (icon, title, value, subtitle = null) => (
    <AppCard style={styles.infoCard}>
      <View style={styles.infoHeader}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['rgba(108,99,255,0.2)', 'rgba(108,99,255,0.05)']}
            style={styles.iconBackground}
          >
            <Ionicons name={icon} size={20} color={Colors.PRIMARY} />
          </LinearGradient>
        </View>
        
        <AppText variant="caption" color="secondary" style={styles.infoTitle}>
          {title.toUpperCase()}
        </AppText>
      </View>
      
      <AppText variant="subtitle1" style={styles.infoValue}>{value}</AppText>
      
      {subtitle && (
        <AppText variant="caption" color="secondary" style={styles.infoSubtitle}>
          {subtitle}
        </AppText>
      )}
    </AppCard>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
        style={styles.gradient}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={styles.header}>
          <AppText variant="h3" align="center">Review Trip Details</AppText>
          <AppText variant="body" color="secondary" align="center" style={styles.subtitle}>
            Please confirm your trip details before proceeding
          </AppText>
        </View>
        
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/adaptive-icon.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.infoContainer}>
          {renderTripInfoItem(
            "location-sharp", 
            "Destination", 
            tripData?.locationInfo?.name || "Destination"
          )}
          
          {tripData?.startDate && tripData?.endDate && (
            renderTripInfoItem(
              "calendar-sharp", 
              "Travel Date", 
              `${moment(tripData.startDate).format('DD MMM')} - ${moment(tripData.endDate).format('DD MMM')}`,
              `Duration: ${tripData?.TotalDays || 0} days`
            )
          )}
          
          {renderTripInfoItem(
            "people-sharp", 
            "Travelers", 
            tripData?.traveler?.title || "Travelers"
          )}
          
          {renderTripInfoItem(
            "wallet-sharp", 
            "Budget", 
            tripData?.Budget || "Not specified"
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <AppButton
          title="Build My Trip"
          onPress={handleBuildTrip}
          variant="primary"
          fullWidth
          size="large"
          icon={<Ionicons name="rocket-outline" size={18} color={Colors.WHITE} style={{marginRight: 10}} />}
        />
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditDetails}
        >
          <AppText variant="body2" color="secondary">Edit details</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    opacity: 0.8,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoCard: {
    marginBottom: 15,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 10,
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    letterSpacing: 0.5,
  },
  infoValue: {
    marginBottom: 4,
  },
  infoSubtitle: {
    marginTop: 2,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  editButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});