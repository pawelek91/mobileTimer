import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { TimeModel } from "../../models/TimeModel";
type TimerProps = {
    setTime:(val:number)=>void,
    time:number;
    playSound:()=>void,
    timeInfo: TimeModel,
    stopped:boolean;
}
const MainTimerAlarm = (props:TimerProps) =>{
    const [timeElaped, setTimeElapsed] = useState(false);
    const {hours,minutes,seconds} = props.timeInfo;
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(timeElaped){
                props.playSound();
            }
            
            if(props.stopped){
                clearInterval(interval);
            }
            
            if(props.time>0){
                props.setTime(props.time-1)
            } else{
                setTimeElapsed(true);
            }},1000);
            return () => clearInterval(interval);
        });

    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>Alarm has been set to {hours} hours, {minutes}, {seconds} seconds</Text>
            <Text style={styles.textStyle}>{props.time}</Text>
        </View>
    )
}

export default MainTimerAlarm;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle:{
        color:'red'
    }
})  