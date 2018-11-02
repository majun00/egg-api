const Controller = require('egg').Controller;

class CaptchasController extends Controller {
    async getCaptchas() {
        await this.service.v1.captchas.getCaptchas()
    }
}


module.exports = CaptchasController;