const Controller = require('egg').Controller

class CategoryController extends Controller {
    // GET /shopping/v2/restaurant/category
    async getCategories() {
        await this.service.category.getCategories()
    }

    async addCategory() {
        await this.service.category.addCategory()
    }

    async findById() {
        await this.service.category.findById()
    }

    async getDelivery() {
        await this.service.category.getDelivery()
    }

    async getActivity() {
        await this.service.category.getActivity()
    }

}

module.exports = CategoryController