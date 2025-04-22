import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import Login from '../components/Login';
import { auth } from './../configs/Firebase_Config';
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/LoadingScreen';

export default function Index() {
  const [initialScreen, setInitialScreen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        
        if (onboardingCompleted !== 'true') {
          setInitialScreen('onboarding');
        } else if (user) {
          setInitialScreen('(tabs)/MyTrip');
        } else {
          setInitialScreen('Login');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setInitialScreen(user ? '(tabs)/MyTrip' : 'Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  if (isLoading) {
    return <LoadingScreen message="Preparing your experience..." />;
  }

  if (initialScreen === 'onboarding') {
    return <Redirect href="/onboarding" />;
  }
  
  if (initialScreen === 'Login') {
    return <Login />;
  }

  return <Redirect href={initialScreen} />;
}
