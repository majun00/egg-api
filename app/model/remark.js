const remarkData = require('../InitData/remark')

module.exports = app => {
    const mongoose = app.mongoose

    const remarkSchema = new mongoose.Schema({
        remarks: [],
    })

    const Remark = mongoose.model('Remark', remarkSchema);

    Remark.findOne((err, data) => {
        if (!data) {
            Remark.create(remarkData);
        }
    })

    return Remark
}