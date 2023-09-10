import cls from './musicPlayer.module.scss'
import MusicControl from "../musicControl/musicControl.tsx";
import MusicHeader from "../musicHeader/musicHeader.tsx";
import {useGetAllArtistsQuery, useGetAllTracksQuery} from "../../api/tracks.api.ts";
import {IArtist} from "../../interfaces/artist.interface.ts";
import CardArtist from "../cardArtist/cardArtist.tsx";
import CardTrack from "../cardTrack/cardTrack.tsx";
import {ITrack} from "../../interfaces/track.interface.ts";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {BiEqualizer} from "react-icons/bi";
import {MdPlaylistPlay} from "react-icons/md";


const musicPlayer = () => {
    const {data: dataTracks} = useGetAllTracksQuery({})
    const {data: dataArtists} = useGetAllArtistsQuery({})
    const currentTrackUpd = useTypedSelector((state) => state.songs.songs.currentSong);
    const nextTrackUpd = useTypedSelector((state) => state.songs.songs?.nextSong);


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
                                    return <CardArtist id={artist?.id} name={artist?.name} avatar={artist?.avatar}/>
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
                    <div className={cls.nowPlaying}>
                        <div className={cls.decorateBlockHowPlaying}>
                            <BiEqualizer/>
                            <h1 className={cls.titleHowPlaying}>How Playing</h1>
                        </div>
                        <img className={cls.nowPlayingImg} src={currentTrackUpd?.picture}></img>
                        <div className={cls.nowPlayingInf}>
                            <div className={cls.nowPlayingMenuinf}>
                                <div>
                                    <h2>{currentTrackUpd?.name}</h2>
                                    <h3>{currentTrackUpd?.artist}</h3>
                                </div>
                                <MdPlaylistPlay/>

                            </div>
                            <div className={cls.line}></div>
                            <div>
                                <h1 className={cls.titleNextSong}>Queue</h1>
                                <CardTrack
                                    className={cls.cardTrackUpd}
                                    id={currentTrackUpd?.id}
                                    nextSong={nextTrackUpd}
                                    currentSong={nextTrackUpd}
                                    previousSong={nextTrackUpd}
                                    dataTracks={dataTracks}

                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default musicPlayer

