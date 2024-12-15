import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment/moment';
import UserTripCard from './UserTripCard';

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0]?.tripData);

  return userTrips&&(
    <View>
        <View
        style = {{
          marginTop:40,
        }}>
            {LatestTrip?.locationInfo?.photoRef?
            <Image
            source={{
              uri:
                'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
                LatestTrip.locationInfo.photoRef +
                '&key=' +
                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            }}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 10,
            }}
          />
            :
            <Image source={require('./../../assets/images/adaptive-icon.png')}
            style = {{
              width:'100%',
              height:200,
              objectFit:'cover',
              borderRadius:10,
            }}
            />}
        </View>
        <View style = {{
          marginTop:10,
        }}>
          <Text style = {{
            fontFamily:'outfit-Medium',
            fontSize:25,
          }}>{userTrips[0]?.tripPlan?.location}</Text>
          <View style = {{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginTop:10,
            padding:5,
          }}>
            <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:15,
            color:'grey',
          }}>{moment(LatestTrip?.startDate).format('DD MMM yyyy')}</Text>
          <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:15,
            color:'grey',
          }}>{LatestTrip?.traveler?.title}</Text>
          </View>
          <TouchableOpacity>
            <Text style = {{
              fontFamily:'outfit-Medium',
              fontSize:15,
              color:'white',
              marginTop:5,
              borderWidth:1,
              textAlign:'center',
              padding:3,
              borderRadius:15,
              backgroundColor:'black',
            }}>View Trip Details</Text>
          </TouchableOpacity>
          {userTrips.map((trip, index)=>(
            <UserTripCard trip = {trip} key = {index}/>
          ))}
        </View>
    </View>
  )
}