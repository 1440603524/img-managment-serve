'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;

    const user = await ctx.service.user.findOneByName(userName);

    if (user) {
      const checked = await ctx.compare(password, user.password);
      if (!checked) {
        ctx.body = {
          code: 400,
          message: '密码错误，请重新输入',
        };
        return;
      }
      const token = app.jwt.sign({
        userName,
      }, app.config.jwt.secret, { expiresIn: '4h' });
      ctx.body = {
        code: 200,
        data: { userName: user.userName, token },
        message: '登录成功',
      };
    }
  }

  // 注册
  async register() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;
    const hash = await ctx.genHash(password);
    const exist = await ctx.service.user.findOneByName(userName);
    if (exist) {
      ctx.body = {
        code: 400,
        message: '用户已存在',
      };
      return;
    }
    await ctx.service.user.register(userName, hash);
    ctx.body = {
      code: 200,
      message: '注册成功',
    };
  }

  // 获取用户信息
  async info() {
    const { ctx } = this;
    const { userName } = ctx.request.body;
    const user = await ctx.service.user.info(userName);
    if (user) {
      ctx.body = {
        code: 200,
        data: {
          userName,
        },
        message: '获取成功',
      };
    }

  }
}

module.exports = UserController;
