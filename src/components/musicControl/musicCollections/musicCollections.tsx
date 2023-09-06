import {FC} from 'react'
import cls from './musicCollections.module.scss'
import {BiCollection} from "react-icons/bi";
import {FiPlus} from "react-icons/fi";

const musicCollections: FC = () => {
    return (
        <div className={cls.musicCollections}>
            <header className={cls.musicCollectionsHeader}>
                <div className={cls.titleHeader}>
                    <BiCollection/>
                    <h1>Your Collections</h1>
                </div>
                <div className={cls.addCollections}>
                    <FiPlus/>
                </div>
            </header>
        </div>
    )
}

export default musicCollections
