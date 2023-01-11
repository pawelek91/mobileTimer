import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TimeModel } from "../models/TimeModel";
type TimerProps = {
    setTime:(val:number)=>void,
    time:number;
    playSound:()=>void,
    timeInfo: TimeModel,
    stopped:boolean;
}
const Timer = (props:TimerProps) =>{
    
    const {hours,minutes,seconds} = props.timeInfo;
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(props.stopped){
                clearInterval(interval);
            }
            if(props.time>1){
                props.setTime(props.time-1)
            } else{
                props.setTime(0);
                props.playSound();
            }},1000);
            return () => clearInterval(interval);
        });

    return(
        <View style={styles.container}>
            <Text>Alarm has been set to {hours} hours, {minutes}, {seconds} seconds</Text>
            <Text>{props.time}</Text>
        </View>
    )
}

export default Timer;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})  