const Controller = require('egg').Controller

class UploadController extends Controller {
    // POST /addimg/:type
    async upload() {
        await this.service.upload.upload()
    }

}

module.exports = UploadController