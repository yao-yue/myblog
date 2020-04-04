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
