import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/Firebase_Config';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function TripDetails() {
  const { tripId } = useLocalSearchParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  const fetchTripDetails = async () => {
    try {
      const docRef = doc(db, "UserTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTripData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
    } finally {
      setLoading(false);
    }
  };

  const openUrl = (url) => {
    if (url && url.startsWith('http')) {
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.BLACK} />
        <Text style={styles.loadingText}>Loading trip details...</Text>
      </View>
    );
  }

  if (!tripData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trip not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const parsedTripData = JSON.parse(tripData.tripData || '{}');
  const tripPlan = tripData.tripPlan || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Hero Section with Image and Title */}
      <View style={styles.heroContainer}>
        <Image 
          source={
            parsedTripData?.locationInfo?.photoRef 
              ? {
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${parsedTripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
                }
              : require('./../../assets/images/adaptive-icon.png')
          }
          style={styles.heroImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <Text style={styles.tripName}>{tripPlan.trip_name || "Your Trip"}</Text>
          <Text style={styles.heroTitle}>{tripPlan.location || parsedTripData?.locationInfo?.name}</Text>
          <View style={styles.tripMeta}>
            <Text style={styles.tripMetaText}>
              {moment(parsedTripData?.startDate).format('DD MMM')} - {moment(parsedTripData?.endDate).format('DD MMM YYYY')}
            </Text>
            <Text style={styles.tripMetaText}>
              {parsedTripData?.traveler?.title || tripPlan.travelers}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Trip Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Summary</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={22} color={Colors.GRAY} />
            <Text style={styles.infoText}>
              Duration: {parsedTripData.TotalDays || tripPlan.duration} days
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={22} color={Colors.GRAY} />
            <Text style={styles.infoText}>{parsedTripData?.traveler?.title || tripPlan.travelers}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={22} color={Colors.GRAY} />
            <Text style={styles.infoText}>Budget: {parsedTripData.Budget || tripPlan.budget}</Text>
          </View>
          {tripPlan.best_time_to_visit && (
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={22} color={Colors.GRAY} />
              <Text style={styles.infoText}>Best time to visit: {tripPlan.best_time_to_visit}</Text>
            </View>
          )}
          {tripPlan.total_trip_cost && (
            <View style={styles.infoRow}>
              <Ionicons name="wallet-outline" size={22} color={Colors.GRAY} />
              <Text style={styles.infoText}>Estimated cost: {tripPlan.total_trip_cost}</Text>
            </View>
          )}
          {tripPlan.total_trip_time && (
            <View style={styles.infoRow}>
              <Ionicons name="hourglass-outline" size={22} color={Colors.GRAY} />
              <Text style={styles.infoText}>{tripPlan.total_trip_time}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Flight Information */}
      {tripPlan.flight_details && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Details</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Ionicons name="airplane-outline" size={22} color={Colors.GRAY} />
              <Text style={styles.infoText}>
                {tripPlan.flight_details.recommended_airline || "Recommended Airlines"}
              </Text>
            </View>
            
            {tripPlan.flight_details.departure_city && (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={22} color={Colors.GRAY} />
                <Text style={styles.infoText}>From: {tripPlan.flight_details.departure_city}</Text>
              </View>
            )}
            
            {tripPlan.flight_details.arrival_city && (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={22} color={Colors.GRAY} />
                <Text style={styles.infoText}>To: {tripPlan.flight_details.arrival_city}</Text>
              </View>
            )}
            
            {tripPlan.flight_details.price_range && (
              <View style={styles.infoRow}>
                <Ionicons name="pricetag-outline" size={22} color={Colors.GRAY} />
                <Text style={styles.infoText}>{tripPlan.flight_details.price_range}</Text>
              </View>
            )}
            
            {tripPlan.flight_details.booking_url && (
              <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => openUrl(tripPlan.flight_details.booking_url)}
              >
                <Ionicons name="link-outline" size={22} color={Colors.WHITE} />
                <Text style={styles.linkButtonText}>Book Flight</Text>
              </TouchableOpacity>
            )}
            
            {tripPlan.flight_details.example_flight && (
              <View style={styles.subCard}>
                <Text style={styles.subCardTitle}>Example Flight</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Airline:</Text>
                  <Text style={styles.infoText}>{tripPlan.flight_details.example_flight.airline}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Departure:</Text>
                  <Text style={styles.infoText}>{tripPlan.flight_details.example_flight.departure_time}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Arrival:</Text>
                  <Text style={styles.infoText}>{tripPlan.flight_details.example_flight.arrival_time}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Price:</Text>
                  <Text style={styles.infoText}>{tripPlan.flight_details.example_flight.price}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Hotel Options */}
      {tripPlan.hotel_options && tripPlan.hotel_options.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accommodation Options</Text>
          {tripPlan.hotel_options.map((hotel, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{hotel.hotel_name}</Text>
              <Text style={styles.cardSubtitle}>{hotel.hotel_address}</Text>
              
              <View style={styles.hotelDetailsRow}>
                {hotel.rating && (
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{hotel.rating}</Text>
                  </View>
                )}
                
                {hotel.geo_coordinates && (
                  <TouchableOpacity 
                    style={styles.mapButton}
                    onPress={() => {
                      const url = `https://www.google.com/maps/search/?api=1&query=${hotel.geo_coordinates.latitude},${hotel.geo_coordinates.longitude}`;
                      Linking.openURL(url);
                    }}
                  >
                    <Ionicons name="location-outline" size={16} color={Colors.WHITE} />
                    <Text style={styles.mapButtonText}>View on Map</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <Text style={styles.cardDescription}>{hotel.description}</Text>
              
              {hotel.nearby_places && hotel.nearby_places.length > 0 && (
                <View style={styles.nearbyContainer}>
                  <Text style={styles.nearbyTitle}>Nearby Places</Text>
                  {hotel.nearby_places.map((place, placeIndex) => (
                    <View key={placeIndex} style={styles.nearbyItem}>
                      <Ionicons name="pin-outline" size={16} color={Colors.GRAY} />
                      <Text style={styles.nearbyText}>
                        {place.place_name} ({place.travel_time})
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Daily Itinerary */}
      {tripPlan.daily_plan && Object.keys(tripPlan.daily_plan).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Itinerary</Text>
          {Object.entries(tripPlan.daily_plan).map(([day, plan], index) => (
            <View key={index} style={styles.itineraryCard}>
              <Text style={styles.dayTitle}>
                {day.toUpperCase()}: {plan.theme}
              </Text>
              
              {plan.activities && plan.activities.map((activity, actIndex) => (
                <View key={actIndex} style={styles.activityItem}>
                  <View style={styles.activityTime}>
                    <Text style={styles.timeText}>{activity.time}</Text>
                    <View style={[
                      styles.timeConnector,
                      actIndex === plan.activities.length - 1 ? styles.lastConnector : {}
                    ]} />
                  </View>
                  
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.activity}</Text>
                    <Text style={styles.activityDetails}>{activity.details}</Text>
                    
                    {activity.image_url && (
                      <Image
                        source={{ uri: activity.image_url }}
                        style={styles.activityImage}
                        defaultSource={require('./../../assets/images/adaptive-icon.png')}
                      />
                    )}
                    
                    <View style={styles.activityMetaContainer}>
                      {activity.duration && (
                        <View style={styles.metaBadge}>
                          <Ionicons name="time-outline" size={14} color={Colors.GRAY} />
                          <Text style={styles.metaBadgeText}>{activity.duration}</Text>
                        </View>
                      )}
                      
                      {activity.travel_time && (
                        <View style={styles.metaBadge}>
                          <Ionicons name="car-outline" size={14} color={Colors.GRAY} />
                          <Text style={styles.metaBadgeText}>{activity.travel_time}</Text>
                        </View>
                      )}
                      
                      {activity.ticket_price && (
                        <View style={styles.metaBadge}>
                          <Ionicons name="pricetag-outline" size={14} color={Colors.GRAY} />
                          <Text style={styles.metaBadgeText}>{activity.ticket_price}</Text>
                        </View>
                      )}
                    </View>
                    
                    {activity.geo_coordinates && (
                      <TouchableOpacity
                        style={styles.mapButtonSmall}
                        onPress={() => {
                          const url = `https://www.google.com/maps/search/?api=1&query=${activity.geo_coordinates.latitude},${activity.geo_coordinates.longitude}`;
                          Linking.openURL(url);
                        }}
                      >
                        <Ionicons name="location-outline" size={12} color={Colors.WHITE} />
                        <Text style={styles.mapButtonTextSmall}>View on Map</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Total Cost Breakdown */}
      {(tripPlan.cost_breakdown || tripPlan.total_trip_cost) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Cost</Text>
          <View style={styles.card}>
            {tripPlan.cost_breakdown && (
              Object.entries(tripPlan.cost_breakdown).map(([category, cost], index) => (
                <View key={index} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{category}:</Text>
                  <Text style={styles.infoText}>{cost}</Text>
                </View>
              ))
            )}
            
            {!tripPlan.cost_breakdown && tripPlan.total_trip_cost && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total:</Text>
                <Text style={styles.infoText}>{tripPlan.total_trip_cost}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonSecondaryText}>Back to My Trips</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  heroContainer: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    justifyContent: 'flex-end',
    padding: 20,
  },
  tripName: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    color: Colors.WHITE,
    opacity: 0.9,
  },
  heroTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 28,
    color: Colors.WHITE,
    marginTop: 4,
  },
  tripMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tripMetaText: {
    fontFamily: 'outfit-Regular',
    fontSize: 16,
    color: Colors.WHITE,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 22,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  subCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  subCardTitle: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    marginBottom: 10,
    color: Colors.BLACK,
  },
  cardTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 18,
    marginBottom: 5,
    color: Colors.BLACK,
  },
  cardSubtitle: {
    fontFamily: 'outfit-Regular',
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 12,
  },
  cardDescription: {
    fontFamily: 'outfit-Regular',
    fontSize: 15,
    marginTop: 12,
    lineHeight: 22,
  },
  hotelDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'outfit-Medium',
    fontSize: 14,
    marginLeft: 4,
    color: '#A68A00',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  mapButtonText: {
    fontFamily: 'outfit-Medium',
    fontSize: 12,
    color: Colors.WHITE,
    marginLeft: 4,
  },
  mapButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  mapButtonTextSmall: {
    fontFamily: 'outfit-Regular',
    fontSize: 11,
    color: Colors.WHITE,
    marginLeft: 3,
  },
  nearbyContainer: {
    marginTop: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ddd',
  },
  nearbyTitle: {
    fontFamily: 'outfit-Medium',
    fontSize: 15,
    marginBottom: 8,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nearbyText: {
    fontFamily: 'outfit-Regular',
    fontSize: 14,
    color: Colors.GRAY,
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontFamily: 'outfit-Medium',
    fontSize: 15,
    width: 80,
  },
  infoText: {
    fontFamily: 'outfit-Regular',
    fontSize: 15,
    flex: 1,
    marginLeft: 8,
    color: Colors.BLACK,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLUE,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  linkButtonText: {
    fontFamily: 'outfit-Medium',
    fontSize: 14,
    color: Colors.WHITE,
    marginLeft: 8,
  },
  itineraryCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  dayTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 18,
    marginBottom: 16,
    color: Colors.BLACK,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  activityTime: {
    width: 60,
    alignItems: 'center',
    marginRight: 5,
  },
  timeText: {
    fontFamily: 'outfit-Medium',
    fontSize: 14,
    backgroundColor: Colors.BLACK,
    color: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  timeConnector: {
    width: 2,
    height: '100%',
    backgroundColor: Colors.GRAY,
    marginTop: 4,
    alignSelf: 'center',
  },
  lastConnector: {
    height: 20,  // shorter for the last activity
  },
  activityContent: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: Colors.BLACK,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  activityTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  activityDetails: {
    fontFamily: 'outfit-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.BLACK,
  },
  activityImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  activityMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metaBadgeText: {
    fontFamily: 'outfit-Regular',
    fontSize: 12,
    color: Colors.GRAY,
    marginLeft: 4,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: Colors.BLACK,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    color: Colors.WHITE,
  },
  buttonSecondary: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    color: Colors.BLACK,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 30,
  },
  loadingText: {
    fontFamily: 'outfit-Regular',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 30,
  },
  errorText: {
    fontFamily: 'outfit-Medium',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
