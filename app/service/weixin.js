'use strict';
const crypto = require('crypto');
const Service = require('egg').Service;

class WeixinService extends Service {
  /**
   * 身份校验过期后获取新的sessionkey和用户信息
   * @param {*} session_key 加密sessionkey
   * @param {*} fullUserInfo 用户授权后所有的用户信息
   */
  async getUserInfo(session_key, fullUserInfo) {
    try {

      // 验证用户信息完整性
      const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData.toString() + session_key).digest('hex');
      if (fullUserInfo.signature !== sha1) {
        return null;
      }
      const userInfo = await this.decryptUserInfoData(session_key, fullUserInfo.encryptedData, fullUserInfo.iv);
      delete userInfo.watermark;
      return {
        userInfo,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // ${this.config.wx_appid}&secret=${this.config.wx_appsecret}&js_code=${code}
  /**
   * code换取sessionkey
   * @param {*} code //5分钟有效，只能使用后一次
   */
  async jscode2session(code) {
    // 获取sessionkey
    const session_data = await this.ctx.curl(`${this.config.wxHost}/sns/jscode2session?appid=${this.config.wx_appid}&secret=${this.config.wx_appsecret}&js_code=${code}&grant_type=authorization_code`, {
      method: 'GET',
      dataType: 'json',
    });
    const data = session_data.data;
    console.log(data);
    return data;
  }


  /**
   * @param  {string} sessionkey 解密秘钥
   * @param  {object} encryData 加密数据
   * @param  {string} iv 向量
   */
  async decryptUserInfoData(sessionkey, encryData, iv) {
    let decoded = '';
    try {
      const _sessionKey = Buffer.from(sessionkey, 'base64');
      encryData = Buffer.from(encryData, 'base64');
      iv = Buffer.from(iv, 'base64');
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      const userInfo = JSON.parse(decoded);
      if (userInfo.watermark.appid !== this.config.wx_appid) {
        return null;
      }
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = WeixinService;
