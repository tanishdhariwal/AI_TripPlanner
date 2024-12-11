import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { SelectTravelersList } from './../../constants/options'
import OptionCard from './../../components/createTrips/OptionCard'
import { createTripContext } from '../../context/createTripContext'
export default function SelectTraveler() {
  const navigation = useNavigation();
  const [SelectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(createTripContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    })
  }, [])
  useEffect(() => {
    setTripData({...tripData,
      travelerCount: SelectedTraveler,
    })
  }, [SelectedTraveler])
  return (
    <View style={{
      paddingTop: 50,
      padding: 20,
      backgroundColor: 'white',
      height: '100%',
    }}>
      <Text style={{
        fontFamily: 'outfit-Regular',
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
      }}>Who is Travelling?</Text>
      <View>
        <FlatList
          data={SelectTravelersList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}>
              <OptionCard option={item} SelectedTraveler={SelectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}