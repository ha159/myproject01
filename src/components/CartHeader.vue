<template>
  <header class="header" style="">
    <a class="back c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
    <div class="h_label" style="color:#464646;">购物车</div>
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
</template>
<script>
    export default{
        data(){
            return {
            	
                
                show:'',
                showNav:''
            }
        },
        mounted(){
            
        },
        methods:{
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
