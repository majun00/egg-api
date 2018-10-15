const Controller = require('egg').Controller;
const pinyin = require('pinyin')

class CityController extends Controller {
    async getCity() {
        await this.service.city.getCity()
    }

    async getCityName() {
        await this.service.city.service.getCityName()
    }

    async getCityById() {
        await this.service.city.service.getCityById()
    }

    async getExactAddress() {
        await this.service.city.service.getExactAddress()
    }

    async pois() {
        await this.service.city.service.pois()
    }
}


module.exports = CityController;