import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import { createTripContext } from '../../context/createTripContext'
import moment from 'moment';
export default function SelectDate() {
    const navigation = useNavigation();
    const router = useRouter();
    const [StartDate, setStartDate] = useState();
    const [EndDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(createTripContext);

    const onDateChange = (date, type)=>{
        console.log(date, type);
        if(type=='START_DATE') setStartDate(moment(date));
        
        else setEndDate(moment(date));

    }
    const onDateSelectionContinue = () => {
        if (!StartDate && !EndDate) {
            ToastAndroid.show('Please select the dates', ToastAndroid.LONG);
            return;
        }
        const totaldays = EndDate.diff(StartDate, 'days');
        console.log(totaldays+1);
        setTripData({
            ...tripData,
            startDate: StartDate.format('YYYY-MM-DD'),
            endDate: EndDate.format('YYYY-MM-DD'),
            TotalDays: totaldays+1,
        });
        router.push('/Create_trip/SelectBudget');

    }
  return (
    <View style = {{
        padding:25,
        paddingTop:75,
        backgroundColor:'white',
        height:'100%'
    }}>
      <Text style = {{
        fontFamily:'outfit-Regular',
        fontSize:30,
        textAlign:'center',
      }}>Travel Dates</Text>
      <View style = {{
        marginTop:20,
      }}>
      <CalendarPicker onDateChange={onDateChange}
      allowRangeSelection = {true}
      minDate={new Date()} 
      maxRangeDuration={5}
      selectedRangeStyle={{
        backgroundColor:'#000000',
      }}
      selectedDayTextStyle={{
        color:'#FFFFFF'
      }}/>
      </View>
      <TouchableOpacity onPress={onDateSelectionContinue}>
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