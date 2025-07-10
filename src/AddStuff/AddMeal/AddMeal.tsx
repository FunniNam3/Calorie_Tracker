import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { styles } from '../../App';
import { useTheme } from '../../Themes';
import { getDBConnection, saveMealItem } from '../../db-functions';
import { FoodItem, MealItem } from '../../Items';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export const AddMeal = () => {
  const { theme } = useTheme();
  const typeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [type, setType] = useState(0);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const getFoodItems: FoodItem[] = [];
  //   const [cal, setCal] = useState('');
  //   const [carb, setCarb] = useState('');
  //   const [prot, setProt] = useState('');
  //   const [fib, setFib] = useState('');

  return (
    <View style={[styles.container, { flex: 1, width: '100%', gap: 20 }]}>
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
      <View style={{ width: '90%' }}>
        <MultiSelect
          hideTags
          items={getFoodItems}
          uniqueKey="id"
          onSelectedItemsChange={items => {
            setFoods(items);
          }}
          selectedItems={foods}
          searchInputPlaceholderText="Search Foods..."
          displayKey="name"
          submitButtonText="Select"
        />
        {/* <Button
          title="dick"
          color={theme.h1Color}
          onPress={async () => {
            const db = await getDBConnection();
            const meal: MealItem = {
              id: 0,
              day: new Date(),
              type:type,

            };
            await saveMealItem(db, meal);
            console.error('hehe');
          }}
        /> */}
      </View>
    </View>
  );
};
