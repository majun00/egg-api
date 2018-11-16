const Controller = require('egg').Controller

class RemarkController extends Controller {
    // 全部处理放在service，后期再抽象
    async getRemarks() {
        await this.service.v1.remark.getRemarks()
    }

}

module.exports = RemarkController