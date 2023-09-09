import cls from './musicPlayer.module.scss'
import MusicControl from "../musicControl/musicControl.tsx";
import MusicHeader from "../musicHeader/musicHeader.tsx";
import {useGetAllArtistsQuery, useGetAllTracksQuery} from "../../api/tracks.api.ts";
import {IArtist} from "../../interfaces/artist.interface.ts";
import CardArtist from "../cardArtist/cardArtist.tsx";
import CardTrack from "../cardTrack/cardTrack.tsx";
import {ITrack} from "../../interfaces/track.interface.ts";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";


const musicPlayer = () => {
    const {data: dataTracks} = useGetAllTracksQuery({})
    const {data: dataArtists} = useGetAllArtistsQuery({})
    const currentTrackUpd = useTypedSelector((state) => state.songs.songs.currentSong);


    return (
        <div className={cls.musicPlayer}>
            <MusicControl/>

            <div className={cls.display}>
                <MusicHeader/>
                <div className={cls.musicPlayerContent}>
                    <div className={cls.tracksPanel}>
                        <div className={cls.popularArtist}>
                            <h2 className={cls.titlePopularArtist}>Popular artists</h2>
                            <div className={cls.listArtists}>
                                {dataArtists && dataArtists.map((artist: IArtist) => {
                                    return <CardArtist id={artist.id} name={artist.name} avatar={artist.avatar}/>
                                })}

                            </div>
                        </div>
                        <div className={cls.songs}>
                            <h2 className={cls.titleSongs}>Your songs</h2>
                            <div className={cls.listSongs}>
                                {dataTracks && dataTracks.map((track: ITrack, index: number) => {
                                    const nextIndex = index + 1;
                                    const previousIndex = index - 1;

                                    const nextSong = nextIndex < dataTracks.length ? dataTracks[nextIndex] : null;
                                    const previousSong = previousIndex >= 0 ? dataTracks[previousIndex] : null;
                                    return (
                                        <CardTrack
                                            id={currentTrackUpd?.id}
                                            nextSong={nextSong}
                                            currentSong={track}
                                            previousSong={previousSong}
                                            dataTracks={dataTracks}

                                        />
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                    <div className={cls.nowPlay}></div>

                </div>
            </div>
        </div>
    )
}

export default musicPlayer

{/*{dataTracks && dataTracks.map((track: ITrack) => {
                        return <div>
                            <img width={210} src={track.picture}/>
                            <audio controls={true} src={track.audio}>
                                <source src={track.audio} type="audio/mpeg"></source>
                            </audio>
                            <h1>
                                {track.name}
                            </h1>
                        </div>
                    })}*/
}