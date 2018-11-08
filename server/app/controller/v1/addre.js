const Controller = require('egg').Controller

class AddreController extends Controller {
    // 全部处理放在service，后期再抽象
    async getAddress() {
        await this.service.v1.addre.getAddress()
    }

    async addAddress() {
        await this.service.v1.addre.addAddress()
    }

    async deleteAddress() {
        await this.service.v1.addre.deleteAddress()
    }

    async getAddAddressById() {
        await this.service.v1.addre.getAddAddressById()
    }

}

module.exports = AddreController