import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import AppText from './AppText';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  style = {},
}) {
  // Get the correct style based on variant and size
  const getButtonStyle = () => {
    const variantStyles = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton,
      outline: styles.outlineButton,
    };

    const sizeStyles = {
      small: styles.smallButton,
      medium: styles.mediumButton,
      large: styles.largeButton,
    };

    return [
      styles.button,
      variantStyles[variant] || variantStyles.primary,
      sizeStyles[size] || sizeStyles.medium,
      fullWidth && styles.fullWidth,
      disabled && styles.disabledButton,
      style,
    ];
  };

  // Get the correct text style based on variant
  const getTextStyle = () => {
    const textStyles = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      outline: styles.outlineText,
    };

    const textSizeStyles = {
      small: styles.smallText,
      medium: styles.mediumText,
      large: styles.largeText,
    };

    return [
      styles.text,
      textStyles[variant] || textStyles.primary,
      textSizeStyles[size] || textSizeStyles.medium,
      disabled && styles.disabledText,
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Colors.PRIMARY : Colors.WHITE} 
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <React.Fragment>
          {/* Fix: Make sure icon is rendered correctly */}
          <AppText style={getTextStyle()}>
            {/* Place icon before or after text based on position */}
            {icon && typeof icon !== 'string' && React.isValidElement(icon) && 
             icon.props.style && icon.props.style.marginRight && icon}
            {title}
            {icon && typeof icon !== 'string' && React.isValidElement(icon) && 
             icon.props.style && icon.props.style.marginLeft && icon}
          </AppText>
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  // Primary Button
  primaryButton: {
    backgroundColor: Colors.PRIMARY,
  },
  // Secondary Button
  secondaryButton: {
    backgroundColor: Colors.ACCENT_1,
  },
  // Outline Button
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.TEXT_SECONDARY,
  },
  // Small Button
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  // Medium Button
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  // Large Button
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  // Disabled Button
  disabledButton: {
    opacity: 0.5,
  },
  // Text Styles
  text: {
    textAlign: 'center',
    fontFamily: 'outfit-Medium',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: Colors.WHITE,
  },
  secondaryText: {
    color: Colors.WHITE,
  },
  outlineText: {
    color: Colors.TEXT_PRIMARY,
  },
  disabledText: {
    opacity: 0.7,
  },
  // Text Size Styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
