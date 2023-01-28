import { Audio } from 'expo-av';
import SoundType from '../models/SoundType';
class SoundAlamarService {

    static readonly defaultAlarmSoundPath = require('../assets/sample-3s.mp3');
    static readonly defaultTrainingWorkoutTimerAlarmSoundPath = require('../assets/boxingBell1.mp3');
    static readonly defaultTrainingRestMainTimerAlarmSoundPath = require('../assets/boxingBell2.wav');
    private audioSound:Audio.Sound;

   
    static CreateAsync = async(type: SoundType,soundAsset:any, looping:boolean = false) : Promise<SoundAlamarService>=>{
        if(soundAsset == null){
            switch(type){
                case SoundType.MainAlarm : soundAsset = this.defaultAlarmSoundPath;break;
                case SoundType.TrainingRestAlarm: soundAsset = this.defaultTrainingRestMainTimerAlarmSoundPath;break;
                case SoundType.TrainingWorkoutAlarm: soundAsset = this.defaultTrainingWorkoutTimerAlarmSoundPath;break;
                default: throw Error('uknown sound path');
            }
            
        }
        const {sound} = await Audio.Sound.createAsync(soundAsset);
        return new SoundAlamarService(sound,looping);
    }

    private constructor(sound:Audio.Sound, looping:boolean) {
        this.audioSound = sound;
        this.audioSound.setIsLoopingAsync(looping);
    }

    play = async()=>{
        await this.audioSound.playAsync();
    }

    stop = async()=>{
        await this.audioSound.stopAsync(); 
    }
}

export default SoundAlamarService;