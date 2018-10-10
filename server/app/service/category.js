'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
  async list() {
    let res = null;
    const user = this.ctx.session.user;
    try {
      res = await this.ctx.model.Category.find({
        userId: user._id,
      });
    } catch (error) {
      res = null;
      console.log('error, 分类列表获取失败', error);
    }
    return res;
  }

  async findOne(id) {
    const user = this.ctx.session.user;
    let data = null;
    try {
      const res = await this.ctx.model.Category.findOne({
        _id: id,
        userId: user._id,
      });
      data = res;
    } catch (error) {
      data = null;
      console.error('blog findOne error', error);
    }
    return data;
  }

  async addAction(name) {
    let res = null;
    const user = this.ctx.session.user;
    try {
      res = await this.ctx.model.Category.create({
        name,
        userId: user._id,
      });
    } catch (error) {
      res = null;
      console.log('error, 新增分类失败', error);
    }
    return res;
  }

  async editAction(id, update) {
    let res = null;
    try {
      res = await this.ctx.model.Category.findByIdAndUpdate(id, update);
    } catch (error) {
      res = null;
      console.error('error, 更新微博失败', error);
    }
    return res;
  }

  async delete(id) {
    let res = null;
    try {
      res = await this.ctx.model.Category.remove({
        _id: id,
      });
    } catch (error) {
      res = {
        n: 0,
        ok: 0,
      };
      console.error('error, 删除分类失败', error);
    }
    return res;
  }
}

module.exports = CategoryService;
