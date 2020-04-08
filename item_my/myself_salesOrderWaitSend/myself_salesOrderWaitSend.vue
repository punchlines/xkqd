<template>
	<view class="container1">
		<!-- 待发货订单列表 -->
		<view class="AllOrderListBox" v-for="(item,index) in saleOrderWaitSend" :key="index">
			<!-- <view class="AllOrderListBox" v-for="(it,ind) in item.shopList" :key="ind"> -->
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName" @click="gotoShop(item.shopId)">
							<image :src="item.logo" mode="aspectFill" class="Image"></image>
							<text class="fs3a28">{{item.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24">待发货</view>
					</view>
				</view>
				<view class="ListCenter" @click="gotoWaitSendDetail(item.childId)">
					<view class="LCproductList fx-row fx-row-center">
						<view class="PLitem" v-for="(todo,to) in item.orderItemList" :key="to">
							<image :src="todo.goodsImage" mode="aspectFill" class="Amage"></image>
						</view>
					</view>
				</view>
				<view class="ListBottom">
					<!-- <view class="LBproductNum fs3a28 fx-row-right">共2件商品，共¥156.00</view> -->
					<view v-if="item.orderItemList[item.orderItemList.length-1]" class="LBproductNum fs3a28 fx-row-right">共{{item.orderItemList[item.orderItemList.length-1].goodsNum}}件商品，共¥{{item.orderItemList[item.orderItemList.length-1].goodsAmount}}</view>
				</view>
				<view class="sendProduct fx-row fx-row-right">
					<view v-if="userType==2||userType==3||userType==4" class="SendButton fs6a24" @click="gotoSendProduct(item.childId)">发货</view>
				</view>
			<!-- </view> -->
		</view>

		<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>

		<view v-if="saleOrderWaitSend.length==0" class="default">
			<default-page  :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';

	export default {
		name:'myself_salesOrderWaitSend',
		data() {
			return {
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
					title:'您当前没有订单'
				},
				showDefaultPage:false,
				saleOrderWaitSend:[],
				userType:0,
				currentPage: 1,
				loading: false,
				noMore: false,
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
		    return this.saleOrderWaitSend.length > 0;
		  },
		},
		onLoad() {
			this.saleGoodsStatus();
			this.userType=uni.getStorageSync('userType');
		},
		onShow () {
			if (uni.getStorageSync('_tempOrderId')) {
				this.saleOrderWaitSend = [];
				this.currentPage = 1;
				this.saleGoodsStatus();
				this.userType=uni.getStorageSync('userType');
				uni.removeStorageSync('_tempOrderId');
			}
		},
		methods:{
			// 获取销售订单待发货商品列表
			saleGoodsStatus(){
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.saleGoodsStatus(1,this.currentPage,20).then(res=>{
					this.hideLoading();
					this.loading = false;
					if(!res){
						
						return
					}
					
					res.orderMessage.forEach(detail=>{
						if(detail.orderItemList){
							detail.orderItemList.forEach(item=>{
								item.goodsAmount=this.formatPrice(item.goodsAmount)
							})
						}
					})
					console.log(res);
					
					this.currentPage++;
					this.saleOrderWaitSend = this.saleOrderWaitSend.concat(res.orderMessage);
					// this.saleOrderWaitSend=res.orderMessage;
				}).catch(error=>{
					this.hideLoading();
					this.loading = false;
					this.showError(error);
				})
			},
			// 待发货详情
			gotoWaitSendDetail(childId){
				uni.navigateTo({
					url: '../myself_salesOrderWaitSendDetail/myself_salesOrderWaitSendDetail?childId='+childId
				});
			},
			// 发货
			gotoSendProduct(childId){
				uni.navigateTo({
					url: '../myself_salesOrderSendsGoods/myself_salesOrderSendsGoods?childId='+childId + '&first=1'
				});
			},
			// 去到店铺
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

<style scoped lang="less">
	@import '../../css/mzl_base.less';

	/* // 待发货订单列表 */
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
					.Amage{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
				}
			}
		}
		.sendProduct{
			padding-bottom:20upx;
			.SendButton{
				margin-right:20upx;color:#6B7AF8;.buttonRadius(@w:160upx,@h:60upx,@bg:none);border:1upx solid #6B7AF8;
			}
			.SendButton1{color:#666666;border-color:#666;}
		}
		.ListBottom{
			background: #fff;text-align: right;padding:30upx;
		}
	}
	.default{
		position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
	}
</style>
<style lang="less">
	.Image{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
	.Amage{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
</style>
