<template>
	<div class="home">
		<div class="m_layout">
            <!-- 头部区 -->
           <RegHeaderView></RegHeaderView>
            
            <!--商品区-->
            <RegMainView></RegMainView>
            <!--脚部-->
            <LoginFooterView></LoginFooterView>
        </div>
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/login.css';
    import RegHeaderView from '@/components/RegHeader.vue';
    import RegMainView from '@/components/RegMain.vue';
    import LoginFooterView from '@/components/LoginFooter.vue';
    export default{
       components:{
        RegHeaderView,
        RegMainView,
        LoginFooterView
       }
    }
</script>
<style>

</style>