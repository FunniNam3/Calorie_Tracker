import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Button,
  TextInput,
  Switch,
  Pressable,
} from 'react-native';
import { styles } from '../App';
import { useTheme, themes } from '../Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { SettingFeet } from './Setting Feet';
import { Goal, useGoal } from '../Track';
export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { width, height } = useWindowDimensions();
  const [advancedMode, setAdvancedMode] = useState(false);
  const { goal, setGoal } = useGoal();

  const [cal, setCal] = useState(goal.calories.toString());
  const [carb, setCarb] = useState(goal.carbs.toString());
  const [prot, setProt] = useState(goal.protein.toString());
  const [fib, setFib] = useState(goal.fiber.toString());

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
          marginTop: '15%',
          width: '100%',
          flexDirection: 'column',
          gap: 25,
          flex: 1,
          paddingHorizontal: '10%',
        }}
      >
        <Text
          style={{
            color: theme.h1Color,
            fontSize: width * 0.12,
            fontWeight: 600,
            paddingHorizontal: 40,
          }}
        >
          Settings
        </Text>
        <View style={{ gap: height * 0.01 }}>
          <Text
            style={{
              fontSize: width * 0.05,
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
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: width * 0.05,
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
          {!advancedMode && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: height * 0.01,
                marginTop: height * 0.02,
              }}
            >
              <View>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: width * 0.04,
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
            </View>
          )}
          {advancedMode && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: height * 0.01,
                marginTop: height * 0.02,
              }}
            >
              <View>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: width * 0.04,
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
                    fontSize: width * 0.04,
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
                    fontSize: width * 0.04,
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
                    fontSize: width * 0.04,
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
              >
                <Pressable
                  style={{
                    backgroundColor: theme.h1Color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40%',
                  }}
                  onPress={async () => {
                    let temp: Goal = {
                      calories: Number(cal),
                      carbs: Number(carb),
                      protein: Number(prot),
                      fiber: Number(fib),
                    };
                    try {
                      await AsyncStorage.setItem('goals', JSON.stringify(temp));
                      setGoal(temp);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: theme.backgroundColor,
                      fontSize: width * 0.05,
                    }}
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
      <SettingFeet />
    </View>
  );
};
