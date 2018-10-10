const Controller = require('egg').Controller
const md5 = require('blueimp-md5')
// const jwt = require('jwt-simple')
// const moment = require('moment')

class UserController extends Controller {
    // POST /admin/login
    async login() {
        const ctx = this.ctx
        const { username, password } = ctx.request.body

        // 数据校验
        ctx.validate({
            username: 'string',
            password: 'string'
        })

        // 把密码处理成 md5 加密
        let pwd = md5(md5(password))

        let user = await ctx.model.User.findOne({
            username
        })

        if (!user) {
            ctx.request.body.password = pwd
            user = await ctx.model.User.create(ctx.request.body)
            user.id = await ctx.helper.getId('admin_id')
            await user.save()
        } else {
            if (pwd !== user.password) {
                ctx.status = 401
                return ctx.body = {
                    status: 0,
                    error: '账号或密码错误'
                }
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
            data: user
        }
    }

    // GET /admin/info
    async info() {
        const ctx = this.ctx
        const admin_id = ctx.session.admin_id;
        if (!admin_id) {
            ctx.body = {
                status: 0,
                message: '获取管理员信息失败'
            }
            return
        }
        try {
            const info = await ctx.model.User.findOne({
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

}

module.exports = UserController