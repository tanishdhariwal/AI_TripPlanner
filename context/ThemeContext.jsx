import React, { createContext, useContext, useState } from 'react';
import { Colors } from '../constants/Colors';

// Create the theme context
export const ThemeContext = createContext({
  isDark: true,
  colors: Colors,
  setIsDark: () => {},
});

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  
  // We're focusing on dark theme for the revamp, but keeping the option
  // to switch to light theme in the future
  const theme = {
    isDark,
    colors: Colors,
    setIsDark,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
