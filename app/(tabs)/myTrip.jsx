import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from '../../components/myTrips/StartNewTrip';
export default function myTrip() {
  const [userTrips,setUserTrips] = useState([]);
  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height:'100%',
      padding:20,
      paddingTop:'25%',
      
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
      }}>
      <Ionicons style = {{marginLeft:'-500'}}name="add-circle-outline" size={30} color="black" />
      </View>
      {userTrips?.length==0?
      <StartNewTrip/>
      :null
      }
    </View>
  )
}