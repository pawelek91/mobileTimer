import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmClockModel from '../models/AlarmClockModel';
import TrainingClockModel from '../models/TrainingClockModel';

class StorageService
{
    trainingKey = 'TRAINING_CLOCK';
    alarmClockKey = 'ALARM_CLOCK';

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

    toString = (model:any):string=>{
        return JSON.stringify(model);
    }
}

export default StorageService;