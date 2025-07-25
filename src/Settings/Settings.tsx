import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Button,
  TextInput,
  Switch,
  Pressable,
  ScrollView,
} from 'react-native';
import { styles } from '../App';
import { useTheme, themes } from '../Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { SettingFeet } from './Setting Feet';
import { Goal, useGoal } from '../Track';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const genders = ['male', 'female'];

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [advancedMode, setAdvancedMode] = useState(false);
  const { goal, setGoal } = useGoal();

  // Male = true, Female = false
  const [gender, setGender] = useState(false);
  const [age, setAge] = useState('0');
  const [height, setHeight] = useState('0');
  const [weight, setWeight] = useState('0');

  const [cal, setCal] = useState(goal.calories.toString());
  const [carb, setCarb] = useState(goal.carbs.toString());
  const [prot, setProt] = useState(goal.protein.toString());
  const [fib, setFib] = useState(goal.fiber.toString());

  useEffect(() => {
    const getStats = async () => {
      try {
        const tempGender = await AsyncStorage.getItem('Gender');
        const tempAge = await AsyncStorage.getItem('Age');
        const tempHeight = await AsyncStorage.getItem('Height');
        const tempWeight = await AsyncStorage.getItem('Weight');
        setGender(tempGender == 'male');
        setAge(tempAge);
        setHeight(tempHeight);
        setWeight(tempWeight);
      } catch (error) {
        setGender(false);
        setAge('0');
        setHeight('0');
        setWeight('0');
      }
    };
    getStats();
  }, []);

  useEffect(() => {
    const getMode = async () => {
      const mode = await AsyncStorage.getItem('mode');
      setAdvancedMode(mode === '1');
    };
    getMode();
  }, []);

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
          marginTop: '10%',
          width: '100%',
          flexDirection: 'column',
          gap: 25,
          flex: 1,
        }}
      >
        <Text
          style={{
            color: theme.h1Color,
            fontSize: screenWidth * 0.12,
            fontWeight: 600,
            paddingHorizontal: '10%',
          }}
        >
          Settings
        </Text>
        <ScrollView
          style={{
            display: 'flex',
            paddingHorizontal: '10%',
            gap: 25,
          }}
        >
          <View style={{ gap: screenHeight * 0.01 }}>
            <Text
              style={{
                fontSize: screenWidth * 0.05,
                fontWeight: 500,
                color: theme.h1Color,
              }}
            >
              Themes
            </Text>
            <Button
              title={'Pink'}
              onPress={async () => {
                setTheme(themes.pink);
                try {
                  await AsyncStorage.setItem('selectedTheme', 'Pink');
                } catch (error) {
                  console.error('no Save');
                }
              }}
              color={themes.pink.backgroundColor}
            />
            <Button
              title={'Light'}
              onPress={async () => {
                setTheme(themes.light);
                try {
                  await AsyncStorage.setItem('selectedTheme', 'Light');
                } catch (error) {
                  console.error('no Save');
                }
              }}
              color={themes.light.backgroundColor}
            />
            <Button
              title={'Dark'}
              onPress={async () => {
                setTheme(themes.dark);
                try {
                  await AsyncStorage.setItem('selectedTheme', 'Dark');
                } catch (error) {
                  console.error('no Save');
                }
              }}
              color={themes.dark.backgroundColor}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              gap: screenHeight * 0.02,
              marginTop: screenHeight * 0.02,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: screenWidth * 0.05,
                  fontWeight: 500,
                  color: theme.h1Color,
                }}
              >
                Advanced Mode
              </Text>
              <Switch
                onValueChange={async () => {
                  setAdvancedMode(previousState => !previousState);
                  await AsyncStorage.setItem('mode', advancedMode ? '0' : '1');
                }}
                value={advancedMode}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: screenHeight * 0.01,
                marginTop: screenHeight * 0.005,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: screenWidth * 0.06,
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  Gender
                </Text>
                <Pressable
                  onPress={() => {
                    setGender(!gender);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: theme.h2Color,
                      borderRadius: width * 0.02,
                      gap: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.backgroundColor,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                        backgroundColor: !gender
                          ? theme.h2Color
                          : theme.h1Color,
                        padding: width * 0.02,
                        borderRadius: width * 0.02,
                      }}
                    >
                      Male
                    </Text>
                    <Text
                      style={{
                        color: theme.backgroundColor,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                        padding: width * 0.02,
                        borderRadius: width * 0.02,
                        backgroundColor: gender ? theme.h2Color : theme.h1Color,
                      }}
                    >
                      Female
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: screenWidth * 0.06,
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  Age
                </Text>
                <TextInput
                  placeholder="Age"
                  value={age}
                  onChangeText={text => {
                    const numText = text.replace(/[^0-9]+/g, '');
                    setAge(numText);
                  }}
                  style={{
                    backgroundColor: theme.Progress2,
                    color: theme.backgroundColor,
                    minWidth: '50%',
                    textAlign: 'right',
                    padding: width * 0.02,
                    borderRadius: width * 0.02,
                  }}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: screenWidth * 0.06,
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  Height (cm)
                </Text>
                <TextInput
                  placeholder="Height"
                  value={height}
                  onChangeText={text => {
                    const numText = text.replace(/[^0-9]+/g, '');
                    setHeight(numText);
                  }}
                  style={{
                    backgroundColor: theme.Progress2,
                    color: theme.backgroundColor,
                    minWidth: '50%',
                    textAlign: 'right',
                    padding: width * 0.02,
                    borderRadius: width * 0.02,
                  }}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: screenWidth * 0.06,
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  Weight (kg)
                </Text>
                <TextInput
                  placeholder="Weight"
                  value={weight}
                  onChangeText={text => {
                    const numText = text.replace(/[^0-9]+/g, '');
                    setWeight(numText);
                  }}
                  style={{
                    backgroundColor: theme.Progress2,
                    color: theme.backgroundColor,
                    minWidth: '50%',
                    textAlign: 'right',
                    padding: width * 0.02,
                    borderRadius: width * 0.02,
                  }}
                  keyboardType="decimal-pad"
                />
              </View>
              {advancedMode && (
                <>
                  <View>
                    <Text
                      style={{
                        color: theme.h1Color,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                      }}
                    >
                      Calories
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
                      }}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: theme.h1Color,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                      }}
                    >
                      Carbs
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
                      }}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: theme.h1Color,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                      }}
                    >
                      Protein
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
                      }}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: theme.h1Color,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                      }}
                    >
                      Fiber
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
                      }}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '5%',
                    }}
                  ></View>
                </>
              )}
            </View>
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
                ]);
                if (advancedMode) {
                  let temp: Goal = {
                    calories: Number(cal),
                    carbs: Number(carb),
                    protein: Number(prot),
                    fiber: Number(fib),
                  };
                  await AsyncStorage.setItem('goals', JSON.stringify(temp));
                  setGoal(temp);
                } else {
                  let temp: Goal = {
                    calories:
                      10 * Number(weight) +
                      6.25 * Number(height) -
                      5 * Number(age) +
                      (gender ? 5 : -161),
                    carbs: Number(carb),
                    protein: Number(prot),
                    fiber: Number(fib),
                  };
                  await AsyncStorage.setItem('goals', JSON.stringify(temp));
                  setGoal(temp);
                }
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
        </ScrollView>
      </View>
      <SettingFeet />
    </View>
  );
};
