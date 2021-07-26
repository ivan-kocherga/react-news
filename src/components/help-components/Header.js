import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import {useAlert} from "react-alert";

import Context from "../../api/context";
import NewsAPI from "../../api/NewsAPI";
import store from "../../api/store";

export default function Header() {

    const alert = useAlert()
    let {update} = useContext(Context)
    let [value, setValue] = useState({value: NewsAPI.country})

    function logout(){
        localStorage.clear()
        alert.show('Выход из системы...')
        update()
    }

    function handleChange(event) {
        setValue({value: event.target.value})

        NewsAPI.setCountry(event.target.value)

        let user = JSON.parse(localStorage.getItem('user'))
        user.country = event.target.value
        localStorage.setItem('user', JSON.stringify(user))

        store.dispatch({type: event.target.value, value: event.target.value})
    }

    return(
        <div className='header'>
            <div className='header-wrapper'>
                <div className='header__logo'>
                    <Link to='/'>
                        News
                    </Link>
                </div>
                
                <nav className='header__nav'>
                    <div className='header__nav-item'>
                        <NavLink 
                            to='/'
                            exact 
                            activeStyle={{
                                textDecoration: 'underline'
                            }}
                        >
                            Главная
                        </NavLink>
                    </div>
                    <div className='header__nav-item'>
                        <NavLink 
                            to='/news'
                            exact 
                            activeStyle={{
                                textDecoration: 'underline'
                            }}
                        >
                            Новости
                        </NavLink>
                    </div>
                    <div className='header__nav-item btn-auth'>
                            {
                                Boolean(localStorage.getItem('token')) ?
                                    <Link to='/auth'><button onClick={logout}>Выйти</button></Link>
                                    : <Link to='/auth'><button>Войти</button></Link>
                            }
                    </div>
                    <div>
                        <select name='select' value={value.value} onChange={handleChange}>
                            <option value="ua">Украина</option>
                            <option value="us">Америка</option>
                            <option value="ru">Россия</option>
                        </select>
                    </div>
                </nav>
            </div>

        </div>
    )
}