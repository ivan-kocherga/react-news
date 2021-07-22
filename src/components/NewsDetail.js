import './NewsDetail.css'
import React, {useEffect, useRef, useState} from 'react'
import newsApi from '../api/NewsAPI'
import {
    useParams,
    Redirect
} from "react-router-dom";

export default function NewsDetail() {
    let [data, setData] = useState([])
    let {id} = useParams()
    let [imgErrorHandler, setImgErrorHandler] = useState(false)

    useEffect( () => {
        if (newsApi.info.lastUpdate !== null) {
            let data_ = newsApi.info.lastUpdate.data.articles[id]
            data_['dateBeauty'] = dateBeautyFunc(data_.publishedAt)
            setData(data_)
        } else {
            newsApi.getStartNews().then(res => {
                setData(res.data.articles[id])
            })
        }
    }, [])

    function dateBeautyFunc(a) {
        let date = new Date(a)

        let hours = date.getHours()
        let minutes = date.getMinutes()
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (hours < 10) {
            hours = '0' + hours
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }

        let dateBeauty = `${hours}:${minutes} ${dd}.${mm}.${yyyy}`

        return dateBeauty
    }

    function imgError() {
        setImgErrorHandler(true)
        document.querySelector('.img').style.display = 'none'
    }

    return (
        <div className='newsDetail'>
            <div className='newsDetail-wrapper'>


                {!imgErrorHandler ?
                    <div className='img-shadow'>
                        <img className='img' src={data.urlToImage} onError={() => imgError()}/>
                        <h1 className='newsDetail__title-title'>{data.title}</h1>
                    </div> :
                    <h1 className='newsDetail__title-title2'>{data.title}</h1>
                }

                <div className='newsDetail__title'>
                    <p className='newsDetail__title-author'>Автор: <span>{data.author ? data.author : 'Инкогнито'}</span>
                    </p>
                    <p className='newsDetail__title-date'>Дата: <span>{data.dateBeauty}</span></p>
                </div>
                <div className='content'>
                    <p>
                        {data.description}
                    </p>
                    <p>
                        Источник: <a target='_blank' href={data.url}>Клик и вы там</a>
                    </p>
                </div>
            </div>
        </div>
    )
}