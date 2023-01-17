import { useState } from "react";
import { View,Text,StyleSheet } from "react-native"
import SoundAlamarService from "../../services/SoundAlarmService";
import SetTimerTraining from "./SetTimerTraining";
import TrainingTimerAlarm from "./TrainingTimerAlarm";

const TrainingTimer = () =>{

    let alarmService:SoundAlamarService;
    SoundAlamarService.CreateAsync().then(result=>{
    alarmService = result;
  })
  
    const [time,setTime] = useState(0);
    const [timeConfired, setTimeConfimed] = useState(false);
    const [series,setSeries] = useState(1);
    const [rest,setTimeForRest] = useState(0);
    const [workout, setTimeForWorkout] = useState(0);
    const [originalWorkoutTime, setOriginalWorkoutTime]= useState(0);
    const [originalRestTime, setOriginalRestTime] = useState(0);

    const setTimerFunc = (series: string, minutes:string, seconds:string) =>{
        const m = parseInt(minutes);
        const s = parseInt(seconds);
        const ser = parseInt(series);

        
        setTime(m*60+s);

        setTimeForRest(m*60+s);
        setTimeForWorkout(m*60+s);
        setSeries(ser);

        setOriginalWorkoutTime(m*60+s);
        setOriginalRestTime(m*60+s);
        setTimeConfimed(true);
    }



    const playSound = async() => {
        alarmService.play();
      }
    
      const cancel = async() =>{
        setTimeConfimed(false);
        await alarmService.stop();
      }
    

    return (
        <View style={styles.container}>
            <Text>
                <SetTimerTraining set={setTimerFunc} />
                {timeConfired ? 
                <TrainingTimerAlarm 
                setSeries={setSeries}
                setTimeForRest={setTimeForRest}
                setTimeForWorkout={setTimeForWorkout}
                stopped={!timeConfired} 
                playSoundRestEnd={playSound}
                playSoundWorkoutEnd={playSound}
                series={series}
                timeForRest={rest}
                timeForWorkout={workout}
                originalTimeForRest={originalRestTime}
                originalTimeForWorkout={originalWorkoutTime}
                  />:null}
            </Text>
        </View>
    )
}

export default TrainingTimer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton:{
      color: 'red',
      borderColor: 'pink',
      borderWidth:2.5,
      fontSize:20,
      borderRadius:15,
      margin:15,
      width:50,
      justifyContent:'center',
      textAlign:'center'
  }});