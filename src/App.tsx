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
// import SQLite from 'react-native-sqlite-storage';

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
    <View style={[styles.container, { flex: 1 }]}>
      <View style={styles.container}>
        <AnimatedCircularProgress
          size={300}
          width={15}
          fill={(calProgress / calGoal) * 100}
          tintColor="#00d0ee"
          backgroundColor="#3d5875"
          padding={10}
          arcSweepAngle={270}
          rotation={225}
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="10" fill="#00f0ff" />
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
              <Text style={[{ fontSize: 30, color: 'grey' }]}>Left</Text>
              <Text style={[{ fontSize: 40, color: 'grey', marginTop: -5 }]}>
                {calGoal - calProgress}
              </Text>
            </>
          )}
        </AnimatedCircularProgress>

        <Button title="PRESS" onPress={showAlert} />
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
            Protien
          </Text>
          <Progress.Bar
            progress={protProgress / protGoal}
            color="#00d0ee"
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
            color="#00d0ee"
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
            color="#00d0ee"
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
    color: 'white',
  },
  progress_light: {
    color: 'grey',
  },
});

export default App;
