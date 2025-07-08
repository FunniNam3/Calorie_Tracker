import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { useTheme } from '../Themes';
import {
  getTodayBreakfastItems,
  getTodayLunchItems,
  getTodayDinnerItems,
} from '../db-functions';

export const Table: React.FC = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: '7%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AnimatedCircularProgress
          size={90}
          width={10}
          fill={50}
          tintColor={theme.Progress1}
          backgroundColor={theme.Progress2}
          padding={10}
          arcSweepAngle={270}
          rotation={225}
          lineCap="round"
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="10" fill={theme.Progress1} />
          )}
        >
          {() => <Text style={{ fontSize: 30 }}>🍳</Text>}
        </AnimatedCircularProgress>
        <Text
          style={{
            color: theme.h1Color,
            fontWeight: 500,
            fontSize: 20,
            marginTop: -15,
          }}
        >
          Breakfast
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AnimatedCircularProgress
          size={90}
          width={10}
          fill={50}
          tintColor={theme.Progress1}
          backgroundColor={theme.Progress2}
          padding={10}
          arcSweepAngle={270}
          rotation={225}
          lineCap="round"
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="10" fill={theme.Progress1} />
          )}
        >
          {() => <Text style={{ fontSize: 20 }}>🍔</Text>}
        </AnimatedCircularProgress>
        <Text
          style={{
            color: theme.h1Color,
            fontWeight: 500,
            fontSize: 20,
            marginTop: -15,
          }}
        >
          Lunch
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AnimatedCircularProgress
          size={90}
          width={10}
          fill={50}
          tintColor={theme.Progress1}
          backgroundColor={theme.Progress2}
          padding={10}
          arcSweepAngle={270}
          rotation={225}
          lineCap="round"
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="10" fill={theme.Progress1} />
          )}
        >
          {() => <Text style={{ fontSize: 20 }}>🍖</Text>}
        </AnimatedCircularProgress>
        <Text
          style={{
            color: theme.h1Color,
            fontWeight: 500,
            fontSize: 20,
            marginTop: -15,
          }}
        >
          Dinner
        </Text>
      </View>
    </View>
  );
};
