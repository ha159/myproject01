<template>
	 <div class="search_main">
	 	<div class="header top_bar" style="height: 38px;">
		 	<a class="back2 c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
			<div class="search2">
				<form action="" method="post">
					
					<input type="search" v-model="keyword" id="" placeholder="店庆遇见11.11 百万图书，5折封顶" autofocus="autofocus" @keyup.enter="goSearch()"/>
				</form>
			</div>
			<span class="fl_btn" @click="goSearch()">搜索</span>
		</div>
	       <div id="">
		 <!--<section class="category">
		   <ul>
		   	   <li class="active">全部</li>
		   	   <li>最新</li>
		   	   <li>小说</li>
		   	   <li>历史</li>
		   	   <li>外国</li>
		   	   <li>地理</li>
		   </ul>
	</section>-->
	
	
            <section id="nav" :class="nav" dd_name="排序区">   
				<ul>    
					<li>
						<a href="javascript:void(0);" data-status="default_0" class="on" dd_name="默认">默认</a>
					</li>    
					<li>
						<a href="javascript:void(0);" data-status="sales_1" dd_name="销量">销量</a>
						
					</li>    
					<li>
						<a href="javascript:void(0);" data-status="price_" data-up="0" data-down="1" dd_name="价格(包括价格升序和降序)">价格<i class="arrow_up"></i><i class="arrow_down"></i></a>
						
					</li>    
					<li>
						<a href="javascript:void(0);" data-status="score_1" dd_name="好评">好评</a>
					</li>    
					<li>
						<a href="javascript:void(0);" data-status="publishdate_0" dd_name="时间(包括出版时间和最新)">出版时间</a>
					</li>   
				</ul>  
			</section>
	   </div>
            <!--商品列表开始-->
            <section class="list">
            <div class="product" v-for='item in list.list'> 
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
            					<em>100.0%好评(30335人)</em>                
            				</div>      
            			</div>     
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	
            </div>                               
            
			</section>
</div>
</template>
<script>
    import axios from 'axios';
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                list:[],
                nav:'hidden',
                keyword:''
            }
        },
        mounted:function(){
//          this. goSearch();
        },
        methods:{
            
            goSearch(){
				let _this = this;
				
				if(_this.keyword == ''){
					Toast({
							  message: '请输入搜索关键字!',
							  position: 'bottom',
							  duration: 3000
							});
				}else{
					axios.post('/api/search/getSearchGoods',{
						
							kw:_this.keyword,
							hot:'',
							priceUp:'',
							priceDown:''
						
						}).then((res)=>{
							_this.list = res.data;
							_this.nav = 'show'
							console.log(_this.list);
						},(err)=>{
							console.log(err);
						});
					}
								 
			}
        }
    }
   
</script>
