## react hooks + egg.js 个人博客项目

### 项目结构
1. blog前台 用户使用，博客展现9
2. 接口中台  数据接口，业务逻辑
3. 后台管理  文章类别管理 系统设置

### 细碎知识
1. yarn add @zeit/next-css   支持css
2. yarn add antd  babel-plugin-import  
3. 书籍目录导航 markdown-navbar
4. 关于markdown处理的包  marked+highlight.js。这个方案是比较成熟的，目前公司的开发文档程序就是基于这个开发的



### 小感悟
自己写后台这些接口才明白为什么前端要路由封装
1. 用promise包装,统一报错检验.
2. 方便统一修改,比如开发环境切换到线上环境的ip修改.


### 部署笔记
package.json  这样配置方便一些，把2个合并成了一个
```
{
  "name": "my-app",
  "dependencies": {
    "next": "latest"
  },
  "scripts": {
    "dev": "next",
    "start": "next start -p $PORT",
    "build": "next build && PORT=3001 npm start"  
  }
}
```
[next部署参考](https://segmentfault.com/a/1190000012774650)
[react单页应用部署](https://segmentfault.com/a/1190000012675012)
PM2其实不复杂。pm2是nodejs的一个带有负载均衡功能的应用进程管理器的模块，类似有Supervisor，forever，用来进行进程管理。
- 进入对应的应用目录
- pm2 start npm --name "my-next" -- run build
常用操作：
pm2 start 
pm2 list 
pm2 monit
pm2 stop []
pm2 reload []
pm2 restart []
pm2 delete []
pm2 --help


### 一个小坑
let ipUrl = 'http://182.92.184.154/:9999/default/' 
请求接口要写具体的主机号，不然会产生跨域问题


### 666，难题终于解决了
问题描述：egg默认是之能开启一个白名单，面对多个白名单的需求解决。
解决： 利用中间件，根据请求头的origin及自己的白名单配置数组，进行校验，如果匹配上了就这个时候再进行设置Access-Control-Allow-Origin: origin


### 一个小细节
插件本身也支持拼接与直接执行 sql 语句。使用 query 可以执行合法的 sql 语句。
注意！！我们极其不建议开发者拼接 sql 语句，这样很容易引起 sql 注入！！
this.app.mysql.query()
所以尽量使用封装好的这个this.app.mysql.update来操作比较好。

### 又一个大坑
1. https的配置问题，如果是一个api接口服务我们该怎么配置。
![问题.png](http://ww1.sinaimg.cn/large/006x4mSygy1gdjaarv972j31sv08w0uc.jpg)
静态的配置没有问题，问题是api服务该怎么配置呢

学习配置测试
base https://mini.iblack7.com/api/
upstream free {
  server 127.0.0.1:3003;
}
server {
  listen 443;
  server_name mini.iblack7.com; #填写绑定证书的域名
  ssl on;
  ssl_certificate /path;
  ssl_certificate_key /path;
  ssl_session_timeout 5m;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nignx-Proxy true;

    proxy_pass http://free;
    proxy_redirect off;
  }
}
这个方案解决了，但是有一个问题就是这样配置的化好像会占用80端口。
经过页面fetch测试，确实是可以提供api服务的。