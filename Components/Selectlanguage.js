import React,{Component} from 'react'
import { View, StyleSheet,Button ,Text, Image,TouchableOpacity } from 'react-native'

 class Selectlanguage extends Component {


render(){
    return (
                <View style={styles.button}>
                    <Button  onPress={()=>{this.props.navigation.navigate("Meznah")}} title="English " />
                    <View style={styles.button1}></View>
                    <Button onPress={()=>{this.props.navigation.navigate("ArMeznah")}} title="Arabic" />
                </View>



    );
    
}

}
const styles = StyleSheet.create({
    button:{
        marginTop: "20%",
        justifyContent:"center"
    },
    button1:{
        marginTop: "10%",
        justifyContent:"center"
    }
})
  
export default Selectlanguage;