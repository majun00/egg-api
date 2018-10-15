const Service = require('egg').Service;
const tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
const tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
const tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
const baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
const baidukey2 = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';

class AddressService extends Service {
    // 获取定位地址
    async guessPosition() {
        const ctx = this.ctx
        return new Promise(async (resolve, reject) => {
            // let ip = ctx.request.headers['x-forwarded-for'] ||
            //     ctx.request.connection.remoteAddress ||
            //     ctx.request.socket.remoteAddress ||
            //     ctx.request.connection.socket.remoteAddress;
            // const ipArr = ip.split(':');
            // ip = ipArr[ipArr.length - 1];
            // console.log('--ip', ip)
            // if (process.env.NODE_ENV == 'development') {
            //     ip = '180.158.102.141';
            // }
            let ip = '180.158.102.141';
            try {
                let result = (await ctx.curl('http://apis.map.qq.com/ws/location/v1/ip', {
                    data: {
                        ip,
                        key: tencentkey,
                    },
                    dataType: 'json',
                })).data

                if (result.status != 0) {
                    result = (await ctx.curl('http://apis.map.qq.com/ws/location/v1/ip', {
                        data: {
                            ip,
                            key: tencentkey2,
                        }
                    })).data
                }

                if (result.status != 0) {
                    result = (await ctx.curl('http://apis.map.qq.com/ws/location/v1/ip', {
                        data: {
                            ip,
                            key: tencentkey3,
                        }
                    })).data
                }

                if (result.status == 0) {
                    const cityInfo = {
                        lat: result.result.location.lat,
                        lng: result.result.location.lng,
                        city: result.result.ad_info.city,
                    }
                    cityInfo.city = cityInfo.city.replace(/市$/, '')
                    resolve(cityInfo)
                } else {
                    reject('定位失败')
                }

            } catch (err) {
                reject(err)
            }

        })
    }

    // 搜索地址
    async searchPlace(keyword, cityName, type = 'search') {
        try {
            const resObj = await ctx.curl('http://apis.map.qq.com/ws/place/v1/search', {
                data: {
                    key: tencentkey,
                    keyword: encodeURIComponent(keyword),
                    boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
                    page_size: 10,
                },
                dataType: 'json',
            })
            if (resObj.status == 0) {
                return resObj
            } else {
                throw new Error('搜索位置信息失败')
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    // 测量距离
    async getDistance() {

    }

    // 通过ip地址获取精确位置
    async geocoder() {

    }

    // 通过geohash获取精确位置
    async getpois() {

    }
}

module.exports = AddressService;