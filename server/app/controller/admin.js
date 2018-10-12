const Controller = require('egg').Controller
const md5 = require('blueimp-md5')
const dtime = require('moment')
// const jwt = require('jwt-simple')
// const moment = require('moment')

class AdminController extends Controller {
    // POST /admin/login
    async login() {
        const ctx = this.ctx
        const { username, password, status = 1 } = ctx.request.body
        let message = '注册成功'

        // 数据校验
        ctx.validate({
            username: 'string',
            password: 'string'
        })

        // 把密码处理成 md5 加密
        let pwd = md5(md5(password))

        let user = await ctx.model.Admin.findOne({
            username
        })

        if (!user) {
            const admin_id = await ctx.helper.getId('admin_id')
            const adminTip = status == 1 ? '管理员' : ' 超级管理员'
            const cityInfo = await ctx.service.address.guessPosition()
            const newAdmin = {
                id: admin_id,
                create_time: dtime().format('YYYY-MM-DD HH:mm'),
                city: cityInfo.city,
                admin: adminTip,
                status,
            }
            
            ctx.request.body.password = pwd
            Object.assign(newAdmin, ctx.request.body)
            user = await ctx.model.Admin.create(newAdmin)
        } else {
            if (pwd.toString() !== user.password.toString()) {
                ctx.status = 401
                return ctx.body = {
                    status: 0,
                    error: '账号或密码错误'
                }
            } else {
                message = '登录成功'
            }
        }

        user = JSON.parse(JSON.stringify(user))
        delete user.password
        ctx.status = 201

        // token
        // 设置 7 天过期时间
        // const expires = moment().add('days', 7).valueOf()
        // 生成 token 用户标识
        // const token = jwt.encode({
        //     iss: user._id,
        //     exp: expires
        // }, 'majun')

        // session
        ctx.session.admin_id = user.id;
        // this.ctx.session.maxAge = 3 * 24 * 3600 * 1000;

        ctx.body = {
            status: 1,
            // token,
            // expires,
            data: user,
            message,
        }
    }

    // GET /admin/info
    async getAdminInfo() {
        const ctx = this.ctx
        const admin_id = ctx.session.admin_id;
        if (!admin_id || !Number(admin_id)) {
            ctx.body = {
                status: 0,
                message: '获取管理员信息失败'
            }
            return
        }
        try {
            const info = await ctx.model.Admin.findOne({
                id: admin_id
            }, '-_id -__v -password')
            if (!info) {
                throw new Error('未找到当前管理员')
            } else {
                ctx.body = {
                    status: 1,
                    data: info
                }
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '获取管理员信息失败'
            }
        }
    }

    // GET /admin/signout
    async signout() {
        const ctx = this.ctx
        try {
            delete ctx.session.admin_id;
            ctx.body = {
                status: 1,
                success: '退出成功'
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '退出失败'
            }

        }
    }

    // GET /admin/all
    async getAllAdmin() {
        const ctx = this.ctx
        const { limit = 20, offset = 0 } = ctx.request.body
        try {
            const allAdmin = await ctx.model.Admin.find({}, '-_id -password').sort({ id: -1 }).skip(Number(offset)).limit(Number(limit))
            ctx.body = {
                status: 1,
                data: allAdmin
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '获取管理列表失败'
            }
        }
    }

    // GET /admin/count
    async getAdminCount() {
        const ctx = this.ctx
        try {
            const count = await ctx.model.Admin.count()
            ctx.body = {
                status: 1,
                count,
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '获取管理员数量失败'
            }
        }
    }


}

module.exports = AdminController