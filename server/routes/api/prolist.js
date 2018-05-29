var express=require('express');

var router=express.Router();



var DB=require('../../modules/db.js');
//商品接口
router.get("/goods",function(req,res){
	
	DB.find('product',{},function(err,data){
		 res.json({
		 	  list:data
		 })
		 console.log(data)
	})
})



module.exports = router; 