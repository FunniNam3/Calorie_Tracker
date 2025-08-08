import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { MealItem } from '../Items'; // Adjust path if needed
import { deleteMealItem, getDBConnection, getMealItems } from '../db-functions';
import { useTheme } from '../Themes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faX } from '@fortawesome/free-solid-svg-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export const Meals = () => {
  const typeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [filter, setFilter] = useState<Date>(new Date());
  const { theme } = useTheme();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [show, setShow] = useState(false);

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
      <Pressable
        style={{ marginBottom: '7%' }}
        onPress={() => {
          setShow(true);
        }}
      >
        <Text
          style={{
            color: theme.h1Color,
            fontSize: screenWidth * 0.06,
            fontWeight: 500,
          }}
        >
          Search Date
        </Text>
        <View
          style={{
            backgroundColor: theme.h1Color,
            borderRadius: screenWidth * 0.03,
            padding: screenWidth * 0.02,
            paddingHorizontal: screenWidth * 0.03,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: theme.backgroundColor,
              fontSize: screenHeight * 0.02,
              fontWeight: 500,
              flex: 1,
            }}
          >
            {filter.toDateString()}
          </Text>
          <FontAwesomeIcon
            icon={faCalendar}
            style={{
              color: theme.backgroundColor,
            }}
            size={screenHeight * 0.02}
          />
        </View>
      </Pressable>
      {show && (
        <DateTimePicker
          value={filter}
          mode="date"
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              setFilter(selectedDate);
            }
            // Optional: handle dismissed
            if (event.type === 'dismissed') {
              console.log('Picker closed without selection');
            }
            setShow(false);
          }}
        />
      )}

      <FlatList
        scrollEnabled
        data={meals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          if (item.day == filter.toLocaleDateString()) {
            return (
              <View style={{ padding: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: theme.h1Color,
                      fontSize: 20,
                      fontWeight: 500,
                    }}
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
            );
          }
          return <></>;
        }}
        ListEmptyComponent={
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: theme.h1Color,
                fontSize: screenHeight * 0.05,
                fontWeight: 500,
              }}
            >
              No Meals
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: theme.h2Color,
                fontSize: screenHeight * 0.02,
                fontWeight: 400,
              }}
            >
              To add meals press add item button
            </Text>
          </View>
        }
      />
    </View>
  );
};
