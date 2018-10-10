const Controller = require('egg').Controller

class CourseCategoryController extends Controller {
  // POST /categories
  async create () {
    const ctx = this.ctx
    const body = ctx.request.body

    // 表单数据验证
    ctx.validate({
      name: 'string'
    })

    const ret = await ctx.model.Category.create(body)
    ctx.status = 201
    ctx.body = ret
  }

  // GET /categories
  async index () {
    const ctx = this.ctx
    const ret = await ctx.model.Category.find()
    ctx.status = 200
    ctx.body = ret
  }

  // GET /categories/:id
  async show () {
    const ctx = this.ctx
    const ret = await ctx.model.Category.findById(ctx.params.id)
    ctx.status = 200
    ctx.body = ret
  }

  // PUT /categories/:id
  async update () {
    const ctx = this.ctx
    const body = ctx.request.body
    const ret = await ctx.model.Category.findById(ctx.params.id)
    if (!ret) {
      return
    }

    // 数据修改
    Object.assign(ret, body)

    // 持久化到数据库
    await ret.save()

    ctx.status = 201
    ctx.body = ret
  }

  // DELETE /categories/:id
  async destroy () {
    const ctx = this.ctx
    const ret = await ctx.model.Category.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
    ctx.body = ret
  }
}

module.exports = CourseCategoryController
