import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { FoodItem } from '../Items';
import { deleteFoodItem, getDBConnection, getFoodItems } from '../db-functions';
import { useTheme } from '../Themes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export const Foods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

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
    <View
      style={{
        marginTop: 70,
        height: '70%',
        width: '100%',
        paddingHorizontal: '10%',
      }}
    >
      <FlatList
        scrollEnabled
        data={foods}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: '5%' }} />}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: '5%', width: '100%' }}>
            <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
              <Text
                style={{
                  fontSize: 30,
                  paddingVertical: '2.5%',
                  flex: 1,
                  color: theme.h1Color,
                  fontWeight: 700,
                }}
              >
                {item.name}
              </Text>
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
                          await deleteFoodItem(db, item.id);
                          const Meals = await getFoodItems(db);
                          setFoods(Meals);
                        },
                      },
                    ],
                    { cancelable: true },
                  );
                }}
                style={{ paddingVertical: '5%' }}
              >
                <FontAwesomeIcon icon={faX} color={theme.h1Color} size={25} />
              </Pressable>
            </View>

            <Text
              style={{ color: theme.h2Color, fontSize: 20, fontWeight: 500 }}
            >
              Calories: {item.calories}kcal
            </Text>
            <Text
              style={{ color: theme.h2Color, fontSize: 20, fontWeight: 500 }}
            >
              Carbs: {item.carbs}g
            </Text>
            <Text
              style={{ color: theme.h2Color, fontSize: 20, fontWeight: 500 }}
            >
              Protein: {item.protein}g
            </Text>
            <Text
              style={{ color: theme.h2Color, fontSize: 20, fontWeight: 500 }}
            >
              Fiber: {item.fiber}g
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No Food</Text>}
      />
    </View>
  );
};
