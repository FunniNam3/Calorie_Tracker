import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Themes';
import Svg, { Circle, Text } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faList, faPlus } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.Footer,
        height: 100,
        alignItems: 'center',
        gap: '20%',
        paddingHorizontal: '10%',
        paddingBottom: '1%',
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('Meals');
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <FontAwesomeIcon
          icon={faList}
          size={40}
          color={theme.backgroundColor}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('AddMeal');
        }}
      >
        <Svg height="130" width="140" style={{ marginTop: -50 }}>
          <Circle cx="70" cy="80" r="70" fill={theme.Footer} />
          <Circle cx="70" cy="80" r="50" fill={theme.backgroundColor} />
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
      <Pressable
        onPress={() => {
          navigation.navigate('Settings');
        }}
        style={{ flex: 1 }}
      >
        <FontAwesomeIcon
          icon={faGear}
          size={40}
          color={theme.backgroundColor}
        />
      </Pressable>
    </View>
  );
};
