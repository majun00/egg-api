module.exports = {
    //获取id列表
    async getId(type) {
        const ctx = this.ctx
        const idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
        if (!idList.includes(type)) {
            console.log('id类型错误')
            throw new Error('id类型错误');
            return
        }
        try {
            const idData = await ctx.model.Ids.findOne();
            idData[type]++;
            await idData.save();
            return idData[type]
        } catch (err) {
            throw new Error(err)
        }
    }
};