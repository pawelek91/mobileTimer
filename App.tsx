import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Timer from './components/Timer';
import { Audio } from 'expo-av';
import SetTimer from './components/SetTimer';

export default function App() {
  const [time,setTime]=useState(10);
 
  const timeConfired = false;

  const playSound = async() => {
    console.log('playing sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/1.wav'));
      sound.playAsync()
  }



  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={playSound}>
        <View>
        <Text>play</Text>
          </View>
        </TouchableOpacity>
      <SetTimer />
      {time > 0  && timeConfired ? <Timer playSound={playSound} setTime={setTime} time={time} /> :null}
      <StatusBar style="auto" />
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

});
