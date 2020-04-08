<template>
	<view class="Collection2">
		<view class="recommendBox fx-row fx-row-center fx-row-space-around">
			<!--  -->
			<view class="left">
				<view class="leftBox" v-for="(item,index) in recommendList" :key="index" v-if="index%2==0">
					<view class="RLimage" @click="gotoDetail(item.journalId)">
						<image class="rImage" v-if="item.images[0]" :src="item.images[0]" mode="aspectFill"></image>
					</view>
					
					<view class="RLtitle" v-if="item.content" @click="gotoDetail(item.journalId)">{{item.content}}</view>
				
					
					
					<view class="RLbottme fx-row fx-row-center fx-row space-between">
						<view class="RLBimage">
							<image :src="item.headImage" class="Pimage"></image>
							<text class="RLBnickName fs6a24">{{item.userName}}</text>
						</view>
						<view v-if="showPraise" class="RLBzan" @click="changeLike(index,item.journalId)">
							<image class="RLBzanimage" v-if="item.praiseType == 1" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'"></image>
							<image class="RLBzanimage"  v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image>
							<text  class="RLBzantext fs6a24" >{{item.praiseNum}}</text>
						</view>
						<view v-if="showAdress" class="RLBzan RLBzan1">
							<image  class="RLBzanimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/dibiao.png'"></image>
							<text class="fs6a24 RLBzantext">{{item.distance}}km</text>
						</view>
					</view>
				</view>

			</view>
			<!-- recommentList -->
			<!--  @tap="gotoDetail" v-for="(item,index) in recommendList" :key="index" v-if="index%2==1" -->
			<view class="right">
				<view class="leftBox" v-for="(item,index) in recommendList" :key="index" v-if="index%2==1">
					<view class="RLimage" @click="gotoDetail(item.journalId)">
						<image class="rImage" v-if="item.images[0]" :src="item.images[0]" mode="aspectFill"></image>
					</view>
					<view class="RLtitle" v-if="item.content" @click="gotoDetail(item.journalId)">{{item.content}}</view>
					<view class="RLbottme fx-row fx-row-center fx-row space-between">
						<view class="RLBimage">
							<image :src="item.headImage" class="Pimage"></image>
							<text class="RLBnickName fs6a24">{{item.userName}}</text>
						</view>
						<view v-if="showPraise" class="RLBzan" @click="changeLike(index,item.journalId)">
							<image class="RLBzanimage" v-if="item.praiseType == 1" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'"></image>
							<image class="RLBzanimage" v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image>
							<text class="fs6a24 RLBzantext">{{item.praiseNum}}</text>
						</view>
						<view v-if="showAdress" class="RLBzan RLBzan1">
							<image class="RLBzanimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/dibiao.png'"></image>
							<text class="fs6a24 RLBzantext">{{item.distance}}km</text>
						</view>
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
				list: [{
						id: 0,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png'
					},
					{
						id: 1,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
					},
					{
						id: 2,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png'
					},
					{
						id: 3,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
					},
					{
						id: 4,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png'
					},
					{
						id: 5,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
					},
					{
						id: 6,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png'
					},
					{
						id: 7,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
					},
					{
						id: 8,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png'
					},
					{
						id: 9,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
					},
					{
						id: 10,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'
					},
					{
						id: 11,
						src: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lunpanbg.png'
					},
				],
			};
		},
		props: {
			recommendList: {
				type: Array,
				default: null,
			},
			showAdress:Boolean,
			showPraise:Boolean,
		},
		mounted() {
				
		},
		methods: {
			// 跳转至详情页
			gotoDetail(id) {
				this.navigateTo('/item_descover/journalDetail/journalDetail', {
					id: id
				});
			},
			// 点赞
			changeLike(index,journalId) {
				this.$emit("praise",{
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
					padding: 0 0 30upx 15upx;

					.RLBimage {
						width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						.Pimage {
							width: 60upx;
							height: 60upx;
							vertical-align: middle;
							margin-right: 20upx
						}
					}

					.RLBzan {
						width: 50%;
						text-align: right;
						padding-right: 20upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						.RLBzanimage {
							width: 28upx;
							height: 24upx;
							vertical-align: middle;
							margin-right: 10upx;
						}

						.RLBzantext {
							position: relative;
							top: -2upx;
						}
					}

					.RLBzan1 {
						width: 50%;
						text-align: right;
						margin-right: 20upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						.RLBzanimage {
							width: 20upx;
							height: 24upx;
							vertical-align: middle;
							margin-right: 10upx
						}

						.RLBzantext {
							position: relative;
							top: -2upx;
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
