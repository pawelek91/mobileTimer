import { Button, View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    play: () => void;
    setFile: () => void;
    fileName?: string;
    alarmType: string;
}

const SetSoundComponent = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Set sound for {props.alarmType} alarm</Text>
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