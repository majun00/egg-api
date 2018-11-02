const Controller = require('egg').Controller

class UserController extends Controller {
    // 全部处理放在service，后期再抽象
    async login() {
        await this.service.v2.user.login()
    }
}

module.exports = UserController