'use strict'
const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        //首页文章列表数据
        this.ctx.body = 'hi api'
    }
    //判断用户名密码是否正确
    async checkLogin() {
        let { username, password } = this.ctx.request.body

        const sql = " SELECT id FROM admin_user WHERE username = '" + username +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        const userId = res[0].id ? res[0].id : -1
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { status: '1', msg: 'success', openId, userId }
        } else {
            this.ctx.body = { status: '0', msg: 'logining fail' }
        }
    }
    //后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        if(!resType) {
            this.ctx.body = { status:'0', data: [] }
        } else {
            this.ctx.body = { status:'1', data: resType }
        }
    }

    //添加文章
    async addArticle() {
        let tmpArticle = this.ctx.request.body
        tmpArticle.view_count = 1
        const result = await this.app.mysql.query('insert into article (type_id,title,article_content,introduce,addTime,view_count) values (?,?,?,?,?,?)', Object.values(tmpArticle))
        const insertSuccess = !!(result.affectedRows === 1)
        const insertId = result.insertId ? result.insertId : -1
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId
        }
    }

    //修改文章
    async updateArticle() {
        const tmpArticle = this.ctx.request.body
        const id = this.ctx.params.id
        tmpArticle.id = id
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(Object.values(tmpArticle))
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        let updateSQL = `update article set type_id=?,title=?,article_content=?,introduce=?,addTime=? where id=?`
        const result = await this.app.mysql.query(updateSQL, Object.values(tmpArticle));
        const updateSuccess = !!(result.affectedRows === 1)
        this.ctx.body = {
            isScuccess: updateSuccess,
        }
    }

    //获取文章列表
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.view_count as viewCount,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '
        const resList = await this.app.mysql.query(sql)
        if(!resList) {
            this.ctx.body = {status:'0', list: [] }
        } else {
            this.ctx.body = {status:'1', list: resList }
        }
    }

    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        const delSuccess = !!(res.affectedRows === 1)
        const msg = delSuccess ? 'success': 'no this article'
        this.ctx.body = { delSuccess,msg }
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql)
        if(!result) {
        this.ctx.body = { status:'0',data: {} }
        } else {
            this.ctx.body = { status: '1', data: result }
        }
    }
}

module.exports = MainController