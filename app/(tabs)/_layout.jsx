import React from 'react';
import { Tabs } from 'expo-router';
import { useFonts } from "expo-font";
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  useFonts({
    'outfit-Regular': require('./../../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Medium': require('./../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Bold': require('./../../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.TEXT_TERTIARY,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: Platform.OS === 'ios' ? 'rgba(18, 18, 18, 0.8)' : Colors.BACKGROUND_ELEVATED }]} />
        ),
      }}
    >
      <Tabs.Screen 
        name="MyTrip"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
          tabBarLabel: 'My Trips'
        }}
      />
      <Tabs.Screen 
        name="Discover"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
          tabBarLabel: 'Discover'
        }}
      />    
      <Tabs.Screen 
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: 'Profile'
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors.BACKGROUND_ELEVATED,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontFamily: 'outfit-Medium',
    fontSize: 12,
    marginBottom: 5,
  }
});