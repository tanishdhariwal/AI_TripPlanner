import { View, Text } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'

export default function OptionCard({option, SelectedTraveler}) {
  return (
    <View style = {[{
        padding:5,
        marginTop:20,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        justifyContent: 'space-between',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'black',
        },SelectedTraveler?.id==option?.id&&{borderWidth:3}]}>
        <View style = {{
          marginTop: 20,
        }}>
            <Text style = {{
              fontSize: 20,
              fontFamily: 'outfit-Regular',
              textAlign: 'justify',
            }}>{option?.title}</Text>
            <Text style = {{
              fontSize: 15,
              fontFamily: 'outfit-Regular',
              textAlign: 'justify',
              color: 'grey',
            }}>{option?.desc}</Text>
            <Text style = {{
              fontSize: 15,
              fontFamily: 'outfit-Regular',
              textAlign: 'justify',
              color: 'grey',
            }}>{option?.people}</Text>
        </View>
    </View>
  )
}