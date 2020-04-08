<template>
	<view class="container1">
		<!-- 待收货订单列表 -->
		<view v-for="(item,index) in Alllist" :key="index">
			<view class="AllOrderListBox" v-for="(it,ind) in item.shopList" :key="ind">
				<view class="AOLlist">
					<view class="ListHeader fx-row fx-row-center fx-row-space-around">
						<view class="LHstoreName" @click="gotoShop(it.shopId)">
							<image :src="it.logo"  mode="aspectFill" class="Image"></image>
							<text class="fs3a28">{{it.shopName}}</text>
						</view>
						<view class="LHorderState fs6a24">待收货</view>
					</view>
				</view>
				<!-- <view v-for="(todo,to) in it.orderItemList" :key="to"  @tap="gotoWaitReceiveDetail(todo.goodsId)"> -->
					<view class="ListCenter" @click="gotoWaitReceiveDetail(it.childId)">
						<view class="LCproductList fx-row fx-row-center">
							<view class="PLitem" v-for="(todo,to) in it.orderItemList" :key="to">
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
		name:'WaitReceive',
		data() {
			return {
				// 待收货订单列表
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
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.getAllOrderData();
		},
		onShow () {
			if (uni.getStorageSync('_tempOrderId')) {
				this.Alllist = [];
				this.currentPage = 1;
				this.getAllOrderData();
				uni.removeStorageSync('_tempOrderId');
			}
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
			// 去到店铺
			gotoShop(shopId){
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId='+shopId
				});
			},
			// 去到详情
			gotoWaitReceiveDetail(childId){
				uni.navigateTo({
					url: '../myself_waitReceiveDetail/myself_waitReceiveDetail?childId='+childId
				});
			},
			// 获取待收货商品列表
			getAllOrderData(){
				if (this.loading) return;
				this.loading = true;
				this.showLoading();
				this.$api.getAllOrderData(2,this.currentPage,20).then(res=>{
					this.hideLoading();
					this.loading = false;
					// console.log(res);
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
					let is_showDefault=false;
					if(res&&res.orderMessage.length==0){
						is_showDefault=true;
						this.noMore = true;
					}
					for(let i of res.orderMessage){
						if(i.shopList){
							is_showDefault=false
							return;
						}
						else{
							is_showDefault=true;
						}
					}
					if(is_showDefault){
						this.showDefaultPage=true;
					}else{
						this.showDefaultPage=false;
					}
				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
		},
		onLoad() {
			this.getAllOrderData();
		}
	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';

	/* // 待收货订单列表 */
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
