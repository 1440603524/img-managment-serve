'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwtErr = middleware.jwtErr(app.config.jwt);
  router.get('/member/list', jwtErr, controller.member.memberList);
  router.post('/member/add', jwtErr, controller.member.addMember);
  router.post('/member/search', jwtErr, controller.member.findMember);
  router.post('/member/delete', jwtErr, controller.member.deleteMember);
};
