import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../components/myTrips/StartNewTrip';
import UserTripList from '../../components/myTrips/UserTripList';
import {db} from '../../configs/Firebase_Config';
import {auth} from '../../configs/Firebase_Config';
import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import { useRouter } from 'expo-router';
export default function MyTrip() {

  const [userTrips,setUserTrips] = useState([]);
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;
  useEffect(()=>{
    user && GetMyTrips();
  },[user])
  const GetMyTrips = async ()=>{
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
    const QuerySnapshot = await getDocs(q);
    QuerySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setUserTrips(prev=>[...prev,doc.data()]);
    });
    setLoading(false);
  }

  return (
    <ScrollView style={{
      backgroundColor:Colors.WHITE,
      height:'100%',
      padding:20, 
      //paddingTop:55,
      
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
      }}>
        <Text style={{
          fontFamily:'outfit-Medium',
          fontSize:30,
        }}>My Trips</Text>
      <Ionicons onPress={()=>router.push('/Create_trip/SearchPlace')} name="add-circle-sharp" size={40} color="black" />
      </View>
      {loading&&<ActivityIndicator size = {'large'} color = 'black'/>}
      
      {userTrips?.length==0?
      <StartNewTrip/>
      :
      <UserTripList userTrips = {userTrips}/>
      }
    </ScrollView>
  )
}