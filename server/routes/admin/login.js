var express=require('express');
var router=express.Router();
//数据库操作
var DB=require('../../modules/db.js');

var md5=require('../../modules/md5.js');

router.get('/',function(req,res){
	res.render('admin/login');
});
router.post('/doLogin',function(req,res){
	var username=req.body.username;
    var password=req.body.password;  /*要对用户输入的密码加密*/
//  password = md5(md5(password).substr(4,7) + md5(password));
    
    //1.获取数据
    //2.连接数据库查询数据
    DB.find('user',{
        username:username,
        password:password
    },function(err,data){
        if(data.length>0){
            console.log('登录成功');
            //保存用户信息
            req.session.userinfo=data[0];

            res.redirect('/admin/index');  /*登录成功跳转到后台管理首页*/

        }else{
            //console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
        }
    })

});
//登出
router.get('/loginOut',function(req,res){
	req.session.destroy(function(err){
    	if(err){
    		console.log(err);
    	}else{
    		res.redirect('/admin/login')
    	}
    })
})

module.exports=router;