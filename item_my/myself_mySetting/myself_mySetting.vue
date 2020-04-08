<template>

	<view class="container page">
		<!-- 头部开关设置 -->
		<view class="settingBox">
			<view class="SBseting">
				<view class="Sitem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in setting" :key="index">
					<view class="Stitle">
						<view class="TtitleName fs3a28">{{item.title}}</view>
						<view class="TsubTitle fs6a24">{{item.subTitle}}</view>
					</view>
					<view class="Sbutton" @click="changeImage(index)">
						<image class="Bimage" :src="item.show?item.imageOpen:item.imageClose" alt=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 其他设置 -->
		<!-- 支付密码。手机号码 -->
		<view class="settingOther">
			<view class="SOlist fx-row fx-row-center fx-row-space-around" @click="payDetail(index)" v-for="(item,index) in paySetting"
			 :key="index">
				<view class="SOitem">
					<view class="Stitle fs3a28">{{item.title}}</view>
				</view>
				<view class="SOimage">
					<text class="soPhone fs6a28" v-if="index==1">{{tel}}</text>
					<image v-if="!index==1" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt="" class="soImage"></image>
				</view>
			</view>
		</view>
		<!-- 解绑企业 -->
		<view class="settingOther" v-if="userType==5||userType==6">
			<view class="SOlist fx-row fx-row-center fx-row-space-around" @click="unbindBySubordinate">
				<view class="SOitem">
					<view class="Stitle fs3a28">{{unbindBySubordinateName}}</view>
				</view>
				<view class="SOimage">
					<text class="soPhone fs6a28"></text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt="" class="soImage"></image>
				</view>
			</view>
		</view>
		<!-- 收货地址，意见反馈 -->
		<view class="settingOther">
			<view class="SOlist fx-row fx-row-center fx-row-space-around borderB" @click="addressManageDetail(index)" v-for="(item,index) in addressManage"
			 :key="index">
				<view class="SOitem">
					<view class="Stitle fs3a28">{{item.title}}</view>
				</view>
				<view class="SOimage">
					<text class="soPhone fs6a28"></text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt="" class="soImage"></image>
				</view>
			</view>
		</view>
		<!-- 日志隐私类型 -->
		<view class="settingOther settingOther1">
			<view class="SOlist fx-row fx-row-center fx-row-space-around" @click="selectJournal">
				<view class="SOitem SOitem1">
					<view class="Stitle fs3a28">允许朋友查看日志的范围</view>
				</view>
				<view class="logPrivacy1 fs6a28">{{privacy}}</view>
				<view class="SOimage SOimage1">
					<text class="soPhone fs6a28"></text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt="" class="soImage"></image>
				</view>
			</view>
		</view>
		<!-- 退出登录 -->
		<!--  #ifdef  APP-PLUS -->  
		<view class="Logout" @click="LogoutUserInfo">
			<view class="LogoutBtn fs3a28">退出登录</view>
		</view>
		<!--  #endif -->
		<!-- 弹出层 -->
		<view class="container3" v-show="showpopup">
			<view class="popup fs3a28" @tap="prevention">
				<!-- 解除企业绑定 -->
				<view class="DeleteLog">
					<view class="DLlist">
						<view class="DLtitle">是否要解绑与“{{unbindBy}}”的员工关系</view>
						<view class="DLbutton fx-row fx-row-center fx-row-space-around">
							<view class="DLagree" @tap="DeleteLogAgree">确定</view>
							<view class="DLreject" @tap="DeletaLogCancle">取消</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import mzlJS from "../../js/mzl.js";
	import api from "../../js/api.js";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				// 设置按钮
				setting: [{
						id: 0,
						title: '不让陌生人看到我的名片',
						subTitle: '名片不会出现在附近和排行榜上',
						show: false,
						imageClose: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button0.png',
						imageOpen: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button1.png',
					},
					{
						id: 1,
						title: '隐藏手机号码',
						subTitle: '为手机号码中间4位数加密',
						show: false,
						imageClose: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button0.png',
						imageOpen: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button1.png',
					},
					{
						id: 2,
						title: '2G/3G/4G自动播放',
						subTitle: '',
						show: false,
						imageClose: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button0.png',
						imageOpen: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button1.png',
					},
					{
						id: 3,
						title: '名片圈默认展示日志',
						subTitle: '',
						show: false,
						imageClose: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button0.png',
						imageOpen: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/button1.png',
					}
				],
				paySetting: [{
						id: 0,
						title: '支付密码'
					},
					{
						id: 1,
						title: '手机号码'
					},
				],
				unbindBySubordinateName: '解绑企业',
				addressManage: [{
						id: 3,
						title: '收货地址管理'
					},
					{
						id: 4,
						title: '意见反馈'
					}
				],
				showpopup: false, //显示解绑弹窗
				passwordStatus: '', //是否已经设置密码
				tel: '13632426959',
				phoneTel: '', //加密前传到下个页面
				shopId: 0,
				userId: 0,
				userType: 0,
				unbindBy: '',
				privacy: '全部显示',
			}
		},
		methods: {
			// 开关操作 	不让陌生人可见:0否，1是 ;; 是否隐藏手机号码：0否，1是;;移动网络自动播放：0否，1是
			changeImage(index) {
				this.setting[index].show = !this.setting[index].show;
				if (index == 0) {
					if (this.setting[index].show) {
						this.$api.settingStatusSt(1).then(result => {
							this.showTips('设置成功').then(res => {});
						})
					} else {
						this.$api.settingStatusSt(0).then(res => {});
					}
				} else if (index == 1) {
					if (this.setting[index].show) {
						this.$api.SettingStatusPh(1).then(result => {
							this.showTips('设置成功').then(res => {});
						})
					} else {
						this.$api.SettingStatusPh(0).then(res => {});
					}
				} else if (index == 2) {
					if (this.setting[index].show) {
						this.$api.SettingStatusPl(1).then(result => {
							this.showTips('设置成功').then(res => {});
						})
					} else {
						this.$api.SettingStatusPl(0).then(res => {});
					}
				}else if (index == 3) {
					if (this.setting[index].show) {
						this.$api.SettingStatusLog(1).then(result => {
							this.showTips('设置成功').then(res => {});
						})
					} else {
						this.$api.SettingStatusLog(0).then(res => {});
					}
				}
			},
			//获取更新后的用户信息
			getUserCardDetails() {
				this.$api.getUserInfor(this.userId).then(result => {
					const user = result.userMap;
					this.userType = result.userMap.userType;
					uni.setStorageSync('userType', user.userType);
				}).catch(error => {
					// TODO: 请求失败处理
					this.showError(error);
				})
			},
			// 支付，手机号码修改
			payDetail(index) {
				if (index == 0) {
					//支付密码
					uni.navigateTo({
						url: '../myself_PagePassward/myself_PagePassward?passwordStatus=' + this.passwordStatus
					});
				} else if (index == 1) {
					// 手机号码
					// uni.navigateTo({
					// 	url: '../myselt_settingPhone/myselt_settingPhone?phone=' + this.phoneTel
					// });
				}
			},
			// 解绑企业
			unbindBySubordinate() {
				// 解绑企业下级对上级解除企业关系   销售经理 && 销售总监  可以解除对企业的关系
				console.log('用户userType：');
				console.info(Number(this.userType));
				if (Number(this.userType) == 5 || Number(this.userType) == 6) {
					this.$api.getShopDetail(this.shopId).then(res => {
						this.showpopup = true;
						console.log(res.shopData.shopName);
						this.unbindBy = res.shopData.shopName;
					})
				}
			},
			// 收货地址，意见反馈
			addressManageDetail(index) {
				if (index == 0) {
					// 收货地址管理
					uni.navigateTo({
						url: '../../module/shop/address/address?adressFrom=0'
					});
				} else if (index == 1) {
					// 意见反馈
					uni.navigateTo({
						url: '../myself_suggestions/myself_suggestions'
					});
				}
			},
			// 跳转页面
			gotoDetail(index) {
				if (index == 0) {
					//支付密码
					uni.navigateTo({
						url: '../myself_PagePassward/myself_PagePassward?passwordStatus=' + this.passwordStatus
					});
				} else if (index == 1) {
					// 手机号码
					uni.navigateTo({
						url: '../myselt_settingPhone/myselt_settingPhone?phone=' + this.phoneTel
					});
				} else if (index == 2) {
					// 解绑企业下级对上级解除企业关系   销售经理 && 销售总监  可以解除对企业的关系
					console.log('用户userType：');
					console.info(Number(this.userType));
					if (Number(this.userType) == 5 || Number(this.userType) == 6) {
						this.$api.getShopDetail(this.shopId).then(res => {
							this.showpopup = true;
							console.log(res.shopData.shopName);
							this.unbindBy = res.shopData.shopName;
						})
					} else {
						this.showTips('您暂无绑定相关企业').then(res => {})
						return;
					}
				} else if (index == 3) {
					// 收货地址管理
					uni.navigateTo({
						url: '../../module/shop/address/address?adressFrom=0'
					});
				} else if (index == 4) {
					// 意见反馈
					uni.navigateTo({
						url: '../myself_suggestions/myself_suggestions'
					});
				}
			},
			// 同意解除关系
			DeleteLogAgree() {
				this.showpopup = false;
				this.$api.unbindBySubordinate(this.userId).then(res => {
					console.log(res);
					this.showTips('成功解绑企业关系').then(res => {
						this.getUserCardDetails();
						this.showpopup = false;
					})
				}).catch(error => {
					this.showError(error);
				})
			},
			// 取消解除关系
			DeletaLogCancle() {
				this.showpopup = false;
			},
			// 检验是否设置了密码,传到下一页  0:未设置  1：已经设置
			CheckPassword() {
				this.$api.checkPassword().then(res => {
					console.log('res.passwordStatus:' + res.passwordStatus);
					this.passwordStatus = res.passwordStatus;
				}).catch(error => {
					this.showError(error);
				})
			},
			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo']),
			// 退出登录
			LogoutUserInfo() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					success:(res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.clearStorageSync();
							this.$store.commit('updateCurrentUser', null);
							console.log('退出登录');
							uni.reLaunch({
								url: '../../pages/login/login'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 查看日志范围
			selectJournal() {
				uni.navigateTo({
					url: '../myself_settingLogPrivacy/myself_settingLogPrivacy'
				});
			},
		},
		onLoad(options) {
			this.shopId = uni.getStorageSync('shopId');
			this.userId = uni.getStorageSync('userId');
			this.userType = uni.getStorageSync('userType');
			this.CheckPassword();
			this.tel = options.phone;
			this.phoneTel = options.phone;
			// 接收日志修改状态类型
			if (options.privacy) {
				this.privacy = options.privacy;
			}
			// 手机加密
			this.tel = this.tel.slice(0, 3) + '****' + this.tel.substr(7);

		},

		onShow() {
			const userId = uni.getStorageSync('userId');
			if (userId) {
				this.$api.getUserInfor(userId).then(result => {
					const user = result.userMap;
					console.info(user.strangerCanSee);
					console.info(user.hidePhoneNum);
					console.info(user.mobileNetworkAutoplay);
					this.setting[0].show = Number(user.strangerCanSee);
					this.setting[1].show = Number(user.hidePhoneNum);
					this.setting[2].show = Number(user.mobileNetworkAutoplay);
					this.setting[3].show = Number(result.logStatus);
					
					this.tel = user.phone.slice(0, 3) + '****' + user.phone.substr(7);
					//  '日志隐私类型。1：全部可见；2：3天内可见；3：半年内可见；4：一年内可见'
					let journalList = ['全部可见', '3天内可见', '半年内可见', '一年内可见'];
					this.privacy = journalList[Number(result.userMap.journalType) - 1];
				}).catch(error => {
					// TODO: 请求失败处理
					this.showError(error);
				})
			}
		},

	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';

	.page {
		background: #F5F5F5;
		width: 100%;
		min-height: 100vh;
	}

	.container {
		border-top: 1upx solid #eee;
		padding-bottom:140upx;
		background: #F5F5F5;

		// 头部开关设置
		.settingBox {
			.SBseting {
				width: 100%;

				.Sitem {
					padding: 30upx;
					background: #fff;
					line-height: 50upx;
					border-bottom: 1upx solid #eee;

					.Stitle {
						width: 80%;

						.TtitleName {
							font-weight: 900upx;
						}
					}

					.Sbutton {
						width: 20%;
						text-align: right;

						.Bimage {
							width: 90upx;
							height: 48upx;
						}
					}
				}
			}
		}

		// 其他设置
		.settingOther {
			margin-top: 30upx;

			.SOlist {
				padding: 30upx;
				background: #fff;
				border-bottom: 1upx solid #eee;

				.SOitem {
					width: 50%;
					text-align: left
				}

				.SOimage {
					width: 50%;
					text-align: right;

					.soPhone {
						margin-right: 30upx;
					}

					.soImage {
						width: 12upx;
						height: 24upx;
						vertical-align: middle
					}
				}

				.SOitem1 {
					width: 50%;
				}

				.logPrivacy1 {
					width: 40%;
					text-align: right;
				}

				.SOimage1 {
					width: 10%;
				}

			}
		}

		.settingOther1 {
			margin-top: 0;
		}

		// 退出登录
		.Logout {
			border: 1upx solid #E1E1E1;
			width: 100%;
			background: #fff;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			position: fixed;
			bottom: 0;

			.LogoutBtn {
				font-weight: 500;
			}
		}

		// 弹出层
		.container3 {
			z-index: 99999999;

			.popup {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, .5);
				text-align: center;

				// 删除日志
				.DeleteLog {
					.DLlist {
						width: 560upx;
						height: 260upx;
						background: #fff;
						position: absolute;
						border-radius: 10upx;
						top: 50%;
						left: 50%;
						margin-left: -280upx;
						margin-top: -130upx;

						.DLtitle {
							font-size: 32upx;
							color: #333;
							text-align: center;
							height: 170upx;
							padding: 40upx;
							font-weight: 200;
							line-height: 50upx;
						}

						.DLbutton {
							font-size: 28upx;
							border-top: 1upx solid #E1E1E1;

							.DLagree,
							.DLreject {
								width: 50%;
								height: 87upx;
								line-height: 87upx;
								;
							}

							.DLagree {
								color: #3576EE;
								border-right: 1upx solid #E1E1E1;
							}

							.DLreject {
								color: #999999;
							}
						}
					}
				}
			}
		}
	}
</style>
