<template>
	<view class="container page">
		<view v-if="Detail" >
			<!-- 收货人信息 -->
			<view class="Receive">
				<view class="ReceiveName fs3a32 fx-row fx-row-center fx-row-space-around">
					<view class="RAname">
						<view>{{Detail.name?Detail.name:''}}</view>
					</view>
					<view class="Rphone fs3a32 fx-row fx-row-space-around">
						<view class="Pnum">{{Detail.phone}}</view>
					</view>
				</view>
				<view class="ReceiveAdree fs6a28 fx-row  fx-row-space-around">
					<view class="RAadree">收货地址：</view>
					<view class="RAdetail">{{Detail.address}}</view>
				</view>
			</view>
			<!-- 收货商品 -->
			<view class="ReceiveProduct">
				<view class="RPlist">
					<view class="PLshoreName" @click="gotoShop(Detail.shopId)">
						<default-image :src="Detail.shopCover" custom-class="Pimage"></default-image>
						<text class="fs3a28">{{Detail.shopName}}</text>
						<image class="PLimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jinru.png'" mode=""></image>
					</view>
					<view class="ProductList" v-for="(item,index) in Detail.items" :key="index">
						<view class="ProductItem fx-row fx-row-center fx-row-space-around">
							<view class="PIimage"  @click="gotoGoodsDetail(item.goodsId)">
								<default-image :src="item.cover" custom-class="Pimage"></default-image>
							</view>
							<view class="PIinformation">
								<view class="PFheader">
									<view class="Htitle fs3a28">{{item.title?item.title:""}}</view>
								</view>
								<view class="Hdescript fs6a24">
									{{item.attributesDesc}}
								</view>
								<view class="Hprice fx-row fx-row-center fx-row-space-around">
									<view class="price"><text>¥ </text> {{item.goodsPrice}}</view>
									<view class="Num fs6a24">× {{item.goodsNum}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="RPdetail fs6a24">
					<view class="DallPrice">商品总价：¥{{Detail.goodsAmount}}</view>
					<view class="Dfreight">运费：¥{{Detail.expressFee}}</view>
					<view class="DCoupon">优惠券：-¥{{Detail.discountAmount}}</view>
					<view class="DorderTotalPrice">订单总价：¥{{Detail.payAmount}}</view>
				</view>
				<view class="PRrealPayment fs3a28">
					<text class="picon">¥ </text>
					<text class="price">{{Detail.payAmount}}</text>
				</view>
				<view class="bullPositionMessage fs3a28">
					<view class="message">
						<text class="pMess">买家留言：</text>
						<text class="pSend">{{Detail.message?Detail.message:''}}</text>
					</view>
					<view class="contactService fx-row fx-row-center fx-row-space-around" @click="chat(Detail.shopUserId)">
						<view class="contact">联系客服</view>
						<view class="contactIcon">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xiaoxi.png'"></image>
						</view>
					</view>
				</view>
				<view class="OrderInfor fs6a24">
					<view class="orderNum" @click="copyText(Detail.orderNum)">订单编号：{{Detail.orderNum}}</view>
					<!-- <view class="payNum">支付单号：{{Detail.payNum}}</view> -->
					<view class="createTime">创建时间：{{orderCreateTime}}</view>
					<!-- <view class="payTime">支付时间：{{payTime}}</view>				 -->
				</view>
			</view>
			<!-- 确认收货 -->
			<view class="confirmProduct">
				<view class="Button fx-row fx-row-right">
					<view class="AgreeReceive gray" @click="cancelOrder()">取消订单</view>
					<view class="AgreeReceive" @click="waitPay()">去支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	import orderMixins from '../_orderMixins/orderMixins.js'
	export default {
		name:'waitSendDetail',
	
		mixins:[orderMixins],
		
		methods:{
			// 取消订单
			cancelOrder(){
				uni.showModal({
					content:"确定要取消订单吗？",
					showCancel:true,
					success: (res) => {
						if(res.confirm){
							this.$api.cancelOrder(this.childId).then(res=>{
								this.showTips("取消成功").then(()=>{uni.navigateBack();});
								this.updated();
							}).catch(err=>this.showError(err))
						}
					}
				})
			},
			
			// 去支付 拉起微信支付
			waitPay(){
				this.$api.unifiedorder(this.orderNum).then(result => {
					return this.requestPayment(result.prePayInfo)
				}).then(result => {
					this.updated();
					uni.redirectTo({ url:'../../module/shop/paySuccess/paySuccess' });
				}).catch(error => {
					this.showError(error);
					// uni.redirectTo({ url:'../myself_waitPayDetail/myself_waitPayDetail' });
				})
			}
		},
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';


	.page {
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 100upx;
	}

	.container{
		background: @grayBg;border-top:1upx solid @grayBg;
		// 收货人信息
		.Receive{
			width:100%;background:#fff;padding:30upx;
			.ReceiveName{
				.RAname{
					width:30%;font-weight: 900upx;font-size:32upx;
					view{width:80%;display:inline-block;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;}
				}
				.Rphone{
					width:70%;
					.Pnum{width:95%;;text-align: left;}
					.RgoBack{
						image{width:12upx;height: 22upx;}
					}
				}
			}
			.ReceiveAdree{
				margin-top:20upx;
				.RAadree{width:30%;}
				.RAdetail{width:70%;line-height: 50upx;}
			}
		}
		// 买家签收
		.ReceiveSingIn{
			margin-top:30upx;background:#fff;padding:30upx;
			.RSImage{
				width:95%;
				image{width:72upx;height:72upx;vertical-align: middle;margin-right: 20upx;}
			}
			.RSgoBack{
				width:5%;text-align: right;
				image{width:14upx;height: 24upx;}
			}
		}
		// 收货商品
		.ReceiveProduct{
			margin-top:30upx;margin-bottom:100upx;
			.RPlist{
				.PLshoreName{
					width:100%;background:#fff;padding:30upx;
					.Pimage{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
					.PLimage{width:30upx;height: 30upx;vertical-align: middle;margin-left:30upx;}
				}
				.ProductList{
					border-bottom:1upx solid #eee;
					.ProductItem{
						padding:30upx;
						.PIimage{
							width:25%;
							.Pimage{width:160upx;height: 160upx;}
						}
						.PIinformation{
							width:73%;
							.PFheader{
								height:50upx;
								.Htitle{width:70%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
								.Hrefund{width:30%;text-align: center;line-height: 48upx;height: 48upx;background:#B1B1B1;border-radius:24upx;}
							}
							.Hdescript{
								marign:10upx 0;height:70upx;
							}
							.Hprice{
								height:40upx;
								.price{
									width:50%;text-align: left;
									text{font-size:28upx;}
								}
								.Num{width:50%;text-align: right;}
							}
						}
					}
				}
			}
			.RPdetail{
				width:100%;background:#fff;border-bottom:1upx solid #eee;padding:30upx;
				view{width:100%;text-align: right;margin-top:15upx;}
			}
			.PRrealPayment{
				width:100%;background:#fff;padding:30upx;text-align: right;
				.picon{color:#FF5858;font-size: 26upx;}
				.price{color:#FF5858;font-size: 36upx;}
			}
			.bullPositionMessage{
				background: #fff;margin-top:30upx;
				.message{
					border-bottom:1upx solid #eee;padding:30upx;
					.pMess{color:#333;}
					.pSend{color:#666666;}
				}
				.contactService{
					padding:30upx;border-bottom:1upx solid #eee;
					.contact{width:50%;text-align: left;}
					.contactIcon{width:50%;text-align: right;}
					image{width:36upx;height: 36upx;}
				}
			}
			.OrderInfor{
				padding:30upx;
				view{width:100%;text-align: left;margin:20upx 0;}
			}
		}
		// 确认收货
		.confirmProduct{
			width:100%;height:100upx;background: #fff;position: fixed;bottom:0;border-top:1upx solid #eee;
			.Button{
				// position: absolute;right:20upx;top:10%;text-align: center;line-height: 80upx;font-size:28upx;
// 				.checkLigistics{
// 					.buttonRadius(@w:236upx,@h:80upx,@bg:none);
// 					color:#666;border:1upx solid #666;margin-right: 30upx;
// 				}
				.confirmGood{
					.buttonRadius(@w:620upx,@h:80upx);margin:10upx auto;
					border:1upx solid @tabActive;font-size:32upx;
				}
				.AgreeReceive{
					margin:10upx 20upx 0 0;
					.buttonRadius(@w:236upx,@h:80upx,@bg:none);border-radius:40px;border:1px solid #6B7AF8;color:#7483FF;font-size: 28upx;
					&.gray {
						color: #B1B1B1;
						border-color: #B1B1B1;
					}
				}
			}
		}
	}
</style>
