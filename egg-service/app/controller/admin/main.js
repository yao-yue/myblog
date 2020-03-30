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

        const sql = " SELECT username FROM admin_user WHERE username = '" + username +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { status: '001' ,msg: 'success', openId}
        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }
}

module.exports = MainController