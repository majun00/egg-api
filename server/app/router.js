'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middlewares } = app
    const checkApiToken = middlewares.checkAdmin()

    router.post('/admin/login', controller.admin.admin.login)
    router.get('/admin/info', controller.admin.admin.getAdminInfo)
    router.get('/admin/signout', controller.admin.admin.signout)
    router.get('/admin/all', controller.admin.admin.getAllAdmin)
    router.get('/admin/count', controller.admin.admin.getAdminCount)
    router.post('/admin/update/avatar/:admin_id', controller.admin.admin.updateAvatar);

    router.post('/member/v1/users/:user_id/delivery_card/physical_card/bind', controller.member.vipCart.useCart)

    router.get('/promotion/v2/users/:user_id/hongbaos', controller.promotion.hongbao.getHongbao)
    router.get('/promotion/v2/users/:user_id/expired_hongbaos', controller.promotion.hongbao.getExpiredHongbao)
    router.post('/v1/users/:user_id/hongbao/exchange', controller.promotion.hongbao.exchange);

    router.get('/shopping/v1/restaurants/delivery_modes', controller.shopping.category.getDelivery);
    router.get('/shopping/v1/restaurants/activity_attributes', controller.shopping.category.getActivity);
    router.get('/shopping/v2/restaurant/category', controller.shopping.category.getCategories)

    router.post('/shopping/addfood', checkApiToken, controller.shopping.food.addFood);
    router.get('/shopping/v2/foods', controller.shopping.food.getFoods);
    router.get('/shopping/v2/foods/count', controller.shopping.food.getFoodsCount);
    router.delete('/shopping/v2/food/:food_id', controller.shopping.food.deleteFood);
    router.post('/shopping/v2/updatefood', checkApiToken, controller.shopping.food.updateFood);
    router.get('/shopping/getcategory/:restaurant_id', controller.shopping.food.getCategory)
    router.post('/shopping/addcategory', checkApiToken, controller.shopping.food.addCategory);
    router.get('/shopping/v2/menu/:category_id', controller.shopping.food.getMenuDetail)
    router.get('/shopping/v2/menu', controller.shopping.food.getMenu)

    router.post('/shopping/addShop', checkApiToken, controller.shopping.shop.addShop)
    router.get('/shopping/restaurants/count', controller.shopping.shop.getShopCount)
    router.get('/shopping/restaurants', controller.shopping.shop.getRestaurants)
    router.post('/shopping/updateshop', checkApiToken, controller.shopping.shop.updateshop)
    router.delete('/shopping/restaurant/:restaurant_id', controller.shopping.shop.deleteResturant)
    router.get('/shopping/restaurant/:restaurant_id', controller.shopping.shop.getRestaurantDetail);
    router.get('/v4/restaurants', controller.shopping.shop.searchResaturant);

    router.get('/statis/admin/:date/count', controller.statis.statis.adminCount)
    router.get('/statis/user/:date/count', controller.statis.statis.userCount)
    router.get('/statis/order/:date/count', controller.statis.statis.orderCount)

    router.get('/ugc/v2/restaurants/:restaurant_id/ratings', controller.ugc.rating.getRatings);
    router.get('/ugc/v2/restaurants/:restaurant_id/ratings/scores', controller.ugc.rating.getScores);
    router.get('/ugc/v2/restaurants/:restaurant_id/ratings/tags', controller.ugc.rating.getTags);

    router.get('/v1/users/:user_id/addresses', controller.v1.addre.getAddress);
    router.post('/v1/users/:user_id/addresses', controller.v1.addre.addAddress);
    router.delete('/v1/users/:user_id/addresses/:address_id', controller.v1.addre.deleteAddress);
    router.get('/v1/addresse/:address_id', controller.v1.addre.getAddAddressById);

    router.post('/v1/captchas', controller.v1.captchas.getCaptchas);
    router.post('/v1/carts/checkout', controller.v1.carts.checkout);

    router.get('/v1/cities', controller.v1.city.getCity)
    router.get('/v1/cities/:id', controller.v1.city.getCityById)
    router.get('/v2/pois/:geohash', controller.v1.city.pois);

    router.post('/v1/users/:user_id/carts/:cart_id/orders', controller.v1.order.postOrder);
    router.get('/bos/v2/users/:user_id/orders', controller.v1.order.getOrders)
    router.get('/bos/v1/users/:user_id/orders/:order_id/snapshot', controller.v1.order.getDetail)
    router.get('/bos/orders', controller.v1.order.getAllOrders)
    router.get('/bos/orders/count', controller.v1.order.getOrdersCount)

    router.get('/v1/carts/:cart_id/remarks', controller.v1.remark.getRemarks);
    router.get('/v1/pois', controller.v1.search.search)

    router.get('/v2/index_entry', controller.v2.entry.getEntry);

    router.get('/v1/users/list', controller.v2.user.getUserList);
    router.get('/v1/users/count', controller.v2.user.getUserCount);
    router.get('/v1/user/:user_id', controller.v2.user.getInfoById);
    router.get('/v1/user/city/count', controller.v2.user.getUserCity);
    router.get('/v2/signout', controller.v2.user.signout);
    router.post('/v2/login', controller.v2.user.login);
    router.get('/v1/user', controller.v2.user.getInfo);

    router.get('/v3/profile/explain', controller.v3.explain.getExpalin)

    router.post('/v1/addimg/:type', controller.upload.upload);

    // router.resources('teachers', '/v1/teachers', checkApiToken, controller.teachers)
    // router.resources('auth', '/v1/auth', controller.auth)
    // router.delete('/v1/auth', controller.auth.destroy)
    // router.resources('course_categories', '/v1/course_categories', checkApiToken, controller.categories)
}