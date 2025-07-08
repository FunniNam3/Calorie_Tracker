import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../App';
import { useTheme } from '../Themes';
import { getDBConnection, getTodayMealItems } from '../db-functions';
import { AddFeet } from './AddFeet';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

export const AddMeal = () => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
        },
      ]}
    >
      <View
        style={[styles.container, { flex: 1, width: '100%', paddingTop: 50 }]}
      >
        <TextInput
          style={{ backgroundColor: theme.h1Color }}
          placeholder="Balls"
        />
      </View>
      <AddFeet />
    </View>
  );
};
