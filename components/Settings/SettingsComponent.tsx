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



  const play = (model: SoundFileModel) => {
    if (alarmFileResponse == null || alarmFileResponse.file == '') {
      return;
    }

    SoundAlarmService.CreateAsync(SoundType.Temp,model.file, false).then(result => {
      alarmService = result;
      alarmService.play();
    })
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

  const setAlarmFileResponseFunc = (uri: string, name: string) => {
    setAlarmFileResponse({ file: uri, name: name });
  }

  const setTrainingTimerFileResponseFunc = (uri: string, name: string) => {
    setTrainingTimerAlarm({ file: uri, name: name });
  }

  const setTraingRestSoundFileResponse = (uri: string, name: string) => {
    setRestTimerAlarm({ file: uri, name: name });
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.textStyle}>Settings</Text>

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />

        <SetSoundComponent
          play={() => play(alarmFileResponse)}
          fileName={alarmFileResponse?.name ?? 'default'}
          setFile={() => handleDocumentSelection(setAlarmFileResponseFunc)}
          alarmType="clock"
        />

        <SetSoundComponent
          play={() => play(trainingTimerAlarmFileResponse)}
          fileName={trainingTimerAlarmFileResponse?.name ?? 'default'}
          setFile={() => handleDocumentSelection(setTrainingTimerFileResponseFunc)}
          alarmType="training workout"
        />

        <SetSoundComponent
          play={() => play(restTimerAlarmFileResponse)}
          fileName={restTimerAlarmFileResponse?.name ?? 'default'}
          setFile={() => handleDocumentSelection(setTraingRestSoundFileResponse)}
          alarmType="training rest"
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
    color: 'red'
  }
})  