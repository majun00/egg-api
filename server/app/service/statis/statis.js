const Service = require('egg').Service

class StatisService extends Service {
    async apiCount() {}

    async apiAllCount() {}

    async allApiRecord() {}

    async userCount() {
        const ctx = this.ctx
        const date = ctx.params.date;
        if (!date) {
            console.log('参数错误')
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            }
            return
        }
        try {
            const count = await ctx.model.UserInfo.find({ registe_time: eval('/^' + date + '/gi') }).count()
            ctx.body = {
                status: 1,
                count,
            }
        } catch (err) {
            console.log('获取当天注册人数失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_GET_USER_REGISTE_COUNT',
                message: '获取当天注册人数失败'
            }
        }
    }

    async adminCount() {
        const ctx = this.ctx
        const date = ctx.params.date

        if (!date) {
            console.log('参数错误')
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            }
            return
        }

        try {
            const count = await ctx.model.Admin.find({ create_time: eval('/^' + date + '/gi') }).count()
            ctx.body = {
                status: 1,
                count,
            }
        } catch (err) {
            console.log('获取当天注册管理员人数失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_GET_ADMIN_REGISTE_COUNT',
                message: '获取当天注册管理员人数失败'
            }
        }

    }

    async orderCount() {
        const ctx = this.ctx
        const date = ctx.params.date;

        if (!date) {
            console.log('参数错误')
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            }
            return
        }

        try {
            const count = await ctx.model.Order.find({ formatted_created_at: eval('/^' + date + '/gi') }).count()
            ctx.body = {
                status: 1,
                count,
            }
        } catch (err) {
            console.log('获取当天订单数量失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_GET_ORDER_COUNT',
                message: '获取当天订单数量失败'
            }
        }
    }

}

module.exports = StatisService