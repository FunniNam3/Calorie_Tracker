import React from 'react';
import { View, Button, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Themes';
import Svg, { Circle, Text } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faList, faHouse } from '@fortawesome/free-solid-svg-icons';

export const ListFeet = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: theme.Footer,
        height: 100,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('Meals');
        }}
      >
        <FontAwesomeIcon
          icon={faList}
          size={40}
          color={theme.backgroundColor}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginLeft: '-68%',
            marginTop: '6%',
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Main');
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
          icon={faHouse}
          size={40}
          color={theme.Footer}
          style={{ position: 'absolute', alignSelf: 'center', marginTop: 10 }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          throw new Error('Settings');
        }}
      >
        <FontAwesomeIcon
          icon={faGear}
          size={40}
          color={theme.backgroundColor}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginLeft: '68%',
            marginTop: '-13%',
          }}
        />
      </Pressable>
    </View>
  );
};
