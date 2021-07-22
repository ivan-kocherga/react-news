import './News.css'
import React, {useEffect, useState} from 'react'
import Modal from './help-components/Modal'

import newsApi from '../api/NewsAPI'
import {Redirect, useParams} from 'react-router-dom'
import Masonry from 'react-responsive-masonry'


function inputSetting(initialValue = '') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [value, setValue] = useState(initialValue)

    return {
        value,
        onChange: event => {
            setValue(event.target.value)
        }
    }
}



export default function News() {
    let [news, setNews] = useState([])
    let [error, setError] = useState(false)
    let [modal, setModal] = useState(false)

    let [notNews, setNotNews] = useState(false)

    let [index, SetRedirect] = useState({redirect: false, index: null})

    let input = inputSetting(localStorage.getItem('lastRequest') !== null ? localStorage.getItem('lastRequest'): '')

    let {request} = useParams()

    useEffect(() => {
        if (news.length === 0) {
            if(newsApi.info.lastUpdate !== null){
                console.log(request)
                let data = newsApi.info.lastUpdate.data.articles
                setNews(data)
            }else {
                newsApi.getStartNews().then(async (res) => {
                    let data = res.data.articles
                    if(data.length === 0){

                    }
                    setNews(data)
                }).catch(error => {
                    setError(error)
                })
            }
            checkImg()
        }
    }, [])

    function imgError(name) {
        document.querySelector('.'+name).style.display = 'none'
    }
    function checkImg() {
        document.querySelectorAll('img').forEach(elem => {
            if(Boolean(elem.src) === false){
                elem.style.display = 'none'
            }
        })
    }

    function detailWatchNewsElem(index) {
        if(localStorage.getItem('token') === null){
            setModal(true)
        }else {
            SetRedirect({redirect: true, index})
        }
    }

    function closeModal(){
        setModal(false)
    }

    async function searchNews() {
        if(input.value.trim() !== ''){
            setNews([])
            newsApi.getSearchNews(input.value).then((res) => {
                let data = res.data.articles
                if(data.length !== 0){
                    setNews(data)
                    setNotNews(false)
                }else {
                    setNotNews(true)
                }
            }).catch(error => {
                setError(error)
            })
        }
    }

    return (
        <div className='news'>

            <div className="news-wrapper">
                <div className="news__title">
                    <h1>Новости Украины</h1>
                    <div className='news__title-search'>
                        <input type="text" {...input} placeholder='Какие новости вы хотите найти?'/>
                        <button onClick={searchNews}>Готово</button>
                    </div>
                </div>
                <Masonry columnsCount={3}>
                    {
                        news.length > 0 ? news.map((elem, index) => {
                                return (
                                    <div className='news__elem slider-elem' key={index}>
                                        <img className={'img-'+ index} src={elem.urlToImage} onError={() => imgError('img-'+ index)}/>
                                        <h3 className='news__elem-title'>{elem.title}</h3>
                                        <p className='news__elem-description' dangerouslySetInnerHTML={{__html: elem.description}}/>
                                        <p className='news__elem-author'>{elem.author}</p>
                                        <button className='news__elem-detail' onClick={() => detailWatchNewsElem(index)}>Посмотреть детальнее</button>
                                    </div>
                                )
                            })
                            : error ? <div className='load-error'><p>Ошибка {error}</p><p>Дайте денег и я куплю api:)</p></div>
                            : !notNews ? <p className='load'>Загрузка...</p> :<p className='load'>Новостей не найдено...</p>
                    }
                </Masonry>
            </div>
            {modal ? <Modal closeModal={closeModal}/> : void 0}
            {index.redirect ? <Redirect to={'news/' + index.index}/> : void 0}
             <Redirect to={'news?request='+123}/>
        </div>
    )
}