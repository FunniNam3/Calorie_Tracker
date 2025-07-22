import React, { useEffect, useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { useTheme } from '../Themes';
import {
  getTodayBreakfastItems,
  getTodayLunchItems,
  getTodayDinnerItems,
  getDBConnection,
} from '../db-functions';
import { useGoal } from '../Track';

export const Table: React.FC = () => {
  const { theme } = useTheme();
  const { goal } = useGoal();
  const [mealProgress, setMealProgress] = useState([0, 0, 0]);
  const { width } = useWindowDimensions();

  const circleSize = width * 0.22;
  const circleWidth = width * 0.03;

  const getMealProgress = async () => {
    const db = await getDBConnection();
    const breakfast = await getTodayBreakfastItems(db);
    const lunch = await getTodayLunchItems(db);
    const dinner = await getTodayDinnerItems(db);

    const breakfastCal: number = breakfast.reduce((acc, curr) => {
      return acc + curr.calories;
    }, 0);

    const lunchCal: number = lunch.reduce((acc, curr) => {
      return acc + curr.calories;
    }, 0);

    const dinnerCal: number = dinner.reduce((acc, curr) => {
      return acc + curr.calories;
    }, 0);

    setMealProgress([breakfastCal, lunchCal, dinnerCal]);
  };

  useEffect(() => {
    getMealProgress();
  }, []);

  return (
    <View
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
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
          flex: 1,
        }}
      >
        <AnimatedCircularProgress
          size={circleSize}
          width={circleWidth}
          fill={(mealProgress[0] * 100) / (goal.calories * 0.35)}
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
          flex: 1,
        }}
      >
        <AnimatedCircularProgress
          size={circleSize}
          width={circleWidth}
          fill={(mealProgress[1] * 100) / (goal.calories * 0.4)}
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
          flex: 1,
        }}
      >
        <AnimatedCircularProgress
          size={circleSize}
          width={circleWidth}
          fill={(mealProgress[2] * 100) / (goal.calories * 0.25)}
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
