<template>
	<div class="addr">
		
            <!-- 头部区 -->
           <EditAddressHeaderView></EditAddressHeaderView>
            <!--商品区-->
            <EditAddressMainView></EditAddressMainView>
           
       
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/address.css';
    import EditAddressHeaderView from '@/components/EditAddressHeader.vue';
    import EditAddressMainView from '@/components/EditAddressMain.vue';
   
    
    export default{
       components:{
        EditAddressHeaderView,
        EditAddressMainView
      
       
        
       }
    }
</script>