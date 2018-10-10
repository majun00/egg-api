const Controller = require('egg').Controller
const md5 = require('blueimp-md5')
const jwt = require('jwt-simple')
const moment = require('moment')

class UserController extends Controller {
    // POST /users
    async create() {
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
        } else {
            if (pwd !== user.password) {
                ctx.status = 401
                return ctx.body = {
                    error: '密码错误'
                }
            }
        }

        user = JSON.parse(JSON.stringify(user))
        delete user.password
        ctx.status = 201
        // 设置 7 天过期时间
        const expires = moment().add('days', 7).valueOf()
        // 生成 token 用户标识
        const token = jwt.encode({
            iss: user._id,
            exp: expires
        }, 'majun')

        // 将 token 发送给客户端
        ctx.body = {
            token,
            expires,
            user
        }
    }

}

module.exports = UserController