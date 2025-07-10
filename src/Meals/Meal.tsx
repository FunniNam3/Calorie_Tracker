import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ScrollView } from 'react-native';
import { MealItem } from '../Items'; // Adjust path if needed
import { getDBConnection, getMealItems } from '../db-functions';
import { styles } from '../App';
import { useTheme } from '../Themes';
import { useNavigation } from '@react-navigation/native';

export const Meals = () => {
  const [meals, setMeals] = useState<MealItem[]>([]);
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const db = await getDBConnection();
        const Meals = await getMealItems(db);
        setMeals(Meals);
      } catch (error) {
        console.error('Failed to load today’s meals:', error);
      }
    };

    loadMeals();
  }, []);
  return (
    <View style={{ marginTop: 70, height: '70%' }}>
      <FlatList
        data={meals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>Id: {item.id}</Text>
            <Text>day: {item.day.toLocaleDateString()}</Text>
            <Text>type: {item.type}</Text>
            <Text>foods: {item.foods}</Text>
            <Text>servings: {item.servings}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No Meals</Text>}
      />
    </View>
  );
};
