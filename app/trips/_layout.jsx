import React from 'react';
import { Stack } from 'expo-router';

export default function TripsLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="TripDetails" />
    </Stack>
  );
}
