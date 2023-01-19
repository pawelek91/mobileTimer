import { TextInput,StyleSheet, TouchableOpacity, View, Text } from "react-native";

const TimerRow = (props:TimerRowProps) =>{

    const add = (text:string) =>{
        let number = parseInt(text);
        number++;
        props.set(number.toString())
    }

    const sub = (text:string)=>{
        let number = parseInt(text);
        number--;
        props.set(number.toString())
    }
    return(
        <View style={styles.rowRoot}>
        <View style={styles.row}>
            
            <TouchableOpacity style={styles.button} onPress={ ()=>{sub(props.time)}}>
            <Text style={styles.textStyle}>
                -
                </Text>
            </TouchableOpacity>
            <TextInput style={styles.input} value={props.time} onChangeText={text => props.set(text)}></TextInput>
            <TouchableOpacity style={styles.button} onPress={ ()=>{add(props.time)}}>
                <Text style={styles.textStyle}>
                +
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default TimerRow;

interface TimerRowProps{
    set : (text:string) => void;
    time : string
}

const styles=StyleSheet.create({
    input:{
        borderColor: 'red',
        borderWidth: 2,
        width:50,
        textAlign:'center',
        color: 'red',
        fontSize:30,
    },
    rowRoot:{
        borderColor: 'red',
        borderWidth:0.5,
        borderRadius:15,
    },
    row:{
        flexDirection:'row',
        justifyContent: 'center',
        margin:5,
    borderRadius:5,
    },
    button:{
        color: 'red',
        borderColor: 'red',
        
        borderWidth:0.5,
        fontSize:15,
        borderRadius:5,
        margin:15,
        width:20,
        justifyContent:'center',
        textAlign:'center'
    },
    textStyle:{
        color:'red',
        fontSize:30
    }
})