import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { createTripContext } from './../../context/createTripContext';
import 'react-native-get-random-values';
export default function SearchPlace() {
    const navigation = useNavigation();
    const router = useRouter();
    const {tripData, setTripData} = useContext(createTripContext);
    useEffect(()=>{
        navigation.setOptions({headerShown:true,
            headerTransparent:true,
            headerTitle:"Search",
        })
    },[])
    // useEffect(()=>{
    //   console.log(tripData);
    // },[tripData])
  return (
    <View style = {{
        padding:20,
        paddingTop:55,
        backgroundColor:'white',
        height:'100%',
    }}>
      <GooglePlacesAutocomplete
      placeholder='Search place'
      fetchDetails = {true}  
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data.description);
        // console.log(details?.url);
        // console.log(details?.geometry.location);
        // console.log(details?.photos[0].photo_reference);
        setTripData({
          locationInfo:{
            name:data.description,
            coordinates:details?.geometry.location,
            photoRef:details?.photos[0].photo_reference,
            url:details?.url,
          }
        });
        router.push('/Create_trip/SelectTraveler');
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        language: 'en',
      }}
      styles = {{
        textInputContainer:{
          borderWidth:1,
          marginTop:30,
          borderRadius:5,
        }
      }}
    />
    
    </View>
  )
}