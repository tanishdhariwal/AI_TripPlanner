import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({ trip, onPress }) {
  const parsedTripData = JSON.parse(trip?.tripData || '{}');
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      <Image 
        style={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 10,
        }}
        source={
          parsedTripData?.locationInfo?.photoRef 
            ? {
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${parsedTripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
              }
            : require('./../../assets/images/adaptive-icon.png')
        }
      />
      <View style={{ marginLeft: 15, flex: 1, justifyContent: 'center' }}>
        <Text style={{
          fontFamily: 'outfit-Medium',
          fontSize: 18,
          color: 'black',
        }}>{trip?.tripPlan?.location}</Text>
        <Text style={{
          fontFamily: 'outfit-Regular',
          fontSize: 15,
          color: 'grey',
          marginTop: 4,
        }}>{moment(parsedTripData?.startDate).format('DD MMM yyyy')}</Text>
        <Text style={{
          fontFamily: 'outfit-Regular',
          fontSize: 15,
          color: 'grey',
        }}>{parsedTripData?.traveler?.title || trip?.tripPlan?.travelers}</Text>
      </View>
    </TouchableOpacity>
  )
}