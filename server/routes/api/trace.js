var express=require('express');

var router=express.Router();

var DB=require('../../modules/db.js');

//统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData = {
		code:0,		
		message:''
	}
	next();
})

//添加足迹接口
router.post("/addTrace",function(req,res){
	username = req.session.user;
	id = req.body._id
	console.log(req.body._id)
    console.log(username)
	
		DB.find('product',{"_id":new DB.ObjectID(id)},function(err,data){
//			console.log(data)
			var traceList = data[0];
			console.log(traceList)
			
			
			DB.find('users',{username:username},function(err2,data2){
//				
				DB.update2('users',{username:username},{traceList:traceList},function(err3,data3){				
					
				})
			})
		})
	
	responseData.code='0';
	responseData.message = '添加成功';
	res.json(responseData)	
	
})

router.get("/getTrace",function(req,res){
	var username = req.session.user
	console.log(username)
	DB.find('users',{username:username},function(err,data){
		 res.json({
		 	  list:data
		 })
		 console.log(data)
	})
})

//足迹删除接口
router.post("/delTrace",function(req,res){
	var id = req.body.id;
//	req.session.user=data[0].username;
    var uname = req.session.user
    console.log(uname)
    console.log(id)
    DB.updatePull('users',{'username':uname},{'traceList':{'_id':new DB.ObjectID(id)}},function(err,data){
    	
		console.log(data)
    })
    responseData.code='0';
	responseData.message = '删除成功';
	res.json(responseData)	
})

module.exports = router; 