<template>
	<view class="container">
		<!-- 店铺列表 -->
		<view class="storeList">
			<view v-if="ShoreList.length>0" class="storeListBox">
				<view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in ShoreList" :key="index" @click="gotoStore(item.shopId)">
					<view class="Limage">
						
						<image :src="item.logo" mode="aspectFill" class="Image"></image>
					</view>
					<view class="LTitle">
						<view class="LtitleName fs3a32">{{item.shopName}}</view>
						<view class="LtitleSubName fs6a24">{{item.goodsCount}}个商品</view>
					</view>
					<view class="applyBox">
						<view class="Bapply fs6a28">
							<image class="ABimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jinru.png'" alt=""></image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="ShoreList.length==0" class="default">
				<default-page :messageToPage="messageToPage"></default-page>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// ShoreList: [], //店铺
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前无收藏的店铺'
				},
			}
		},
		props:{
			ShoreList:Array,
		},
		methods: {
			// 获取收藏列表数据 //2：店铺，3：商品 
			getCustomerList() {
				this.$api.myCollect(3, 1).then(result => {
					// console.log(result);
					this.GoodsList = result.goodsList;
				}).catch(error => {
					this.showError(error);
				})
			},
			
			// 我的店铺
			gotoStore(shopId) {
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId=' + shopId
				});
			},

		},
		onLoad() {
			// this.getCustomerList();
		},

	}
</script>
<!-- scoped -->
<style lang="less" scoped>
	@import '../../css/mzl_base.less';


	page {
		background: @grayBg;
		width: 100%;
		height: 100%;
	}

	.container {
		border-top: 1upx solid #eee;
		width: 100%;
		height: 100%;
		background: @grayBg;

		// 店铺
		.storeList {
			padding: 30upx;

			.storeListBox {
				background: @grayBg;

				.SBlist {
					background: #fff;
					padding: 30upx;
					margin-bottom: 30upx;

					.Limage {
						width: 22%;

						.Image {
							width: 110upx;
							height: 110upx;
							vertical-align: middle
						}
					}

					.LTitle {
						width: 58%;

						.LtitleName {
							font-size: 30upx;
							height: 70upx;
						}
					}

					.LTitle1 {
						width: 85%;
					}

					.applyBox {
						width: 20%;
						text-align: right;

						.Bapply {
							.ABimage {
								width: 30upx;
								height: 30upx;
								vertical-align: middle;
							}
						}
					}
				}
			}
		}

		.default {
			position: fixed;
			top: 50%;
			left: 50%;
			margin-top: -86upx;
			margin-left: -115upx;
		}
	}
</style>
