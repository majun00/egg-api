const Controller = require('egg').Controller

class searchController extends Controller {
    async search() {
        await this.service.search.search()
    }

}

module.exports = searchController