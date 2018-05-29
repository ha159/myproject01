<template>
	<div class="addr">
		
            <!-- 头部区 -->
           <AddressHeaderView></AddressHeaderView>
            <!--商品区-->
            <AddressMainView></AddressMainView>
           
       
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/address.css';
    import AddressHeaderView from '@/components/AddressHeader.vue';
    import AddressMainView from '@/components/AddressMain.vue';
   
    
    export default{
       components:{
        AddressHeaderView,
        AddressMainView
      
       
        
       }
    }
</script>
