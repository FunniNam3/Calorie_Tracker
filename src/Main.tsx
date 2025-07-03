import React, { useState, useContext } from 'react';
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
import { themes, ThemeContext, ThemeProvider } from './Themes';
import * as db from './db-functions';

// So I dont forget how to write an alert for later
//////////////////////////////////////////////////////////////////////
// const showAlert = () => {
//   Alert.alert(
//     'Alert Title',
//     'This is the alert message.',
//     [
//       {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//       },
//       { text: 'OK', onPress: () => console.log('OK Pressed') },
//     ],
//     { cancelable: true },
//   );
// };
//////////////////////////////////////////////////////////////////////

function Main() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useContext(ThemeContext);

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
    <ThemeProvider>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundColor,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          },
        ]}
      >
        <View style={[styles.container, { marginTop: 100 }]}>
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
            fill={(calProgress / calGoal) * 100}
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
                <Text style={{ fontSize: 60, color: theme.h1Color }}>
                  {calProgress}
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
                  {calGoal - calProgress}
                </Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={[styles.container, { flexDirection: 'row', gap: 20 }]}>
          <View style={styles.container}>
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}
            >
              Protein
            </Text>
            <Progress.Bar
              progress={protProgress / protGoal}
              color={theme.Progress2}
              width={100}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {protProgress} / {protGoal} g
            </Text>
          </View>
          <View style={styles.container}>
            <Text
              style={[{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }]}
            >
              Carbs
            </Text>
            <Progress.Bar
              progress={carbProgress / carbGoal}
              color={theme.Progress2}
              width={100}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {carbProgress} / {carbGoal} g
            </Text>
          </View>
          <View style={styles.container}>
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 5 }}
            >
              Fiber
            </Text>
            <Progress.Bar
              progress={fibProgress / fibGoal}
              color={theme.Progress2}
              width={100}
            />
            <Text
              style={{ fontSize: 20, color: theme.h1Color, marginBottom: 4 }}
            >
              {fibProgress} / {fibGoal} g
            </Text>
          </View>
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress_dark: {
    color: 'grey',
  },
  progress_light: {
    color: '#FF9CB5',
  },
});

export default Main;
