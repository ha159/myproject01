<template>
   <!-- 登录开始 -->
    <section class="page_lr main">
        <div class="inp user bg">
            <span class="icon"></span>
            <span class="input"><input id="regname" name="regname" type="text" v-model="regname" placeholder="手机号/邮箱/昵称"></span>
           
        </div>
       
        <div class="inp pw bg">
            <span class="icon"></span>
            <span class="input"><input id="password" name="regpasswd" type="password" v-model="regpasswd" placeholder="密码"></span>
            <span class="change"></span>
            <span class="clear clear_mgr10" style="display: none;"></span>
        </div>
        
        <div class="inp pw bg">
            <span class="icon"></span>
            <span class="input"><input id="regpasswd_ag" name="regpasswd_ag" type="password" v-model="regpasswd_ag" placeholder="确认密码"></span>
            <span class="change"></span>
            <span class="clear clear_mgr10" style="display: none;"></span>
        </div>
         <div style='font-size: 12px;color: #666;padding-left: 10px;'>*密码不能少于6个字符</div>
        
		    <div class="pw_contain" style="display: none;">
	<div class="inp graphics short small bg"style="display: none;>
		<span class="input"><input class="identify_code" type="text" readonly="readonly" onfocus="this.blur();" placeholder="验证码"></span>
		<span class="clear j_idf_clear" style="display: none;"></span>
	</div>
	
	
	<div class="identify_box j_identify_box">
		<div class="identify_textDiv_hidden j_identify_textDiv"></div>
	</div>
</div>
        <a @click="goSearch()" class="btn">注册</a>
					<dl class="func">
				<dt><a >已有账号</a></dt>
				<dd><router-link to="/login">登录</router-link></dd>
			</dl>
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
				regpasswd_ag:'',
				regInfo:{},
				regname:'',
				regpasswd:'',
				regpasswd_ag:''
				
			}
		},
		methods:{
			goSearch(){
				let _this = this;
				if(_this.regname ==''){
					Toast({
					  message: '请输入账号!',
					  position: 'bottom',
					  duration: 3000
					});
				}else if(_this.regpasswd == '' || _this.regpasswd_ag == ''){
					Toast({
					  message: '请输入密码!',
					  position: 'bottom',
					  duration: 3000
					});
				}else if(_this.regpasswd.length<6){
					Toast({
					  message: '密码至少6个字符!',
					  position: 'bottom',
					  duration: 3000
					});
				}else if(_this.regpasswd!==_this.regpasswd_ag){
					Toast({
					  message: '两次输入的密码不一致!',
					  position: 'bottom',
					  duration: 3000
					});
				}else{
					axios.post('/api/users/reg',{
						username:_this.regname,
						password:_this.regpasswd
				}).then((res)=>{
					if(res.status == 200){
						_this.regInfo = res.data;
						console.log(_this.regInfo.message)
						var msg = _this.regInfo.message
						if(_this.regInfo.code == 0){
							//reg success, go to this login page
//							window.history.go(-1);
                            Toast({
							  message: '注册成功!',
							  position: 'bottom',
							  duration: 3000
							});
							window.location.href = 'http://localhost:8080/#/login'
						}else{
							Toast({
							  message: '该用户名已经存在!',
							  position: 'bottom',
							  duration: 3000
							});
						}
					}else{
						Toast({
							  message: '出现错误!',
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
