import { useState } from "react";
import { View, Text,StyleSheet,TouchableOpacity } from "react-native";
import TimerRow from "../Common/TimerRow";

interface trainingTimerProps  {
    set : (seriesCount:string,minutes:string,seconds:string) => void;
   }

const SetTimerTraining = (props:trainingTimerProps) =>{
    const [timeMinutes, setTimeMinutes] = useState('0');
    const [timeSeconds, setTimeSeconds] = useState('0');
    const [seriesCount, setSeriesCount] = useState('1');

    const setTime  = (text:string, max :number | null = null) : string  => {
        const value = parseInt(text);
        if(max && value > max){
            return max.toString()
        }
        if(value <0){
            return '0';
        }
        return text;
    }

    const setSeries = (text:string) =>{
        const series = setTime(text);
        setSeriesCount(series);
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
        props.set(seriesCount,timeMinutes,timeSeconds);
    }

    return (
        <View style={styles.container}>
            <Text>Set training:</Text>
            <Text>Series: </Text>
            <TimerRow set={text=> setSeries(text)} time = {seriesCount} />
            <Text>Minutes:</Text>
            <TimerRow set={text=> setMinutes(text)} time = {timeMinutes} />
            <Text>Seconds:</Text>
            <TimerRow set={text=> setSeconds(text)} time = {timeSeconds} />

            <TouchableOpacity style={styles.setTimeButton} onPress={ ()=>{saveTime()}}>
                <Text>GO</Text>
            </TouchableOpacity>
        </View>)
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

  export default SetTimerTraining;