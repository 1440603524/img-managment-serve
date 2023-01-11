'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwtErr = middleware.jwtErr(app.config.jwt);
  router.post('/file/add', jwtErr, controller.file.addFile);
  router.get('/file/list', jwtErr, controller.file.fileList);
  router.post('/file/update', jwtErr, controller.file.updateFile);
};
