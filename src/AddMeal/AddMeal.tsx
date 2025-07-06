import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../App';
import { useTheme } from '../Themes';
// import { getDBConnection, getTodayMealItems } from '../db-functions';
// import { TodayMeals } from '../Meals';

export const AddMeal = () => {
  // const db = getDBConnection();
  const navigation = useNavigation();
  const { theme } = useTheme();

  // const today = getTodayMealItems(db);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingHorizontal: 30,
          paddingTop: 50,
        },
      ]}
    >
      <Text>Hi</Text>
      {/* <TodayMeals /> */}
      <Button
        title="Hi"
        onPress={() => {
          navigation.navigate('Main');
        }}
      ></Button>
    </View>
  );
};
