module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const teacherSchema = new Schema({
    username: { // 用户名
      type: String,
      required: true
    },
    password: { // 密码
      type: String,
      required: true
    },
    real_name: { // 真实姓名
      type: String,
      required: true
    },
    nickname: { // 昵称
      type: String,
      default: ''
    },
    gender: { // 性别
      type: Number,
      enum: [0, 1],
      required: true
    },
    birthday: { // 生日
      type: Date,
      default: null
    },
    province: { // 省份
      type: Number,
      default: 0
    },
    city: { // 城市
      type: Number,
      default: 0
    },
    district: { // 县区
      type: Number,
      default: 0
    },
    cellphone: { // 电话
      type: String,
      default: ''
    },
    email: { // 邮箱
      type: String,
      default: ''
    },
    join_date: { // 入职日期
      type: Date,
      required: true
    },
    bio: { // 个人介绍
      type: String,
      default: ''
    },
    avatar: { // 用户头像
      type: String,
      default: '/public/img/default.png'
    },
    type: { // 用户类型
      type: Number,
      required: true,
      enum: [0, 1] // 0 管理员，1 普通
    },
    status: {
      type: Number,
      enum: [0, 1], // 0 正常状态，1 注销状态
      default: 0 // 默认正常
    },
    created_at: { // 创建时间
      type: Date,
      default: Date.now
    },
    updated_at: { // 更新时间
      type: Date,
      default: Date.now
    }
  })

  teacherSchema.statics.findByPage = async function ({
    limit = 5,
    page = 1
  } = {}) {
    return await this
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()
  }

  return mongoose.model('Teacher', teacherSchema)
}
