import { useEffect, useState } from "react";
import { View, Text,StyleSheet } from "react-native";
import { TimeModel } from "../../models/TimeModel";

interface TimerProps  {
    timeForWorkout:number;
    setTimeForWorkout:(val:number)=>void,
    setTimeForRest:(val:number)=>void,
    setSeries:(val:number)=>void,
    timeForRest:number;
    series:number;
    playSoundWorkoutEnd:()=>void,
    playSoundRestEnd:()=>void,
    stopped:boolean;
    originalTimeForWorkout:number,
    originalTimeForRest:number,
}

const TrainingTimerAlarm = (props:TimerProps) =>{

    const [workoutStop,setWorkoutStop] = useState(false);
    useEffect(()=>{
        
            while(props.series >0){
                const interval = setInterval(()=>{
                
                if(props.stopped){
                    clearInterval(interval);
                }

                if(props.timeForWorkout < 1 && !workoutStop){
                    //props.playSoundWorkoutEnd();
                    props.setTimeForRest(props.originalTimeForRest);
                    props.setSeries(props.series-1);
                    setWorkoutStop(true);
                }

                if(props.timeForRest <1){
                    setWorkoutStop(false);
                    //props.playSoundRestEnd();
                    props.setTimeForWorkout(props.originalTimeForWorkout);
                }

                if(!workoutStop){
                    props.setTimeForWorkout(props.timeForWorkout-1);
                }
                if(workoutStop){
                    props.setTimeForRest(props.timeForRest-1);
                }
                

                },1000);
                
                return () => clearInterval(interval)
            }
        });

        return(
            <View style={styles.container}>
                <Text>Series: {props.series} </Text>
                <Text>Time for serie left: {props.timeForWorkout} seconds </Text>
                <Text>Time for rest left: {props.timeForRest} seconds </Text>
            </View>
        )
}

export default TrainingTimerAlarm;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})  