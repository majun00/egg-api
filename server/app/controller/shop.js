const Controller = require('egg').Controller

class ShopController extends Controller {
    // POST /shopping/addShop
    async addShop() {
        await this.service.shop.addShop()
    }

    // GET /shopping/restaurants/count
    async getShopCount() {
        await this.service.shop.getShopCount()
    }

    // GET /shopping/restaurants
    async getRestaurants() {
        await this.service.shop.getRestaurants()
    }

    // POST /shopping/updateshop
    async updateshop() {
        await this.service.shop.updateshop()
    }

    // DELETE /shopping/restaurant/:restaurant_id
    async deleteResturant() {
        await this.service.shop.deleteResturant()
    }


}

module.exports = ShopController