/**
 * Modern dark theme color system for AI TripPlanner
 */

export const Colors = {
  // Base colors
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  
  // Primary palette
  PRIMARY: "#6C63FF", // Vibrant purple as primary color
  PRIMARY_DARK: "#5A52D9",
  PRIMARY_LIGHT: "#8E87FF",
  
  // Background shades
  BACKGROUND_DARK: "#121212", // Main background
  BACKGROUND_CARD: "#1E1E1E", // Card background
  BACKGROUND_ELEVATED: "#252525", // Elevated surfaces
  
  // Accent colors
  ACCENT_1: "#00D9F5", // Cyan accent
  ACCENT_2: "#FF7B92", // Pink accent
  ACCENT_3: "#58C896", // Green accent
  
  // Text colors
  TEXT_PRIMARY: "#FFFFFF",
  TEXT_SECONDARY: "#B0B0B0", 
  TEXT_TERTIARY: "#717171",
  TEXT_INVERSE: "#121212",
  
  // Utility colors
  SUCCESS: "#4CAF50",
  WARNING: "#FFC107",
  ERROR: "#FF5252",
  INFO: "#2196F3",
  
  // Gradient colors
  GRADIENT_PRIMARY: ["#6C63FF", "#BF5AF2"],
  GRADIENT_SECONDARY: ["#00D9F5", "#6C63FF"],
  GRADIENT_ACCENT: ["#FF7B92", "#FF5252"],
  
  // Legacy support
  CREAM: "#1E1E1E", // Replacing with dark equivalent
  GRAY: "#717171",
  RED: "#FF5252",
  GREEN: "#4CAF50",
  BLUE: "#2196F3",
  YELLOW: "#FFC107",
  ORANGE: "#FF9800",
  PURPLE: "#9C27B0",
  PINK: "#FF7B92",
  BROWN: "#A52A2A",
  
  // Theme colors (for backward compatibility)
  light: {
    text: '#11181C',
    background: '#fff',
    tint: "#6C63FF",
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: "#6C63FF",
  },
  dark: {
    text: '#fff',
    background: '#121212',
    tint: "#6C63FF",
    icon: '#fff',
    tabIconDefault: '#B0B0B0',
    tabIconSelected: "#6C63FF",
  },
};
