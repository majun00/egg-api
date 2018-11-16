module.exports = app => {
    const mongoose = app.mongoose

    const addressSchema = new mongoose.Schema({
        id: Number,
        address: String,
        phone: String,
        user_id: Number,
        is_valid: { type: Number, default: 1 },
        created_at: { type: Date, default: Date.now() },
        phone_bk: String,
        tag_type: Number,
        name: String,
        st_geohash: String,
        address_detail: String,
        poi_type: { type: Number, default: 0 },
        sex: { type: Number, default: 1 },
        city_id: { type: Number, default: 1 },
        tag: { type: String, default: '家' },
        is_user_default: { type: Boolean, default: true },
        is_deliverable: { type: Boolean, default: true },
        agent_fee: { type: Number, default: 0 },
        deliver_amount: { type: Number, default: 0 },
        phone_had_bound: { type: Boolean, default: true },
    })

    addressSchema.index({ id: 1 });

    return mongoose.model('Address', addressSchema);
}