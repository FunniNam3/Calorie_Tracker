import React from 'react';
import { StyleSheet } from 'react-native';
import Main from './Main_Page/Main';
import { ThemeProvider } from './Themes';
import { GoalProvider, ProgressProvider } from './Track';
import { Footer } from './Footer/Foot';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddMeal } from './AddMeal/AddMeal';

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

export type RootStackParamList = {
  Main: {};
  AddMeal: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <ThemeProvider>
      <GoalProvider>
        <ProgressProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="AddMeal" component={AddMeal} />
            </Stack.Navigator>
            <Footer />
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
