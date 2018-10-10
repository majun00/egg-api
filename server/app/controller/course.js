const Controller = require('egg').Controller

const createRule = {
  username: 'string',
  password: 'string'
}

class CourseController extends Controller {
  // POST /teachers
  async create () {
    this.ctx.body = 'create'
  }

  // GET /teachers
  async index () {
    this.ctx.body = 'index'
  }

  // GET /teachers/:id
  async show () {
    this.ctx.body = 'show'
  }

  // PUT /teachers/:id
  async update () {
    this.ctx.body = 'update'
  }

  // DELETE /teachers/:id
  async destroy () {
    this.ctx.body = 'destroy'
  }
}

module.exports = CourseController
