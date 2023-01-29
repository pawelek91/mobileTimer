import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SoundType from "../../models/SoundType";
import StorageService from "../../services/StorageService";

interface Props {
    play: () => void;
    setFile: () => void;
    fileName?: string;
    alarmTypeText: string;
    setDefault: () =>void;
}

const SetSoundComponent = (props: Props) => {

    const storageService: StorageService = new StorageService();
   
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Set sound for {props.alarmTypeText} alarm</Text>
            <TouchableOpacity style={styles.button} onPress={props.setFile}>
                <Text style={styles.textStyle}>
                    Select 📑
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.play()}>
                <Text style={styles.textStyle}>
                    Play
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>props.setDefault()}>
                <Text style={styles.textStyle}>
                    Restore defualt
                </Text>
            </TouchableOpacity>
            <Text style={styles.textStyle}>Selected filename: {props.fileName} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth:0.5,
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 200,
        padding:10,
        margin:10
    },
    textStyle: {
        color: 'red'
    },
    button: {
        color: 'red',
        borderColor: 'pink',
        borderWidth: 2.5,
        fontSize: 15,
        borderRadius: 15,
        margin: 15,
        width: 100,
        justifyContent: 'center',
        textAlign: 'center'
    }
})

export default SetSoundComponent;