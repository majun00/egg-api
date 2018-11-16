module.exports = app => {
    const mongoose = app.mongoose

    const userSchema = new mongoose.Schema({
        user_id: Number,
        username: String,
        password: String,
    })


    return mongoose.model('User', userSchema)
}