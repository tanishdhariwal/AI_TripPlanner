import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { createTripContext } from '../../context/createTripContext';
import { AIPrompt } from './../../constants/options';
export default function GenerateTrip() {
    const navigation = useNavigation();
    const {tripData, setTripData} = useContext(createTripContext);
    useEffect(() => {
        tripData && GenAITrip();
    }, [tripData])
    const GenAITrip = () => {
            const Final_Prompt = AIPrompt.
            replace('{location}', tripData?.locationInfo?.name)
            .replace('{TotalDay}', tripData?.TotalDays)
            .replace('{TotalNight}', tripData?.TotalDays-1)
            .replace('{traveler}',tripData.traveler?.title)
            .replace('{budget}', tripData.Budget)

            console.log(Final_Prompt);
    }
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);
  return (
    <View style = {{
        padding :20,
        paddingTop:75,
        backgroundColor:'white',
        height:'100%'

    }}>
        <Text style = {{
        textAlign:'center',
        fontFamily:'outfit-Medium',
        fontSize:30,
      }}>Please Wait!</Text>
      <Text style = {{
        textAlign:'center',
        fontFamily:'outfit-Regular',
        fontSize:29,
        marginTop:20
      }}>Generating your trip......</Text>
        <Image source = {require('./../../assets/images/planee.gif')} 
        style = {{
            marginTop:50,
            width:200,
            height:200,
            alignSelf:'center',
        }}
        resizeMode="contain"/>

    </View>
  )
}