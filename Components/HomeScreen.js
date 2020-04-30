import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { FAB } from 'react-native-paper';

import {
  Button, Platform, StyleSheet, View, Text, Dimensions, processColor, Image, TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import BottomSheet from 'reanimated-bottom-sheet'
import config from '../config'
export default function HomeScreen({ navigation }) {

  const [location, setLocation] = useState({ "timestamp": 1587559966314, "mocked": false, "coords": { "altitude": 0, "heading": 313.141845703125, "longitude": 0, "speed": 0.36433911323547363, "latitude": 0, "accuracy": 25.93199920654297 } });
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState(null);



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      // location = { "timestamp": 1587559966314, "mocked": false, "coords": { "altitude": 0, "heading": 313.141845703125, "longitude": 39.2526234, "speed": 0.36433911323547363, "latitude": 21.6035169, "accuracy": 25.93199920654297 } }
      setLocation(location);

      //first search within a small radius to identigy the user's neighborhood
      // console.log("function called")
      let latitude = location.coords.latitude; // you can update it with user's latitude & Longitude
      let longitude = location.coords.longitude;
      let radMetter = 0.4 * 1000; // Search withing 2 KM radius
      let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + config.API_KEY
      fetch(url)
        .then(resp => resp.json())
        .then(res => {

          let userNeighborhood = res.results[1].plus_code ? res.results[1].plus_code.compound_code : 0
          if (userNeighborhood) {
            userNeighborhood = userNeighborhood.split(" ")
            userNeighborhood.splice(0, 1)
            userNeighborhood = userNeighborhood.join("")
            userNeighborhood = userNeighborhood.split(",")[0]
          }
          console.log("userNeighborhood: " + userNeighborhood)

          //now search on a bigger radius to find stores

          console.log("function called")
          latitude = location.coords.latitude; // you can update it with user's latitude & Longitude
          longitude = location.coords.longitude;
          radMetter = 2 * 1000; // Search withing 2 KM radius
          url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=' + config.API_KEY

          fetch(url)
            .then(resp => resp.json())
            .then(res => {
              console.log("unfiltered response")
              // console.log("response:")
              // console.log(res)
              // console.log("next page token: "+res.next_page_token)
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
                place['neighborhood'] = googlePlace.plus_code ? googlePlace.plus_code.compound_code : 0
                if (place['neighborhood'] !== 0) {
                  place['neighborhood'] = place['neighborhood'].split(" ")
                  place['neighborhood'].splice(0, 1)
                  place['neighborhood'] = place['neighborhood'].join("")
                  place['neighborhood'] = place['neighborhood'].split(",")[0]
                }

                //  console.log("--------------------------------------")
                // console.log(place['neighborhood'])
                places.push(place);
              }


              if (res.next_page_token) {
                let requestPage = setInterval(request, 1500)
                function request() {
                  url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'key=' + config.API_KEY + '&pagetoken=' + res.next_page_token

                  fetch(url)
                    .then(resp => resp.json())
                    .then(res => {
                      console.log("fetching second page")
                      // console.log(res)
                      // console.log(res.results)
                      // console.log("response:")
                      // console.log(res)
                      // console.log("next page token: "+res.next_page_token)
                      // var places = [] // This Array WIll contain locations received from google
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
                        place['neighborhood'] = googlePlace.plus_code ? googlePlace.plus_code.compound_code : 0
                        if (place['neighborhood'] !== 0) {
                          place['neighborhood'] = place['neighborhood'].split(" ")
                          place['neighborhood'].splice(0, 1)
                          place['neighborhood'] = place['neighborhood'].join("")
                          place['neighborhood'] = place['neighborhood'].split(",")[0]
                        }

                        //  console.log("--------------------------------------")
                        // console.log(place['neighborhood'])
                        places.push(place);
                      }
                      // if(res.next_page_token){



                      // }
                      if (res.next_page_token) {
                        let requestPage2 = setInterval(request, 1500)
                        function request() {
                          url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'key=' + config.API_KEY + '&pagetoken=' + res.next_page_token

                          fetch(url)
                            .then(resp => resp.json())
                            .then(res => {
                              console.log("fetching second page")
                              // console.log(res)
                              // console.log(res.results)
                              // console.log("response:")
                              // console.log(res)
                              // console.log("next page token: "+res.next_page_token)
                              // var places = [] // This Array WIll contain locations received from google
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
                                place['neighborhood'] = googlePlace.plus_code ? googlePlace.plus_code.compound_code : 0
                                if (place['neighborhood'] !== 0) {
                                  place['neighborhood'] = place['neighborhood'].split(" ")
                                  place['neighborhood'].splice(0, 1)
                                  place['neighborhood'] = place['neighborhood'].join("")
                                  place['neighborhood'] = place['neighborhood'].split(",")[0]
                                }

                                //  console.log("--------------------------------------")
                                // console.log(place['neighborhood'])
                                places.push(place);
                              }
                              // if(res.next_page_token){



                              // }
                              if (res.next_page_token) {


                              }


                              // console.log('places:')
                              // console.log(places)
                              // console.log(places.length)
                              // console.log(places[1].placeName)
                              // global.placeName=places[1].placeName
                              //Do your work here with places Array
                              // console.log("number of elemnts:" + places.length)
                              places.forEach(item => console.log(item['placeName']))
                              places = places.filter(item => item['neighborhood'] === userNeighborhood && !(item['placeTypes'].includes("school") || item['placeTypes'].includes("mosque") || item['placeTypes'].includes("place_of_worship") || item['placeName'].includes("جامع") || item['placeName'].includes("مسجد")))
                              console.log("number of elemnts:" + places.length)
                              setPlaces(places)

                            })
                            .catch(error => {
                              console.log("error:")
                              console.log(error);
                            });
                          clearInterval(requestPage2);

                        }

                      }


                      // console.log('places:')
                      // console.log(places)
                      // console.log(places.length)
                      // console.log(places[1].placeName)
                      // global.placeName=places[1].placeName
                      //Do your work here with places Array
                      // console.log("number of elemnts:" + places.length)
                      places.forEach(item => console.log(item['placeName']))
                      places = places.filter(item => item['neighborhood'] === userNeighborhood)
                      console.log("number of elemnts:" + places.length)
                      setPlaces(places)
                      console.log("places final:")
                      console.log(places)

                    })
                    .catch(error => {
                      console.log("error:")
                      console.log(error);
                    });
                  clearInterval(requestPage);

                }
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




        })
        .catch(error => {
          console.log("error:")
          console.log(error);
        });



    })();


  }, []);
  // console.log('places:')
  // console.log(places)
  bs = React.createRef()
  let curfew_start = 17
  let curfew_end = 9
  
  var today = new Date();
  var time = today.getHours()
  renderInner = () => {
   
    let content = time < curfew_start && time > curfew_end ? places.map((ele, i) =>
      <TouchableOpacity style={styles.panelButton} style={styles.panelButton} key={i} onPress={() => {
        console.log("--------------------------");
        console.log(ele);
        console.log(ele); console.log("--------------------------");
        console.log(ele['placeTypes'].includes("mosque") || ele['placeTypes'].includes("place_of_worship"));
        setDestination(ele.coordinate); this.bs.current.snapTo(1)
      }} >
        <Text style={styles.panelButtonTitle} >{ele.placeName}</Text>
      </TouchableOpacity>) :
      <View style={styles.panelButtonDanger}>
        <Text style={styles.panelButtonTitle}>You are currently in curfew hours, you can't visit any places at the moment</Text>
      </View>

    return (
      <View style={styles.panel} >
        <Text style={styles.panelTitle} >Available stores</Text>
        <Text style={styles.panelSubtitle}>
          Swipe up to see the stores you can visit now
        </Text>


        {content}

        {/* <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Directions</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Search Nearby</Text>
      </View> */}

      </View>
    )
  }


  const directions = destination ? <MapViewDirections
    origin={location.coords}
    destination={destination}
    apikey={config.API_KEY}
    strokeWidth={3}
    strokeColor="#000"
  /> : <MapViewDirections
      origin={location.coords}
      destination={destination}
      apikey={config.API_KEY}
      strokeWidth={3}
      strokeColor="#FFF"
    />


  return (


    <View style={styles.container}>

      <BottomSheet
        ref={bs}
        snapPoints={['100%', 100, 200]}
        renderContent={renderInner}
        initialSnap={1}
      />
      <TouchableWithoutFeedback >
        <MapView style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.005,
          }}
        >
          {directions}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You"
            description=""
          />
          {
            time < curfew_start && time > curfew_end ? places.map((item, i) => <Marker
              coordinate={item.coordinate}
              title={item.placeName}
              key={i}
              pinColor='green'
            />):<View></View>
          }

        </MapView>
      </TouchableWithoutFeedback>
      <FAB
        style={styles.fab}
        small
        label="Ask Meznah"
        icon="comment-question-outline"
        onPress={() => {
          console.log("hello");
          navigation.navigate('Select language')
        }}
      />
    </View>


  );
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {

    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonDanger: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#c70038',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
    backgroundColor: 'black'
  },
})
