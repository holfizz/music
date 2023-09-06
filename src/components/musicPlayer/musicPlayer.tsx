import cls from './musicPlayer.module.scss'
import MusicControl from "../musicControl/musicControl.tsx";
import MusicHeader from "../musicHeader/musicHeader.tsx";
import {useGetAllTracksQuery} from "../../api/tracks.api.ts";
import {ITracks} from "../../interfaces/tracks.interface.ts";


const musicPlayer = () => {
    const {data} = useGetAllTracksQuery({})

    return (
        <div className={cls.musicPlayer}>
            <MusicControl/>
            <div className={cls.musicPlayerContent}>
                <MusicHeader/>
                <div className={cls.tracksPanel}>
                    {data && data.map((tracks: ITracks) => {
                        return <div>
                            <img width={210} src={`http://localhost:4000/${tracks.picture}`}/>
                            <audio controls={true} src={`http://localhost:4000/${tracks.audio}`}>
                                <source src={`http://localhost:4000/${tracks.audio}`} type="audio/mpeg"></source>
                            </audio>
                            <h1>
                                {tracks.name}
                            </h1>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default musicPlayer
