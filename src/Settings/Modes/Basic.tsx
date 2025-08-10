import React, { useState } from 'react';
import { View, Text, useWindowDimensions, Pressable } from 'react-native';
import { useTheme } from '../../Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Goal, useGoal } from '../../Track';

interface props {
  gender: boolean;
  age: string;
  height: string;
  weight: string;
  objective: number;
  setObjective: React.Dispatch<React.SetStateAction<number>>;
  activity: number;
  setActivity: React.Dispatch<React.SetStateAction<number>>;
}

export const BasicSettings: React.FC<props> = ({
  gender,
  age,
  height,
  weight,
  objective,
  setObjective,
  activity,
  setActivity,
}) => {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { goal, setGoal } = useGoal();

  // Male = true, Female = false
  const activityOptions = [
    'Sedentary: little to no exercise',
    'Lightly active: exercise 1-3 times/week',
    'Moderately active: exercise 4-5 times/week',
    'Active: daily or intense exercise 3-4 times/week',
    'Very active: intense exercise 6-7 times/week',
    'Extreamly active: very intense exercise daily',
  ];
  const activityMultiplier = [1.2, 1.375, 1.465, 1.55, 1.725, 1.9];

  const obvjectiveOptions = [
    'Maintain weight',
    'Mild weight loss 0.5 lbs/week',
    'Weight loss 1 lbs/week',
    'Extreme weight loss 2 lbs/week',
    'Mild weight gain 0.5 lbs/week',
    'Weight gain 1 lbs/week',
    'Fast weight gain 2 lbs/week',
  ];
  const objectiveAdder = [0, -250, -500, -1000, 250, 500, 1000];

  const [carb, setCarb] = useState(goal.carbs?.toString());
  const [prot, setProt] = useState(goal.protein?.toString());
  const [fat, setFat] = useState(goal.fat?.toString());

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            color: theme.h1Color,
            fontSize: screenWidth * 0.06,
            fontWeight: 500,
            flex: 1,
          }}
        >
          Activity Level
        </Text>
        <View
          style={[
            {
              width: '50%',
              borderRadius: screenWidth * 0.02,
              backgroundColor: theme.h1Color,
              overflow: 'hidden',
            },
          ]}
        >
          <Picker
            selectedValue={activity}
            onValueChange={(itemValue, itemIndex) => {
              setActivity(itemValue);
            }}
            prompt="What are you adding:"
            style={{
              backgroundColor: theme.h1Color,
              color: theme.backgroundColor,
              textAlign: 'left',
            }}
          >
            {activityOptions.map((label, index) => (
              <Picker.Item
                label={label}
                value={index}
                key={index}
                style={{
                  fontSize: screenHeight * 0.015,
                  padding: screenWidth * 0.02,
                }}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            color: theme.h1Color,
            fontSize: screenWidth * 0.06,
            fontWeight: 500,
            flex: 1,
          }}
        >
          Goal
        </Text>
        <View
          style={{
            width: '50%',
            borderRadius: screenWidth * 0.02,
            backgroundColor: theme.h1Color,
            overflow: 'hidden',
          }}
        >
          <Picker
            selectedValue={objective}
            onValueChange={(itemValue, itemIndex) => {
              setObjective(itemValue);
            }}
            prompt="What are you adding:"
            style={{
              backgroundColor: theme.h1Color,
              color: theme.backgroundColor,
              textAlign: 'left',
            }}
          >
            {obvjectiveOptions.map((label, index) => (
              <Picker.Item
                label={label}
                value={index}
                key={index}
                style={{
                  fontSize: screenHeight * 0.015,
                  padding: screenWidth * 0.02,
                }}
              />
            ))}
          </Picker>
        </View>
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
              ['Objective', objective.toString()],
            ]);

            let temp: Goal = {
              calories: Number(
                (
                  (10 * (0.45359237 * Number(weight)) +
                    6.25 * (2.54 * Number(height)) -
                    5 * Number(age) +
                    (gender ? 5 : -161)) *
                    activityMultiplier[activity] +
                  objectiveAdder[objective]
                ).toFixed(0),
              ),
              carbs: Number(carb) ? Number(carb) : 0,
              protein: Number(prot) ? Number(prot) : 0,
              fat: Number(fat) ? Number(fat) : 0,
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
