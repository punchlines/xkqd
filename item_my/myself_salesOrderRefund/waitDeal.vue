<template>
	<view class="container1">
		<view style="background:#f5f5f5;">
			<!--售后订单列表 待处理 -->
			<view class="AllOrderListBox" v-for="(item,index) in Alllist" :key="index" @click="gotoServiceDetail(item.refundsId)">
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName">
							<image :src="item.shopCover" class="Image"></image>
							<text class="fs3a28">{{item.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24"></view>
					</view>
				</view>
				<view class="ListCenter">
					<view class="LCproductList fx-row fx-row-center">
						<view class="PLitem">
							<image :src="item.cover" class="Image"></image>
						</view>
					</view>
				</view>
				<view class="ListBottom fx-row fx-clo-center fx-row-left">
					<view class="LBproductNum fs3a28 ">{{item.type==0?'仅退款':'退款并退货'}}，{{ item.shopStatus | formatStatus }}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {STATUS_MAP } from '@/js/constant.js'
	export default {
		name: 'AfterService',
		data() {
			return {
				
			};
		},
		filters: {
			formatStatus: function(status) {
				return STATUS_MAP[Number(status)];
			}
		},
		
		props: {
			Alllist:{
				type:Array,
				default:[]
			}
		},
		methods: {
			// 售后商家处理情况 待处理
			gotoServiceDetail(refundId) {
				// 仅退款，待处理
				this.navigateTo('../myself_refundsDetail/myself_refundsDetail', {
					refundId: refundId,
					isSO:1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';

	/* // 售后订单列表 */
	.AllOrderListBox {
		margin-top: 40upx;
		background: #fff;

		.AOLlist {
			.ListHeader {
				padding: 30upx;

				.LHstoreName {
					width: 80%;

					.Image {
						width: 60upx;
						height: 60upx;
						vertical-align: middle;
						margin-right: 20upx;
					}
				}

				.LHorderState {
					width: 20%;
					text-align: right;
				}
			}
		}

		.ListCenter {
			background: @grayBg;
			padding: 30upx;

			.LCproductList {
				.PLitem {
					.Image {
						width: 160upx;
						height: 160upx;
						vertical-align: middle;
						margin-right: 30upx;
					}
				}
			}
		}

		.ListBottom {
			background: #fff;
			text-align: left;
			padding: 30upx;
		}
	}
</style>
