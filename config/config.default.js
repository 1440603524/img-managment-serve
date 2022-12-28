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
  config.keys = appInfo.name + '_1667875642034_4092';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  config.jwt = {
    secret: '666666',
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'linzijun666',
      database: 'img_managment',
    },
    app: true,
    agent: false,
  };
  config.sequelize = {
    dialect: 'mysql',
    database: 'img_managment',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'linzijun666',
    define: {
      timestamps: false,
      paranoid: false,
      freezeTableName: true,
      underscored: true,
    },
  };
  config.bcrypt = {
    saltRounds: 10,
  };
  config.oss = {
    client: {
      accessKeyId: 'LTAI5tA7WaA9P2JWvP79CQRa',
      accessKeySecret: 'aiKAUM5zs0IgsbGtILWvOOLHn8GR9B',
      bucket: 'file-management-tissue',
      region: 'oss-cn-shenzhen',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com',
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
