var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var sd=require('silly-datetime');
//var mongoose = require('mongoose');
//var Category = require('../../models/Category');
var DB=require('../../modules/db.js');  /*引入DB数据库*/

router.get('/',function(req,res){
	
	//查找数据库中的分类信息
	DB.find('category',{},function(err,data){
		res.render('admin/category/index',{
            list:data
        });
        console.log(data)
	})
     

})
//分类显示
router.get('/add',function(req,res){
     res.render('admin/category/add');

})

//分类保存
router.post('/doAdd',function(req,res){
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
   
   var name = req.body.name;
   DB.find('category',{},function(err,data){
   	console.log(data.length)
   	   for(var i=0;i<data.length;i++){
   	   	  if(name==data[i].name){
// 	   	  	 res.redirect('/admin/category');
              res.send("<script>alert('分类信息已经存在！');location.href='/admin/category/add'</script>");
   	   	  	  return Promise.reject();
   	   	  }else{
   	   	  	 DB.insert('category',{
			   	   name:name,
			   	   time:time
			   },function(err,data){
			   	   if(!err){
			             res.redirect('/admin/category'); /*上传成功跳转到首页*/
			           
			            }
			   })
   	   	  	 return Promise.reject();
   	   	  }
   	   	  
   	   	  
   	   }
   	   if(data.length==0){
   	   	  	DB.insert('category',{
			   	   name:name
			   },function(err,data){
			   	   if(!err){
			             res.redirect('/admin/category'); /*上传成功跳转到首页*/
			           
			            }
			   })
   	   	  }
   })
  
})

//分类修改
router.get('/edit',function(req,res){
     res.send('category显示');

})
//分类删除
router.get('/delete',function(req,res){
    var  id=req.query.id;

    DB.deleteOne('category',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/category');
        }

    })

})



module.exports = router;