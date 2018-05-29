var express=require('express');

var router=express.Router();



var DB=require('../../modules/db.js');
//商品接口
router.post("/getSearchGoods",function(req,res){
	console.log(req.body)
	var kw = String(req.body.kw);

	console.log(typeof(kw))
	DB.find('product',{"title":new RegExp("^.*"+kw+".*$")},function(err,data){
		 res.json({
		 	  list:data
		 })
		 console.log(data)
	})
})



module.exports = router; 