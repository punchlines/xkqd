<template>
	<view class="goods-list">
		<goodsThird v-for="(n,index) in shopGoods" :key='index' :value="n" :goods="n" :shopId='shopIdOtherPeople' :SignIn='SignIn'
		 :cardUserId='cardUserId'  :isSelfShop="isSelfShop" @allMoreInfo="allmoreInfo"  @addCar="addCar" :recommend-id="recommendId"></goodsThird>
		<view v-if="shopGoods.length==0 && !loading" style="align-items: center;width: 100%;">
			<default-page :messageToPage="messageToPage2"></default-page>
		</view>
		<view style="flex: 1" v-else>
			<uni-load-more :loading-type="loadingType" ></uni-load-more>
		</view>
	</view>
</template>

<script>
	import goodsThird from '../module/shop/_component/goodsThird';
	export default{
		data(){
			return{
				
			}
		},
		components: {
			goodsThird,
		},
	}
</script>

<style>
</style>
