import React,{useState,useEffect} from 'react';
import { Text,View,Keyboard, StyleSheet, Button,TouchableWithoutFeedback,Alert,Dimensions,ScrollView } from 'react-native';



import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';

const StartScreenGame=(props)=>{
    const [enteredInput,setEnteredInput] = useState('');
    const [selectedNumber,setSelectedNumber] = useState();
    const [userConfirmed,setUserConfirmed]= useState(false);

    const [buttonWidth,setButtonWidth] = useState(Dimensions.get('window').width/4);

    useEffect(()=>{
        const updateLayout=()=>{
            setButtonWidth(Dimensions.get('window').width/4);
        }
    
        Dimensions.addEventListener('change',updateLayout);
        //cleam up the listener before useEffect runs again
        return()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }

    })


    

    const inputHandler=(enteredText)=>{
        setEnteredInput(enteredText.replace(/[^0-9]/g,''));
    };

    const resetButtonHandler=()=>{
        setEnteredInput('');
        setUserConfirmed(false);
    }

    const confirmButtonHandler=()=>{
        let chosenNumber=parseInt(enteredInput);
        if( isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99 ){
            Alert.alert("Invalid Input","Please enter a number between 1-99",[{text:"Okay",style:'destructive',onPress: resetButtonHandler}]);
            return;
        }
        setUserConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredInput('');
        Keyboard.dismiss();
    }

    return(
        <ScrollView>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
            <View style={styles.startScreen}> 
            <Text style={styles.title} >Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={defaultStyles.bodyText}>Select A Number</Text>
                    <Input style={styles.input} blurOnSubmit autoCapitialize='none' autoCorrect={false} keyboardType="numeric" maxLength={2} onChangeText={inputHandler} value={enteredInput}/>
                    {/* <TextInput placeholder="Enter the Number"/> */}
                    <View style={styles.buttonContainer}>
                        <View style={{width:buttonWidth}}><Button title="Reset" color={Colors.accent} onPress={resetButtonHandler}/></View>
                        <View style={{width:buttonWidth}}><Button title="Confirm" color={Colors.primary} onPress={confirmButtonHandler}/></View>
                    </View>
                </Card>
                {userConfirmed&&
                <Card style={styles.summaryConatiner}>
                    <Text style={defaultStyles.bodyText}>You Have Selected!</Text>
                    <NumberContainer>{selectedNumber}</NumberContainer>

                    <Button  title="START GAME" onPress={()=>props.checkUserNumber(selectedNumber)}/>
                    
                </Card>
                }
            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        
    )
}

const styles=StyleSheet.create({
    startScreen:{
        flex:1,
        padding:10,
        alignItems:'center',
        fontSize:30,
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold',
    },
    inputContainer:{
        width:'80%',
        minWidth:300,
        maxWidth:'95%',
        alignItems:'center',
    },
    buttonContainer:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:15,
    },
    // button:{
    //     // width:100,
    //     width:Dimensions.get('window').width/4
    // },
    input:{
        width:100,
        margin:5,
        textAlign:'center'
    },
    summaryConatiner:{
        marginTop:20,
    }
})

export default StartScreenGame;