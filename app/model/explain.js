const explainData = require('../InitData/explain')

module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema;

    const explainSchema = new Schema({
        data: Schema.Types.Mixed,
    })
    
    const Explain = mongoose.model('Explain', explainSchema);

    Explain.findOne((err, data) => {
        if (!data) {
            Explain.create({ data: explainData });
        }
    })

    return Explain
}