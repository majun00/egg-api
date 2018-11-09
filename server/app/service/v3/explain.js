const Service = require('egg').Service

class ExplainService extends Service {
    async getExpalin() {
        const ctx = this.ctx
        try {
            const explain = await ctx.model.Explain.findOne();
            ctx.body = explain.data
        } catch (err) {
            console.log('获取服务中心数据失败', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_GET_SERVER_DATA',
                message: '获取服务中心数据失败'
            }
        }
    }
}

module.exports = ExplainService