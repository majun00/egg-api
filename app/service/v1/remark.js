const Service = require('egg').Service

class RemarkService extends Service {
    // 全部处理放在service，后期再抽象
    async getRemarks() {
        const ctx = this.ctx
        const cart_id = ctx.params.cart_id;

        if (!cart_id || !Number(cart_id)) {
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '购物车ID参数错误'
            }
            return
        }

        try {
            const remarks = await ctx.model.Remark.findOne({}, '-_id');
            ctx.body = remarks;
        } catch (err) {
            console.log('获取备注数据失败', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_GET_DATA',
                message: '获取备注数据失败'
            }
        }

    }

}

module.exports = RemarkService