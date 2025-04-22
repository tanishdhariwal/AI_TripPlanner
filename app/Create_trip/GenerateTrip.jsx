import { View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { createTripContext } from '../../context/createTripContext';
import { AIPrompt } from './../../constants/options';
import { chatSession } from '../../configs/AIModel';
import { auth, db } from './../../configs/Firebase_Config';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import { LinearGradient } from 'expo-linear-gradient';
import AppCard from '../../components/ui/AppCard';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GenerateTrip() {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const { tripData } = useContext(createTripContext);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('Initializing AI...');
    const router = useRouter();
    const hasStartedGeneration = useRef(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        // Only generate trip if we have data and haven't started generation yet
        if (tripData && !hasStartedGeneration.current) {
            hasStartedGeneration.current = true;
            checkForExistingTrip();
        }
    }, []);

    // Progress simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(current => {
                const newProgress = current + 2;
                
                if (newProgress <= 25) {
                    setStatusMessage('Gathering travel data...');
                } else if (newProgress <= 50) {
                    setStatusMessage('Calculating optimal itinerary...');
                } else if (newProgress <= 75) {
                    setStatusMessage('Finding best accommodations...');
                } else if (newProgress < 95) {
                    setStatusMessage('Finalizing your travel plan...');
                }
                
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 500);
        
        return () => clearInterval(interval);
    }, []);

    const checkForExistingTrip = async () => {
        if (!user || !tripData?.locationInfo?.name) {
            return GenAITrip();
        }
        
        try {
            // Check if a trip with the same location name already exists
            const q = query(
                collection(db, "UserTrips"), 
                where("userEmail", "==", user.email)
            );
            
            const querySnapshot = await getDocs(q);
            let tripExists = false;
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.tripData) {
                    try {
                        const parsedData = JSON.parse(data.tripData);
                        if (parsedData?.locationInfo?.name === tripData?.locationInfo?.name) {
                            tripExists = true;
                        }
                    } catch (e) {
                        console.error("Error parsing trip data:", e);
                    }
                }
            });
            
            if (tripExists) {
                console.log("Trip for this location already exists");
                setStatusMessage('Trip already exists for this location');
                setTimeout(() => router.push('(tabs)/MyTrip'), 1500);
            } else {
                GenAITrip();
            }
        } catch (error) {
            console.error("Error checking for existing trip:", error);
            GenAITrip(); // Proceed with generation if check fails
        }
    };

    const GenAITrip = async () => {
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

            const docID = (Date.now()).toString();
            await setDoc(doc(db, "UserTrips", docID), {
                userEmail: user.email,
                tripPlan: tripResponse,
                tripData: JSON.stringify(tripData),
                docID: docID
            });
            console.log("Document successfully written!");

            router.replace('(tabs)/MyTrip');
        } catch (error) {
            console.error("Error in GenAITrip: ", error);
            setStatusMessage('Error generating trip. Please try again.');
            setTimeout(() => router.push('(tabs)/MyTrip'), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.BACKGROUND_DARK, Colors.BACKGROUND_ELEVATED]}
                style={StyleSheet.absoluteFill}
            />
            
            <View style={styles.content}>
                <AppCard style={styles.card} noPadding>
                    <LinearGradient
                        colors={[Colors.BACKGROUND_CARD, 'rgba(30, 30, 30, 0.8)']}
                        style={styles.cardGradient}
                    >
                        <View style={styles.animationContainer}>
                            <Image 
                                source={require('./../../assets/images/planee.gif')}
                                style={styles.animation}
                                resizeMode="contain" 
                            />
                        </View>
                        
                        <AppText variant="h3" align="center" style={styles.title}>
                            Planning Your Trip
                        </AppText>
                        
                        <AppText variant="body" color="secondary" align="center" style={styles.subtitle}>
                            Our AI is generating a personalized itinerary for {tripData?.locationInfo?.name}
                        </AppText>
                        
                        <View style={styles.statusContainer}>
                            <View style={styles.progressRow}>
                                <View style={styles.progressBarContainer}>
                                    <View 
                                        style={[
                                            styles.progressBar, 
                                            { width: `${progress}%` }
                                        ]} 
                                    />
                                </View>
                                <AppText variant="caption">{progress}%</AppText>
                            </View>
                            
                            <View style={styles.statusMessageContainer}>
                                <ActivityIndicator 
                                    size="small" 
                                    color={Colors.PRIMARY}
                                    style={styles.loadingIndicator} 
                                />
                                <AppText variant="caption" color="secondary">
                                    {statusMessage}
                                </AppText>
                            </View>
                        </View>
                        
                        <View style={styles.featuresContainer}>
                            <View style={styles.featureItem}>
                                <Ionicons name="bed-outline" size={20} color={Colors.ACCENT_1} />
                                <AppText variant="caption" color="secondary" style={styles.featureText}>
                                    Top Hotels
                                </AppText>
                            </View>
                            
                            <View style={styles.featureItem}>
                                <Ionicons name="map-outline" size={20} color={Colors.ACCENT_2} />
                                <AppText variant="caption" color="secondary" style={styles.featureText}>
                                    Daily Itinerary
                                </AppText>
                            </View>
                            
                            <View style={styles.featureItem}>
                                <Ionicons name="airplane-outline" size={20} color={Colors.ACCENT_3} />
                                <AppText variant="caption" color="secondary" style={styles.featureText}>
                                    Flight Details
                                </AppText>
                            </View>
                        </View>
                    </LinearGradient>
                </AppCard>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_DARK,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        borderRadius: 20,
    },
    cardGradient: {
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    animationContainer: {
        marginBottom: 20,
    },
    animation: {
        width: 150,
        height: 150,
    },
    title: {
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
        textAlign: 'center',
    },
    statusContainer: {
        width: '100%',
        marginBottom: 25,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    progressBarContainer: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginRight: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 3,
    },
    statusMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingIndicator: {
        marginRight: 10,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 20,
    },
    featureItem: {
        alignItems: 'center',
    },
    featureText: {
        marginTop: 5,
    },
});