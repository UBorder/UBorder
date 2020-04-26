import React from 'react';
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
