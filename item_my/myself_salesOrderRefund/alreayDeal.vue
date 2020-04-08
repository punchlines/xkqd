<template>
	<view class="container1">
		<view style="background:#f5f5f5;">
			<!--售后订单列表 待处理 -->
			<view class="AllOrderListBox" v-for="(item,index) in arealyDeal" :key="index" @click="gotoServiceDetail(item.refundId)">
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName">
							<image :src="item.logo" class="Image"></image>
							<text class="fs3a28">{{item.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24"></view>
					</view>
				</view>
				<view class="ListCenter">
					<view class="LCproductList fx-row fx-row-center">
						<view class="PLitem" v-for="(goods, index2) in item.itemList" :key="goods.goodsId">
							<image :src="goods.goodsImage" class="Image"></image>
						</view>
					</view>
				</view>
				<view class="ListBottom fx-row fx-clo-center fx-row-left">
					<view class="LBproductNum fs3a28 ">{{item.type==1?'仅退款':'退款并退货'}}，{{ item._status }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'AfterService',
		data() {
			return {

			};
		},
		props: {
			arealyDeal:{
				type:Array,
				default:[]
			}
		},
		methods:{
			// 已处理 
			gotoServiceDetail (refundId){
				uni.navigateTo({
					// url: '../myself_salesOrderRefundsDetail/myself_salesOrderRefundsDetail?Sstate=0'
					url: '../myself_salesOrderRefundsDetail/myself_salesOrderRefundsDetail?refundId='+refundId
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';
	/* // 售后订单列表 */
	.AllOrderListBox{
		margin-top:40upx;background: #fff;
		.AOLlist{
			.ListHeader{
				padding:30upx;
				.LHstoreName{
					width:80%;
					.Image{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
				}
				.LHorderState{
					width:20%;text-align: right;
				}
			}
		}
		.ListCenter{
			background:@grayBg;padding:30upx;
			.LCproductList{
				.PLitem{
					.Image{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
				}
			}
		}
		.ListBottom{
			background: #fff;text-align:left;padding:30upx;
		}
	}
</style>
