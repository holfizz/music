import {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import cls from './Modal.module.scss'
import {IoClose} from "react-icons/io5";

interface ModalProps {
    children: ReactNode,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

const Modal: FC<ModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [cls.modal]
    if (visible) {
        rootClasses.push(cls.active)
    }
    return (
        <div
            className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div

                className={cls.modalContent}
                onClick={(e) => e.stopPropagation()}>
                <div className={cls.closeModal}>
                    <button onClick={() => setVisible(false)}>
                        <IoClose></IoClose>
                    </button>
                </div>
                <div className={cls.modalContentChildren}>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;