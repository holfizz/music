import {FC} from 'react'
import cls from './audioPlayer.module.scss'
import {ITrack} from "../../interfaces/track.interface.ts";

const audioPlayer: FC<ITrack> = (/*{audio, artist, id, name, picture}*/) => {

    return (
        <div className={cls.audioPlayer}>

        </div>
    )
}

export default audioPlayer
