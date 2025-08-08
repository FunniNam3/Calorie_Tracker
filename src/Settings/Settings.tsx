import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Switch,
  Pressable,
  ScrollView,
} from 'react-native';
import { styles } from '../App';
import { useTheme, themes } from '../Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingFeet } from './Setting Feet';
import { ManualSettings } from './Modes/Manual';
import { BasicSettings } from './Modes/Basic';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [manualMode, setManualMode] = useState(false);

  // Male = true, Female = false
  const [gender, setGender] = useState(false);
  const [age, setAge] = useState('0');
  const [height, setHeight] = useState('0');
  const [weight, setWeight] = useState('0');
  const [activity, setActivity] = useState(0);
  const [objective, setObjective] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      try {
        const tempGender = await AsyncStorage.getItem('Gender');
        setGender(tempGender == 'male');
      } catch (error) {
        setGender(false);
      }
      try {
        const tempAge = await AsyncStorage.getItem('Age');
        setAge(String(tempAge));
      } catch (error) {
        setAge('0');
      }
      try {
        const tempHeight = await AsyncStorage.getItem('Height');
        setHeight(String(tempHeight));
      } catch (error) {
        setHeight('0');
      }
      try {
        const tempWeight = await AsyncStorage.getItem('Weight');
        setWeight(String(tempWeight));
      } catch (error) {
        setWeight('0');
      }
      try {
        const tempActivity = await AsyncStorage.getItem('Activity');
        setActivity(Number(tempActivity));
      } catch (error) {
        setActivity(0);
      }
      try {
        const tempObjective = await AsyncStorage.getItem('Objective');
        setObjective(Number(tempObjective));
      } catch (error) {
        setObjective(0);
      }
    };
    getStats();
  }, []);

  useEffect(() => {
    const getMode = async () => {
      const mode = await AsyncStorage.getItem('mode');
      setManualMode(mode === '1');
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
            {themes.map((theme, index) => (
              <Pressable
                style={{
                  backgroundColor: theme.backgroundColor,
                  padding: 10,
                  alignItems: 'center',
                  borderColor: theme.h1Color,
                  borderWidth: 5,
                  borderRadius: 25,
                }}
                onPress={async () => {
                  setTheme(theme);
                  try {
                    await AsyncStorage.setItem('selectedTheme', theme.name);
                  } catch (error) {
                    console.error('no Save');
                  }
                }}
              >
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: screenHeight * 0.02,
                    fontWeight: 800,
                  }}
                >
                  {theme.name}
                </Text>
              </Pressable>
            ))}
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
                Manual Mode
              </Text>
              <Switch
                onValueChange={async () => {
                  setManualMode(previousState => !previousState);
                  await AsyncStorage.setItem('mode', manualMode ? '0' : '1');
                }}
                value={manualMode}
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
                      borderRadius: screenWidth * 0.02,
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
                        padding: screenWidth * 0.02,
                        borderRadius: screenWidth * 0.02,
                      }}
                    >
                      Male
                    </Text>
                    <Text
                      style={{
                        color: theme.backgroundColor,
                        fontSize: screenWidth * 0.04,
                        fontWeight: 500,
                        padding: screenWidth * 0.02,
                        borderRadius: screenWidth * 0.02,
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
                    padding: screenWidth * 0.02,
                    borderRadius: screenWidth * 0.02,
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
                  Height (in)
                </Text>
                <TextInput
                  placeholder="Height"
                  value={height}
                  onChangeText={text => {
                    const numText = text.replace(/[^0-9.]+/g, '');
                    setHeight(numText);
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
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: theme.h1Color,
                    fontSize: screenWidth * 0.06,
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  Weight (lbs)
                </Text>
                <TextInput
                  placeholder="Weight"
                  value={weight}
                  onChangeText={text => {
                    const numText = text.replace(/[^0-9.]+/g, '');
                    setWeight(numText);
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
              {!manualMode && (
                <BasicSettings
                  gender={gender}
                  age={age}
                  height={height}
                  weight={weight}
                  objective={objective}
                  setObjective={setObjective}
                  activity={activity}
                  setActivity={setActivity}
                />
              )}
              {manualMode && (
                <ManualSettings
                  gender={gender}
                  age={age}
                  height={height}
                  weight={weight}
                  activity={activity}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <SettingFeet />
    </View>
  );
};
