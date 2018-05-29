var express=require('express');

var router=express.Router();

var DB=require('../../modules/db.js');
var sd=require('silly-datetime');

//统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData = {
		code:0,		
		message:''
	}
	next();
})

//加入购物车接口
router.post("/addCart",function(req,res){
	username = req.body.username;
	id = req.body._id
	console.log(req.body._id)

	
		DB.find('product',{"_id":new DB.ObjectID(id)},function(err,data){
//			console.log(data)
			var cartList = data[0];
			console.log(cartList)
			
			
			DB.find('users',{username:username},function(err2,data2){
//				data2.push(cartList)
//				console.log(data2)
//				console.log(data2)
//				var cartList2=JSON.stringify(cartList);
				DB.update2('users',{username:username},{cartList:cartList},function(err3,data3){
//					console.log(data3.result.nModified)
					
				})
			})
		})
	
	responseData.code='0';
	responseData.message = '添加成功';
	res.json(responseData)	
	
})

//购物车显示接口
//router.get("/showCart",function(req,res){
////	username = req.body.username;
//	console.log(req.cookies)
//	var username = req.cookies.name;
//	DB.find('users',{username:username},function(err,data){
//		console.log(data[0].cartList)
//		if(err){
//			res.json({
//				status:'1',
//				msg:err.message,
//				result:''
//			})
//		}
//		res.json = ({
//			status:'0',
//			msg:'',
//			result:data
//		})
//		
//	})
////	responseData.code='0';
////	responseData.message = '添加成功';
////	res.json(responseData)	
//   
//})
router.get("/carts",function(req,res){
	var username = req.session.user
	DB.find('users',{username:username},function(err,data){
		 res.json({
		 	  list:data
		 })
		 console.log(data)
	})
})


//购物车商品删除接口
router.post("/delCartGoods",function(req,res){
	var id = req.body.id;
//	req.session.user=data[0].username;
    var uname = req.session.user
    console.log(uname)
    console.log(id)
    DB.updatePull('users',{'username':uname},{'cartList':{'_id':new DB.ObjectID(id)}},function(err,data){
    	
		console.log(data)
    })
    responseData.code='0';
	responseData.message = '删除成功';
	res.json(responseData)	
})
//购物车商品编辑接口
router.post('/editCart',function(req,res){
	var uname = req.session.user;
	var id = req.body.id;
	var productnum = req.body.productnum;
	var checked = req.body.checked;
	DB.update('users',{'username':uname,'cartList._id':new DB.ObjectID(id)},
	{'cartList.$.productnum':productnum,'cartList.$.checked':checked},function(err,data){
		if(err){
			
				responseData.code='1';
				responseData.message = '失败';
				res.json(responseData)	
			
		}else{
			responseData.code='0';
			responseData.message = '成功';
			res.json(responseData)
		}
	})
})
//购物车全选接口
router.post("/editCheckAll",function(req,res){
	var uname = req.session.user;
	var checkAll = req.body.checkAll?'true':'false';
	DB.find('users',{'username':uname},function(err,data){
//		console.log(data.cartList)
//		data[0].cartList.forEach((item)=>{
//			item.checked = checkAll;
//	
//		})
//		
//		console.log(data[0].cartList)
//		DB.update('users',{'username':uname},{'cartList':data[0].cartList},function(err,data){
//        if(err){
//        	console.log(err)
//        }
//	})
		for(var i=0;i<data[0].cartList.length;i++){
        	data[0].cartList[i].checked = checkAll;
        }
		DB.update('users',{'username':uname},{'cartList':data[0].cartList},function(err,data){
          console.log(data)
	})	
//DB.save('users',data[0].cartList)
		})
        
})

//添加收藏接口
router.post("/addCollection",function(req,res){
	username = req.session.user;
	id = req.body._id
	console.log(req.body._id)
    console.log(username)
	
		DB.find('product',{"_id":new DB.ObjectID(id)},function(err,data){
//			console.log(data)
			var collectionList = data[0];
			console.log(collectionList)
			
			
			DB.find('users',{username:username},function(err2,data2){
//				
				DB.update2('users',{username:username},{collectionList:collectionList},function(err3,data3){				
					
				})
			})
		})
	
	responseData.code='0';
	responseData.message = '添加成功';
	res.json(responseData)	
	
})

router.get("/collections",function(req,res){
	var username = req.session.user
	console.log(username)
	DB.find('users',{username:username},function(err,data){
		 res.json({
		 	  list:data
		 })
		 console.log(data)
	})
})

//收藏商品删除接口
router.post("/delCollection",function(req,res){
	var id = req.body.id;
//	req.session.user=data[0].username;
    var uname = req.session.user
    console.log(uname)
    console.log(id)
    DB.updatePull('users',{'username':uname},{'collectionList':{'_id':new DB.ObjectID(id)}},function(err,data){
    	
		console.log(data)
    })
    responseData.code='0';
	responseData.message = '删除成功';
	res.json(responseData)	
})

//收货地址
router.post("/addAddress",function(req,res){
    var id = new Date().getTime();
	var ship_name = req.body.ship_name;
	var ship_mb = req.body.ship_mb;
	var ship_address = req.body.ship_address;
	var ship_postcode = req.body.ship_postcode;	
	var uname = req.session.user;
	var checked = 'false';
	addrData = {
		id,
		ship_name,
		ship_mb,
		ship_address,
		ship_postcode,
		checked
	}
//	var addrData = JSON.parse( addrData);
    DB.find('users',{username:uname},function(err2,data2){
				
		DB.update2('users',{username:uname},{addressList:addrData},function(err3,data3){				
			responseData.code='0';
			responseData.message = '添加成功';
			res.json(responseData)	
		})
	})
	
})

//获取收货地址数据
router.post('/getAddr',function(req,res){
	var uname = req.session.user;
	DB.find('users',{username:uname},function(err,data){
	 	if(err){
	 		console.log(err)
	 	}else{
	 		res.json({
	 			list:data
	 		})
	 	}
	})
})
//删除地址
router.post("/deladdress",function(req,res){
	var id = req.body.id;
//	req.session.user=data[0].username;
    var uname = req.session.user
    console.log(uname)
    console.log(id)
    DB.updatePull('users',{'username':uname},{'addressList':{'id':id}},function(err,data){
    	
		console.log(data)
    })
    responseData.code='0';
	responseData.message = '删除成功';
	res.json(responseData)	
})
//修改地址
router.post('/updateAddress',function(req,res){
	var id = Number(req.body.id)
	var ship_name = req.body.ship_name;
	var ship_mb = req.body.ship_mb;
	var ship_address = req.body.ship_address;
	var ship_postcode = req.body.ship_postcode;	
	var uname = req.session.user;
	var checked = 'false';
	
	console.log()
	addrData = {
		id,
		ship_name,
		ship_mb,
		ship_address,
		ship_postcode,
		checked
	}
	 DB.updatePull('users',{"username":uname},{'addressList':{'id':id}},function(err2,data2){
	    	console.log(data2)
	    })
//	var addrData = JSON.parse( addrData);
    DB.find('users',{username:uname},function(err1,data1){
	    
		DB.update2('users',{"username":uname},{addressList:addrData},function(err3,data3){				
			responseData.code='0';
			responseData.message = '添加成功';
			res.json(responseData)	
		})
	})
   
})
////设置默认地址
//router.post('/setDefault',function(req,res){
//	var uname = req.session.user;
//	var addressId = Number(req.body.id);
//	
//	DB.update('users',{'addressList.id':addressId},{'addressList.$.checked':true},function(err,data){
//		console.log(data)
//	});
//})

//订单
router.post('/getOrder',function(req,res){
	var uname = req.session.user;
	var orderData=[];
	var orderId=new Date().getTime();

    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm');
	
	
	DB.find('users',{username:uname},function(err,data){
		console.log(data[0].cartList.length)
		var addrData=data[0].addressList[0];
		for(let i=0;i<data[0].cartList.length;i++){
			let j=i;
			if(data[0].cartList[i].checked){
				data2=data[0].cartList[j];
				orderData.push(data2)
			
				
			}
		}
//		orderData.push(addrData);
		var Alldata={
			orderId,
			uname,
			time,
			orderData,
			addrData
		}
		
		console.log(orderData)
		DB.insert('order',{orderList:Alldata},function(err3,data3){				
					
				})
 	
	})
})
router.post('/getOrderList',function(req,res){
	var uname = req.session.user;
	DB.find('users',{username:uname},function(err,data){
//		console.log(data[0].cartList.length)
		if(err){
	 		console.log(err)
	 	}else{
	 		res.json({
	 			list:data
	 		})
	 	}
 	
	})
})

router.post('/getMyOrder',function(req,res){
	var uname = req.session.user;
	DB.find('order',{},function(err,data){
		if(err){
	 		console.log(err)
	 	}else{
	 		res.json({
	 			list:data
	 		})
	 	}
	})
})


module.exports = router; 