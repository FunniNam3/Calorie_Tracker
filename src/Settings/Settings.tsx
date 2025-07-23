import React from 'react';
import { View, Text, useWindowDimensions, Button } from 'react-native';
import { styles } from '../App';
import { useTheme, themes } from '../Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { SettingFeet } from './Setting Feet';
export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { width } = useWindowDimensions();

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
        <View>
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
      </View>
      <SettingFeet />
    </View>
  );
};
