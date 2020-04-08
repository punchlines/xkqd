<template>
	<view class="container1">
		<!-- 待发货订单列表 -->
		<view class="AllOrderListBox" v-for="(item,index) in AllList" :key="index">
			<!-- <view class="AllOrderListBox" v-for="(it,ind) in item.shopList" :key="ind"> -->
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName" @click="gotoShop(item.shopId)">
							<image :src="item.shopCover" mode="aspectFill" class="Image"></image>
							<text class="fs3a28">{{item.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24">买家已评价</view>
					</view>
				</view>
				<view class="ListCenter" @click="gotoReceiveDetail(item.itemId)">
					<view class="LCproductList fx-row fx-row-center">
						<view class="PLitem" >
							<image :src="item.cover" mode="aspectFill" class="Amage"></image>
						</view>
					</view>
				</view>
				<view class="ListBottom">
					<!-- <view class="LBproductNum fs3a28 fx-row-right">共2件商品，共¥156.00</view> -->
					<view class="LBproductNum fs3a28 fx-row-right">共 1 件商品，共¥{{item.goodsTotalPrice}}</view>
				</view>
				<view class="sendProduct fx-row fx-row-right">
					<!-- <view class="SendButton SendButton1 fs6a24" @click="gotoLog(item.childId,item.expressNum,item.expressCompany)">查看物流</view> -->
					<!-- <view class="SendButton fs6a24" @click="gotoComment(item.childId)">查看评价</view> -->
				</view>
			<!-- </view> -->
		</view>
	<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
		<view v-if="AllList.length==0" class="default">
			<default-page  :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	export default {
		name:'myself_salesOrderWaitSend',
		components: {
			uniLoadMore,
		},
		data() {
			return {
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
					title:'您当前没有订单'
				},
				showDefaultPage:false,
				AllList:[],
				userType:0,
				loading:false,
				noMore:false,
				currentPage:1
			};
		},
		
		computed: {
		  loadingType() {
			if (this.noMore) return 2;
			if (this.loading) return 1;
			return 0;
		  },
		  showLoadMore () {
			return this.AllList.length > 0;
		  },
		},
		mounted() {
			this.fetch();
			this.userType=uni.getStorageSync('userType');
		},
		methods:{
			// 获取销售订单待发货商品列表
			refetch(){
				this.noMore=false;
				this.currentPage=1;
				this.loading=false;
				this.AllList.length=0;
				this.fetch();
			},
			
			fetch(){
				if(this.loading || this.noMore) return
				this.showLoading();
				this.loading = true;
				this.$api.getAppraiseList(this.currentPage).then(res=>{
					this.hideLoading();
					this.currentPage++;
					this.loading = false;
					if(res.length==0){
						return this.noMore=true;
					}
					
					
					this.AllList = this.AllList.concat(res);
					
					
					
					// if(!res){
					// 	
					// 	return
					// }
					// 
					// 
					// 
					// res.orderMessage.forEach(detail=>{
					// 	if(detail.orderItemList){
					// 		detail.orderItemList.forEach(item=>{
					// 			item.goodsAmount=this.formatPrice(item.goodsAmount)
					// 		})
					// 	}
					// })
					// 
					// console.log(res);
					// this.saleOrderWaitSend=res.orderMessage;

				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
				})
			},
			// 查看评论
			gotoComment(childId){
				uni.navigateTo({
					url: '../myself_salesOrderComment/myself_salesOrderComment?childId='+childId,
				})
			},
			// 查看物流
			gotoLog(childId,expressNum,expressCompany){
				uni.navigateTo({
					url: '../myself_logisticsInformation/myself_logisticsInformation?childId='+childId+'&expressNum='+expressNum+'&expressCompany='+expressCompany,
				})
			},
			// 待收货详情
			gotoReceiveDetail(itemId){
				uni.navigateTo({
					url: '../myself_salesOrderComment/myself_salesOrderComment?itemId='+itemId
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
		.sendProduct {
			padding-bottom: 20upx;
			.SendButton {
				margin-right: 20upx;
				color: #6B7AF8;
				.buttonRadius(@w: 160upx, @h: 60upx, @bg: none);
				border: 1upx solid #6B7AF8;
			}
			.SendButton1 {
				color: #666666;
				border-color: #666;
			}
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
