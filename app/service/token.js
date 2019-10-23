'use strict';
const jwt = require('jsonwebtoken');
const secret = '123456';

const Service = require('egg').Service;

class TokenService extends Service {
  async sign(info) {
    const token = jwt.sign({
      info,
    }, secret, {
      expiresIn: 60 * 60,
    });
    return token;
  }

  async verify(token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      console.log(err);
    }
  }

  async getOpenId(token) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded.info.openid;
    } catch (error) {
      console.log(error);
    }
  }

  async getSessionkey(token) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded.info.session_key;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TokenService;
