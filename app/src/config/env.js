/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'api'
    imgBaseUrl = 'http://127.0.0.1:7001/public/temp/';

} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '//47.110.44.176:7001';
    imgBaseUrl = '//47.110.44.176:7001/img/';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}