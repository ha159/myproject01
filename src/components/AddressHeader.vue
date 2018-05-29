<template>
  <header class="header" style="">
    <a class="back c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
    <div class="h_label" style="color:#464646;">新增收货地址</div>
    <a href="javascript:void(0);" v-on:click="toggle()" class="menu" :class='show'></a>
    <nav class="t-nav" :class='showNav'>
		    <ul style="height: 45px;">
		        <li><a href="" class="home">首页</a></li>
		        <li><a href="" class="sousuo">搜索</a></li>
		        <li><a href="" class="category">分类</a></li>
		        <li><a href="" class="cart">购物车</a></li>
		        <li><a href="" class="user">我的当当</a></li>
		    </ul>
    </nav>
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
