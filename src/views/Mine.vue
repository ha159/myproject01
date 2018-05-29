<template>
	<div class="user_i">
	<MineHeaderView></MineHeaderView>
	<MineMainView></MineMainView>
	</div>
</template>
<script>
	import MineHeaderView from '@/components/MineHeader.vue';
	import MineMainView from '@/components/MineMain.vue';
	export default{
		components:{
			MineMainView,
			MineHeaderView
		}
	}
</script>
<style>
@import '../assets/css/mine.css';
</style>