import React from 'react';
import { StyleSheet } from 'react-native';
import Main from './Main';

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

function App() {
  return <Main />;
}

export default App;
