'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middlewares } = app
    // 暂时不加登录拦截
    // const checkApiToken = middlewares.checkAdmin()

    //管理后台
    router.post('/admin/login', controller.admin.admin.login)
    router.get('/admin/info', controller.admin.admin.getAdminInfo)
    router.get('/admin/signout', controller.admin.admin.signout)
    router.get('/admin/all', controller.admin.admin.getAllAdmin)
    router.get('/admin/count', controller.admin.admin.getAdminCount)

    router.post('/shopping/addShop', controller.shopping.shop.addShop)
    router.get('/shopping/restaurants/count', controller.shopping.shop.getShopCount)
    router.get('/shopping/restaurants', controller.shopping.shop.getRestaurants)
    router.post('/shopping/updateshop', controller.shopping.shop.updateshop)
    router.delete('/shopping/restaurant/:restaurant_id', controller.shopping.shop.deleteResturant)
    router.get('/shopping/restaurant/:restaurant_id', controller.shopping.shop.getRestaurantDetail);
    router.get('/shopping/v2/restaurant/category', controller.shopping.category.getCategories)

    router.post('/shopping/addfood', controller.shopping.food.addFood);
    router.get('/shopping/v2/foods', controller.shopping.food.getFoods);
    router.get('/shopping/v2/foods/count', controller.shopping.food.getFoodsCount);
    router.delete('/shopping/v2/food/:food_id', controller.shopping.food.deleteFood);
    router.post('/shopping/v2/updatefood', controller.shopping.food.updateFood);

    router.get('/shopping/getcategory/:restaurant_id', controller.shopping.food.getCategory)
    router.post('/shopping/addcategory', controller.shopping.food.addCategory);
    router.get('/shopping/v2/menu/:category_id', controller.shopping.food.getMenuDetail)
    router.get('/shopping/v2/menu', controller.shopping.food.getMenu)

    router.get('/statis/admin/:date/count', controller.statis.statis.adminCount)

    router.post('/v1/addimg/:type', controller.upload.upload);
    router.get('/v1/cities', controller.v1.city.getCity)
    router.get('/v1/cities/:id', controller.v1.city.getCityById)
    router.get('/v1/pois', controller.v1.search.search)

    // APP
    router.post('/v1/captchas', controller.v1.captchas.getCaptchas);
    router.post('/v2/login', controller.v2.user.login);
    router.get('/v1/user', controller.v2.user.getInfo);

    router.get('/v2/pois/:geohash', controller.v1.city.pois);
    router.get('/v2/index_entry', controller.v2.entry.getEntry);

    router.get('/shopping/v1/restaurants/delivery_modes', controller.shopping.category.getDelivery);
    router.get('/shopping/v1/restaurants/activity_attributes', controller.shopping.category.getActivity);

    router.get('/ugc/v2/restaurants/:restaurant_id/ratings', controller.ugc.rating.getRatings);
    router.get('/ugc/v2/restaurants/:restaurant_id/ratings/scores', controller.ugc.rating.getScores);
    router.get('/ugc/v2/restaurants/:restaurant_id/ratings/tags', controller.ugc.rating.getTags);

    router.post('/v1/carts/checkout', controller.v1.carts.checkout);
    router.get('/v1/users/:user_id/addresses', controller.v1.addre.getAddress);
    router.post('/v1/users/:user_id/addresses', controller.v1.addre.addAddress);
    router.get('/v1/carts/:cart_id/remarks', controller.v1.remark.getRemarks);
    router.post('/v1/users/:user_id/carts/:cart_id/orders', controller.v1.order.postOrder);

    router.get('/bos/v2/users/:user_id/orders', controller.v1.order.getOrders)
    router.get('/bos/v1/users/:user_id/orders/:order_id/snapshot', controller.v1.order.getDetail)

    // router.resources('teachers', '/v1/teachers', checkApiToken, controller.teachers)
    // router.resources('auth', '/v1/auth', controller.auth)
    // router.delete('/v1/auth', controller.auth.destroy)
    // router.resources('course_categories', '/v1/course_categories', checkApiToken, controller.categories)
}