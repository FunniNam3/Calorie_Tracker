import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../App';
import { useTheme } from '../Themes';

export const AddMeal = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingHorizontal: 30,
          paddingTop: 50,
        },
      ]}
    >
      <Text>Hi</Text>
      <Button
        title="Hi"
        onPress={() => {
          navigation.navigate('Main');
        }}
      ></Button>
    </View>
  );
};
