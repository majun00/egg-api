const Controller = require('egg').Controller

class OrderController extends Controller {
    // 全部处理放在service，后期再抽象
    async postOrder() {
        await this.service.v1.order.postOrder()
    }

    async getOrders() {
        await this.service.v1.order.getOrders()
    }

    async getDetail() {
        await this.service.v1.order.getDetail()
    }

    async getAllOrders() {
        await this.service.v1.order.getAllOrders()
    }

    async getOrdersCount() {
        await this.service.v1.order.getOrdersCount()
    }

}

module.exports = OrderController