import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';

export default function FirstScreen({ navigation }) {
    const [value, onChangeText] = React.useState('Name');
    async function storeName(){
        await AsyncStorage.setItem("username", value);
        globalThis.username=value;
        navigation.navigate("HomeScreen");
    }
 
    return (
        <View style={styles.container}>
            <Text>Please enter your name</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Button title="Submit" onPress={storeName}/>
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
});
