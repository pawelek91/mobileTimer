import { useEffect, useState } from "react";
import { View, Text,StyleSheet,TouchableOpacity } from "react-native";
import StorageService from "../../services/StorageService";
import TimerRow from "../Common/TimerRow";

interface trainingTimerProps  {
    set : (seriesCount:string,workoutMinutes:string,workoutSeconds:string, restMinutes:string, restSeconds:string) => void;
   }

const SetTimerTraining = (props:trainingTimerProps) =>{
    const [workoutTimeMinutes, setWorkoutTimeMinutes] = useState('0');
    const [workoutTimeSeconds, setWorkoutTimeSeconds] = useState('0');
    const [restTimeMinutes, setRestTimeMinutes] = useState('0');
    const [restTimeSeconds, setRestTimeSeconds] = useState('0');
    const [seriesCount, setSeriesCount] = useState('1');

    const storageService: StorageService = new StorageService();
    useEffect(()=>{
        storageService.getTrainingModel().then(result=>{
            if(result != null){
                const workoutMinutes = result.workoutTime.minutes as number;
                const workoutSeconds = result.workoutTime.seconds as number;
                const restMinutes = result.restTime.minutes as number;
                const restSeconds = result.restTime.seconds as number;

                setWorkoutTimeMinutes(workoutMinutes.toString());
                setWorkoutTimeSeconds(workoutSeconds.toString());
                setRestTimeMinutes(restMinutes.toString());
                setRestTimeSeconds(restSeconds.toString());
                setSeriesCount(result.seriesCount.toString());
            }
        })
    },[])

    const setTime  = (text:string, max :number | null = null) : string  => {
        const value = parseInt(text);
        if(isNaN(value) || value <0){
            return '0';
        }

        if(max && value > max){
            return max.toString()
        }
        return text;
    }

    const setSeries = (text:string) =>{
        const series = setTime(text);
        setSeriesCount(series);
    }
    const setWorkoutMinutes = (text:string) =>{
        const time = setTime(text,60);
        setWorkoutTimeMinutes(time);
    }
    
    const setWorkoutSeconds = (text:string) =>{
        const time = setTime(text,60);
        setWorkoutTimeSeconds(time);
    }

    const setRestMinutes = (text:string) =>{
        const time = setTime(text,60);
        setRestTimeMinutes(time);
    }
    
    const setRestSeconds = (text:string) =>{
        const time = setTime(text,60);
        setRestTimeSeconds(time);
    }

    const stopTraining = () =>{
        props.set(0,0,0, 0, 0);
    }

    const saveTime = () =>{
        storageService.setTrainingModel({
            restTime: {
                minutes: parseInt(restTimeMinutes),
                seconds: parseInt(restTimeSeconds)
            },
            seriesCount: parseInt(seriesCount),
            workoutTime:{
                minutes: parseInt(workoutTimeMinutes),
                seconds: parseInt(workoutTimeSeconds)
            }
        })
        props.set(seriesCount,workoutTimeMinutes,workoutTimeSeconds, restTimeMinutes, restTimeSeconds);
    }

    return (
        <View style={styles.container}>
            <View style={styles.timers}>
                <View style={styles.timer}>
                    <Text style={styles.textStyle}>Set training:</Text>
                    <Text style={styles.textStyle}>Series: </Text>
                    <TimerRow set={text=> setSeries(text)} time = {seriesCount} />
                    <Text style={styles.textStyle}>Minutes:</Text>
                    <TimerRow set={text=> setWorkoutMinutes(text)} time = {workoutTimeMinutes} />
                    <Text style={styles.textStyle}>Seconds:</Text>
                    <TimerRow set={text=> setWorkoutSeconds(text)} time = {workoutTimeSeconds} />
                </View>

                <View style={styles.timer}>
                    <Text style={styles.textStyle}>Set rest:</Text>
                    <Text style={styles.textStyle}>Minutes:</Text>
                    <TimerRow set={text=> setRestMinutes(text)} time = {restTimeMinutes} />
                    <Text style={styles.textStyle}>Seconds:</Text>
                    <TimerRow set={text=> setRestSeconds(text)} time = {restTimeSeconds} />
                </View>
            </View>
            <TouchableOpacity style={styles.setTimeButton} onPress={ ()=>{saveTime()}}>
                    <Text style={styles.textStyle}>Start</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.setTimeButton} onPress={ ()=>{stopTraining()}}>
                <Text style={styles.textStyle}>Stop</Text>
            </TouchableOpacity>

        </View>)
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.8)'
      
    },
    timers:{
        flexDirection:'row',
        
        
    },
    timer:{
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 25
    },
    setTimeButton:{
        color: 'red',
        borderColor: 'red',
        borderWidth:2.5,
        fontSize:12,
        borderRadius:15,
        margin:5,
        width:50,
        justifyContent:'center',
        textAlign:'center'
    },
    textStyle:{
        color:'red',
        fontSize:15,
        justifyContent:'center',
        textAlign:'center'
    }
    
  });

  export default SetTimerTraining;