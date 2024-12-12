import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SelectTravelersList } from './../../constants/options'
import OptionCard from './../../components/createTrips/OptionCard'
import { createTripContext } from '../../context/createTripContext'
export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();
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
      traveler: SelectedTraveler,
    })
  }, [SelectedTraveler])
    useEffect(()=>{
        console.log(tripData);
      },[tripData])
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
              <OptionCard option={item} SelectedOption={SelectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity onPress={()=>router.push('/Create_trip/SelectDate')}>
        <Text style = {{
          backgroundColor:'#000000',
          color:'white',
          padding:10,
          borderRadius:15,
          textAlign:'center',
          marginTop:20,
          fontFamily:'outfit-Regular',
          fontSize:20,
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}