<template>
	<div class="addr">
		<header class="header" style="">
		    <a class="back c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
		    <div class="h_label" style="color:#464646;">修改密码</div>
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
          <div id="address">
    	<div class="address_edit">
        
                <div class="single_line border_top">
					<span class="t_span error_option" >原始密码：</span>
					<input  type="password"  v-model="oldPwd"  placeholder="原始密码" class="normal_in">
				</div>
				<div class="single_line border_top">
					<span class="t_span error_option" >新的密码：</span>
					<input type="password"  v-model="newPwd"  value="" placeholder="新的密码" class="normal_in">
				</div>
				<div class="single_line border_top">
					<span class="t_span error_option" id="ship_tel_option">确认密码：</span>
					<input name="ship_tel" type="password" v-model="qrPwd"  id="ship_tel" value="" placeholder="确认密码" class="normal_in">
				</div>
				<div class="single_line border_top" style="margin-top: 30px;text-align: center;" >
					<a @click='sendPwd()' style="background: #fff;font-size: 16px;width: 100%;height: 46px;display: block;z-index: 999;">提交</a>
				</div>
         
			
    </div> 
     </div>  
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/address.css';
	import axios from 'axios';
	import { Toast } from 'mint-ui';
    
   export default{
        data(){
            return {
                oldPwd:'',
                newPwd:'',
                qrPwd:'',
                 show:'',
                showNav:''
                
            }
        },
        mounted(){
            
        },
        methods:{
            sendPwd(){
            	var _this = this;
            	if(_this.oldPwd ==''){
					Toast({
					  message: '请输入原始密码!',
					  position: 'bottom',
					  duration: 3000
					});
				}else if(_this.newPwd == ''){
					Toast({
					  message: '请输入新密码!',
					  position: 'bottom',
					  duration: 3000
					});
				}else if(_this.newPwd!==_this.qrPwd){
					Toast({
					  message: '两次输入的密码不一致!',
					  position: 'bottom',
					  duration: 3000
					});
				}else{
            	axios.post('/api/users/changePwd',{
            		oldPwd:_this.oldPwd,
            		newPwd:_this.newPwd
            	}).then(function (res) {
			        console.log(res)
			        if(res.data.code=='1'){
			        	Toast({
						  message: '原始密码不正确!',
						  position: 'bottom',
						  duration: 3000
						});
			        }else if(res.data.code=='0'){
			        	Toast({
						  message: '密码修改成功!',
						  position: 'bottom',
						  duration: 3000
						});
//						window.sessionStorage.username = '';
//					_this.loginOut();
//              	_this.$router.push({path:"/login"});
						axios.post('/api/users/loginOut',{
        		 	  isLogin:'loginOut'
        		 	 }).then(function (res) {
						    window.sessionStorage.username = '';
		//				    console.log(_this.username )
						  }).catch(function (res) {
						    console.log(res);
						    
						  });
						  _this.$router.push({path:"/login"});
					        }
						  }).catch(function (res) {
						    console.log(res);
						  });
                 }
//				_this.$router.push({path:"/login"});
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
