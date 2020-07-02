<template>
	<view class="content">
		<view class="uni-list">
			<view class="none" v-if="list.length==0">
				暂无记录
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" v-else >
				<view class="uni-media-list" >
					<image class="uni-media-list-logo" :src="item.cover"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-top">播放时间：{{item.playTimePeriod}}</view>
						<view class="uni-media-list-text-bottom-uni-ellipsis">
							<view class="value">观看数：{{item.watchNum}}</view>
							<view class="value">新增粉丝：{{item.addAttentionNum}}</view>
						</view>
						<view class="uni-media-list-text-bottom-uni-ellipsis">
							<view class="value">钻石数：</view>
							<view class="value">成交额：{{item.goodsAmount}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listuser: [],
				list: [],
				pageNo: 1
			}
		},
		onLoad() {
			this.getLiveHistoryList()
		},
		methods: {
			getLiveHistoryList() {
				this.$api.liveHistoryList(this.pageNo)
					.then(res => {
						this.list = res
						console.log(this.list)
					})
			}
		}
	}
</script>

<style>
	.uni-list-cell {
		margin-top: 30rpx;
		background: #EEEEEE;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.uni-media-list {
		display: flex;
		flex-direction: row;
	}

	.uni-media-list-logo {
		width: 230rpx;
		height: 230rpx;

	}

	.uni-list {
		margin: 20rpx;

	}
	.none{
		margin-left: 300rpx;
		font-size: 16px;
		color: #666666;
		padding-top: 20rpx;
	}
	.uni-media-list-text-bottom-uni-ellipsis {
		display: flex;
		flex-direction: row;
		padding: 10rpx;
	}
	.value{
		font-size: 12px;
		width: 210rpx;
	}
	.uni-media-list-body {
		height: auto;
		margin-left: 20rpx;
	}
	.uni-media-list-text-top {
		padding: 10rpx;
	}
</style>
