<template>
	<view class="Collection2">
		<view class="recommendBox fx-row fx-row-center fx-row-space-around">
			<!--  -->
			<view class="left">
				<view class="leftBox" v-for="(item,index) in recommendList" :key="index" v-if="index%2==0">
					<view class="RLimage" @click="gotoDetail(item.liveId,item.playUrl)">
						<image class="rImage" :src="item.userCover" mode="aspectFill"></image>
					</view>
					<view class="RLtitle" v-if="item.title" @click="gotoDetail(item.liveId)">{{item.title}}</view>
					<view class="RLbottme fx-row fx-row-center fx-row space-between">
						<view class="RLBimage">
							<image :src="item.headImage" class="Pimage"></image>
							<text class="RLBnickName fs6a24">{{item.userName}}</text>
						</view>
						<view class="RLBzan">
							<view>
								<image class="RLBzanimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'"></image>
							</view>
							<!-- <image class="RLBzanimage"  v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image> -->
							<text class="RLBzantext fs6a24">{{item.likeNum}}</text>
						</view>
						<view v-if="showAdress" class="RLBzan RLBzan1">
							<image class="RLBzanimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/dibiao.png'"></image>
							<text class="fs6a24 RLBzantext">{{item.likeNum}}km</text>
						</view>
						<!-- <view class="RLBgoods">
							<view class="RLBimg">
								<image src="https://wx.qlogo.cn/mmopen/vi_32/PMhIppvFGDiaicllJ1TI0mibqtfE0nksknocHzB9ibeq6KGA58szOZZH1WKd1uLbCmibZhOWwnMVW82kI0ArKmDaOtA/132"
								 mode="" style="width: 80rpx;height: 80rpx;"></image>
							</view>
							<view class="RLBinfo">
								<view class="goodsName">123</view>
								<view class="goodsPrice">￥<text>123</text></view>
							</view>
						</view> -->
					</view>
				</view>

			</view>
			<!-- recommentList -->
			<!--  @tap="gotoDetail" v-for="(item,index) in recommendList" :key="index" v-if="index%2==1" -->
			<view class="right">
				<view class="leftBox" v-for="(item,index) in recommendList" :key="index" v-if="index%2==1">
					<view class="RLimage" @click="gotoDetail(item.liveId,item.playUrl)">
						<image class="rImage" :src="item.userCover" mode="aspectFill"></image>
					</view>
					<view class="RLtitle" v-if="item.title" @click="gotoDetail(item.liveId)">{{item.title}}</view>
					<view class="RLbottme fx-row fx-row-center fx-row space-between">
						<view class="RLBimage">
							<image :src="item.userCover" class="Pimage"></image>
							<text class="RLBnickName fs6a24">{{item.userName}}</text>
						</view>
						<view  class="RLBzan" >
							<view>
								<image class="RLBzanimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'"></image>
							</view>
							<!-- <image class="RLBzanimage" v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image> -->
							<text class="fs6a24 RLBzantext">{{item.likeNum}}</text>
						</view>
						<view v-if="showAdress" class="RLBzan RLBzan1">
							<image class="RLBzanimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/dibiao.png'"></image>
							<text class="fs6a24 RLBzantext">{{item.likeNum}}km</text>
						</view>
						<!-- <view class="RLBgoods">
							<view class="RLBimg">
								<image src="https://wx.qlogo.cn/mmopen/vi_32/PMhIppvFGDiaicllJ1TI0mibqtfE0nksknocHzB9ibeq6KGA58szOZZH1WKd1uLbCmibZhOWwnMVW82kI0ArKmDaOtA/132"
								 mode="" style="width: 80rpx;height: 80rpx;"></image>
							</view>
							<view class="RLBinfo">
								<view class="goodsName">123</view>
								<view class="goodsPrice">￥<text>123</text></view>
							</view>
						</view> -->
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "devcoverItem",
		data() {
			return {
				imgsArr: [],
				// showPraise: true,
				// showAdress: false,
				praiseType: true,

			};
		},
		props: {
			recommendList: {
				type: Array,
				default: null,
			},
			showAdress: Boolean,
			showPraise: Boolean,
		},
		mounted() {

		},
		methods: {
			// 跳转至详情页
			gotoDetail(id,playUrl) {
				console.log(id)
				uni.setStorageSync('playUrl', playUrl)
				this.navigateTo('/item_descover/descover_LookLive/descover_LookLive', {
					id: id,
					playUrl:playUrl
				});
			},
			// 点赞
			changeLike(index, journalId) {
				this.$emit("praise", {
					index
				});

			},
		}
	}
</script>

<style scoped lang="less">
	@import '../../../css/mzl_base.less';


	.Collection2 {
		box-sizing: border-box;
		width: 750upx;
		height: 100%;

		.recommendBox {
			width: 100%;
			height: 100%;
			align-items: flex-start;
			// padding: 0 20upx;

			.left,
			.right {
				width: 47%;
				/*height: 0;*/
				break-inside: avoid;
				box-sizing: border-box;
				display: inline-block;
				vertical-align: top;

				.leftBox {
					background: #fff;
					margin-bottom: 20upx;
					border-radius: 10upx;
					position: relative;
				}

				.RLimage {
					width: 100%;
					vertical-align: top;

					.rImage {
						width: 100%;
						border-radius: 8upx;
						//max-height: 400upx;
					}
				}

				.RLtitle {
					width: 100%;
					margin: 20upx 0;
					padding: 0 15upx;
					color: @title;
					font-size: @fsSubTitle;
					line-height: 40upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.RLbottme {
					padding: 0 0 10upx 15upx;

					.RLBimage {
						color: #FFFFFF;
						width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						position: absolute;
						top: 360rpx;

						.Pimage {
							width: 60upx;
							height: 60upx;
							border-radius: 30rpx;
							vertical-align: middle;
							margin-right: 20upx
						}
					}

					.RLBzan {
						width: 50rpx;
						text-align: right;
						display: flex;
						flex-direction: column;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						position: absolute;
						top: 30rpx;
						right: 0;

						.RLBzanimage {
							width: 28upx;
							height: 24upx;
							vertical-align: middle;

						}

						.RLBzantext {
							color: #FFFFFF;
							// position: relative;
							// top: -2upx;
						}
					}

					.RLBgoods {
						display: flex;
						flex-direction: row;

						.RLBimg {
							margin-right: 20rpx;
						}

						.RLBinfo {
							.goodsName {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								width: 100%;
								color: #CCCCCC;
								font-size: 16px;
								font-weight: bold;
							}
							.goodsPrice{
								padding-top: 10rpx;
								font-size: 14px;
								color: #FF5858;
							}
						}
					}

					.RLBzan1 {
						display: flex;
						flex-direction: row;
						width: 50%;
						text-align: center;
						margin-right: 20upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						position: absolute;
						right: -90rpx;
						top: 375rpx;
						
						.RLBzanimage {
							width: 20upx;
							height: 24upx;
							vertical-align: middle;
							margin-right: 5rpx;
						}

						.RLBzantext {
							color: #FFFFFF;
							// position: relative;
							// top: -2upx;
						}
					}
				}
			}
		}


		.vueWaterFall {
			width: 730upx;
			height: 1000upx;
		}

		.vue-waterfall-easy-container .vue-waterfall-easy a.img-wraper>img {
			border-radius: 8upx;
		}
	}
</style>
