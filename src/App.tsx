import {FC} from 'react'
import './styles/app.scss'
import MusicPlayer from "./components/musicPlayer/musicPlayer.tsx";
import MusicNavbar from "./components/musicNavbar/musicNavbar.tsx";
import AudioPlayer from "./components/audioPlayer/audioPlayer.tsx";

const App: FC = () => {
    return (
        <div className={'app'}>
            <MusicNavbar/>
            <div className={'musicBlock'}>
                <MusicPlayer/>
                <AudioPlayer></AudioPlayer>
            </div>


        </div>

    )
}

export default App
