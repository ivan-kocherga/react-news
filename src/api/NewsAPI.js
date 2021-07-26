import axios from "axios";

const apiKey = 'c0cd531d511648539f9aa54438e2a628'
let country = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).country : 'ua'

let info = {
    lastUpdate: null,
    previousValues: null,
    history: []
}

function getStartNews() {
    info.previousValues = info.lastUpdate
    return new Promise((resolve, reject) => {
        console.log('server...')
        axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)
            .then(res => {
                info.lastUpdate = res
                info.history.push(res)
                resolve(res)
            }).catch(err => {
                reject(err.response.status)
            })
    })
}

function getSearchNews(newsName) {
    info.previousValues = info.lastUpdate
    return new Promise((resolve, reject) => {
        console.log('server...')
        axios.get(`https://newsapi.org/v2/everything?q=${newsName}&sortBy=popularity&apiKey=${apiKey}`)
            .then(res => {
                info.lastUpdate = res
                info.history.push(res)
                resolve(res)
            }).catch(err => {
            reject(err.response.status)
        })
    })
}

function getNewsCountry(getCountry) {
    info.previousValues = info.lastUpdate
    return new Promise((resolve, reject) => {
        console.log('server...')
        axios.get(`https://newsapi.org/v2/top-headlines?country=${getCountry}&apiKey=${apiKey}`)
            .then(res => {
                info.lastUpdate = res
                info.history.push(res)
                resolve(res)
            }).catch(err => {
            reject(err.response.status)
        })
    })
}

function setCountry(getCountry) {
    country = getCountry
}

export default {
    getStartNews,
    getSearchNews,
    setCountry,
    getNewsCountry,
    info,
    country
}
/*
    https://newsapi.org/v2/everything?q=tesla&from=2021-06-20&sortBy=publishedAt&apiKey=b4a8265f2fcf4b6f8d128bc3e3806969

    "status": "ok",
    "totalResults": 6635,
    -"articles": [
    -{
    -"source": {
    "id": null,
    "name": "Seeking Alpha"
    },
    "author": "Business Quant",
    "title": "NIO: Don't Be Fooled",
    "description": "Bears may argue that NIO stock is poised for a sharp correction, but the Street isn't buying into the bearish narratives just yet. Read more about NIO here.",
    "url": "https://seekingalpha.com/article/4439907-nio-dont-be-fooled",
    "urlToImage": "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1271270945/large_image_1271270945.jpg",
    "publishedAt": "2021-07-20T12:30:00Z",
    "content": "Andy Feng/iStock Editorial via Getty Images\r\nEver since its IPO three years ago, NIO (NIO) has garnered a lot of skepticism in various investing forums. While some believe the stock is overvalued and… [+7531 chars]"
    },
*/