const Controller = require('egg').Controller

class searchController extends Controller {
    async search() {
        await this.service.v1.search.search()
    }

}

module.exports = searchController