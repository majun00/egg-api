module.exports = app => {
    const mongoose = app.mongoose
    
    const adminSchema = new mongoose.Schema({
        username: { // 用户名
            type: String,
            required: true
        },
        password: { // 密码
            type: String,
            required: true
        },
        id: Number,
        create_time: String,
        city: String,
        status: Number,
        admin: {
            type: String,
            default: '管理员'
        },
        avatar: {
            type: String,
            default: 'default.jpg'
        },
    })

    adminSchema.index({ id: 1 })

    return mongoose.model('Admin', adminSchema)
}