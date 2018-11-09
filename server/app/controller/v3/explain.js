const Controller = require('egg').Controller

class ExplainController extends Controller {
    // 全部处理放在service，后期再抽象
    async getExpalin() {
        await this.service.v3.explain.getExpalin()
    }
}

module.exports = ExplainController