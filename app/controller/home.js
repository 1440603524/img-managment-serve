'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async test() {
    const { ctx, app: { mysql } } = this;
    const mysqlData = await mysql.get('user', { id: 1 });
    ctx.body = {
      code: 200,
      data: {
        mysqlData,
        testData: 'lzj真的很牛逼',
      },
      msg: 'success',
    };
  }
}

module.exports = HomeController;
