import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';   //expo install expo-app-loading
import {useFonts} from 'expo-font';


import Header from './components/Header';
import StartScreenGame from './screens/StartScreenGame';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


export default function App() {

  const [userNumber,setUserNumber] = useState();
  const [guessCount,setGuessCount] = useState(0);

  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  const newGameHandler=()=>{
    setGuessCount(0);
    setUserNumber(null);
  }

  const checkUserNumber=(getUserNumber)=>{
    setUserNumber(getUserNumber);
  }

  const gameOverHandler=(numOfRounds)=>{
    setGuessCount(numOfRounds);
  }

  let content=<StartScreenGame checkUserNumber={checkUserNumber}/>

  if(userNumber && guessCount <= 0){
    content=<GameScreen userChoice={userNumber} gameOverHandler={gameOverHandler}/>
  }else if(guessCount>0){
    content=<GameOverScreen userChoice={userNumber} totalRounds={guessCount} newGameHandler={newGameHandler}/>;
  }



  return (
    <View style={styles.screen}>
      <Header title="Guess The Number"/>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex:1,
  }
});
