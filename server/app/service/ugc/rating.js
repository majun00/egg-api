const Service = require('egg').Service;

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

    async getRatings(){

    }

    async getScores(){

    }

    async getTags(){
        
    }

}


module.exports = RatingService;