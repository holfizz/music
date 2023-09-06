import {FC} from 'react'
import cls from './musicControl.module.scss'
import MusicMenu from "./musicMenu/musicMenu.tsx";
import MusicCollections from "./musicCollections/musicCollections.tsx";

const musicControl: FC = () => {
    return (
        <div className={cls.musicControl}>
            <MusicMenu/>
            <div className={cls.line}></div>
            <MusicCollections/>
        </div>
    )
}

export default musicControl
