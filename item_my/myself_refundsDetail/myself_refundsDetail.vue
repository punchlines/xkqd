<template>
	<view class="container page">
		<view class="RefundsDetail">
			<!-- 商家处理中 -->
			<view class="businessDealWith">
				<view class="BDHeader">
					<view class="BDdealWith">{{ Detail.type==0?'退款':'退货退款' }}</view>
					<view class="BDremainTime">{{ Detail._shopStatus }}</view>
					<!-- <view class="BDremainTime" v-if="order.status == 1 || enableInputLogistics || (order.type == 2 && order.goodsStatus == 2)">还剩{{countDownDay+'天'+countDownHour+'时'+countDownMinute+'分'}}</view>
					<view class="BDremainTime" v-else></view> -->
				</view>
			</view>
			<!-- 处理详细说明 -->
			<view class="RedundDescript" v-if="dealDesc">
				<view class="RDinfor fs6a24">
					{{ dealDesc }}
				</view>
			</view>
			<!-- 产品详情 -->
			<view class="ReceiveProduct">
				<view class="RPlist">
					<view class="PLshoreName fx-row fx-row-center fx-row-space-around" v-if="!isSO">
						<view class="PLNimage">
							<image :src="Detail.shopCover" class="Pimage"></image>
							<!-- <default-image src="headImage" custom-class="Pimage"></default-image> -->
							<text class="fs3a28">{{Detail.shopName}}</text>
						</view>
						<view class="PLNmessage"  @click="chat(Detail.shopUserId)">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/kefuzi.png'"></image>联系客服
						</view>
					</view>
					<view class="ProductList">
						<view class="ProductItem fx-row fx-row-center fx-row-space-around" @click="gotoProductDetail(Detail.goodsId)" >
							<view class="PIimage">
								<image :src="Detail.cover" class="Pimage"></image>
								<!-- <default-image :src="goodsDetail.goodsImage" custom-class="Pimage"></default-image> -->
							</view>
							<view class="PIinformation">
								<view class="PFheader fx-row fx-row-top fx-row-space-around">
									<view class="Htitle fs3a28">{{Detail.title}}</view>
								</view>
								<view class="Hdescript fs6a24">
									{{Detail.attributesDesc}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--退货数量，价钱  -->
			<view class="RefundsNumPrice fs3a28">
				<view class="RFNnum Boder fx-row fx-row-center fx-row-space-around">
					<view class="RFTitle">退款价格</view>
					<view class="FRnum">¥ {{ Detail.refundMoney }}</view>
				</view>
				<view class="RFNnum  fx-row fx-row-center fx-row-space-around">
					<view class="RFTitle">退款数量</view>
					<view class="FRnum" >×{{ Detail.goodsNum }}</view>
				</view>
				<view class="RFNnum  fx-row fx-row-center fx-row-space-around" v-if="Detail.imgs && Detail.imgs.length>0"  @click="previewImage(Detail.imgs)">
					<view class="RFTitle">图片</view>
					<view class="FRnum content image-list" >
						<image class="Images" :src="image" mode="aspectFill" v-for="image in Detail.imgs"></image>
					</view>
				</view>
			</view>
			
			<!-- 退款理由输入 -->
			<view class="txtcontent" v-if="isSO && enableBtn" @click.stop='stopTap'>
				<textarea @click="focusArea" :focus="focus" @blur="blurArea" maxlength="100" v-model="refundDetail" @input='inputTap'  placeholder="请输入处理退款理由"  placeholder-class="txt" class="mtxt"></textarea>
				<view class="txtLength">
					<text>{{number}}</text>/<text>100</text>
				</view> 
			</view>

			
			<!-- 退款编码 -->
			<view class="refundsNum fs3a32">
				<!-- <view class="RNcode">退款编码：{{ Detail.orderNum }}</view> -->
				<view class="RNtime">申请时间：{{ Detail.createTime }}</view>
				<view class="RNtime" v-if="Detail.handlerTime">处理时间：{{ Detail.handlerTime }}</view>
				<!-- <view class="RNtime" v-show="showItem[4].show">关闭时间：2018.09.11 12:30</view> -->
			</view>
		</view>
		<!--  v-show="showItem[5].show" -->
		<view class="cancalButton fs6a28">
			<view class="button fx-row fx-row-right">
				<!-- <view class="platform" v-if="enablePlatformIntervention" @click="platformIntervention">平台介入</view> -->
			<template  v-if="enableBtn">
					<view class="cancleRefunds" v-if="!isSO" @click="cancelRefunds()">撤销退款</view>
					<template v-else>
						<view class="cancleRefunds" @click="agree">同意</view>
						<view class="cancleRefunds cancel"  @click="reject">拒绝</view>
					</template>	
			</template>
			
			</view>
		</view>


	</view>
</template>
<script>
	
	import { STATUS_MAP, MONEY_STATUS_MAP, GOODS_STATUS_MAP } from '@/js/constant';

	import {
		formatTime,
		formatDateTime
	} from "../../js/mzl.js";
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				number:"0",
				focus:true,
				refundDetail:'',
				// 剩余处理时间
				dealTime: '2天23时59分',
				// 处理描述
				dealDescript: '您已成功发起退款申请，请耐心等待商家处理，如果倒计时结束商家仍未处理，您可重新发起退款',
				showItem: [{
						id: 0,
						show: false,
						title: '商家收货信息'
					},
					{
						id: 1,
						show: false,
						title: '物流信息填写'
					},
					{
						id: 2,
						show: false,
						title: '物流'
					},
					{
						id: 3,
						show: false,
						title: '处理时间'
					},
					{
						id: 4,
						show: false,
						title: '关闭时间'
					},
					{
						id: 5,
						show: false,
						title: '撤销退款'
					}
				],
				childId: 105, //大订单id
				itemId: 81, //订单项id
				goodsDetail: [],
				timer1: 0,
				countDownDay: 0,
				countDownHour: 0,
				countDownMinute: 0,
				countDownSecond: 0,
				creatTime:'',
				itemType:0,

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
				},

				consignee: {
					consigneeName: '',
					consigneePhone: '',
					province: '',
					city: '',
					area: '',
					consigneeAddress: '',
				},

				themeColor: '#6B7AF8',
				defaultValue: [0, 0, 1],
				Detail:null,
				isSO:false
			};
		},

	

		computed: {
		//Vuex引入属性
			...mapState(['logisticsCompany', 'refundLogisticsInfo']),
			enableBtn(){
				return this.Detail && this.Detail.shopStatus==0;
			}
			
		},

		onLoad (option) {
			this.refundId = option.refundId;
			this.isSO = option.isSO==1?true:false;
			uni.showLoading();
			this.$api.getRefundsInfo(this.refundId).then(res => {
				this.hideLoading();
				console.log(res)
				this.Detail = res;
			
				this.Detail.createTime = formatTime(this.Detail.createTime);
				this.Detail.handlerTime = this.Detail.handlerTime?formatTime(this.Detail.handlerTime):'';
				this.Detail._shopStatus = STATUS_MAP[Number(this.Detail.shopStatus)];
				
				try{
					this.Detail.imgs = this.Detail.imgs?JSON.parse(this.Detail.imgs):[];
				}catch(e){
					this.Detail.imgs=null;
					//TODO handle the exception
				}
				
// 				this.creatTime = res.applyTime;
// 				res._creatTime = this.formatDate(res.applyTime);
// 				res._handlerTime = this.formatDate(res.handlerTime);
// 
// 				this.consignee.consigneeName = res.consigneeName || '';
// 				this.consignee.consigneePhone = res.consigneePhone || '';
// 				this.consignee.consigneeAddress = res.consigneeAddress || '';
// 				// 模拟订单状态
// 				// res.type = 2;
// 				// res.status = 2;
// 				// res.moneyStatus = 2;
// 				// res.goodsStatus = 3;
// 
// 				this.order = res;
// 
// 				if (res.status == 1 || this.enableInputLogistics || (this.order.type == 2 && this.order.goodsStatus == 2)) {
// 					this.countDown();
// 				}
			}).catch(error => {
				this.hideLoading();
				this.showError(error);
			})
		},

		methods: {
			
			
			blurArea(){
				console.log(this.focus)
				this.focus = false;
				this.$forceUpdate();
			},
			
			focusArea(){
				console.log(this.focus)
				this.focus = true;
				this.$forceUpdate();
			},
			inputTap(e){
				
				this.number=e.detail.cursor
				this.value2=e.detail.value
			},
			
			
			agree(){
				
				//同意退款
				uni.showModal({
					content:"确定要同意退款吗？",
					success: (res) => {
						if(res.confirm){
							uni.showLoading();
							this.$api.editRefundMoeny('',this.refundId,0).then(res=>{
								this.notifyLastPageUpdate();
								this.showTips("同意退款成功").then(()=>{
									uni.hideLoading();
									uni.navigateBack();
								})
								
							}).catch(err=>{
								this.showError(err);
								this.hideLoading();
							});
						}
					}
				})
			},
			
			reject(){
				//拒绝
				if(this.refundDetail.length<=0){
					this.showError("请输入拒绝理由");
					return;
				}
				
				uni.showModal({
					content:"确定要拒绝退款吗？",
					success: (res) => {
						if(res.confirm){
							uni.showLoading();
							this.$api.editRefundMoeny(this.refundDetail,this.refundId,1).then(res=>{
								this.notifyLastPageUpdate();
								this.showTips("拒绝退款成功").then(()=>{
									uni.hideLoading();
									uni.navigateBack();
								})
								
							}).catch(err=>{
								this.showError(err);
								this.hideLoading();
							});
						}
					}
				})
				
			},
			
			
			previewImage (list) {
				uni.previewImage({
					current: list[0],
					urls: list,
				});
			},
			
			// 获取退货详情
			backMoneyDetail() {
				return new Promise((RES,REJ)=>{
					this.showLoading();

				})
			},
			// 填写物流信息
			gotoLoginfor() {
				this.navigateTo('../myself_salesOrderSendsGoods/myself_salesOrderSendsGoods', { refund: 1 })
			},
			countDown() {
				var AfterTime = this.enableInputLogistics
								? this.order.handlerTime + (15 * 24 * 60 * 60 * 1000)
								: this.creatTime + (7 * 24 * 60 * 60 * 1000);

				if (this.order.type == 1 && this.order.status == 1) {
					AfterTime = this.creatTime + (2 * 24 * 60 * 60 * 1000);
				} else if (this.order.type == 2 && this.order.status == 1) {
					AfterTime = this.creatTime + (5 * 24 * 60 * 60 * 1000);
				} else if (this.enableInputLogistics) {
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
			// 联系客服
			chat(shopUserId){
				this.navigateTo('/module/message/chat/chat', { selToID: shopUserId })
			},
			// 撤销退款
			cancelRefunds (){
				const aciton = () => {
					uni.showLoading();
					this.$api.cancelRefunds(this.refundId).then(result => {
						this.notifyLastPageUpdate();
						this.showTips("撤销成功").then(()=>{
							uni.hideLoading();
							uni.navigateBack();
						})
						
					}).catch(error => {
						this.showError(error);
						uni.hideLoading();
					})
				}

				uni.showModal({
					title: '提示',
					content: '撤销退款将会导致退款失败，是否继续',
					success: (res) => {
						if (res.confirm) {
							aciton();
						}
					}
				});
			},

			gotoProductDetail (goodsId) {
				this.navigateTo('../../module/shop/goodsDetail/goodsDetail', { goodsId: goodsId })
			},

			sendGoods () {
				if (!this.refundLogisticsInfo.logisticsCompany) {
					this.showError('请填写物流信息')
					return;
				}
				if (!this.consignee.consigneeName) {
					this.showError('请输入收件人')
					return;
				}
				if (!this.consignee.consigneePhone) {
					this.showError('请输入联系电话')
					return;
				}
				if (!this.consignee.province || !this.consignee.consigneeAddress) {
					this.showError('请输入收货地址')
					return;
				}
				const form = {
					refundId: this.refundId,
					logisticsNum: this.refundLogisticsInfo.flowNum,
					logisticsName: this.refundLogisticsInfo.logisticsCompany,
					consigneeName: this.consignee.consigneeName,
					consigneePhone: this.consignee.consigneePhone,
					consigneeAddress: `${this.consignee.province}${this.consignee.city}${this.consignee.area}${this.consignee.consigneeAddress}`,
				};
				uni.showLoading()
				this.$api.setLogisticsDetail(form).then(result => {
					uni.hideLoading();
					this.showTips('提交成功').then(() => {
						uni.navigateBack();
					})
					this.notifyLastPageUpdate();
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},

			platformIntervention () {
				uni.showLoading()
				this.$api.insertRefundApply(this.refundId).then(result => {
					uni.hideLoading();
					this.showTips('提交成功').then(() => {
						uni.navigateBack();
					})
					this.notifyLastPageUpdate();
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},

			CityPickerTap () {
				this.$refs.mpvueCityPicker.show();
			},

			onConfirm (e) {
				const data = e.label.split('-');

				this.consignee.province = data[0];
				this.consignee.city = data[1];
				this.consignee.area = data[2];
			},

			copyNumber () {
				uni.setClipboardData({
					data: this.order.logisticsNum,
					success () {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});
					}
				});

			},

			notifyLastPageUpdate () {
				if(!this.isSO)
					uni.setStorageSync('_needUpdateShopOrder', true);
				else uni.setStorageSync('_needUpdateSaleOrder', true);
			}

		},

	}
</script>
<style scoped lang="less">
	@import '../../css/mzl_base.less';

	.page {
		width: 100%;
		min-height: 100vh;
		background: @grayBg;
		box-sizing: border-box;
		padding-bottom: 100upx;
	}

	.container {
		background: @grayBg;
		
		.txtcontent{
			 position:relative;height:400upx;margin:0 auto; margin-bottom:80upx;background:white;
			 .txt{padding-top: 30upx;padding-left: 30upx;color: #CCCCCC;font-size: 28upx; }
			 .mtxt{font-size: 28upx;color: #333333; margin: 0 auto; width: calc(100% - 60upx);background-color: #f8f8f8;}
			.txtLength{
				position: absolute;right: 36upx;bottom: 25upx;font-size: 24upx;color: #999999;
			}
		}
		
		.RefundsDetail {
			// 商家处理中
			margin-bottom: 100upx;

			.businessDealWith {
				height: 284upx;
				background: linear-gradient(270deg, rgba(142, 84, 233, 1) 0%, rgba(71, 118, 230, 1) 100%);
				padding: 30upx;
				color: #fff;

				.BDHeader {
					heigth: 100upx;
					line-height: 60upx;
					margin-top: 50upx;

					.BDremainTime {
						font-size: 28upx;
					}
				}
			}

			// 处理详细说明
			.RedundDescript {
				padding: 30upx;
				background: #fff;
				line-height: 35upx;
			}

			// 产品详情
			.ReceiveProduct {
				margin-top: 30upx;

				.RPlist {
					.PLshoreName {
						width: 100%;
						background: #fff;
						padding: 30upx;

						.PLNimage {
							width: 70%;

							.Pimage {
								width: 60upx;
								height: 60upx;
								vertical-align: middle;
								margin-right: 20upx;
							}
						}

						.PLNmessage {
							width: 30%;
							font-size: 24upx;
							color: #6B7AF8;
							text-align: right;

							image {
								width: 38upx;
								height: 38upx;
								vertical-align: middle;
								margin-right: 20upx;
							}
						}
					}

					.ProductList {
						border-bottom: 1upx solid #eee;

						.ProductItem {
							padding: 30upx;

							.PIimage {
								width: 25%;

								.Pimage {
									width: 160upx;
									height: 160upx;
								}
							}

							.PIinformation {
								width: 73%;

								.PFheader {
									height: 50upx;

									.Htitle {
										width: 100%;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}

								.Hdescript {
									marign: 10upx 0;
									height: 110upx;
								}
							}
						}
					}
				}
			}

			//退货数量，价钱
			.RefundsNumPrice {
				background: #fff;

				.RFNnum {
					padding: 30upx;

					.image-list{
						// display: flex;
						
						.Images{
							width: 70upx;
							height: 70upx;
						}
					}
					

					.RFTitle {
						width: 70%;
					}

					.FRnum {
						width: 30%;
						text-align: right;
					}
				}

				.Boder {
					border-bottom: 1upx solid #eee;
				}
			}

			// 退款商家信息
			.sellerReceiveDetail {
				margin-top: 30upx;
				background: #fff;
				padding: 30upx;
				line-height: 50upx;
				text {
					width: 180upx;
					line-height: 80upx;
				}
				.form-item {
					display: flex;
					align-items: center;
					input {
						color: #333333;
						line-height: 80upx;
						height: 80upx;
						flex: 1;
					}
				}
				.SRtitle {
					font-weight: 900upx;
					margin-bottom: 10upx;
				}
			}

			// 物流信息
			.logistics {
				padding:30upx;
				background: #fff;
				margin-bottom:30upx;
				/*border-top: 1upx solid #eee;*/
				margin-top: 30upx;

				.LogName {
					width:60%;
					font-weight: 900upx;
				}
				.LogInput{
					width:30%;
					color: #CCCCCC;

					&.hasContent {
						color: #333333;
					}


					.RNtime {
						margin: 20upx 0;
						text-align: left;
					}
				}
				.Logimage {
					width: 12upx;
					text-align: right;
					margin-top:-10upx;
					image {
						width: 12upx;
						height: 24upx;
						vertical-align: middle;
					}
				}
			}

			// 物流公司
			.logCompany {
				padding: 30upx;
				background: #fff;
				margin-top: 30upx;
				line-height: 50upx;
				.LCtitle {
					font-weight: 900upx;width:20%;text-align: left;
				}
				.LCcom{
					width:100%;text-align:left;
				}
				.LCcode {
					width:100%;
					text-align: left;
					.LCnum {
						display: inline-block;
						text-align: left;
					}

					.LCcopy {
						width: 18%;

						view {
							.buttonRadius(@w: 100upx, @h: 46upx, @bg: none);
							border: 1upx solid #eee;
						}
					}
				}
			}

			.refundsNum {
				font-size: 24upx;
				padding: 30upx;

				.RNtime {
					margin: 20upx 0;
				}
			}
		}

		// 按钮
		.cancalButton {
			width: 100%;
			height: 102upx;
			position: fixed;
			bottom: 0;
			background: #fff;
			border-top: 1upx solid #eee;
			z-index: 9999;

			.button {
				position: absolute;
				top: 15%;
				right: 20upx;
				text-align: center;
				line-height: 74upx;

				.platform {
					.buttonRadius(@w: 215upx, @h: 74upx, @bg: none);
					border: 1upx solid #666666;
					margin-right: 30upx;
				}

				.cancleRefunds {
					.buttonRadius(@w: 215upx, @h: 74upx, @bg: none);
					border: 1upx solid #6B7AF8;
					color: #6B7AF8;
					&.cancel{
						border: 1upx solid #999;
						color: #999;
						margin-left: 20upx;
					}
				}
			}
		}
	}
</style>
