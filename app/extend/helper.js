'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async getAccesstoken() {
    let access_token;
    // 获取accessToken
    if (fs.existsSync(path.resolve(__dirname + '/accesstoken.json'))) {
      const data = fs.readFileSync(path.resolve(__dirname + '/accesstoken.json'));
      // 如果过期时间超过当前时间，表示现在已过期，重新获取token
      if (data.ExpireTime > Math.round(new Date() / 1000)) {
        const resp = await this.getToken(this.config.appid, this.config.appsecret);
        access_token = resp.access_token;
      } else {
        access_token = data.access_token;
      }
    } else {
      const result = await this.getToken(this.config.appid, this.config.appsecret);
      fs.writeFileSync(path.resolve(__dirname + '/accesstoken.json'), result, 'utf-8');
      access_token = result.access_token;
    }
    return access_token;
  },
  // eslint-disable-next-line no-empty-function
  async get3rdsession(code) {
    console.log(code);
    let trdsessionkey;
    try {
      const resp = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${this.config.appid}&secret=${this.config.appsecret}&js_code=${code}&grant_type=authorization_code`, {
        dataType: 'json',
      });
      if (resp.status === 200) {
        const openid = resp.data.openid;
        const sessionkey = resp.data.session_key;
        trdsessionkey = openid + sessionkey;
      } else {
        this.logger.debug(resp.data.errmsg);
      }
      return trdsessionkey;
    } catch (err) {
      console.log(err);
    }
  },
  async getToken(appid, appsecret) {
    const result = await this.ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`, {
      dataType: 'json',
    });
    return result.data;
  },
};
