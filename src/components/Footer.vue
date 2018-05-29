<template>
  <div class="foots">
			
            <footer class="footer new">
    <section class="status-bar">
        <div class="actions-wrap" v-show='show1'>
            <router-link to="/login">登录</router-link>
            <router-link to="/reg">注册</router-link>
        </div>
        <div class="user" v-show='show2'>
        	  <span id="uname">{{username}}</span><span @click='loginOut()'>退出</span>
        </div>
        <a class="top" href="javascript:scrollTo(0,0);">TOP</a>
    </section>
    
    <section class="copyright">
        <p>Copyright ©2017 广州某某网信息技术有限公司</p>
		<!--<p>北京市朝阳区北三环东路8号，100028</p>-->
    </section>
</footer>
		</div>
</template>
<script>
    import axios from 'axios';
	
    export default{
        data(){
            return {
                 username:'',
                 show1:true,
                 show2:false
            }
        },
        mounted(){
            this.getUserInfo();
            
        },
        methods:{
//      	getUserInfo(){
//          	var _this=this;
//        	    _this.username=window.sessionStorage.getItem("username")
////              console.log(document.cookies)
//              console.log(_this.username)
//              
//              
//         },
           getUserInfo(){
            	var _this=this;
            	axios.get('/api/users/userInfo')
				  .then(function (res) {
//				    console.log(res);
				    _this.list = res.data.list[0];
				    _this.username = _this.list.username
//				    _this.collectionLen = _this.list.collectionList.length
            if(_this.username.length>0){
                	_this.show1=false,
                  _this.show2=true
                }
				    console.log(_this.username )
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
				   location.reload();
        	}
            
        }
    }
   
</script>
<style type="text/css">
	#uname{padding: 0 20px;}
	.user{float: left;}
</style>