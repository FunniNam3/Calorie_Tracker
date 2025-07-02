import React, { useState } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Button,
  Alert,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import { Circle } from 'react-native-svg';
import * as db from './db-functions';

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

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [calGoal, setCalGoal] = useState(2000);
  const [calProgress, setCalProgress] = useState(500);
  const [protGoal, setProtGoal] = useState(90);
  const [protProgress, setProtProgress] = useState(30);
  const [fibGoal, setfibGoal] = useState(25);
  const [fibProgress, setfibProgress] = useState(10);
  const [carbGoal, setcarbGoal] = useState(230);
  const [carbProgress, setcarbProgress] = useState(150);

  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toLocaleDateString();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#FFE9EF',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
      ]}
    >
      <View style={[styles.container, { marginTop: 100 }]}>
        <Text
          style={[
            isDarkMode ? styles.progress_dark : styles.progress_light,
            { fontSize: 60, marginBottom: 20, fontWeight: 700 },
          ]}
        >
          {' '}
          {formattedDate}
        </Text>
        <AnimatedCircularProgress
          size={300}
          width={15}
          fill={(calProgress / calGoal) * 100}
          tintColor="#FF9CB5"
          backgroundColor="#FC809F"
          padding={10}
          arcSweepAngle={270}
          rotation={225}
          lineCap="round"
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="14" fill="#FF9CB5" />
          )}
        >
          {() => (
            <>
              <Text
                style={[
                  isDarkMode ? styles.progress_dark : styles.progress_light,
                  { fontSize: 60 },
                ]}
              >
                {calProgress}
              </Text>
              <Text
                style={[{ fontSize: 30, color: '#FFBCCD', fontWeight: 500 }]}
              >
                Left
              </Text>
              <Text
                style={[
                  {
                    fontSize: 40,
                    color: '#FFBCCD',
                    fontWeight: 500,
                    marginTop: -5,
                  },
                ]}
              >
                {calGoal - calProgress}
              </Text>
            </>
          )}
        </AnimatedCircularProgress>
      </View>
      <View
        style={[
          styles.container,
          { display: 'flex', flexDirection: 'row', gap: 20 },
        ]}
      >
        <View style={styles.container}>
          <Text
            style={[
              isDarkMode ? styles.progress_dark : styles.progress_light,
              { fontSize: 20, marginBottom: 5 },
            ]}
          >
            Protein
          </Text>
          <Progress.Bar
            progress={protProgress / protGoal}
            color="#FC809F"
            width={100}
          />
          <Text
            style={[
              isDarkMode ? styles.progress_dark : styles.progress_light,
              { fontSize: 20, marginTop: 4 },
            ]}
          >
            {protProgress} / {protGoal} g
          </Text>
        </View>
        <View style={styles.container}>
          <Text
            style={[
              isDarkMode ? styles.progress_dark : styles.progress_light,
              { fontSize: 20, marginBottom: 5 },
            ]}
          >
            Carbs
          </Text>
          <Progress.Bar
            progress={carbProgress / carbGoal}
            color="#FC809F"
            width={100}
          />
          <Text
            style={[
              isDarkMode ? styles.progress_dark : styles.progress_light,
              { fontSize: 20, marginTop: 4 },
            ]}
          >
            {carbProgress} / {carbGoal} g
          </Text>
        </View>
        <View style={styles.container}>
          <Text
            style={[
              isDarkMode ? styles.progress_dark : styles.progress_light,
              { fontSize: 20, marginBottom: 5 },
            ]}
          >
            Fiber
          </Text>
          <Progress.Bar
            progress={fibProgress / fibGoal}
            color="#FC809F"
            width={100}
          />
          <Text
            style={[
              isDarkMode ? styles.progress_dark : styles.progress_light,
              { fontSize: 20, marginTop: 4 },
            ]}
          >
            {fibProgress} / {fibGoal} g
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress_dark: {
    color: '#FF9CB5',
  },
  progress_light: {
    color: 'grey',
  },
});

export default App;
