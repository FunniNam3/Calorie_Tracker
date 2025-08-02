import React, { useEffect } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as ProgressBar from 'react-native-progress';
import { Circle } from 'react-native-svg';
import { useTheme } from '../Themes';
import { useGoal, useProgress } from '../Track';
import { Table } from './Table';
import { styles } from '../App';
import { Footer } from './Foot';
import { getDBConnection, getTodayMealItems } from '../db-functions';
import { MealItem } from '../Items';
import { Progress } from '../Track';

// This is the main home page

function Main() {
  const { theme } = useTheme();
  const { goal } = useGoal();
  const { progress, setProgress } = useProgress();
  const { width } = useWindowDimensions();

  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toLocaleDateString();

  const loadProgress = async () => {
    const db = await getDBConnection();

    const meals: MealItem[] = await getTodayMealItems(db);
    // console.error(meals[0].calories);

    const tempProg: Progress = meals.reduce(
      (acc, curr) => {
        acc.calories += curr.calories;
        acc.carbs += curr.carbs;
        acc.protein += curr.protein;
        acc.fat += curr.fat;
        return acc;
      },
      {
        id: 0,
        day: new Date().toLocaleDateString(),
        type: 0,
        foods: '',
        servings: '',
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      },
    );

    setProgress(tempProg);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundColor,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
          },
        ]}
      >
        <View style={[styles.container, { marginTop: 60 }]}>
          <Text
            style={{
              fontSize: width * 0.15,
              fontWeight: 700,
              color: theme.h1Color,
            }}
          >
            {' '}
            {formattedDate}
          </Text>
          <AnimatedCircularProgress
            size={width * 0.8}
            width={width * 0.05}
            fill={(progress.calories / goal.calories) * 100}
            tintColor={theme.Progress1}
            backgroundColor={theme.Progress2}
            padding={10}
            arcSweepAngle={270}
            rotation={225}
            lineCap="round"
            renderCap={({ center }) => (
              <Circle
                cx={center.x}
                cy={center.y}
                r={width * 0.04}
                fill={theme.Progress1}
              />
            )}
          >
            {() => (
              <>
                <Text
                  style={{
                    fontSize: width * 0.15,
                    color: theme.h1Color,
                    fontWeight: 500,
                  }}
                >
                  {progress.calories} Cal
                </Text>
                <Text
                  style={[
                    {
                      fontSize: width * 0.1,
                      color: theme.h2Color,
                      fontWeight: 500,
                    },
                  ]}
                >
                  Left
                </Text>
                <Text
                  style={[
                    {
                      fontSize: width * 0.08,
                      color: theme.h2Color,
                      fontWeight: 500,
                      marginTop: -5,
                    },
                  ]}
                >
                  {goal.calories - progress.calories} Cal
                </Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View
          style={[styles.container, { flexDirection: 'row', marginTop: -20 }]}
        >
          <View style={[styles.container, { width: '33%' }]}>
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}
            >
              Protein
            </Text>
            <ProgressBar.Bar
              progress={progress.protein / goal.protein}
              color={theme.Progress2}
              width={width * 0.25}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {progress.protein.toFixed(2)} / {goal.protein} g
            </Text>
          </View>
          <View style={[styles.container, { width: '33%' }]}>
            <Text
              style={[{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }]}
            >
              Carbs
            </Text>
            <ProgressBar.Bar
              progress={progress.carbs / goal.carbs}
              color={theme.Progress2}
              width={width * 0.25}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {progress.carbs.toFixed(2)} / {goal.carbs} g
            </Text>
          </View>
          <View style={[styles.container, { width: '33%' }]}>
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}
            >
              Fat
            </Text>
            <ProgressBar.Bar
              progress={progress.fat / goal.fat}
              color={theme.Progress2}
              width={width * 0.25}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {progress.fat.toFixed(2)} / {goal.fat} g
            </Text>
          </View>
        </View>
        <Table />
      </View>
      <Footer />
    </>
  );
}

export default Main;
