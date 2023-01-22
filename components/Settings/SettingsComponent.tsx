import { useCallback, useState } from "react";
import { View, Text, StyleSheet,SafeAreaView, StatusBar, Button } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { DocumentResult } from "expo-document-picker";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const SettingsComponent = ()=>{

    const [fileResponse, setFileResponse] = useState(new Array<DocumentResult>);

    const save = async() =>{
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != 'granted') {
        return;
        }
    }

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.getDocumentAsync({});
          if(response.type != 'cancel'){
            const x = response.uri;
            const y = response.file as File;
            setFileResponse([response]);
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
      {fileResponse.map((file, index) => {
        if(file.type != 'cancel')
        return (
        
        <Text
          key={index.toString()}
        //   style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      )})}
      <Button title="Select 📑" onPress={handleDocumentSelection}/>
      <Button title="Save" onPress={save}/>
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