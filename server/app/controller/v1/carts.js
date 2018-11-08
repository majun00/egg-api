const Controller = require('egg').Controller

class CartsController extends Controller {
    // 全部处理放在service，后期再抽象
    async checkout() {
        await this.service.v1.carts.checkout()
    }

}

module.exports = CartsController