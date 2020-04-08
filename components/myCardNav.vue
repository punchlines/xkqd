<template>
	<view class="subNav fx-row fx-row-center">
		<view class="fx-column fx-row-center">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/phone.png'" mode=""></image>
			<text class="nav_ti">财富轮盘</text>
		</view>
		<view class="fx-column fx-row-center">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/tongxunlu.png'" mode=""></image>
			<text class="nav_ti">搜索</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "myCardNav",
		data(){
			return {
				onlineSite:this.global.onlineSite,
				
			}
		}
	}
</script>
<style lang="less">

	//导航栏
	.subNav{
		padding-top: 144upx;background: #FFFFFF;
		image{width: 90upx;height: 90upx;}
		.nav_ti{margin-top:20upx;margin-bottom: 50upx; font-size: 28upx;color: #666666;font-family: PingFangSC;}
	}
</style>