import { Audio } from 'expo-av';
class SoundAlamarService {

    static readonly defaultSoundPath = require('../assets/1.wav');
    
    private audioSound:Audio.Sound;

   
    static CreateAsync = async(soundAsset:any, looping:boolean = false) : Promise<SoundAlamarService>=>{
        if(soundAsset == null){
            soundAsset = this.defaultSoundPath;
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