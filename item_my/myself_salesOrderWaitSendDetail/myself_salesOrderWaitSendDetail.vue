<template>
	<view class="container">
		<title-bar title="订单详情"></title-bar>
		<view v-for="(Detail,Dindex) in salesOrderSendD" :key="Dindex">
			<!-- 收货人信息 -->
			<view class="Receive">
				<view class="ReceiveName fs3a32 fx-row fx-row-center fx-row-space-around">
					<view class="RAname">
						<view>{{Detail.name}}</view>
					</view>
					<view class="Rphone fs3a32 fx-row fx-row-space-around">
						<view class="Pnum">{{Detail.phone}}</view>
					</view>
				</view>
				<view class="ReceiveAdree fs6a28 fx-row  fx-row-space-around">
					<view class="RAadree">收货地址：</view>
					<view class="RAdetail">{{Detail.province+Detail.area+Detail.city+Detail.detailedAddress}}</view>
				</view>
			</view>
			<!-- 收货商品 -->
			<view class="ReceiveProduct">
				<view class="RPlist">
					<view class="PLshoreName" @click="gotoShop(Detail.shopId)">
						<default-image :src="Detail.logo" custom-class="Pimage"></default-image>
						<text class="fs3a28">{{Detail.shopName}}</text>
						<image class="PLimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jinru.png'"></image>
					</view>
					<view class="ProductList"  v-for="(item,index) in Detail.orderList" :key="index">
						<view class="ProductItem fx-row fx-row-center fx-row-space-around">
							<view class="PIimage">
								<default-image :src="item.goodsImage" custom-class="Pimage"></default-image>
							</view>
							<view class="PIinformation" @click="gotoProductDetail(item.goodsId)">
								<view class="PFheader">
									<view class="Htitle fs3a28">{{item.goodsName}}</view>
								</view>
								<view class="Hdescript fs6a24">
									{{item.propertyValue.length>2?item.propertyValue[1]+'-'+item.propertyValue[3]:item.propertyValue[1]}}
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
					<view class="DCoupon">优惠券：-¥{{Detail.preferentialMoney}}</view>
					<view class="DorderTotalPrice">订单总价：¥{{Detail.payAmount}}</view>
				</view>
				<view class="PRrealPayment fs3a28">
					实付款：
					<text class="picon">¥ </text>
					<text class="price">{{Detail.payAmount}}</text>
				</view>
				<view class="bullPositionMessage fs3a28">
					<view class="message">
						<text class="pMess">买家留言：</text>
						<text class="pSend">{{Detail.content?Detail.content:''}}</text>
					</view>
					<view class="contactService fx-row fx-row-center fx-row-space-around" @click="chat(Detail.customerId)" v-if="Detail.customerId != currentUser.id">
						<view class="contact">联系买家</view>
						<view class="contactIcon">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/xiaoxi.png'"></image>
						</view>
					</view>
					<view class="contactService fx-row fx-row-center fx-row-space-around">
						<view class="contact">拨打买家电话</view>
						<view class="contactIcon" @click="makePhoneCall(Detail.phone)">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/dianhua.png'"></image>
						</view>
					</view>
				</view>
				<view class="OrderInfor fs6a24">
					<view class="orderNum" @click="copyText(Detail.orderNum)">订单编号：{{Detail.orderNum}}</view>
					<view class="payNum" v-if="Detail.payOrderNum">支付单号：{{Detail.payOrderNum}}</view>
					<view class="createTime">创建时间：{{orderCreateTime}}</view>
					<view class="payTime">支付时间：{{ isCOD ? '货到付款' : payTime }}</view>
				</view>
			</view>
			<!-- 确认收货 -->
			<view class="confirmProduct" v-if="userType==2||userType==3||userType==4">
				<view class="Button">
					<view class="confirmGood fsf28" @click="gotoSendList(Detail.childId)">发货</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatTime} from "../../js/mzl.js";
	export default {
		name:'waitSendDetail',
		data() {
			return {
				onlineSite:this.global.onlineSite,
				list:[
					{id:0},{id:0},
				],
				childId:0,
				salesOrderSendD:[],
				orderCreateTime:'',
				payTime:'',
				userType:0,
				isCOD: false,
			};
		},
		onLoad(e) {
			this.childId=e.childId;
			console.log('childId:'+e.childId);
			this.userType=uni.getStorageSync('userType');
		},

		onShow () {
			this.sendSaleOrderDetail();
		},

		methods:{
			// 联系买家
			chat(userId){
				this.navigateTo('/module/message/chat/chat', { selToID: userId ,channel: 'buyer' })
			},
			// 获取待发货详情列表
			sendSaleOrderDetail(){
				// this.childId
				this.$api.sendSaleOrderDetail(this.childId).then(res=>{
					console.log(res);
					res.orderDetail.forEach(detail=>{
						detail.orderList.forEach(item=>{
							item.goodsPrice= this.formatPrice(item.goodsPrice)
						})
					})
					res.orderDetail[0].expressFee=this.formatPrice(res.orderDetail[0].expressFee);
					res.orderDetail[0].goodsAmount=this.formatPrice(res.orderDetail[0].goodsAmount);
					res.orderDetail[0].orderAmount=this.formatPrice(res.orderDetail[0].orderAmount);
					res.orderDetail[0].payAmount=this.formatPrice(res.orderDetail[0].payAmount);
					res.orderDetail[0].preferentialMoney=this.formatPrice(res.orderDetail[0].preferentialMoney);
					this.isCOD = res.orderDetail[0].cod == 1;

					this.salesOrderSendD=res.orderDetail;
					this.orderCreateTime=formatTime(res.orderDetail[0].createTime);
					this.payTime=formatTime(res.orderDetail[0].payTime);
				}).catch(error=>{
					//this.showError(error);
				})
			},
			applyrefund(){
				uni.navigateTo({
					url: '../myself_applyForRefund/myself_applyForRefund'
				});
			},
			// 商品详情
			gotoProductDetail(goodsId){
				uni.navigateTo({
					url: '../../module/shop/goodsDetail/goodsDetail?goodsId='+goodsId
				});
			},
			//返回商品列表
			gotoSendList(childId){
				uni.navigateTo({
					url: '../myself_salesOrderSendsGoods/myself_salesOrderSendsGoods?childId='+childId
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
			},
			// 拨打电话
			makePhoneCall(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
		},

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

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
					.PLimage{width:30upx;height:30upx;vertical-align: middle;margin-left:30upx;}
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
				.contactService:last-child{border:none;}
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
			}
		}
	}
</style>
