import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function AppCard({
  children,
  onPress,
  style = {},
  elevation = 1,
  variant = 'default',
  noPadding = false,
}) {
  const cardStyle = [
    styles.card,
    !noPadding && styles.cardPadding,
    styles[`elevation${elevation}`],
    styles[variant],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_CARD,
    overflow: 'hidden',
    marginVertical: 8,
  },
  cardPadding: {
    padding: 16,
  },
  elevation1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  elevation2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  elevation3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  default: {
    backgroundColor: Colors.BACKGROUND_CARD,
  },
  elevated: {
    backgroundColor: Colors.BACKGROUND_ELEVATED,
  },
  primary: {
    backgroundColor: Colors.PRIMARY_DARK,
  },
  transparent: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  success: {
    backgroundColor: Colors.SUCCESS,
  },
  warning: {
    backgroundColor: Colors.WARNING,
  },
  error: {
    backgroundColor: Colors.ERROR,
  },
});
