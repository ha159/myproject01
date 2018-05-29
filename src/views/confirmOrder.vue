<template>
	<div class="home">
		<div class='order_main' style="padding-bottom: 45px;">
		    <header class="header" style="margin-bottom: 0;">
		    <a onclick="window.history.back();" class="back goback"><</a>
		    <div class="h_label">确认订单</div>
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
		<section>
		    <router-link to='myaddress'>
		    <ul class="checkout_address" style="padding-bottom:2px;">
    		    <li class="icon_ld border_top border_bottom" >
    				<div class="total">
    					<p class="content">
    						<span class="bg">
    							<span class="name" style="font-size: 15px;">收货人：{{name}}</span>
    							<span class="tel" style="font-size: 15px;margin-right: 2.5em;">{{mb}}</span>
    							<span class="detail">
    								<em></em>
    								<em style="padding: 4px 0;">收货地址：{{address}}
    									<span style="float: right;font-size: 20px;position: absolute;right: 10px;top: 20px;">></span>
    								</em>
    								
    								<!--<em>邮政编码：{{postcode}}</em>-->
    							</span>
    						</span>
    					</p>
    					
    				</div>
    			</li>
				    			
    		</ul>
    		</router-link>
		</section>
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
            						<i><b class="left">￥</b><b class="middle">{{item.price}}.00</b></i>                     
            						<i class="original" style="text-decoration: line-through;">￥{{item.fee}}</i>                       
            						                                                
            					</div>                 
            					
            					
            				</div>      
            			</div>
            			
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	<span style="position: absolute;right: 40px;top:80px;color:#666;font-size: 14px;font-style: normal;">x&nbsp{{item.productnum}}</span> 
            </div>
          
            
            
            
            
            
			</section>
		</div>
         <footer class="total_result">
               <div class="fr">
               <router-link to="myOrder" class="c_btn payBtn" id="do_checkout" style="font-size: 18px;">提交订单</router-link>
               </div> <div class="fr totalPrice" style="padding: 0.6rem 1rem .75rem 0;"><span>合计</span> <span id="cart_price">￥{{prices}}</span> <p></p>
               </div>
         </footer>
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
