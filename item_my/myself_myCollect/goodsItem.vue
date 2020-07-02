<template>
	<view class="container">
		<!-- 商品列表 -->
		<view class="productList fx-row fx-row-center fx-row-space-around">
			<view v-if="GoodsList.length>0" class="ProductBox" v-for="(item,index) in GoodsList" :key="index" @click="gotoproductD(item.goodsId, item.shopId)">
				<view class="PBimage">
					<image :src="item.coverImage" mode="aspectFill" class="Pimage"></image>
					<!-- <view class="Score">评分{{item.score}}</view> -->
				</view>
				<view class="PBtitle single-line fs3a28">{{item.title}}</view>
				<view class="PBprice fx-row fx-row-center fx-row-space-around">
					<view class="Pprice">
						<text class="PpriceIcon">¥ </text>{{item.preferentialPrice}}<text class="PpriceMin"></text>
					</view>
					<view class="Pnum fs9a24">已售{{item.salesNum}}</view>
				</view>
			</view>
			<view v-if="GoodsList.length==0" class="default">
				<default-page :messageToPage="messageToPage"></default-page>
			</view>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// GoodsList: [], //商品
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/shoucang.png',
					title: '当前无收藏的商品'
				},
				
			}
		},
		props:{
			GoodsList:Array,
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
			// 商品列表
			gotoproductD(goodsId, shopId) {
				this.navigateTo('../../module/shop/goodsDetail/goodsDetail', {
					goodsId: goodsId,
					shopId: shopId
				})
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
	.load-more{width:100%;text-align: center;}
	.container {
		border-top: 1upx solid #eee;
		width: 100%;
		height: 100%;
		background: @grayBg;

		// 商品列表
		.productList {
			padding: 20upx;
			background: @grayBg;
			width: 100%;
			flex-wrap: wrap;
			justify-content: left;
			text-align: center;

			.ProductBox {
				background: #fff;
				border-radius: 8upx;
				margin-bottom: 20upx;
				width: 48.5%;

				&:nth-child(odd) {
					margin-right: 20upx;
				}

				.PBimage {
					position: relative;

					.Pimage {
						width: 100%;
						height: 334upx;
						vertical-align: middle;
					}

					.Score {
						width: 100upx;
						height: 40upx;
						text-align: center;
						line-height: 40upx;
						background: #DDAB5C;
						font-size: 20upx;
						color: #fff;
						position: absolute;
						bottom: -20upx;
						right: 30upx;
					}
				}

				.PBtitle {
					padding: 30upx 15upx 15upx 15upx;
				}

				.PBprice {
					font-size: 36upx;
					color: #FF5858;
					padding: 15upx;

					.Pprice {
						width: 50%;
						text-align: left;
						font-weight: bold;

						.PpriceIcon {
							font-size: 24upx;
						}

						.PpriceMin {
							font-size: 20upx;
						}
					}

					.Pnum {
						width: 50%;
						text-align: right;
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
	// 标题
	.HeaderTitle {
		width: 100%;
		background: #fff;
	
		.Title {
			.Titem {
				padding: 30upx;
			}
	
			.ItemActive {
				border-bottom: 3upx solid @tabActive;
				color: @tabActive;
			}
		}
	}
</style>
