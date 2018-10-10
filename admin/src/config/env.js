let baseUrl = ''
let baseImgPath
let routerMode = 'hase'

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'api'
    baseImgPath = '/img/'
} else {
    baseUrl = '//elm.cangdu.or'
    baseImgPath = '//elm.cangdu.org/img/'
}

export {
    baseUrl,
    baseImgPath,
    routerMode,
}