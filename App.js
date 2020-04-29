import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen.js';
import Chatbot from './Components/Chatbot';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, createSwitchNavigator, StackNavigator } from "react-navigation";
import FetchData from './Components/FetchData.js';
import FirstScreen from './Components/FirstScreen.js';
import Selectlanguage from './Components/Selectlanguage';
import { Provider as PaperProvider } from 'react-native-paper';

//import { Provider as PaperProvider } from 'react-native-paper';

//Stack navigation
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}} />
      <Stack.Screen name="Meznah" component={Chatbot} />
      <Stack.Screen name="Select language" component={Selectlanguage} options={{headerShown: false}}/>
      
    </Stack.Navigator>
  );
}


class HomeStack extends React.Component {

  render() {
    return (
      <PaperProvider>
        <MyStack />
      </PaperProvider>
    );
  }

}


//primary switch navigation 
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Starter: FetchData,
      HomeScreen: HomeStack,
      FirstScreen: FirstScreen,
      Chatbot: Chatbot
    },
    {
      initialRouteName: "Starter"
    }
  )
);

export default function App() {

  return (
    <NavigationContainer>
      <AppContainer />

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
