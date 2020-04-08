<template>
	<view class="container">
		<!-- 订单导航 -->
		<view class="OrderHeaderBox">
			<view class="OHlist fx-row fx-row-center fx-row-space-around">
				<view :class="{'OHitem':true,'fs6a28':true,'OHactive':index==orderAction}" 
					v-for="(item,index) in orderHeader" :key="index" @click="changeTitle(index)">
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 全部订单 -->
		<view class="ALLproduct"  v-if="orderAction==0">
			<AllOrder ref="list0" status="10"></AllOrder>
		</view>
		<!-- 待发货 -->
		<view class="WaitSend"  v-if="orderAction==1">
			<AllOrder ref="list1" status="11"></AllOrder>
		</view>
		<!-- 待收货 -->
		<view class="WaitReceive"  v-if="orderAction==2">
			<AllOrder ref="list2" status="12"></AllOrder>
		</view>
		<!-- 待评价 -->
		<view class="WaitEvaluate"  v-if="orderAction==3">
			<WaitEvaluate ref="list3"></WaitEvaluate>
		</view>
		<!-- 售后 -->
		<view class="AfterService"  v-if="orderAction==4">
			<AfterService ref="list4"></AfterService>
		</view>
	</view>
</template>

<script>
	import AllOrder from '../myself_AllOrder/myself_AllOrder.vue';
	import WaitSend from '../myself_salesOrderWaitSend/myself_salesOrderWaitSend.vue';
	import WaitReceive from '../myself_salesOrderWaitReceive/myself_salesOrderWaitReceive';
	import WaitEvaluate from '../myself_salesOrderWaitEvaluate/myself_salesOrderWaitEvaluate';
	import AfterService from '../myself_salesOrderRefund/myself_salesOrderRefund.vue';
	export default {
		data() {
			return {
				// 订单导航
				orderHeader:[
					{id:0,title:'全部'},
					{id:1,title:'待发货'},
					{id:2,title:'待收货'},
					{id:3,title:'已评价'},
					{id:4,title:'退款/退货'}
				],
				orderAction:0
				
			};
		},
		onReachBottom() {
			console.log(this.$refs,'list'+this.orderAction);
			this.$refs['list'+this.orderAction].fetch();
		},
		methods:{
			// 切换导航标题
			changeTitle(index){
				this.orderAction=index;
			
			}
		},
		components:{
			AllOrder,
			WaitSend,
			AfterService,
			WaitReceive,
			WaitEvaluate,
		},
		onLoad(options) {
			this.orderAction=options.orderAction || 0;

			// console.log(options.index);
			if(options.index){
				var ind=(Number(options.index))+1;
				this.orderAction=ind;	
			}
		},
			onShow() {
			if(uni.getStorageSync('_needUpdateSaleOrder')){
				this.$refs['list'+this.orderAction].refetch();
			}
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		width:100%;background:@grayBg;
		min-height: 100vh;
		// 订单导航
		.OrderHeaderBox{
			width:100%;hieght:88upx;line-height:88upx;background:#fff;border-top:1upx solid @grayBg;
			.OHlist{
				.OHitem{
					text-align:center;padding:0 10upx;
				}
				.OHactive{
					color:@tabActive;border-bottom:5upx solid @tabActive;
				}
			}
		}
		
	}
</style>
