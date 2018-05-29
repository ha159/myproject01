<template>
	<div class="home">
		<div class='order_main'>
		    <header class="header">
		    <a onclick="window.history.back();" class="back goback"><</a>
		    <div class="h_label">我的订单</div>
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
		<nav class="ol_select_bar">
		    <ul>
		        <li><a href="" class="hover">全部</a></li>
		        <li><a href="" class="">待付款</a></li>
		        <li><a href="" class="">待收货</a></li>
		        <li><a href="" class="">待评价</a></li>
		    </ul>
		</nav>
		<section class="list">
		    
            <div class="product" v-for='item in list'> 
            	<router-link href="" class="ablock" :to="'/detail/'+item._id">     
            		<!-- 图片开始 -->  
            		<img :src="item.pic" class="">     
            		<!-- 商品图片结束 -->       
            			
            		<!-- 详情开始 -->     
            		<div class="detail"> 
            			<div class="table">       
            				<div class="cell">        
            					<p class="name">{{item.title}}</p>                 
            					<p class="author">{{item.author}}</p>                
            						
            					<!-- 新标签开始 --> 
            					<div class="new_label_wrap touch">         
            						<div class="lab">                     
            							<div class="label_common touch">当当自营</div>                   
            						</div>                 
            					</div>        
            						
            					<!-- 新标签结束 -->                
            					<div class="price_con">                   
            						<i><b class="left">￥</b><b class="middle">{{item.price}}</b></i>                     
            						<i class="original">邮费：￥{{item.fee}}</i>                       
            						                                                
            					</div>                 
            					
            					
            				</div>      
            			</div>
            			
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	<em @click='delCollection(item._id)' style="position: absolute;right: 40px;top: 75px;z-index: 9999;"><img src="../assets/img/delete_down.png" style="width: 20px; height: auto;"></em> 
            </div>
          
            
            
            
            
            
			</section>
		</div>
         
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
                show:'',
                showNav:''
                
               
            }
        },
        mounted:function(){
            this.getCollections();
        },
        methods:{
             getCollections(){
            	var _this=this;
            	axios.get('/api/cart/collections')
				  .then(function (res) {
//				    console.log(res);
				    _this.list = res.data.list[0].collectionList;
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
             delCollection(id){
            	var _this = this;
            	axios.post('/api/cart/delCollection',{
            		id:id
            	}).then(function (res) {
            		console.log(res)
            		if(res.data.code=="0"){
            			MessageBox.confirm('你确定要删除?').then(action => {
                           _this.getCollections();
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
            
        }
    }
   
    
</script>
