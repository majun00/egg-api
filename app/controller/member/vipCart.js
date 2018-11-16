const Controller = require('egg').Controller

class VipCartController extends Controller {
    // 全部处理放在service，后期再抽象
    async useCart() {
        await this.service.member.vipCart.useCart()
    }
}

module.exports = VipCartController