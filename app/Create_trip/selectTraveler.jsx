import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import { SelectTravelersList } from '../../constants/options'
import { createTripContext } from '../../context/createTripContext'
import { Colors } from '../../constants/Colors'
import AppText from '../../components/ui/AppText'
import AppButton from '../../components/ui/AppButton'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import AppCard from '../../components/ui/AppCard'

export default function SelectTraveler() {
  const navigation = useNavigation();
  const router = useRouter();
  const { destination } = useLocalSearchParams();
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(createTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: Colors.TEXT_PRIMARY,
    });
  }, []);

  useEffect(() => {
    // If we received a destination from the params, set it in tripData
    if (destination) {
      setTripData({
        ...tripData,
        locationInfo: {
          ...tripData.locationInfo,
          name: destination
        }
      });
    }
  }, [destination]);

  useEffect(() => {
    setTripData({
      ...tripData,
      traveler: selectedTraveler,
    });
  }, [selectedTraveler]);

  const renderTravelerOption = ({ item }) => (
    <TouchableOpacity 
      onPress={() => setSelectedTraveler(item)}
      activeOpacity={0.7}
    >
      <AppCard 
        style={[
          styles.optionCard, 
          selectedTraveler?.id === item.id && styles.selectedCard
        ]}
      >
        <View style={styles.optionContent}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={selectedTraveler?.id === item.id ? Colors.GRADIENT_PRIMARY : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.iconBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={
                  item.id === 1 ? "person" :
                  item.id === 2 ? "people" :
                  item.id === 3 ? "home" :
                  "people-circle"
                }
                size={24}
                color={Colors.TEXT_PRIMARY}
              />
            </LinearGradient>
          </View>
          
          <View style={styles.textContainer}>
            <AppText variant="subtitle1">{item.title}</AppText>
            <AppText variant="body2" color="secondary" style={styles.description}>
              {item.desc}
            </AppText>
            <AppText variant="caption" color="tertiary" style={styles.people}>
              {item.people}
            </AppText>
          </View>
          
          <View style={styles.selectionIndicator}>
            {selectedTraveler?.id === item.id ? (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark" size={16} color={Colors.WHITE} />
              </View>
            ) : (
              <View style={styles.unselectedIndicator} />
            )}
          </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
        style={styles.gradient}
      />
      
      <AppText variant="h3" align="center" style={styles.title}>
        Who is Travelling?
      </AppText>
      
      <AppText variant="body" color="secondary" align="center" style={styles.subtitle}>
        Select who will be joining you on this adventure
      </AppText>
      
      {destination && (
        <AppCard style={styles.destinationCard}>
          <AppText variant="caption" color="secondary">DESTINATION</AppText>
          <AppText variant="subtitle1" style={styles.destinationName}>
            {destination}
          </AppText>
          <View style={styles.destinationBadge}>
            <Ionicons name="location" size={12} color={Colors.PRIMARY} />
            <AppText variant="caption" color="primary" style={styles.destinationBadgeText}>
              Selected from Discover
            </AppText>
          </View>
        </AppCard>
      )}
      
      <FlatList
        data={SelectTravelersList}
        renderItem={renderTravelerOption}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.footer}>
        <AppButton
          title="Continue"
          onPress={() => router.push('/Create_trip/SelectDate')}
          variant="primary"
          fullWidth
          disabled={!selectedTraveler}
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
    marginBottom: 20,
  },
  destinationCard: {
    marginBottom: 20,
    padding: 15,
  },
  destinationName: {
    marginTop: 5,
  },
  destinationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  destinationBadgeText: {
    marginLeft: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  optionCard: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedCard: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    backgroundColor: Colors.BACKGROUND_ELEVATED,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: 4,
    marginBottom: 4,
  },
  people: {
    marginTop: 2,
  },
  selectionIndicator: {
    marginLeft: 10,
  },
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
  footer: {
    marginTop: 10,
    marginBottom: 20,
  },
});