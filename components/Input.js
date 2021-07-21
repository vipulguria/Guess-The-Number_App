import React from 'react';
import { TextInput,StyleSheet } from 'react-native';

const Input=(props)=>{
    return <TextInput {...props} style={{...styles.input,...props.style}}/>
}

const styles=StyleSheet.create({
    input:{
        height:30,
        borderWidth:1,
        borderColor:'black',
    }
})


export default Input;