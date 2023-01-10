import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const SetTimer = () =>{

const [defaultTimeHours, setDefaultTimeHours] = useState('0');
const [defaultTimeMinutes, setDefaultTimeMinutes] = useState('0');
const [defaultTimeSeconds, setDefaultTimeSeconds] = useState('0');

const setHours = (text:string) =>{
    const time = setTime(text,24);
    setDefaultTimeHours(time);
}

const setMinutes = (text:string) =>{
    const time = setTime(text,60);
    setDefaultTimeMinutes(time);
}

const setSeconds = (text:string) =>{
    const time = setTime(text,60);
    setDefaultTimeSeconds(time);
}

const setTime  = (text:string, max :number) : string  => {
    const value = parseInt(text);
    if(value > max){
        return max.toString()
    }
    return text;
}

    return (
        <View style={styles.container}>
            <Text>Set time:</Text>
            Hours: 
            <TextInput style={styles.input} value={defaultTimeHours} onChangeText={text => setHours(text)}></TextInput>
            Minutes:
            <TextInput style={styles.input} value={defaultTimeMinutes} onChangeText={text => setMinutes(text)}></TextInput>
            Seconds:
            <TextInput style={styles.input} value={defaultTimeSeconds} onChangeText={text => setSeconds(text)}></TextInput>

        </View>
    )

   
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  input:{
    borderColor: 'red',
    borderWidth: 2,
  }
  });

  export default SetTimer;
  