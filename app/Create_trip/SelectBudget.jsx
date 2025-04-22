import { View, StyleSheet, TouchableOpacity, ToastAndroid, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/options';
import { createTripContext } from '../../context/createTripContext';
import { Colors } from '../../constants/Colors';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AppCard from '../../components/ui/AppCard';

export default function SelectBudget() {
    const { tripData, setTripData } = useContext(createTripContext);
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: Colors.TEXT_PRIMARY,
      });
    }, []);

    useEffect(() => {
        if (selectedOption) {
            setTripData({
                ...tripData,
                Budget: selectedOption?.title
            });
        }
    }, [selectedOption]);

    const onClickContinue = () => {
        if (!selectedOption) {
            ToastAndroid.show("Please select a budget option", ToastAndroid.LONG);
            return;
        }
        router.push('/Create_trip/ReviewTrip');
    }

    const renderBudgetOption = ({ item }) => {
        const isSelected = selectedOption?.id === item.id;
        let iconName;
        
        switch(item.id) {
            case 1: 
                iconName = "wallet-outline";
                break;
            case 2:
                iconName = "cash-outline";
                break;
            case 3:
                iconName = "diamond-outline";
                break;
            default:
                iconName = "cash-outline";
        }
        
        return (
            <TouchableOpacity 
                onPress={() => setSelectedOption(item)}
                activeOpacity={0.7}
                style={styles.optionWrapper}
            >
                <AppCard 
                    style={[
                        styles.optionCard, 
                        isSelected && styles.selectedCard
                    ]}
                >
                    <View style={styles.optionHeader}>
                        <LinearGradient
                            colors={isSelected ? Colors.GRADIENT_PRIMARY : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                            style={styles.iconBackground}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name={iconName} size={24} color={Colors.TEXT_PRIMARY} />
                        </LinearGradient>
                        
                        <View style={styles.rightSide}>
                            {isSelected ? (
                                <View style={styles.selectedIndicator}>
                                    <Ionicons name="checkmark" size={16} color={Colors.WHITE} />
                                </View>
                            ) : (
                                <View style={styles.unselectedIndicator} />
                            )}
                        </View>
                    </View>
                    
                    <AppText variant="subtitle1" style={styles.optionTitle}>{item.title}</AppText>
                    <AppText variant="body2" color="secondary" style={styles.optionDesc}>
                        {item.desc}
                    </AppText>
                </AppCard>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
                style={styles.gradient}
            />
            
            <AppText variant="h3" align="center" style={styles.title}>
                Select Your Budget
            </AppText>
            
            <AppText variant="body" color="secondary" align="center" style={styles.subtitle}>
                Choose a budget option that suits your travel plans
            </AppText>
            
            <FlatList
                data={SelectBudgetOptions}
                renderItem={renderBudgetOption}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            
            <View style={styles.footer}>
                <AppButton
                    title="Continue"
                    onPress={onClickContinue}
                    variant="primary"
                    fullWidth
                    disabled={!selectedOption}
                    icon={<Ionicons name="arrow-forward" size={18} color={Colors.WHITE} style={{marginLeft: 8}} />}
                />
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
    title: {
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
    },
    listContainer: {
        paddingBottom: 20,
    },
    optionWrapper: {
        marginBottom: 20,
    },
    optionCard: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        padding: 20,
    },
    selectedCard: {
        borderColor: Colors.PRIMARY,
        borderWidth: 2,
        backgroundColor: Colors.BACKGROUND_ELEVATED,
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconBackground: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightSide: {},
    selectedIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unselectedIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.TEXT_TERTIARY,
    },
    optionTitle: {
        marginBottom: 5,
    },
    optionDesc: {
        lineHeight: 20,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 20,
    },
});