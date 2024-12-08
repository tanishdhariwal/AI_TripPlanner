import { View, Text } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function StartNewTrip() {
  return (
    <View style={{
      padding:20,
      margin:50,
      display:'flex',
      alignItems:'center',
      }}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <text>"</text>
    </View>
  )
}