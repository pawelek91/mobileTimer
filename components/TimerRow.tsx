import { TextInput,StyleSheet, TouchableOpacity, View } from "react-native";

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
                -
            </TouchableOpacity>
            <TextInput style={styles.input} value={props.time} onChangeText={text => props.set(text)}></TextInput>
            <TouchableOpacity style={styles.button} onPress={ ()=>{add(props.time)}}>
                +
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
        textAlign:'center'
    },
    rowRoot:{
        borderColor: 'pink',
        borderWidth:0.5,
    },
    row:{
        flexDirection:'row',
        justifyContent: 'center',
        margin:5,
    
    },
    button:{
        color: 'red',
        borderColor: 'pink',
        borderWidth:0.5,
        fontSize:20,
        borderRadius:5,
        margin:15,
        width:20,
        justifyContent:'center',
        textAlign:'center'
    }
})