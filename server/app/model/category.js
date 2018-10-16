const categoryData = require('../InitData/category')

module.exports = app => {
    const mongoose = app.mongoose

    const categorySchema = new mongoose.Schema({
        count: Number,
        id: Number,
        ids: [],
        image_url: String,
        level: Number,
        name: String,
        sub_categories: [{
            count: Number,
            id: Number,
            image_url: String,
            level: Number,
            name: String
        }, ]
    });

    categorySchema.static.addCategory = async function(type) {

    }

    const Category = mongoose.model('Category', categorySchema)

    Category.findOne((err, data) => {
        if (!data) {
            for (let i = 0; i < categoryData.length; i++) {
                Category.create(categoryData[i])
            }
        }
    })

    return Category
}