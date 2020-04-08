<template>
	<view class="container page">
		<title-bar title="订单详情"></title-bar>
		<view v-if="Detail">
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
			<!-- 买家签收 -->
			<!--<view class="ReceiveSingIn fx-row fx-row-center fx-row-space-around fs3a28">-->
				<!--<view class="RSImage">-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/wuliu.png'"></image>-->
					<!--<text>买家已发货</text>-->
				<!--</view>-->
				<!--<view class="RSgoBack">-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>-->
				<!--</view>-->
			<!--</view>-->
			<!-- 收货商品 -->
			<view class="ReceiveProduct">
				<view class="RPlist">
					<view class="PLshoreName">
						<image :src="Detail.shopCover" mode="aspectFill" class="Pimage"></image>
						<text class="fs3a28">{{Detail.shopName}}</text>
						<image class="PLimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jinru.png'" mode=""></image>
					</view>
					<view class="ProductList"  v-for="(item,index) in Detail.items" :key="index">
						<view class="ProductItem fx-row fx-row-center fx-row-space-around">
							<view class="PIimage" @click="gotoGoodsDetail(item.goodsId)">
								<image :src="item.cover" mode="aspectFill" class="Pimage"></image>
							</view>
							<view class="PIinformation">
								<view class="PFheader fx-row fx-row-top fx-row-space-around">
									<view class="Htitle fs3a28">{{item.title?item.title:""}}</view>
									<view class="Hrefund fsf24" v-if="!isUseCoupon && !isCOD && Detail.way==0 && !isSO" @click="applyrefund(item)">申请退款</view>
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
					<view class="DorderTotalPrice">订单总价：¥{{Detail.orderAmount}}</view>
				</view>
				<view class="PRrealPayment fs3a28">
					实付款：
					<text class="picon">¥ </text>
					<text class="price">{{Detail.orderAmount}}</text>
				</view>
				<view class="bullPositionMessage fs3a28">
					<view class="message">
						<text class="pMess">买家留言：</text>
						<text class="pSend">{{Detail.message?Detail.message:''}}</text>
					</view>
					<view v-if="!isSO" class="contactService fx-row fx-row-center fx-row-space-around" @click="chat(Detail.shopUserId)">
						<view class="contact">联系客服</view>
						<view class="contactIcon">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xiaoxi.png'"></image>
						</view>
					</view>
				</view>
				<view class="OrderInfor fs6a24">
					<view class="orderNum" @click="copyText(Detail.orderNum)">订单编号：{{Detail.orderNum}}</view>
					<view class="payNum" v-if="Detail.payOrderNum">支付单号：{{Detail.payNum}}</view>
					<view class="createTime">创建时间：{{orderCreateTime}}</view>
					<view class="payTime" v-if="payTime">支付时间：{{ isCOD ? '货到付款' : payTime }}</view>
					<view class="payTime" v-if="handleTime">发货时间：{{handleTime}}</view>
				</view>
			</view>
			<!-- 确认收货 -->
			<view class="confirmProduct">
				<view class="Button fx-row fx-row-right">
					<!-- <view class="checkLigistics gray" v-if="!isCOD" @click="applyrefund()">申请退款</view> -->
					<view class="checkLigistics" @click="checkLogistics(childId)">查看物流</view>
					<view class="confirmGood" v-if="((!isCOD && !isSO) || (isCOD && isSO)) && !completed" @click="agreeReceive">确认收货</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import orderMixins from '../_orderMixins/orderMixins.js'
	export default {
		name:'waitReceiveDetail',
		mixins:[orderMixins],
	


		methods:{
			
		
			// 跳转至查看物流
			checkLogistics(childId){
				uni.navigateTo({
					url: '../myself_logisticsInformation/myself_logisticsInformation?childId='+childId,
				});
			},
			// 确认收货
			agreeReceive(){
				uni.showLoading();
				this.$api.achieveOrder(this.childId).then(res=>{
					this.updated();
					uni.redirectTo({
						url: '../myself_successfunTrade/myself_successfunTrade?orderId='+this.childId
					});
					uni.hideLoading();
				}).catch(error => {
					this.showError(error)
					uni.hideLoading();
				})
			},
			
			
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
								margin:10upx 0;height:30upx;
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
					padding:30upx;
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
				position: absolute;right:20upx;top:16%;text-align: center;line-height: 7016upx;font-size:28upx;
				.checkLigistics{
					.buttonRadius(@w:180upx,@h:70upx,@bg:none);
					color:#666;border:1upx solid #666;margin-right: 15upx;
				}
				.confirmGood{
					.buttonRadius(@w:180upx,@h:70upx,@bg:none);
					color:@tabActive;border:1upx solid @tabActive;
				}
			}
		}
	}
</style>
