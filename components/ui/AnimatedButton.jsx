import React from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import AppText from './AppText';

export default function AnimatedButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
}) {
  // Animation setup
  const animatedValue = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  // Styles based on props
  const buttonVariantStyle = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
  }[variant];
  
  const buttonSizeStyle = {
    small: styles.smallButton,
    medium: styles.mediumButton,
    large: styles.largeButton,
  }[size];
  
  const textVariantStyle = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
  }[variant];
  
  const textSizeStyle = {
    small: styles.smallText,
    medium: styles.mediumText,
    large: styles.largeText,
  }[size];
  
  const containerStyle = [
    styles.container,
    buttonVariantStyle,
    buttonSizeStyle,
    disabled && styles.disabledButton,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyle = [
    styles.text,
    textVariantStyle,
    textSizeStyle,
    disabled && styles.disabledText,
  ];

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.content}>
          {icon && icon.position === 'left' && <View style={styles.iconLeft}>{icon.component}</View>}
          <AppText style={textStyle}>{title}</AppText>
          {icon && icon.position === 'right' && <View style={styles.iconRight}>{icon.component}</View>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.PRIMARY,
  },
  secondaryButton: {
    backgroundColor: Colors.BACKGROUND_ELEVATED,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.TEXT_TERTIARY,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    backgroundColor: Colors.BACKGROUND_CARD,
    borderColor: 'transparent',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontFamily: 'outfit-Medium',
  },
  primaryText: {
    color: Colors.WHITE,
  },
  secondaryText: {
    color: Colors.TEXT_PRIMARY,
  },
  outlineText: {
    color: Colors.TEXT_PRIMARY,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: Colors.TEXT_TERTIARY,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
