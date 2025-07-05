import React, { useState } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import { Circle } from 'react-native-svg';
import { useTheme } from '../Themes';
import { useGoal, useProgress } from '../Track';
import * as db from '../db-functions';
import { Table } from './Table';
import { styles } from '../App';

// This is the main home page

function Main() {
  const isDarkMode = useColorScheme() === 'dark';
  const { theme } = useTheme();
  const { goal } = useGoal();
  const { progress, setProgress } = useProgress();

  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toLocaleDateString();

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
        },
      ]}
    >
      <View style={[styles.container, { marginTop: 50 }]}>
        <Text
          style={{
            fontSize: 60,
            marginBottom: 20,
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
            <Circle cx={center.x} cy={center.y} r="14" fill={theme.Progress1} />
          )}
        >
          {() => (
            <>
              <Text style={{ fontSize: 60, color: theme.h1Color }}>
                {progress.calories}
              </Text>
              <Text
                style={[
                  { fontSize: 30, color: theme.h2Color, fontWeight: 500 },
                ]}
              >
                Left
              </Text>
              <Text
                style={[
                  {
                    fontSize: 40,
                    color: theme.h2Color,
                    fontWeight: 500,
                    marginTop: -5,
                  },
                ]}
              >
                {goal.calories - progress.calories}
              </Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>
      <View
        style={[
          styles.container,
          { flexDirection: 'row', gap: 20, marginTop: -20 },
        ]}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}>
            Protein
          </Text>
          <Progress.Bar
            progress={progress.protein / goal.protein}
            color={theme.Progress2}
            width={100}
          />
          <Text style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}>
            {progress.protein} / {goal.protein} g
          </Text>
        </View>
        <View style={styles.container}>
          <Text
            style={[{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }]}
          >
            Carbs
          </Text>
          <Progress.Bar
            progress={progress.carbs / goal.carbs}
            color={theme.Progress2}
            width={100}
          />
          <Text style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}>
            {progress.carbs} / {goal.carbs} g
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}>
            Fiber
          </Text>
          <Progress.Bar
            progress={progress.fiber / goal.fiber}
            color={theme.Progress2}
            width={100}
          />
          <Text style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}>
            {progress.fiber} / {goal.fiber} g
          </Text>
        </View>
      </View>
      <Table />
    </View>
  );
}

export default Main;
