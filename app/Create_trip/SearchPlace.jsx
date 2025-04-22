import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { createTripContext } from '../../context/createTripContext';
import 'react-native-get-random-values';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchPlace() {
    const navigation = useNavigation();
    const router = useRouter();
    const { tripData, setTripData } = useContext(createTripContext);
    const [recentSearches] = useState([
        "Paris, France",
        "Tokyo, Japan",
        "New York, USA",
        "Rome, Italy"
    ]);
    
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.TEXT_PRIMARY,
        })
    }, []);

    const handlePlaceSelect = (data, details = null) => {
        setTripData({
            locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: details?.photos?.[0]?.photo_reference,
                url: details?.url,
            }
        });
        router.push('/Create_trip/SelectTraveler');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
                style={styles.gradient}
            />
            
            <View style={styles.header}>
                <AppText variant="h3">Where to?</AppText>
                <AppText variant="body" color="secondary" style={styles.subtitle}>
                    Search for a city, region or country
                </AppText>
            </View>
            
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    placeholder='Search destinations'
                    fetchDetails={true}
                    onPress={handlePlaceSelect}
                    query={{
                        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                        language: 'en',
                        types: '(cities)',
                    }}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInputContainer: {
                            backgroundColor: Colors.BACKGROUND_ELEVATED,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            paddingHorizontal: 10,
                        },
                        textInput: {
                            color: Colors.TEXT_PRIMARY,
                            backgroundColor: 'transparent',
                            fontSize: 16,
                            height: 55,
                            fontFamily: 'outfit-Regular',
                        },
                        predefinedPlacesDescription: {
                            color: Colors.TEXT_PRIMARY,
                        },
                        listView: {
                            backgroundColor: Colors.BACKGROUND_ELEVATED,
                            marginTop: 10,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        row: {
                            backgroundColor: 'transparent',
                            paddingVertical: 15,
                            paddingHorizontal: 15,
                        },
                        separator: {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            height: 1,
                        },
                        description: {
                            color: Colors.TEXT_PRIMARY,
                            fontSize: 15,
                            fontFamily: 'outfit-Regular',
                        },
                        poweredContainer: {
                            display: 'none'
                        },
                    }}
                    renderLeftButton={() => (
                        <View style={styles.searchIcon}>
                            <Ionicons name="search" size={20} color={Colors.TEXT_SECONDARY} />
                        </View>
                    )}
                />
            </View>
            
            <View style={styles.recentsContainer}>
                <AppText variant="subtitle2" color="secondary" style={styles.recentTitle}>
                    POPULAR DESTINATIONS
                </AppText>
                
                {recentSearches.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.recentItem}
                        onPress={() => {
                            setTripData({
                                locationInfo: {
                                    name: item,
                                }
                            });
                            router.push('/Create_trip/SelectTraveler');
                        }}
                    >
                        <Ionicons name="location" size={20} color={Colors.PRIMARY} />
                        <AppText variant="body" style={styles.recentText}>{item}</AppText>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
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
    header: {
        marginBottom: 20,
    },
    subtitle: {
        marginTop: 8,
    },
    searchContainer: {
        marginBottom: 30,
    },
    searchIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    recentsContainer: {
        backgroundColor: Colors.BACKGROUND_CARD,
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    recentTitle: {
        marginBottom: 15,
        letterSpacing: 1,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    recentText: {
        marginLeft: 12,
    },
});