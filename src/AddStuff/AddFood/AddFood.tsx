import React, { useState } from 'react';
import { Button, TextInput, useWindowDimensions, View } from 'react-native';
import { styles } from '../../App';
import { useTheme } from '../../Themes';
import { getDBConnection, saveFoodItem } from '../../db-functions';
import { FoodItem } from '../../Items';
import { useNavigation } from '@react-navigation/native';

export const AddFood = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [cal, setCal] = useState('');
  const [carb, setCarb] = useState('');
  const [prot, setProt] = useState('');
  const [fat, setFat] = useState('');
  const nav = useNavigation();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          width: '100%',
          gap: '5%',
          justifyContent: 'flex-start',
          marginTop: '5%',
        },
      ]}
    >
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: theme.h1Color,
          color: theme.backgroundColor,
          textAlign: 'left',
          padding: screenWidth * 0.02,
          borderRadius: screenWidth * 0.02,
          fontSize: screenHeight * 0.02,
          width: '80%',
        }}
      />
      <TextInput
        placeholder="Calories"
        value={cal}
        onChangeText={text => {
          const numText = text.replace(/[^0-9.]+/g, '');
          setCal(numText);
        }}
        style={{
          backgroundColor: theme.h1Color,
          color: theme.backgroundColor,
          textAlign: 'left',
          padding: screenWidth * 0.02,
          borderRadius: screenWidth * 0.02,
          fontSize: screenHeight * 0.02,
          width: '80%',
        }}
        keyboardType="decimal-pad"
      />
      <TextInput
        placeholder="Carbs"
        value={carb}
        onChangeText={text => {
          const numText = text.replace(/[^0-9.]+/g, '');
          setCarb(numText);
        }}
        style={{
          backgroundColor: theme.h1Color,
          color: theme.backgroundColor,
          textAlign: 'left',
          padding: screenWidth * 0.02,
          borderRadius: screenWidth * 0.02,
          fontSize: screenHeight * 0.02,
          width: '80%',
        }}
        keyboardType="decimal-pad"
      />
      <TextInput
        placeholder="Protien"
        value={prot}
        onChangeText={text => {
          const numText = text.replace(/[^0-9.]+/g, '');
          setProt(numText);
        }}
        style={{
          backgroundColor: theme.h1Color,
          color: theme.backgroundColor,
          textAlign: 'left',
          padding: screenWidth * 0.02,
          borderRadius: screenWidth * 0.02,
          fontSize: screenHeight * 0.02,
          width: '80%',
        }}
        keyboardType="decimal-pad"
      />
      <TextInput
        placeholder="Fat"
        value={fat}
        onChangeText={text => {
          const numText = text.replace(/[^0-9.]+/g, '');
          setFat(numText);
        }}
        style={{
          backgroundColor: theme.h1Color,
          color: theme.backgroundColor,
          textAlign: 'left',
          padding: screenWidth * 0.02,
          borderRadius: screenWidth * 0.02,
          fontSize: screenHeight * 0.02,
          width: '80%',
        }}
        keyboardType="decimal-pad"
      />
      <View>
        <Button
          title="Save Food"
          color={theme.h1Color}
          onPress={async () => {
            const db = await getDBConnection();
            const food: FoodItem = {
              id: 0,
              name: name,
              calories: Number(cal),
              carbs: Number(carb),
              protein: Number(prot),
              fat: Number(fat),
            };
            let result = await saveFoodItem(db, food);
            nav.navigate('Main');
          }}
        />
      </View>
    </View>
  );
};
