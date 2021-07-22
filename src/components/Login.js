import './Login.css'
import React, { useState, useEffect, useRef, useContext } from 'react'
import auth from "../api/AuthAPI";
import { useAlert } from "react-alert";
import { Redirect } from "react-router-dom";
import Context from "../api/context";

export default function Login() {
    let [password, setPassword] = useState('')
    let [email, setEmail] = useState('')
    let [watchPassword, SetIsWatchPassword] = useState(false)

    let [passwordError, setErrorPassword] = useState([])
    let [emailError, setErrorEmail] = useState([])

    let isValidForm = useRef(false)
    const alert = useAlert()

    let focusInput = useRef(null)

    let [redirectToMain, setRedirectToMain] = useState(false)

    let {update} = useContext(Context)

    useEffect(() => {
        focusInput.current.focus()
    }, [focusInput])

    useEffect(() => {
        let re = /\S+@\S+\.\S+/

        if(password.length >= 8 && re.test(email) !== false){
            isValidForm.current = true
            return void 0
        }
        isValidForm.current = false
    }, [password, email])


    function submitForm(){

        let re = /\S+@\S+\.\S+/


        if(re.test(email) === false && email.length > 0){
            setErrorEmail(['не коректная електронная почта'])
        }else {
            setErrorEmail([])
        }

        if(password.length < 8 && password.length > 0){
            setErrorPassword(['не коректный пароль'])
        }else {
            setErrorPassword([])
        }

        if(isValidForm.current){
            let obj = {
                email,
                password
            }

            auth(obj).then(res => {
                alert.show('Отлично! Добро пожаловать в умопомрачительный новостной сайт', {
                    type: 'success'
                })
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.infoUser))
                update()
                setRedirectToMain(true)
            }).catch(error => {
                alert.show(error.textError, {
                    type: 'error'
                })
            })
        }
    }

    return(
        <div className='auth'>
            <div className='auth-wrapper'>
                <div className='auth__header'>
                    <h1>Войди в систему новостей</h1>
                </div>
                <div className='auth__email'>
                    <span>Электронная почта: </span>
                    <input type='email' value={email} ref={focusInput} onChange={(event) => setEmail(event.target.value)}/>
                    <div className='error-email'>
                        {emailError.join(' ')}
                    </div>
                </div>

                <div className='auth__password'>
                    <span>Пароль: </span>
                    <input type={watchPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <div onClick={() => SetIsWatchPassword(!watchPassword)} className='auth__password-btnPassword'>
                        {
                            watchPassword ? <span>Скрыть пароль</span> : <span>Посмотреть пароль</span>
                        }
                    </div>
                    <div className='error-password'>
                        {passwordError.join(' ')}
                    </div>
                </div>

                
                <button className='auth__submit' onClick={submitForm}>Погнали дальше</button>
            </div>
            {redirectToMain ?  <Redirect to='/'/> : void 0}
        </div>
    )
}