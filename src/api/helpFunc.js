function imgError(e) {
    e.target.style.display = 'none'
}

function checkImg() {
    document.querySelectorAll('img').forEach(elem => {
        if(Boolean(elem.src) === false){
            elem.style.display = 'none'
        }
    })
}

function getQueryStringParams(query) {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                    let [key, value] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, {}
            )
        : {}
}

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


export default {
    imgError,
    checkImg,
    getQueryStringParams,
    dateBeautyFunc
}