<template>  
	<div>  
		<mt-swipe :auto="4000">   
			<mt-swipe-item v-for="item in list.list" :key="item._id">   
				<a target="_blank" :href="item.urlname" rel="external nofollow" >    
					<img :src="item.pic2" class="img"/>    
					<span class="desc"></span>  
				</a>   </mt-swipe-item>  
		</mt-swipe>  
	</div> 
</template> 
<script>  
import axios from 'axios'
import {Swipe, SwipeItem} from 'mint-ui' 
import 'mint-ui/lib/style.css'   
export default {  
	components: {   'mt-swipe': Swipe,   'mt-swipe-item': SwipeItem  },
	        data(){
	            return {
	                list:[]
	            }
	        },
	        mounted:function(){
	            this.getBannerList();
	        },
	        methods:{
	            getBannerList(){
	            	var _this=this;
	            	axios.get('/api/index/banner')
					  .then(function (res) {
	//				    console.log(res.data);
					    _this.list = res.data;
					    console.log(this.list)
					  })
					  .catch(function (res) {
					    console.log(res);
					  });
						  
	            },
	            goUrl(){
	            	var _this=this;
	            	var urlName=_this.list.urlname;
	            	
	            }
	        }
}
</script> 
<style scoped>  
img {  width: 100%;  }  
.mint-swipe {  height: 160px;  }  
.desc {background: #000;} 
.mint-swipe-indicator.is-active{
	background: #11A3FC;
}
.mint-swipe-indicators {
    position: absolute;
    bottom: 33px !important;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}

.mint-swipe-indicator {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #eee;
    opacity: 0.8;
    margin: 0 3px;
}
</style>
