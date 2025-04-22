import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { createTripContext } from "../context/createTripContext";
import { useState, useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Colors } from "../constants/Colors";
import LoadingScreen from "../components/LoadingScreen";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit-Regular': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  const [tripData, setTripData] = useState([]);
  const [isAppReady, setIsAppReady] = useState(false);
  
  // Simulate app initialization process
  useEffect(() => {
    const initTimeout = setTimeout(() => {
      setIsAppReady(true);
    }, 2000);
    return () => clearTimeout(initTimeout);
  }, []);

  if (!fontsLoaded || !isAppReady) {
    return <LoadingScreen message="Setting up your travel planner..." />;
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <createTripContext.Provider value={{ tripData, setTripData }}> 
        <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND_DARK }}>
          <Stack 
            screenOptions={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: Colors.TEXT_PRIMARY,
              contentStyle: { backgroundColor: Colors.BACKGROUND_DARK },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/Sign-in/index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/Sign-up/index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="trips" options={{ headerShown: false }} />
            <Stack.Screen name="Create_trip" options={{ headerShown: false }} />
          </Stack>
        </View>
      </createTripContext.Provider>
    </ThemeProvider>
  );
}
