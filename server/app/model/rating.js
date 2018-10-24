const ratingData = require('../InitData/rate')

module.exports = app => {
    const mongoose = app.mongoose

    const ratingSchema = new mongoose.Schema({
        restaurant_id: Number,
        ratings: [{
            avatar: { type: String, default: '' },
            highlights: [],
            item_ratings: [{
                food_id: Number,
                food_name: String,
                image_hash: { type: String, default: '' },
                is_valid: { type: Number, default: 1 },
            }, ],
            rated_at: String,
            rating_star: Number,
            rating_text: String,
            tags: { type: Array, default: [] },
            time_spent_desc: String,
            username: { type: String, default: "匿名用户" },
        }, ],
        scores: {
            compare_rating: { type: Number, default: 0 },
            deliver_time: { type: Number, default: 0 },
            food_score: { type: Number, default: 0 },
            order_rating_amount: { type: Number, default: 0 },
            overall_score: { type: Number, default: 0 },
            service_score: { type: Number, default: 0 },
        },
        tags: [{
            count: { type: Number, default: 0 },
            name: String,
            unsatisfied: { type: Boolean, default: false },
        }]
    })

    ratingSchema.index({ restaurant_id: 1 });

    ratingSchema.statics.initData = async function(restaurant_id) {
        try {
            const data = await this.findOne({ restaurant_id })
            if (!data) {
                const newRating = {
                    restaurant_id,
                    rating: ratingData.ratingList,
                    scores: ratingData.scores,
                    tags: ratingData.tags
                }
                await this.create(newRating)
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log('初始化评论数据失败');
            throw new Error(err)
        }
    }

    ratingSchema.statics.getData = async function(restaurant_id, type) {

    }


    return mongoose.model('Rating', ratingSchema)
}