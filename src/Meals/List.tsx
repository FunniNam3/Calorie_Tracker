import React, { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from '../App';
import { useTheme } from '../Themes';
import { Picker } from '@react-native-picker/picker';
import { ListFeet } from './ListFeet';
import { Meals } from './Meal';
import { Foods } from './Food';

export const List = () => {
  const mealOptions = ['Meals', 'Foods'];
  const { theme } = useTheme();
  const [type, setType] = useState();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          flex: 1,
          flexDirection: 'column',
        },
      ]}
    >
      <View
        style={{
          display: 'flex',
          marginTop: 70,
          width: '100%',
          flexDirection: 'column',
          gap: 25,
          flex: 1,
        }}
      >
        <Text
          style={{
            color: theme.h1Color,
            fontSize: 30,
            paddingHorizontal: 40,
          }}
        >
          Item Search
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
            prompt="What do you want to look at:"
            style={{
              width: '100%',
              backgroundColor: theme.h1Color,
              color: theme.backgroundColor,
              textAlign: 'left',
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
      {!type && <Meals />}
      {type && <Foods />}
      <ListFeet />
    </View>
  );
};
