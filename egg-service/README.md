# egg-middle-service

egg做博客系统的服务端，也称中台

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### supplement
1. koa原生路由的实现：根据路由的路径去用fs模块读文件，再把读到的文件返回给页面（那服务端渲染呢）
2. 为什么要静态资源中间件呢，因为用原生的去弄比较麻烦，拼接路径之类的，所以用这个中间件简化。app.use(static(导向static目录/绝对路径))
3. 关于cookie的配置。选项：domain path maxAge expires httpOnly overwrite
4. bodyParser作用是将formData解析到body里面。ctx.body等同于ctx.res.body，所以从ctx.body取出来的是空的响应报文，而不是请求报文的实体哦。bodyparser是一类处理request的body的中间件函数。请求报文的报文实体啦
    请求相关事件和数据处理流程：
    data事件、end事件
    收集Buffer
    整合Buffer
    是否解压（Content-Encodeing)
    解析字符编码(charset)
    解析字符串(Content-Type)
[参考文章](https://www.cnblogs.com/penghuwan/p/11374268.html)

### 目录规范
app文件夹:项目开发文件，程序员主要操作的文件，项目的大部分代码都会写在这里。
```
controller文件夹：控制器，渲染和简单的业务逻辑都会写道这个文件里。配置路由时也会用到（路由配置需要的文件都要写在控制器里）。
public文件夹：公用文件夹，把一些公用资源都放在这个文件夹下。
router.js: 项目的路由配置文件，当用户访问服务的时候，在没有中间件的情况下，会先访问router.js文件。
service文件夹：这个是当我们的业务逻辑比较复杂或和数据库打交道时，会把业务逻辑放到这个文件中。
view文件夹：模板文件夹，相当于表现层的专属文件夹，这个项目，我们使用接口的形式，所以不需要建立view文件夹。
extend文件：当我们需要写一些模板中使用的扩展方法时，我们会放到这个文件夹里。
middleware：中间件文件夹，用来写中间件的，比如最常用的路由首位
```
config文件夹：这个是整个项目的配置目录，项目和服务端的配置都在这里边进行设置。
logs文件夹：日志文件夹，正常情况下不用修改和查看里边内容。
node_modules:项目所需要的模块文件，这个前端应该都非常了解，不多作介绍。
run文件夹：运行项目时，生成的配置文件，基本不修改里边的文件。
test文件夹：测试使用的配合文件，这个在测试时会使用。
.autod.conf.js: egg.js自己生成的配置文件，不需要进行修改。
eslinttrc和eslintignore：代码格式化的配置文件。
gitgnore：git设置忽略管理的配置文件。
package.json： 包管理和命令配置文件，这个文件经常进行配置。


### restful
对URI(资源)的操作，请求get\post\put\delete

### API接口的路由配置
admin 管理端的所有API接口
default 客户端使用的所有API接口
路由也要分成前后端分离的，所以在app文件夹下新建一个router文件夹

### mysql
在安装完成以后，还不能正常使用，egg.js要求我们对于外部模块在plugin.js中进行配置

### 关于安装到开发依赖还是生产依赖
-S    --save     
-D    --save-dev


### api 管理
由于接口越来越多，现在这样零散的管理非常不利于日后的维护，所以需要单独一个文件，专门用于前台和中台的接口管理。这样在以后部署和更换服务器时都非常简单


### 一个小问题 
我把请求数据放在-x-www-form-urlencoded能在request.body里拿到数据
放在form-data里拿不到， 他们之间的区别是啥

### 中台路由守卫
守卫方法是通过egg.js中间件来实现，验证session成功，就会用await next()向下接力，如果验证失败就返回未登录。
正常情况下前后台是不能共享session的，但是在config.default.js里配置credentials:true ---开启跨域携带cookie


### test
```
前台
http://127.0.0.1:7001/default/index
http://127.0.0.1:7001/default/getArticleList
http://127.0.0.1:7001/default/getArticleById/:id
http://127.0.0.1:7001/default/getTypeInfo
http://127.0.0.1:7001/default/getListById/:id
```


```
后台
http://127.0.0.1:7001/admin/index
http://127.0.0.1:7001/admin/checkLogin
http://127.0.0.1:7001/admin/getTypeInfo
http://127.0.0.1:7001/admin/addArticle
http://127.0.0.1:7001/admin/getArticleList
http://127.0.0.1:7001/admin/updateArticle/:id
http://127.0.0.1:7001/admin/delArticle/:id
http://127.0.0.1:7001/admin/getArticleById/:id
```

```
备注： 
sessionId:1585571410782
time: 1585572487
```

```
//计划优化
1. 重写url
2. 请求函数的报错和返回内容的优化

//笔记查询语句
insert into musics (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)
update musics set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id=?
delte from musics where id = ?', [id]
query * from music where id = ?', [id]
```


### jwt
[jwt](https://blog.csdn.net/isHoMeTown/article/details/101272591)
路由守卫自己写还是弄一个jwt呢，弄一下再说把。


### 在服务器npm start一直报错
解决思路：
新建一个简单egg服务看看能不能部署上去
发现是端口占用问题，把7001改成别的端口能够有效
还有就是一些权限的问题要注意

### 跨域
egg orgin 只能配置一个 
但是前台服务和后台服务有2个端口号 这样就会产生跨域。。该如何解决呢
配置一个中间件来判断前端请求的origin来弄一个数组来匹配