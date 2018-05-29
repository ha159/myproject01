<template>
	<div class="home">
		<div class="category_main">
			<header class="header">
		    <a onclick="window.history.back();" class="back goback"><</a>
		    <div class="h_label">图书分类</div>
			<a href="javascript:void(0);" v-on:click="toggle()" class="menu" :class='show'></a>
		    <div class="t-nav" :class='showNav'>
				    <ul style="height: 45px;">
				        <li><router-link to='/' class="home">首页</router-link></li>
				        <li><router-link to='/search' class="sousuo">搜索</router-link></li>
				        <li><router-link to='/category'  href="" class="category">分类</router-link></li>
				        <li><router-link to='/cart'  href="" class="cart">购物车</router-link></li>
				        <li><router-link to='/mine'  href="" class="user">个人中心</router-link></li>
				    </ul>
		    </div>
			
		</header>
		<section class="category">
		   <ul>
		       <li :class="flag" @click='getGoodsList()'>全部</li>
		   	   <li  v-for="item in list" :class="{active: activeName == item}"  @click="selected(item)">
		   	        <a @click='goSearch(item.name)'>
	                	{{item.name}}
	                </a>
		   	   </li>
		   	   
		   </ul>
	</section>
	 <section id="nav" :class="nav" dd_name="排序区">   
				<ul>    
					<li>
						<a @click='getGoodsList()' href="javascript:void(0);" data-status="default_0" :class="fl" dd_name="默认">默认</a>
					</li>    
					
					<li>
						<a href="javascript:void(0);" data-status="price_" data-up="0" data-down="1" >价格：</a>
						
					</li>    
					<li>
						<a @click='priceUp()' :class="up" href="javascript:void(0);" data-status="score_1" dd_name="好评">升序↑</a>
					</li>    
					<li>
						<a @click='priceDown()' :class="down" href="javascript:void(0);" data-status="score_1" dd_name="好评">降序↓</a>
					</li>
				</ul>  
			</section>
		<section class="list">
		    
            <div class="product" v-for='item in alist'> 
            	<router-link href="" class="ablock" :to="'/detail/'+item._id">     
            		<!-- 图片开始 -->  
            		<img :src="item.pic" class="">     
            		<!-- 商品图片结束 -->       
            			
            		<!-- 详情开始 -->     
            		<div class="detail"> 
            			<div class="table">       
            				<div class="cell">        
            					<p class="name" style="font-size: 0.6rem;">{{item.title}}</p>                 
            					<p class="author" style="font-size: 0.5rem;">{{item.author}}</p>                
            						
            					<!-- 新标签开始 --> 
            					<div class="new_label_wrap touch">         
            						<div class="lab">                     
            							<div class="label_common touch">{{item.type}}</div>                   
            						</div>                 
            					</div>        
            						
            					<!-- 新标签结束 -->                
            					<div class="price_con">                   
            						<i><b class="left">￥</b><b class="middle">{{item.price}}</b></i>                     
            						<i class="original" style="text-decoration: line-through;">原价：￥{{item.fee}}</i>                       
            						                                                
            					</div>                 
            					
            					
            				</div>      
            			</div>
            			
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	<!--<em @click='delCollection(item._id)' style="position: absolute;right: 40px;top: 75px;z-index: 9999;"><img src="../assets/img/delete_down.png" style="width: 25px; height: auto;"></em>--> 
            </div>
           
			</section>
		</div>
         
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/pro_list.css';
    import {stickTop} from '../assets/js/prolist.js'
    import axios from 'axios';
    import { MessageBox } from 'mint-ui';

	export default{
		data(){
			return{
				list:[],
				alist:[],
				activeName: '',
				flag:'active',
				fl:'on',
				up:'',
				down:'',
				show:'',
                showNav:'',
                nav:''
			}
		},
		 mounted:function(){
	            this.leftDatasList();
	            this.getGoodsList();
	            stickTop();
	        },
	        methods:{
	        	getGoodsList(){
            	var _this=this;
	            window.sessionStorage.categoryName = '';
            	_this.up='';
			    _this.fl='on';
			    _this.down='';
            	axios.get('/api/index/goods')
				  .then(function (res) {
//				    console.log(res.data);
				    _this.alist = res.data.list;
//				    console.log(_this.alist.list[0].title);
				    _this.flag='active';
				    _this.activeName = '';
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
					  
            },
	            leftDatasList(){
	            	var _this=this;
	            	axios.get('/api/category/categoryNav')
					  .then(function (res) {
	//				    console.log(res.data);
					    _this.list = res.data.list;
					    console.log(_this.list)
					  })
					  .catch(function (res) {
					    console.log(res);
					  });
						  
	            },
	            goSearch(name){
	            	var _this = this;
	            	window.sessionStorage.categoryName = name;
	            	console.log(name)
	            	axios.post('/api/category/search',{
	            		name:name
	            	})
				  .then(function (res) {
//				    console.log(res.data);
				    _this.alist = res.data.list;
				    console.log(_this.alist)
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
	            },
	            selected: function(item) {
			      this.activeName = item;
			      this.flag=''
			    },
			    priceDown(){
			    	var _this = this;
			    	_this.up='';
			    	_this.fl='';
			    	_this.down='on';
			    	name=window.sessionStorage.getItem("categoryName")
			    	axios.post('/api/category/priceDown',{
			    		name:name
			    	})
			    	.then(function (res) {
//				    console.log(res.data);
				    _this.alist = res.data.list;
				    console.log(res)
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
			    },
			    priceUp(){
			    	var _this = this;
			    	name=window.sessionStorage.getItem("categoryName")
			    	_this.up='on';
			    	_this.fl='';
			    	_this.down='';
			    	axios.post('/api/category/priceUp',{
			    		name:name
			    	})
			    	.then(function (res) {
//				    console.log(res.data);
				    _this.alist = res.data.list;
				    console.log(res)
				  })
				  .catch(function (res) {
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
