<template>
	<div id="">
		 <section class="category">
		   <ul>
		   	   <li class="active">全部</li>
		   	   <li>最新</li>
		   	   <li>小说</li>
		   	   <li>历史</li>
		   	   <li>外国</li>
		   	   <li>地理</li>
		   </ul>
	</section>
	
	
  <section id="nav" class="common" dd_name="排序区">   
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
</template>
<script>
    export default{
        data(){
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
   
</script>
