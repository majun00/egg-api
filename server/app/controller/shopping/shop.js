const Controller = require('egg').Controller

class ShopController extends Controller {
    // POST /shopping/addShop
    async addShop() {
        await this.service.shopping.shop.addShop()
    }

    // GET /shopping/restaurants
    async getRestaurants() {
        await this.service.shopping.shop.getRestaurants()
    } 
    
    async searchResaturant() {
        await this.service.shopping.shop.searchResaturant()
    }

    async getRestaurantDetail() {
        await this.service.shopping.shop.getRestaurantDetail()
    }

    // GET /shopping/restaurants/count
    async getShopCount() {
        await this.service.shopping.shop.getShopCount()
    }

    // POST /shopping/updateshop
    async updateshop() {
        await this.service.shopping.shop.updateshop()
    }

    // DELETE /shopping/restaurant/:restaurant_id
    async deleteResturant() {
        await this.service.shopping.shop.deleteResturant()
    }


}

module.exports = ShopController