<template>
	<div class="goods_detail">
		<header class="header" style="">
		    <a class="back c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
		    <div class="h_label" style="color:#464646;">商品详情</div>
		    <a href="javascript:void(0);" v-on:click="toggle()" class="menu" :class='show'></a>
		    <nav class="t-nav" :class='showNav'>
				    <ul style="height: 45px;">
				        <li><router-link to='/' class="home">首页</router-link></li>
				        <li><router-link to='/search' class="sousuo">搜索</router-link></li>
				        <li><router-link to='/category'  href="" class="category">分类</router-link></li>
				        <li><router-link to='/cart'  href="" class="cart">购物车</router-link></li>
				        <li><router-link to='/mine'  href="" class="user">个人中心</router-link></li>
				    </ul>
		    </nav>
		    
		  </header>
        <main class="detail_box">
            <section class="banner_box">
                <ul class="banner_child_box">
                    <li class="banner_item" >
                       
                        <img :src="list.pic"/>
                    </li>
                
                </ul>
                

            </section>
            <section class="product_info clearfix">
                <div class="product_left">
                    <p class="p_name">{{list.title}}</p>
                    <div class="product_pric">
                        <span>￥</span>
                        <span class="rel_price">{{list.price}}</span>
                        <span></span>
                    </div>
                    <div class="product_right label_common">
                        {{list.type}}
                    </div>
                </div>

            </section>
            <section class="product_intro">
                <p class="pro_det">
                    {{list.description}}                            
                </p>
           </section>
          
        </main>
       
        <section class="shopping_cart">
    
  		  	<div class="btn_fav_cart" style="width:42%;">
			<a href="javascript:void(0)" class="shop_tab" dd_name="店铺入口" style="width:33%;min-width:initial;display: none;">
		  		<span>店铺入口<i></i></span>
		      <p class="shop_name">店铺</p>
		  	</a>
		    <div @click='addCollection(list._id)' class="fav" style="width:51%;">
		        <a :class="acl"  dd_name="收藏商品">收藏</a>
		    </div>
		    <a @click='goCart()' class="cart" dd_name="查看购物车" style="width:33%;min-width:initial;">

		  		<span>购物车</span>
		    	<i class="cartNum">{{cartLen}}</i>
		  		
		      <p class="cart_name">购物车</p>
		  	</a>
		</div>
		<div class="btn_con" style="width:58%;"><button @click='goBuy()' class="buy J_buy" dd_name="直接购买">立即购买</button><button @click='addCart(list._id)' class="add" dd_name="加入购物车">加入购物车</button></div>
  	
</section>
	</div>
</template>
<script>
   import axios from 'axios';
   import { Toast } from 'mint-ui';
   export default{
   	
   	data(){
            return {
                list:[],
                list2:[],
                id:this.$route.params.id,
                username:'',
                uname:'',
                acl:'hidden',
                cartLen:'',
                addressLen:'',
                show:'',
                showNav:'',
               
                
            }
        },
        mounted:function(){
//         
            this.getUserInfo()
            this.getGoodsList();
        },
        
        methods:{
            getGoodsList(){
            	var _this=this;
            	axios.get('/api/index/goods',{
            		params:{
            			_id:_this.id
            		}
            	}).then(function (res) {
				    console.log(res.data.list);
//				    _this.list=res
				    console.log(_this.id)
				    var len = res.data.list.length;
				    for(var i=0;i<len;i++){
				    	var j=i;
				    	if(res.data.list[i]._id==_this.id){
				    		_this.list=res.data.list[j]
				    	}
				    }
				    
				    
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
			  
//			  document.cookie="traceid="+_this.id;
             
			  
			  
            },
            addCart(id){
            	var _this=this;
            	_this.username=window.sessionStorage.getItem("username")
            	console.log(_this.username)
            	if(_this.username==''){
                	_this.$router.push({path:"/login"});
            		return;
            	}else{
            		axios.post('/api/cart/addCart',{
            		
            			_id:id,
            			username:_this.username
            		
            	}).then(function(res){
            		console.log(res)
            		if(res.status == 200){           		            		 
            		   if(_this.username!=null){
            		   	   Toast({
							  message: '添加成功!',
							  position: 'bottom',
							  duration: 3000
							});
                      	_this.$router.push({path:"/cart"});
            		   }else{
                	_this.$router.push({path:"/login"});
            		   	
            		   }
					}
            	})
            	}
            },
            addCollection(id){
            	var _this=this;
            	_this.username=window.sessionStorage.getItem("username")
            	console.log(_this.username)
            	if(_this.username<=0){
                	_this.$router.push({path:"/login"});
            		return;
            	}else{
            		axios.post('/api/cart/addCollection',{
            		    
            			_id:_this.id,
//          			username:_this.username
            		
            	}).then(function(res){
//          		console.log(res)
            		if(res.status == 200){
            			_this.showAcl();
            		   if(_this.username.length!=''){
            		   	   Toast({
							  message: '收藏成功!',
							  position: 'bottom',
							  duration: 3000
							});
							
            		   }
					}
            	})
            	}
            },
            goCart(){
            	var _this=this;
            	_this.username=window.sessionStorage.getItem("username")
            	console.log(_this.username)
            	if(_this.username.length<=0){
                	_this.$router.push({path:"/login"});
            		return;
            	}else{
                	_this.$router.push({path:"/cart"});
            		
            	}
            },
            goBuy(){
            	var _this=this;
            	_this.username=window.sessionStorage.getItem("username")
            	console.log(_this.username.length)
            	if(_this.username.length<=0){
                	_this.$router.push({path:"/login"});
            		return;
            	}else if(_this.addressLen<=0){
                	_this.$router.push({path:"/address"});
            		
            	}else{
            		_this.$router.push({path:"/myaddress"});
            	}
            },
            showAcl(){
            	var _this = this;
            	_this.acl = 'show'
            },
            getUserInfo(){
            	var _this=this;
            	axios.get('/api/users/userInfo')
				  .then(function (res) {
				    console.log(res);
				    _this.list2 = res.data.list[0];
				    _this.username = _this.list2.username;
				    _this.cartLen = _this.list2.cartList.length;
				    _this.addressLen = _this.list2.addressList.length;
				    
				    console.log( _this.addressLen)
				  }).catch(function (res) {
				    console.log(res);
				  });
            },
            toggle:function(){ 
             	var _this = this;
            
             	if(_this.show==''){
             		_this.show='active';
             		_this.showNav='active';
             	}else{
             		_this.show='';
             		_this.showNav='';
             	}
             		
             	
             }
        
        
        
        
        }
         
         
    
   }
</script>
<style>
@import '../assets/css/detail.css';
</style>