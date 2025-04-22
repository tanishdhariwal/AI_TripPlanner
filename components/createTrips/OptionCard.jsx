import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import AppText from '../ui/AppText'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function OptionCard({ option, SelectedOption }) {
  const isSelected = SelectedOption?.id === option?.id;
  
  return (
    <View style={[
      styles.container,
      isSelected && styles.selected
    ]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <AppText variant="subtitle1">{option?.title}</AppText>
          <AppText variant="body2" color="secondary" style={styles.description}>
            {option?.desc}
          </AppText>
          {option?.people && (
            <AppText variant="caption" color="tertiary" style={styles.people}>
              {option?.people}
            </AppText>
          )}
        </View>
        
        <View style={styles.selectionIndicator}>
          {isSelected ? (
            <View style={styles.selectedCircle}>
              <Ionicons name="checkmark" size={16} color={Colors.WHITE} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: Colors.BACKGROUND_CARD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selected: {
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    backgroundColor: Colors.BACKGROUND_ELEVATED,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  description: {
    marginTop: 4,
  },
  people: {
    marginTop: 4,
  },
  selectionIndicator: {
    marginLeft: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.TEXT_TERTIARY,
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});