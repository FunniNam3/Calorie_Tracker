import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Main from './Main_Page/Main';
import { ThemeProvider, themes } from './Themes';
import { GoalProvider, ProgressProvider } from './Track';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddStuff } from './AddStuff/AddStuff';
import {
  createTables,
  deleteFoodItem,
  deleteFoodTable,
  deleteMealTable,
  getDBConnection,
} from './db-functions';
import { List } from './Meals/List';
import { Settings } from './Settings/Settings';

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
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const db = await getDBConnection();
        createTables(db);
      } catch (error) {
        console.error('Failed to create Tables', error);
      }
    };

    loadMeals();
  }, []);

  return (
    <ThemeProvider>
      <GoalProvider>
        <ProgressProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{ animation: 'fade_from_bottom' }}
              />
              <Stack.Screen
                name="AddMeal"
                component={AddStuff}
                options={{ animation: 'fade_from_bottom' }}
              />
              <Stack.Screen
                name="Meals"
                component={List}
                options={{ animation: 'slide_from_left' }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ animation: 'slide_from_right' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProgressProvider>
      </GoalProvider>
    </ThemeProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
