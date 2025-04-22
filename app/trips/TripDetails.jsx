import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/Firebase_Config';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import AppCard from '../../components/ui/AppCard';

export default function TripDetails() {
  const { tripId } = useLocalSearchParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (tripId) {
      fetchTripDetails();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [tripId]);

  const fetchTripDetails = useCallback(async () => {
    if (!tripId) return;

    try {
      const docRef = doc(db, "UserTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (isMountedRef.current) {
        if (docSnap.exists()) {
          setTripData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [tripId]);

  const openUrl = useCallback((url) => {
    if (url && url.startsWith('http')) {
      Linking.openURL(url);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <AppText variant="body" color="secondary" style={styles.loadingText}>
          Loading trip details...
        </AppText>
      </View>
    );
  }

  if (!tripData) {
    return (
      <View style={styles.errorContainer}>
        <AppText variant="h4" style={styles.errorText}>Trip not found</AppText>
        <AppButton 
          title="Go Back" 
          onPress={() => router.back()} 
          variant="outline"
        />
      </View>
    );
  }

  let parsedTripData = {};
  try {
    parsedTripData = JSON.parse(tripData.tripData || '{}');
  } catch (error) {
    console.error("Error parsing trip data:", error);
  }
  
  const tripPlan = tripData.tripPlan || {};

  return (
    <View style={styles.container}>
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
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        />
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        
        <View style={styles.heroContent}>
          <AppText variant="caption" color="secondary">
            {tripPlan.trip_name || "AI Generated Trip"}
          </AppText>
          <AppText variant="h2" style={styles.locationText}>
            {tripPlan.location || parsedTripData?.locationInfo?.name || "Trip Destination"}
          </AppText>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color={Colors.TEXT_SECONDARY} />
              <AppText variant="body2" color="secondary" style={styles.metaText}>
                {parsedTripData?.startDate && parsedTripData?.endDate ? 
                  `${moment(parsedTripData.startDate).format('DD MMM')} - ${moment(parsedTripData.endDate).format('DD MMM YYYY')}` : 
                  "Date not specified"
                }
              </AppText>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={16} color={Colors.TEXT_SECONDARY} />
              <AppText variant="body2" color="secondary" style={styles.metaText}>
                {parsedTripData?.traveler?.title || tripPlan.travelers || "Travelers"}
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip Summary */}
        <View style={styles.section}>
          <AppText variant="h4" style={styles.sectionTitle}>Trip Summary</AppText>
          <AppCard style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Ionicons name="calendar-outline" size={20} color={Colors.PRIMARY} />
              <View style={styles.summaryTextContainer}>
                <AppText variant="caption" color="secondary">Duration</AppText>
                <AppText variant="subtitle2">
                  {parsedTripData.TotalDays || tripPlan.duration || "Not specified"}
                </AppText>
              </View>
            </View>
            
            <View style={styles.summaryItem}>
              <Ionicons name="people-outline" size={20} color={Colors.ACCENT_2} />
              <View style={styles.summaryTextContainer}>
                <AppText variant="caption" color="secondary">Travelers</AppText>
                <AppText variant="subtitle2">
                  {parsedTripData?.traveler?.title || tripPlan.travelers || "Not specified"}
                </AppText>
              </View>
            </View>
            
            <View style={styles.summaryItem}>
              <Ionicons name="cash-outline" size={20} color={Colors.ACCENT_3} />
              <View style={styles.summaryTextContainer}>
                <AppText variant="caption" color="secondary">Budget</AppText>
                <AppText variant="subtitle2">
                  {parsedTripData.Budget || tripPlan.budget || "Not specified"}
                </AppText>
              </View>
            </View>
            
            {tripPlan.best_time_to_visit && (
              <View style={styles.summaryItem}>
                <Ionicons name="time-outline" size={20} color={Colors.ACCENT_1} />
                <View style={styles.summaryTextContainer}>
                  <AppText variant="caption" color="secondary">Best time to visit</AppText>
                  <AppText variant="subtitle2">{tripPlan.best_time_to_visit}</AppText>
                </View>
              </View>
            )}
            
            {tripPlan.total_trip_cost && (
              <View style={styles.totalCostContainer}>
                <AppText variant="caption" color="secondary">ESTIMATED TOTAL COST</AppText>
                <AppText variant="subtitle1" color="primary">
                  {tripPlan.total_trip_cost}
                </AppText>
              </View>
            )}
          </AppCard>
        </View>

        {/* Flight Information */}
        {tripPlan.flight_details && (
          <View style={styles.section}>
            <AppText variant="h4" style={styles.sectionTitle}>Flight Details</AppText>
            <AppCard style={styles.flightCard}>
              <View style={styles.flightHeader}>
                <View style={styles.flightRoute}>
                  <AppText variant="body2" color="secondary">
                    {tripPlan.flight_details.departure_city || "Your City"}
                  </AppText>
                  <View style={styles.flightRouteConnector}>
                    <View style={styles.flightLine} />
                    <Ionicons name="airplane" size={18} color={Colors.PRIMARY} />
                    <View style={styles.flightLine} />
                  </View>
                  <AppText variant="body2" color="secondary">
                    {tripPlan.flight_details.arrival_city || "Destination"}
                  </AppText>
                </View>
                
                <View style={styles.airlineBadge}>
                  <AppText variant="caption" color="secondary">
                    {tripPlan.flight_details.recommended_airline || "Recommended Airline"}
                  </AppText>
                </View>
              </View>
              
              {tripPlan.flight_details.price_range && (
                <View style={styles.priceContainer}>
                  <AppText variant="caption" color="secondary">PRICE RANGE</AppText>
                  <AppText variant="subtitle2">{tripPlan.flight_details.price_range}</AppText>
                </View>
              )}
              
              {tripPlan.flight_details.example_flight && (
                <View style={styles.exampleFlightContainer}>
                  <AppText variant="caption" color="secondary">SAMPLE FLIGHT</AppText>
                  <View style={styles.exampleFlightDetails}>
                    <View style={styles.flightDetail}>
                      <AppText variant="caption" color="secondary">Airline</AppText>
                      <AppText variant="body2">
                        {tripPlan.flight_details.example_flight.airline}
                      </AppText>
                    </View>
                    
                    <View style={styles.flightDetail}>
                      <AppText variant="caption" color="secondary">Departure</AppText>
                      <AppText variant="body2">
                        {tripPlan.flight_details.example_flight.departure_time}
                      </AppText>
                    </View>
                    
                    <View style={styles.flightDetail}>
                      <AppText variant="caption" color="secondary">Arrival</AppText>
                      <AppText variant="body2">
                        {tripPlan.flight_details.example_flight.arrival_time}
                      </AppText>
                    </View>
                    
                    <View style={styles.flightDetail}>
                      <AppText variant="caption" color="secondary">Price</AppText>
                      <AppText variant="body2">
                        {tripPlan.flight_details.example_flight.price}
                      </AppText>
                    </View>
                  </View>
                </View>
              )}
              
              {tripPlan.flight_details.booking_url && (
                <AppButton 
                  title="Book Flight"
                  onPress={() => openUrl(tripPlan.flight_details.booking_url)}
                  variant="primary" 
                  size="small"
                  icon={<Ionicons name="open-outline" size={18} color={Colors.WHITE} style={{marginLeft: 8}} />}
                  style={styles.bookButton}
                />
              )}
            </AppCard>
          </View>
        )}

        {/* Hotel Options */}
        {tripPlan.hotel_options && tripPlan.hotel_options.length > 0 && (
          <View style={styles.section}>
            <AppText variant="h4" style={styles.sectionTitle}>Accommodation Options</AppText>
            
            {tripPlan.hotel_options.map((hotel, index) => (
              <AppCard key={index} style={styles.hotelCard}>
                <AppText variant="subtitle1">{hotel.hotel_name || "Hotel"}</AppText>
                <AppText variant="caption" color="secondary" style={styles.hotelAddress}>
                  {hotel.hotel_address || "Address not available"}
                </AppText>
                
                <View style={styles.hotelMeta}>
                  {hotel.rating && (
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color={Colors.WARNING} />
                      <AppText variant="caption" style={styles.ratingText}>
                        {hotel.rating}
                      </AppText>
                    </View>
                  )}
                </View>
                
                <AppText variant="body2" style={styles.hotelDescription}>
                  {hotel.description || "No description available"}
                </AppText>
                
                {hotel.nearby_places && hotel.nearby_places.length > 0 && (
                  <View style={styles.nearbyContainer}>
                    <AppText variant="caption" color="secondary">NEARBY PLACES</AppText>
                    {hotel.nearby_places.map((place, placeIndex) => (
                      <View key={placeIndex} style={styles.nearbyItem}>
                        <Ionicons name="location-outline" size={14} color={Colors.TEXT_SECONDARY} />
                        <AppText variant="caption" color="secondary" style={styles.nearbyText}>
                          {place.place_name} ({place.travel_time})
                        </AppText>
                      </View>
                    ))}
                  </View>
                )}
                
                {hotel.geo_coordinates && (
                  <AppButton
                    title="View on Map"
                    size="small"
                    variant="outline"
                    icon={<Ionicons name="map-outline" size={16} color={Colors.TEXT_PRIMARY} style={{marginRight: 8}} />}
                    onPress={() => {
                      const url = `https://www.google.com/maps/search/?api=1&query=${hotel.geo_coordinates.latitude},${hotel.geo_coordinates.longitude}`;
                      Linking.openURL(url);
                    }}
                    style={styles.mapButton}
                  />
                )}
              </AppCard>
            ))}
          </View>
        )}

        {/* Daily Itinerary */}
        {tripPlan.daily_plan && Object.keys(tripPlan.daily_plan).length > 0 && (
          <View style={styles.section}>
            <AppText variant="h4" style={styles.sectionTitle}>Daily Itinerary</AppText>
            
            {Object.entries(tripPlan.daily_plan).map(([day, plan], index) => (
              <AppCard key={index} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <View>
                    <AppText variant="body2" color="primary" style={styles.dayLabel}>
                      {day.toUpperCase().replace(/DAY/, 'DAY ')}
                    </AppText>
                    <AppText variant="subtitle1">{plan.theme || day}</AppText>
                  </View>
                </View>
                
                {plan.activities && plan.activities.map((activity, actIndex) => (
                  <View key={actIndex} style={styles.activityItem}>
                    <View style={styles.timelineContainer}>
                      <AppText variant="caption" style={styles.activityTime}>
                        {activity.time || "--:--"}
                      </AppText>
                      <View style={styles.timelineDot} />
                      <View style={[
                        styles.timelineConnector,
                        actIndex === plan.activities.length - 1 && styles.lastConnector
                      ]} />
                    </View>
                    
                    <View style={styles.activityContent}>
                      <AppText variant="subtitle2">{activity.activity || "Activity"}</AppText>
                      <AppText variant="body2" color="secondary" style={styles.activityDetails}>
                        {activity.details || "No details available"}
                      </AppText>
                      
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
                            <Ionicons name="time-outline" size={14} color={Colors.TEXT_SECONDARY} />
                            <AppText variant="caption" color="secondary" style={styles.metaBadgeText}>
                              {activity.duration}
                            </AppText>
                          </View>
                        )}
                        
                        {activity.travel_time && (
                          <View style={styles.metaBadge}>
                            <Ionicons name="car-outline" size={14} color={Colors.TEXT_SECONDARY} />
                            <AppText variant="caption" color="secondary" style={styles.metaBadgeText}>
                              {activity.travel_time}
                            </AppText>
                          </View>
                        )}
                        
                        {activity.ticket_price && (
                          <View style={styles.metaBadge}>
                            <Ionicons name="pricetag-outline" size={14} color={Colors.TEXT_SECONDARY} />
                            <AppText variant="caption" color="secondary" style={styles.metaBadgeText}>
                              {activity.ticket_price}
                            </AppText>
                          </View>
                        )}
                      </View>
                      
                      {activity.geo_coordinates && (
                        <TouchableOpacity
                          style={styles.locationButton}
                          onPress={() => {
                            const url = `https://www.google.com/maps/search/?api=1&query=${activity.geo_coordinates.latitude},${activity.geo_coordinates.longitude}`;
                            Linking.openURL(url);
                          }}
                        >
                          <Ionicons name="location-outline" size={14} color={Colors.PRIMARY} />
                          <AppText variant="caption" color="primary" style={styles.locationButtonText}>
                            View on Map
                          </AppText>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </AppCard>
            ))}
          </View>
        )}

        {/* Total Cost Breakdown */}
        {(tripPlan.cost_breakdown || tripPlan.total_trip_cost) && (
          <View style={styles.section}>
            <AppText variant="h4" style={styles.sectionTitle}>Trip Cost</AppText>
            <AppCard style={styles.costCard}>
              {tripPlan.cost_breakdown && (
                Object.entries(tripPlan.cost_breakdown).map(([category, cost], index) => (
                  <View key={index} style={styles.costItem}>
                    <AppText variant="body2" color="secondary">{category}</AppText>
                    <AppText variant="subtitle2">{cost}</AppText>
                  </View>
                ))
              )}
              
              {!tripPlan.cost_breakdown && tripPlan.total_trip_cost && (
                <View style={styles.costItem}>
                  <AppText variant="body2" color="secondary">Total</AppText>
                  <AppText variant="subtitle2">{tripPlan.total_trip_cost}</AppText>
                </View>
              )}
              
              {tripPlan.total_trip_cost && tripPlan.cost_breakdown && (
                <View style={styles.totalCostItem}>
                  <AppText variant="subtitle2" color="primary">Total</AppText>
                  <AppText variant="subtitle1" color="primary">{tripPlan.total_trip_cost}</AppText>
                </View>
              )}
            </AppCard>
          </View>
        )}

        <View style={styles.footer}>
          <AppButton 
            title="Back to My Trips" 
            onPress={() => router.back()}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    justifyContent: 'flex-end',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  locationText: {
    marginVertical: 8,
    color: Colors.WHITE,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  metaInfo: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 4,
  },
  metaText: {
    marginLeft: 5,
  },
  content: {
    flex: 1,
    paddingTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    marginBottom: 15,
  },
  summaryCard: {
    padding: 0,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  summaryTextContainer: {
    marginLeft: 15,
  },
  totalCostContainer: {
    padding: 15,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    borderRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  flightCard: {
    padding: 0,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  flightRouteConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  flightLine: {
    height: 1,
    backgroundColor: Colors.TEXT_TERTIARY,
    flex: 1,
  },
  airlineBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  priceContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  exampleFlightContainer: {
    padding: 15,
  },
  exampleFlightDetails: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    padding: 10,
  },
  flightDetail: {
    marginVertical: 5,
  },
  bookButton: {
    margin: 15,
    marginTop: 5,
  },
  hotelCard: {
    marginBottom: 15,
    padding: 15,
  },
  hotelAddress: {
    marginTop: 3,
    marginBottom: 12,
  },
  hotelMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: Colors.WARNING,
  },
  hotelDescription: {
    marginVertical: 12,
    lineHeight: 20,
  },
  nearbyContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 15,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  nearbyText: {
    marginLeft: 6,
  },
  mapButton: {
    alignSelf: 'flex-start',
  },
  dayCard: {
    marginBottom: 15,
    padding: 15,
  },
  dayHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 12,
    marginBottom: 16,
  },
  dayLabel: {
    marginBottom: 4,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  timelineContainer: {
    width: 60,
    alignItems: 'center',
    position: 'relative',
    paddingTop: 3,
  },
  activityTime: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
  },
  timelineConnector: {
    width: 2,
    position: 'absolute',
    top: 35,
    bottom: 0,
    backgroundColor: 'rgba(108, 99, 255, 0.3)',
  },
  lastConnector: {
    height: 15,
  },
  activityContent: {
    flex: 1,
    paddingLeft: 10,
  },
  activityDetails: {
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 20,
  },
  activityImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  activityMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metaBadgeText: {
    marginLeft: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  locationButtonText: {
    marginLeft: 4,
  },
  costCard: {
    padding: 0,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  totalCostItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
  },
  footer: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  loadingText: {
    marginTop: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_DARK,
    padding: 30,
  },
  errorText: {
    marginBottom: 20,
    textAlign: 'center',
  },
});
