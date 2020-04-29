import React from 'react'

import { View, StyleSheet, Text, Image,TouchableOpacity } from 'react-native'

export default class Selectlanguage extends React.Component {


render(){
    return (
                <View>
                    <TouchableOpacity>
                        <Image source={require('../assets/saudi.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image />
                    </TouchableOpacity>
                </View>

    );
}

}