'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwtErr = middleware.jwtErr(app.config.jwt);
  router.post('/project/add', jwtErr, controller.project.addProject);
  router.get('/project/list', jwtErr, controller.project.projectList);
  router.post('/project/delete', jwtErr, controller.project.deleteProject);
  router.post('/project/edit', jwtErr, controller.project.editProject);
  router.get('/project/recent', jwtErr, controller.project.recentProject);
  router.get('/project/list/name', jwtErr, controller.project.projectNameList);
};
