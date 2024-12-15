import { View, Text, } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import {useFonts} from "expo-font";

export default function TabLayout() {
  useFonts({
    'outfit-Regular':require('./../../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Medium':require('./../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Bold':require('./../../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
    <Tabs screenOptions={{
      headerShown:false
    }}>
        <Tabs.Screen name = "MyTrip"
        options={{
          tabBarIcon:()=><Ionicons name="location-sharp" size={24} color="black" />,
          tabBarLabel:'My Trip'
        }}/>
        <Tabs.Screen name = "Discover"
         options={{
          tabBarIcon:()=><Ionicons name="globe-sharp" size={24} color="black" />,
          tabBarLabel:'Discover'
        }}/>    
        <Tabs.Screen name = "Profile"
         options={{
          tabBarIcon:()=><Ionicons name="person-circle" size={24} color="black" />,
          tabBarLabel:'Profile'
        }}/>       

    </Tabs>
  )
}