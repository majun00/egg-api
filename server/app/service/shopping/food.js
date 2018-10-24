const Service = require('egg').Service;

const defaultData = [{
    name: '热销榜',
    description: '大家喜欢吃，才叫真好吃。',
    icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
    is_selected: true,
    type: 1,
    foods: [],
}, {
    name: '优惠',
    description: '美味又实惠, 大家快来抢!',
    icon_url: "4735c4342691749b8e1a531149a46117jpeg",
    type: 1,
    foods: [],
}]

class FoodService extends Service {
    async initData(restaurant_id) {
        const ctx = this.ctx
        for (let i = 0; i < defaultData.length; i++) {
            let category_id;
            try {
                category_id = await ctx.helper.getId('category_id')
            } catch (err) {
                console.log('获取category_id失败');
                throw new Error(err);
            }
            const defaultItem = defaultData[i];
            const Category = { ...defaultItem, id: category_id, restaurant_id }
            ctx.model.Food.create(Category)
            // const newFood = ctx.model.Food.create(Category)
            // try {
            //     await newFood.save()
            //     console.log('初始化食品数据成功');
            // } catch (err) {
            //     console.log('初始化食品数据失败');
            //     throw new Error(err);
            // }
        }

    }

    async getCategories() {

    }

    async addCategory() {

    }

    async addFood() {

    }

    async getSpecfoods() {

    }

    async getMenu() {

    }

    async getMenuDetail() {

    }

    async getFoods() {

    }

    async getFoodsCount() {

    }

    async updateFood() {

    }

    async deleteFood() {

    }
}


module.exports = FoodService;