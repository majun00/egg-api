const Controller = require('egg').Controller
const md5 = require('blueimp-md5')

const createRule = {
  username: 'string',
  password: 'string',
  real_name: 'string',
  gender: {
    type: 'enum',
    values: [0, 1]
  },
  join_date: 'date',
  type: {
    type: 'enum',
    values: [0, 1]
  }
}

class TeacherController extends Controller {
  // POST /teachers
  async create() {
    const ctx = this.ctx

    const {body} = ctx.request

    // 把类型处理成数字
    body.type = body.type - 0
    body.gender = body.gender - 0

    // 数据校验
    ctx.validate(createRule)

    // // 把密码处理成 md5 加密
    const { password } = ctx.request.body
    ctx.request.body.password = md5(md5(password))

    const { id } = await ctx.model.Teacher.create(ctx.request.body)

    ctx.status = 201
    ctx.body = {
      teacher_id: id
    }
  }

  // GET /teachers
  async index() {
    const ctx = this.ctx
    const { _limit, _page } = ctx.query

    // 总数量
    ctx.set('X-Total-Count', await ctx.model.Teacher.count())

    // 如果使用的 CORS 跨域解决方案则会遇到这种问题
    // CORS 就是这样约定的
    // 对于响应头中的数据，服务器开启 CORS
    // 头部的信息默认无法读取
    // 允许跨域的客户端访问 X-Total-Count 头数据
    ctx.set('Access-Control-Expose-Headers', 'X-Total-Count')

    // 分页查询
    ctx.body = await ctx.model.Teacher.findByPage({
      limit: _limit - 0,
      page: _page - 0
    })
  }

  // GET /teachers/:id
  async show() {
    const ctx = this.ctx
    ctx.status = 200
    ctx.body = await ctx.model.Teacher.findById(ctx.params.id)
  }

  // PUT /teachers/:id
  async update() {
    const ctx = this.ctx
    const { body } = ctx.request
    delete body.created_at // 不允许修改创建时间
    delete body.username // 不允许修改讲师用户名
    const Teacher = ctx.model.Teacher
    const t = await Teacher.findById(ctx.params.id)
    if (!t) {
      return
    }

    // 修改实体对象
    Object.assign(t, body)

    // 持久化存储
    await t.save()

    ctx.status = 201
    ctx.body = t
  }

  // DELETE /teachers/:id
  async destroy() {
    // const ctx = this.ctx
    // await ctx.model.Teacher.findByIdAndRemove(ctx.params.id)
    // ctx.status = 204
    ctx.status = 403
  }
}

module.exports = TeacherController
