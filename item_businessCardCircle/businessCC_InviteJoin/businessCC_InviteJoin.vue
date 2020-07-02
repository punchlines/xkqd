<template>
	<view class="container">
		<app-share-top-banner></app-share-top-banner>

	
		
		
		<!-- 视频 -->
		<view class="videoContainer" v-if="circle.freeCourseList.length>0">
			<view class="videoBox">
				<video id="myVideo"  class="video" :src="circle.freeCourseList[currentIndex].video" :poster="circle.freeCourseList[currentIndex].cover"></video>
			</view>
			
			<view class="courseTitle">{{circle.freeCourseList[currentIndex].title}}</view>
			<view class="desc">课程描述:{{circle.courseDescribe}}</view>
			
			<view class="h3">课程章节:</view>
			<!-- 章节列表 -->
			<view class="courseList  fx-row fx-wrap fx-row-space-between" >
				
				
				<view class="courseItem" v-for="(item,index) in circle.freeCourseList" :key="index" @click="goChapterDetail(index)">
				
					<image :src="item.cover" class="courseImage" mode=""></image>
					
					<view class="chapterTip">{{formateSeconds(parseInt(item.time))}}</view>
					<view class="info">
						<view class="title">{{item.title}}</view>
					</view>
					
				</view>
				
				<view class="courseItem" v-for="(item,index) in circle.courseList" :key="index" @click="goJoin">
				
					<image :src="item.cover" class="courseImage" mode=""></image>
					
					<view class="chapterTip">{{formateSeconds(parseInt(item.time))}}</view>
					<view class="info">
						<view class="title">{{item.title}}</view>
					</view>
					
				</view>
			</view>
			
		</view>
		
		<!-- 头部 -->
		<view class="topBg" v-else></view>
		
		
		<!-- 圈子信息 -->
		<view class="circleInfo" :style="{'margin-top':circle.freeCourseList.length>0?'0':'-220rpx'}">
			<view class="infoTop">
				<view class="info fx-row">
					<view class="avatar">
						<circle-avatar :avatar="circle.mpCardCircle.headImage" :images="circle.headImage"></circle-avatar>
					</view>
					<view>
						<view class="title">{{ circle.mpCardCircle.name }}</view>
						<view class="txt">ID:{{ circle.mpCardCircle.number }}</view>
						<view class="label txt" v-if="circle.circleTypeName">{{ circle.circleTypeName }}</view>
					</view>
				</view>
			</view>
			<view class="infoBottom fx-row" >
				<view class="item fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ren.png'" class="people"></image>
					<text>{{ circle.mpCardCircle.memberNum }}</text>
				</view>
				<view class="item fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/huati_un.png'" class="huati"></image>
					<text>{{ circle.mpCardCircle.topicNum }}</text>
				</view>
				
				<!-- <view v-if="isPinGroup" class="item groupavatar fx-row fx-row-right">
					<image class="avatar" v-for="(it,inx) in circle.headImage" :key="inx" :src="it"></image>
				</view> -->
			</view>
		</view>
		
		
		<template>
			<view class="manCon"  @click="openUserDetail">
				<view class="fx-row fx-row-space-between fx-row-center">
					<image :src="manager.headImage" class="manager"></image>
					<view class="fx-column" style="flex: 1">
						<view class="name">{{ manager.name }}</view>
						<view class="posi fx-row fx-row-center">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/guanliyuan.png'"></image>
							<text>管理员</text>
						</view>
					</view>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" mode="widthFix" class="rightImg"></image>
				</view>
			</view>
			

			<!-- 圈子介绍 -->
			<view class="introduce" v-if="circle.mpCardCircle.circleIntroduce">
				<view class="title">圈子介绍</view>
				<view class="content">
					{{ circle.mpCardCircle.circleIntroduce }}
				</view>
			</view>

			<view class="tishi">
				<text>关注以后可以了解更多圈内动态</text>
			</view>
		</template>
		
	<!-- 	<template v-else-if="pinGroup">
			<view class="fx-row fx-row-middle" style="margin-bottom: 30upx;">
				<circle-group :name="circle.mpCardCircle.name" :canClick="false" :item="pinGroup"></circle-group>
			</view>
			
		</template> -->
	
	<!-- 	<view class="raceLamp"  v-if="isPinGroup">
				<race-lamp></race-lamp>
		</view> -->
		
		
		<!-- 管理员 -->
		
		<!-- 按钮 -->
		<view v-if="isJoin">
			<view class="btn" @click="openCircleDetail">你已加该入圈子，点击跳转圈子详情</view>
		</view>
		<template v-else>
			<view class="btn" @click="verify" v-if="isNeedPay && currentUser.id">我想关注，需支付￥{{ showJoinMoney }}</view>
			<button class="btn" v-if="isNeedPay && !currentUser.id" open-type="getPhoneNumber" @getphonenumber="regAndJoin">我想关注，需支付￥{{ showJoinMoney }}</button>
			<view class="btn" @click="verify" v-if="!isNeedPay && currentUser.id">我想关注</view>
			<button class="btn" open-type="getPhoneNumber" @getphonenumber="regAndJoin" v-if="!isNeedPay && !currentUser.id">我想关注</button>
			<view class="not" @click="dontJoin">不想关注</view>
		</template>
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
	import {formateSeconds} from '@/js/mzl.js'
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
				circle: {
					mpCardCircle: {},
				},
				videoContext:null,
				pinGroup:null,
				manager: {},
				showLoadings:false,
				currentIndex:0
			};
		},

		computed: {
			// isPinGroup(){
			// 	return this.circle.mpCardCircle.joinType == 5;
			// },
			
			isNeedPay() {
				return this.circle.mpCardCircle.joinType == 4;
			},
			showJoinMoney() {
				if (this.circle.mpCardCircle.joinMoney) {
					return this.circle.mpCardCircle.joinMoney.toFixed(2);
				}
				return '';
			},
			isJoin() {
				return this.circle.ifJoin == 1;
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
				this.recommendId = option.recommendId || 67;
				this.circleId = option.id;
			}
			uni.showLoading();
			//判断登录
			this.videoContext =  uni.createVideoContext('myVideo')
			this.doLoginHandle((hasReg) => {
				if (!hasReg) {
					this.authShow = true;
					this.getCircleDetail();
				} else this.$store.dispatch('updateCurrentUserInfo').then(() => {
					this.getCircleDetail();
				})

				//uni.hideLoading();
			});

		},

		methods: {
			goChapterDetail(index){
				if(index!=this.currentIndex){
					this.videoContext.stop();
					this.currentIndex=index;
					setTimeout(()=>{
						this.videoContext.play();
					},500)
				}
			},
			formateSeconds(v){
				return formateSeconds(v)
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
			goJoin(){
				uni.showModal({
					content:"只能试看4节，关注后可观看全部",
					showCancel:false,
					success:()=>{
						uni.pageScrollTo({
						    scrollTop:99999,
						    duration: 300
						});
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
				this.$api.getCardCircleDetail(this.circleId).then(result => {
					this.circle = result;
					return this.$api.getUserCardDetails2(result.mpCardCircle.managerId);
				}).then(result => {
					
						this.manager = result.userMap
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

				const type = this.circle.mpCardCircle.joinType;
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
						let timer = setInterval(()=>{
							t+=3000;
							
							this.$api.paymentStatusCallback(_order,3,null,this.circleId).then(res=>{
								if(res || t>=15000){
									this.showLoadings = false;
									clearInterval(timer)
									this.showTips('支付成功').then(res => {
										uni.switchTab({
											url: '/pages/businessCardCircle/businessCardCircle'
										})
									})
								}
							});
							
							
						},3000)
						
						
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}
			},

			openUserDetail() {
				this.navigateTo('/pages/businessCard2/businessCard2', {
					cardUserId: this.circle.mpCardCircle.managerId
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
	
	.videoContainer{
		width: 92%;
		margin: 20rpx auto;
		.courseTitle{
			margin-bottom: 8rpx;
			font-weight: bold;
			margin-top: 400rpx;
		}
		.desc{
			min-height: 300rpx;
			background: white;
			padding: 10rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			margin: 10rpx 0;
		}
		
		.videoBox{
			width: 100%;
			min-width: 750rpx;
			position: fixed;
			left: 0rpx;
			top: 0;
			z-index: 9999;
			background: white;
			height: 400rpx;
			
			.video{
				width:690rpx;
				// position: fixed;
				// left: 30rpx;
				// top: 0;
				// z-index: 9999;
				margin-left: 30rpx;
				height: 400rpx;
			}
		}
		
		.courseList{
			box-sizing: border-box;
		
			.courseItem{
				width: 330rpx;
				box-sizing: border-box;
				border: 1rpx solid #ddd;
				box-shadow: 1rpx 1rpx 10rpx 1rpx #ccc;
				position: relative;
				.chapterTip{
					position: absolute;
					right: 5rpx;
					top: 193rpx;
					color: white;
					font-size: 28rpx;
					background: rgba(0,0,0,0.3);
				}
				&:nth-of-type(n+3){
					margin-top: 30rpx;
				}
				.courseImage{
					width: 330rpx;
					height:  230rpx;
				}
				
			}
			.info{
				width: 100%;
				padding: 15rpx;
				
				.title{
					font-size: 28rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow:ellipsis;
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
	.raceLamp{
		position: fixed;
		left: 20upx;
		
	}
	.container {
		font-family: PingFangSC;
		background: #F5F5F5;
		box-sizing: border-box;
		padding-bottom: 60upx;
		min-height: 100vh
	}

	.topBg {
		width: 100%;
		height: 280upx;
		background: #8390FF;
		border-radius: 0 0 20% 20%;
	}

	// 圈子信息
	.circleInfo {
		width: 92%;
		height: 320upx;
		background: #fff;
		border-radius: 8upx;
		box-sizing: border-box;
		padding: 40upx 30upx 40upx 30upx;
		margin: 0 auto;
		box-shadow: 0upx 2upx 16upx 4upx rgba(141, 150, 224, 0.24);
		margin-top: -220upx;

		.infoTop {
			.info {
				.avatar {
					width: 140upx;
					height: 140upx;
					margin-right: 30upx;
					margin-bottom: 40upx;
				}

				.title {
					font-size: 32upx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 7upx;
				}

				.txt {
					font-size: 24upx;
					color: #666666;
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
			border-top: 1px solid #eee;



			.item {
				font-size: 24upx;
				color: #666666;
				margin-top: 28upx;
				width: 25%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				
				.groupavatar{
					width: auto;
				
				}
					.avatar{
						width: 50upx;
						height: 50upx;
						border-radius:50%; 
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
		height: 180upx;
		margin: 24upx auto;
		box-shadow: 0upx 2upx 16upx 4upx rgba(141, 150, 224, 0.24);
		box-sizing: border-box;
		padding: 40upx 30upx;
		background: #fff;

		.manager {
			width: 100upx;
			height: 100upx;
			margin-right: 30upx;
		}

		.name {
			margin-bottom: 12upx;
			font-size: 30upx;
			color: #333333;
		}

		.posi {
			font-size: 24upx;
			color: #6B7AF8;

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
		max-height: 684upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0upx 2upx 16upx 4upx rgba(141, 150, 224, 0.24);
		box-sizing: border-box;
		padding: 30upx;
		margin-bottom: 56upx;
		display: flex;
		flex-direction: column;

		.title {
			font-size: 32upx;
			color: #000000;
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
		margin-bottom: 24upx;
	}

	.btn {
		width: 92%;
		height: 88upx;
		line-height: 88upx;
		margin: 0 auto;
		border-radius: 44upx;
		background: #6B7AF8;
		color: #fff;
		text-align: center;
		font-size: 32upx;
	}

	.not {
		margin-top: 23upx;
		font-size: 28upx;
		color: #666666;
		text-align: center;
	}
</style>
