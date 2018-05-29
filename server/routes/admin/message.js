
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB=require('../../modules/db.js');  /*引入DB数据库*/

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var fs=require('fs');
var sd=require('silly-datetime');

router.get('/',function(req,res){
	var page = Number(req.query.page||1)
    page = Math.max(page,1);
	
    DB.find('message',{},{"pageamount":5,"page":page-1},function(err,data){
//      var data=data.msgList;
        console.log(data)
        res.render('admin/message/index',{
        	page:page,
            list:data
        });
    })

})

//删除
router.get('/delete',function(req,res){
    //获取id

    var  id=req.query.id;

    DB.deleteOne('message',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/message');
        }

    })

})

//存储回复内容

router.get('/edit',function(req,res){
	
	var id = req.query.id;
	
	//去数据库查找这个id的用户信息
	DB.find('message',{"_id":new DB.ObjectID(id)},function(err,data){
		console.log(data)
		res.render('admin/message/edit',{
            list:data
        });
	})
	
})

//保存修改用户信息
router.post('/doBackMsg',function(req,res){
	var form = new multiparty.Form();
	var id = req.query.id;
	
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
	form.parse(req,function(err,fields,files){
		var _id=fields._id[0];   /*修改的条件*/
    	var message= fields.backMsg[0];
    	var name='店主回复：'
    	console.log(fields)
    	console.log(files)
    	
    		var setData = {
    			name,
    		    message,
    		    time
    		}
    	
    	
    	DB.update('message',{"_id":new DB.ObjectID(_id)},{backMsg:setData},function(err,data){

            if(!err){
                res.redirect('/admin/message');
            }
        })
	})
	
	
})

module.exports = router;   /*暴露这个 router模块*/