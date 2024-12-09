import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default function SearchPlace() {
    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({headerShown:true,
            headerTransparent:true,
            headerTitle:"Search",
        })
    },[])
  return (
    <View style = {{
        padding:20,
        paddingTop:55,
        backgroundColor:'white',
        height:'100%',
    }}>
         <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
    </View>
  )
}