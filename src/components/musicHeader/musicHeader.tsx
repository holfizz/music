import {FC, useEffect, useState} from 'react'
import cls from './musicHeader.module.scss'
import {BiSearch} from "react-icons/bi";
import {HiMiniChevronRight} from "react-icons/hi2";
import Modal from "../modal/modal.tsx";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {useLoginMutation, useRegistrationMutation} from "../../api/auth.api.ts";

const musicHeader: FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [modeModal, setModeModal] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [registration, {
        data: dataRegistration
        // isError: isErrorRegistration,
        // isSuccess: isSuccessRegistration,
        // error: errorRegistration
    }] = useRegistrationMutation()
    const [login, {
        data: dataLogin
        // isError: isErrorLogin,
        // isSuccess: isSuccessLogin,
        // error: errorLogin
    }] = useLoginMutation()

    useEffect(() => {
        console.log(email)
        console.log(password)
    }, []);
    useEffect(() => {
        console.log(dataLogin)
        console.log(dataRegistration)

    }, [dataLogin, dataRegistration]);
    const handelRegistration = async () => {
        await registration({email: email, password: password});
    };
    const handelLogin = async () => {
        await login({email: email, password: password});
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
            </div>
            {/*<div className={cls.profile}>*/}
            {/*    <img src={face} alt={'face'} width={55}/>*/}
            {/*</div>*/}
            {<Modal visible={visibleModal} setVisible={setVisibleModal}>
                {modeModal === 'login' &&
                    <div className={cls.blockAuthControl}>
                        <h1 className={cls.titleAuthControl}>Login</h1>
                        <input onChange={(e) => setEmail(e.target.value)} className={cls.inputAuthControl}
                               placeholder={'email'}></input>
                        <div className={cls.passwordBlock}>
                            <input
                                onClick={(e: any) => setPassword(e.target.value)}
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
                    <div className={cls.blockAuthControl}>
                        <h1 className={cls.titleAuthControl}>Registration</h1>
                        <input onChange={(e) => setEmail(e.target.value)} className={cls.inputAuthControl}
                               placeholder={'email'}></input>
                        <div className={cls.passwordBlock}>
                            <input
                                onClick={(e: any) => setPassword(e.target.value)}
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
