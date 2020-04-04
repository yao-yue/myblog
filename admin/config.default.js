config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*']
};
config.cors = {
    origin: 'http://127.0.0.1:3001',
    credentials: true,  //允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};