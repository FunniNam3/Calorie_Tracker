import React, { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { styles } from '../App';
import { useTheme } from '../Themes';
import { AddFeet } from './AddFeet';
import { Picker } from '@react-native-picker/picker';
import { FoodItem } from '../Items';
import { AddFood } from './AddFood/AddFood';
import { AddMeal } from './AddMeal/AddMeal';

export const AddStuff = () => {
  const mealOptions = ['Meal', 'Food'];
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [type, setType] = useState(0);

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
        style={[
          styles.container,
          { flex: 1, width: '100%', paddingTop: 50, gap: 30 },
        ]}
      >
        <View
          style={{
            marginTop: 20,
            width: '100%',
            flexDirection: 'column',
            gap: 25,
          }}
        >
          <Text
            style={{
              color: theme.h1Color,
              fontSize: 30,
              paddingHorizontal: 40,
            }}
          >
            What to add:
          </Text>
          <View
            style={[
              styles.container,
              {
                width: '80%',
                borderRadius: screenWidth * 0.02,
                backgroundColor: theme.h1Color,
                marginHorizontal: '10%',
                overflow: 'hidden',
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
              {mealOptions.map((label, index) => (
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
        </View>
        {type == 0 && <AddMeal />}
        {type == 1 && <AddFood />}
      </View>
      <AddFeet />
    </View>
  );
};
