const Service = require('egg').Service

class VipCartService extends Service {
    async useCart() {
        this.ctx.body = {
            status: 0,
            type: 'INVALID_CART',
            message: '无效的卡号'
        }
    }
}

module.exports = VipCartService