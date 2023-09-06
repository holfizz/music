import {FC} from 'react'
import cls from './musicNavabar.module.scss'
import {PiBellSimpleBold} from "react-icons/pi";
import {BiSearch} from "react-icons/bi";
import {TbLayoutList, TbSettings} from "react-icons/tb";
import {MdOutlinePersonOutline} from "react-icons/md";

const musicNavbar: FC = () => {
    return (
        <div className={cls.musicNavbar}>
            <div className={cls.navbarLink}><TbLayoutList/></div>
            <div className={cls.navbarLink}><BiSearch/></div>
            <div className={cls.navbarLink}><PiBellSimpleBold/></div>
            <div className={cls.navbarLink}><TbSettings/></div>
            <div className={cls.navbarLink}><MdOutlinePersonOutline/></div>
        </div>
    )
}


export default musicNavbar

