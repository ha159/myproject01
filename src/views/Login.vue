<template>
	<div class="home">
		<div class="m_layout">
            <!-- 头部区 -->
           <LoginHeaderView></LoginHeaderView>
            
            <!--商品区-->
            <LoginMainView></LoginMainView>
            <!--脚部-->
            <LoginFooterView></LoginFooterView>
        </div>
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/login.css';
    import LoginHeaderView from '@/components/LoginHeader.vue';
    import LoginMainView from '@/components/LoginMain.vue';
    import LoginFooterView from '@/components/LoginFooter.vue';
    
    export default{
       components:{
        LoginHeaderView,
        LoginMainView,
        LoginFooterView
       
       }
    }
</script>
<style>

</style>