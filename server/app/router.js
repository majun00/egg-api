'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app
  // const checkApiToken = middlewares.checkApiToken()
  router.post('/admin/login', controller.admin.login)
  router.get('/admin/info', controller.admin.getAdminInfo)
  router.get('/admin/signout', controller.admin.signout)
  router.get('/admin/all', controller.admin.getAllAdmin)
  router.get('/admin/count', controller.admin.getAdminCount)

  router.post('/shopping/addShop', controller.shop.addShop)
  router.get('/shopping/restaurants/count', controller.shop.getShopCount)
  router.get('/shopping/restaurants', controller.shop.getRestaurants)
  router.post('/shopping/updateshop', controller.shop.updateshop)
  router.delete('/shopping/restaurant/:restaurant_id', controller.shop.deleteResturant)

  router.get('/v1/cities', controller.city.getCity)
  router.get('/v1/pois', controller.search.search)

  router.get('/shopping/v2/restaurant/category', controller.category.getCategories)
  
  // router.resources('teachers', '/v1/teachers', checkApiToken, controller.teachers)
  // router.resources('auth', '/v1/auth', controller.auth)
  // router.delete('/v1/auth', controller.auth.destroy)
  // router.resources('course_categories', '/v1/course_categories', checkApiToken, controller.categories)
}
