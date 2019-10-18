'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    if (code) {
      const result = await ctx.service.auth.create(code);
      ctx.body = result;
      ctx.status = 200;
    } else {
      ctx.status = 500;
      ctx.body = 'system error';
    }
  }
}

module.exports = AuthController;
