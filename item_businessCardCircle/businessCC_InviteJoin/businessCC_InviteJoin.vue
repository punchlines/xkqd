<template>
	<view class="container">
		<app-share-top-banner></app-share-top-banner>
		<!-- 头部 -->
		<view class="topBg"></view>
		<!-- 圈子信息 -->
		<!-- :style="{'margin-top':circle.freeCourseList.length>0?'0':'-220rpx'}" :avatar="circle.mpCardCircle.headImage" -->
		<view class="circleInfo">
			<view class="infoTop">
				<view class="info fx-row">
					<view class="avatar">
						<circle-avatar :images="circle.headImages" :width='width'></circle-avatar>
					</view>
					<view style="width: 100%;">
						<view class="title">{{ circle.title }}</view>
						<view class="txt">ID:<text style="margin-left: 10rpx;">{{ circle.number }}</text></view>
						<!-- <view class="label txt" v-if="circle.circleTypeName">{{ circle.circleTypeName }}</view> -->
						<view class="infoBottom fx-row">
							<view class="item fx-row fx-row-center">
								<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.XjiVHcTlUAtzd9146c328a9291344bb3a3565969b244.png'"
								 class="people"></image>
								<text>{{ circle.memberNum }} 人</text>
							</view>
							<view class="item fx-row fx-row-center">
								<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.hbKST2kGEXw950e401b5b34340cad84e84ce2fd1d74a.png'"
								 class="huati"></image>
								<text>{{ circle.topicNum }}</text>
							</view>

							<!-- <view v-if="isPinGroup" class="item groupavatar fx-row fx-row-right">
								<image class="avatar" v-for="(it,inx) in circle.headImage" :key="inx" :src="it"></image>
							</view> -->
						</view>
					</view>
				</view>

			</view>

		</view>


		<template>
			<view class="manCon" @click="openUserDetail">
				<view class="fx-row fx-row-space-between fx-row-center">
					<image :src="circle.lordHeadImg" class="manager"></image>
					<view class="fx-column" style="flex: 1">
						<view class="name">{{ circle.lordUserName }}</view>
						<view class="posi fx-row fx-row-center">
							<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.DEihmYSje8XFdbbf4daeddcd2fc229d2ae8d010a5329.png'"></image>
							<text>管理员</text>
						</view>
					</view>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" mode="widthFix" class="rightImg"></image>
				</view>
			</view>


			<!-- 圈子介绍 -->
			<view class="introduce" v-if="circle.circleIntroduce">
				<view class="title">社群介绍</view>
				<view class="content">
					{{ circle.circleIntroduce }}
				</view>
			</view>
		</template>
		<!-- 视频 -->
		<view class="h3" v-if="circle.freeCourseList.length>0">视频介绍</view>
		<view class="videoContainer" v-if="circle.freeCourseList.length>0">
			<view class="videoBox" id="scrollId" :class="{'is-fixed': isFixed}">
				<video id="myVideo" class="video" :src="circle.freeCourseList[currentIndex].video" :poster="circle.freeCourseList[currentIndex].cover"></video>
			</view>
			<!-- <view class="courseTitle">{{circle.freeCourseList[currentIndex].title}}</view> -->
			<!-- <view class="desc">课程描述:{{circle.courseDescribe}}</view> -->

			<!-- 章节列表 -->
			<view class="courseList  fx-row fx-wrap fx-row-space-between">
				<view class="courseItem" v-for="(item,index) in circle.freeCourseList" :key="index" @click="goChapterDetail(index)">
					<!-- <view style="z-index: 999; position: absolute;"> -->
					<image :src="item.cover" class="courseImage" id="myVideos"></image>
					<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Diy5vaCCRaLX38e1aca00bc48288d1d3d8000a71f585.png"
					 style="width: 100rpx; height: 100rpx; position: absolute; top: -20px; right: 0px; bottom: 0px; right: 0px; margin: auto; left: 0px;"></image>
					<!-- <view class="chapterTip">{{formateSeconds(parseInt(item.time))}}</view> -->
					<view class="info">
						<view class="title">{{item.title}}</view>
					</view>
					<!-- </view> -->
				</view>

				<view class="courseItem" v-for="(item,index) in circle.courseList" :key="index" @click="goJoin" v-if="courseListShow">

					<image :src="item.cover" class="courseImage" id="myVideos"></image>
					<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Diy5vaCCRaLX38e1aca00bc48288d1d3d8000a71f585.png"
					 style="width: 100rpx; height: 100rpx; position: absolute; top: -20px; right: 0px; bottom: 0px; right: 0px; margin: auto; left: 0px;"></image>
					<!-- <view class="chapterTip">{{formateSeconds(parseInt(item.time))}}</view> -->
					<view class="info">
						<view class="title">{{item.title}}</view>
					</view>

				</view>
			</view>
			<view class="zankai" v-if="circle.courseList.length>0&&showDown" @click="courseListShow=true,showDown=false">
				展开
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.9u2PJClgEkfpa341a5a6466642cd443999aad032687e.png"
				 mode="" style="width: 32rpx;height: 20rpx; margin-left: 10rpx;padding-top: 13rpx;"></image>
			</view>
			<view class="zankai" v-if="!showDown" @click="courseListShow=false,showDown=true">
				收起
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.SRdAvMaHPgka5f6d15cfdb424b752d1e3fe50aa9589a.png"
				 mode="" style="width: 32rpx;height: 20rpx; margin-left: 10rpx;padding-top: 13rpx;"></image>
			</view>
		</view>
		<!-- 	<template v-else-if="pinGroup">
			<view class="fx-row fx-row-middle" style="margin-bottom: 30upx;">
				<circle-group :name="circle.mpCardCircle.name" :canClick="false" :item="pinGroup"></circle-group>
			</view>
			
		</template> -->

		<!-- 	<view class="raceLamp"  v-if="isPinGroup">
				<race-lamp></race-lamp>
		</view> -->
		<view class="h3">活跃成员</view>
		<view class="trim-list">
			<view class="trim" v-for="(item,index) in circle.memberList" :key="index" @click="goTips">
				<view class="img">
					<image :src="item.headImg" mode="" style="width: 120rpx; height: 120rpx; border-radius: 10rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view class="name">
						{{item.userName}}
					</view>
					<view class="zhicheng">
						{{item.job}}
					</view>
				</view>
			</view>
		</view>

		<!-- 按钮 -->
		<view class="btn_bottom">

			<view v-if="isJoin">
				<view class="btn" @click="openCircleDetail">你已加该入社群，点击跳转社群详情</view>
			</view>
			<template v-else>
				<view class="btn" @click="verify" v-if="isNeedPay && currentUser.id">加入社群，获取资源需要支付￥{{ showJoinMoney }}</view>
				<button class="btn" v-if="isNeedPay && !currentUser.id" open-type="getPhoneNumber" @getphonenumber="regAndJoin">加入社群，获取资源需要支付￥{{ showJoinMoney }}</button>
				<view class="btn" @click="verify" v-if="!isNeedPay && currentUser.id">申请加入</view>
				<button class="btn" open-type="getPhoneNumber" @getphonenumber="regAndJoin" v-if="!isNeedPay && !currentUser.id">申请加入</button>
				<!-- <view class="not" @click="dontJoin">不想关注</view> -->
				<view class="tishi">
					<text>加入以后可以了解更多社群动态</text>
				</view>
			</template>
		</view>
		<get-user-info-modal v-if="authShow && !currentUser.id" @hideModal="authShow=false" @getUserInfo="setUserInfo"></get-user-info-modal>
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="showLoadings">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->

				<image class="rotate" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png'"
				 mode="widthFix"></image>
				<view class="succ">请稍等，正在保存</view>
				<!-- <view class="txt">{{isLoading?'您的信息已提交，正在审核中...':'点击按钮返回首页'}}</view> -->
				<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<!-- <view v-if="!isLoading" class="shop but" @click="retIndex">回到首页</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	// import circleGroup from '@/components/circleGroup/circleGroup';
	import GetUserInfoModal from '@/components/getUserInfoModal.vue'
	import {
		formateSeconds
	} from '@/js/mzl.js'
	import CircleAvatar from "../../components/CircleAvatar";
	// import raceLamp from '../_components/raceLamp/raceLamp';
	export default {
		components: {
			CircleAvatar,
			GetUserInfoModal,
			// circleGroup,raceLamp
		},
		data() {
			return {
				onlineSite: this.global.onlineSite,
				authShow: false,
				circleId: '',
				defaultAvatar: '',
				defaultName: '',
				recommendId: '',
				circle: {},
				width: true,
				courseListShow: false,
				videoContext: null,
				videoContexts: null,
				pinGroup: null,
				showDown: true,
				manager: {},
				showLoadings: false,
				currentIndex: 0,
				isFixed: false,
				nameTop: '',
				rect: 0,
			};
		},

		computed: {
			// isPinGroup(){
			// 	return this.circle.mpCardCircle.joinType == 5;
			// },

			isNeedPay() {
				return this.circle.joinType == 4;
			},
			showJoinMoney() {
				if (this.circle.joinMoney) {
					return this.circle.joinMoney.toFixed(2);
				}
				return '';
			},
			isJoin() {
				return this.circle.isJoin == 1;
			},
		},

		onLoad(option) {
			console.log(option)
			// 如果扫码进入
			if (option.q) {
				console.log("扫方形码进入")
				let q = decodeURIComponent(option.q).replace('https://xk.gzskxx.com/joinCircle/', '');
				this.circleId = q.split('_')[0];
				this.recommendId = q.split('_')[1];
				console.log(q)


			} else if (option.scene) {
				console.log("扫圆形码进入")
				const scene = decodeURIComponent(option.scene);
				this.circleId = scene.match(/id=(\d+)/) ? scene.match(/id=(\d+)/)[1] || '' : '';
				this.recommendId = scene.match(/recommendId=(\d+)/) ? scene.match(/recommendId=(\d+)/)[1] || '' : '';
			} else {
				console.log("直接邀请进入")
				this.recommendId = option.recommendId || '';
				this.circleId = option.id;
			}
			uni.showLoading();
			//判断登录
			this.videoContext = uni.createVideoContext('myVideo')
			this.videoContexts = uni.createVideoContext('myVideos')
			this.doLoginHandle((hasReg) => {
				if (!hasReg) {
					this.authShow = true;
					this.getCircleDetail();
				} else this.$store.dispatch('updateCurrentUserInfo').then(() => {
					this.getCircleDetail();
				})

				//uni.hideLoading();
			});
			this.scrollVideo()
		},
		computed: {
			//滑动组件置顶
			pageFixed() {
				if (this.rect > this.nameTop) {
					this.isFixed = true;
				} else {
					this.isFixed = false;
				}
			}
		},
		onPageScroll(e) {
			console.log(e)
			
				this.rect = e.scrollTop;
			
		
		},
		methods: {
			goChapterDetail(index) {
				console.log(index)
				// this.videoContexts.stop();
				//if (index != this.currentIndex) {
				this.videoContext.stop();
				this.currentIndex = index;
				setTimeout(() => {
					this.videoContext.play();
				}, 500)

				//}
			},
			goChapterDetails() {
				console.log(123)
				this.videoContexts.stop();
				this.videoContexts.pause();
			},
			formateSeconds(v) {
				return formateSeconds(v)
			},
			scrollVideo() {
				let that = this;
				const query = wx.createSelectorQuery();
				query.select('#scrollId').boundingClientRect();
				query.exec(function(res) {
					console.log(res)
					if (res && res[0])
						that.nameTop = res[0].top
				})
			},
			regAndJoin(e) {
				//静默注册 然后加入名片圈
				let token = uni.getStorageSync('token');
				if (!this.currentUser.id) {
					let {
						iv,
						encryptedData,
						errMsg
					} = e.detail;
					//解密数据
					if (errMsg.indexOf('fail') !== -1) {
						this.showError("请授权获取手机号");
						uni.hideLoading();
						return;
					}

					if (e.target) {
						let errMsg2 = e.target.errMsg;
						if (errMsg2 && errMsg2.indexOf('deny') !== -1) {
							this.showError("请授权获取手机号");
							uni.hideLoading();
							return;
						}
					}

					encryptedData = encodeURIComponent(encryptedData).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
						return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
					});

					iv = encodeURIComponent(iv).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
						return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
					});


					this.$api.WXDecrypt(encryptedData, iv, token).then(res => {
						this.authPhone = JSON.parse(res).phoneNumber;
						//注册
						let form = {
							// phone: this.authPhone,
							name: "游客" + this.authPhone.slice(-4),
							headImage: 'http://card-1254165941.cosgz.myqcloud.com/timg.jpeg',
							company: '未填写',
							job: '游客',
							token: token,
							refereeUserId: this.recommendId
						};
						form.headImage = this.defaultAvatar ? this.defaultAvatar : form.headImage;
						form.name = this.defaultName ? this.defaultName : form.name;


						this.$api.register(form).then(value => {
							uni.hideLoading();
							//console.log(value);
							if (value.ERROR == 10001) {
								this.showTips('该手机号已经注册！').then(res => {})
							} else if (value.ERROR == 10002) {
								this.showTips('该微信号已经绑定！').then(res => {})
							} else if (value.ERROR == 2000) {
								this.showTips('上级用户不存在！').then(res => {})
							} else {
								//设置userId 更新用户信息
								uni.setStorageSync('userId', value.userInfoId);
								this.$store.dispatch('updateCurrentUserInfo').then(res => {

									this.verify();
								});


							}
						}).catch(error => {
							uni.hideLoading();
							this.showError(error)
						})

						uni.hideLoading();
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					});



				}




			},
			goJoin() {
				uni.showModal({
					content: "只能试看4节，关注后可观看全部",
					confirmText: '加入',
					success: (res) => {
						// uni.pageScrollTo({
						// 	scrollTop: 99999,
						// 	duration: 300
						// });
						if (res.confirm) {
							//this.videoContext.stop();
							this.verify()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				})
			},
			goTips() {
				uni.showModal({
					title: '你还不是社群成员， 请先加入社群，即能获取更多资源',
					confirmText: '加入',
					success: (res) => {
						// uni.pageScrollTo({
						// 	scrollTop: 99999,
						// 	duration: 300
						// });
						if (res.confirm) {
							this.verify()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			setUserInfo(e) {
				console.log(e)
				if (e.detail.errMsg == 'getUserInfo:fail auth deny') {} else {
					this.defaultAvatar = e.detail.userInfo.avatarUrl;
					this.defaultName = e.detail.userInfo.nickName;
				}

				this.authShow = false;
			},

			getCircleDetail() {
				this.$api.joinCardCircleInfo(this.circleId).then(result => {
					this.circle = result;
					// if(this.circle.isJoin==1){
					// 	this.openCircleDetail()
					// }
				}).then(result => {

					//this.manager = result.userMap
					uni.hideLoading();

				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},

			verify() { //入圈验证
				// if (!this.checkHasLogin(`/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin?id=${this.circleId}&recommendId=${this.recommendId}`)) {
				// 	return;
				// }

				const type = this.circle.joinType;
				if (type == 1 || type == 3 || type == 5) { // 邀请或任何人，直接加入 或者拼团圈
					uni.showLoading();
					this.$api.joinNewCardCircle(this.circleId, this.recommendId).then(result => {
						uni.hideLoading();
						const error = result && result.ERROR;
						if (error === '100001') return this.showError('超出关注圈子最大值');
						if (error === '100002') return this.showError('被该圈子拒绝关注');
						this.$store.commit('setNeedCircleHomeUpdate', true)

						// 如果是分享出来的页面,跳转至 tab 首页
						if (getCurrentPages().length === 1) {
							this.$store.commit('setInviteJoin', {
								id: this.circleId
							})
							uni.switchTab({
								url: '/pages/businessCardCircle/businessCardCircle'
							})
						} else {
							this.redirectTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', {
								id: this.circleId
							})
						}
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					});
				} else if (type == 2) { // 管理员审核通过
					this.navigateTo('../businessCC_ApplyJoinCircle/businessCC_ApplyJoinCircle', {
						id: this.circleId,
						recommendId: this.recommendId
					});
				} else if (type == 4) { // 付费
					uni.showLoading();
					let _order = ""
					//TODO
					this.$api.insertCircleOrder(this.circleId, this.recommendId).then(order => {
						_order = order;
						console.log(order)
						return this.$api.unifiedorder(_order)
					}).then(result => {
						return this.requestPayment(result.prePayInfo)
					}).then(result => {
						this.showLoadings = true;
						let t = 0;
						let timer = setInterval(() => {
							t += 3000;

							this.$api.paymentStatusCallback(_order, 3, null, this.circleId).then(res => {
								if (res || t >= 15000) {
									this.showLoadings = false;
									clearInterval(timer)
									this.showTips('支付成功').then(res => {
										uni.switchTab({
											url: '/pages/businessCardCircle/businessCardCircle'
										})
									})
								}
							});


						}, 3000)


					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}
			},

			openUserDetail() {
				this.navigateTo('/pages/businessCard2/businessCard2', {
					cardUserId: this.circle.lordUserId
				});
			},

			dontJoin() {
				// #ifdef H5
				// 分享页面不判断是否已登录
				// 对所有需要登录的操作都跳转至下载页
				uni.navigateTo({
					url: '/pages/Download'
				})
				return false;
				// #endif

				if (!this.currentUser.id) return;
				uni.switchTab({
					url: '/pages/businessCardCircle/businessCardCircle'
				})
			},

			openCircleDetail() {
				this.redirectTo('/item_businessCardCircle/businessCC_Detail/businessCC_Detail', {
					id: this.circleId
				})
			},

		}
	}
</script>

<style scoped lang="less">
	@keyframes rotateicon {
		0% {
			transform: rotate(0deg)
		}

		100% {
			transform: rotate(360deg)
		}
	}

	.rotate {
		animation: rotateicon 3s infinite linear;
	}

	.videoContainer {
		width: 690rpx;
		margin: 0rpx auto;

		// .courseTitle{
		// 	margin-bottom: 8rpx;
		// 	font-weight: bold;
		// 	margin-top: 400rpx;
		// }
		.desc {
			min-height: 300rpx;
			background: white;
			padding: 10rpx;
			border-radius: 10px;
			box-sizing: border-box;
			margin: 10rpx 0;
		}

		.videoBox {
			//width: 100%;
			//min-width: 750rpx;
			//position: fixed;
			//left: 0rpx;
			//top: 0;
			//z-index: 9999;
			//background: white;
			//height: 400rpx;

			.video {
				width: 690rpx;
				// position: fixed;
				// left: 30rpx;
				// top: 0;
				// z-index: 9999;
				//margin-left: 30rpx;
				height: 388rpx;
				border-radius: 10px;
			}
		}

		.courseList {
			box-sizing: border-box;

			.courseItem {
				width: 330rpx;
				box-sizing: border-box;
				border-radius: 10px;
				box-shadow: 1rpx 1rpx 10rpx 1rpx #ccc;
				position: relative;
				margin-top: 15rpx;

				.chapterTip {
					position: absolute;
					right: 5rpx;
					top: 193rpx;
					color: white;
					font-size: 28rpx;
					background: rgba(0, 0, 0, 0.3);
				}

				&:nth-of-type(n+3) {
					margin-top: 30rpx;
				}

				.courseImage {
					border-top-right-radius: 10px;
					border-top-left-radius: 10px;
					width: 330rpx;
					height: 230rpx;
				}

			}

			.info {
				width: 100%;
				padding: 15rpx;

				.title {
					font-size: 28rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}
			}
		}
	}

	// 弹出层
	.saveModel {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;

		.saveCon {
			width: 84%;
			margin: 0 auto;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 40upx;
			border-radius: 20upx;

			image {
				width: 120upx;
				height: 120upx;
				margin-top: 10upx
			}

			.succ {
				font-size: 36upx;
				color: #333333;
				margin: 32upx 0 20upx 0;
			}

			.txt {
				font-size: 28upx;
				color: #666666;
				margin: 20upx 0 50upx 0;
				text-align: center;
			}

			.but {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 28upx;
				border-radius: 40upx;
			}

			.bindC {
				border: 1px solid #6B7AF8;
				color: #6B7AF8;
				margin-bottom: 24upx;
			}

			.shop {
				border: 1px solid #CCCCCC;
				color: #CCCCCC
			}
		}
	}

	.raceLamp {
		position: fixed;
		left: 20upx;

	}

	.container {
		font-family: PingFangSC;
		background: #FFFFFF;
		box-sizing: border-box;
		padding-bottom: 60upx;
		min-height: 100vh
	}

	.topBg {
		width: 100%;
		height: 10upx;
		// background: #8390FF;
		// border-radius: 0 0 20% 20%;
	}

	// 圈子信息
	.circleInfo {
		width: 92%;
		border-radius: 10px;
		background: #fff;
		box-shadow: 0px 0px 14px 4px rgba(230, 230, 230, 0.5);
		box-sizing: border-box;
		padding: 20upx 30upx 17upx 30upx;
		margin: 20rpx auto;

		// margin-top: -220upx;

		.infoTop {
			.info {
				.avatar {
					width: 140upx;
					height: 140upx;
					margin-right: 30upx;
					margin-bottom: 10upx;
				}

				.title {
					font-size: 32upx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 20upx;
					font-family: PingFangSC-Medium, PingFang SC;
				}

				.txt {
					margin-bottom: 20rpx;
					font-size: 24upx;
					color: #4C4D4C;
					font-family: PingFangSC-Regular, PingFang SC;
				}

				.label {
					width: 152upx;
					height: 46upx;
					line-height: 46upx;
					border-radius: 23upx;
					background: #F1F1F1;
					text-align: center;
					margin-top: 17upx;
				}
			}
		}

		.infoBottom {
			margin-top: 3rpx;



			.item {
				font-size: 24upx;
				color: #666666;
				//margin-top: 28upx;
				width: 25%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.groupavatar {
					width: auto;

				}

				.avatar {
					width: 50upx;
					height: 50upx;
					border-radius: 50%;
				}

			}

			.people {
				width: 30upx;
				height: 22upx;
				margin-right: 18upx;
			}

			.huati {
				width: 30upx;
				height: 30upx;
				margin-right: 18upx;
			}
		}

	}

	// 管理员
	.manCon {
		width: 92%;
		height: 170upx;
		margin: 24upx auto;
		box-shadow: 0px 0px 14px 4px rgba(230, 230, 230, 0.5);
		box-sizing: border-box;
		padding: 28upx 30upx;
		background: #fff;
		border-radius: 10px;

		.manager {
			width: 120upx;
			height: 120upx;
			border-radius: 10rpx;
			margin-right: 30upx;
		}

		.name {
			font-family: PingFangSC-Medium, PingFang SC;
			margin-bottom: 40rpx;
			font-size: 32rpx;
			color: #333333;
		}

		.posi {
			font-size: 14px;
			color: #2EA1FF;

			&>image {
				width: 25upx;
				height: 30upx;
				margin-right: 18upx;
			}
		}

		.rightImg {
			width: 14upx;
			height: 24upx;
		}
	}

	// 圈子介绍
	.introduce {
		width: 92%;
		min-height: 384upx;
		max-height: 384upx;
		margin: 0 auto;
		background: #fff;
		border-radius: 10px;
		border: 1px solid rgba(204, 204, 204, 1);
		// box-shadow:0px 0px 14px 4px rgba(230,230,230,0.5);
		box-sizing: border-box;
		padding: 30upx;

		display: flex;
		flex-direction: column;

		.title {
			font-size: 34upx;
			color: #333;
			padding-bottom: 22upx;
		}

		.content {
			font-size: 28upx;
			color: #666666;
			line-height: 48upx;
			letter-spacing: 1upx;
			height: calc(100% - 200upx);
			overflow-y: auto
		}
	}

	.tishi {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		color: #999999;
		margin-top: 15rpx;
	}

	.btn_bottom {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 140rpx;
		padding-top: 20rpx;
	}

	.btn {
		width: 92%;
		height: 88upx;
		line-height: 88upx;
		border-radius: 44upx;
		background: #2EA1FF;
		color: #fff;
		text-align: center;
		font-size: 32upx;
		margin: 0 auto;

	}

	.h3 {
		margin-left: 60rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 48px;
		letter-spacing: 1px;

	}

	.zankai {
		color: #2EA1FF;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		margin: 0 auto;
		width: 102rpx;
		display: flex;
		flex-direction: row;
		margin-top: 20px;
	}

	.not {
		margin-top: 23upx;
		font-size: 28upx;
		color: #666666;
		text-align: center;
	}

	.trim-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 auto;
		width: 92%;
		padding-bottom: 100rpx;
	}

	.trim {
		width: 310rpx;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 14px 4px rgba(230, 230, 230, 0.5);
		border-radius: 10px;
		padding: 20rpx 15rpx;
		display: flex;
		flex-direction: row;
		margin-bottom: 10rpx;

		.img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10px;
		}

		.name {
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 42px;
			letter-spacing: 1px;
			font-size: 30rpx;
			margin-left: 10rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 150rpx;
			overflow: hidden;


		}

		.zhicheng {
			width: 150rpx;
			height: 39rpx;
			background: rgba(224, 241, 255, 1);
			border-radius: 22px;
			text-align: center;
			padding-top: 5rpx;
			font-size: 12px;
			color: rgba(51, 51, 51, 1);
		}
	}
	.is-fixed{
			position: fixed;
			top: 0;
			left: 10;
			right: 10;
			width: 100%;
			background-color: #FFFFFF;
			z-index: 99;
		}
</style>
