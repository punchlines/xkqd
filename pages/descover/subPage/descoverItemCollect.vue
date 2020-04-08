<template>
	<view class="Collection2">



		<!--<view class="recommendBox fx-row fx-row-center fx-row-space-around">-->
			<!--&lt;!&ndash;  &ndash;&gt;-->
			<!--<view class="left">-->
				<!--&lt;!&ndash; 店铺列表 &ndash;&gt;-->
				<!--<view class="storeList">-->
					<!--<view v-if="recommendList.length>0" class="storeListBox">-->
					<!--</view>-->
				<!--</view>-->

			<!--</view>-->
			<!--&lt;!&ndash; recommentList &ndash;&gt;-->
			<!--&lt;!&ndash;  @tap="gotoDetail" v-for="(item,index) in recommendList" :key="index" v-if="index%2==1" &ndash;&gt;-->
			<!--<view class="right">-->
				<!--&lt;!&ndash; 店铺列表 &ndash;&gt;-->
				<!--<view class="storeList">-->
					<!--<view v-if="recommendList.length>0" class="storeListBox">-->
						<!--<goods-item :goods="item" :auto="true"  v-for="(item, index) in recommendList" v-if="index%2==1"></goods-item>-->
					<!--</view>-->
				<!--</view>-->

			<!--</view>-->
		<!--</view>-->

	</view>
</template>

<script>
  import GoodsItem from "@/components/goodsItem";
    export default {
		name: "collection",
      components: {GoodsItem},
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
				default: [],
			},
			showAdress: Boolean,
			showPraise: Boolean,
		},
		methods: {

			// 跳转至详情页
			gotoDetail(id) {
				this.navigateTo('/item_descover/journalDetail/journalDetail', {
					id: id
				});
			},
			// 点赞
			changeLike(index, journalId) {
				this.recommendList[index].praiseStatus = this.recommendList[index].praiseStatus ? 0 : 1;
				this.recommendList[index].praiseNum += this.recommendList[index].praiseStatus ? 1 : -1
				this.$api.praise(this.recommendList[index].journalId, 1).catch(error => {
					this.showError(error);
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@import '../../../css/mzl_base.less';

	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 30upx;
	}


	.Collection2 {
		box-sizing: border-box;
		width: 100%;
		height: 100%;

		.recommendBox {
			width: 100%;
			height: 100%;
			// padding: 0 20upx;

			.left,
			.right {

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

					image {
						width: 28upx;
						height: 24upx;
						vertical-align: middle;
						margin-right: 10upx;
					}

					text {
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

					image {
						width: 20upx;
						height: 24upx;
						vertical-align: middle;
						margin-right: 10upx
					}

					text {
						position: relative;
						top: -2upx;
					}
				}
			}
		}
	}

	.goods {
		width: calc(~"50% -"9upx);
		margin-right:16upx;
		border-radius: 8upx;
		margin-bottom: 20upx;
		position: relative;

		&.auto {
			width: auto;
		}

		&:nth-child(2n) {
			margin-right: 0;
		}

		.goods_cover {
			width: 100%;
			padding-bottom: 100%;
			height: 0;
			background-color: #EEEEEE;
			position: relative;

			.goods_cover-image {
				width: 100%;
				height: 100%;
				position: absolute;
			}

			.godds_score {
				position: absolute;
				bottom: 0;
				right: 20upx;
				width: 100upx;
				height: 40upx;
				line-height: 40upx;
				background: #DDAB5C;
				border-radius: 4px;
				transform: translateY(50%);
				font-size: 20upx;
				color: #FFFFFF;
				text-align: center;
			}

		}

		.goods_name {
			font-size: 28upx;
			color: #333333;
			margin-bottom: 20upx;
		}

		.goods_meta {
			display: flex;
			align-items: center;
		}

		.godds_price {
			flex: 1;
			color: #FF5858;
		}

		.goods_sell_count {
			font-size: 24upx;
			color: #999999;
		}

		.goods_info_container {
			background-color: #FFFFFF;
			padding: 0 20upx;
			padding-top: 30upx;
			padding-bottom: 37upx;
		}


	}
	
</style>
