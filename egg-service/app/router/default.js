// 服务前端的路由

module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    //配置路由动态传值 /:id
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)

}