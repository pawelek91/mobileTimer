import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TimerRow from './TimerRow';
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
    if(value <0){
        return '0';
    }
    return text;
}

    return (
        <View style={styles.container}>
            <Text>Set time:</Text>
            Hours: 
            <TimerRow set={text=> setHours(text)} time = {defaultTimeHours} />
            Minutes:
            <TimerRow set={text=> setMinutes(text)} time = {defaultTimeMinutes} />
            Seconds:
            <TimerRow set={text=> setSeconds(text)} time = {defaultTimeSeconds} />
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
    
  });

  export default SetTimer;
  