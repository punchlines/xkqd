<template>
	<view class="container">
		<view class="styleCon fx-row fx-row-center fx-row-space-between" v-if="userType>1&&userType<5">
			<view class="PopularCon fx-row fx-row-center" @click="popularClick">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/renqi.png'" alt=""></image>
				<text>人气排行</text>
			</view>
			<view class="nearbyCon fx-row fx-row-center" @click="nearbyClick">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/fujin.png'" alt=""></image>
				<text>附近名片</text>
			</view>
		</view>
		<!-- 搜索框 -->
		<view :class="[userType>4||userType<2?'searchCon_dj':'','fx-row','fx-row-center','searchCon']">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/sousuo.png'" alt=""></image>
			<input type="text" placeholder="请输入姓名/公司/职位" v-model="shareText" class="input">
		</view>
		<!-- 待处理名片 -->
		<view class="treateCon">
			<!-- 标题 -->
			<view class="titleCon fx-row fx-row-space-between">
				<text class="title">待处理名片({{pendingCard.length}})</text>
				<wx-view  custom-class="right">
					<view class="right" @click="treatedClick">
						<text class="more">查看全部</text>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/you.png'" mode="widthFix"></image>
					</view>
				</wx-view>
				
			</view>
			<!--  待处理滑动框 -->
			<view v-if="pendingCard.length>0" class="scrollCon">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" next-margin="58px">
					<swiper-item v-for="item in pendingCard">
						<view class="cardCon fx-row fx-row-space-between" @click="openCardDetail(item)">
							<default-image :src="item.headImage" custom-class="aa"></default-image>
							<view class="info fx-column fx-row-space-between">
								<view class="name">{{item.name}}</view>
								<view class="detail">{{item.job}} | {{item.company}}</view>
							</view>
							<view class="collect" @click.stop="collectClick(item)">收藏</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 待处理缺省图 -->
			<view v-if="pendingCard.length==0" class="default fx-row fx-row-center">
				<view class="DefaultImage">
					<default-page :messageToPage="messageToPage"></default-page>
				</view>
			</view>
		</view>
		<!-- 我的名片夹 -->
		<view class="myCon">
			<view class="mycard">
				<view class="title">我的名片夹</view>
				<!--  #ifdef  APP-PLUS -->
				<view class="leadinCon fx-row fx-row-center fx-row-right" @click="showWarrant">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/lianxiren.png'" mode="widthFix"></image>
					<view>导入通讯录</view>
				</view>
				<!--  #endif -->
			</view>

			<view class="collCon fx-row fx-row-center" v-for="(item,index) in collectList" :key="index" @click="openCardDetail(item)">
				<image :src="item.headImage" class="ava"></image>
				<view class="infoCon fx-column">
					<view class="fx-row">
						<view class="name">{{item.name}}</view>
						<view class="position">{{item.job}}</view>
					</view>
					<view class="company">{{item.company}} </view>
				</view>

				<view class="more">
					<view class="icon_more" @click.stop="isCall(index)">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/dianhua.png'" mode="widthFix" class="call"></image>
					</view>
					<view class="dropDown" v-show="showDropDown === index">
						<view @click.stop="callPhone(item)">拨打号码</view>
						<view @click.stop="savePhone(item)">保存到通讯录</view>
					</view>
				</view>
			</view>


		</view>
		<!-- 我的名片夹缺省图 -->
		<view v-if="collectList.length === 0 && !loading" class="default fx-row fx-row-center">
			<view class="DefaultImage" style="width:100%;">
				<default-page :messageToPage="messageToPage1"></default-page>
			</view>
		</view>
		<uni-load-more v-else :loading-type="loadingType" ></uni-load-more>

		<!-- 悬浮框 -->
		<view class="adbookModel" v-show="isWarrant">
			<view class="adbookCon fx-column fx-row-center">
				<view class="title">“销刻渠道”将访问您的通讯录</view>
				<view class="content">销刻渠道将访问您的通讯录，允许后，将好友名片收藏至我的名片</view>
				<view class="seCon fx-row fx-row-center">
					<view class="no item" @click="noWarrant">不允许</view>
					<view class="line"></view>
					<view class="yes item" @click="agreeWarrant">允许</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {

		mixins: [loadMoreMixins],

		data() {
			return {
				showDropDown: '',
				isWarrant: false,
				shareList: [], //我的名片夹
				pendingCard: [], //待处理名片
				indicatorDots: false,
				autoplay: false,
				interval: 5000,
				duration: 1000,
				onlineSite: this.global.onlineSite,
				shareText: '',
				showPhoneNumber: false,
				messageToPage: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '您当前没有待处理名片'
				},
				messageToPage1: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '您当前的名片夹暂无名片'
				},

				needUpdate: false,
			};
		},

		computed: {
			// 筛选名片
			collectList() {
				console.info(11)
				let tmpdata = this.shareText;
				return this.shareList.filter(item => {
					return item.name.indexOf(tmpdata) > -1 || item.job.indexOf(tmpdata) > -1 || item.company.indexOf(tmpdata) > -1
				});
			},
			...mapState(['userType']),
		},

		// 监听页面加载
		onLoad() {
			this.fetch();
			this.listMyCardWalletPengding();
		},

		onShow () {
			if (this.needUpdate) {
				this.listMyCardWalletPengding();
				this.reset();
				this.fetch();
			}
		},

		methods: {
			openCardDetail(item) {
				if (item.id == this.currentUser.id) {
					return;
				}
				uni.navigateTo({
					url: '/pages/businessCard2/businessCard2?cardUserId=' + item.id
				});
			},
			collectClick(item) { //收藏待处理名片
				let id = item.id;
				let arr = [];
				arr.push(id);
				this.$api.insertPendingCard(JSON.stringify(arr)).then(result => {
					this.listMyCardWalletPengding();
					this.reset();
					this.fetch();
				}).catch(error => {
					console.error(error)
				})

			},
			fetch () { //我的名片夹
				this.$api.listMyCardWallet(1, this.currentPage).then(result => {
					if (this.currentPage === 1) {
						this.shareList = [];
					}
					this.loading = false;
					const list = result.collectList;
					if (list.length === 0) {
						this.noMore = true;
					}
					this.shareList = this.shareList.concat(list);
					this.currentPage++;
				}).catch(error => {
					console.error(error)
				})
			},

			listMyCardWalletPengding() {
				this.$api.listMyCardWallet(0, 1).then(result => {
					this.pendingCard = result.collectList
					// console.log(this.pendingCard.length)
				}).catch(error => {
					console.error(error)
				})
			},
			callPhone(item) { //拨打号码
				this.showDropDown = -1;
				if (item.isHidePhone == 1) {
					this.showTips('对方设置了号码隐藏')
					return;
				}
				let phone = item.phone;
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			savePhone(item) { //保存到通讯录
				this.showDropDown = -1;
				if (item.isHidePhone == 1) {
					this.showTips('对方设置了号码隐藏')
					return;
				}
				let phone = item.phone;
				let nickName = item.name;
				uni.addPhoneContact({
					nickName: nickName,
					// lastName: '姓',
					firstName: nickName,
					mobilePhoneNumber: phone,
					success: function() {
						console.log('success');
					},
					fail: function() {
						console.log('fail');
					}
				});
			},
			//点击事件
			popularClick() { //人气排行
				uni.navigateTo({
					url: '../businessCard_PopularRank/businessCard_PopularRank'
				});
			},
			nearbyClick() { //附近名片
				uni.navigateTo({
					url: '../businessCard_NearBy/businessCard_NearBy'
				});
			},
			treatedClick() { //待处理名片
				uni.navigateTo({
					url: '../businessCard_TreatCard/businessCard_TreatCard'
				})
			},
			isCall(index) { //拨打电话
				if (this.showDropDown === index) {
					this.showDropDown = -1;
				} else {
					this.showDropDown = index;
				}

			},
			showWarrant() { //是否导入通讯录
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => { //获取通讯录信息
					// 可通过addressbook进行通讯录操作
					addressbook.find(null, (contacts) => {

						let list = [];

						contacts.forEach(item => {
							const phoneNumbers = item.phoneNumbers;
							const organization = item.organizations[0];

							phoneNumbers.forEach(phone => {
								if (phone.value.match(/^1\d{10}$/)) {
									list.push({
										phone: phone.value,
										name: item.displayName,
										company: organization ? organization.name : '',
										job: organization ? organization.title : '',
									})
								}
							})

						})

						if (list.length === 0) {
							this.showError('无法获取通讯录信息或通讯录信息为空')
							return;
						}

						this.showLoading();
						this.$api.addAddressBook(JSON.stringify(list)).then(result => {
							uni.hideLoading();
							this.reset();
							this.fetch();
							this.showTips('导入成功');
						}).catch(error => {
							this.showError(error)
							uni.hideLoading();
						})
						console.log(JSON.stringify(list))

					}, (e) => {
						this.showError(e)
					});

				}, (e) => {
					this.showError(e)
				});

			},
			//不允许访问通讯录
			noWarrant() {
				this.isWarrant = !this.isWarrant;
			},
			// 允许访问通讯录
			agreeWarrant() {
				this.isWarrant = !this.isWarrant;
			},
		},

	}
</script>

<style lang="less">
	@import "../../css/jss_base.less";

	page {
		background: #F5F5F5;
	}

	.container {

		// 搜名片类型
		.styleCon {
			font-family: PingFangSC;
			font-size: 32upx;
			color: #333333;
			box-sizing: border-box;
			padding: 40upx 30upx;

			image {
				width: 42upx;
				height: 42upx;
				margin-left: 40upx;
				margin-right: 20upx;
			}

			.PopularCon {
				width: 330upx;
				height: 120upx;
				background: #ffffff;
			}

			.nearbyCon {
				width: 330upx;
				height: 120upx;
				background: #ffffff;
			}
		}

		// 搜索框
		.searchCon_dj {
			margin-top: 40upx !important;
		}

		.searchCon {
			width: 92%;
			margin: 0 auto;
			height: 72upx;
			box-sizing: border-box;
			padding: 0 30upx;
			background: #ffffff;

			image {
				width: 32upx;
				height: 32upx;
				padding-right: 30upx;
			}

			.input {
				height: 40upx;
				font-size: 28upx;
			}
		}

		// 待处理
		.treateCon {
			width: 100%;

			.titleCon {
				margin: 45upx 0 32upx 0;
				box-sizing: border-box;
				padding: 0 30upx;

				.title {
					font-size: 32upx;
					color: #333333;
					font-family: PingFangSC;
					font-weight: 500;
				}

				.right {
					.more {
						font-size: 24upx;
						color: #666666;
					}

					&>image {
						width: 14upx;
						height: 24upx;
						margin-left: 16upx;
					}
				}
			}

			.default {
				.DefaultImage {
					margin: 0 auto;
					width: 100%;
				}
			}

			// 滑动框
			.scrollCon {
				swiper {
					height: 180upx;
					width: 100%;

					swiper-item:first-child {
						margin-left: 30upx !import;
					}
				}

				.cardCon {
					width: 90%;
					position: relative;
					background: #FFFFFF;
					box-sizing: border-box;
					padding: 40upx;
					border-radius: 8upx;
					margin-left: 30upx;

					.aa {
						width: 100upx;
						height: 100upx;
						margin-right: 30upx;
					}

					.info {
						width: 70%;

						.name {
							font-size: 32upx;
							color: #333333;
						}

						.detail {
							width: 100%;
							font-size: 24upx;
							color: #999999;
							.ellipsis(); //超出部分显示...
						}
					}

					.collect {
						position: absolute;
						top: 20upx;
						right: 20upx;
						width: 110upx;
						height: 48upx;
						line-height: 48upx;
						background: #6B7AF8;
						font-size: 24upx;
						color: #ffffff;
						text-align: center;
					}
				}
			}
		}

		// 名片夹
		.myCon {
			margin-top: 52upx;
			padding-bottom: 24upx;

			.mycard {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 30upx 33upx 30upx;

				.title {
					font-size: 32upx;
					color: #333333;
					width: 35%;
				}

				.leadinCon {
					width: 65%;

					image {
						width: 32upx;
						height: 32upx;
						margin-right: 16upx;
					}

					font-size:24upx;
					color:#6B7AF8;
				}
			}

			.collCon {
				width: 92%;
				margin: 0 auto;
				background: #FFFFFF;
				box-sizing: border-box;
				padding: 50upx 30upx;
				margin-bottom: 24upx;
				border-radius: 10upx;

				.ava {
					width: 100upx;
					height: 100upx;
					margin-right: 30upx;
				}

				.infoCon {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 32upx;
						color: #333333;
						margin-right: 22upx;
						margin-bottom: 20upx;
					}

					.position {
						height: 36upx;
						line-height: 36upx;
						padding: 0 15upx;
						background: #F1F1F1;
						font-size: 20upx;
						color: #666666;
						border-radius: 18upx;
						text-align: center;
					}

					.company {
						font-size: 24upx;
						color: #999999;
					}
				}

				.more {
					position: relative;

					.call {
						width: 60upx;
						height: 60upx;
					}
				}

				.dropDown {
					width: 280upx;
					position: absolute;
					top: 70upx;
					right: -10upx;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0upx 1upx 8upx 0upx rgba(187, 187, 187, 0.55);
					z-index: 1000;
					zoom: 1;
					border-radius: 8upx;

					view {
						font-size: 28upx;
						color: #333333;
						line-height: 104upx;
						text-align: center;

						&:after {
							content: "";
							display: block;
							width: calc(~"100%"- 40upx);
							height: 2upx;
							background-color: #E1E1E1;
							margin-left: 20upx;
						}

						&:active {
							background-color: #eee;
						}

						&:last-child {
							&:after {
								display: none;
							}
						}

					}

					&:before {
						content: "";
						position: absolute;
						width: 0;
						height: 0;
						top: 0;
						right: -15upx;
						box-sizing: border-box;
						border: 16upx solid black;
						border-color: transparent transparent #fff #fff;
						transform-origin: 0 0;
						transform: rotate(135deg);
						box-shadow: -1upx 1upx 8upx -1upx rgba(187, 187, 187, 0.55);
					}
				}
			}
		}

		//弹出框
		.adbookModel {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
			font-family: PingFangSC;

			.adbookCon {
				width: 580upx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -290upx;
				margin-top: -153upx;
				box-sizing: border-box;
				padding: 29upx 0 0 0;
				background: #fff;
				border-radius: 20upx;

				.title {
					font-size: 36upx;
					color: #333333;
					margin-bottom: 23upx;
					font-weight: 500;
					padding: 0 40upx;
				}

				.content {
					max-width: 500upx;
					text-align: center;
					font-size: 28upx;
					color: #333333;
					font-weight: 400;
					margin-bottom: 28upx;
					padding: 0 40upx;
				}

				.seCon {
					width: 100%;
					border-top: 1px solid #E1E1E1;

					.item {
						width: 50%;
						height: 87upx;
						line-height: 87upx;
						text-align: center;
						font-size: 28upx;
					}

					.yes {
						color: #6B7AF8;
					}

					.no {
						color: #666666;
					}

					.line {
						width: 1px;
						height: 87upx;
						color: #D8D8D8;
					}
				}
			}
		}
	}
</style>
