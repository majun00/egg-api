let baseUrl = ''
let baseImgPath
let routerMode = 'hase'

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'api'
    baseImgPath = '//127.0.0.1:7001/public/temp/'
} else {
    baseUrl = '//47.110.44.176:7001'
    baseImgPath = '//47.110.44.176:7001/img/'
}

export {
    baseUrl,
    baseImgPath,
    routerMode,
}