import React from 'react'
import { View, StatusBar, ActivityIndicator, AsyncStorage, StyleSheet, Text } from 'react-native'

export default class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrap();
    }

    _bootstrap = async () => {

        const username = await AsyncStorage.getItem('username');
<<<<<<< HEAD
        this.props.navigation.navigate(username ? 'HomeScreen' : 'HomeScreen');
=======
        global.username=username
        this.props.navigation.navigate(username ? 'FirstScreen' : 'FirstScreen');
>>>>>>> 138b195a90624fbfd3c99c2c3bfd941fae934acd
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});