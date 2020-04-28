import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Button, Platform, StyleSheet, View, Text, Dimensions, processColor } from 'react-native';
// import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';


export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState( {"timestamp":1587559966314,"mocked":false,"coords":{"altitude":0,"heading":313.141845703125,"longitude":0,"speed":0.36433911323547363,"latitude":0,"accuracy":25.93199920654297}});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);


      console.log("function called")
      const latitude = location.coords.latitude; // you can update it with user's latitude & Longitude
      const longitude = location.coords.longitude;
      let radMetter = 0.4* 1000; // Search withing 2 KM radius
      console.log('key:'+process.env.API_KEY)
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter +'&key=' + 'AIzaSyALZhKDkALvKuyywExFxxFXro6KS5qyxg8'
   
      fetch(url)
       .then(resp => resp.json())
        .then(res => {
          console.log("unfiltered response")
          // console.log(res)
          var places = [] // This Array WIll contain locations received from google
          for (let googlePlace of res.results) {
            var place = {}
            var lat = googlePlace.geometry.location.lat;
            var lng = googlePlace.geometry.location.lng;
            var coordinate = {
              latitude: lat,
              longitude: lng,
            }
  
            var gallery = []
   
  
            place['placeTypes'] = googlePlace.types
            place['coordinate'] = coordinate
            place['placeId'] = googlePlace.place_id
            place['placeName'] = googlePlace.name
            // place['gallery'] = gallery
            place['neighborhood']=googlePlace.plus_code?googlePlace.plus_code.compound_code:0
            if(place['neighborhood']!==0){
              place['neighborhood']=place['neighborhood'].split(" ")
              place['neighborhood'].splice(0,1)
              place['neighborhood']=place['neighborhood'].join("")
              place['neighborhood']=place['neighborhood'].split(",")[0]
            }
            
          //  console.log("--------------------------------------")
            console.log(place['neighborhood'])
            places.push(place);
          }
          // console.log('places:')
          // console.log(places)
          // console.log(places.length)
          // console.log(places[1].placeName)
          // global.placeName=places[1].placeName
          //Do your work here with places Array
        })
        .catch(error => {
          console.log("error:")
          console.log(error);
        });
  
    })();

 
  },[]);

  
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    //   <Text>Home Screen {global.placeName}</Text>
    //   <Text>Hello {global.username}</Text>
    //   <Button
    //     title="Ask Someone"
    //     onPress={() => navigation.navigate('Chatbot')}
    //   />


    // </View>

    <View style={styles.container}>
      <MapView style={styles.mapStyle} region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.005,
      }} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

