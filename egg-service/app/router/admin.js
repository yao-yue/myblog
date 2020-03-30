module.exports = app => {
    const {router, controller} = app
    let adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    //adminauth, 路由守为，没有登录是无法访问此api的,保护这个api被恶意调用
    router.get('/admin/getTypeInfo',adminauth ,controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',adminauth, controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
}