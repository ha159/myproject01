<template>
	<div class="mine_mm" >
	<main class="mine_layout" >
	    <section class="mine_infos clearfix">
	        <div class="mmm_info">
	            <div class="user_icon">
	                <img src="../assets/img/my_icon.jpg" alt="">
	            </div>
	            <div class="user_detal">
	                <p class="user_name">{{username}}</p>
	                <div class="reg">
	                    <a href="#" class="reg_link">注册会员</a>
	                    <div class="vip">
	                    <span class="vip_icon">
	                        <img src="../assets/img/vip.png" alt="">
	                    </span>
	                        <a href="#">
	                                                                  立享PLUS特权 >
	                        </a>
	                    </div>
	                </div>
	            </div>
	            <div class="manage_account">
	            	<router-link to="/changePwd">
	                <span>
	                                                  修改密码 >
	                </span>
	                </router-link>
	            </div>
	        </div>
	        <div class="yguanzhu_box">
	            <ul class="gunzhuf">
	                <li class="item">
	                    <router-link to="/collections" class="item_link">
	                        <span style="height: 19px;display: inline-block;width: 30px;">{{collectionLen}}</span>
	                        <span>关注的商品</span>
	                    </router-link>
	                </li>
	                <li class="item">
	                    <a href="javascript:void(0)" class="item_link">
	                        <span style="height: 19px;display: inline-block;width: 30px;">0</span>
	                        <span>关注的店铺</span>
	                    </a>
	                </li>
	                <li class="item">
	                    <router-link to='/trace' class="item_link">
	                        <span style="height: 19px;display: inline-block;width: 30px;">{{traceLen}}</span>
	                        <span>浏览记录</span>
	                    </router-link>
	                </li>
	            </ul>
	        </div>
	    </section>
	    <section class="my_order_box">
	        <router-link to='/myorderlist' class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/img/my_order_icon.png" alt="">
	                <span>我的订单</span>
	            </div>
	            <div class="order_right">
	                <span>全部订单></span>
	            </div>
	        </router-link>
	        <div class="order_bottom_box">
	            <ul>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/img/waitpay.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">待付款</span>
	                    </a>
	                </li>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/img/wuliu.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">待收货</span>
	                    </a>
	                </li>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/img/tuihuan.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">退换/售后</span>
	                    </a>
	                </li>
	            </ul>
	        </div>
	    </section>
	    <section class="my_order_box" style="display: none;">
	        <!--<div class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/img/mypackage.png" alt="">
	                <span>我的钱包</span>
	            </div>
	            <div class="order_right">
	                <span>></span>
	            </div>
	        </div>-->
	        <div class="order_bottom_box">
	            <ul>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <span style="margin-top: -5px;display: block">0</span>
	                        <span class="order_item_pay">账户余额</span>
	                    </a>
	                </li>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <span style="margin-top: -6px;display: block">0</span>
	                        <span class="order_item_pay">优惠券</span>
	                    </a>
	                </li>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <span style="margin-top: -6px;display: block">0</span>
	                        <span class="order_item_pay">京豆</span>
	                    </a>
	                </li>
	                <li class="order_item">
	                    <a href="#" class="order_item_link">
	                        <span style="margin-top: -6px;display: block">0</span>
	                        <span class="order_item_pay">京东卡/E卡</span>
	                    </a>
	                </li>
	            </ul>
	        </div>
	    </section>
	    
	    <section class="my_order_box my_b_info">
	        <div class="order_top_box">
	        	<router-link to='/myaddress'>
		            <div class="order_left">
		                <img src="../assets/img/wd-012-05.png" alt="">
		                <span style="color:#333">收货地址</span>
		            </div>
		            <div class="order_right">
		                <span>></span>
		            </div>
	            </router-link>
	        </div>
	        <div class="order_top_box" style="display: none;">
	            <div class="order_left">
	                <img src="../assets/img/huo2.png" alt="">
	                <span>1元抢宝</span>
	            </div>
	            <div class="order_right">
	                <span>1元成就梦想></span>
	            </div>
	        </div>
	        <div class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/img/msg.jpg" alt="">
	                <router-link to='/message'><span style="color:#333">留言板</span></router-link>
	            </div>
	            <div class="order_right">
	                <span>></span>
	            </div>
	        </div>
	        <div class="order_top_box" @click='loginOut()'>
	            <div class="order_left" >
	                <img src="../assets/img/user_icon.png" alt="">
	                <span style="color:#999">退出登录</span>
	            </div>
	            <div class="order_right">
	                <span>></span>
	            </div>
	        </div>
	        
	    </section>
	</main>
	</div>
</template>
<script>
	import axios from 'axios';
	
	export default{
		data(){
			return{
				list:[],
				username:'',
				collectionLen:'',
				traceLen:''
			}
		},
		mounted(){
			this.getUserInfo();
		},
		methods:{
			
             getUserInfo(){
            	var _this=this;
            	axios.get('/api/users/userInfo')
				  .then(function (res) {
//				    console.log(res);
				    _this.list = res.data.list[0];
				    _this.username = _this.list.username;
				    _this.collectionLen = _this.list.collectionList.length;
				    _this.traceLen = _this.list.traceList.length
				    console.log(_this.list.traceList.length)
				  }).catch(function (res) {
				    console.log(res);
				  });
           },
           loginOut(){
        		 axios.post('/api/users/loginOut',{
        		 	  isLogin:'loginOut'
        		 })
        		 .then(function (res) {
				    window.sessionStorage.username = '';
//				    console.log(_this.username )
				  }).catch(function (res) {
				    console.log(res);
				  });
				   location.href="http://localhost:8080/#/";
        	}
		}
		}
</script>