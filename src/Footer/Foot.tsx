import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Themes';

export const Footer = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return <View style={{ backgroundColor: theme.Footer, height: 100 }}></View>;
};
