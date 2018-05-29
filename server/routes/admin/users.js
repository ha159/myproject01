var express=require('express');

var router=express.Router();

var DB=require('../../modules/db.js');  /*引入DB数据库*/
var md5=require('../../modules/md5.js');

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var sd=require('silly-datetime');

router.get('/',function(req,res){
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
	DB.find('users',{},function(err,data){

        res.render('admin/users/index',{
            list:data
        });
    })
})


//显示修改用户
router.get('/edit',function(req,res){
	
	var id = req.query.id;
	
	//去数据库查找这个id的用户信息
	DB.find('users',{"_id":new DB.ObjectID(id)},function(err,data){
		console.log(data)
		res.render('admin/users/edit',{
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
        password = md5(md5(password).substr(4,7) + md5(password));
    	
    	console.log(fields)
    	console.log(files)
    	
    		var setData = {
    		    
    		    password,
    		    time
    		    
    		}
    	
    	
    	DB.update('users',{"_id":new DB.ObjectID(_id)},setData,function(err,data){

            if(!err){
                res.redirect('/admin/users');
            }
        })
	})
	
	
})

router.get('/delete',function(req,res){
    //获取id

    var  id=req.query.id;

    DB.deleteOne('users',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/users');
        }

    })

})

module.exports = router; 