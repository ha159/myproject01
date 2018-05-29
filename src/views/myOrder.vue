<template>
	<div class="home">
		<div class='order_main' style="padding-bottom: 45px;">
		    <header class="header" style="margin-bottom: 0;">
		    <a onclick="window.history.back();" class="back goback"><</a>
		    <div class="h_label">我的订单</div>
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
		
		<section class="list" style="padding-bottom: 50px;">
		    
            <div class="product" v-for='item in list' v-if='item.checked=="1"||item.checked=="true"'> 
            	<router-link href="" class="ablock" :to="'/detail/'+item._id">     
            		<!-- 图片开始 -->  
            		<img :src="item.pic" class="">     
            		<!-- 商品图片结束 -->       
            			
            		<!-- 详情开始 -->     
            		<div class="detail"> 
            			<div class="table">       
            				<div class="cell">        
            					<p class="name">{{item.title}}</p>                 
            					<p class="author">作者：{{item.author}}</p>                
            						
            					<!-- 新标签开始 --> 
            					<div class="new_label_wrap touch">         
            						<div class="lab">                     
            							<div class="label_common touch">{{item.type}}</div>                   
            						</div>                 
            					</div>        
            						
            					<!-- 新标签结束 -->                
            					<div class="price_con">                   
            						<i><b class="left">￥</b><b class="middle">{{item.price}}</b></i>                     
            						<i class="original" style="text-decoration: line-through;">￥{{item.fee}}</i>                       
            						                                                
            					</div>                 
            					
            					
            				</div>      
            			</div>
            			
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	<span style="position: absolute;right: 40px;top:80px;color:#666;font-size: 14px;font-style: normal;">x&nbsp{{item.productnum}}</span>
            	<div style="display: none;border-top:1px solid #ccc;margin-left: -5px;margin-top: 5px;padding: 4px;padding-bottom: 5px;overflow: hidden;" >
            		<span style="padding: 2px 4px;border: 1px solid #666;border-radius: 6px;display: inline-block;font-size: 14px;float: right;margin-right: 7px;">确认收货</span>
            		<router-link to='/message' style="padding: 2px 4px;border: 1px solid #666;border-radius: 6px;display: inline-block;font-size: 14px;float: right;margin-right: 7px;">去评论</router-link>
            		
            	    
            	</div>
            </div>
          
            
            
            
            
            
			</section>
			
		</div>
         <router-link to='/message' class="red_btn">去吐槽一下</router-link>
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/pro_list.css';
    import axios from 'axios';
     import { MessageBox } from 'mint-ui';
    export default{
        data(){
            return {
                list:[],
                name:'',
                mb:'',
                address:'',
                postcode:'',
                show:'',
                showNav:'',
                prices:''
                
            }
        },
        mounted:function(){
            this.getorderList()
            this.getOrder()
        },
        methods:{
             getorderList(){
            	var _this=this;
            	_this.prices=window.sessionStorage.getItem("prices")
            	axios.post('/api/cart/getOrderList')
				  .then(function (res) {
				    console.log(res);
//				   
                    _this.list = res.data.list[0].cartList;
				    console.log(res.data.list[0].addressList[0].ship_mb)
				    _this.name = res.data.list[0].addressList[0].ship_name;
				   
				    _this.mb = res.data.list[0].addressList[0].ship_mb;
				    _this.address = res.data.list[0].addressList[0].ship_address;
				    _this.postcode = res.data.list[0].addressList[0].ship_postcode;
				    
				    console.log(_this.list )
				    if(_this.list.length!=0){
				    	_this.tip='hidden'
				    }else{
				    	_this.tip='show'
				    }
				  }).catch(function (res) {
				    console.log(res);
				  });
           },
           getOrder(){
           	  var _this=this;
            	axios.post('/api/cart/getOrder')
				  .then(function (res) {
				    console.log(res);
//				   
                   
				    
				    
				    if(_this.list.length!=0){
				    	_this.tip='hidden'
				    }else{
				    	_this.tip='show'
				    }
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
