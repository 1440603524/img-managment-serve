'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwtErr = middleware.jwtErr(app.config.jwt);
  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.get('/user/info', jwtErr, controller.user.info);
};
