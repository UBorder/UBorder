import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import {Image} from 'react-native' ; 

export default function FirstScreen({ navigation }) {
    const [value, onChangeText] = React.useState('Name');
    async function storeName(){
        await AsyncStorage.setItem("username", value);
        globalThis.username=value;
        navigation.navigate("HomeScreen");
    }
 
    return (
        <View style={styles.container}>
        <View style={styles.LogoBorder}>
            <Image style={styles.Logo} source={require('../assets/logo.png')} />
        </View>
        <Text style={styles.textM}>Please Enter Your Name</Text>
         <TextInput
             style={styles.inputName}
             onChangeText={text => onChangeText(text)}
             value={value}
        />
        <View style={styles.buttonS}>
             <Button title="Submit" onPress={storeName}/>
        </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#cce6ff',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Logo:{
        width:250,
        height:250,
        padding:"30%",
        
    },

    LogoBorder: {
        borderWidth:2,
        borderColor: "#508eb4",
        borderRadius: 70,
        borderStyle: "dotted",
    },

    textM: {
        color: '#004080',
        //backgroundColor: "#fff",
        paddingTop: "10%",
        paddingBottom: "2%",
        fontSize: 24,
        fontWeight: "bold",
      },
    inputName: { 
        height: 40,
        width: 200, 
        backgroundColor: "#fff", 
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#b3d9ff",
        padding: "2%",
    },
    buttonS: {
       // paddingTop: "20%",
       backgroundColor: "#e6f2ff",
      // alignItems: 'left',
      // justifyContent: 'b',
       marginVertical: 8,
       borderColor: "#99ccff",
       borderWidth: 2,
       //borderWidth: StyleSheet.absoluteFill,
       borderRadius: 20,
    },
});
