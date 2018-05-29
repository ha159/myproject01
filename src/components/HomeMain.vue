<template>
	<div class="home_m">
		 
				<section class="block_title">
					<router-link to="/proList" class="h2"><img src="../assets/img/t_1.jpg"></router-link>
					<a class="h2" href="/proList">
						
					</a>
				</section>
				<section class="pro_list">
					<ul>
						<li id="list" v-for='item in list.list' v-if='item.type=="最新"'>
							<router-link :to="'/detail/'+item._id" >
								<img v-bind:src='item.pic' @click='addTrace(item._id)'/>
								<div class="pro_text">
									<p class="b_name">{{item.title}}</p>
									<p class="b_price">
										<span class="sign">￥</span>&nbsp;
										<span class="num">{{item.price}}</span>	
										<span>{{item.product_id}}</span>
									</p>
								</div>
							</router-link>
						</li>
						
					</ul>
				</section>
				<section class="block_title">
					<a class="h2" href="">
						<img src="../assets/img/t_2.jpg">
					</a>
				</section>
				<section class="pro_list">
					<ul>
						<li v-for='item in list.list' v-if='item.type=="特色推荐"'>
							<router-link :to="'/detail/'+item._id" >
								<img v-bind:src='item.pic' @click='addTrace(item._id)'/>
								<div class="pro_text">
									<p class="b_name">{{item.title}}</p>
									<p class="b_price">
										<span class="sign">￥</span>&nbsp;
										<span class="num">{{item.price}}</span>	
										<span>{{item.product_id}}</span>
									</p>
								</div>
							</router-link>
						</li>
						
					</ul>
				</section>
				
			
		</div>
	</div>
</template>
<script>
    import axios from 'axios';
    
    export default{
        data(){
            return {
                list:[],
               
            }
        },
        mounted:function(){
            this.getGoodsList();
            
        },
        methods:{
            getGoodsList(){
            	var _this=this;
            	axios.get('/api/index/goods')
				  .then(function (res) {
				    console.log(res.data.list);
				    _this.list = res.data;
				    console.log(_this.list)
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
					  
            },
            addTrace(id){
            	var _this=this;
            
            	_this.username=window.sessionStorage.getItem("username")
            	console.log(_this.username)
            	if(_this.username==''){
                	_this.$router.push({path:"/login"});
            		return;
            	}else{
            		axios.post('/api/trace/addTrace',{
            		
            			_id:id,
//          			username:_this.username
            		
            	}).then(function(res){
//          		console.log(res)
            		if(res.status == 200){           		            		 
            		   if(_this.username.length!=''){
            		   	   console.log('添加成功！')
							
            		   }
					}
            	})
            	}
            }
            
            
        }
    }
   
</script>

<!--<script type="text/javascript">
	$('#lsit:gt(4)').css('display','none')
</script>-->