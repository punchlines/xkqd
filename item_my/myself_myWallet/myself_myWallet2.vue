<template>
	<view class="page">

		<view class="account-container">
			<view v-if="userType!=5 && userType!=6" class="withdraw-btn-container" @click="gotoPutForward">
				<view class="withdraw-btn">
					<image src="http://card-1254165941.cosgz.myqcloud.com/images/tixian@2x.png"></image>
					<text>提现</text>
				</view>
			</view>
			<view class="title">我的收入</view>
			<view class="price"><text class="small">¥</text> {{ money._totalRevenue }}</view>
			<view class="info-pane fx-column fx-row-space-around">

				<view class="fx-row fx-row-center">
					<view class="info-item">
						<view class="info-value">{{ money.nowMoney }}</view>
						<view class="info-type">个人账户余额</view>
					</view>

					<view class="info-item">
						<view class="info-value">{{ money.collectionMoney }}</view>
						<view class="info-type">平台账户余额</view>
					</view>
					<view class="info-item">
						<view class="info-value">{{ money.businessMoney }}</view>
						<view class="info-type">企业账户余额</view>
					</view>
				</view>
				<Modal v-model="show" title='用户需要打款到此账号进行激活' :text='showtext' :texts='showtexts' @cancel='cancel' @confirm='confirm'
				 @event='event' />
				<view class="fx-row fx-row-center">
					<view class="info-item">
						<view class="info-value">{{ money._sellRevenue }}</view>
						<view class="info-type">销售收入</view>
					</view>

					<view class="info-item" v-if="userType!=5 && userType!=6">
						<view class="info-value">{{ money._inviteRevenue }}</view>
						<view class="info-type">销售提成</view>
					</view>

					<view class="info-item">
						<view class="info-value">{{ money._freezeAmount }}</view>
						<view class="info-type">未结算金额</view>
					</view>
				</view>
				<view class="fx-row fx-row-center" v-if="liveStatus==1">
					<view class="info-item">
						<view class="info-value">{{ liveAmount }}</view>
						<view class="info-type">冻结余额</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="userType!=5 && userType!=6" style="width:calc(100% - 60upx); margin-top:100upx; margin: 0 auto">
			<bank-card-manage :bankCartListNum="bankCartListNum"></bank-card-manage>
		</view>
		<view class="MoneyHistory">
			<!-- 交易记录 -->
			<view class="navBox fx-row fx-row-space-between">
				<view class="nav" :class="{'active':navActive==0}" @click="change(0)">全部收益</view>
				<view class="nav" :class="{'active':navActive==1}" @click="change(1)">已到账</view>
				<view class="nav" :class="{'active':navActive==2}" @click="change(2)">未到账</view>
			</view>

			<view class="list">
				<view class="item fx-row fx-row-space-between fx-row-center" v-for="(item,index) in list" :key="index">
					<view class="namebox">
						<view class="name">{{item.mark}}</view>
						<view class="time">{{formatDate(item.createTime)}}</view>
					</view>
					<view class="order">{{item.identity}}</view>
					<view class="money">{{item.changeBalance}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TextareaText from "../../template/textarea";
	import BankCardManage from "./BankCardManage";
	import {
		mapState
	} from "vuex";
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2.js';
	import Modal from '@/components/x-modal/x-modal';
	export default {
		components: {
			BankCardManage,
			TextareaText,
			Modal
		},
		mixins: [loadMoreMixins],
		data() {
			return {
				onlineSite: this.global.onlineSite,
				bankCartListNum: 0,
				money: {
					cultivateRevenue: 0, // 培训费收入(二级)
					sellRevenue: 0, // 销售收入(营业额)
					inviteRevenue: 0, // 邀请VIP收入 （一级）
					totalRevenue: 0, // 余额
					freezeAmount: 0, //未结算余额
					
					
				},
				merchantStatus: '', //个人商户状态 0未完善信息 1已完善信息
				businessMerchantStatus: '', //企业商户状态 0未完善信息 1已完善信息但未激活 2已完善信息并已激活
				openingBank: '',
				acctName: '',
				actiDeadLine: '',
				amount: '',
				showtext: '',
				showtexts: '',
				userAccount: '',
				show: false,
				liveStatus:'',
				liveAmount:'',
				merchant: {},
				navActive: 0
			};
		},

		computed: {
			...mapState(["userType"])
		},


		onShow() {
			if (uni.getStorageSync("_resetWallet")) {
				uni.setStorageSync("_resetWallet", false)
				this.getInfo();
			}
		},

		onLoad() {
			this.getBankList();
			this.fetch()
			this.getInfo();
			this.liveStatus=uni.getStorageSync('liveStatus');
			if(this.liveStatus==1){
				this.$unavailableMoney().then(res=>{
					this.liveAmount=res.liveAmount
				})
			}
		},

		methods: {
			getInfo() {
				let action = this.$api.getIncomeMoney

				action().then(result => {
					result.myIncomeVo._cultivateRevenue = result.myIncomeVo.cultivateRevenue.toFixed(2);
					result.myIncomeVo._inviteRevenue = result.myIncomeVo.inviteRevenue.toFixed(2);
					result.myIncomeVo._sellRevenue = result.myIncomeVo.sellRevenue.toFixed(2);
					result.myIncomeVo._totalRevenue = result.myIncomeVo.totalRevenue.toFixed(2);
					result.myIncomeVo._freezeAmount = result.myIncomeVo.freezeAmount.toFixed(2);
					result.myIncomeVo.collectionMoney = result.myIncomeVo.collectionMoney.toFixed(2);
					result.myIncomeVo.businessMoney = result.myIncomeVo.businessMoney.toFixed(2);
					result.myIncomeVo.nowMoney = result.myIncomeVo.nowMoney.toFixed(2);
					this.businessMerchantStatus = result.merchant.businessMerchantStatus
					this.merchantStatus = result.merchant.merchantStatus
					this.money = result.myIncomeVo;
					this.merchant = result.merchant;
					if (this.businessMerchantStatus == 1) {
						this.openingBank = result.merchant.openingBank
						this.acctName = result.merchant.acctName
						this.actiDeadLine = result.merchant.actiDeadLine
						this.amount = result.merchant.amount
						this.userAccount = result.merchant.userAccount
					}
					console.log(result)
				}).catch(error => {
					this.showError(error)
				})
			},


			change(type) {
				this.navActive = type;
				this.reset();
				this.fetch(type);
			},

			fetch(type = 0) {

				this.loading = true;
				this.$api.getTransactionRecord(type, this.currentPage).then(res => {
					this.list = this.list.concat(res);
					this.currentPage++;
					this.loading = false;
					if (res.length <= 0) {
						this.noMore = true;
					}
				})
			},


			// 获取银行卡列表，统计银行卡张数
			getBankList() {
				this.$api.getBankList(1).then(res => {
					console.log(res.bankCartList);
					this.bankCartListNum = res.bankCartList.length;
					// const {identity,schedule} = this.merchant;
					// if(res.bankCartList.length==0 && schedule==0 && identity==1){

					// 	const {businessLicenseCard,bankCard,identityCard,identityCardBack} = this.merchant;

					// 	//注册子商户 成功就去上传图片
					// 	uni.showModal({
					// 		content:"请先完善资料",
					// 		showCancel:false,
					// 		success: () => {
					// 			uni.navigateTo({
					// 				url:`/item_businessCard/businessCard_ShopInfo/step2_2/step2_2_1?businessLicenseCard=${businessLicenseCard}
					// 				&bankCard=${bankCard}
					// 				&identityCard=${identityCard}
					// 				&identityCardBack=${identityCardBack}`
					// 			})
					// 		}
					// 	})
					// }

				})
			},
			// 账户明细
			gotoBalanceDetail() {
				uni.navigateTo({
					url: '../myself_BalanceDetail/myself_BalanceDetail'
				});
			},
			cancel() {},
			confirm() {},
			event() {},
			// 提现
			gotoPutForward() {
				// uni.navigateTo({
				// 	url: '../myself_PutForward/myself_PutForward'
				// });
				//判断

				// 进入钱包先拿到资料信息，点击提现时通过identity和schedule两个状态判断是否要完善信息
				// identity=0时表示用户身份为普通用户，identity=1时表示用户身份为商家
				// schedule=0时提示需要完善资料，确定后跳转资料完善页面（不管身份）
				// schedule=1时提示“申请信息处理中，请稍后再试...”，并且阻止进入提现页面
				// schedule=2时，正常提现
				uni.showActionSheet({
					itemList: ["提现平台帐户", "提现个人帐户", "提现企业账户"],
					success: (res) => {
						if (res.tapIndex == 0) {
							if (this.merchantStatus == 1) {
								uni.navigateTo({
									url: '../myself_PutForward/myself_PutForward?account=' + res.tapIndex +
										"&nowMoney=" + this.money.nowMoney +
										"&collectionMoney=" + this.money.collectionMoney +
										"&businessMoney=" + this.money.businessMoney
								});
							} else if (this.merchantStatus == 0) {
								uni.showModal({
									title: '提示',
									content: '尚未完善平台帐户信息，请先完善信息',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: "/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard?from=1"
											})
										}
									}
								});
							}
						} else if (res.tapIndex == 1) {
							if (this.merchantStatus == 1) {
								uni.navigateTo({
									url: '../myself_PutForward/myself_PutForward?account=' + res.tapIndex +
										"&nowMoney=" + this.money.nowMoney +
										"&collectionMoney=" + this.money.collectionMoney +
										"&businessMoney=" + this.money.businessMoney
								});
							} else if (this.merchantStatus == 0) {
								uni.showModal({
									title: '提示',
									content: '尚未完善个人帐户信息，请先完善信息',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: "/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard?from=1"
											})
										}
									}
								});
							}
						} else if (res.tapIndex == 2) {
							if (this.businessMerchantStatus == 2) {
								uni.navigateTo({
									url: '../myself_PutForward/myself_PutForward?account=' + res.tapIndex +
										"&nowMoney=" + this.money.nowMoney +
										"&collectionMoney=" + this.money.collectionMoney +
										"&businessMoney=" + this.money.businessMoney
								});
							} else if (this.businessMerchantStatus == 0) {
								uni.showModal({
									title: '提示',
									content: '尚未完善企业商户信息，请先完善信息',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: "/item_businessCard/businessCard_BusinessAttestation/businessCard_BusinessAttestation"
											})
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							} else if (this.businessMerchantStatus == 1) {

								this.show = true
								this.showtext = '账户名:' + '<br/>' + '资金账号:' + '<br/>' + '开户银行:' + '<br/>' + '打款激活金额:' + '<br/>' +
									'打款激活截止日期:'
								this.showtexts = this.acctName + '<br/>' + this.userAccount + '<br/>' + this.openingBank + '<br/>' + '￥' +
									this.amount + '<br/>' + this.actiDeadLine
								console.log(this.showtext, this.showtexts)
							}
						}


					}
				})


				//const {identity,schedule} = this.merchant;
				// 			if(schedule==0){
				// 				if(identity==0){
				// 					//添加银行卡
				// 					uni.showModal({
				// 						content:"需要添加银行卡才能提现",
				// 						showCancel:false,
				// 						success: () => {
				// 							uni.navigateTo({
				// 								url:"/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard"
				// 							})
				// 						}
				// 					})


				// 				}else{

				// 					// const {businessLicenseCard,bankCard,identityCard,identityCardBack} = this.merchant;

				// 					//注册子商户 成功就去上传图片
				// 					uni.showModal({
				// 						content:"需要完善资料才能提现",
				// 						showCancel:false,
				// 						success: () => {
				// 							uni.navigateTo({
				// 								url:"/item_businessCard/businessCard_BindBankcard/businessCard_BindBankcard?from=1"
				// 								// url:`/item_businessCard/businessCard_ShopInfo/step2_2/step2_2_1`
				// 							})
				// 						}
				// 					})


				// 				}

				// 			}else if(schedule==1){

				// 				uni.showModal({
				// 					content:"申请信息处理中，请稍后再试...",
				// 					showCancel:false,
				// 					success: () => {

				// 					}
				// 				})


				// 			}else if(schedule==2){
				// 				uni.showActionSheet({
				// 					itemList:["提现平台帐户","提现个人帐户","提现企业账户"],
				// 					success: (res) => {
				// 						uni.navigateTo({
				// 							url: '../myself_PutForward/myself_PutForward?account='+res.tapIndex
				// 							+"&nowMoney="+this.money.nowMoney
				// 							+"&collectionMoney="+this.money.collectionMoney
				// 							+"&businessMoney="+this.money.businessMoney
				// 						});
				// 					}
				// 				})

				// 			}


			},
		}

	}
</script>

<style lang="less" scoped>
	.page {
		background-color: #F8F8F8;
		min-height: 100vh;
		box-sizing: border-box;

		.navBox {
			padding: 30rpx;
			box-sizing: border-box;
			background: #ddd;
			margin-top: 20rpx;

			.nav {

				// width: 33%;
				// text-align: center;
				&.active {
					color: rgba(68, 83, 188, 1);
				}
			}
		}

		.list {
			.item {
				padding: 15rpx 30rpx;
				box-sizing: border-box;

				.namebox {
					width: 40%;
				}

				.name {
					font-size: 26rpx;
				}

				.time {
					font-size: 24rpx;
				}

				.order {
					font-size: 24rpx;
					width: 40%;

				}

				.money {
					width: 20%;
					text-align: right;
					font-size: 24rpx;
				}
			}
		}
	}

	.account-container {
		background: rgba(68, 83, 188, 1);
		height: 380upx;
		position: relative;
		box-sizing: border-box;
		padding: 35upx 30upx 0;

		.withdraw-btn-container {
			padding: 40upx;
			padding-right: 0;
			position: absolute;
			top: 0upx;
			right: 0;
			z-index: 10;
		}

		.withdraw-btn {
			width: 122upx;
			height: 50upx;
			line-height: 50upx;
			background: rgba(255, 171, 90, 1);
			border-radius: 27upx 0px 0px 27upx;

			font-size: 24upx;
			color: rgba(255, 255, 255, 1);

			image {
				vertical-align: middle;
				margin-top: -.2em;
				width: 26upx;
				height: 26upx;
				margin-right: 9upx;
				margin-left: 20upx;
			}
		}

		.title {
			font-size: 28upx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 40upx;

			opacity: 0.8;
			margin-bottom: 40upx;
		}

		.price {
			font-size: 36upx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			line-height: 90upx;
			letter-spacing: 1upx;
			font-size: 80upx;

			.small {
				font-size: 36upx;
				margin-right: 10upx;
			}
		}

		.info-pane {
			width: calc(100% - 60upx);
			height: 200upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 6upx 16upx 0px rgba(68, 83, 188, 0.08);
			border-radius: 10upx;
			position: absolute;
			bottom: -40upx;
			left: 30upx;


			.info-item {
				flex: 1;
				text-align: center;
				border-right: 1upx solid #EEEEEE;

				&:last-child {
					border-right: none;
				}

				.info-value {
					font-size: 32upx;
					color: rgba(51, 51, 51, 1);
					line-height: 45upx;
				}

				.info-type {
					font-size: 24upx;
					color: rgba(102, 102, 102, 1);
					line-height: 33upx;
				}
			}

		}


	}
</style>
