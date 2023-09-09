import {FC, useEffect, useRef, useState} from 'react'
import cls from './cardTrack.module.scss'
import {ITrack} from "../../interfaces/track.interface.ts";
import {useDispatch} from "react-redux";
import {setCurrentSong, setNextSong, setPreviousSong} from "../../store/reducers/songsSlice.ts";
import {FaPlay} from "react-icons/fa6";
import {formatTime} from "../../helpers/formatTime.ts";

interface cardTrack {
    nextSong: ITrack,
    previousSong: ITrack,
    currentSong: ITrack,
    dataTracks: ITrack[],
    id: number

}

const cardTrack: FC<cardTrack> = ({previousSong, currentSong, nextSong, dataTracks, id}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const audio = audioRef.current;
        const handleLoadedMetadata = () => {
            setDuration(Math.ceil(audio.duration));
        };
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
    };
    const togglePlay = () => {
        dispatch(setCurrentSong(currentSong));
        if (nextSong) {
            dispatch(setNextSong(nextSong));
        } else {
            dispatch(setNextSong(dataTracks[0]));
        }

        if (previousSong) {
            dispatch(setPreviousSong(previousSong));
        } else {
            dispatch(setPreviousSong(dataTracks[dataTracks.length - 1]));
        }
        setIsPlaying((prevState) => !prevState);
    };
    return (
        <div key={currentSong.id} className={cls.cardTrack}>
            <div className={cls.cardImgAndInf}>
                <img className={cls.cardTrackImg} width={60} src={currentSong.picture} alt={''}/>
                <div className={cls.trackInf}>
                    <h1 className={cls.cardTrackName}>
                        {currentSong.name}
                    </h1>
                    <h2 className={cls.trackArtist}>{currentSong.artist}</h2>
                </div>
            </div>
            <div className={cls.blockTime}>
                <h3 className={cls.songTime}>{formatTime(duration)}</h3>

            </div>
            <button className={cls.buttonPlayAndPause}
                    onClick={togglePlay}>
                <FaPlay/>
            </button>
            <audio onLoadedMetadata={onLoadedMetadata} className={cls.audioPlayer} ref={audioRef} controls={false}
                   src={currentSong.audio}></audio>
        </div>
    )
}

export default cardTrack
