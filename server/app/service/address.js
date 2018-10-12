const Service = require('egg').Service;
const tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
const tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
const tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
const baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
const baidukey2 = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';

class AddressService extends Service {
    async guessPosition() {
        const ctx = this.ctx
        return new Promise(async (resolve, reject) => {
            // let ip = req.headers['x-forwarded-for'] ||
            //     req.connection.remoteAddress ||
            //     req.socket.remoteAddress ||
            //     req.connection.socket.remoteAddress;
            // const ipArr = ip.split(':');
            // ip = ipArr[ipArr.length - 1];
            // if (process.env.NODE_ENV == 'development') {
            //     ip = '180.158.102.141';
            // }
            let ip;
            ip = '180.158.102.141';
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
}

module.exports = AddressService;