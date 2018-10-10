module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const userSchema = new Schema({
        username: { // 用户名
            type: String,
            required: true
        },
        password: { // 密码
            type: String,
            required: true
        }
    })

    return mongoose.model('User', userSchema)
}
