import { View, ActivityIndicator, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../components/myTrips/StartNewTrip';
import UserTripList from '../../components/myTrips/UserTripList';
import { db } from '../../configs/Firebase_Config';
import { auth } from '../../configs/Firebase_Config';
import { collection, getDocs, query, where, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useFocusEffect, useRouter } from 'expo-router';
import AppText from '../../components/ui/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import AppCard from '../../components/ui/AppCard';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const router = useRouter();
  const user = auth.currentUser;
  const unsubscribeRef = useRef(null);

  // This ensures we only fetch data when the component is mounted and focused
  useFocusEffect(
    useCallback(() => {
      setIsMounted(true);
      if (user) {
        setupTripsListener();
      }
      
      return () => {
        setIsMounted(false);
        // Clean up the listener when leaving the screen
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
          unsubscribeRef.current = null;
        }
      };
    }, [user])
  );

  // Setup a real-time listener for trips instead of one-time fetch
  const setupTripsListener = useCallback(() => {
    if (!user || !isMounted) return;
    
    setLoading(true);
    
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user.email));
      
      // Unsubscribe from previous listener if exists
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      
      // Set up new listener
      unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
        if (!isMounted) return;
        
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        });
        
        setUserTrips(trips);
        setLoading(false);
        setRefreshing(false);
      }, (error) => {
        console.error("Error listening to trips:", error);
        setLoading(false);
        setRefreshing(false);
      });
      
    } catch (error) {
      console.error("Error setting up trips listener:", error);
      setLoading(false);
      setRefreshing(false);
    }
  }, [user, isMounted]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (user && isMounted) {
      // Re-setup listener on refresh
      setupTripsListener();
    } else {
      setRefreshing(false);
    }
  }, [user, isMounted, setupTripsListener]);

  const deleteTrip = useCallback(async (tripId) => {
    if (!user) return;

    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "UserTrips", tripId));
              // No need to update state manually as the listener will handle it
            } catch (error) {
              console.error("Error deleting trip:", error);
              Alert.alert("Error", "Failed to delete trip. Please try again.");
            }
          }
        }
      ]
    );
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, 'transparent']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <AppText variant="h2">My Trips</AppText>
            <AppText variant="subtitle2" color="secondary">
              {userTrips.length > 0 
                ? `You have ${userTrips.length} trip${userTrips.length > 1 ? 's' : ''} planned` 
                : 'Create your first trip'
              }
            </AppText>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/Create_trip/SearchPlace')}
          >
            <LinearGradient
              colors={Colors.GRADIENT_PRIMARY}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add" size={24} color={Colors.WHITE} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.PRIMARY}
            colors={[Colors.PRIMARY]}
          />
        }
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
            <AppText variant="subtitle2" color="secondary" style={styles.loadingText}>
              Loading your trips...
            </AppText>
          </View>
        )}
        
        {!loading && userTrips?.length === 0 ? (
          <StartNewTrip />
        ) : (
          <UserTripList userTrips={userTrips} onDeleteTrip={deleteTrip} />
        )}

        {/* Upcoming Features Promo Card */}
        {!loading && userTrips.length > 0 && (
          <AppCard style={styles.promoCard}>
            <LinearGradient
              colors={Colors.GRADIENT_SECONDARY}
              style={styles.promoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={require('../../assets/images/adaptive-icon.png')}
                style={styles.promoImage}
                resizeMode="contain"
              />
              <View style={styles.promoContent}>
                <AppText variant="subtitle1" color="white" style={styles.promoTitle}>
                  Coming Soon
                </AppText>
                <AppText variant="caption" color="white" style={styles.promoDesc}>
                  Trip sharing, real-time updates, and more features on the way!
                </AppText>
              </View>
            </LinearGradient>
          </AppCard>
        )}

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
    height: 140,
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
  },
  promoCard: {
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 0,
  },
  promoGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  promoImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoDesc: {
    opacity: 0.9,
  },
  footer: {
    height: 80,
  },
});