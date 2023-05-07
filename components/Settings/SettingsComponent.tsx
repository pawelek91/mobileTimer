import { useCallback, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';
import SoundAlarmService from "../../services/SoundAlarmService";
import { SoundFileModel } from "../../models/SoundFileModel";
import SetSoundComponent from "./SetSoundComponent";
import SoundType from "../../models/SoundType";
import StorageService from "../../services/StorageService";

let alarmService: SoundAlarmService;
const SettingsComponent = () => {

  const storageService: StorageService = new StorageService();
  const nullFileModel: SoundFileModel = {
    file: undefined,
    name: undefined
  }
  const [alarmFileResponse, setAlarmFileResponse] = useState(nullFileModel);
  const [restTimerAlarmFileResponse, setRestTimerAlarm] = useState(nullFileModel);
  const [trainingTimerAlarmFileResponse, setTrainingTimerAlarm] = useState(nullFileModel);


  let alarmsServices = new Array<SoundAlarmService>();

  const play = (model: SoundFileModel, type:SoundType) => {
    if (model == null || model.file == '') {
      return;
    }

    flushAlarm(type);

    SoundAlarmService.CreateAsync(type,model.file, false).then(result => {
      alarmsServices.push(result);
      alarmService = result;
      alarmService.play();
    })
  }

  const flushAlarm = (type:SoundType) =>{
    const services = alarmsServices.filter(x=>x.soundType == type);
    if(services.length > 0){
      services.forEach(x=> x.stop());
      alarmsServices = alarmsServices.filter(x=>x.soundType != type)
    }
   
  }

  const save = async () => {
    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != 'granted') {
      return;
    }
  }

  const handleDocumentSelection = useCallback(async (setFile: (uri: string, name: string) => void) => {
    try {
      const response = await DocumentPicker.getDocumentAsync({ type: ['audio/mpeg', 'audio/x-wav'] });
      if (response.type != 'cancel') {
        setFile(response.uri, response.name);
      }

    } catch (err) {
      console.warn(err);
    }
  }, []);

  const setAlarmFileResponseFunc = async (uri: string, name: string) => {
    await storageService.setClockAlarmPath(uri);
    setAlarmFileResponse({ file: uri, name: name });
  }

  const setTrainingTimerFileResponseFunc = async (uri: string, name: string) => {
    await storageService.setTrainingWorkoutAlarmSound(uri);
    setTrainingTimerAlarm({ file: uri, name: name });
  }

  const setTraingRestSoundFileResponse = async (uri: string, name: string) => {
    await storageService.setTrainigRestAlarmSound(uri);
    setRestTimerAlarm({ file: uri, name: name });
  }

  const setDefault = async (type:SoundType) =>{
    switch(type){
        case SoundType.MainAlarm : 
          await storageService.setDefaultMainAlarm();
          setAlarmFileResponse(nullFileModel);
          break;
        case SoundType.TrainingRestAlarm: 
          await storageService.setDefaultTrainingRestAlarm();
          setRestTimerAlarm(nullFileModel);
          break;
        case SoundType.TrainingWorkoutAlarm: 
          await storageService.setDefaultTrainingWorkoutAlarm();
          setTrainingTimerAlarm(nullFileModel);
          break;
    }
}

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.textStyle}>Settings</Text>

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />

        <SetSoundComponent
          play={() => play(alarmFileResponse,SoundType.MainAlarm)}
          fileName={alarmFileResponse?.name ?? 'default'}
          setFile={() => handleDocumentSelection(setAlarmFileResponseFunc)}
          alarmTypeText="clock"
          setDefault={()=>setDefault(SoundType.MainAlarm)}
        />

        <SetSoundComponent
          play={() => play(trainingTimerAlarmFileResponse,SoundType.TrainingWorkoutAlarm)}
          fileName={trainingTimerAlarmFileResponse?.name ?? 'default'}
          setFile={() => handleDocumentSelection(setTrainingTimerFileResponseFunc)}
          alarmTypeText="training workout"
          setDefault={()=>setDefault(SoundType.TrainingWorkoutAlarm)}
        />

        <SetSoundComponent
          play={() => play(restTimerAlarmFileResponse,SoundType.TrainingRestAlarm)}
          fileName={restTimerAlarmFileResponse?.name ?? 'default'}
          setFile={() => handleDocumentSelection(setTraingRestSoundFileResponse)}
          alarmTypeText="training rest"
          setDefault={()=>{setDefault(SoundType.TrainingRestAlarm)}}
        />


      </SafeAreaView>
      </View>
    </View>
  )
}

export default SettingsComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  main:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  textStyle: {
    color: 'red',
    textAlign:'center'
  }
})  