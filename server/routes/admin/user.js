var express=require('express');

var router=express.Router();

var DB=require('../../modules/db.js');  /*引入DB数据库*/
var md5=require('../../modules/md5.js');

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var sd=require('silly-datetime');

router.get('/',function(req,res){
	DB.find('user',{},function(err,data){

        res.render('admin/user/index',{
            list:data
        });
    })
})
router.get('/add',function(req,res){
	res.render('admin/user/add')
})
//doUserAdd
router.post('/doUserAdd',function(req,res){
	
	//获取表单的数据 

    var form = new multiparty.Form();
    var userid = new Date().getTime();
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
    
    form.parse(req,function(err,fields, files){
//  	console.log(fields);
    	var username = fields.username[0];
    	var password = fields.password[0];
    	//加密
//      password = md5(md5(password).substr(4,7) + md5(password));
    	
    	
    		DB.insert('user',{
    		userid,
    		username,
    		password,
    		time
    		
    		
    	},function(err,data){
    		 res.redirect('/admin/user'); /*上传成功跳转到用户首页*/
    	})
    	
    	
    })
	
})


//显示修改用户
router.get('/edit',function(req,res){
	
	var id = req.query.id;
	
	//去数据库查找这个id的用户信息
	DB.find('user',{"_id":new DB.ObjectID(id)},function(err,data){
		console.log(data)
		res.render('admin/user/edit',{
            list:data[0]
        });
	})
	
})

//保存修改用户信息
router.post('/doUserEdit',function(req,res){
	var form = new multiparty.Form();
	var id = req.query.id;
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
	form.parse(req,function(err,fields,files){
		var _id=fields._id[0];   /*修改的条件*/
    	var password = fields.password[0];
    	var qrpassword = fields.qrpassword[0];
    	console.log(fields)
    	console.log(files)
    	
    		var setData = {
    		    
    		    password,
    		    qrpassword,
    		    time
    		}
    	
    	
    	DB.update('user',{"_id":new DB.ObjectID(_id)},setData,function(err,data){

            if(!err){
                res.redirect('/admin/user');
            }
        })
	})
	
	
})

router.get('/delete',function(req,res){
    //获取id

    var  id=req.query.id;

    DB.deleteOne('user',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/user');
        }

    })

})

module.exports = router; 