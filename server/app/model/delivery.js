const deliveryData = require('../InitData/delivery')

module.exports = app => {
    const mongoose = app.mongoose

    const deliverySchema = new mongoose.Schema({
        color: String,
        id: Number,
        is_solid: Boolean,
        text: String
    })

    deliverySchema.index({ index: 1 });

    const Delivery = mongoose.model('Delivery', deliverySchema)

    Delivery.findOne((err, data) => {
        if (!data) {
            Delivery.create(deliveryData);
        }
    })

    return Delivery
}