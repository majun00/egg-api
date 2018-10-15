const Controller = require('egg').Controller
const md5 = require('blueimp-md5')
const dtime = require('moment')
// const jwt = require('jwt-simple')
// const moment = require('moment')

class AdminController extends Controller {
    // 全部处理放在service，后期再抽象
    // POST /admin/login
    async login() {
        await this.service.admin.login()
    }

    // GET /admin/info
    async getAdminInfo() {
        await this.service.admin.getAdminInfo()
    }

    // GET /admin/signout
    async signout() {
        await this.service.admin.signout()
    }

    // GET /admin/all
    async getAllAdmin() {
        await this.service.admin.getAllAdmin()
    }

    // GET /admin/count
    async getAdminCount() {
        await this.service.admin.getAdminCount()
    }


}

module.exports = AdminController