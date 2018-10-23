let baseUrl = ''
let baseImgPath
let routerMode = 'hase'

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'api'
    baseImgPath = 'http://127.0.0.1:7001/public/temp/'
} else {
    baseUrl = '//elm.cangdu.or'
    baseImgPath = '//elm.cangdu.org/img/'
}

export {
    baseUrl,
    baseImgPath,
    routerMode,
}