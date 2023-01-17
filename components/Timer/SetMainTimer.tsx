import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TimerRow from '../Common/TimerRow';

interface timerProps  {
 setTimer : (hours:string,minutes:string,seconds:string) => void;
}
const SetMainTimer = (props: timerProps) =>{

const [timeHours, setTimeHours] = useState('0');
const [timeMinutes, setTimeMinutes] = useState('0');
const [timeSeconds, setTimeSeconds] = useState('0');


const setHours = (text:string) =>{
    const time = setTime(text,24);
    setTimeHours(time);
}

const setMinutes = (text:string) =>{
    const time = setTime(text,60);
    setTimeMinutes(time);
}

const setSeconds = (text:string) =>{
    const time = setTime(text,60);
    setTimeSeconds(time);
}
const saveTime = () =>{
    props.setTimer(timeHours,timeMinutes,timeSeconds);
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
            <Text>Hours: </Text>
            <TimerRow set={text=> setHours(text)} time = {timeHours} />
            <Text>Minutes:</Text>
            <TimerRow set={text=> setMinutes(text)} time = {timeMinutes} />
            <Text>Seconds:</Text>
            <TimerRow set={text=> setSeconds(text)} time = {timeSeconds} />

            <TouchableOpacity style={styles.setTimeButton} onPress={ ()=>{saveTime()}}>
                <Text>GO</Text>
            </TouchableOpacity>
        </View>
    )

   
}




const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    setTimeButton:{
        color: 'red',
        borderColor: 'pink',
        borderWidth:2.5,
        fontSize:20,
        borderRadius:15,
        margin:15,
        width:50,
        justifyContent:'center',
        textAlign:'center'
    }
    
  });

  export default SetMainTimer;
  