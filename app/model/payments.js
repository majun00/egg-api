const paymentsData = require('../InitData/payments')

module.exports = app => {
    const mongoose = app.mongoose

    const paymentsSchema = new mongoose.Schema({
        description: String,
        disabled_reason: String,
        id: Number,
        is_online_payment: Boolean,
        name: String,
        promotion: [],
        select_state: Number,
    })

    const Payments = mongoose.model('Payments', paymentsSchema);

    Payments.findOne((err, data) => {
        if (!data) {
            paymentsData.forEach(item => {
                Payments.create(item);
            })
        }
    })

    return Payments
}