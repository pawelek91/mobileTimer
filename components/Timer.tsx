import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
type TimerProps = {
    setTime:(val:number)=>void,
    time:number;
    playSound:()=>void,
}
const Timer = (props:TimerProps) =>{
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(props.time>1){
                props.setTime(props.time-1)
            } else{
                props.playSound();
            }},1000);
            return () => clearInterval(interval);
        });

    return(
        <Text>{props.time}</Text>
    )
}

export default Timer;