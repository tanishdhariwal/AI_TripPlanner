import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import {createTripContext} from "../context/createTripContext";
import { useState } from "react";
export default function RootLayout() {

  useFonts({
    'outfit-Regular':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Bold':require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  const[tripData, setTripData] = useState([]);
  return (
  <createTripContext.Provider value = {{tripData, setTripData}}> 

    <Stack screenOptions={{
      headerShown:true,
      headerTransparent:true,
      headerTitle:'',
    }}>
      {/* <Stack.Screen name="index" options={{
        headerShown:false
        }}/> */}
      <Stack.Screen name = "(tabs)"/>
    </Stack>
  </createTripContext.Provider>
  );
}
