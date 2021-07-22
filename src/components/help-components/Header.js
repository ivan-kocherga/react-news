import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import {useAlert} from "react-alert";

import Context from "../../api/context";

export default function Header() {

    const alert = useAlert()
    let {update} = useContext(Context)

    function logout(){
        localStorage.clear()
        alert.show('Выход из системы...')
        update()
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
                </nav>
            </div>

        </div>
    )
}