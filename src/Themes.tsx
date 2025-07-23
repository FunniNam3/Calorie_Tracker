import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = {
  backgroundColor: string;
  h1Color: string;
  h2Color: string;
  Progress1: string;
  Progress2: string;
  Footer: string;
  Select1: string;
  Select2: string;
};

export const themes = {
  light: {
    backgroundColor: 'white',
    h1Color: 'grey',
    h2Color: 'grey',
    Progress1: 'cyan',
    Progress2: 'blue',
    Footer: 'blue',
    Select1: 'black',
    Select2: 'grey',
  },
  dark: {
    backgroundColor: 'black',
    h1Color: 'white',
    h2Color: 'white',
    Progress1: 'cyan',
    Progress2: 'blue',
    Footer: 'blue',
    Select1: 'black',
    Select2: 'grey',
  },
  pink: {
    backgroundColor: '#FFE9EF',
    h1Color: '#FF9CB5',
    h2Color: '#FFBCCD',
    Progress1: '#FF9CB5',
    Progress2: '#FC809F',
    Footer: '#FF809F',
    Select1: '#FFE9EF',
    Select2: 'grey',
  },
};

type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used in ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(themes.pink);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const value = await AsyncStorage.getItem('selectedTheme');
        if (value === 'Pink') {
          setTheme(themes.pink);
        } else if (value === 'Light') {
          setTheme(themes.light);
        } else if (value === 'Dark') {
          setTheme(themes.dark);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadSettings();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
