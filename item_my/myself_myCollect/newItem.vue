<template>
	<view class="container">
		<!-- 资讯列表 -->
		<view class="consultList" v-if="titleActiveIndex==2">
			<view class="ConsultaListBox top">
				<view class="CLitem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in list3" :key="index" @click="gotoConsult">
					<view class="CLleft">
						<view class="CLtitle fs3a28">知名品牌有哪些画风清奇的设计?</view>
						<view class="nickName fs6a24 fx-row fx-row-center fx-row-space-around">
							<view class="Nname">木子李</view>
							<view class="Ntime">1天前</view>
						</view>
					</view>
					<view class="CLright">
						<default-image src="headImage" custom-class="Cimage"></default-image>
					</view>
				</view>
			</view>
			<view class="consultMess fs3a28">暂未开通</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前无收藏的商品'
				},
			}
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


			// 资讯列表
			gotoConsult() {
				uni.navigateTo({
					url: '../descover_consultaDetail/descover_consultaDetail'
				});
			},
		},
		onLoad() {

		},

		onShow() {

		},

	}
</script>
<!-- scoped -->
<style lang="less">
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

		// 资讯
		.consultList {
			padding: 30upx;

			.consultMess {
				width: 100%;
				text-align: center;
			}

			.ConsultaListBox {
				.CLitem {
					background: #fff;
					margin-bottom: 20upx;
					border-radius: 4upx;
					padding: 30upx;

					.CLleft {
						width: 60%;

						.CLtitle {
							height: 130upx;
							font-size: 32upx;
							font-weight: 600upx;
							line-height: 50upx;
						}

						.nickName {
							height: 50upx;

							.Nname {
								width: 50%;
								text-align: left;
							}

							.Ntime {
								width: 50%;
								text-align: right;
							}
						}
					}

					.CLright {
						width: 40%;
						text-align: right;

						.Cimage {
							width: 240upx;
							height: 180upx;
							vertical-align: middle;
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
