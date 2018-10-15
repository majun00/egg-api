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
            ctx.body = {
                cityInfo
            }
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

    }

    async getExactAddress() {

    }

    async pois() {

    }
}


module.exports = CityService;