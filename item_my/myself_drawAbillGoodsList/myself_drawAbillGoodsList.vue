<template>
	<view class="container">
		<!-- 待发货订单列表 -->
		<view v-if="shoppingCart.length>0" class="AllOrderListBox" v-for="(item,index) in shoppingCart" :key="index">
			<view class="AOLlist">
				<view class="ListHeader fx-row fx-row-center fx-row-space-around">
					<view class="LHstoreName" @click="gotoShore(item.shopId)">
						<default-image :src="item.shopLogo" custom-class="Pimage"></default-image>
						<text class="fs3a28">{{item.shopName}}</text>
					</view>
					<view class="LHorderState fs6a24" @click="drawAbill(item.orderId,item.phone,item.payAmount)">开发票</view>
				</view>
			</view>
			<view class="ListCenter" @click="gotoGoodsDetails(item.orderId)">
				<view class="LCproductList">
					<view class="PLitem">
						<default-image v-for="(image,imageIndex) in item.itemMessage" :key="imageIndex" :src="image.goodsImage" custom-class="Pimage"></default-image>
					</view>
				</view>
			</view>
			<view class="ListBottom">
				<view class="LBproductNum fs3a28 fx-row-right">共{{item.goodsNum}}件商品，共¥{{item.payAmount}}</view>
			</view>
		</view>
		<view v-if="showDefaultPage" class="default">
			<default-page :messageToPage="messageToPage"></default-page>
		</view>
	</view>
</template>

<script>
	import js from '../../js/util.js';
	export default {
		name:'myself_salesOrderWaitSend',
		data() {
			return {
				// 待发货订单列表
				shoppingCart:[],
				messageToPage:{
				  image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
				  title:'您当前没有订单'
				},
				showDefaultPage:false,
			};
		},
		methods:{
			// 开具发票
			drawAbill(orderId,phone,payAmount){
				uni.navigateTo({
					url: '../myself_drawAbillInform/myself_drawAbillInform?orderId='+orderId+'&phone='+phone+'&goodsAmount='+payAmount
				});
			},
			// 到店铺
			gotoShore(shopId){
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId='+shopId
				});
			},
			// 到订单详情
			gotoGoodsDetails(orderId){
				console.log('orderId:'+orderId);
				uni.navigateTo({
					url: '../myself_waitEvaluateDetail/myself_waitEvaluateDetail?childId='+orderId
				});
			},
			//获取开发票的商品列表
			getInvoice(){
				this.$api.getInvoiceMessage(1).then(res=>{
					console.log(res);
					if(res.invoiceDetail.length==0){
						this.showDefaultPage=true;
						return;
					}
					this.shoppingCart=res.invoiceDetail;
				}).catch(error=>{
					this.showError(error);
				})				
			}
		},
		onLoad() {
			this.getInvoice();
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{width:100%;height: 100%;background:@grayBg;}
	.AllOrderListBox{
		margin-top:40upx;background: #fff;
		.AOLlist{
			.ListHeader{
				padding:30upx;
				.LHstoreName{
					width:80%;
					.Pimage{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
				}
				.LHorderState{
					width:20%;text-align: right;.buttonRadius(@w:160upx,@h:60upx,@bg:none);border:1upx solid #6B7AF8;color:#6B7AF8;
					background:rgba(244,245,255,1);
				}
			}
		}
		.ListCenter{
			background:@grayBg;padding:30upx;
			.LCproductList{
				.PLitem{
					.Pimage{width:160upx;height: 160upx;vertical-align: middle;margin-right:30upx;}
				}
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
