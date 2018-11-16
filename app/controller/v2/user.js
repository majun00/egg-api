const Controller = require('egg').Controller

class UserController extends Controller {
    // 全部处理放在service，后期再抽象
    async login() {
        await this.service.v2.user.login()
    }

    async getInfo() {
        await this.service.v2.user.getInfo()
    }

    async getInfoById() {
        await this.service.v2.user.getInfoById()
    }

    async signout() {
        await this.service.v2.user.signout()
    }

    async chanegPassword() {
        await this.service.v2.user.chanegPassword()
    }

    async getUserList() {
        await this.service.v2.user.getUserList()
    }

    async getUserCount() {
        await this.service.v2.user.getUserCount()
    }

    async updateAvatar() {
        await this.service.v2.user.updateAvatar()
    }

    async getUserCity() {
        await this.service.v2.user.getUserCity()
    }
}

module.exports = UserController