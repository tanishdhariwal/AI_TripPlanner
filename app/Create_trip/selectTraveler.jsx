import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function selectTraveler() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
    headerShown: true,
    headerTransparent: true,
    headerTitle: '',
    })
  },[])
  return (
    <View>

    </View>
  )
}