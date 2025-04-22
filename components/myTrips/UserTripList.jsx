import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useMemo, useCallback } from 'react'
import moment from 'moment/moment';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AppText from '../ui/AppText';
import AppButton from '../ui/AppButton';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppCard from '../ui/AppCard';

const { width } = Dimensions.get('window');

export default function UserTripList({ userTrips, onDeleteTrip }) {
  const router = useRouter();
  
  // Safely parse tripData with useMemo to prevent re-parsing on each render
  const latestTrip = useMemo(() => {
    if (!userTrips || userTrips.length === 0) return {};
    
    try {
      if (userTrips[0]?.tripData) {
        return JSON.parse(userTrips[0].tripData);
      }
      return {};
    } catch (error) {
      console.error("Error parsing tripData:", error);
      return {};
    }
  }, [userTrips]);

  // Stable callback to prevent re-renders
  const handleViewDetails = useCallback((trip) => {
    if (!trip || !trip.docID) return;
    
    router.push({
      pathname: '/trips/TripDetails',
      params: { tripId: trip.docID }
    });
  }, [router]);

  // Handle trip deletion
  const handleDeleteTrip = useCallback((tripId) => {
    if (onDeleteTrip && tripId) {
      onDeleteTrip(tripId);
    }
  }, [onDeleteTrip]);

  // Add proper checks to prevent rendering errors
  if (!userTrips || userTrips.length === 0) {
    return (
      <View style={styles.container}>
        <AppText variant="body" color="secondary" align="center">No trips found</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Featured Trip Card */}
      <View style={styles.featuredContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              latestTrip?.locationInfo?.photoRef 
                ? {
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${latestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
                  }
                : require('./../../assets/images/adaptive-icon.png')
            }
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />

          {/* Trip info overlay */}
          <View style={styles.tripInfo}>
            <View style={styles.featuredHeader}>
              <AppText variant="subtitle2" color="secondary">FEATURED TRIP</AppText>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteTrip(userTrips[0]?.docID)}
              >
                <Ionicons name="trash-outline" size={18} color={Colors.ERROR} />
              </TouchableOpacity>
            </View>

            <AppText variant="h3" style={styles.locationName}>
              {userTrips[0]?.tripPlan?.location || "My Trip"}
            </AppText>

            <View style={styles.tripMetaRow}>
              <View style={styles.tripMeta}>
                <Ionicons name="calendar-outline" size={16} color={Colors.TEXT_SECONDARY} />
                <AppText variant="caption" color="secondary" style={styles.metaText}>
                  {latestTrip?.startDate ? moment(latestTrip.startDate).format('DD MMM yyyy') : "N/A"}
                </AppText>
              </View>

              <View style={styles.tripMeta}>
                <Ionicons name="people-outline" size={16} color={Colors.TEXT_SECONDARY} />
                <AppText variant="caption" color="secondary" style={styles.metaText}>
                  {latestTrip?.traveler?.title || "Traveler"}
                </AppText>
              </View>
            </View>

            <AppButton
              title="View Details"
              onPress={() => handleViewDetails(userTrips[0])}
              variant="primary"
              size="small"
              style={styles.viewButton}
              icon={<Ionicons name="arrow-forward" size={16} color={Colors.WHITE} />}
            />
          </View>
        </View>
      </View>

      {/* Past Trips Section */}
      {userTrips.length > 1 && (
        <View style={styles.pastTripsSection}>
          <AppText variant="h4" style={styles.sectionTitle}>Past Trips</AppText>
          {userTrips.slice(1).map((trip, index) => (
            <UserTripCard 
              trip={trip} 
              key={`trip-${trip.docID}-${index}`} 
              onPress={() => handleViewDetails(trip)} 
              onDelete={() => handleDeleteTrip(trip.docID)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  featuredContainer: {
    marginBottom: 30,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.BACKGROUND_ELEVATED,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featuredImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  tripInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  locationName: {
    marginVertical: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tripMetaRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    marginLeft: 5,
  },
  viewButton: {
    alignSelf: 'flex-start',
  },
  pastTripsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});