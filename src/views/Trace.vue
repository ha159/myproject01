<template>
	<div class="home">
		<header class="header">
		    <a onclick="window.history.back();" class="back goback"><</a>
		    <div class="h_label">我的足迹</div>
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
		<section class="list">
		<div :class="tip">
     	
     	<p style="text-align: center;padding-top: 20px;color: #666;font-size: 14px;">这里是空的哦~</p>
     </div>
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
            					<p class="author">作者：{{item.author}}</p>                
            						
            					<!-- 新标签开始 --> 
            					<div class="new_label_wrap touch">         
            						<div class="lab">                     
            							<div class="label_common touch">{{item.type}}</div>                   
            						</div>                 
            					</div>        
            						
            					<!-- 新标签结束 -->                
            					<div class="price_con">                   
            						<i><b class="left">￥</b><b class="middle">{{item.price}}</b></i>                     
            						<i class="original" style="text-decoration: line-through;">￥{{item.fee}}</i>                       
            						                                                
            					</div>                 
            					<em>100.0%好评(30335人)</em>                
            				</div>      
            			</div>     
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	<em @click='delTrace(item._id)' style="position: absolute;right: 40px;top: 75px;z-index: 9999;"><img src="../assets/img/delete_down.png" style="width: 20px; height: auto;"></em> 
            	
            </div>
          
            
            
            
            
            
			</section>

	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/pro_list.css';
    import axios from 'axios';
     import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    
    export default{
        data(){
            return {
                list:[],
                show:'',
                showNav:'',
                tip:''
                
               
            }
        },
        mounted:function(){
            this.getTrace();
        },
        methods:{
            getTrace(){
            	var _this=this;
            	
//              console.log(traceid)
            	axios.get('/api/trace/getTrace').then(function (res) {
//				    console.log(res.data);
				    _this.list = res.data.list[0].traceList;
				    console.log(_this.list)
				    if(_this.list.length!=0){
				    	_this.tip='hidden'
				    }else{
				    	_this.tip='show'
				    }
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
				
//				_this.list.push(_this.list)
				
//				_this.list = _this.list.concat(_this.list);
//				console.log(_this.list)
            },
            delTrace(id){
            	var _this = this;
            	
            	axios.post('/api/trace/delTrace',{
            		id:id
            	}).then(function (res) {
            		console.log(res.data.code)
            		
            		Toast({
					  message: '删除成功!',
					  position: 'bottom',
					  duration: 2000
					});
					 _this.getTrace();
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
