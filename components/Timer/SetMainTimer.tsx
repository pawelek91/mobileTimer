import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TimerRow from '../Common/TimerRow';

interface timerProps  {
 setTimer : (hours:string,minutes:string,seconds:string) => void;
 setCancel :  () => void;
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
            <Text style={styles.textStyle}>Set time:</Text>
            <Text style={styles.textStyle}>Hours: </Text>
            <TimerRow set={text=> setHours(text)} time = {timeHours} />
            <Text style={styles.textStyle}>Minutes:</Text>
            <TimerRow set={text=> setMinutes(text)} time = {timeMinutes} />
            <Text style={styles.textStyle}>Seconds:</Text>
            <TimerRow set={text=> setSeconds(text)} time = {timeSeconds} />

            <TouchableOpacity style={styles.setTimeButton} onPress={ ()=>{saveTime()}}>
                <Text style={styles.textStyle}>Start</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={ ()=>{props.setCancel()}}>
                <Text style={styles.textStyle}>Stop</Text>
            </TouchableOpacity>
        </View>
    )

   
}




const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      opacity:100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle:{
        color:'red',
        fontSize:15,
    },
    setTimeButton:{
        color: 'red',
        borderColor: 'red',
        borderWidth:2.5,
        fontSize:15,
        borderRadius:15,
        margin:15,
        width:50,
        justifyContent:'center',
        textAlign:'center'
    },
    cancelButton:{
        color: 'red',
        borderColor: 'red',
        borderWidth:2.5,
        fontSize:15,
        borderRadius:15,
        margin:15,
        width:50,
        justifyContent:'center',
        textAlign:'center'
    }
    
  });

  export default SetMainTimer;
  