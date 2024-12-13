import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { createTripContext } from '../../context/createTripContext';
import { AIPrompt } from './../../constants/options';
import { chatSession } from '../../configs/AIModel';
import { auth, db } from './../../configs/Firebase_Config';
import { doc, setDoc } from 'firebase/firestore';

export default function GenerateTrip() {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(createTripContext);
    const [Loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        tripData && GenAITrip();
    }, [tripData]);

    const GenAITrip = async () => {
        setLoading(true);
        try {
            const Final_Prompt = AIPrompt
                .replace('{location}', tripData?.locationInfo?.name)
                .replace('{TotalDay}', tripData?.TotalDays)
                .replace('{TotalNight}', tripData?.TotalDays - 1)
                .replace('{Traveler}', tripData.traveler?.title)
                .replace('{budget}', tripData.Budget)
                .replace('{TotalDay}', tripData?.TotalDays)
                .replace('{TotalNight}', tripData?.TotalDays - 1);

            console.log("Final Prompt: ", Final_Prompt);
            const result = await chatSession.sendMessage(Final_Prompt);
            console.log("AI Response: ", result.response.text());
            const tripResponse = JSON.parse(result.response.text());
            console.log("Parsed Trip Response: ", tripResponse);

            const docID = (Date.now()).toString();
            await setDoc(doc(db, "UserTrips", docID), {
                userEmail: user.email,
                tripData: tripResponse,
            });
            console.log("Document successfully written!");

            router.push('(tabs)/myTrip');
        } catch (error) {
            console.error("Error in GenAITrip: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={{
            padding: 20,
            paddingTop: 75,
            backgroundColor: 'white',
            height: '100%'
        }}>
            <Text style={{
                textAlign: 'center',
                fontFamily: 'outfit-Medium',
                fontSize: 30,
            }}>Please Wait!</Text>
            <Text style={{
                textAlign: 'center',
                fontFamily: 'outfit-Regular',
                fontSize: 29,
                marginTop: 20
            }}>Generating your trip......</Text>
            <Image source={require('./../../assets/images/planee.gif')}
                style={{
                    marginTop: 50,
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                }}
                resizeMode="contain" />
        </View>
    );
}