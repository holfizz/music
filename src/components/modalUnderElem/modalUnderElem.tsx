import {Dispatch, FC, ReactNode, SetStateAction} from "react";
import cls from './modalUnderElem.module.scss'
import {IoClose} from "react-icons/io5";

interface ModalInderElemProps {
    children: ReactNode,
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>,

}

const ModalInderElem: FC<ModalInderElemProps> = ({children, isVisible, setIsVisible}) => {
    return (
        <div className={cls.modalUnderElem}
             style={!isVisible ? {display: 'none'} : {display: "flex", position: 'absolute'}}>
            <div className={cls.closeModal}>
                <button onClick={() => setIsVisible(false)}>
                    <IoClose></IoClose>
                </button>
            </div>
            <div className={cls.modalUnderElemContent} style={{top: 'calc(100% + 10px)', left: 0}}>
                {children}
            </div>

        </div>
    );
}

export default ModalInderElem;