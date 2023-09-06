import {FC} from 'react'
import cls from './musicMenu.module.scss'
import {AiFillHome} from "react-icons/ai";
import {RiAlbumLine, RiMusic2Line} from "react-icons/ri";
import {TbMicrophone2} from "react-icons/tb";
import {FaPodcast} from "react-icons/fa";

const musicMenu: FC = () => {
    return (
        <div className={cls.musicMenu}>
            <div className={cls.musicMenuLink}><AiFillHome/>Home</div>
            <div className={cls.musicMenuLink}><RiMusic2Line/> Songs</div>
            <div className={cls.musicMenuLink}><TbMicrophone2/>Artists</div>
            <div className={cls.musicMenuLink}><RiAlbumLine/> Album</div>
            <div className={cls.musicMenuLink}><FaPodcast/> Podcast</div>
        </div>
    )
}

export default musicMenu
