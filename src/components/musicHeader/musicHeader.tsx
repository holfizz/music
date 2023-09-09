import {FC, useEffect, useState} from 'react'
import cls from './musicHeader.module.scss'
import {BiLogOut, BiSearch} from "react-icons/bi";
import {HiMiniChevronRight} from "react-icons/hi2";
import Modal from "../modal/modal.tsx";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {useLoginMutation, useRegistrationMutation} from "../../api/auth.api.ts";
import face from '../../assets/face.png'
import ModalInderElem from "../modalUnderElem/modalUnderElem.tsx";
import {TbSettings} from "react-icons/tb";

const musicHeader: FC = () => {
    interface Roles {
        id: number
        value: string
        description: string
    }

    interface User {
        email: string;
        id: number
        roles: Roles[]
    }

    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [modeModal, setModeModal] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [dataUser, setDataUser] = useState<User | null>(null)
    const [modalUnderElem, setModalUnderElem] = useState(false)

    const [registration, {
        // isError: isErrorRegistration,
        // error: errorRegistration
    }] = useRegistrationMutation()
    const [login, {
        data: dataLogin,
        // isSuccess: isSuccessLogin
    }] = useLoginMutation()

    useEffect(() => {
        const token = localStorage.getItem('dataUser');
        if (!token) {
            // Если токен отсутствует, записываем его в dataUser
            if (dataLogin && dataLogin.token) {
                setDataUser(JSON.parse(atob(dataLogin.token.split('.')[1])));
                localStorage.setItem('dataUser', JSON.stringify(dataLogin));
            }
        } else {
            // Если токен уже есть, декодируем его и записываем в dataUser
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setDataUser(decodedToken);
            console.log(decodedToken)
        }
    }, [dataLogin]);
    const logout = () => {
        localStorage.removeItem('dataUser');
        setDataUser(null)
        setModalUnderElem(false)
    }

    const handelRegistration = async () => {
        await registration({email: email, password: password});
        // if (!isErrorRegistration) {
        //     await login({email: email, password: password});
        //     window.location.reload()
        // }
        setVisibleModal(false)


    };
    const handelLogin = async () => {
        await login({email: email, password: password});
        setVisibleModal(false)
        setEmail('')
        setPassword('')
    };
    return (
        <div className={cls.musicHeader}>
            <div className={cls.headerInfBlock}>
                <h1 className={cls.headerInfBlockTitle}>Welcome back, User!</h1>
                <h3 className={cls.headerInfBlockDesc}>*** songs for you</h3>
            </div>
            <div className={cls.searchBlock}>
                <BiSearch/>
                <input className={cls.search} placeholder={'Search by title, artist, or album...'}></input>
            </div>

            <div className={cls.userAuthControl}>
                {dataUser && dataUser.email ? (
                    <div className={cls.profileBlock}>
                        <h1 onClick={() => setModalUnderElem(prevState => !prevState)}
                            className={cls.profileEmail}>{dataUser.email}</h1>
                        <div>
                            <div onClick={() => setModalUnderElem(prevState => !prevState)} className={cls.profileImg}>
                                <img src={face} alt={'face'} width={55}/>
                            </div>
                            <ModalInderElem isVisible={modalUnderElem}
                                            setIsVisible={setModalUnderElem}>
                                <div onClick={() => logout()} className={cls.buttonUserSettings}>
                                    <button>Logout</button>
                                    <BiLogOut/>
                                </div>
                                <div className={cls.buttonUserSettings}>
                                    <button>Settings</button>
                                    <TbSettings/>
                                </div>
                            </ModalInderElem>
                        </div>
                    </div>
                ) : (
                    <>
                        <button onClick={() => {
                            setVisibleModal(prevState => !prevState)
                            setModeModal('login')
                        }} className={cls.buttonUserAuth}>
                            Login
                            <HiMiniChevronRight/>
                        </button>
                        <button onClick={() => {
                            setVisibleModal(prevState => !prevState)
                            setModeModal('registration')
                        }} className={cls.buttonUserAuth}>
                            Registration
                            <HiMiniChevronRight/>
                        </button>
                    </>
                )}
            </div>

            {
                <Modal visible={visibleModal} setVisible={setVisibleModal}>
                    {modeModal === 'login' &&
                        <div className={cls.blockAuthControl}>
                            <h1 className={cls.titleAuthControl}>Login</h1>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                   className={cls.inputAuthControl}
                                   placeholder={'email'}></input>
                            <div className={cls.passwordBlock}>
                                <input
                                    value={password}
                                    onChange={(e: any) => {
                                        setPassword(e.target.value)
                                    }}
                                    maxLength={16}
                                    type={showPassword ? 'text' : 'password'}
                                    className={cls.inputAuthControl}
                                    placeholder={'password'}></input>
                                {showPassword ?
                                    <div className={cls.passwordChangeMode}
                                         onClick={() => setShowPassword(prevState => !prevState)}>
                                        <FiEye/>
                                    </div> :
                                    <div className={cls.passwordChangeMode}
                                         onClick={() => setShowPassword(prevState => !prevState)}>
                                        <FiEyeOff/>
                                    </div>
                                }
                            </div>
                            <button
                                onClick={handelLogin}
                                className={cls.buttonAuthControl}
                            >
                                continue
                            </button>
                        </div>
                    }
                    {modeModal === 'registration' &&
                        <div
                            className={cls.blockAuthControl}>
                            <h1 className={cls.titleAuthControl}>Регистрация</h1>
                            <input value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className={cls.inputAuthControl}
                                   placeholder={'email'}></input>
                            <div className={cls.passwordBlock}>
                                <input value={password}
                                       onChange={(e: any) => setPassword(e.target.value)}
                                       maxLength={16}
                                       type={showPassword ? 'text' : 'password'}
                                       className={cls.inputAuthControl}
                                       placeholder={'password'}></input>
                                {showPassword ?
                                    <div className={cls.passwordChangeMode}
                                         onClick={() => setShowPassword(prevState => !prevState)}>
                                        <FiEye/>
                                    </div> :
                                    <div className={cls.passwordChangeMode}
                                         onClick={() => setShowPassword(prevState => !prevState)}>
                                        <FiEyeOff/>
                                    </div>
                                }
                            </div>
                            <button onClick={handelRegistration}
                                    className={cls.buttonAuthControl}>continue
                            </button>
                        </div>
                    }
                </Modal>}
        </div>
    )
}

export default musicHeader
