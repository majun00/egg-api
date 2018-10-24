const Service = require('egg').Service;

class FoodService extends Service {
    // GET /shopping/v2/restaurant/category
    async getCategories() {
        try {
            const categories = await this.ctx.model.Category.find({}, '-_id')
            this.ctx.body = categories
        } catch (err) {
            res.send({
                status: 0,
                type: 'ERROR_DATA',
                message: '获取categories失败:' + err
            })
        }
    }

    async addCategory(type) {
        try {
            await this.ctx.model.Category.addCategory(type)
        } catch (err) {
			console.log('增加category数量失败',err);
        }
    }

    async findById(id) {
        try {
            const CateEntity = await this.ctx.model.Category.findOne({ 'sub_categories.id': id })
            let categoName=CateEntity.name
            CateEntity.sub_categories.forEach(item => {
                if (item.id == id) {
                    categoName += '/' + item.name;
                }
            })
            return categoName
        } catch (err) {
            console.log('通过category id获取数据失败')
            throw new Error(err)
        }
    }

    async getDelivery() {}

    async getActivity() {}
}


module.exports = FoodService;