module.exports = app => {
    const mongoose = app.mongoose
    const userSchema = new mongoose.Schema({
        username: { // 用户名
            type: String,
            required: true
        },
        password: { // 密码
            type: String,
            required: true
        },
        id: Number,
    })

    return mongoose.model('User', userSchema)
}