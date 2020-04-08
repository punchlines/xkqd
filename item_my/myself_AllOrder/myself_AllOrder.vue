<template>
	<view class="container">
		<!-- 全部订单列表 -->
		<view v-for="(item,index) in Alllist" :key="index">
			<view  class="AllOrderListBox">
				<view class="AOLlist" >
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName" @click="gotoShop(item.shopId)">
							<image class="Images" :src="item.shopCover"  mode="aspectFill"  lazy-load></image>
							<text class="fs3a28">{{item.shopName}}</text>
							<text class="fs3a28">{{item.title}}</text>
						</view>
						<!-- 1.待发货 2.待收货 3.已签收 4.待评价 5.已完成, 6退款/退货 (7.待退货 8.已退货 暂时不用)| todo.itemType,todo.refuseStatus-->
						<view class="LHorderState fs6a24">
						{{ item.payStatus }}
						</view>
					</view>
					<view class="ListCenter" @click="gotoOrderDetail(item._status,item.orderId)">
						<view class="LCproductList fx-row fx-row-center">
							<!--  todo.itemType,todo.refuseStatus-->
							<view class="PLitem" v-for="(todo,to) in item.goodsItems" :key="to" >
								<image class="Images" :src="todo.cover"  mode="aspectFill"  lazy-load></image>
								
							</view>
							<!-- <view class="title">123</view> -->
						</view>
					</view>
					<view class="ListBottom ListBottom1 fx-row fx-row-right" v-if="item.goodsItems && item.goodsItems[item.goodsItems.length-1]">
						<view class="LBproductNum fs3a28">
						共{{item.itemNum}}件商品，共¥{{item.payAmount}}
						</view>
					</view>
					<!-- <view class="ListBottom" v-if="todo.itemType">
						<view class="LBproductNum fs3a28">
							{{todo.itemType==1?'仅退款':todo.itemType==4?'退款并退货':''}}
							{{todo.refuseStatus==1?'申请失败':todo.refuseStatus==2?'申请成功':todo.refuseStatus==3?'待处理':''}}
						</view>
					</view> -->
				</view>
			</view>
		</view>

		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

		<view v-if="Alllist.length==0" class="default">
			<default-page  :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import shoppingListMixins from '../_orderMixins/shoppingListMixins.js';
	export default {
		name:'AllOrder',
		mixins:[shoppingListMixins],
		props: {
			status: {
				type: Number,
				default: 0
			}
		},

		methods:{
			
			// 获取订单列表
			fetch(){
				if (this.loading || this.noMore) return;
				this.loading = true;
				this.showLoading();
				const action = this.status<10?
				this.$api.getAllOrderData(this.status,this.currentPage):
				this.$api.saleOrderList(this.status%10,this.currentPage)
				
				
				action.then(res=>{
					this.hideLoading();
					this.loading = false;
					console.log(res);
					res.forEach(detail=>{
						const {payType,orderStatus,flowStatus} = detail;
						const status = Number(payType)*100 + Number(orderStatus)*10 + Number(flowStatus);
						detail._status = status;
						detail.payStatus = this.formatStatus(status);
					})
					this.currentPage++;
					this.Alllist = this.Alllist.concat(res);
					
					this.isLoading = false;
					
					if(res.length==0){
						this.noMore = true;
					}
					
				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';

	/* // 全部订单商品 */
	page{width:100%;height: 100%;background:@grayBg;}
	.AllOrderListBox{
		margin-top:20upx;
		.AOLlist{
			padding:15upx 0;
			.ListHeader{
				padding:30upx;width:100%;background: #fff;
				.LHstoreName{
					width:100%;
					.Images{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
					text{margin-left:15upx;}
				}
				.LHorderState{
					width:20%;text-align: right;
				}
			}
		}
		.ListCenter{
			background:@grayBg;padding:30upx;
			.LCproductList{
				flex-wrap:wrap;
				align-items: flex-start;
				.PLitem{
					width:25%;margin-bottom:20upx;
					.Images{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
					
				}
				.title{font-size: 25upx; margin-left: 20upx;}
			}
		}
		.ListBottom{
			background: #fff;padding:30upx;
		}
		.ListBottom{margin-bottom:10upx;}
	}
	.default{
		position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
	}
</style>

