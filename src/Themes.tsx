import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = {
  name: string;
  backgroundColor: string;
  h1Color: string;
  h2Color: string;
  Progress1: string;
  Progress2: string;
  Footer: string;
  Select1: string;
  Select2: string;
};

//  backgroundColor: Neutral100,
//  h1Color: Neutral700,
//  h2Color: Neutral400,
//  Progress1: Neutral700,
//  Progress2: Neutral500,
//  Footer: Neutral500,
//  Select1: 'black',
//  Select2: 'grey',

export const themes = [
  {
    name: 'Light',
    backgroundColor: '#F7F8F9',
    h1Color: '#626F86',
    h2Color: '#B3B9C4',
    Progress1: '#626F86',
    Progress2: '#8590A2',
    Footer: '#8590A2',
    Select1: 'black',
    Select2: 'grey',
  },
  {
    name: 'Dark',
    backgroundColor: '#1D2125',
    h1Color: '#8C9BAB',
    h2Color: '#454F59',
    Progress1: '#8C9BAB',
    Progress2: '#596773',
    Footer: '#596773',
    Select1: 'black',
    Select2: 'grey',
  },
  {
    name: 'Pink',
    backgroundColor: '#FFE9EF',
    h1Color: '#FF9CB5',
    h2Color: '#FFBCCD',
    Progress1: '#FF9CB5',
    Progress2: '#FC809F',
    Footer: '#FF809F',
    Select1: '#FFE9EF',
    Select2: 'grey',
  },
];

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
  const [theme, setTheme] = useState<Theme>(themes[2]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const value = await AsyncStorage.getItem('selectedTheme');
        if (value === 'Pink') {
          setTheme(themes[2]);
        } else if (value === 'Light') {
          setTheme(themes[0]);
        } else if (value === 'Dark') {
          setTheme(themes[1]);
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
