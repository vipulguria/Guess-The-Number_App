import React from 'react';
import { View,StyleSheet } from 'react-native';

const Card=(props)=>{
return(
    <View style={{...styles.card,...props.style}}>{props.children}</View>
)
};

const styles=StyleSheet.create({
    card:{
        //only works in ios
        // shadowColor:'black',
        // shadowOffset:{width:0,height:2},
        // shadowRadius:6,
        // shadowOpacity:0.26,
        backgroundColor:"white",
        elevation:8,
        padding:25,
        borderRadius:5,
    }
});

export default Card;