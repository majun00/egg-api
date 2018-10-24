const Controller = require('egg').Controller

class CategoryController extends Controller {
    // GET /shopping/v2/restaurant/category
    async getCategories() {
        await this.service.shopping.category.getCategories()
    }

    async addCategory() {
        await this.service.shopping.category.addCategory()
    }

    async findById() {
        await this.service.shopping.category.findById()
    }

    async getDelivery() {
        await this.service.shopping.category.getDelivery()
    }

    async getActivity() {
        await this.service.shopping.category.getActivity()
    }

}

module.exports = CategoryController