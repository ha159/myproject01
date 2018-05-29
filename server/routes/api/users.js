var express=require('express');

var router=express.Router();

var DB=require('../../modules/db.js');
var md5=require('../../modules/md5.js');
var sd=require('silly-datetime');
//统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData = {
		code:0,
		username:'',
		message:''
	}
	next();
})


//用户注册接口
router.post("/reg",function(req,res){
	
	console.log(req.body)
	var username = req.body.username;
	var password = req.body.password;
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
	//加密
    password = md5(md5(password).substr(4,7) + md5(password));
	var cartList = [];
    var orderList = [];
    var addressList = [];
	//验证用户名是否已经被注册
	DB.find('users',{username:username},function(err,data){
		console.log(data.length)
		if(data.length==1){
			responseData.code='1';
			responseData.message = '用户名已经被注册！';
	        res.json(responseData)
	        return;
        }
		//保存用户注册数据到数据库中
		DB.insert('users',{
				username,
				password,
				cartList,
                orderList,
                addressList,
                time
			},function(err,data){
//				console.log(data)
			})
		        responseData.code='0';
		        
				responseData.message = '注册成功';
	            res.json(responseData)	
//	            console.log(data[0].username)
	})
})
//用户登录接口
router.post('/login',function(req,res){
//	console.log(typeof(req.body.loginName))
	var username = req.body.username;
	var password = req.body.password;
    password = md5(md5(password).substr(4,7) + md5(password));
	
//	console.log(req.session.userinfo.username)
	//验证数据库中是否有该账号密码
	DB.find('users',{
		username:username,
		password:password
	},function(err,data){
//		console.log(data[0].regName.length)
//		console.log(loginName)
//		for(var i=0;i<data.length;i++){
////			var j = i;
//			console.log(data[i].regPasswd)
			if(data.length==0){
				responseData.code='1';
				responseData.message = '用户名或密码出错！'
	            res.json(responseData);
	            return;
			}
//			if(data[i].regPasswd!=loginPwd){
//				responseData.code='2';
//				responseData.message = '密码出错！'
//	            res.json(responseData);
//	           return;
//			
//		}	
//		}
        req.session.user=data[0].username;
        var uname = req.session.user
        console.log(uname)
		responseData.code='0';
		responseData.username = uname;
		responseData.message = '登录成功！'
	    res.json(responseData);	
//       console.log(data.length)
//       return Promise.reject();
		
	})
})

router.get("/userInfo",function(req,res){
	var username = req.session.user
	console.log(username)
	DB.find('users',{username:username},function(err,data){
		 res.json({
		 	  list:data
		 })
		 console.log(data)
	})
})

//loginOut
router.post('/loginOut',function(req,res){
	var isLogin = req.body.isLogin;
	if(isLogin=='loginOut'){
		delete req.session.user;
		console.log(req.session.user)
	}
	    responseData.code='0';
		responseData.username = '';
		responseData.message = '退出成功！'
	    res.json(responseData);	
})

//修改密码
router.post('/changePwd',function(req,res){
	var oldPwd = req.body.oldPwd;
	var newPwd = req.body.newPwd;
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
    oldPwd = md5(md5(oldPwd).substr(4,7) + md5(oldPwd));
	newPwd = md5(md5(newPwd).substr(4,7) + md5(newPwd));
	DB.find('users',{'password':oldPwd},function(err,data){
		console.log(data)
		if(data.length<=0){
			
				responseData.code='1';
				responseData.username = '';
				responseData.message = '修改失败！';
			    res.json(responseData);	
			    return;
		}else{
			DB.update('users',{'password':oldPwd},{'password':newPwd},function(err,data){
				if(err){
					console.log(err)
				}else{
					responseData.code='0';
					responseData.username = '';
					responseData.message = '修改成功！';
				    res.json(responseData);
				}
			})
				
		}
	})
	   
})

//留言
router.post('/sendMsg',function(req,res){
	var username = req.session.user;
	var message=req.body.msg;
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
	var message={
		username:username,
		message:message,
		time:time
	}
	
           DB.insert('message',{msgList:message},function(err,data){				
				if(err){
                	 responseData.code='1';		        
				     responseData.message = '留言失败';
	                 res.json(responseData)
                }else{
                	 responseData.code='0';		        
				     responseData.message = '留言成功';
	                 res.json(responseData)	
                }
		  })
		        
})
router.get("/showMsg",function(req,res){
	var username = req.session.user;
	
	DB.find('message',{},function(err,data){
		 if(err){
		 	responseData.code='1';		        
			responseData.message = '留言失败';
	        res.json(responseData)
		 }else{
		 	res.json({
		 	  list:data,
		 	  code:0
		    })
		 }
		 console.log(data)
	})
})


module.exports = router; 