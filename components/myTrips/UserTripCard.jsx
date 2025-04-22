import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors'
import AppText from '../ui/AppText'
import AppCard from '../ui/AppCard'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function UserTripCard({ trip, onPress, onDelete }) {
  // Use useMemo to prevent re-parsing on each render
  const parsedTripData = useMemo(() => {
    try {
      if (trip?.tripData) {
        return JSON.parse(trip.tripData);
      }
      return {};
    } catch (error) {
      console.error("Error parsing trip data:", error);
      return {};
    }
  }, [trip?.tripData]);
  
  if (!trip) return null;
  
  return (
    <AppCard style={styles.card}>
      <TouchableOpacity 
        style={styles.mainContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image 
          style={styles.image}
          source={
            parsedTripData?.locationInfo?.photoRef 
              ? {
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${parsedTripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
                }
              : require('./../../assets/images/adaptive-icon.png')
          }
        />
        
        <View style={styles.content}>
          <AppText variant="subtitle1">{trip?.tripPlan?.location || "My Trip"}</AppText>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={14} color={Colors.TEXT_SECONDARY} />
              <AppText variant="caption" color="secondary" style={styles.detailText}>
                {parsedTripData?.startDate ? moment(parsedTripData.startDate).format('DD MMM yyyy') : "No date"}
              </AppText>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={14} color={Colors.TEXT_SECONDARY} />
              <AppText variant="caption" color="secondary" style={styles.detailText}>
                {parsedTripData?.traveler?.title || trip?.tripPlan?.travelers || "Travelers"}
              </AppText>
            </View>
          </View>
          
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={12} color={Colors.ACCENT_3} />
            <AppText variant="caption" style={{ color: Colors.ACCENT_3, marginLeft: 4 }}>
              Ready
            </AppText>
          </View>
        </View>
        
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color={Colors.TEXT_SECONDARY} />
        </View>
      </TouchableOpacity>
      
      {onDelete && (
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Ionicons name="trash-outline" size={18} color={Colors.ERROR} />
        </TouchableOpacity>
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginVertical: 8,
    overflow: 'hidden',
  },
  mainContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginVertical: 2,
  },
  detailText: {
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingLeft: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});