const jwt = require('jwt-simple');
const moment = require('moment');
module.exports = (options, app) => {
  return async function(ctx, next) {
    // 尝试从请求头、请求体、查询字符串中获取 token 信息
    const token = ctx.get('x-access-token');

    if (!token) {
      ctx.status = 400;
      return ctx.body = {
        error: '请提供请求头 X-Access-Token 信息！',
      };
    }

    let decodedToken = null;

    // 校验 token 的正确性
    try {
      decodedToken = jwt.decode(token, 'lipengzhou');
    } catch (err) {
      validToken = false;
      ctx.status = 401;
      return ctx.body = {
        error: '无效的 token',
      };
    }

    // 如果 token 无效，则停止后续执行
    if (!decodedToken) {
      return;
    }

    // 如果过期时间小于当前时间，说明已过期
    if (decodedToken.exp < moment().valueOf()) {
      ctx.status = 401;
      return ctx.body = {
        error: 'token 已过期，需要重新登陆换取新的 token',
      };
    }

    // 把用户 id 记录到上下文中方便在后续中间件使用
    ctx.user = decodedToken.iss;

    // token 校验通过，进入下一个中间件
    // 注意：中间件中调用 next 必须前置 await，否则后续中间件无法继续 await
    await next();
  };
};
