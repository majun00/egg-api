'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app
  // const checkApiToken = middlewares.checkApiToken()
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
  router.get('/shopping/v2/restaurant/category', controller.shopping.category.getCategories)

  router.post('/v1/addimg/:type', controller.upload.upload);
  router.get('/v1/cities', controller.v1.city.getCity)
  router.get('/v1/pois', controller.v1.search.search)
  
  // router.resources('teachers', '/v1/teachers', checkApiToken, controller.teachers)
  // router.resources('auth', '/v1/auth', controller.auth)
  // router.delete('/v1/auth', controller.auth.destroy)
  // router.resources('course_categories', '/v1/course_categories', checkApiToken, controller.categories)
}
