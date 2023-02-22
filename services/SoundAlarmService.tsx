import { Audio,InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import SoundType from '../models/SoundType';
class SoundAlamarService {

    static readonly defaultAlarmSoundPath = require('../assets/sample-3s.mp3');
    static readonly defaultTrainingWorkoutTimerAlarmSoundPath = require('../assets/boxingBell1.mp3');
    static readonly defaultTrainingRestMainTimerAlarmSoundPath = require('../assets/boxingBell2.wav');
    private audioSound:Audio.Sound;
    soundType: SoundType;
   
    static CreateAsync = async(type: SoundType,soundAsset:any, looping:boolean = false) : Promise<SoundAlamarService>=>{
        if(soundAsset == null){
            switch(type){
                case SoundType.MainAlarm : soundAsset = this.defaultAlarmSoundPath;break;
                case SoundType.TrainingRestAlarm: soundAsset = this.defaultTrainingRestMainTimerAlarmSoundPath;break;
                case SoundType.TrainingWorkoutAlarm: soundAsset = this.defaultTrainingWorkoutTimerAlarmSoundPath;break;
                default: throw Error('unkown sound path');
            }
            
        }
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            playThroughEarpieceAndroid: false
        })
        const {sound} = await Audio.Sound.createAsync(soundAsset);
        return new SoundAlamarService(sound,looping, type);
    }

    private constructor(sound:Audio.Sound, looping:boolean, type:SoundType) {
        this.audioSound = sound;
        this.audioSound.setIsLoopingAsync(looping);
        this.soundType = type;
    }

    play = async()=>{
        await this.audioSound.playAsync();
    }

    stop = async()=>{
        await this.audioSound.stopAsync(); 
    }
}

export default SoundAlamarService;