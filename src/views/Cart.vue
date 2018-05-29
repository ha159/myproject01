<template>
	<div class="cart">
		
            <!-- 头部区 -->
           <CartHeaderView></CartHeaderView>
            <!--商品区-->
            <CartMainView></CartMainView>
            
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/cart.css';
    import CartHeaderView from '@/components/CartHeader.vue';
    import CartMainView from '@/components/CartMain.vue';
    
    
    export default{
       components:{
        CartHeaderView,
        CartMainView
       
       
        
       }
    }
</script>
<style>

</style>