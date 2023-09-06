import {FC} from 'react'
import './styles/app.scss'
import MusicPlayer from "./components/musicPlayer/musicPlayer.tsx";
import MusicNavbar from "./components/musicNavbar/musicNavbar.tsx";

const App: FC = () => {
    return (
        <div className={'app'}>
            <MusicNavbar/>
            <MusicPlayer/>
            
        </div>

    )
}

export default App
