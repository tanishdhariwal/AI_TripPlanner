import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function ReviewTrip() {
  return (
    <View
    style = {{
        padding :20,
        paddingTop:75,
        backgroundColor:'white',
        height:'100%'
    }}>
      <Text style = {{
                    fontFamily:'outfit-Regular',
                    fontSize:30,
                    textAlign:'center',
                  }}>Review your Trip</Text>
        <View style = {{
            padding :15,
            marginTop:20,
        }}>
        <Ionicons name="location-sharp" size={30} color="black" />
        </View>
    </View>
  )
}