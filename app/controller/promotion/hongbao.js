const Controller = require('egg').Controller

class HongbaoController extends Controller {
    // 全部处理放在service，后期再抽象
    async getHongbao() {
        await this.service.promotion.hongbao.getHongbao('intime')
    }

    async getExpiredHongbao() {
        await this.service.promotion.hongbao.getHongbao('expired')
    }

    async exchange() {
        await this.service.promotion.hongbao.exchange()
    }
}

module.exports = HongbaoController