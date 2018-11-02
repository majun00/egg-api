const Service = require('egg').Service;
const pinyin = require('pinyin')

class CityService extends Service {
    async getCity() {
        const ctx = this.ctx
        const type = ctx.request.query.type
        let cityInfo
        try {
            switch (type) {
                case 'guess':
                    const city = await this.getCityName()
                    cityInfo = await ctx.model.City.cityGuess(city)
                    break
                case 'hot':
                    cityInfo = await ctx.model.City.cityHot()
                    break
                case 'group':
                    cityInfo = await ctx.model.City.cityGroup()
                    break
                default:
                    ctx.body = {
                        name: 'ERROR_QUERY_TYPE',
                        message: '参数错误',
                    }
                    return
            }
            ctx.body = cityInfo
        } catch (err) {
            ctx.body = {
                name: 'ERROR_DATA',
                message: '获取数据失败',
            }
        }
    }

    async getCityName() {
        const ctx = this.ctx
        let cityInfo
        try {
            cityInfo = await ctx.service.address.guessPosition()
        } catch (err) {
            this.ctx = {
                name: 'ERROR_DATA',
                message: '获取数据失败',
            }
            return
        }
        //汉字转换成拼音
        const pinyinArr = pinyin(cityInfo.city, {
            style: pinyin.STYLE_NORMAL
        })
        let cityName = ''
        pinyinArr.forEach(item => {
            cityName += item[0]
        })
        return cityName
    }

    async getCityById() {
        const ctx = this.ctx
        const cityid = ctx.params.id;

        if (isNaN(cityid)) {
            ctx.body = {
                name: 'ERROR_PARAM_TYPE',
                message: '参数错误',
            }
            return
        }

        try {
            const cityInfo = await ctx.model.City.getCityById(cityid);
            ctx.body = cityInfo
        } catch (err) {
            ctx.body = {
                name: 'ERROR_DATA',
                message: '获取数据失败',
            }
        }

    }

    async getExactAddress() {

    }

    async pois() {
        const ctx = this.ctx
        const geohash = ctx.params.geohash;

        try {
            if (geohash.indexOf(',') == -1) {
                throw new Error('参数错误')
            }
        } catch (err) {
            console.log('参数错误');
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误',
            }
            return
        }

        const poisArr = geohash.split(',');
        try {
            const result = await ctx.service.address.getpois(poisArr[0], poisArr[1]);
            const address = {
                address: result.result.address,
                city: result.result.address_component.province,
                geohash,
                latitude: poisArr[0],
                longitude: poisArr[1],
                name: result.result.formatted_addresses.recommend,
            }
            ctx.body = address
        } catch (err) {
            console.log('getpois返回信息失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '获取数据失败',
            }
        }

    }
}


module.exports = CityService;