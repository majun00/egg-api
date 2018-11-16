const Service = require('egg').Service;
const type = ['ratings', 'scores', 'tags'];

class RatingService extends Service {
    async initData(restaurant_id) {
        const ctx = this.ctx
        try {
            const status = ctx.model.Rating.initData(restaurant_id)
            if (status) {
                console.log('初始化评论数据成功');
            }
        } catch (err) {
            console.log('初始化评论数据失败');
            throw new Error(err);
        }
    }

    async getRatings() {
        const ctx = this.ctx
        const restaurant_id = ctx.params.restaurant_id;

        if (!restaurant_id || !Number(restaurant_id)) {
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '餐馆ID参数错误'
            }
            return
        }

        try {
            const ratings = await ctx.model.Rating.getData(restaurant_id, type[0]);
            ctx.body = ratings
        } catch (err) {
            console.log('获取评论列表失败', err);
            ctx.body = {
                status: 0,
                type: "ERROR_DATA",
                message: '未找到当前餐馆的评论数据'
            }
        }
    }

    async getScores() {
        const ctx = this.ctx
        const restaurant_id = ctx.params.restaurant_id;

        if (!restaurant_id || !Number(restaurant_id)) {
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '餐馆ID参数错误'
            }
            return
        }

        try {
            const scores = await ctx.model.Rating.getData(restaurant_id, type[1]);
            ctx.body = scores
        } catch (err) {
            console.log('获取评论列表失败', err);
            ctx.body = {
                status: 0,
                type: "ERROR_DATA",
                message: '未找到当前餐馆的评论数据'
            }
        }

    }

    async getTags() {
        const ctx = this.ctx
        const restaurant_id = ctx.params.restaurant_id;

        if (!restaurant_id || !Number(restaurant_id)) {
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '餐馆ID参数错误'
            }
            return
        }

        try {
            const tags = await ctx.model.Rating.getData(restaurant_id, type[2]);
            ctx.body = tags
        } catch (err) {
            console.log('获取评论列表失败', err);
            ctx.body = {
                status: 0,
                type: "ERROR_DATA",
                message: '未找到当前餐馆的评论数据'
            }
        }

    }

}


module.exports = RatingService;