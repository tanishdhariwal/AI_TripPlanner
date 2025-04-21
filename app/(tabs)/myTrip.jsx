import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import {Colors} from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../components/myTrips/StartNewTrip';
import UserTripList from '../../components/myTrips/UserTripList';
import {db} from '../../configs/Firebase_Config';
import {auth} from '../../configs/Firebase_Config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    try {
      setUserTrips([]);
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
      const QuerySnapshot = await getDocs(q);
      const trips = [];
      QuerySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    user && GetMyTrips();
  }, [user]);

  return (
    <ScrollView 
      style={{
        backgroundColor: Colors.WHITE,
        height: '100%',
        padding: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{
          fontFamily: 'outfit-Medium',
          fontSize: 30,
        }}>My Trips</Text>
        <Ionicons onPress={() => router.push('/Create_trip/SearchPlace')} name="add-circle-sharp" size={40} color="black" />
      </View>
      {loading && <ActivityIndicator size={'large'} color='black' />}
      
      {userTrips?.length == 0 ?
        <StartNewTrip />
        :
        <UserTripList userTrips={userTrips} />
      }
    </ScrollView>
  )
}