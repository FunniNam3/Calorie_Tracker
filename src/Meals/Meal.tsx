import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { MealItem } from '../Items'; // Adjust path if needed
import { deleteMealItem, getDBConnection, getMealItems } from '../db-functions';
import { useTheme } from '../Themes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export const Meals = () => {
  const typeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [meals, setMeals] = useState<MealItem[]>([]);
  const { theme } = useTheme();

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
    <View
      style={{
        marginTop: '7%',
        height: '70%',
        width: '100%',
        paddingHorizontal: '10%',
      }}
    >
      <FlatList
        scrollEnabled
        data={meals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: theme.h1Color, fontSize: 20, fontWeight: 500 }}
              >
                day: {item.day}
              </Text>
              <Text style={{ color: theme.h2Color, fontWeight: 500 }}>
                type: {typeOptions[item.type]}
              </Text>
              <Text style={{ color: theme.h2Color, fontWeight: 500 }}>
                foods: {item.foods}
              </Text>
              <Text style={{ color: theme.h2Color, fontWeight: 500 }}>
                servings: {item.servings}
              </Text>
              <Text style={{ color: theme.h2Color, fontWeight: 500 }}>
                calories: {item.calories}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  'This cannot be undone.\n You will never see this again.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: async () => {
                        const db = await getDBConnection();
                        await deleteMealItem(db, item.id);
                        const Meals = await getMealItems(db);
                        setMeals(Meals);
                      },
                    },
                  ],
                  { cancelable: true },
                );
              }}
            >
              <FontAwesomeIcon icon={faX} color={theme.h1Color} />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No Meals</Text>}
      />
    </View>
  );
};
