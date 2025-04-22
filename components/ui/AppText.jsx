import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function AppText({
  children,
  style,
  variant = 'body',
  color = 'default',
  align = 'left',
  numberOfLines,
}) {
  const getColorStyle = () => {
    switch (color) {
      case 'default':
        return { color: Colors.TEXT_PRIMARY };
      case 'secondary':
        return { color: Colors.TEXT_SECONDARY };
      case 'tertiary':
        return { color: Colors.TEXT_TERTIARY };
      case 'primary':
        return { color: Colors.PRIMARY };
      case 'accent':
        return { color: Colors.ACCENT_1 };
      case 'error':
        return { color: Colors.ERROR };
      case 'success':
        return { color: Colors.SUCCESS };
      case 'warning':
        return { color: Colors.WARNING };
      default:
        return { color: color }; // Direct color value
    }
  };

  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        getColorStyle(),
        { textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'outfit-Regular',
    color: Colors.TEXT_PRIMARY,
  },
  h1: {
    fontFamily: 'outfit-Bold',
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 16,
  },
  h2: {
    fontFamily: 'outfit-Bold',
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 14,
  },
  h3: {
    fontFamily: 'outfit-Bold',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
  },
  h4: {
    fontFamily: 'outfit-Bold',
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 10,
  },
  h5: {
    fontFamily: 'outfit-Medium',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  subtitle1: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle2: {
    fontFamily: 'outfit-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: 'outfit-Medium',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  overline: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
