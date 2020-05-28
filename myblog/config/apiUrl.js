// 统一整合起来 方便以后统一管理

let ipUrl = 'https://rect.red/default/' 

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo: ipUrl + 'getTypeInfo',       //获取文章类型
    getListById:ipUrl + 'getListById/',        //根据类别Id获取文章列表
}
export default servicePath;