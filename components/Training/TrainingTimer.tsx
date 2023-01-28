import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import SoundAlamarService from "../../services/SoundAlarmService";
import SetTimerTraining from "./SetTimerTraining";
import TrainingTimerAlarm from "./TrainingTimerAlarm";
import SoundType from "../../models/SoundType"
import StorageService from "../../services/StorageService";

let startBoxingAlarmService: SoundAlamarService;
let restBoxingAlarmService: SoundAlamarService;

const TrainingTimer = () => {
  const storageService: StorageService = new StorageService();
  useEffect(() => {
    
    storageService.getTrainingWorkoutAlarmPath().then(result=>{
      SoundAlamarService.CreateAsync(SoundType.TrainingWorkoutAlarm, result, false).then(result => {
        if (result != null) {
          startBoxingAlarmService = result;
        }
      })
    })

    storageService.getTrainingRestAlarmPath().then(result=>{
      SoundAlamarService.CreateAsync(SoundType.TrainingRestAlarm, result, false).then(result => {
        restBoxingAlarmService = result;
      })
    })
  }, [])


  const [timeConfired, setTimeConfimed] = useState(false);
  const [series, setSeries] = useState(1);
  const [rest, setTimeForRest] = useState(0);
  const [workout, setTimeForWorkout] = useState(0);
  const [originalWorkoutTime, setOriginalWorkoutTime] = useState(0);
  const [originalRestTime, setOriginalRestTime] = useState(0);

  const setTimerFunc = (series: string,
    trainMinutes: string,
    trainSeconds: string,
    restMinutes: string,
    restSeconds: string) => {
    const mT = parseInt(trainMinutes);
    const sT = parseInt(trainSeconds);
    const mR = parseInt(restMinutes);
    const sR = parseInt(restSeconds);

    const ser = parseInt(series);


    setTimeForRest(mR * 60 + sR);
    setTimeForWorkout(mT * 60 + sT);
    setSeries(ser);

    setOriginalWorkoutTime(mT * 60 + sT);
    setOriginalRestTime(mR * 60 + sR);
    setTimeConfimed(true);
  }



  const playSoundRest = async () => {
    startBoxingAlarmService.stop().then(() => {
      restBoxingAlarmService.play();
    })

  }

  const playSoundStart = async () => {
    restBoxingAlarmService.stop().then(() => {
      startBoxingAlarmService.play();
    })

  }

  // const cancel = async() =>{
  //   setTimeConfimed(false);
  //   await alarmService.stop();
  // }


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
            playSoundRestEnd={playSoundStart}
            playSoundWorkoutEnd={playSoundRest}
            series={series}
            timeForRest={rest}
            timeForWorkout={workout}
            originalTimeForRest={originalRestTime}
            originalTimeForWorkout={originalWorkoutTime}
          /> : null}
      </Text>
    </View>
  )
}

export default TrainingTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    color: 'red',
    borderColor: 'pink',
    borderWidth: 2.5,
    fontSize: 15,
    borderRadius: 15,
    margin: 15,
    width: 50,
    justifyContent: 'center',
    textAlign: 'center'
  }
});