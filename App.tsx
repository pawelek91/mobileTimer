import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Timer from './components/Timer';
import { Audio } from 'expo-av';
import SetTimer from './components/SetTimer';
import { TimeModel } from './models/TimeModel';

export default function App() {
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

  const playSound = async() => {
    console.log('playing sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/1.wav'));
      sound.playAsync()
  }

  const cancel = () =>{
    setTimeConfimed(false);
  }



  return (
    <View style={styles.container}>
         {time > 0  && timeConfired ? 
      <Timer playSound={playSound} setTime={setTime} time={time} timeInfo={timer} stopped={!timeConfired} /> 
      :<></>}
      <SetTimer setTimer={setTimerFunc} />

      <TouchableOpacity style={styles.cancelButton} onPress={ ()=>{cancel()}}>
                <Text>cancel</Text>
            </TouchableOpacity>
    </View>
  );


  
}

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
}

});
