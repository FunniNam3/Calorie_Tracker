import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../App';
import { useTheme } from '../Themes';
import { Picker } from '@react-native-picker/picker';
import { ListFeet } from './ListFeet';
import { Meals } from './Meal';
import { Foods } from './Food';

export const List = () => {
  const mealOptions = ['Meal', 'Food'];
  const { theme } = useTheme();
  const [type, setType] = useState();

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
          What to add:
        </Text>
        <View style={[styles.container, { flex: 1, width: '100%' }]}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => {
              setType(itemValue);
            }}
            prompt="What are you adding:"
            style={{
              height: 50,
              width: '100%',
              color: theme.backgroundColor,
              backgroundColor: theme.Progress2,
              maxWidth: '80%',
            }}
          >
            {mealOptions.map((label, index) => (
              <Picker.Item label={label} value={index} key={index} />
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
