<template>
	<view class="container">
		<view class="Content" v-if="!hideSearch">
			<!-- 搜索 -->
			<view class="Search fx-row fx-row-center fx-row-space-around">
				<view class="Simage" @click="searchShop">
					<image class="Image" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
				</view>
				<view class="Sinput fs6a28">
					<input type="text" placeholder="请慎重申请，将会加入第一个通过审核的企业" maxlength="100" v-model="value" @blur="blurEvent($event)">
				</view>
			</view>
			<!-- 企业店铺列表 -->
			<view class="storeListBox">
				<view v-if="showCompanyList" class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in companyList"
				 :key="index">
					<view class="Limage">
						<default-image :src="item.logo" custom-class="Image"></default-image>
					</view>
					<view class="LTitle" @click="gotoShop(item.shopId)">
						<view class="LtitleName fs3a32">{{item.shopName}}</view>
						<view class="LtitleSubName fs6a24">已有员工{{item.employeeNum}}名 | 提成{{item.gain}}% </view>
					</view>
					<view class="applyBox" @click="ApplyForStaff(item.shopGrade,item.shopId)">
						<view class="Bapply fs6a28">申请</view>
					</view>
				</view>
				<!-- 搜索的结果列表 -->
				<view v-if="showSearchList" class="SBlist fx-row fx-row-center fx-row-space-around">
					<view class="Limage">
						<default-image :src="searchList.logo" custom-class="Image"></default-image>
					</view>
					<view class="LTitle" @click="gotoShop(searchList.shopId)">
						<view class="LtitleName fs3a32">{{searchList.shopName}}</view>
						<view class="LtitleSubName fs6a24"></view>
					</view>
					<view class="applyBox" @click="ApplyForStaff(searchList.shopGrade,item.shopId)">
						<view class="Bapply fs6a28">申请</view>
					</view>
				</view>
				<view v-if="notDataShow" class="DefaultPage">
					<default-page :messageToPage="messageToPage"></default-page>
				</view>
			</view>
		</view>

		<!--从招募员工的二维码进来  申请成为员工 -->
		<view class="storeListBox" v-if="hideSearch">
			<view class="SBlist fx-row fx-row-center fx-row-space-around">
				<view class="Limage">
					<image :src="shopInfor.logo" class="Image"></image>
					<!-- <default-image :src="shopInfor.logo" custom-class="Image"></default-image> -->
				</view>
				<view class="LTitle" @click="gotoShop(shopId)">
					<view class="LtitleName fs3a32">{{shopInfor.shopName}}</view>
					<view class="LtitleSubName fs6a24">已有员工{{shopInfor.employeeNum}}名 | 提成{{shopInfor.gainTotal}}% </view>
				</view>
				<view class="applyBox" @click="ApplyForStaff(shopInfor.shopGrade,shopId)">
					<view class="Bapply fs6a28">申请</view>
				</view>
			</view>
		</view>

		<!-- 同意协议 -->
		<!--<view class="agreement fx-row fx-row-center fx-row-space-around">-->
			<!--<view class="AgreeButton" @click="changeAgreeImge">-->
				<!--<image class="ABimage" :src="showAgreement ? 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png' : 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"-->
				 <!--alt=""></image>-->
			<!--</view>-->
			<!--<view class="AgreeTitle fs6a24">-->
				<!--已阅读并同意<text class="ATagreement" @click="openAgreement">《员工申请协议》</text>-->
			<!--</view>-->
		<!--</view>-->
		<!-- 弹出层 -->
		<view class="container3" v-show="showpopup">
			<view class="popup fs3a28">
				<!-- 申请成为会员 -->
				<view class="DeleteLog">
					<view class="DLlist">
						<view class="DLtitle">{{applyText}}</view>
						<view class="DLbutton fx-row fx-row-center fx-row-space-around">
							<view class="DLagree" @tap="DeleteLogAgree">确定</view>
							<!-- <view class="DLreject" @tap="DeletaLogCancle">取消</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				companyList: [
					// {id:0,title:'皮皮猪的咖啡屋',subTitle:'已有员工3名  |  提成20%  '}
				],
				searchList: '', //搜索出来的列表信息
				showSearchList: false, //搜索出来的列表信息
				showCompanyList: false, //企业的列表信息
				notDataShow: false, //搜索没有结果
				value: '',
				applyText: '',
				applyForSuccess: '申请成功，店铺管理员将会尽快处理您的申请',
				applyForagree: '需同意《员工申请协议》才能进行申请',
				showpopup: false,
				showAgreement: true,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/sousuo.png',
					title: '没搜到相关内容呢，换个关键字试试～'
				},
				hideSearch: false,
				qrCodeFrom: null,
				shopId: 0,
				shopInfor: [], //店铺资料
			}
		},
		methods: {
			// 申请成为员工
			ApplyForStaff(shopGrade, shopId) {

				if (!this.checkHasLogin(`/item_my/myself_ApplyForStaff/myself_ApplyForStaff?shopId=${shopId}`)) {
					return;
				}

				if (!this.showAgreement) {
					this.showpopup = true;
					this.applyText = this.applyForagree;
				} else {
					if (shopGrade == 3) {
						// console.log('vip3');
						uni.navigateTo({
							url: '../myself_selectGrop/myself_selectGrop?shopId=' + shopId
						});
					} else {
						// console.log('vip2');
						// console.log('勾选了协议');
						this.$api.insertEmployApplication2(shopId).then(res => {
							console.log(res);
							if (res == null) {
								this.showpopup = true;
								this.applyText = this.applyForSuccess;
							} else {
								this.showTips(res.ERROR).then(res => {})
							}
						}).catch(error => {
							this.showError(error);
						})
					}
				}
			},
			// 获取推荐企业列表
			listRecommendShop() {
				this.$api.listRecommendShop(1).then(res => {
					console.log(res);
					this.companyList = res.recommendShopList;
				}).catch(error => {
					this.showError(error);
				})
			},
			// 申请成功
			DeleteLogAgree() {
				this.showpopup = false;
			},
			// 同意协议
			changeAgreeImge() {
				this.showAgreement = !this.showAgreement;
			},
			// 搜索店铺
			searchShop() {
				if (this.value) {
					this.$api.searchShop(this.value, 1).then(res => {
						// console.log(res);
						if (res.shopList) {
							this.searchList = res.shopList;
							this.showCompanyList = false;
							this.showSearchList = true;
							this.notDataShow = false;
						} else {
							this.notDataShow = true;
							this.showCompanyList = false;
							this.showSearchList = false;
						}
					}).catch(error => {
						this.showError(error);
					})
				} else {
					this.showTips('请输入搜索的企业名称').then(res => {})
				}
			},
			//失去焦点时显示回来企业的列表信息
			blurEvent(e) {
				// console.log(e);
				if (!e.target.value) {
					this.showCompanyList = true;
					this.notDataShow = false;
					this.showSearchList = false;
				}
			},
			// 跳转至店铺
			gotoShop(shopId) {
				uni.navigateTo({
					url: '../../module/shop/home/home?shopId=' + shopId
				});
			},

			// 从招募员工的二维码进来  申请成为员工   获取店铺信息
			getShopDetail() {
				this.showLoading();
				this.$api.getShopDetail(this.shopId).then(res => {
					this.hideLoading();
					this.shopInfor = res.shopData;
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
				})
			},
			openAgreement () {
				this.navigateTo('/pages/WebView', { url: encodeURIComponent('https://xk.gzskxx.com/usercenter-service/view/employee') })
			},
		},
		onLoad(e) {
			this.showCompanyList = true; //企业列表
			this.listRecommendShop();

			// 扫描二维码获取的数据    // 从招募员工的二维码进来  申请成为员工
			console.log(e);
			if (e.shopId) {
				this.hideSearch = true;
				this.shopId = Number(e.shopId) || '';
				this.getShopDetail();
			}
			// 线上环境
			if (e.scene) {
				var scene = decodeURIComponent(e.scene)
				var arrPara = scene.split("&");
				var arr = [];
				var testData = {};
				for (var i in arrPara) {
					arr = arrPara[i].split("=");
					if (i == 0) {
						testData.qrCodeFrom = arr[1];
						this.qrCodeFrom=Number(arr[1]);
					} else {
						testData.shopId= arr[1];
						this.shopId=Number(arr[1]);
					}
					this.hideSearch = true;
				}
				this.getShopDetail();
			}
		}
	}
</script>

<style lang="less">

	@import '../../css/mzl_base.less';

	page {
		width: 100%;
		height: 100%;
		background: @grayBg;
	}

	.container {
		width: 100%;
		border-top: 1upx solid #eee;

		.Content {
			padding: 30upx;
			margin-bottom: 60upx;
		}

		// 搜索
		.Search {
			background: #fff;
			padding: 20upx;
			height: 72upx;
			box-sizing: border-box;

			.Simage {
				width: 12%;

				.Image {
					width: 32upx;
					height: 32upx;
					vertical-align: middle;
					margin-left: 10upx;
				}
			}

			.Sinput {
				width: 88%;

				input {
					width: 100%;
					border: none;
					margin-top: 10upx;
				}
			}
		}

		// 店铺列表
		.storeListBox {
			margin-top: 30upx;
			background: @grayBg;

			.SBlist {
				background: #fff;
				padding: 30upx;
				margin-bottom: 30upx;

				.Limage {
					width: 22%;

					.Image {
						width: 110upx;
						height: 110upx;
						vertical-align: middle
					}
				}

				.LTitle {
					width: 58%;

					.LtitleName {
						font-size: 30upx;
						height: 70upx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

				.applyBox {
					width: 20%;
					text-align: right;
					.buttonRadius(@w: 130upx, @h: 64upx, @bg: #F4F5FF);
					text-align: center;
					line-height: 64upx;
					border: 1upx solid @tabActive;
					color: @tabActive;
				}
			}

			.DefaultPage {
				position: fixed;
				top: 50%;
				left: 50%;
				margin-top: -86upx;
				margin-left: -230upx;
				text-align: center;
			}
		}

		// 同意协议
		.agreement {
			width: 100%;
			position: fixed;
			bottom: 0;
			background: #fff;
			height: 98upx;
			padding: 50upx;
			border-top: 1upx solid #eee;

			.AgreeButton {
				width: 10%;
				text-align: left;

				.ABimage {
					width: 30upx;
					height: 30upx;
					vertical-align: middle
				}
			}

			.AgreeTitle {
				width: 90%;

				.ATagreement {
					font-size: 24upx;
					color: @tabActive;
				}
			}
		}

		// 弹出层
		.container3 {
			.popup {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, .5);
				text-align: center;
				z-index: 99999999;

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
							font-weight: bold;
							height: 170upx;
							padding: 40upx;
							font-weight: 200;
							line-height: 50upx;
						}

						.DLbutton {
							font-size: 28upx;
							border-top: 1upx solid #E1E1E1;

							.DLagree {
								width: 100%;
								height: 87upx;
								line-height: 87upx;
								color: #6B7AF8;
							}

							.DLagree {
								color: #3576EE;
								border-right: 1upx solid #E1E1E1;
							}
						}
					}
				}
			}
		}
	}
</style>
