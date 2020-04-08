<template>
	<view>
		<view class="DefalutPage">
			<view class="DPimage">
				<image :src="messageToPage.image" mode="aspectFit"></image>
				<view class="DPtitle">{{messageToPage.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'defaultpage',
		props:['messageToPage'],
		data() {
			return {
				
			};
		},
		methods:{},
		onLoad() {
			// console.log(this.messageToPage);
		}
	}
</script>

<style lang="less">
	.DefalutPage{
		text-align: center;
		.DPimage{
			
			image{width:230upx;height: 172upx;vertical-align: middle;margin-bottom:30upx;}
		}
		.DPtitle{color:#aaa;font-size:28upx;text-align: center;width:100%;}
	}
</style>
