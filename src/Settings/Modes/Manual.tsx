import React, { useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Pressable,
} from 'react-native';
import { useTheme } from '../../Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, useGoal } from '../../Track';

interface props {
  gender: boolean;
  age: string;
  height: string;
  weight: string;
  activity: Number;
}

export const ManualSettings: React.FC<props> = ({
  gender,
  age,
  height,
  weight,
  activity,
}) => {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { goal, setGoal } = useGoal();

  const [cal, setCal] = useState(goal.calories.toString());
  const [carb, setCarb] = useState(goal.carbs.toString());
  const [prot, setProt] = useState(goal.protein.toString());
  const [fib, setFib] = useState(goal.fiber.toString());

  return (
    <>
      <View
        style={{
          display: 'flex',
          marginTop: '10%',
          width: '100%',
          flexDirection: 'column',
          gap: 25,
          flex: 1,
        }}
      >
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
            }}
          >
            <Text
              style={{
                color: theme.h1Color,
                fontSize: screenWidth * 0.06,
                fontWeight: 500,
                flex: 1,
              }}
            >
              Calories (kcal)
            </Text>
            <TextInput
              placeholder="Calories"
              value={cal}
              onChangeText={text => {
                const numText = text.replace(/[^0-9.]+/g, '');
                setCal(numText);
              }}
              style={{
                backgroundColor: theme.Progress2,
                color: theme.backgroundColor,
                minWidth: '50%',
                textAlign: 'right',
                padding: screenWidth * 0.02,
                borderRadius: screenWidth * 0.02,
              }}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={{
                color: theme.h1Color,
                fontSize: screenWidth * 0.06,
                fontWeight: 500,
                flex: 1,
              }}
            >
              Carbs (g)
            </Text>
            <TextInput
              placeholder="Carbs"
              value={carb}
              onChangeText={text => {
                const numText = text.replace(/[^0-9.]+/g, '');
                setCarb(numText);
              }}
              style={{
                backgroundColor: theme.Progress2,
                color: theme.backgroundColor,
                minWidth: '50%',
                textAlign: 'right',
                padding: screenWidth * 0.02,
                borderRadius: screenWidth * 0.02,
              }}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={{
                color: theme.h1Color,
                fontSize: screenWidth * 0.06,
                fontWeight: 500,
                flex: 1,
              }}
            >
              Protein (g)
            </Text>
            <TextInput
              placeholder="Protein"
              value={prot}
              onChangeText={text => {
                const numText = text.replace(/[^0-9.]+/g, '');
                setProt(numText);
              }}
              style={{
                backgroundColor: theme.Progress2,
                color: theme.backgroundColor,
                minWidth: '50%',
                textAlign: 'right',
                padding: screenWidth * 0.02,
                borderRadius: screenWidth * 0.02,
              }}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={{
                color: theme.h1Color,
                fontSize: screenWidth * 0.06,
                fontWeight: 500,
                flex: 1,
              }}
            >
              Fiber (g)
            </Text>
            <TextInput
              placeholder="Fiber"
              value={fib}
              onChangeText={text => {
                const numText = text.replace(/[^0-9.]+/g, '');
                setFib(numText);
              }}
              style={{
                backgroundColor: theme.Progress2,
                color: theme.backgroundColor,
                minWidth: '50%',
                textAlign: 'right',
                padding: screenWidth * 0.02,
                borderRadius: screenWidth * 0.02,
              }}
              keyboardType="decimal-pad"
            />
          </View>
        </>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Pressable
          style={{
            backgroundColor: theme.h1Color,
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            marginBottom: screenHeight * 0.1,
            paddingVertical: screenHeight * 0.01,
            borderRadius: 20,
          }}
          onPress={async () => {
            await AsyncStorage.multiSet([
              ['Gender', gender ? 'male' : 'female'],
              ['Age', age],
              ['Height', height],
              ['Weight', weight],
              ['Activity', activity.toString()],
            ]);
            let temp: Goal = {
              calories: Number(cal),
              carbs: Number(carb),
              protein: Number(prot),
              fiber: Number(fib),
            };
            await AsyncStorage.setItem('goals', JSON.stringify(temp));
            setGoal(temp);
          }}
        >
          <Text
            style={{
              color: theme.backgroundColor,
              fontSize: screenWidth * 0.05,
            }}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </>
  );
};
