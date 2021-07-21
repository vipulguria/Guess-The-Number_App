import React from 'react';
import { Text,View,StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Header=(props)=>{
    return(
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:90,
        paddingTop:40,
        backgroundColor:Colors.primary,
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        color:"black",
        fontSize:20,
        fontFamily:'open-sans-bold',
    },
});


export default Header;