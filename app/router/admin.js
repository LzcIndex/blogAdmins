module.exports = app =>{
    const {router,controller} = app
    let adminauth = app.middleware.adminauth()
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/login',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
    router.post('/admin/updateArticleType',adminauth,controller.admin.main.updateArticleType)
    router.get('/admin/delArticleType/:id',adminauth,controller.admin.main.delArticleType)
    router.post('/admin/addArticleType',adminauth,controller.admin.main.addArticleType)
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
    router.get('/admin/getBlogPublicSet',adminauth,controller.admin.main.getBlogPublicSet)
    router.post('/admin/updateBlogPublicSet',adminauth,controller.admin.main.updateBlogPublicSet)
    router.post('/admin/addBlogPublicSet',adminauth,controller.admin.main.addBlogPublicSet)
}