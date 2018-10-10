const Controller = require('egg').Controller
const md5 = require('blueimp-md5')
const jwt = require('jwt-simple')
const moment = require('moment')

class AuthController extends Controller {
  // POST /session
  async create() {
    const ctx = this.ctx

    // 校验用户名和密码
    // 如果用户不存在，返回 401
    // 如果密码错误，返回 401
    // 登陆成功 201 生成 token 发送给客户端
    ctx.validate({
      username: 'string',
      password: 'string'
    })

    const { username, password } = ctx.request.body

    let teacher = await ctx.model.Teacher.findOne({
      username
    })

    if (!teacher) {
      ctx.status = 401
      return ctx.body = {
        error: 'invalid username'
      }
    }

    if (md5(md5(password)) !== teacher.password) {
      ctx.status = 401
      return ctx.body = {
        error: 'invalid password'
      }
    }

    teacher = JSON.parse(JSON.stringify(teacher))

    delete teacher.password

    ctx.status = 201

    // 设置 7 天过期时间
    const expires = moment().add('days', 7).valueOf()

    // 生成 token 用户标识
    const token = jwt.encode({
      iss: teacher._id,
      exp: expires
    }, 'lipengzhou')

    // 将 token 发送给客户端
    ctx.body = {
      token,
      expires,
      teacher
    }
  }

  // GET /session
  // async index () {
  //   this.ctx.body = 'session index'
  // }

  // 登陆 -》签发 token
  // 以后的每一次都带着 token 上来
  // 客户端如何校验 token 的有效性
  // GET /session/:id
  async show() {
  }

  // PUT /teachers/:id
  async update() {
    this.ctx.body = 'session update'
  }

  // DELETE /teachers/:id
  // 退出登陆
  async destroy() {
    this.ctx.status = 204
  }
}

module.exports = AuthController
