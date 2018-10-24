const Controller = require('egg').Controller;
const pinyin = require('pinyin')

class CityController extends Controller {
    async getCity() {
        await this.service.v1.city.getCity()
    }

    async getCityName() {
        await this.service.v1.city.getCityName()
    }

    async getCityById() {
        await this.service.v1.city.getCityById()
    }

    async getExactAddress() {
        await this.service.v1.city.getExactAddress()
    }

    async pois() {
        await this.service.v1.city.pois()
    }
}


module.exports = CityController;