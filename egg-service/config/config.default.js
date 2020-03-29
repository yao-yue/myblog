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
  config.keys = appInfo.name + '_1585485739114_2296';

  // add your middleware config here
  config.middleware = [];

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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};



