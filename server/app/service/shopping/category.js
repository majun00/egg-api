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
            console.log('增加category数量失败', err);
        }
    }

    async findById(id) {
        try {
            const CateEntity = await this.ctx.model.Category.findOne({ 'sub_categories.id': id })
            let categoName = CateEntity.name
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

    async getDelivery() {
        const ctx = this.ctx
        try {
            const deliveries = await ctx.model.Delivery.find({}, '-_id');
            ctx.body = deliveries
        } catch (err) {
            console.log('获取配送方式数据失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '获取配送方式数据失败'
            }
        }
    }

    async getActivity() {
        const ctx = this.ctx
        try {
            const activities = await ctx.model.Activity.find({}, '-_id');
            ctx.body = activities
        } catch (err) {
            console.log('获取活动数据失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '获取活动数据失败'
            }
        }
    }
}


module.exports = FoodService;