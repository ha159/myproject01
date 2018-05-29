
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB=require('../../modules/db.js');  /*引入DB数据库*/

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var fs=require('fs');
var sd=require('silly-datetime');

router.get('/',function(req,res){
	
    DB.find('banner',{},function(err,data){
        
        res.render('admin/banner/index',{
            list:data
        });
    })

})
//商品添加显示
router.get('/add',function(req,res){
	
	 //从数据库中读取分类名称
	 DB.find('banner',{},function(err,data){
	 	res.render('admin/banner/add',{
	 		list:data
	 		
	 	});
	 	console.log(data)
	 })
	 
     

})
//doAdd
router.post('/doAdd',function(req,res){
    //获取表单的数据 以及post过来的图片
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
    
    var form = new multiparty.Form();
    
    var productid=Number(new Date().getTime());
    form.uploadDir='upload'   //上传图片保存的地址     目录必须存在
    console.log(form)
    form.parse(req, function(err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息
        //
        console.log(fields);  /*获取表单的数据*/
        //
        //console.log(files);  /*图片上传成功返回的信息*/
        
        var pic2='http://localhost:3003/'+files.pic2[0].path+'';
        var urlname = fields.urlname[0];
        
        //console.log(pic);

        DB.insert('banner',{
            
            pic2,
            productid,
            urlname:urlname,
            time:time
           

        },function(err,data){
            if(!err){
                res.redirect('/admin/banner'); /*上传成功跳转到首页*/
            }

        })
    });

})



router.get('/delete',function(req,res){
    //获取id

    var  id=req.query.id;
    
     
        DB.deleteOne('banner',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/banner');
        }

    })
 
    

    

})

module.exports = router;   /*暴露这个 router模块*/