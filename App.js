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
import axios from 'axios'

//Stack navigation
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
    </Stack.Navigator>
  );
}


class HomeStack extends React.Component {

  render() {
    return (
      <MyStack />
    );
  }

}


//primary switch navigation 
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Starter: FetchData,
      HomeScreen: HomeStack,
      FirstScreen: FirstScreen
    },
    {
      initialRouteName: "Starter"
    }
  )
);

export default function App() {



  // useEffect(() => {
  //   console.log("function called")
  //   const latitude = 21.6035169; // you can update it with user's latitude & Longitude
  //   const longitude = 39.2526234;
  //   let radMetter = 2 * 1000; // Search withing 2 KM radius

  //   const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter +'&language=en'+'&key=' + 'AIzaSyA8T_Kl0AIGpKN-9vqEPbZodiZDktG1KjY'

  //   fetch(url)
  //    .then(resp => resp.json())
  //     .then(res => {
  //       // console.log(res)
  //       var places = [] // This Array WIll contain locations received from google
  //       for (let googlePlace of res.results) {
  //         var place = {}
  //         var lat = googlePlace.geometry.location.lat;
  //         var lng = googlePlace.geometry.location.lng;
  //         var coordinate = {
  //           latitude: lat,
  //           longitude: lng,
  //         }

  //         var gallery = []


  //         place['placeTypes'] = googlePlace.types
  //         place['coordinate'] = coordinate
  //         place['placeId'] = googlePlace.place_id
  //         place['placeName'] = googlePlace.name
  //         place['gallery'] = gallery

  //         places.push(place);
  //       }
  //       console.log('places:')
  //       console.log(places)
  //       console.log(places.length)
  //       console.log(places[1].placeName)
  //       global.placeName=places[1].placeName
  //       //Do your work here with places Array
  //     })
  //     .catch(error => {
  //       console.log("error:")
  //       console.log(error);
  //     });


  // }, [])
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

