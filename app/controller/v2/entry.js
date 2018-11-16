const Controller = require('egg').Controller

class EntryController extends Controller {
    // 全部处理放在service，后期再抽象
    async getEntry() {
        await this.service.v2.entry.getEntry()
    }
}

module.exports = EntryController