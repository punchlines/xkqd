<template>
	<view class="circle-avatar">
		<view class="avatar1" v-if="avatar" :style="{backgroundImage:'url('+avatar+')'}"></view>
		<view class="avatar-container" v-else>
			<image class="image" v-for="image in images" :src="image" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CircleAvatar",

		props: {
			images: Array,
			avatar: String,
		},

	}
</script>

<style scoped lang="less">
	.circle-avatar {
		width: 140upx;
		height: 140upx;

		 .avatar{
			width: 100%;
			height: 100%;
		}

		.avatar1 {
			width: 140upx;
			height: 140upx;
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
			align-items: start;
			padding: 5upx;

			.image {
				width: 60upx;
				height: 60upx;
				margin-right: 10upx;
				margin-bottom: 5upx;

				&:nth-child(even) {
					margin-right: 0;
				}

			}

		}

	}
</style>
