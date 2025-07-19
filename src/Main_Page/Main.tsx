import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
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
        acc.fiber += curr.fiber;
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
        fiber: 0,
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
              fontSize: 60,
              fontWeight: 700,
              color: theme.h1Color,
            }}
          >
            {' '}
            {formattedDate}
          </Text>
          <AnimatedCircularProgress
            size={300}
            width={15}
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
                r="14"
                fill={theme.Progress1}
              />
            )}
          >
            {() => (
              <>
                <Text
                  style={{
                    fontSize: 40,
                    color: theme.h1Color,
                    fontWeight: 500,
                  }}
                >
                  {progress.calories} kcal
                </Text>
                <Text
                  style={[
                    { fontSize: 25, color: theme.h2Color, fontWeight: 500 },
                  ]}
                >
                  Left
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 30,
                      color: theme.h2Color,
                      fontWeight: 500,
                      marginTop: -5,
                    },
                  ]}
                >
                  {goal.calories - progress.calories} kcal
                </Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View
          style={[
            styles.container,
            { flexDirection: 'row', gap: 10, marginTop: -20 },
          ]}
        >
          <View style={styles.container}>
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}
            >
              Protein
            </Text>
            <ProgressBar.Bar
              progress={progress.protein / goal.protein}
              color={theme.Progress2}
              width={100}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {progress.protein.toFixed(2)} / {goal.protein} g
            </Text>
          </View>
          <View style={styles.container}>
            <Text
              style={[{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }]}
            >
              Carbs
            </Text>
            <ProgressBar.Bar
              progress={progress.carbs / goal.carbs}
              color={theme.Progress2}
              width={100}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {progress.carbs.toFixed(2)} / {goal.carbs} g
            </Text>
          </View>
          <View style={styles.container}>
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}
            >
              Fiber
            </Text>
            <ProgressBar.Bar
              progress={progress.fiber / goal.fiber}
              color={theme.Progress2}
              width={100}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {progress.fiber.toFixed(2)} / {goal.fiber} g
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
