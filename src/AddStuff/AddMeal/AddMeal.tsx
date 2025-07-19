import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text, ScrollView } from 'react-native';
import { styles } from '../../App';
import { useTheme } from '../../Themes';
import {
  getDBConnection,
  getFoodItems,
  saveMealItem,
} from '../../db-functions';
import { FoodItem, MealItem } from '../../Items';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

export const AddMeal = () => {
  const { theme } = useTheme();
  const nav = useNavigation();
  const typeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [type, setType] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [servings, setServings] = useState<{ [foodId: number]: number }>({});

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
        { flexDirection: 'column', flex: 1, width: '100%', gap: 20 },
      ]}
    >
      <Picker
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => {
          setType(itemValue);
        }}
        prompt="What are you adding:"
        style={{
          height: 50,
          width: '80%',
          color: theme.backgroundColor,
          backgroundColor: theme.Progress2,
        }}
      >
        {typeOptions.map((label, index) => (
          <Picker.Item label={label} value={index} key={index} />
        ))}
      </Picker>
      <View style={{ width: '80%' }}>
        <MultiSelect
          hideTags
          items={foods}
          uniqueKey="id"
          onSelectedItemsChange={items => setSelectedFoods(items.map(Number))}
          selectedItems={selectedFoods}
          searchInputPlaceholderText="Search Foods..."
          displayKey="name"
          submitButtonText="Select"
          submitButtonColor={theme.Progress2}
          noItemsText="Add food before searching"
          searchIcon={
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                color: theme.backgroundColor,
                backgroundColor: theme.Progress2,
              }}
            />
          }
          selectedItemIconColor={theme.Select2}
          selectedItemTextColor={theme.Select2}
          itemTextColor={theme.Select1}
          styleMainWrapper={{ backgroundColor: theme.Progress2 }}
          searchInputStyle={{
            backgroundColor: theme.Progress2,
            color: theme.Progress2,
          }}
          styleDropdownMenu={{ backgroundColor: theme.Progress2 }}
          styleDropdownMenuSubsection={{ backgroundColor: theme.Progress2 }}
          styleRowList={{ backgroundColor: theme.Progress2 }}
          styleListContainer={{ backgroundColor: theme.Progress2 }}
          textColor={theme.backgroundColor}
        />
      </View>
      <ScrollView
        style={{ flexGrow: 1, maxHeight: 200 }}
        keyboardShouldPersistTaps="handled"
      >
        {selectedFoods.map((id, index) => {
          const food = foods.find(f => f.id === id);
          if (!food) return null;
          return (
            <View key={Number(id)} style={{ marginBottom: 15 }}>
              <Text style={{ color: theme.h1Color }}>{food.name}</Text>
              <TextInput
                placeholder="Servings"
                value={servings[Number(id)]?.toString() || ''}
                onChangeText={text => handleServingChange(Number(id), text)}
                style={{
                  backgroundColor: theme.Progress2,
                  color: theme.backgroundColor,
                  width: '80%',
                  padding: 8,
                  borderRadius: 10,
                }}
                keyboardType="decimal-pad"
              />
            </View>
          );
        })}
      </ScrollView>
      <Button
        title="Save Meal"
        color={theme.h1Color}
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
            fiber: selectedFoodObjects.reduce((total, f) => {
              const serving = servings[f.id] || 0;
              return total + f.fiber * serving;
            }, 0),
          };
          const db = await getDBConnection();

          await saveMealItem(db, meal);
          nav.navigate('Main');
        }}
      />
    </View>
  );
};
