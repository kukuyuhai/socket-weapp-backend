'use strict';
const _ = require('lodash');

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async code2sessionkey() {
    const { ctx } = this;
    const session = await ctx.service.weixin.jscode2session(ctx.request.body.code);
    // 生成第三方trd_sessionkey
    const token = await this.ctx.service.token.sign(session);
    ctx.body = { token };
  }

  async saveUserInfo() {
    const { ctx, app } = this;
    const { fullUserInfo } = ctx.request.body;
    const token = ctx.request.header.x_authorize_token;
    const sessionkey = await ctx.service.token.getSessionkey(token);
    console.log(fullUserInfo);

    const info = await ctx.service.weixin.getUserInfo(sessionkey, fullUserInfo);
    if (info === null) {
      ctx.body = { code: 403, message: 'sessionkey is expired' };
      return false;
    }
    // 根据用户返回的openid，查询是否为新用户。
    let user = await app.model.User.findUserbyId(info.userInfo.openId);
    if (_.isEmpty(user)) {
      user = await app.model.User.create(info.userInfo);
    }
    // 更新登录时间
    await user.logSignin();

    const newUserInfo = await app.model.User.findAll({
      where: { openId: user.get('openId') },
    });
    ctx.body = { code: 200, data: newUserInfo, message: 'get UserInfo Success' };
  }
}

module.exports = AuthController;
