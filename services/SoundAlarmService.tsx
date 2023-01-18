import { Audio } from 'expo-av';
class SoundAlamarService {

    static readonly defaultSoundPath = require('../assets/1.wav');
    
    private audioSound:Audio.Sound;

   
    static CreateAsync = async(soundAsset = this.defaultSoundPath)=>{
        console.log('creating sound')
        const {sound} = await Audio.Sound.createAsync(soundAsset);
        return new SoundAlamarService(sound);
    }

    private constructor(sound:Audio.Sound) {
        this.audioSound = sound;
    }

    play = async()=>{
        await this.audioSound.playAsync();
    }

    stop = async()=>{
        await this.audioSound.stopAsync(); 
    }
}

export default SoundAlamarService;