import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet,SafeAreaView, StatusBar, Button } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { DocumentResult } from "expo-document-picker";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import SoundAlarmService from "../../services/SoundAlarmService";
import { SoundFileModel } from "../../models/SoundFileModel";

let alarmService:SoundAlarmService;
const SettingsComponent = ()=>{

    const nullFileModel :SoundFileModel = {
      file:'',
      name:''
    }
    const [alarmFileResponse, setAlarmFileResponse] = useState(nullFileModel);
    const [mainTimerFileResponse, setMainTimer] = useState(nullFileModel);
    const [trainingTimerFileResponse, setTrainingTimer] = useState(nullFileModel);

 

   const play = (model:SoundFileModel) =>{
    if(alarmFileResponse == null || alarmFileResponse.file == ''){
      return;
    }

    SoundAlarmService.CreateAsync(model.file,false).then(result => {
      alarmService = result;
      alarmService.play();
    })
   }
   
    const save = async() =>{
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != 'granted') {
        return;
        }
    }

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.getDocumentAsync({type:['audio/mpeg', 'audio/x-wav']});
          if(response.type != 'cancel'){

            response.name
            setAlarmFileResponse({ file: response.uri, name:response.name});
          }
          
        } catch (err) {
          console.warn(err);
        }
      }, []);


    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>Settings</Text>

            <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
    
        {alarmFileResponse && <Text
          numberOfLines={1}
          ellipsizeMode={'middle'}>
            selected file: {alarmFileResponse.name}
        </Text>}
      )
      <Button title="Select 📑" onPress={handleDocumentSelection}/>
      <Button title="Save" onPress={save}/>
      <Button title="Play" onPress={()=>play(alarmFileResponse)} />
    </SafeAreaView>
        </View>
    )
}

export default SettingsComponent;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle:{
        color:'red'
    }
})  