import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainTimerAlarm from './MainTimerAlarm';
import SetMainTimer from './SetMainTimer';
import { TimeModel } from '../../models/TimeModel';
import SoundAlarmService from '../../services/SoundAlarmService';

let alarmService:SoundAlarmService;
export const MainTimer = () => {

  const [initialized, setInitialized] = useState(false);

  useEffect(()=>{
     SoundAlarmService.CreateAsync(null,false).then(result => {
      alarmService = result;
      setInitialized(true);
    })
  })
 

const initialTimer : TimeModel = {
    hours:0,
    seconds:0,
    minutes:0
  }
  const [time,setTime]=useState(0);
  const [timer, setTimer] = useState(initialTimer);
  const [timeConfired, setTimeConfimed] = useState(false);

  const setTimerFunc = (hours:string, minutes:string, seconds:string) =>{

    const h =parseInt(hours);
    const m = parseInt(minutes);
    const s = parseInt(seconds); 
    setTime(h*60*60+m*60+s);
    setTimer({
      hours: h,
      minutes: m,
      seconds: s
    })
      setTimeConfimed(true);
    
  }

  const setCancel = async () =>{
    await cancel();
  }

  const playSound = async() => {
    alarmService?.play();
  }

  const cancel = async() =>{
    setTimeConfimed(false);
    await alarmService?.stop();
  }

  return !initialized 
  ? <></> 
  : (
    <View style={styles.container}>
         {timeConfired ? 
      <MainTimerAlarm playSound={playSound} setTime={setTime} time={time} timeInfo={timer} stopped={!timeConfired} /> 
      :<></>}
      <SetMainTimer setTimer={setTimerFunc} setCancel={setCancel} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color:'red'
  },
  cancelButton:{
    color: 'red',
    borderColor: 'pink',
    borderWidth:2.5,
    fontSize:15,
    borderRadius:15,
    margin:15,
    width:50,
    justifyContent:'center',
    textAlign:'center'
}});
