<template>
	<div class="home">
		<div class="m_layout">
            <!-- 头部区 -->
           <HomeHeaderView></HomeHeaderView>
            <!-- 轮播图-->
            <HomeBannerView></HomeBannerView>
            <!--导航-->
            <!--<HomeNavView></HomeNavView>-->
            <!--商品区-->
            <HomeMainView></HomeMainView>
            <!--脚部-->
            <FooterView></FooterView>
            <BottomNavView></BottomNavView>
        </div>
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/index.css';
    import HomeHeaderView from '@/components/HomeHeader.vue';
    import HomeBannerView from '@/components/HomeBanner.vue';
//  import HomeNavView from '@/components/HomeNav.vue';
    import HomeMainView from '@/components/HomeMain.vue';
    import FooterView from '@/components/Footer.vue';
    import BottomNavView from '@/components/BottomNav.vue';
//  import {bindEvent,scrollPic} from '../assets/js/index.js'
    
    export default{
       components:{
        HomeHeaderView,
        HomeBannerView,
//      HomeNavView,
        HomeMainView,
        FooterView,
        BottomNavView
       },
       mounted(){
//      bindEvent();
//      scrollPic();
        
       }
    }
   
			
		
</script>
<style>

</style>