
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
  config.keys = appInfo.name + '_1585920278493_6423';

  // add your middleware config here
  config.middleware = ['setOrigin'];
  config.setOrigin = {
    whiteList: ['http://localhost:3001','http://localhost:3666'],
  }


  //mysql配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'redqueen',
      password: '112233',
      database: 'react_blog',
    },
    app: true,        // 是否加载到 app 上，默认开启
    agent: false,    // 是否加载到 agent 上，默认关闭
  };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }
  config.cors = {
    // origin: '*',
    // origin: 'http://localhost:3001',
    credentials: true,   //允许跨域携带cookie
    allowMethods: 'GET,PUT,DELETE,POST,OPTIONS'
  }

  config.cluster = {
    lsiten: {
      port: 9999,
      hostname: '127.0.0.1',
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};


