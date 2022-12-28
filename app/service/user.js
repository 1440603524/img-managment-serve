'use strict';

const { Service } = require('egg');

class UserService extends Service {
  async findOneByName(userName) {
    const { app } = this;
    return await app.model.User.findOne({
      where: {
        user_name: userName,
      },
      raw: true,
    });
  }

  async register(userName, password) {
    const { app } = this;
    return await app.model.User.create({
      user_name: userName,
      password,
    });
  }

  async info(userName) {
    const { app } = this;
    return await app.model.User.findOne({
      where: {
        user_name: userName,
      },
      raw: true,
    });
  }
}

module.exports = UserService;
