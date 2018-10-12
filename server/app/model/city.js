const cityData = require('../InitData/cities')

module.exports = app => {
    const mongoose = app.mongoose

    const citySchema = new mongoose.Schema({
        data: {}
    })

    citySchema.statics.cityGuess = (name) => {
        return new Promise(async (resolve, reject) => {
            const firtWord = name.substr(0, 1).toUpperCase()
            try {
                const city = await this.findOne()
                Object.entries(city.data).forEach(item => {
                    if (item[0] == firtWord) {
                        item[1].forEach(cityItem => {
                            if (cityItem.pinyin == name) {
                                resolve(cityItem)
                            }
                        })
                    }
                })
            } catch (err) {
                reject({
                    name: 'ERROR_DATA',
                    message: '查找数据失败'
                })

            }
        })
    }

    citySchema.statics.cityHot = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const city = await this.findOne()
                resolve(city.data.hotCities)
            } catch (err) {
                reject({
                    name: 'ERROR_DATA',
                    message: '查找数据失败',
                })
            }
        })
    }

    citySchema.statics.cityGroup = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const city = await this.findOne()
                const cityObj = city.data
                delete(cityObj._id)
                delete(cityObj.hotCities)
                resolve(cityObj)
            } catch (err) {
                reject({
                    name: 'ERROR_DATA',
                    message: '查找数据失败',
                });
            }
        })
    }

    citySchema.statics.getCityById = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const city = await this.findOne();
                Object.entries(city.data).forEach(item => {
                    if (item[0] !== '_id' && item[0] !== 'hotCities') {
                        item[1].forEach(cityItem => {
                            if (cityItem.id == id) {
                                resolve(cityItem)
                            }
                        })
                    }
                })
            } catch (err) {
                reject({
                    name: 'ERROR_DATA',
                    message: '查找数据失败',
                });
            }
        })
    }

    const Cities = mongoose.model('City', citySchema)

    Cities.findOne((err, data) => {
        if (!data) {
            Cities.create({ data: cityData })
        }
    })

    return Cities
}