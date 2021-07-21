import React,{useState,useRef,useEffect} from 'react';
import { Text,View,StyleSheet, Button, Alert,ScrollView, Dimensions } from 'react-native';
import Card from '../components/Card';
import MyButton from '../components/MyButton';
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';

import {Ionicons} from '@expo/vector-icons';

const generateRandomNumber=(min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const randomNumber=Math.floor(Math.random()*(max-min))+min;
    if(randomNumber === exclude){
        return generateRandomNumber(min,max,exclude);
    }else{
        return randomNumber;
    }
};

const renderListItem=(value,numOfRounds)=>(
    <View key={value} style={styles.listItem}>
        <Text style={defaultStyles.bodyText}>#{numOfRounds}</Text>
        <Text style={defaultStyles.bodyText}>{value}</Text>
    </View>
)

const GameScreen=(props)=>{
    const initialGuess=generateRandomNumber(1,100,props.userChoice)
    const [computerGuess,setComputerGuess] = useState(initialGuess); 
    const [pastGuess,setPastGuess] = useState([initialGuess]);
    const [availableDeviceHeight,setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    
    const {gameOverHandler,userChoice}=props;

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change',updateLayout);

        return()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    })

    useEffect(()=>{
        if(computerGuess === userChoice){
            gameOverHandler(pastGuess.length);
        }
    },[gameOverHandler,userChoice,computerGuess]);



    const nextGuessHandler=(direction)=>{
        if( (direction === 'lower' && computerGuess < userChoice) || (direction ==='higher' && computerGuess > userChoice)){
            Alert.alert("Dont Lie!!!","Please provide a valid Hint",[{text:'Sorry!',style:'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current=computerGuess;
        }else{
            currentLow.current=computerGuess+1;
        }
        const newComputerGuess=generateRandomNumber(currentLow.current,currentHigh.current,computerGuess);
        setComputerGuess(newComputerGuess);
        // setRound(curRound=>curRound+1);
        setPastGuess(crrPastGuess=>[newComputerGuess, ...crrPastGuess]);
    }


    if(availableDeviceHeight < 500){
        return(
            <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponents Guess</Text>
            <View style={styles.control}>
            <MyButton onPress={nextGuessHandler.bind(this,"lower")}>
                    <Ionicons name="md-remove" size={24} color="white"/>
            </MyButton>
            <NumberContainer>{computerGuess}</NumberContainer>
                <MyButton onPress={nextGuessHandler.bind(this,"higher")}>
                <Ionicons name="md-add" size={24} color="white"/>
                </MyButton>
            </View>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuess.map((guess,index)=>{
                        return renderListItem(guess,pastGuess.length-index)
                    })}
                </ScrollView>
            </View>
            
        </View>
        );
    }


    
    return(
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponents Guess</Text>
            <NumberContainer>{computerGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>

                <MyButton onPress={nextGuessHandler.bind(this,"lower")}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MyButton>
                <MyButton onPress={nextGuessHandler.bind(this,"higher")}>
                <Ionicons name="md-add" size={24} color="white"/>
                </MyButton>

                {/* <Button title="LOWER" onPress={nextGuessHandler.bind(this,"lower")}/>
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this,"higher")}/> */}
            </Card>

            <View style={styles.list}>
                <ScrollView>
                    {pastGuess.map((guess,index)=>{
                        return renderListItem(guess,pastGuess.length-index)
                    })}
                </ScrollView>
            </View>
            
        </View>

    );

                
}

const styles=StyleSheet.create({
    screen:{
         flex:1,
         padding:10,
         alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:300,
        maxWidth:'80%',
    },
    control:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'80%',
        alignItems:'center',
    },
    list:{
        flex:1,
        width:'60%',
    },
    listItem:{
        borderColor:'#ccc',
        borderWidth:1,
        padding:15,
        marginVertical:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around'
    }
});

export default GameScreen;