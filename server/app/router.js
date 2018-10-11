'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app
  // const checkApiToken = middlewares.checkApiToken()
  router.get('/', controller.home.index)
  router.post('/admin/login', controller.admin.login)
  router.get('/admin/info', controller.admin.getAdminInfo)
  router.get('/admin/signout', controller.admin.signout)
  router.get('/admin/all', controller.admin.getAllAdmin)
  router.get('/admin/count', controller.admin.getAdminCount)
  // router.resources('teachers', '/v1/teachers', checkApiToken, controller.teachers)
  // router.resources('auth', '/v1/auth', controller.auth)
  // router.delete('/v1/auth', controller.auth.destroy)
  // router.resources('course_categories', '/v1/course_categories', checkApiToken, controller.categories)
}
