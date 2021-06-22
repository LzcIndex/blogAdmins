'use strict';

const Controller = require('egg').Controller;

class mainController extends Controller{
    async index(){
        this.ctx.body = "hi 111"
    }
    //检测登陆
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        let sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`
        let result = await this.app.mysql.query(sql)
        console.log("result",result)
        if(result.length > 0){
            let openId = new Date().getTime()
            this.ctx.session.openId = openId
            console.log("session",this.ctx.session.openId)
            this.ctx.body = {data:'登陆成功',openId:openId}
        }else{
            this.ctx.body = {data:"登陆失败"}
        }
    }

    async getTypeInfo(){
        var result = await this.app.mysql.select('type')
        this.ctx.body = {data : result}
    }

    async updateArticleType(){
        let tmpArticleType = this.ctx.request.body
        const result = await this.app.mysql.update('type',tmpArticleType)
        const isUpdateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess : isUpdateSuccess
        } 
    }

    async delArticleType(){
        var id = this.ctx.params.id
        var result =await this.app.mysql.delete('type',{'id':id})
        this.ctx.body = {
            data:result
        }
    }
        
    async addArticleType(){
        let tmpArticleType = this.ctx.request.body
        const result = await this.app.mysql.insert('type',tmpArticleType)
        const isInsertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess : isInsertSuccess,
            insertId : insertId
        } 
    }

    async addArticle(){
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const isInsertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess : isInsertSuccess,
            insertId : insertId
        } 
    }

    async updateArticle(){
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article',tmpArticle)
        const isUpdateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess : isUpdateSuccess
        } 
    }

    async getArticleList(){
       let sql = 'SELECT article.id as id,'+
       'article.title as title,'+
       'article.introduce as introduce,'+
       'article.view_count as view_count,'+
       "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
       'type.typeName as typeName '+
       'FROM article LEFT JOIN type ON article.type_id = type.Id '+
       'ORDER BY article.id DESC '

       const resList = await this.app.mysql.query(sql)
       
       this.ctx.body = {
           list : resList
       }
    }

    async delArticle(){
        var id = this.ctx.params.id
        var result = this.app.mysql.delete('article',{'id':id})
        this.ctx.body = {
            data:result
        }
    }

    async getArticleById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            data : result
        }
    }

    //博客全局设置获取
    async getBlogPublicSet(){
        let sql = `SELECT * From blog_public_set`
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            code:0,
            msg:'',
            data:result
        }
    }
    //博客全局设置更新
    async updateBlogPublicSet(){
        let updateTmp = this.ctx.request.body
        const result = await this.app.mysql.update('blog_public_set',updateTmp)
        const isUpdateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess : isUpdateSuccess
        } 
    }
     //博客全局设置增加
     async addBlogPublicSet(){
        let addTmp = this.ctx.request.body
        const result = await this.app.mysql.insert('blog_public_set',addTmp)
        const isInsertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess : isInsertSuccess,
            insertId : insertId
        }
    }
}


module.exports = mainController