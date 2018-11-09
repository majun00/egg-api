const Service = require('egg').Service

class HongbaoService extends Service {
    async getHongbao(type) {
        const ctx = this.ctx
        const present_status = type == 'intime' ? 1 : 4;
        const user_id = ctx.params.user_id;
        const { limit = 0, offset = 0 } = ctx.query

        try {
            if (!user_id || !Number(user_id)) {
                throw new Error('user_id参数错误')
            } else if (!Number(limit)) {
                throw new Error('limit参数错误')
            } else if (typeof Number(offset) !== 'number') {
                throw new Error('offset参数错误')
            }
        } catch (err) {
            console.log(err.message, err);
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: err.message
            }
            return
        }

        try {
            const hongbaos = await ctx.model.Hongbao.find({ present_status }, '-_id').limit(Number(limit)).skip(Number(offset));
            ctx.body = hongbaos
        } catch (err) {
            console.log('获取红包数据失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_TO_GET_HONGBAO_DATA',
                message: '获取红包数据失败'
            }
        }
    }

    async exchange(req, res, next) {
        this.ctx.body = {
            status: 0,
            type: 'NOT_ALLOWD_API',
            message: '无效的兑换码'
        }
    }
}

module.exports = HongbaoService