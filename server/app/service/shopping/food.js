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

            try {
                const newFood = await ctx.model.Menu.create(Category)
                console.log('初始化食品数据成功');
            } catch (err) {
                console.log('初始化食品数据失败');
                throw new Error(err);
            }
        }

    }

    async getCategory() {
        const ctx = this.ctx
        const restaurant_id = ctx.params.restaurant_id
        try {
            const category_list = await ctx.model.Menu.find({ restaurant_id })
            ctx.body = {
                status: 1,
                category_list,
            }

        } catch (err) {
            console.log('获取餐馆食品种类失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_GET_DATA',
                message: '获取数据失败'
            }
        }

    }

    async addCategory() {
        const ctx = this.ctx
        const fields = ctx.request.body

        try {
            if (!fields.name) {
                throw new Error('必须填写食品类型名称');
            } else if (!fields.restaurant_id) {
                throw new Error('餐馆ID错误');
            }
        } catch (err) {
            console.log(err.message, err);
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: err.message
            }
            return
        }

        let category_id;
        try {
            category_id = await ctx.helper.getId('category_id');
        } catch (err) {
            console.log('获取category_id失败');
            ctx.body = {
                type: 'ERROR_DATA',
                message: '获取数据失败'
            }
            return
        }

        const foodObj = {
            name: fields.name,
            description: fields.description,
            restaurant_id: fields.restaurant_id,
            id: category_id,
            foods: [],
        }

        try {
            const newFood = await ctx.model.Menu.create(foodObj)
            ctx.body = {
                status: 1,
                success: '添加食品种类成功',
            }
        } catch (err) {
            console.log('保存数据失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_IN_SAVE_DATA',
                message: '保存数据失败',
            }
        }
    }

    async addFood() {
        const ctx = this.ctx
        const fields = ctx.request.body

        try {
            if (!fields.name) {
                throw new Error('必须填写食品名称');
            } else if (!fields.image_path) {
                throw new Error('必须上传食品图片');
            } else if (!fields.specs.length) {
                throw new Error('至少填写一种规格');
            } else if (!fields.category_id) {
                throw new Error('食品类型ID错误');
            } else if (!fields.restaurant_id) {
                throw new Error('餐馆ID错误');
            }
        } catch (err) {
            console.log('前台参数错误', err.message);
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: err.message
            }
            return
        }

        let category;
        let restaurant;
        try {
            category = await ctx.model.Menu.findOne({ id: fields.category_id });
            restaurant = await ctx.model.Shop.findOne({ id: fields.restaurant_id });
        } catch (err) {
            console.log('获取食品类型和餐馆信息失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '添加食品失败'
            }
            return
        }

        let item_id;
        try {
            item_id = await ctx.helper.getId('item_id');
        } catch (err) {
            console.log('获取item_id失败');
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '添加食品失败'
            }
            return
        }

        const rating_count = Math.ceil(Math.random() * 1000);
        const month_sales = Math.ceil(Math.random() * 1000);
        const tips = rating_count + "评价 月售" + month_sales + "份";
        const newFood = {
            name: fields.name,
            description: fields.description,
            image_path: fields.image_path,
            activity: null,
            attributes: [],
            restaurant_id: fields.restaurant_id,
            category_id: fields.category_id,
            satisfy_rate: Math.ceil(Math.random() * 100),
            satisfy_count: Math.ceil(Math.random() * 1000),
            item_id,
            rating: (4 + Math.random()).toFixed(1),
            rating_count,
            month_sales,
            tips,
            specfoods: [],
            specifications: [],
        }

        if (fields.activity) {
            newFood.activity = {
                image_text_color: 'f1884f',
                icon_color: 'f07373',
                image_text: fields.activity,
            }
        }

        if (fields.attributes.length) {
            fields.attributes.forEach(item => {
                let attr;
                switch (item) {
                    case '新':
                        attr = {
                            icon_color: '5ec452',
                            icon_name: '新'
                        }
                        break;
                    case '招牌':
                        attr = {
                            icon_color: 'f07373',
                            icon_name: '招牌'
                        }
                        break;
                }
                newFood.attributes.push(attr);
            })
        }

        try {
            const [specfoods, specifications] = await this.getSpecfoods(fields, item_id);
            newFood.specfoods = specfoods;
            newFood.specifications = specifications;
        } catch (err) {
            console.log('添加specs失败', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '添加食品失败'
            }
            return
        }

        try {
            const foodEntity = await ctx.model.Food.create(newFood);
            category.foods.push(foodEntity);
            category.markModified('foods');
            await category.save();
            ctx.body = {
                status: 1,
                success: '添加食品成功',
            }
        } catch (err) {
            console.log('保存食品到数据库失败', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_DATA',
                message: '添加食品失败'
            }
        }

    }

    async getSpecfoods(fields, item_id) {
        const ctx = this.ctx
        let specfoods = [],
            specifications = [];
        if (fields.specs.length < 2) {
            let food_id, sku_id;
            try {
                sku_id = await ctx.helper.getId('sku_id');
                food_id = await ctx.helper.getId('food_id');
            } catch (err) {
                console.log(err)
                throw new Error('获取sku_id、food_id失败')
            }
            specfoods.push({
                packing_fee: fields.specs[0].packing_fee,
                price: fields.specs[0].price,
                specs: [],
                specs_name: fields.specs[0].specs,
                name: fields.name,
                item_id,
                sku_id,
                food_id,
                restaurant_id: fields.restaurant_id,
                recent_rating: (Math.random() * 5).toFixed(1),
                recent_popularity: Math.ceil(Math.random() * 1000),
            })
        } else {
            specifications.push({
                values: [],
                name: "规格"
            })
            for (let i = 0; i < fields.specs.length; i++) {
                let food_id, sku_id;
                try {
                    sku_id = await ctx.helper.getId('sku_id');
                    food_id = await ctx.helper.getId('food_id');
                } catch (err) {
                    throw new Error('获取sku_id、food_id失败')
                }
                specfoods.push({
                    packing_fee: fields.specs[i].packing_fee,
                    price: fields.specs[i].price,
                    specs: [{
                        name: "规格",
                        value: fields.specs[i].specs
                    }],
                    specs_name: fields.specs[i].specs,
                    name: fields.name,
                    item_id,
                    sku_id,
                    food_id,
                    restaurant_id: fields.restaurant_id,
                    recent_rating: (Math.random() * 5).toFixed(1),
                    recent_popularity: Math.ceil(Math.random() * 1000),
                })
                specifications[0].values.push(fields.specs[i].specs);
            }
        }
        return [specfoods, specifications]
    }

    async getMenu() {
        const ctx = this.ctx
        const restaurant_id = ctx.query.restaurant_id;
        const allMenu = ctx.query.allMenu;

        if (!restaurant_id || !Number(restaurant_id)) {
            console.log('获取餐馆参数ID错误');
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: '餐馆ID参数错误',
            }
            return
        }

        let filter;
        if (allMenu) {
            filter = { restaurant_id }
        } else {
            filter = { restaurant_id, $where: function() { return this.foods.length } };
        }

        try {
            const menu = await ctx.model.Menu.find(filter, '-_id');
            ctx.body = menu;
        } catch (err) {
            console.log('获取食品数据失败', err);
            ctx.body = {
                status: 0,
                type: 'GET_DATA_ERROR',
                message: '获取食品数据失败'
            }
        }
    }

    async getMenuDetail() {
        const ctx = this.ctx
        const category_id = ctx.params.category_id;

        if (!category_id || !Number(category_id)) {
            console.log('获取Menu详情参数ID错误');
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: 'Menu ID参数错误',
            }
            return
        }

        try {
            const menu = await ctx.model.Menu.findOne({ id: category_id }, '-_id');
            ctx.body = menu
        } catch (err) {
            console.log('获取Menu详情失败', err);
            ctx.body = {
                status: 0,
                type: 'GET_DATA_ERROR',
                message: '获取Menu详情失败'
            }
        }

    }

    async getFoods() {
        const ctx = this.ctx
        const { restaurant_id, limit = 20, offset = 0 } = ctx.query;
        try {
            let filter = {};
            if (restaurant_id && Number(restaurant_id)) {
                filter = { restaurant_id }
            }
            const foods = await ctx.model.Food.find(filter, '-_id').sort({ item_id: -1 }).limit(Number(limit)).skip(Number(offset));
            ctx.body = foods;
        } catch (err) {
            console.log('获取食品数据失败', err);
            ctx.body = {
                status: 0,
                type: 'GET_DATA_ERROR',
                message: '获取食品数据失败'
            }
        }
    }

    async getFoodsCount() {
        const ctx = this.ctx
        const restaurant_id = ctx.query.restaurant_id
        try {
            let filter = {};
            if (restaurant_id && Number(restaurant_id)) {
                filter = { restaurant_id }
            }
            const count = await ctx.model.Food.find(filter).count();
            ctx.body = {
                status: 1,
                count,
            }
        } catch (err) {
            console.log('获取食品数量失败', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_TO_GET_COUNT',
                message: '获取食品数量失败'
            }
        }
    }

    async updateFood() {
        const ctx = this.ctx
        const fields = ctx.request.body
        const { name, item_id, description = "", image_path, category_id, new_category_id } = fields;
        try {
            if (!name) {
                throw new Error('食品名称错误');
            } else if (!item_id || !Number(item_id)) {
                throw new Error('食品ID错误');
            } else if (!category_id || !Number(category_id)) {
                throw new Error('食品分类ID错误');
            } else if (!image_path) {
                throw new Error('食品图片地址错误');
            }

            const [specfoods, specifications] = await this.getSpecfoods(fields, item_id);

            let newData;
            if (new_category_id !== category_id) {
                newData = { name, description, image_path, category_id: new_category_id, specfoods, specifications };

                const food = await ctx.model.Food.findOneAndUpdate({ item_id }, { $set: newData });

                const menu = await ctx.model.Menu.findOne({ id: category_id })
                const targetmenu = await ctx.model.Menu.findOne({ id: new_category_id })
                let subFood = menu.foods.id(food._id);
                subFood.set(newData)
                targetmenu.foods.push(subFood)
                targetmenu.markModified('foods');
                await targetmenu.save()
                await subFood.remove()
                await menu.save()
            } else {
                newData = { name, description, image_path, specfoods, specifications };

                const food = await ctx.model.Food.findOneAndUpdate({ item_id }, { $set: newData });

                const menu = await ctx.model.Menu.findOne({ id: category_id })
                let subFood = menu.foods.id(food._id);
                // ?
                subFood.set(newData)
                await menu.save()
            }

            ctx.body = {
                status: 1,
                success: '修改食品信息成功',
            }
        } catch (err) {
            console.log(err.message, err);
            ctx.body = {
                status: 0,
                type: 'ERROR_UPDATE_FOOD',
                message: '更新食品信息失败',
            }
        }

    }

    async deleteFood() {
        const ctx = this.ctx
        const food_id = ctx.params.food_id
        if (!food_id || !Number(food_id)) {
            console.log('food_id参数错误');
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: 'food_id参数错误',
            }
            return
        }
        try {
            const food = await ctx.model.Food.findOne({ item_id: food_id });
            const menu = await ctx.model.Menu.findOne({ id: food.category_id })
            let subFood = menu.foods.id(food._id);
            await subFood.remove()
            await menu.save()
            await food.remove()
            ctx.body = {
                status: 1,
                success: '删除食品成功',
            }
        } catch (err) {
            console.log('删除食品失败', err);
            ctx.body = {
                status: 0,
                type: 'DELETE_FOOD_FAILED',
                message: '删除食品失败',
            }
        }

    }
}


module.exports = FoodService;