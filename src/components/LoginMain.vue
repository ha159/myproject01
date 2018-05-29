<template>
  <section class="content" style="min-height: 93.4033%;">
    <!-- 登录开始 -->
    <section class="page_lr main">
        <div class="inp user bg">
            <span class="icon"></span>
            <span class="input"><input id="username" name="username" type="text" placeholder="手机号/邮箱/昵称" v-model="username"></span>
            
        </div>
       
        <div class="inp pw bg">
            <span class="icon"></span>
            <span class="input"><input id="password" name="password" type="password" placeholder="密码" v-model="password"></span>
            
           
            
        </div>

		    <div class="pw_contain" style="display: none;">
	<div class="inp graphics short small bg"style="display: none;>
		<span class="input"><input class="identify_code" type="text" readonly="readonly" onfocus="this.blur();" placeholder="验证码"/></span>
		<span class="clear j_idf_clear" style="display: none;"></span>
	</div>
	
	
	<div class="identify_box j_identify_box">
		<div class="identify_textDiv_hidden j_identify_textDiv"></div>
	</div>
</div>
        <a class="btn" @click="goLogin()">登录</a>
					<dl class="func">
				<dt><a>没有账户</a></dt>
				<dd><router-link to="/reg">注册</router-link></dd>
			</dl>
		    </section>
	<section class="page_lr defend">为保障账户安全，请您不要设置与邮箱密码相同的账户登录密码，<a>谨防诈骗</a><span>！</span></section>
    <!-- 登录结束 -->
  </section> 
</template>
<script>
	 import axios from 'axios';
	 import { Toast } from 'mint-ui';
    export default{
		data(){
			return{
				username:'',
				password:'',
				userInfo:{}
			}
		},
		methods:{
			goLogin(){
				let _this = this;
				
				if(_this.username ==''){
					Toast({
					  message: '请输入账号!',
					  position: 'bottom',
					  duration: 3000
					});
				}else if(_this.password == ''){
					Toast({
					  message: '请输入密码!',
					  position: 'bottom',
					  duration: 3000
					});
				}else{
					axios.post('/api/users/login',{
						username:_this.username,
						password:_this.password,
					}).then((res)=>{
						console.log(_this.password);
					if(res.status == 200){
						_this.userInfo = res.data;
						console.log(res.data)
						if(_this.userInfo.code == 0){
							//LOGIN success
							Toast({
								  message: '登录成功!',
								  position: 'bottom',
								  duration: 3000
								});

 							  window.sessionStorage.username = _this.userInfo.username;
                	_this.$router.push({path:"/"});
                
//							console.log(_this.$store);
//							_this.$store.dispatch('setUserInfo', userInfo);
//                      let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
//                      _this.$router.push({
//                          path: redirect
//                      });
                  
							
						}else{
							Toast({
								  message: '用户名或密码错误!',
								  position: 'bottom',
								  duration: 3000
								});
						}
					}else{
						Toast({
					  message: '请求出现错误!',
					  position: 'bottom',
					  duration: 3000
					});
					}
						console.log(res);
					},(err)=>{
						console.log(err);
					});
				}
				
			}
		}
	}
</script>
   
</script>
