import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createTripContext } from './../../context/createTripContext';
import moment from 'moment';
import { useRouter } from 'expo-router';
import GenerateTrip from './GenerateTrip';
export default function ReviewTrip() {

  const {tripData, setTripData} = useContext(createTripContext);
  const router = useRouter();
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
            marginTop:60,
            display:'flex',
            flexDirection:'row',
            //gap:10,
        }}>
        <Ionicons name="location-sharp" size={30} color="black" />
        <View>
          <Text style = {{
            fontFamily:'outfit-Medium',
            fontSize:15,
            color:'grey'
          }}>Destination</Text>
          <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:20,
          }}>{tripData?.locationInfo?.name}</Text>
        </View>
        </View>
        <View style = {{
            marginTop:40,
            display:'flex',
            flexDirection:'row',
            gap:10,
        }}>
        <Ionicons name="calendar-clear-sharp" size={24} color="black" />
        <View>
          <Text style = {{
            fontFamily:'outfit-Medium',
            fontSize:15,
            color:'grey'
          }}>Travel Date</Text>
          <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:20,
          }}>{moment(tripData.startDate).format('DD MMM') + " to " + moment(tripData.endDate).format('DD MMM')}</Text>
          <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:15,
          }}>{"Duration: " + tripData?.TotalDays + " days."}</Text>
        </View>
        </View>
        <View style = {{
            marginTop:40,
            display:'flex',
            flexDirection:'row',
            gap:10,
        }}>
        <Ionicons name="airplane-sharp" size={24} color="black" />
        <View>
          <Text style = {{
            fontFamily:'outfit-Medium',
            fontSize:15,
            color:'grey'
          }}>Who is travelling?</Text>
          <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:20,
          }}>{tripData?.traveler?.title}</Text>
        </View>
        </View>
        <View style = {{
            marginTop:40,
            display:'flex',
            flexDirection:'row',
            gap:10,
        }}>
       <Ionicons name="cash-sharp" size={24} color="black" />
        <View>
          <Text style = {{
            fontFamily:'outfit-Medium',
            fontSize:15,
            color:'grey'
          }}>Budget</Text>
          <Text style = {{
            fontFamily:'outfit-Regular',
            fontSize:20,
          }}>{tripData?.Budget}</Text>
        </View>
        </View>
        <TouchableOpacity onPress = {()=>router.replace('Create_trip/GenerateTrip')}>
                        <Text style = {{
                          backgroundColor:'#000000',
                          color:'white',
                          padding:10,
                          borderRadius:15,
                          textAlign:'center',
                          marginTop:60,
                          fontFamily:'outfit-Regular',
                          fontSize:20,
                        }}>Build My Trip</Text>
                      </TouchableOpacity>
    </View>
  )
}