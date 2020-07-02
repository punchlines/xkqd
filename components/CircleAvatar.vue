<template>
	<view class="circle-avatar" :style="width?'width:150rpx;height:150rpx':'width:125upx;height:125upx;'">
		<view class="avatar1" v-if="avatar" :style="{backgroundImage:'url('+avatar+')'}"></view>
		<view class="avatar-container" v-else>
			<image class="image" v-for="(image,index) in images" :key="index" :src="image" mode="aspectFit" :style="width?'width:40rpx;height:40rpx':'width: 33upx;height: 33upx;'"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CircleAvatar",

		props: {
			images: Array,
			avatar: String,
			width:{
				type:Boolean,
				value:false
			}
		},

	}
</script>

<style scoped lang="less">
	.circle-avatar {
		width: 125rpx;
		height: 125rpx;
		
		 .avatar{
			width: 100%;
			height: 100%;
		}

		.avatar1 {
			width: 110upx;
			height: 110upx;
			background-size: 100%;
			background-repeat: no-repeat;
		}

		.avatar-container {
			width: 100%;
			height: 100%;
			display: flex;
			box-sizing: border-box;
			flex-wrap: wrap;
			background: rgba(241, 241, 241, 1);
			padding: 5upx;
			border-radius:10rpx;
			.image {
				width: 33upx;
				height: 33upx;
				margin-right: 10upx;
				// margin-bottom: 5upx;

				&:nth-child(3n+0) {
					margin-right: 0;
				}
				&:nth-child(1){
					margin-bottom: 5upx;
				}
				&:nth-child(4){
					margin-bottom: 5upx;
				}
			}

		}

	}
</style>
