const Controller = require('egg').Controller;

class RatingController extends Controller {
    async initData() {
        await this.service.ugc.rating.initData()
    }

    async getRatings() {
        await this.service.ugc.rating.getRatings()
    }

    async getScores() {
        await this.service.ugc.rating.getScores()
    }

    async getTags() {
        await this.service.ugc.rating.getTags()
    }

}


module.exports = RatingController;