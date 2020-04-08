<template>
	<view class="container page">
		<title-bar title="订单详情"></title-bar>
		<view class="RefundsDetail">
			<!-- 商家处理中 -->
			<view class="businessDealWith">
				<view class="BDHeader">
					<!-- 商家处理中 -->
					<view class="BDdealWith">{{ dealState }}</view>
					<!-- 还剩2天23时59分 -->
					<view class="BDremainTime" v-if="order.status == 1 || buyerHasSendGoods || (order.status == 2 && order.goodsStatus == 1)">还剩{{countDownDay+'天'+countDownHour+'时'+countDownMinute+'分'}}</view>
					<view class="BDremainTime" v-else></view>
				</view>
			</view>
			<!-- 处理详细说明 -->
			<view class="RedundDescript" v-if=" dealDesc ">
				<view class="RDinfor fs6a24">
					{{ dealDesc }}
				</view>
			</view>
			<!-- 联系买家 -->
			<view class="callBuyer fx-row fx-row-center fx-row-space-around" @click="chat(order.applyUserId)">
				<view class="CBbuyer fs3a28">联系买家</view>
				<view class="CBimage">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/kefuzi.png'"></image>
				</view>
			</view>
			<!-- 产品详情 -->
			<view class="ReceiveProduct">
				<view class="RPlist">
					<view class="PLshoreName fx-row fx-row-center fx-row-space-around">
						<view class="PLNimage">
							<image :src="order.logo" class="Pimage"></image>
							<!-- <default-image :src="userInfor.headImage" custom-class="Pimage"></default-image> -->
							<text class="fs3a28">{{ order.shopName }}</text>
						</view>
					</view>
					<view class="ProductList" @click="gotoProductDetail(goods)" v-for="goods in order.refundGoodsItemList">
						<view class="ProductItem fx-row fx-row-center fx-row-space-around">
							<view class="PIimage">
								<image :src="goods.goodsImage" class="Pimage"></image>
							</view>
							<view class="PIinformation">
								<view class="PFheader fx-row fx-row-top fx-row-space-around">
									<view class="Htitle fs3a28">{{goods.goodsName}}</view>
								</view>
								<view class="Hdescript fs6a24">
									{{goods.skuValue.length>2?goods.skuValue[1]+'-'+goods.skuValue[3]:goods.skuValue[1]}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="refund-content">
				<view class="option">
					<view class="label">退款原因</view>
					<view class="content">{{ order.reason }}</view>
				</view>
				<view class="option">
					<view class="label">退款说明</view>
					<view class="content">
						<view class="wrap">{{ order.content || '-' }}</view>
					</view>
				</view>
				<view class="option">
					<view class="label">图片</view>
					<view class="content image-list" v-if="order.image">
						<img :src="image" mode="aspectFill" v-for="image in order.image" @click="previewImage(image)" />
					</view>
				</view>
			</view>



			<!--退货数量，价钱  -->
			<view class="RefundsNumPrice fs3a28">
				<view class="RFNnum Boder fx-row fx-row-center fx-row-space-around">
					<view class="RFTitle">退款价格</view>
					<view class="FRnum">¥ {{ order.payAmount || totalPrice }}</view>
				</view>
				<view class="RFNnum fx-row fx-row-center fx-row-space-around" v-if="order.refundGoodsItemList[0]">
					<view class="RFTitle">退款数量</view>
					<view class="FRnum">×{{ totalGoodsNum }}</view>
				</view>
			</view>

			<!-- 退款商家收货信息 -->
			<view class="sellerReceiveDetail fs6a28" v-if="buyerHasSendGoods">
				<view class="SRtitle fs3a30">商家收货信息</view>
				<view class="STName">收件人：{{ order.consigneeName }}</view>
				<view class="STphone">联系电话：{{ order.consigneePhone }}</view>
				<view class="STadress">收货地址：{{ order.consigneeAddress }}</view>
			</view>

			<!-- 物流公司 -->
			<view class="logCompany fs6a28" v-if="buyerHasSendGoods">
				<view class="LCtitle fs3a30">物流信息</view>
				<view class="LCcom">物流公司：{{ order.logisticsName }}</view>
				<view class="LCcode fx-row fx-row-center fx-row-space-around">
					<view class="LCnum">物流单号：{{ order.logisticsNum }}</view>
					<view class="LCcopy fs6a24" @click="copyBtn">
						<view>复制</view>
					</view>
				</view>
			</view>
			<!-- 退款编码 -->
			<view class="refundsNum fs3a32">
				<view class="RNcode">退款编码：{{ order.orderNum }}</view>
				<view class="RNtime">申请时间：{{ order._creatTime }}</view>
				<view class="RNtime" v-if="order._handlerTime">处理时间：{{ order._handlerTime }}</view>
				<view class="RNtime" v-show="showItem[4].show">关闭时间：2018.09.11 12:30</view>
			</view>
		</view>


		<view class="cancalButton fs6a28" v-if="order.status == 1 || buyerHasSendGoods">
			<view class="button fx-row fx-row-right">
				<!-- 待处理 -->
				<template v-if="order.status == 1">
					<view class="platform fsf28" @click="reject">拒绝{{ isReturnGoods ? '退货退款' : '退款' }}</view>
					<view class="cancleRefunds fsf28" @click="agree">同意{{ isReturnGoods ? '退货退款' : '退款' }}</view>
				</template>
				<template v-else-if="buyerHasSendGoods">
					<view class="cancleRefunds fsf28" @click="receipt">确认收货</view>
				</template>
			</view>
		</view>

	</view>
</template>
<script>

	import { STATUS_MAP, MONEY_STATUS_MAP, GOODS_STATUS_MAP } from '@/js/constant';
	

	export default {
		components: {},
		data() {
			return {
				onlineSite:this.global.onlineSite,
				// 剩余处理时间
				dealTime:'还剩6天23时59分',
				// 处理描述
				dealDescript:'买家发起了退款申请，请在倒计时结束前处理，倒计时结束后仍未处理，则自动退款。',
				showItem:[
					{id:0,show:false,title:'商家收货信息'},
					{id:1,show:false,title:'物流信息填写'},
					{id:2,show:false,title:'物流'},
					{id:3,show:false,title:'处理时间'},
					{id:4,show:false,title:'关闭时间'},
					{id:5,show:false,title:'撤销退款'},
					{id:6,show:false,title:'弹出层'}
				],
				countDownDay: 0,
				countDownHour: 0,
				countDownMinute: 0,
				countDownSecond: 0,
				type:1,
				childId:180,
				itemId:155,
				goodsDetail:[],

				refundId: '',
				order: {
					applyTime: 0,
					handlerTime: 0,
					isAllOrder: '1',
					logo: '',
					orderNum: '',
					payAmount: 0,
					refundGoodsItemList: [],
					refundType: '1',
					shopId: 0,
					shopName: '',
					status: 1,
				},
			};
		},



		computed: {
			dealState () {
				// type:        1仅退款；2退货退款
				// status:      1待处理；2同意；3拒绝；4已撤销
				// moneyStatus: 1待退款；2已退款；3退款失败
				// goodsStatus: 1待退货；2退货中；3退货成功；4退货失败
				const type = this.order.type;
				const status = this.order.status;
				const moneyStatus = this.order.moneyStatus;
				const goodsStatus = this.order.goodsStatus;
				if (status == 1) {
					return '待处理'
				} else if (status == 2) {
					if (type == 1 && moneyStatus == 2) return '同意退款'
					if (type == 1 && moneyStatus == 3) return '退款失败'
					if (type == 2 && goodsStatus == 1) return '同意退款'
					if (type == 2 && goodsStatus == 2) return '买家退货中'
					if (type == 2 && goodsStatus == 3) return '确认收货'
					if (type == 2 && goodsStatus == 4) return '退货失败'
				} else if (status == 3) {
					if (type == 1) return '拒绝退款'
					if (type == 2) return '拒绝退货退款'
				} else {
					return '买家已撤销'
				}
			},
			dealDesc () {
				const type = this.order.type;
				const status = this.order.status;
				const moneyStatus = this.order.moneyStatus;
				const goodsStatus = this.order.goodsStatus;
				if (status == 1) {
					return '买家发起了退款申请，请在倒计时结束前处理，倒计时结束后仍未处理，则自动退款。'
				} else if (status == 2) {
					if (type == 1 && moneyStatus == 2) return '款项将会原路返回买家的账户'
					if (type == 1 && moneyStatus == 3) return ''
					if (type == 2 && goodsStatus == 1) return '买家将于7天内将货物退还，倒计时结束后，若仍未发货，退款申请将关闭，款项不退还买家'
					if (type == 2 && goodsStatus == 2) return '买家已发货，请在15个工作日内确认收货，倒计时结束后，若仍未确认收货，则自动退款'
					if (type == 2 && goodsStatus == 3) return '您已确认收货，款项将于7个工作日内返还买家账户'
					if (type == 2 && goodsStatus == 4) return ''
				} else if (status == 3) {
					return ''
				} else {
					return ''
				}
			},
			status () {
				return STATUS_MAP[Number(this.order.status)]
			},
			isReturnGoods () {
				return this.order.type == 2;
			},
			buyerHasSendGoods () {
				return this.order.status == 2 && this.order.goodsStatus == 2;
			},
			totalPrice () {
				return this.order.refundGoodsItemList.map(item => item.goodsAmount).reduce((a, b) => a + b).toFixed(2);
			},
			totalGoodsNum () {
				return this.order.refundGoodsItemList.map(item => item.goodsNum).reduce((a, b) => a + b);
			},
		},

		onLoad(options) {
			this.refundId = options.refundId;
			uni.showLoading();
			this.doLoginHandle(()=>{
				this.$api.refundDetail(this.refundId).then(res => {
						uni.hideLoading();

						this.creatTime = res.applyTime;
						res._creatTime = this.formatDate(res.applyTime);
						res._handlerTime = this.formatDate(res.handlerTime);
						try {
							res.image = JSON.parse(res.image) || [];
						} catch (e) {
							res.image = [];
						}


						this.order = res;
						console.log(this.order)

						if (this.order.status == 1 || this.buyerHasSendGoods || (this.order.status == 2 && this.order.goodsStatus == 1)) {
							this.countDown();
						}
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					})

			});
			
			
		},

		methods:{
			countDown() {
				var AfterTime = this.buyerHasSendGoods
								? this.order.handlerTime + (15 * 24 * 60 * 60 * 1000)
								: this.creatTime + (7 * 24 * 60 * 60 * 1000);

				if (this.order.type == 1 && this.order.status == 1) {
					AfterTime = this.creatTime + (2 * 24 * 60 * 60 * 1000);
				} else if (this.order.type == 2 && this.order.status == 1) {
					AfterTime = this.creatTime + (5 * 24 * 60 * 60 * 1000);
				} else if (this.order.status == 2 && this.order.goodsStatus == 1) {
					AfterTime = this.order.handlerTime + (7 * 24 * 60 * 60 * 1000)
				} else {
					AfterTime = this.order.refundSendTime + (15 * 24 * 60 * 60 * 1000)
				}

				var totalSecond = (AfterTime - new Date().getTime()) / 1000;
				console.log(AfterTime+'-----'+new Date().getTime()+'----'+totalSecond);
				var interval = setInterval(function() {
					// 秒数
					var second = totalSecond;

					// 天数位
					var day = Math.floor(second / 3600 / 24);
					var dayStr = day.toString();
					// if (dayStr.length == 1) dayStr = '0' + dayStr;

					// 小时位
					var hr = Math.floor((second - day * 3600 * 24) / 3600);
					var hrStr = hr.toString();
					if (hrStr.length == 1) hrStr = '0' + hrStr;

					// 分钟位
					var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
					var minStr = min.toString();
					if (minStr.length == 1) minStr = '0' + minStr;

					// 秒位
					var sec = Math.floor(second - day * 3600 * 24 - hr * 3600 - min * 60);
					var secStr = sec.toString();
					if (secStr.length == 1) secStr = '0' + secStr;

					this.countDownDay = dayStr;
					this.countDownHour = hrStr;
					this.countDownMinute = minStr;
					this.countDownSecond = secStr;

					totalSecond--;
					if (totalSecond < 0) {
						clearInterval(interval);
						wx.showToast({
							title: '已结束',
						});
						this.countDownDay = '00';
						this.countDownHour = '00';
						this.countDownMinute = '00';
						this.countDownSecond = '00';
					}
				}.bind(this), 1000);
			},

			// 点击同意退款
			agree () {
				const aciton = () => {
					uni.showLoading();
					const action = this.isReturnGoods
									? this.$api.agreeRefundGoods(this.refundId)
									: this.$api.agreeRefundMoney(this.refundId)
					action.then(result => {
						this.notifyLastPageUpdate();
						uni.hideLoading();
						
						if(getCurrentPages().length<=1){
							
							uni.switchTab({
								url:"/pages/businessCard/businessCard"
							})
						}else uni.navigateBack();
						
						
					
						
					}).catch(error => {
						this.showError(error);
						uni.hideLoading();
					})
				}

				const tips = this.isReturnGoods
								? '同意退货退款后，买家将会在 7 个工作日内发货，确认后款项将会退还给买家'
								: '同意退款后，款项将会退还给买家'

				uni.showModal({
					title: '提示',
					content: tips,
					success: (res) => {
						if (res.confirm) {
							aciton();
						}
					}
				});
			},

			// 点击拒绝退款
			reject () {
				const aciton = () => {
					uni.showLoading();
					this.$api.refuseRefund(this.refundId).then(result => {
						this.notifyLastPageUpdate();
						uni.hideLoading();
						uni.navigateBack();
					}).catch(error => {
						this.showError(error);
						uni.hideLoading();
					})
				}

				uni.showModal({
					title: '提示',
					content: '是否拒绝退款',
					success: (res) => {
						if (res.confirm) {
							aciton();
						}
					}
				});
			},


			// 联系买家
			chat(userId){
				this.navigateTo('/module/message/chat/chat', { selToID: userId, channel: 'history' })
			},
			// 复制信息
			copyBtn(){
				uni.setClipboardData({
				  data: this.order.logisticsNum,
				  success:(res)=> {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
				  }
				});
			},

			// 填写物流信息
			gotoLoginfor(){
				uni.navigateTo({
					url: '../myself_CheckLogistics/myself_CheckLogistics'
				});
			},

			// 商品详情
			gotoProductDetail (goods) {
				this.navigateTo('../../module/shop/goodsDetail/goodsDetail', { goodsId: goods.goodsId })
			},

			receipt () {
				const aciton = () => {
					uni.showLoading();
					this.$api.confirmRefundGoods(this.refundId).then(result => {
						this.notifyLastPageUpdate();
						uni.hideLoading();
						uni.navigateBack();
					}).catch(error => {
						this.showError(error);
						uni.hideLoading();
					})
				}

				uni.showModal({
					title: '提示',
					content: '确认收货后，款项将于7个工作日内退还买家',
					success: (res) => {
						if (res.confirm) {
							aciton();
						}
					}
				});
			},

			notifyLastPageUpdate () {
				uni.setStorageSync('_tempOrderId', 'none');
			},

			previewImage (item) {
				uni.previewImage({
					current: item,
					urls: this.order.image,
				});
			},

		}
	}
</script>
<style lang="less">
	@import '../../css/mzl_base.less';

	.page{
		width: 100%;
		min-height: 100vh;
		background: @grayBg;
		box-sizing: border-box;
		padding-bottom: 100upx;

		.RefundsDetail{
			// 商家处理中
			.businessDealWith{
				height:284upx;background:linear-gradient(270deg,rgba(142,84,233,1) 0%,rgba(71,118,230,1) 100%);padding:30upx;color:#fff;
				.BDHeader{
					heigth:100upx;line-height:60upx;margin-top:50upx;
					.BDremainTime{font-size: 28upx;}
				}
			}
			// 处理详细说明
			.RedundDescript{
				padding:30upx;background: #fff;line-height: 35upx;
			}
			// 联系买家
			.callBuyer{
				padding:30upx;background: #fff;margin-top:30upx;
				.CBbuyer{
					width:50%;text-align: left;
				}
				.CBimage{
					width:50%;text-align: right;
					image{width:36upx;height: 36upx;vertical-align: middle;}
				}
			}
			// 产品详情
			.ReceiveProduct{
				margin-top:30upx;
				.RPlist{
					.PLshoreName{
						width:100%;background:#fff;padding:30upx;
						.PLNimage{
							width:95%;
							.Pimage{width:60upx;height: 60upx;vertical-align: middle;margin-right: 20upx;}
						}
						.PLNmessage{
							width:5%;
							image{width:38upx;height:38upx;}
						}
					}
					.ProductList{
						background-color: #FFFFFF;
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
									.Htitle{width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
								}
								.Hdescript{
									marign:10upx 0;height:110upx;
								}
							}
						}
					}
				}
			}
			//退货数量，价钱
			.RefundsNumPrice{
				background:#fff;
				.RFNnum{
					padding:30upx;
					.RFTitle{width:70%;}
					.FRnum{width:30%;text-align: right;}
				}
				.Boder{border-bottom:1upx solid #eee;}
			}
			// 退款商家信息
			.sellerReceiveDetail{
				margin-top:30upx;
				background: #fff;padding:30upx;line-height: 50upx;
				.SRtitle{font-weight: 900upx;margin-bottom:10upx;}
			}
			// 物流信息
			.logistics{
				padding:30upx;background: #fff;margin-top:30upx;
				.LogName{width:30%;font-weight: 900upx;}
				.RNtime{width:60%;margin:20upx 0;}
				.Logimage{
					width:10%;text-align: right;
					image{width:12upx;height: 24upx;vertical-align: middle;}
				}
			}
			// 物流公司
			.logCompany{
				padding:30upx;background: #fff;margin-top:30upx;line-height:50upx;
				.LCtitle{font-weight: 900upx;}
				.LCcode{
					.LCnum{width:82%;text-align: left;}
					.LCcopy{
						width:18%;
						view{.buttonRadius(@w:100upx,@h:46upx,@bg:none);border:1upx solid #eee;}
					}
				}
			}
			.refundsNum{
				font-size:24upx;padding:30upx;
				.RNtime{margin:20upx 0;}
			}
		}
		// 按钮
		.cancalButton{
			width:100%;height:102upx;position: fixed;bottom:0;background: #fff;border-top:1upx solid #eee;
			.button{
				position: absolute;top:15%;right:20upx;text-align: center;line-height: 74upx;
				.platform{
					.buttonRadius(@w:215upx,@h:74upx,@bg:#aaa);margin-right: 30upx;
				}
				.cancleRefunds{
					.buttonRadius(@w:215upx,@h:74upx);
				}
			}
		}
		// 弹出层
		.container3{
			z-index:99999999;
			.popup{
				width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;
				// 删除日志
				.DeleteLog{
					.DLlist{
						width:560upx;height: 260upx;background: #fff;position: absolute;border-radius: 10upx;
						top:50%;left:50%;margin-left:-280upx;margin-top:-130upx;
						.DLtitle{
							font-size: 32upx;color:#333;text-align: center;height:170upx;padding:40upx;font-weight:200;line-height: 50upx;
						}
						.DLbutton{
							font-size: 28upx;border-top:1upx solid #E1E1E1;
							.DLagree,.DLreject{width:50%;height:87upx;line-height: 87upx;;}
							.DLagree{color:#3576EE;border-right:1upx solid  #E1E1E1;}
							.DLreject{color:#999999;}
						}
					}
				}
			}
		}
	}

	.refund-content {
		margin: 30upx 0;

		.option {
			padding: 30upx;
			display: flex;
			align-items: center;
			font-size:28upx;
			color: rgba(51,51,51,1);
			background-color: #FFFFFF;

			&+.option {
				border-top: 1upx solid #E1E1E1;
			}

			.label {
				width: 112upx;
			}
			.content {
				width: 0;
				flex: 1;
				text-align: right;
			}
			.wrap {
				max-width: 500upx;
				float: right;
			}
			.image-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: right;
				justify-content: flex-end;
				img {
					width: 160upx;
					height: 160upx;
					margin-bottom: 10upx;
					background-color: #e0e0e0;
					&+img {
						margin-left: 10upx;
					}
				}
			}
		}

	}

</style>
