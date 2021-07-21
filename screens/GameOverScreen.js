import React from 'react';
import { Text, View,StyleSheet,Button,Image,Dimensions,ScrollView } from 'react-native';


import Colors from '../constants/Colors';
import defaultStyles from '../constants/default-styles';
import MyButton from '../components/MyButton';

const GameOverScreen=(props)=>{
    return(
        <ScrollView>
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Game Over!!</Text>
            <View style={styles.imageContainer}>
                <Image fadeDuration={1000} style={styles.image} source={require('../assets/success.png')} resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}> 
                <Text style={styles.resultText} >Your Phone took 
                    <Text style={{color:Colors.primary}}> {props.totalRounds}</Text> Guesses to Guess The Number 
                    <Text style={{color:Colors.primary}}> {props.userChoice}</Text>
                </Text>
            </View>
            
            <MyButton onPress={props.newGameHandler}>NEW GAME</MyButton>
        </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
    },
    imageContainer:{
        height:Dimensions.get('window').width*0.7, //70% OF THE AVLAIBLE WIDTH
        width:Dimensions.get('window').width*0.7,
        borderRadius:Dimensions.get('window').width*0.7/2,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height/40,
    },
    resultContainer:{
        marginVertical:20,
    },
    resultText:{
        textAlign:'center',
        fontFamily:'open-sans-bold'
    },
    image:{
        height:'100%',
        width:'100%',
    }
})

export default GameOverScreen;
