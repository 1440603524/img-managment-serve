module.exports = options => {
  return async function jwtErr(ctx, next) {
    let token = '';
    if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
      token = ctx.headers.authorization.split(' ')[1];
    }
    try {
      const decoded = ctx.app.jwt.verify(token, options.secret);
      ctx.request.body = {
        ...ctx.request.body,
        userName: decoded.userName,
      };
    } catch (err) {
      console.log(err);
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '登录失效，请重新登录',
      };
      return;
    }
    await next();
  };
};
