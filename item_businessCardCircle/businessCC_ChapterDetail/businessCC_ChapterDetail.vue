<template>
	<view>
		<video v-if="detail" class="video" :src="detail.video" :poster="detail.cover"></video>
		
		<view class="title">{{detail.title}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:""
			};
		},
		onLoad(options) {
			this.detail = JSON.parse(decodeURIComponent(options.bjson))
		}
	}
</script>

<style lang="less">
		
	.video{
		width: 100%;
		height: 500rpx;
	}
	.title{
		font-size: 35rpx;
		color: black;
		margin: 20rpx 10rpx;
	}
</style>
