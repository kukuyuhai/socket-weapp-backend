'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/', controller.home.join);
  router.post('/saveUserInfo', controller.auth.saveUserInfo);
  router.post('/code2Session', controller.auth.code2sessionkey);
};
