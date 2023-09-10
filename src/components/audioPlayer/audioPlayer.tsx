import {FC, useEffect, useRef, useState} from 'react'
import cls from './audioPlayer.module.scss'
import {FaPause, FaPlay} from "react-icons/fa6";
import {ITrack} from "../../interfaces/track.interface.ts";
import {formatTime} from "../../helpers/formatTime.ts";
import {BiSkipNext, BiSkipPrevious, BiSpeaker} from "react-icons/bi";
import {PiSpeakerLowBold} from "react-icons/pi";

interface audioPlayerProps {
    previousSong: ITrack,
    currentSong: ITrack
    nextSong: ITrack
}

const audioPlayer: FC<audioPlayerProps> = ({currentSong, previousSong, nextSong}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    useEffect(() => {
        audioRef.current.play();
        setIsPlaying(true)
    }, [currentSong]);
    useEffect(() => {
        setIsPlaying(false)

    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };
    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => {
            setCurrentTime(Math.ceil(audio.currentTime));
        };
        const handleLoadedMetadata = () => {
            setDuration(Math.ceil(audio.duration));
        };
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
    };
    const playAnimationRef = useRef();


    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();

        } else {
            audioRef.current.pause();
            cancelAnimationFrame(playAnimationRef.current);
        }
    }, [isPlaying, audioRef,]);
    const handleProgressClick = (e) => {
        const progressBar = e.target;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressBar.offsetWidth;
        const newTime = (clickPosition / progressBarWidth) * duration;

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className={cls.audioComponentPlayer}>
            <div className={cls.componentInfBlock}>
                <img className={cls.componentInfImage} src={currentSong?.picture} width={40} alt={''}/>
                <div className={cls.blockInfSong}>
                    <h1 className={cls.componentInfTitle}>{currentSong?.name}</h1>
                    <h1 className={cls.componentInfAuthors}>{currentSong?.artist}</h1>
                </div>
            </div>
            <div>
                <audio onLoadedMetadata={onLoadedMetadata} className={cls.audioPlayer} ref={audioRef} controls={true}
                       src={currentSong?.audio}></audio>
                <div className={cls.playerControlMenu}>
                    {/*<FaRandom/>*/}
                    <div className={cls.nextAndPrev}>
                        <BiSkipPrevious/>
                    </div>
                    <button className={cls.buttonPlayAndPause} onClick={togglePlay}>
                        {isPlaying ? <FaPause/> : <FaPlay/>}
                    </button>
                    <div className={cls.nextAndPrev}>
                        <BiSkipNext/>
                    </div>
                    {/*<FiRepeat/>*/}
                </div>
                <div className={cls.progress_bar}>
                    <span className="time current">{formatTime(currentTime)}</span>
                    <progress className={cls.progress} onClick={handleProgressClick} value={currentTime}
                              max={duration}/>
                    <span className="time">{formatTime(duration)}</span>
                </div>
            </div>
            <div className={cls.volumeBlock}>
                <div className={cls.iconVolumeBlock}>
                    <BiSpeaker/>
                    <PiSpeakerLowBold/>
                </div>
                <input className={cls.volumeLine} type="range" min="0" max="1" step="0.01" value={volume}
                       onChange={(e) => {
                           const newVolume = parseFloat(e.target.value);
                           setVolume(newVolume);
                           if (audioRef.current) {
                               audioRef.current.volume = newVolume;
                           }
                       }}
                />
            </div>
        </div>
    )
}

export default audioPlayer
