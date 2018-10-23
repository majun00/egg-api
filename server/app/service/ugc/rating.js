const Service = require('egg').Service;

class RatingService extends Service {
    async initData(restaurant_id) {
        const ctx = this.ctx
        try {
            // 2 多级数据库引入
            // const status = ctx.model.ugc.initData(restaurant_id)
            // if (status) {
            //     console.log('初始化评论数据成功');
            // }
        } catch (err) {
            console.log('初始化评论数据失败');
            throw new Error(err);
        }

    }

}


module.exports = RatingService;