<template>
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
            					<p class="name" style="font-size: 0.6rem;">{{item.title}}</p>                 
            					<p class="author" style="font-size: 0.5rem;">作者：{{item.author}}</p>                
            						
            					<!-- 新标签开始 --> 
            					<div class="new_label_wrap touch">         
            						<div class="lab">                     
            							<div class="label_common touch">当当自营</div>                   
            						</div>                 
            					</div>        
            						
            					<!-- 新标签结束 -->                
            					<div class="price_con">                   
            						<i><b class="left">￥</b><b class="middle">{{item.price}}</b></i>                     
            						<i class="original" style="text-decoration: line-through;">原价：￥{{item.fee}}</i>                       
            						                                                
            					</div>                 
            					<em>100.0%好评(30335人)</em>                
            				</div>      
            			</div>     
            		</div>     
            			
            		<!-- 详情结束 -->    
            	</router-link> 
            	
            </div>
          
            
            
            
            
            
			</section>

</template>
<script>
    import axios from 'axios';
    
    export default{
        data(){
            return {
                list:[]
            }
        },
        mounted:function(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
            	var _this=this;
            	axios.get('/api/prolist/goods')
				  .then(function (res) {
//				    console.log(res.data);
				    _this.list = res.data;
				    console.log(this.list)
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
					  
            }
        }
    }
   
</script>
