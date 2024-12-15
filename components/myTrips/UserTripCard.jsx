import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
export default function UserTripCard({trip}) {
    const formatData = (data) => {
        return JSON.parse(data);
    }
  return (
    <View style = {{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
    }}>
      <Image style = {{
        width:100,
        height:100,
        objectFit:'cover',
        borderRadius:10,
        alignItems:'center',
      }}source={require('./../../assets/images/adaptive-icon.png')}/>
      <View>
         <Text style = {{
                    fontFamily:'outfit-Medium',
                    fontSize:18,
                    color:'black',
                  }}>{trip?.tripPlan?.location}</Text>
         <Text style = {{
             fontFamily:'outfit-Regular',
             fontSize:15,
             color:'grey',
            }}>{moment(trip?.startDate).format('DD MMM yyyy')}</Text>
            <Text style = {{
                        fontFamily:'outfit-Regular',
                        fontSize:15,
                        color:'grey',
                      }}>{trip?.tripPlan?.travelers}</Text>
            </View>
      </View>
  )
}