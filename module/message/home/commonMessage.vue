<template>
	<view>
		<view class="uni-padding-wrap">
			<view>
				<view class="list-view">
					<view class="list-item" v-for="(value,index) in list" :key="index">{{value}}22</view>
				</view>
				<uniLoadMore :loadingType="loadingType" :contentText="contentText"></uniLoadMore>
			</view>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from '../../../template/uni-load-more.vue';
	export default {
		data() {
			return {
				title: 'uni-load-more',
				list: [],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad() {
			var list = [1,2,3];
			for (var i = 1; i < 11; i++) {
				list.push(i);
			}
			this.list = list;
			console.info(list)
		},
		// 触发
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			var list = [],
				maxItem = this.list[this.list.length - 1],
				length = maxItem + 6;
			for (var i = maxItem + 1; i < length; i++) {
				list.push(i);
			}
			setTimeout(() => {
				if (length > 26) {
					this.loadingType = 2;
					return;
				}
				this.list = this.list.concat(list);
				this.loadingType = 0;
			}, 800);
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style>
	.list-view {
		padding:10upx 0;
	}

	.list-item {
		margin: 20upx 0;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		border-radius: 10upx;
		border: 1upx solid #eee;
		text-align: center;
		background:#FFF;
	}
	.uni-padding-wrap{
		padding-top: 100upx;
	}
</style>
