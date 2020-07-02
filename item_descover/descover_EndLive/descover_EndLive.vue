<template>
	<view class="card">
		<view class="header">
			直播已结束
		</view>
		<view class="live_Time">
			直播时长
		</view>
		<view class="live_Data">
			<view class="live_Data_header">
				<view class="live_Data_header_text">
					直播数据
				</view>
				<view class="live_Data_header_more">
					查看更多
				</view>
			</view>
			<view class="live_Data_bottom">
				<view class="live_Data_bottom_look">
					<view class="title">
						累计观看(人)
					</view>
					<view class="value">
						{{watchNum}}
					</view>
				</view>
				<view class="live_Data_bottom_look">
					<view class="title">
						新增粉丝(人)
					</view>
					<view class="value">
						{{addAttentionNum}}
					</view>
				</view>
				<view class="live_Data_bottom_look">
					<view class="title">
						累计点赞(个)
					</view>
					<view class="value">
						{{likeNum}}
					</view>
				</view>
			</view>
			<view class="live_Data_bottom">
				<view class="live_Data_bottom_look">
					<view class="title">
						成交金额(元)
					</view>
					<view class="value">
						{{goodsAmount}}
					</view>
				</view>
			</view>
		</view>
		<view class="goback" @click="goback">
			返回首页
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				watchNum:'',
				addAttentionNum:'',
				likeNum:'',
				goodsAmount:''
			}
		},
		onLoad(e) {
			
			this.watchNum=e.watchNum
			this.addAttentionNum=e.addAttentionNum
			this.likeNum=e.likeNum
			this.goodsAmount=e.goodsAmount
		},
		methods:{
			goback(){
				console.log(1)
				uni.switchTab({
					url:'../../pages/businessCard/businessCard'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/jss_base.less";
	@import '../../css/mzl_base.less';

	.card {
		display: flex;
		flex-direction: column;
		padding: 0 40rpx;
		width: 100%;
		height: 100%;
		background: @grayBg;
	}

	.header {
		margin-top: 50rpx;
		font-size: 22px;
		font-weight: 600;
		background: ;
		margin-bottom: 10rpx;

	}

	.live_Time {
		margin-bottom: 20rpx;
	}

	.live_Data {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 20rpx;
		padding: 25rpx;

		.live_Data_header {
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid#fff;
			padding-bottom: 20rpx;
			color: #fff;
		}

		.live_Data_bottom {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;
			justify-content: space-between;

			.live_Data_bottom_look {
				color: #fff;

				.title {
					font-size: 14px;
				}

				.value {
					padding-top: 20rpx;
				}
			}
		}
	}
	.goback{
		margin-left: 40rpx;
		margin-right: 40rpx;
		height: 70rpx;
		text-align: center;
		padding-top: 15rpx;
		border-radius: 40rpx;
		background-color: #E02E24;
		position: fixed;
		bottom: 50rpx;
		width: 590rpx;

		}
</style>
