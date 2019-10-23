/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570848639065_5226';

  // add your middleware config here
  config.middleware = [ 'tokenVerify' ];

  config.tokenVerify = {
    enable: true, // 是否开启该中间件，不写默认开启
    // match: ['/admin'], // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
    ignore: [ '/code2Session' ], // 不要与match一起使用，避免冲突
  };

  config.wxHost = 'https://api.weixin.qq.com';

  config.wx_appid = 'wx54ce5f7c9692984d';

  config.wx_appsecret = 'c53779a6f72a6c0c2cee63d615c7cc09';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    username: 'sa',
    password: '123456',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
