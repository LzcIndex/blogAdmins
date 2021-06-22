module.exports  = app =>{
    const { router,controller } = app
    router.get('/default/getArticle',controller.default.home.getArticle)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInof',controller.default.home.getTypeInof)
    router.get('/default/getListById/:id',controller.default.home.getListById)
}