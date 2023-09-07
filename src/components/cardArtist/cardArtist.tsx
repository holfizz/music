import {FC} from 'react'
import cls from './cardArtist.module.scss'
import {IArtist} from "../../interfaces/artist.interface.ts";

const cardArtist: FC<IArtist> = ({avatar, name, id}) => {
    return (
        <div key={id} className={cls.cardArtist}>
            <img className={cls.cardArtistImg} width={160} src={avatar}/>
            <h1 className={cls.cardArtistName}>
                {name}
            </h1>
        </div>
    )
}

export default cardArtist
