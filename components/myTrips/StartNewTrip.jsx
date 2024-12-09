import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useRouter} from 'expo-router';
export default function StartNewTrip() {
  const router = useRouter();
  return (
    <View style={{
      padding:20,
      marginTop:50,
      display:'flex',
      alignItems:'center',
      gap:20,
      }}>
        {/* <TouchableOpacity 
        onPress={()=>router.back()}> 
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}
        <Ionicons name="location-sharp" size={24} color="black" />
        <Text style = {{
          fontFamily:'outfit-Medium',
          fontSize:25,
          textAlign:'center',
          marginTop:20,
          color:Colors.DARK_GREY
        }}>No Trips Planned yet!</Text>
        <Text style = {{
          fontFamily:'outfit-Regular',
          fontSize:15,
          textAlign:'center',
          marginTop:20,
          color:Colors.GRAY,
        }}>Time to plan a new experience!</Text>
        <TouchableOpacity onPress = {()=>router.push("/Create_trip/SearchPlace")}style = {{
          padding:15,
          backgroundColor:Colors.BLACK,
          borderRadius:20,
          paddingHorizontal:30,
        }}>
          <Text style = {{
            fontFamily:'outfit-Regular',
            color:Colors.WHITE,
            fontSize:17,
          }}>Start a new trip</Text>
        </TouchableOpacity>
    </View>
  )
}