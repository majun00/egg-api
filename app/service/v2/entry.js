const Service = require('egg').Service

class EntryService extends Service {
    async getEntry() {
        const ctx = this.ctx
        try {
            const entries = await ctx.model.Entry.find({}, '-_id');
            ctx.body = entries
        } catch (err) {
            console.log('获取数据失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '获取数据失败'
            }
            return
        }

    }
}

module.exports = EntryService