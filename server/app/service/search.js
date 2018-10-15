const Service = require('egg').Service

class searchService extends Service {
    async search() {
        const ctx = this.ctx
        let { type = 'search', city_id, keyword } = ctx.request.query
        if (!keyword) {
            ctx.body = {
                name: 'ERROR_QUERY_TYPE',
                message: '缺少关键词',
            }
            return
        } else if (isNaN(city_id)) {
            try {
                const cityName = await ctx.service.city.getCityName()
                const cityInfo = await ctx.model.City.cityGuess(cityName)
                city_id = cityInfo.id
            } catch (err) {
                ctx.body = {
                    name: 'ERROR_GET_POSITION',
                    message: '获取数据失败',
                }
            }
        }
        try {
            const cityInfo = await ctx.model.City.getCityById(city_id)
            const resObj = await ctx.service.address.searchPlace(keyword, cityInfo.name, type)
            const cityList = []
            resObj.data.forEach((item, index) => {
                cityList.push({
                    name: item.title,
                    address: item.address,
                    latitude: item.location.lat,
                    longitude: item.location.lng,
                    geohash: item.location.lat + ',' + item.location.lng,
                })
            })
            ctx.body = {
                data: cityList
            }
        } catch (err) {
            ctx.body = {
                name: 'GET_ADDRESS_ERROR',
                message: '获取地址信息失败:'+ err,
            }
        }
    }
}

module.exports = searchService