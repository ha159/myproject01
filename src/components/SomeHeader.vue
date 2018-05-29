<template>
	
		 <div class="header top_bar">
		 	<a class="back2 c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
			<div class="search2">
				<form action="" method="post">
					
					<input type="search" v-model="keyword" id="" placeholder="店庆遇见11.11 百万图书，5折封顶" autofocus="autofocus" @keyup.enter="goSearch()"/>
				</form>
			</div>
			<span class="fl_btn" @click="goSearch()">搜索</span>
		</div>
	
</template>
<script>
    export default{
        methods:{
            
        }
    }
</script>