<template>
	<view class="container1">
		<!-- 待发货订单列表 -->
		<view v-for="(item,index) in Alllist" :key="index">
			<view  class="AllOrderListBox">
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName" @click="gotoShop(item.shopId)">
							<image class="Image" :src="item.shopCover"  mode="aspectFill"  lazy-load></image>
							<text class="fs3a28">{{item.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24">待发货</view>
					</view>
				</view>
				<!-- <view v-for="(todo,to) in it.orderItemList" :key="to" @tap="gotoWaitSendDetail(todo.goodsId)"> -->
					<view class="ListCenter" @click="gotoOrderDetail(item._status,item.orderId)">
						<view class="LCproductList fx-row fx-row-center">
							<view class="PLitem" v-for="(todo,to) in item.goodsItems" :key="to">								
								<image :src="todo.goodsImage" mode="aspectFill" class="Image"></image>
							</view>
						</view>
					</view>
					<view class="ListBottom">
						<view v-if="it.orderItemList[it.orderItemList.length-1]" class="LBproductNum fs3a28 fx-row-right">共{{it.orderItemList[it.orderItemList.length-1].goodsNum}}件商品，共¥{{it.orderItemList[it.orderItemList.length-1].goodsAmount}}</view>
					</view>
				<!-- </view> -->
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
	export default {
		name:'WaitSend',
		data() {
			return {
				// 待发货订单列表
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
		components: {
			uniLoadMore,
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
		methods:{
			// 去到详情
			gotoWaitSendDetail(childId){
				console.log(childId);
				uni.navigateTo({
					url: '../myself_waitSendDetail/myself_waitSendDetail?childId='+childId
				});
			},
			// 去到店铺
			gotoShop(shopId){
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId='+shopId
				});
			},
			// 获取待发货商品列表
			fetch(){
				if (this.loading || this.noMore) return;
				this.loading = true;
				this.showLoading();
				this.$api.getAllOrderData(1,this.currentPage,20).then(res=>{
					this.hideLoading();
					this.loading = false;
					console.log(res);
					res.orderMessage.forEach(detail=>{
						if(detail.shopList){
							detail.shopList.forEach(list=>{
								list.orderItemList.forEach(item=>{
									item.goodsAmount=this.formatPrice(item.goodsAmount)
								})
							})
						}
					})
					this.currentPage++;
					this.Alllist = this.Alllist.concat(res.orderMessage);
					// this.Alllist=res.orderMessage;
					if(res.length==0){
						this.noMore = true;
					}
				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			}
		},
		onLoad() {
			this.getAllOrderData();
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
				// padding:30upx;
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
				flex-wrap:wrap;
				.PLitem{
					width:25%;margin-bottom:20upx;
					.Image{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
				}
			}
		}
		.ListBottom{
			background: #fff;text-align: right;padding:30upx;
		}
	}
</style>
<style lang="less">
	.default{
		position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
	}
</style>
