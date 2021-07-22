import axios from "axios";

const apiKey = '4f8f9ffed2bf47b896d4d37e2db042f2'

let info = {
    lastUpdate: null,
    previousValues: null,
    history: []
}

function getStartNews() {
    info.previousValues = info.lastUpdate
    return new Promise((resolve, reject) => {
        console.log('server...')
        axios.get('https://newsapi.org/v2/top-headlines?country=ua&apiKey=' + apiKey)
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
        axios.get(`https://newsapi.org/v2/everything?q=${newsName}&from=2021-06-21&sortBy=publishedAt&apiKey=` + apiKey)
            .then(res => {
                info.lastUpdate = res
                info.history.push(res)
                resolve(res)
            }).catch(err => {
            reject(err.response.status)
        })
    })
}

export default {getStartNews, getSearchNews, info}
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