import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { FoodItem } from '../Items'; // Adjust path if needed
import { getDBConnection, getFoodItems } from '../db-functions';
import { useTheme } from '../Themes';

export const Foods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const db = await getDBConnection();
        const Foods = await getFoodItems(db);
        setFoods(Foods);
      } catch (error) {
        console.error('Failed to load today’s meals:', error);
      }
    };

    loadMeals();
  }, []);
  return (
    <View style={{ marginTop: 70, height: '70%' }}>
      <FlatList
        data={foods}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>Id: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Carbs: {item.carbs}</Text>
            <Text>Protein: {item.protein}</Text>
            <Text>fiber: {item.fiber}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No Food</Text>}
      />
    </View>
  );
};
