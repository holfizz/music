import {FC, useEffect} from 'react'
import cls from './cardTrack.module.scss'
import {ITrack} from "../../interfaces/track.interface.ts";

const cardTrack: FC<ITrack> = ({picture, name, id, audio, artist}) => {

    useEffect(() => {
        console.log()
    }, [audio]);

    return (
        <div key={id} className={cls.cardTrack}>
            <div className={cls.cardImgAndInf}>
                <img className={cls.cardTrackImg} width={60} src={picture}/>
                <div className={cls.trackInf}>
                    <h1 className={cls.cardTrackName}>
                        {name}
                    </h1>
                    <h2 className={cls.trackArtist}>{artist}</h2>
                </div>
            </div>
            <h2>{audio.length}</h2>
            <audio controls={true} src={audio}>
            </audio>

        </div>
    )
}

export default cardTrack
