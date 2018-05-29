var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB=require('../../modules/db.js');  /*引入DB数据库*/

router.get('/',function(req,res){
	
    res.render('admin/index/index')

});

//留言接口
router.post('/postMsg',function(req,res){
	var msg = req.body.msg;
	var username = req.session.userinfo.username;
	
	DB.insert('bbs',{
		msg:msg,
		username:username
	},function(err,data){
		console.log(data)
		
	})
	
	res.json({
		status:'0',
		msg:'留言成功',
		return:''
	})
})

router.get('/getMsg',function(req,res){
	DB.find('bbs',{},function(err,data){
		console.log(data)
		res.json({
			code:'0',
			msg:'',
			return:data
		})
	})
})

module.exports = router; 