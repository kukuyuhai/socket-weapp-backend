'use strict';

module.exports = () => {
  // 2、返回一个异步的函数
  return async function tokenVerify(ctx, next) {
    const token = ctx.request.header.x_authorize_token;
    // 获取到token，使用jwt verify token是否有效
    const flag = await ctx.service.token.verify(token);
    console.log(flag);
    if (flag) {
      await next();
    } else {
      ctx.body = { code: 403, message: 'jwt expired ' };
    }
  };
};

