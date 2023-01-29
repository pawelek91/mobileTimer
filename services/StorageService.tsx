import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import AlarmClockModel from '../models/AlarmClockModel';
import TrainingClockModel from '../models/TrainingClockModel';

class StorageService
{
    trainingKey = 'TRAINING_CLOCK';
    alarmClockKey = 'ALARM_CLOCK';
    alarmSoundPathKey = 'ALARM_SOUND_PATH'
    traingWorkoutAlarmPathKey = 'TRAININGWORKOUTARLARM_FILEPATH';
    traingRestAlarmPathKey = 'TRAININGRESTARLARM_FILEPATH';

    setDefaultTrainingRestAlarm = async () =>{
        await AsyncStorage.removeItem(this.traingRestAlarmPathKey);
    }

    setDefaultTrainingWorkoutAlarm = async () =>{
        await AsyncStorage.removeItem(this.traingWorkoutAlarmPathKey);
    }

    setDefaultMainAlarm = async () =>{
        await AsyncStorage.removeItem(this.alarmSoundPathKey);
    }

    setTrainingModel = async (model: TrainingClockModel) =>{
        await AsyncStorage.setItem(this.trainingKey,this.toString(model));
    }

    storageContains = async (key:string):Promise<boolean> =>{
        const keys = await AsyncStorage.getAllKeys();
        return keys.includes(key);
    }

    getTrainingModel = async (): Promise<TrainingClockModel | null> =>{
        if(! await this.storageContains(this.trainingKey)){
            return null;
        }
        const strVal = await AsyncStorage.getItem(this.trainingKey);
        if(strVal == null){
            return null;
        }
        const obj:TrainingClockModel = JSON.parse(strVal as string);
        return obj;
    }

    setAlarmClock = async (model:AlarmClockModel) =>{
        await AsyncStorage.setItem(this.alarmClockKey, this.toString(model));
    }

    getAlarmClock = async () : Promise<AlarmClockModel | null> =>{
        if(! await this.storageContains(this.alarmClockKey)){
            return null;
        }
        const strVal = await AsyncStorage.getItem(this.alarmClockKey);
        if(strVal == null){
            return null;
        }
        const obj:AlarmClockModel = JSON.parse(strVal as string);
        return obj;
    }

    getClockAlarmPath = async(): Promise<string | null>=>{
        if(! await this.storageContains(this.alarmSoundPathKey)){
            return null;
        }
        const strVal = await AsyncStorage.getItem(this.alarmSoundPathKey);
        return strVal;
    }

    setClockAlarmPath = async(path:string) =>{
        await AsyncStorage.setItem(this.alarmSoundPathKey, path);
    }


    getTrainingWorkoutAlarmPath = async(): Promise<string | null>=>{
        if(! await this.storageContains(this.traingWorkoutAlarmPathKey)){
            return null;
        }
        const strVal = await AsyncStorage.getItem(this.traingWorkoutAlarmPathKey);
        return strVal;
    }

    setTrainingWorkoutAlarmSound = async(path:string) =>{
        await AsyncStorage.setItem(this.traingWorkoutAlarmPathKey, path);
    }

    getTrainingRestAlarmPath = async(): Promise<string | null>=>{
        if(! await this.storageContains(this.traingRestAlarmPathKey)){
            return null;
        }
        const strVal = await AsyncStorage.getItem(this.traingRestAlarmPathKey);
        return strVal;
    }

    setTrainigRestAlarmSound = async(path:string) =>{
        await AsyncStorage.setItem(this.traingRestAlarmPathKey, path);
    }

    toString = (model:any):string=>{
        return JSON.stringify(model);
    }
}

export default StorageService;