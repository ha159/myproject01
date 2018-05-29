<template>
	<div class="home">
		<div class="m_layout">
            <!-- 头部区 -->
           <SomeHeaderView></SomeHeaderView>
            <!--<HomeBannerView></HomeBannerView>-->
            <!--导航-->
            <ProNavView></ProNavView>
            <!--商品区-->
            <ProMainView></ProMainView>
            <!--脚部-->
            <!--<FooterView></FooterView>-->
        </div>
	</div>
</template>
 <script>
    import '../assets/css/common.css';
    import '../assets/css/pro_list.css';
    import SomeHeaderView from '@/components/SomeHeader.vue';
//  import HomeBannerView from '@/components/HomeBanner.vue';
    import ProNavView from '@/components/ProNav.vue';
    import ProMainView from '@/components/ProMain.vue';
//  import FooterView from '@/components/Footer.vue';
    import {stickTop} from '../assets/js/prolist.js'
    export default{
       components:{
        SomeHeaderView,
//      HomeBannerView,
        ProNavView,
        ProMainView,
//      FooterView
       },
        mounted(){
        	stickTop();
        }
    }
</script>
<style>

</style>