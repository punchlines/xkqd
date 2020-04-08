/**
 * shoporderMixins
 * 
 */
import uniLoadMore from '@/template/uni-load-more.vue';
export default{
	components: {
			uniLoadMore,
	},
	data() {
		return {
			// 待评价订单列表
			Alllist:[],
			showDefaultPage:false,
			messageToPage:{
				image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
				title:'您当前没有订单'
			},
			currentPage: 1,
			loading: false,
			noMore: false,
		};
	},
	
	computed: {
	  loadingType() {
		if (this.noMore) return 2;
		if (this.loading) return 1;
		return 0;
	  },
	  showLoadMore () {
		return this.Alllist.length > 0;
	  },
	},
	
	mounted () {
			this.fetch();
	},
	
	methods:{
			fetch(){
				
			},
			
			refetch(){
				this.Alllist.length=0;
				this.loading=false;
				this.noMore=false;
				this.currentPage=1;
				this.fetch();
				uni.setStorageSync('_needUpdateShopOrder',false)
				uni.setStorageSync('_needUpdateSaleOrder',false)
			},
		
			//订单状态格式化
			formatStatus (status) {
				/**
				 *  os: 0=待支付 1=支付成功 2=支付失败 3=取消支付 4=订单超时 5=仅退款 6=退货退款 7=仅退货 8=特殊状态（正在申请全单售后）
				 *  t:  0 -在线 1-货到付款
				 *  fs: 物流状态 -1=未确认 0=未发货 1=已发货 2=已签收 3=退货
				 */
				
				//console.log(status)
				return {
					"-1":"待付款",
					"10":"待发货",
					"11":"待收货",
					"12":"已完成",
					"39":"已失效",
					"29":"已取消",
					"9":"已取消",
					"100":"待发货",
					"101":"待收货",
					"102":"已完成",
					"99":"待发货"
				}[status]
			},
			// 去到店铺
			gotoShop(shopId){
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId='+shopId
				});
			},
			// 去到详情
			gotoOrderDetail(status,orderId){
				let url = "";
				
				switch(status){
					case -1:
						url = '../myself_waitPayDetail/myself_waitPayDetail';break;
					case 10:
					case 39:
					case 29:
					case 9:
					case 100:
					case 102:
						url = '../myself_waitSendDetail/myself_waitSendDetail';break;
					case 11:
					case 12:
					case 101:
						url = '../myself_waitReceiveDetail/myself_waitReceiveDetail';break;
					default:
						break;
				}
				
				url = `${url}?childId=${orderId}&status=${this.status}&_status=${status}`;
				uni.navigateTo({url})
				
				
				/*
				if(flowStatus==1){
					uni.navigateTo({
						url: '../myself_waitSendDetail/myself_waitSendDetail?childId='+childId
					})
				}else if(flowStatus==2){
					uni.navigateTo({
						url: '../myself_waitReceiveDetail/myself_waitReceiveDetail?childId='+childId
					})

				}else if(flowStatus==3||flowStatus==4){
					uni.navigateTo({
						url: '../myself_waitEvaluateDetail/myself_waitEvaluateDetail?childId='+childId
					})
				}
				else if(flowStatus==5){
					uni.navigateTo({
						url: '../myself_waitCompletedDetail/myself_waitCompletedDetail?childId='+childId
					})
				}else if(flowStatus==6){
					// 6退款/退货
					// itemType 类型：1.仅退款 4.退款退货    // refuseStatus 1.拒绝 2.同意 3.待处理
					// 仅退款，待处理(1,3)   仅退款，同意(1,2)    仅退款，拒绝(1,1)
					// 退款退货,待处理(4,3)  退款退货,同意(4,2) 退款退货,拒绝(4,1)

					uni.navigateTo({
						url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=0&childId='+childId
					});

// 					if(itemType==1&&refuseStatus==3){
// 						uni.navigateTo({
// 							url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=0&childId='+childId
// 						});
// 					}else if(itemType==1&&refuseStatus==2){
// 						uni.navigateTo({
// 							url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=1&childId='+childId
// 						});
// 					}else if(itemType==1&&refuseStatus==1){
// 						uni.navigateTo({
// 							url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=2&childId='+childId
// 						});
// 					}else if(itemType==4&&refuseStatus==3){
// 						uni.navigateTo({
// 							url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=3&childId='+childId
// 						});
// 					}else if(itemType==4&&refuseStatus==2){
// 						uni.navigateTo({
// 							url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=4&childId='+childId
// 						});
// 					}else if(itemType==4&&refuseStatus==1){
// 						uni.navigateTo({
// 							url: '../myself_refundsDetail/myself_refundsDetail?refuseStatusAitemType=5&childId='+childId
// 						});
// 					}
				}else{
					// 待付款
					uni.navigateTo({
						url: '../myself_waitPayDetail/myself_waitPayDetail?childId='+childId
					});
				}
				*/
			}
			
	}
	
}
