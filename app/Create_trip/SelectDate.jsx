import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import { createTripContext } from '../../context/createTripContext'
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SelectDate() {
    const navigation = useNavigation();
    const router = useRouter();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(createTripContext);

    useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: Colors.TEXT_PRIMARY,
      });
    }, []);

    const onDateChange = (date, type) => {
        if(type === 'START_DATE') {
          setStartDate(moment(date));
        } else {
          setEndDate(moment(date));
        }
    }
    
    const onDateSelectionContinue = () => {
        if (!startDate || !endDate) {
            ToastAndroid.show('Please select start and end dates', ToastAndroid.LONG);
            return;
        }
        
        const totalDays = endDate.diff(startDate, 'days');
        if (totalDays < 0) {
            ToastAndroid.show('End date must be after start date', ToastAndroid.LONG);
            return;
        }
        
        setTripData({
            ...tripData,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            TotalDays: totalDays + 1,
        });
        router.push('/Create_trip/SelectBudget');
    }
    
    return (
        <View style={styles.container}>
            <LinearGradient
              colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
              style={styles.gradient}
            />
            
            <AppText variant="h3" align="center" style={styles.title}>
                Select Travel Dates
            </AppText>
            
            <AppText variant="body" color="secondary" align="center" style={styles.subtitle}>
                Choose your trip duration (maximum 5 days)
            </AppText>
            
            <View style={styles.calendarContainer}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={5}
                    selectedRangeStyle={{
                        backgroundColor: Colors.PRIMARY,
                    }}
                    selectedDayStyle={{
                        backgroundColor: Colors.PRIMARY,
                    }}
                    selectedDayTextColor={Colors.WHITE}
                    todayBackgroundColor="transparent"
                    todayTextStyle={{
                        color: Colors.PRIMARY_LIGHT
                    }}
                    textStyle={{
                        color: Colors.TEXT_PRIMARY,
                        fontFamily: 'outfit-Regular'
                    }}
                    monthTitleStyle={{
                        color: Colors.TEXT_PRIMARY,
                        fontFamily: 'outfit-Medium',
                        fontSize: 16
                    }}
                    yearTitleStyle={{
                        color: Colors.TEXT_PRIMARY,
                        fontFamily: 'outfit-Medium',
                        fontSize: 16
                    }}
                    dayLabelsWrapper={{
                        borderTopWidth: 0,
                        borderBottomWidth: 0
                    }}
                    previousComponent={
                        <Ionicons name="chevron-back" size={24} color={Colors.TEXT_SECONDARY} />
                    }
                    nextComponent={
                        <Ionicons name="chevron-forward" size={24} color={Colors.TEXT_SECONDARY} />
                    }
                />
            </View>
            
            {(startDate && endDate) && (
                <View style={styles.dateInfoContainer}>
                    <View style={styles.dateInfo}>
                        <View style={styles.dateBlock}>
                            <AppText variant="caption" color="secondary">START DATE</AppText>
                            <AppText variant="subtitle1">{startDate.format('DD MMM YYYY')}</AppText>
                        </View>
                        
                        <Ionicons name="arrow-forward" size={20} color={Colors.TEXT_SECONDARY} />
                        
                        <View style={styles.dateBlock}>
                            <AppText variant="caption" color="secondary">END DATE</AppText>
                            <AppText variant="subtitle1">{endDate.format('DD MMM YYYY')}</AppText>
                        </View>
                    </View>
                    
                    <View style={styles.durationBadge}>
                        <Ionicons name="time-outline" size={16} color={Colors.PRIMARY} />
                        <AppText variant="caption" color="primary">
                            {endDate.diff(startDate, 'days') + 1} days
                        </AppText>
                    </View>
                </View>
            )}
            
            <View style={styles.footer}>
                <AppButton
                    title="Continue"
                    onPress={onDateSelectionContinue}
                    variant="primary"
                    disabled={!startDate || !endDate}
                    fullWidth
                    icon={<Ionicons name="arrow-forward" size={18} color={Colors.WHITE} style={{marginLeft: 8}} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100,
        backgroundColor: Colors.BACKGROUND_DARK,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 250,
    },
    title: {
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 20,
    },
    calendarContainer: {
        backgroundColor: Colors.BACKGROUND_CARD,
        borderRadius: 16,
        padding: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    dateInfoContainer: {
        backgroundColor: Colors.BACKGROUND_ELEVATED,
        borderRadius: 16,
        padding: 15,
        marginTop: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    dateInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateBlock: {
        flex: 1,
    },
    durationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(108, 99, 255, 0.1)',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginTop: 15,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 20,
    },
});