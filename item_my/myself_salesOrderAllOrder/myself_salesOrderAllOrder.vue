<template>
	<view class="container">
		<!-- 全部订单列表 -->
		<view class="AllOrderListBox" v-for="(item,index) in saleGoodsAllList" :key="index">
			<view class="AOLlist">
				<view class="ListHeader fx-row fx-row-center fx-row-space-around">
					<view class="LHstoreName" @click="gotoShop(item.shopId)">
						<image :src="item.logo" mode="aspectFill" class="Image"></image>
						<text class="fs3a28">{{item.shopName}}</text>
					</view>
					<!-- flow_status 物流状态 1.待发货 2.待收货 3.已签收 4.待评价 5.已完成, 6退款/退货 (7.待退货 8.已退货 暂时不用)| -->
					<view class="LHorderState fs6a24">
					{{item.flowStatus==1?'待发货':item.flowStatus==2?'待收货':item.flowStatus==3?'已签收':item.flowStatus==4?'待评价':item.flowStatus==5?'已完成':item.flowStatus==6?'退款/退货':''}}
					</view>
				</view>
			</view>
			<view class="ListCenter" @click="gotoOrderDetail(item.childId,item.flowStatus)">
				<view class="LCproductList fx-row fx-row-center fx-row-left">
					<view class="PLitem" v-for="(todo,to) in item.orderItemList" :key="to">
						<image :src="todo.goodsImage" mode="aspectFill" class="Image"></image>
					</view>
				</view>
			</view>
			<view class="ListBottom fx-row fx-row-right" v-if="item.orderItemList[item.orderItemList.length-1]">
				<view class="LBproductNum fs3a28">
					<view  class="LBproductNum fs3a28 fx-row-right">
						共{{item.orderItemList[item.orderItemList.length-1].goodsNum}}件商品，共¥{{item.orderItemList[item.orderItemList.length-1].goodsAmount}}
					</view>
				</view>
			</view>
			<view class="sendProduct fx-row fx-row-center fx-row-right">
				<view @click="gotoLog(item.childId,item.expressNum,item.expressCompany)" v-if="item.flowStatus==4" class="SendButton SendButton1  fs6a24">{{item.flowStatus==4?'查看物流':''}}</view>

				<!-- 店主发货 -->
				<view v-if="userType==2&&item.flowStatus==1||userType==3&&item.flowStatus==1||userType==4&&item.flowStatus==1"
					@click="gotoStateDetail(item.flowStatus,item.childId,item.expressNum,item.expressCompany)" class="SendButton fs6a24">发货
				</view>

				<!-- 员工查看 -->
				<view v-if="userType==5&&item.flowStatus>1||userType==6&&item.flowStatus>1"
					@click="gotoStateDetail(item.flowStatus,item.childId,item.expressNum,item.expressCompany)" class="SendButton fs6a24">
					{{item.flowStatus==1?'发货':item.flowStatus==2?'查看物流':item.flowStatus==3?'已签收':item.flowStatus==4?'待评价':item.flowStatus==5?'查看评论':item.flowStatus==6?'退款/退货':''}}
				</view>
			</view>
		</view>

		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

		<view v-if="saleGoodsAllList.length==0" class="default">
			<default-page  :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	export default {
		name:'myself_salesOrderAllOrder',
		data() {
			return {
				showDefaultPage:false,
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
					title:'您当前没有订单'
				},
				saleGoodsAllList:[],
				userType:0,
				currentPage: 1,
				loading: false,
				noMore: false,

				onLoad: false,
			};
		},
		components: {
			uniLoadMore,
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.saleGoodsStatus();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.saleGoodsAllList.length > 0;
		  },
		},
		mounted() {
			this.saleGoodsStatus();
		},

		onShow () {
			if (uni.getStorageSync('_tempOrderId')) {
				this.saleGoodsAllList = [];
				this.currentPage = 1;
				this.saleGoodsStatus();
				uni.removeStorageSync('_tempOrderId');
			}
		},

		methods:{
			// 获取所有销售订单列表
			saleGoodsStatus(){
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.saleOrderList(0,this.currentPage).then(res=>{
					this.hideLoading();
					this.loading = false;
					if(!res){
						//this.saleGoodsAllList = [];
						return;
					}
					res.orderMessage.forEach(detail=>{
						if(detail.orderItemList){
							detail.orderItemList.forEach(item=>{
								item.goodsAmount=this.formatPrice(item.goodsAmount)
							})
						}
					})
					if(res&&res.orderMessage.length==0){
						this.showDefaultPage=true;
						this.noMore = true;
					}
					this.currentPage++;
					this.saleGoodsAllList = this.saleGoodsAllList.concat(res.orderMessage);
					// this.saleGoodsAllList=res.orderMessage;
				}).catch(error=>{
					this.hideLoading();
					this.loading = false;
					this.showError(error);
				})
			},
			// 跳转到待发货详情、待收货、待评价
			gotoOrderDetail(childId,flowStatus){
				// <!-- flow_status 物流状态 1.待发货 2.待收货 3.已签收 4.待评价 5.已完成, 6退款/退货 (7.待退货 8.已退货 暂时不用)| -->
				if(flowStatus==1){
					uni.navigateTo({
						url: '../myself_salesOrderWaitSendDetail/myself_salesOrderWaitSendDetail?childId='+childId,
					})
				}else if(flowStatus==2){
					uni.navigateTo({
						url: '../myself_salesOrderWaitReceiveDetail/myself_salesOrderWaitReceiveDetail?childId='+childId,
					})
				}else if(flowStatus==4){
					uni.navigateTo({
						url: '../myself_salesOrderWaitEvaluateDetail/myself_salesOrderWaitEvaluateDetail?childId='+childId,
					})
				}else if(flowStatus==5){
					uni.navigateTo({
						url: '../myself_salesOrderCompletedDetail/myself_salesOrderCompletedDetail?childId='+childId,
					})
				}
			},
			// 查看状态，发货，物流，评价
			gotoStateDetail(flowStatus,childId,expressNum,expressCompany){
				// <!-- flow_status 物流状态 1.待发货 2.待收货 3.已签收 4.待评价 5.已完成, 6退款/退货 (7.待退货 8.已退货 暂时不用)| -->
				// 待发货
				if(flowStatus==1){
					uni.navigateTo({
						url: '../myself_salesOrderSendsGoods/myself_salesOrderSendsGoods?childId='+childId,
					})
				}else if(flowStatus==2){
					// 待收货
					uni.navigateTo({
						url: '../myself_logisticsInformation/myself_logisticsInformation?childId='+childId+'&expressNum='+expressNum+'&expressCompany='+expressCompany,
					})
				}else if(flowStatus==3){
					// 已签收
				}else if(flowStatus==4){
					// 待评价
					uni.navigateTo({
						url: '../myself_salesOrderWaitEvaluateDetail/myself_salesOrderWaitEvaluateDetail?childId='+childId,
					})
				}else if(flowStatus==5){
					// 已完成  去到查看评价
					uni.navigateTo({
						url: '../myself_salesOrderComment/myself_salesOrderComment?childId='+childId,
					})
				}else if(flowStatus==6){
					// 退款/退货
				}
			},
			// 查看物流
			gotoLog(childId,expressNum,expressCompany){
				uni.navigateTo({
					url: '../myself_logisticsInformation/myself_logisticsInformation?childId='+childId+'&expressNum='+expressNum+'&expressCompany='+expressCompany,
				})
			},
			// 去到我的店铺
			gotoShop(shopId){
				if(this.userType==2||this.userType==3||this.userType==4){
					uni.navigateTo({
						url: '../../item_businessCard/businessCard_MyShop/businessCard_MyShop?shopId='+shopId
					});
				}else{
					uni.navigateTo({
						url: '../../module/shop/home/home?shopId='+shopId
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';

	/* // 全部订单商品 */
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
				flex-wrap: wrap;
				.PLitem{
					margin-bottom:20upx;width:25%;
					.Image{width:150upx;height: 150upx;vertical-align: middle;margin-right:20upx;}
				}
			}
		}
		.ListBottom{
			background: #fff;padding:30upx;
		}
		.sendProduct{
			padding-bottom:20upx;
			.SendButton{
				margin-right:20upx;color:#6B7AF8;.buttonRadius(@w:160upx,@h:60upx,@bg:none);border:1upx solid #6B7AF8;
			}
			.SendButton1{color:#666666;border-color:#666;}
		}
	}
	.default{
		position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
	}
</style>
