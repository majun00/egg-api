const Controller = require('egg').Controller

class StatisController extends Controller {
    async apiCount() {
        await this.service.statis.statis.apiCount()
    }

    async apiAllCount() {
        await this.service.statis.statis.apiAllCount()
    }

    async allApiRecord() {
        await this.service.statis.statis.allApiRecord()
    }

    async userCount() {
        await this.service.statis.statis.userCount()
    }

    async adminCount() {
        await this.service.statis.statis.adminCount()
    }

    async orderCount() {
        await this.service.statis.statis.orderCount()
    }

}

module.exports = StatisController