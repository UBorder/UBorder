import React from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the first screen</Text>
      <TouchableOpacity>
      <Button title="click"></Button>
      </TouchableOpacity>
    </View>
  );
=======
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
>>>>>>> 138b195a90624fbfd3c99c2c3bfd941fae934acd
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
