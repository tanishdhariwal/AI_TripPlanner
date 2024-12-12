import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { SelectBudgetOptions } from '../../constants/options';
import OptionCard  from './../../components/createTrips/OptionCard';
import { createTripContext } from '../../context/createTripContext';


export default function SelectBudget() {
    const { tripData, setTripData } = useContext(createTripContext);
    const navigation = useNavigation();
    const router = useRouter();
    const [SelectedOption, setSelectedOption] = useState();
    const onClickContinue = () => {
      if(!SelectedOption){
        ToastAndroid.show("Please select a budget", ToastAndroid.LONG);
        return;
      }
      router.push('/Create_trip/ReviewTrip');
    }

     useEffect(() => {
        SelectedOption&&setTripData({...tripData,
          Budget : SelectedOption?.title
        })
    },[SelectedOption]);
  return (
    <View style  = {{
        padding: 20,
        paddingTop: 75,
        backgroundColor: 'white',
        height: '100%'
    }}>
      <Text style = {{
              fontFamily:'outfit-Regular',
              fontSize:30,
              textAlign:'center',
            }}>Budget</Text>
        <View>
            <FlatList
                data={SelectBudgetOptions}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={()=>setSelectedOption(item)}>
                        <OptionCard option={item} SelectedOption={SelectedOption} />
                    </TouchableOpacity>
                )}
            />
        </View>
        <TouchableOpacity onPress={()=>onClickContinue()}>
                <Text style = {{
                  backgroundColor:'#000000',
                  color:'white',
                  padding:10,
                  borderRadius:15,
                  textAlign:'center',
                  marginTop:20,
                  fontFamily:'outfit-Regular',
                  fontSize:20,
                }}>Continue</Text>
              </TouchableOpacity>
    </View>
  )
}