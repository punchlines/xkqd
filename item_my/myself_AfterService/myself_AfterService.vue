<template>
	<view class="container1">
		<!--售后订单列表 -->
		<view v-for="(item, index) in Alllist" :key="index">
			<view class="AllOrderListBox">
				<view class="orderItemBox">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName1"  @tap="gotoShop(item.shopId)"> 
							<image :src="item.shopCover" mode="aspectFill" class="Image"></image>
							<text class="fs3a28">{{item.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24">
							{{ item._status }}
						</view>
					</view>
					<view class="ListCenter" @click="openOrderDetail(item.refundsId)">
						<view class="LCproductList">
							<view class="PLitem"  @tap="item">
								<image :src="item.cover" mode="aspectFill" class="Image"></image>
							</view>
						</view>
					</view>
					<view class="ListBottom">
						<view class="LBproductNum fs3a28 fx-row-right">
							<!--  refuseStatus 1.拒绝 2.同意 3.待处理 4、关闭-->
							<!-- itemType 类型：1只退款 4退款退货| -->
							<!-- refundStatus 退款状态：1待退款，2退款成功 ,3.退款失败 ,4.退货并退款 -->
							{{ item._shopStatus }}

						</view>
					</view>
				</view>
			</view>

		</view>

		<view v-if="Alllist.length==0" class="default">
			<default-page  :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import shoppingListMixins from '../_orderMixins/shoppingListMixins.js';
	import { STATUS_MAP, MONEY_STATUS_MAP } from '@/js/constant';

	export default {
		name:'AfterService',
		
		mixins:[shoppingListMixins],
		onShow () {
			// if (uni.getStorageSync('_tempOrderId')) {
			// 	this.Alllist = [];
			// 	this.currentPage = 1;
			// 	this.getAllOrderData();
			// 	uni.removeStorageSync('_tempOrderId');
			// }
		},


		methods:{
			

			// 获取所有订单列表
			fetch(){
				if (this.loading || this.noMore) return;
				this.loading = true;
				this.showLoading();

				/**
				 * type - 0 仅退款 1 退货退款
				 * shopStatus - 店主处理状态 0待处理 1已撤销 2同意 3拒绝
				 */

				this.$api.getUserRefundList(this.currentPage).then(result => {
					
					this.hideLoading();
					this.loading = false;
					if (result.length === 0) {
						this.noMore = true;
					}

					result.forEach(item => {
						item._status = MONEY_STATUS_MAP[Number(item.type)];
						item._shopStatus = STATUS_MAP[Number(item.shopStatus)];
					})
					this.currentPage++;
					this.Alllist = this.Alllist.concat(result);
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
			// 去到店铺
			gotoShop(shopId){
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId='+shopId
				});
			},

			openOrderDetail (refundsId) {
				this.navigateTo('../myself_refundsDetail/myself_refundsDetail', {
					refundId: refundsId
					
				})
			},

		},
		
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';

	/* // 售后订单列表 */
	 page{width:100%;height: 100%;background: @grayBg;}
	.AllOrderListBox{
		.orderItemBox{
			width:100%;padding:15upx 0;
			.ListCenter{
				padding:30upx;
				.LCproductList{
					display: flex;
					flex-wrap:wrap;
					.PLitem{
						width:25%;margin-bottom:20upx;
						.Image{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
					}
				}
			}
			.ListHeader{
				width:100%;background: #fff;padding:30upx;
				.LHstoreName1{
					width:80%;text-align: left;
					.Image{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
				}
				.LHorderState{
					width:20%;text-align:right;
				}
			}
			.ListBottom{
				background: #fff;text-align:left;padding:30upx;
			}
		}
		
	}
	
	.default{
			position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
		}
</style>
