const Service = require('egg').Service

class ShopService extends Service {
    // POST /shopping/addShop
    async addShop() {
        const ctx = this.ctx
        const fields = ctx.request.body
        let restaurant_id;
        try {
            restaurant_id = await ctx.helper.getId('restaurant_id')
        } catch (err) {
            ctx.body = {
                message: '获取数据失败'
            }
            return
        }

        try {
            if (!fields.name) {
                throw new Error('必须填写商店名称');
            } else if (!fields.address) {
                throw new Error('必须填写商店地址');
            } else if (!fields.phone) {
                throw new Error('必须填写联系电话');
            } else if (!fields.latitude || !fields.longitude) {
                throw new Error('商店位置信息错误');
            } else if (!fields.image_path) {
                throw new Error('必须上传商铺图片');
            } else if (!fields.category) {
                throw new Error('必须上传食品种类');
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                type: 'ERROR_PARAMS',
                message: err.message
            }
            return
        }

        const exists = await ctx.model.Shop.findOne({ name: fields.name })
        if (exists) {
            ctx.body = {
                status: 0,
                message: '店铺已存在，请尝试其他店铺名称'
            }
            return
        }

        const opening_hours = fields.startTime && fields.endTime ? fields.startTime + '/' + fields.endTime : "8:30/20:30";
        const newShop = {
            name: fields.name,
            address: fields.address,
            description: fields.description || '',
            float_delivery_fee: fields.float_delivery_fee || 0,
            float_minimum_order_amount: fields.float_minimum_order_amount || 0,
            id: restaurant_id,
            is_premium: fields.is_premium || false,
            is_new: fields.new || false,
            latitude: fields.latitude,
            longitude: fields.longitude,
            location: [fields.longitude, fields.latitude],
            opening_hours: [opening_hours],
            phone: fields.phone,
            promotion_info: fields.promotion_info || "欢迎光临，用餐高峰请提前下单，谢谢",
            rating: (4 + Math.random()).toFixed(1),
            rating_count: Math.ceil(Math.random() * 1000),
            recent_order_num: Math.ceil(Math.random() * 1000),
            status: Math.round(Math.random()),
            image_path: 'fields.image_path',
            category: 'fields.category',
            piecewise_agent_fee: {
                tips: "配送费约¥" + (fields.float_delivery_fee || 0),
            },
            activities: [],
            supports: [],
            license: {
                business_license_image: fields.business_license_image || '',
                catering_service_license_image: fields.catering_service_license_image || '',
            },
            identification: {
                company_name: "",
                identificate_agency: "",
                identificate_date: "",
                legal_person: "",
                licenses_date: "",
                licenses_number: "",
                licenses_scope: "",
                operation_period: "",
                registered_address: "",
                registered_number: "",
            },
        }

        //配送方式
        if (fields.delivery_mode) {
            Object.assign(newShop, {
                delivery_mode: {
                    color: "57A9FF",
                    id: 1,
                    is_solid: true,
                    text: "蜂鸟专送"
                }
            })
        }

        //商店支持的活动
        fields.activities.forEach((item, index) => {
            switch (item.icon_name) {
                case '减':
                    item.icon_color = 'f07373';
                    item.id = index + 1;
                    break;
                case '特':
                    item.icon_color = 'EDC123';
                    item.id = index + 1;
                    break;
                case '新':
                    item.icon_color = '70bc46';
                    item.id = index + 1;
                    break;
                case '领':
                    item.icon_color = 'E3EE0D';
                    item.id = index + 1;
                    break;
            }
            newShop.activities.push(item);
        })

        if (fields.bao) {
            newShop.supports.push({
                description: "已加入“外卖保”计划，食品安全有保障",
                icon_color: "999999",
                icon_name: "保",
                id: 7,
                name: "外卖保"
            })
        }

        if (fields.zhun) {
            newShop.supports.push({
                description: "准时必达，超时秒赔",
                icon_color: "57A9FF",
                icon_name: "准",
                id: 9,
                name: "准时达"
            })
        }

        if (fields.piao) {
            newShop.supports.push({
                description: "该商家支持开发票，请在下单时填写好发票抬头",
                icon_color: "999999",
                icon_name: "票",
                id: 4,
                name: "开发票"
            })
        }

        try {
            const shop = await ctx.model.Shop.create(newShop)
            // const shop = new ShopModel(newShop);
            // await shop.save();
            await ctx.service.shopping.category.addCategory(fields.category)
            await ctx.service.ugc.rating.initData(restaurant_id)
            await ctx.service.shopping.food.initData(restaurant_id)
            
            ctx.body = {
                status: 1,
                success: '添加餐馆成功',
                shopDetail: newShop
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '添加商铺失败' + err
            }
        }

    }

    // GET /shopping/restaurants/count
    async getShopCount() {
        const ctx = this.ctx
        try {
            const count = await ctx.model.Shop.count()
            ctx.body = {
                status: 1,
                data: count
            }
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '获取餐馆数量失败'
            }
        }
    }

    // GET /shopping/restaurants
    async getRestaurants() {
        const ctx = this.ctx
        const {
            // latitude,
            // longitude,
            offset = 0,
                limit = 20,
                // keyword,
                // restaurant_category_id,
                // order_by,
                // extras,
                // delivery_mode = [],
                // support_ids = [],
                // restaurant_category_ids = [],
        } = ctx.request.body

        // try {
        //     if (!latitude) {
        //         throw new Error('latitude参数错误')
        //     } else if (!longitude) {
        //         throw new Error('longitude参数错误');
        //     }
        // } catch (err) {
        //     ctx.body = {
        //         status: 0,
        //         message: err.message
        //     }
        //     return
        // }

        //获取对应食品种类
        let filter = {}
        // if (restaurant_category_ids.length && Number(restaurant_category_ids[0])) {
        //     const category = await CategoryHandle.findById(restaurant_category_ids[0]);
        //     Object.assign(filter, { category })
        // }

        //按照距离，评分，销量等排序
        let sortBy = {};
        // if (Number(order_by)) {
        //     switch (Number(order_by)) {
        //         case 1:
        //             Object.assign(sortBy, { float_minimum_order_amount: 1 });
        //             break;
        //         case 2:
        //             Object.assign(filter, { location: { $near: [longitude, latitude] } });
        //             break;
        //         case 3:
        //             Object.assign(sortBy, { rating: -1 });
        //             break;
        //         case 5:
        //             Object.assign(filter, { location: { $near: [longitude, latitude] } });
        //             break;
        //         case 6:
        //             Object.assign(sortBy, { recent_order_num: -1 });
        //             break;
        //     }
        // }

        //查找配送方式
        // if (delivery_mode.length) {
        //     delivery_mode.forEach(item => {
        //         if (Number(item)) {
        //             Object.assign(filter, { 'delivery_mode.id': Number(item) })
        //         }
        //     })
        // }

        //查找活动支持方式
        // if (support_ids.length) {
        //     const filterArr = [];
        //     support_ids.forEach(item => {
        //         if (Number(item) && (Number(item) !== 8)) {
        //             filterArr.push(Number(item))
        //         } else if (Number(item) == 8) { //品牌保证特殊处理
        //             Object.assign(filter, { is_premium: true })
        //         }
        //     })
        //     if (filterArr.length) {
        //         //匹配同时拥有多种活动的数据
        //         Object.assign(filter, { 'supports.id': { $all: filterArr } })
        //     }
        // }

        const restaurants = await ctx.model.Shop.find(filter, '-_id').sort(sortBy).limit(Number(limit)).skip(Number(offset))

        //获取百度地图测局所需经度纬度
        // const from = latitude + ',' + longitude;
        // let to = '';
        // restaurants.forEach((item, index) => {
        //     const slpitStr = (index == restaurants.length - 1) ? '' : '|';
        //     to += item.latitude + ',' + item.longitude + slpitStr;
        // })
        // try {
        //     if (restaurants.length) {
        //         //获取距离信息，并合并到数据中
        //         const distance_duration = await this.getDistance(from, to)
        //         restaurants.map((item, index) => {
        //             return Object.assign(item, distance_duration[index])
        //         })
        //     }
        // } catch (err) {
        //     // 百度地图达到上限后会导致加车失败，需优化
        //     console.log('从addressComoponent获取测距数据失败', err);
        //     restaurants.map((item, index) => {
        //         return Object.assign(item, { distance: '10公里', order_lead_time: '40分钟' })
        //     })
        // }

        try {
            ctx.body = restaurants
        } catch (err) {
            ctx.body = {
                status: 0,
                message: '获取店铺列表数据失败'
            }
        }

    }

    // POST /shopping/updateshop
    async updateshop() {
        const ctx = this.ctx
    }

    // DELETE /shopping/restaurant/:restaurant_id
    async deleteResturant() {
        const ctx = this.ctx
    }


}

module.exports = ShopService