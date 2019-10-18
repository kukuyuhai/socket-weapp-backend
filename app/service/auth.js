'use strict';

const Service = require('egg').Service;

class AuthService extends Service {
  async create(code) {
    const trdSession = await this.ctx.helper.get3rdsession(code);
    return trdSession;
  }
}

module.exports = AuthService;
