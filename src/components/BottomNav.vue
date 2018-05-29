<template>
	<section class="footer_nav clearfix" dd_name="吸底菜单">
            <router-link class="footer_nav_a" style="width:20%;" to="/" dd_name="图标1">
                <img class="footer_nav_icon1" src="../assets/img/150-98-bottom_icon-sy-1.png">
            </router-link>
            <router-link class="footer_nav_a" style="width:20%;" to="/category" dd_name="图标2">
                <img class="footer_nav_icon1" src="../assets/img/150-98-bottom_icon-fl-2.png">
            </router-link>
            <a @click='getUserInfo("cart")' class="footer_nav_a" style="width:20%;"  dd_name="图标3">
                <img class="footer_nav_icon1" src="../assets/img/150-98-bottom_icon-gwc-4.png">
            </a>
            <a @click='getUserInfo("trace")' class="footer_nav_a" style="width:20%;" to="/trace" dd_name="图标4">
                <img class="footer_nav_icon1" src="../assets/img/150-98-bottom_icon-zj-5.png">
            </a>
            <a @click='getUserInfo("mine")'  class="footer_nav_a" style="width:20%;" to="/mine" dd_name="图标5">
                <img class="footer_nav_icon1" src="../assets/img/150-98-bottom_icon-sd-3.png">
            </a>
            </section>
</template>
<script>
	import axios from 'axios';
	
    export default{
        data(){
            return {
                
            }
        },
        mounted(){
          },
        methods:{
            getUserInfo(flag){
            	var _this=this;
            	axios.get('/api/users/userInfo')
				  .then(function (res) {
				    console.log(res);
				    _this.list = res.data.list[0];
				    console.log(_this.list)
//				    _this.username = _this.list.username
//				    _this.collectionLen = _this.list.collectionList.length
                   if(flag=="cart"){
                   	   if(_this.list==undefined){
//          		 window.location.href = 'http://localhost:8080/#/login'
                	_this.$router.push({path:"/login"});
                  }else{
            		 _this.$router.push({path:"/cart"});
                  	 
                  }
                   }else if(flag=='mine'){
                   	 if(_this.list==undefined){
//          		 window.location.href = 'http://localhost:8080/#/login'
                	_this.$router.push({path:"/login"});
                  }else{
            		 _this.$router.push({path:"/mine"});
                  	 
                  }
                   }else{
            		 if(_this.list==undefined){
//          		 window.location.href = 'http://localhost:8080/#/login'
                	_this.$router.push({path:"/login"});
                    }else{
            		 _this.$router.push({path:"/trace"});
                  	 
                  }
                   	
                   }
				    console.log(_this.username )
				  }).catch(function (res) {
				    console.log(res);
				  });
           }
       
        }
    }
   
</script>
