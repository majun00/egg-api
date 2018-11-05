const activityData = require('../InitData/activity')

module.exports = app => {
    const mongoose = app.mongoose

    const activitySchema = new mongoose.Schema({
        description: String,
        icon_color: String,
        icon_name: String,
        id: Number,
        name: String,
        ranking_weight: Number
    })

    activitySchema.index({ index: 1 });

    const Activity = mongoose.model('Activity', activitySchema)

    Activity.findOne((err, data) => {
        if (!data) {
            activityData.forEach(item => {
                Activity.create(item);
            })
        }
    })

    return Activity
}