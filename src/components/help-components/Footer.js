import './Footer.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return(
        <div className='footer'>
            <div className='footer-wrapper'>
                <div className='footer__info'>
                    <div className='footer__info-mapOfSait'>
                        <p className='mapOfSait__name'>Карта сайта</p>
                        <div className='mapOfSait__choice'>
                            <div className='mapOfSait__choice-main'>
                                <span>
                                    <Link to='/'>Главная</Link>
                                </span>
                            </div>
                            <div className='mapOfSait__choice-news'>
                                <span>
                                    <Link to='news'>
                                        Новости
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='footer__info-contact'>
                        <p className='contact__name'>Контакты</p>
                        <div className='contact__choice'>
                            <div className='contact__choice-phone'>
                                <span>+380660065903</span>
                            </div>
                            <div className='contact__choice-email'>
                                <span>vanysuper22@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer__border'></div>
                <div className='footer__policity'>
                    <span className='footer__policity-info'>
                        Политика конфиденциальности
                    </span>
                    <span className='footer__policity-madeBy'>
                        Сделано IvanDevTop
                    </span>
                </div>
            </div>
        </div>
    )
}