import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';

class Selectlanguage extends Component {


    render() {
        return (
            <View style={styles.background}>
                {/* <Button onPress={() => { this.props.navigation.navigate("Meznah") }} title="English " />
                <View style={styles.button1}></View>
                <Button onPress={() => { this.props.navigation.navigate("ArMeznah") }} title="Arabic" /> */}
                <Image style={styles.image} source={require('../assets/SophiaWithout.png')} />
                <Button mode="contained" onPress={() => { this.props.navigation.navigate("Meznah") }} style={styles.button1}>
                    English
                </Button>
                <Button mode="contained" onPress={() => { this.props.navigation.navigate("ArMeznah") }} style={styles.button2}>
                    العربية
                </Button>
            </View>



        );

    }

}
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f3e496',
        justifyContent: "center",
        flex: 1,
        alignItems: 'center'

    },
    image: {
        width: 300,
        height: 300,
    },
    button1: {
        
        marginVertical: 5,
        marginTop: 0,
        paddingTop:0,
        justifyContent: "center",
        backgroundColor: 'black',
        color: 'white',
        width: '70%'
    },
    button2: {
        marginVertical: 5,
        justifyContent: "center",
        backgroundColor: 'black',
        color: 'white',
        width: '70%'
    }
})

export default Selectlanguage;