<template>
	<div class="addr">
		
          <header class="header" style="">
		    <a class="back c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
		    <div class="h_label" style="color:#464646;">我的地址簿</div>
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
           <div id="wrapper" style="">
           <div :class="tip">
     	
     	<p style="text-align: center;padding-top: 20px;color: #666;font-size: 14px;">这里是空的哦~</p>
     </div>
		<div id="scroller" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
    		<ul class="checkout_address" style="">
    		    <li class="icon_ld border_top border_bottom" addr-id="116556466" id="li-116556466" v-for='item in list'>
    				<div class="total">
    					<p class="content" do-action="select-addr" addr-id="">
    						<span class="bg">
    							<span class="name">收货人：{{item.ship_name}}</span>
    							<span class="tel">{{item.ship_mb}}</span>
    							<span class="detail">
    								<em></em>
    								<em>收货地址：{{item.ship_address}}</em>
    								
    								<!--<em>邮政编码：{{item.ship_postcode}}</em>-->
    							</span>
    						</span>
    					</p>
    					<dl>

    					
    						<dd>
                                <input style="padding-top: 26px;padding-left: 37px;" type="checkbox" class="fl c_checkbox" :checked="item.checked" @click='setDefault(item.id)'/>
    						          默认地址    						
    						</dd>
    						<dd class="ope_address">
    							<router-link :to="'/editaddress/'+item.id"><i>编辑</i></router-link>
    							<a @click='deladdress(item.id)' dd_name="地址簿删除地址" href="javascript:;" do-action="del-addr" addr-id="170841886"><i>删除</i></a>
    						</dd>
    					</dl>
    				</div>
    			</li>
				    			<li class="address_blank"></li>
    		</ul>
    	</div>
	</div>
       <router-link to='/address'  id="saveAddress" class="red_btn">增加新地址</router-link>
	</div>
</template>
 <script>
 	 import '../assets/css/common.css';
     import '../assets/css/address.css';
     import axios from 'axios';
     import { MessageBox } from 'mint-ui';
	
    export default{
        data(){
            return {
                list:[],
                checked:false,
                show:'',
                showNav:'',
                tip:''
                
            }
        },
        mounted(){
            this.getAddr();
        },
        methods:{
            getAddr(){
            	var _this = this;
            	axios.post('/api/cart/getAddr')
            	.then(function (res) {
				    console.log(res.data.list[0].addressList);
				    _this.list = res.data.list[0].addressList
				    if(_this.list.length!=0){
				    	_this.tip='hidden'
				    }else{
				    	_this.tip='show'
				    }
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
					  
            },
            deladdress(id){
            	var _this = this;
            	axios.post('/api/cart/deladdress',{
            		id:id
            	}).then(function (res) {
            		console.log(res)
            		if(res.data.code=="0"){
            			MessageBox.confirm('你确定要删除?').then(action => {
                           _this.getAddr();
                       });
            			
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
//          setDefault(addressId){
//          	var _this = this;
//          	axios.post('/api/cart/setDefault',{
//          		addressId:addressId
//          	}).then(function (res) {
//          		console.log(res)
//          		if(res.data.code=="0"){
//          			console.log('设置默认地址成功！')
//          		}
//          	}).catch(function (res) {
//				    console.log(res);
//				  });
//          }
            
        }
    }
   
</script>
