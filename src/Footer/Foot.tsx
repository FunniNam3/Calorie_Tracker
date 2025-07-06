import React from 'react';
import { View, Button, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Themes';
import Svg, { Circle, Text } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddMeal } from '../AddMeal/AddMeal';

export const Footer = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const showAlert = () => {
    Alert.alert(
      'Alert Title',
      'This is the alert message.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true },
    );
  };
  return (
    <View
      style={{
        backgroundColor: theme.Footer,
        height: 100,
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('AddMeal');
        }}
      >
        <Svg height="400" width="400" style={{ marginTop: -50 }}>
          <Circle cx="200" cy="80" r="70" fill={theme.Footer} />
          <Circle cx="200" cy="80" r="50" fill={theme.backgroundColor} />
          <Text
            x="50%"
            y="80"
            fill={theme.Footer}
            fontSize="50"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          ></Text>
        </Svg>
        <FontAwesomeIcon
          icon={faPlus}
          size={40}
          color={theme.Footer}
          style={{ position: 'absolute', alignSelf: 'center', marginTop: 10 }}
        />
      </Pressable>
    </View>
  );
};
