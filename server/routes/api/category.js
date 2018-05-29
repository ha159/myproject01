var express=require('express');

var router=express.Router();



var DB=require('../../modules/db.js');





//分类类别接口
router.get("/categoryNav",function(req,res){
	
	DB.find('category',{},function(err,data){
		 res.json({
		 	  list:data
		 })
	})
})
//分类商品查找
router.post('/search',function(req,res){
	var name = req.body.name;
	DB.find('product',{'type':name},function(err,data){
		res.json({
			list:data
		})
	})
})

router.post('/priceDown',function(req,res){
	var name = req.body.name;
	console.log(name)
	if(name.length<=0){
		DB.find2('product',{},function(err,data){
			res.json({
			list:data
		   })
		})
	}else{
		DB.find2('product',{'type':name},function(err,data){
//		console.log(data)
		res.json({
			list:data
		})
	})
	}
})
router.post('/priceUp',function(req,res){
	var name = req.body.name;
	if(name.length<=0){
		DB.find3('product',{},function(err,data){
			res.json({
			list:data
		   })
		})
	}else{
		DB.find3('product',{'type':name},function(err,data){
//		console.log(data)
		res.json({
			list:data
		})
	})
	}
})
module.exports = router; 