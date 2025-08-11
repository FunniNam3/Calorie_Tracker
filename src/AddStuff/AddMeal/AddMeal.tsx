import React, { useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { styles } from '../../App';
import { useTheme } from '../../Themes';
import {
  getDBConnection,
  getFoodItems,
  saveMealItem,
} from '../../db-functions';
import { FoodItem, MealItem } from '../../Items';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

export const AddMeal = () => {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const nav = useNavigation();
  const typeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [type, setType] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [servings, setServings] = useState<{ [foodId: number]: number }>({});

  const [open, setOpen] = useState(false);

  const getFood = async () => {
    const db = await getDBConnection();
    const food = await getFoodItems(db);
    setFoods(food);
  };

  useEffect(() => {
    getFood();
  }, []);

  const handleServingChange = (id: number, value: string) => {
    const num = parseFloat(value.replace(/[^0-9.]+/g, ''));
    setServings(prev => ({ ...prev, [id]: isNaN(num) ? 0 : num }));
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          gap: 20,
          justifyContent: 'flex-start',
        },
      ]}
    >
      <ScrollView
        style={{
          flexGrow: 1,
          maxHeight: screenHeight * 0.7,
          width: '80%',
          marginHorizontal: '10%',
        }}
        contentContainerStyle={{
          alignContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.container,
            {
              width: '100%',
              borderRadius: screenWidth * 0.02,
              backgroundColor: theme.h1Color,
              overflow: 'hidden',
              marginBottom: '5%',
            },
          ]}
        >
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => {
              setType(itemValue);
            }}
            prompt="What are you adding:"
            style={{
              width: '100%',
              color: theme.backgroundColor,
              backgroundColor: theme.h1Color,
            }}
          >
            {typeOptions.map((label, index) => (
              <Picker.Item
                label={label}
                value={index}
                key={index}
                style={{
                  fontSize: screenHeight * 0.02,
                  padding: screenWidth * 0.02,
                }}
              />
            ))}
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: theme.h1Color,
            borderRadius: screenWidth * 0.02,
          }}
        >
          <DropDownPicker
            schema={{
              value: 'id',
              label: 'name',
            }}
            multiple={true}
            open={open}
            value={selectedFoods}
            items={foods}
            setOpen={setOpen}
            setValue={setSelectedFoods}
            setItems={setFoods}
            style={{
              backgroundColor: theme.h1Color,
              borderRadius: 8,
              borderWidth: 0,
            }}
            textStyle={{
              color: theme.backgroundColor,
              fontSize: screenHeight * 0.02,
            }}
            dropDownContainerStyle={{
              backgroundColor: theme.h1Color,
              borderWidth: 0,
            }}
          />
        </View>
        {selectedFoods.map(id => {
          const food = foods.find(f => f.id === id);
          if (!food) return null;
          return (
            <View key={Number(id)} style={{ width: '100%' }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: theme.h1Color,
                  fontSize: 40,
                  fontWeight: 600,
                }}
              >
                {food.name}
              </Text>
              <TextInput
                placeholder="Servings"
                value={servings[Number(id)]?.toString() || ''}
                onChangeText={text => handleServingChange(Number(id), text)}
                style={{
                  backgroundColor: theme.h1Color,
                  color: theme.backgroundColor,
                  width: '100%',
                  padding: 8,
                  borderRadius: 10,
                  fontSize: screenHeight * 0.02,
                }}
                keyboardType="decimal-pad"
              />
            </View>
          );
        })}
        <Pressable
          style={{
            backgroundColor: theme.h1Color,
            marginTop: '5%',
            marginBottom: screenHeight * 0.1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          onPress={async () => {
            console.error('pressed');
            const selectedFoodObjects = selectedFoods
              .map(id => foods.find(f => f.id === id))
              .filter(Boolean) as FoodItem[];

            const meal: MealItem = {
              id: 0,
              day: new Date().toLocaleDateString(),
              type: type,
              foods: selectedFoodObjects.map(f => f.name).join(','),
              servings: selectedFoodObjects
                .map(f => servings[f.id] || 0)
                .join(','),
              calories: selectedFoodObjects.reduce((total, f) => {
                const serving = servings[f.id] || 0;
                return total + f.calories * serving;
              }, 0),
              carbs: selectedFoodObjects.reduce((total, f) => {
                const serving = servings[f.id] || 0;
                return total + f.carbs * serving;
              }, 0),
              protein: selectedFoodObjects.reduce((total, f) => {
                const serving = servings[f.id] || 0;
                return total + f.protein * serving;
              }, 0),
              fat: selectedFoodObjects.reduce((total, f) => {
                const serving = servings[f.id] || 0;
                return total + f.fat * serving;
              }, 0),
            };
            const db = await getDBConnection();

            await saveMealItem(db, meal);
            nav.navigate('Main');
          }}
        >
          <Text
            style={{
              padding: screenWidth * 0.02,
              color: theme.backgroundColor,
              fontSize: screenHeight * 0.02,
            }}
          >
            Save Meal
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
