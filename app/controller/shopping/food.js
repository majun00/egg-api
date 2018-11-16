const Controller = require('egg').Controller

class FoodController extends Controller {
    async initData() {
        await this.service.shopping.food.initData()
    }

    // GET /shopping/v2/restaurant/category
    async getCategory() {
        await this.service.shopping.food.getCategory()
    }

    // post /shopping/addcategory
    async addCategory() {
        await this.service.shopping.food.addCategory()
    }

    async addFood() {
        await this.service.shopping.food.addFood()
    }

    async getSpecfoods() {
        await this.service.shopping.food.getSpecfoods()
    }

    async getMenu() {
        await this.service.shopping.food.getMenu()
    }

    async getMenuDetail() {
        await this.service.shopping.food.getMenuDetail()
    }

    async getFoods() {
        await this.service.shopping.food.getFoods()
    }

    async getFoodsCount() {
        await this.service.shopping.food.getFoodsCount()
    }

    async updateFood() {
        await this.service.shopping.food.updateFood()
    }

    async deleteFood() {
        await this.service.shopping.food.deleteFood()
    }

}

module.exports = FoodController