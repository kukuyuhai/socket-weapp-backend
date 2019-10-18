'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    await app.redis.set('token', 'access_token');
    ctx.body = 'access_token';
  }
}

module.exports = HomeController;
