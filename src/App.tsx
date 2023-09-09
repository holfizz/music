import {FC} from 'react'
import './styles/app.scss'
import MusicPlayer from "./components/musicPlayer/musicPlayer.tsx";
import MusicNavbar from "./components/musicNavbar/musicNavbar.tsx";
import AudioPlayer from "./components/audioPlayer/audioPlayer.tsx";
import {useTypedSelector} from "./hooks/useTypedSelector.ts";

const App: FC = () => {
    const currentSong = useTypedSelector(state => state.songs.songs.currentSong)
    const previousSong = useTypedSelector(state => state.songs.songs.previousSong)
    const nextSong = useTypedSelector(state => state.songs.songs.nextSong)
    return (
        <div className={'app'}>
            <MusicNavbar/>
            <div className={'musicBlock'}>
                <MusicPlayer/>
                <AudioPlayer currentSong={currentSong} previousSong={previousSong} nextSong={nextSong}></AudioPlayer>
            </div>


        </div>

    )
}

export default App
