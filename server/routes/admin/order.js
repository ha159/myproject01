var express=require('express');

var router=express.Router();

var DB=require('../../modules/db.js');  /*引入DB数据库*/
var md5=require('../../modules/md5.js');

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var sd=require('silly-datetime');

router.get('/',function(req,res){
	var page = Number(req.query.page||1)
    page = Math.max(page,1);
	DB.find('order',{},{"pageamount":5,"page":page-1},function(err,data){
        console.log(data)
        res.render('admin/order/index',{
        	page:page,
            list:data
        });
    })
})

router.get('/delete',function(req,res){
    //获取id

    var  id=req.query.id;

    DB.deleteOne('order',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/order');
        }

    })

})

module.exports = router; 