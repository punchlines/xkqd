<template>
	<view class="container">

		<view class="manageContainer">
			<view class="avatarContainer">
				<view class="box fx-row fx-wrap fx-row-start">
					<image v-for="(item,index) in circles.headImages" :key="index" class="avatar" :src="item"></image>
					<view   @click="test" class="avatar btnshare"></view>
					
					<view class="avatar btnshares"  @click="lookClick" v-if="detailImageList.length>1&&circles.isManager==1"></view>

					<!-- open-type="share" -->
				</view>

				<view   class="seeAll" v-if="isPermitSee  || memberType!=2" @click="lookClick">
					查看群员名片
				</view>
				<!-- || hasManagePermission -->
			</view>
			<!-- <view class="circleImgContainer" v-if="memberType!=2"> -->
			<!-- <text class="title">圈子头像</text>
				<view @click="changeAvatar">
					<circle-avatar :avatar="cardCirclePublish.headImage" :images="headImage"></circle-avatar>
				</view> -->

			<!--<image @click="changeAvatar" :src="cardCirclePublish.headImage" class="circleAvatar fr"></image>-->
			<!-- </view> -->
			<view class="changeContainer" 	>
				<view class="list" @click="onNameTap(0)" v-if="circles.isManager==1">
					<text class="title">社群名称</text>
					<text class="content single-line">{{ cardCirclePublish.circleName }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>

				<!-- <view class="list" @click="onNameTap(1)">
					<text class="title">圈子副标题</text>
					<text class="content single-line">{{ cardCirclePublish.subheading }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view> -->
				<view class="lists" @click="onIntroducetap" >
					<text class="title" style="line-height: 84rpx;">社群介绍</text>
					<view class="titles" >
						<view class="content single-line" >{{ cardCirclePublish.introduce }}</view>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" style="margin-right: 28rpx;margin-top: -70rpx;" class="rightImg"></image>
					</view>
				</view>
			</view>



			<view class="changeContainer" >
				<view class="list" @click="auditClick" v-if="memberType!=2">
					<text class="title">审核申请</text>
					<text class="content">{{ cardCirclePublish._circleType ? cardCirclePublish._circleType.name : '' }}</text>
					<view v-if="applyCount>0" class="fx-row fx-row-center fx-row-right">
						<view class="dot">1</view>
					</view>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
				<view class="list" @click="changeAvatar" v-if="circles.isManager==1">
					<text class="title">邀请好友海报背景图</text>
					<text class="content single-line"></text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
				<view class="list" @click="erweimaClick">
					<text class="title">社群二维码</text>

					<view class="fx-row fx-row-center fx-row-right">
						<image style="width: 50rpx; height: 50rpx;opacity:0.78;" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.vycfUEdyRSDF02c02da7ae05843bc3096775af0a8cf0.png"
						 mode=""></image>
						<!-- <text class="content single-line">{{ cardCirclePublish.introduce }}</text> -->
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
					</view>
				</view>
				<view class="list" @click="onSelecttap" style="border-bottom: none;" v-if="circles.isManager==1">
					<text class="title">入群方式</text>
					<text class="content" style="text-align: right;font-size: 28rpx;color: #D8D8D8;">{{ cardCirclePublish.joinType.text }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
				<!-- <view class="list" @click="onTypetap">
					<text class="title">圈子类型</text>
					<text class="content">{{ cardCirclePublish._circleType ? cardCirclePublish._circleType.name : '' }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
 -->			<view class="list" @click="complain" v-if="circles.isManager!=1">
					<text class="title">投诉圈子</text>
			<text class="content single-line"></text>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
			</view>

			<!-- <view class="changeContainer" style="margin-top: 28upx"> -->

			<!-- <view class="list"  @click="erweimaClick">
					<text class="title">圈子二维码</text>
					
					<view class="fx-row fx-row-center fx-row-right">
						<image  style="width: 50rpx; height: 50rpx;opacity:0.78;" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/erweima.png" mode=""></image> -->
			<!-- <text class="content single-line">{{ cardCirclePublish.introduce }}</text> -->
			<!-- 	<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
					</view>
					
				</view> -->



			
			<!-- </view> -->

			<view class="set" style="margin-top: 15upx" v-if="circles.isManager==1">
				<view class="list"  @click="onManageList"  >
					<text class="title">群管理员</text>
					<text class="content single-line"></text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg fr zh"></image>
				</view>
				
				<view class="list" @click="onTransferTap"  v-if="hasManagePermission" >
					<text class="title">转让群主</text>
					<text class="content single-line"></text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg fr zh"></image>
				</view>

				<view class="list">
					<text class="title">允许成员查看群员名片</text>
					<text class="content single-line"></text>
					<switch :checked="isChecked" @change="permitSeeChange" color="#2EA1FF"></switch>
				</view>
				<view class="list">
					<text class="title">全成员禁言</text>
					<text class="content single-line"></text>
					<switch :checked="isSelected" @change="permitVoice" color="#2EA1FF"></switch>
				</view>

				<view class="list">
					<text class="title">关闭消息区</text>
					<text class="content single-line"></text>
					<switch :checked="isTopic" @change="permitTopic" color="#2EA1FF"></switch>
				</view>

				<view class="list" v-if="cardCirclePublish.joinType.id==4">
					<text class="title">开启提成</text>
					<text class="content single-line"></text>
					<switch :checked="isPushMoney" @change="permitPush" color="#2EA1FF"></switch>
				</view>

				
			</view>
				<view class="back" @click="exit" v-if="circles.isManager!=1">
					删除并退出
				</view>

			<!-- <template v-if="memberType!=2">
				<view class="btn" v-if="hasManagePermission" @click="deleteCircle">删除圈</view>
				<view class="btn save" :class="{'quick':!hasManagePermission}" @click="save">保存</view>
			</template>
			<view v-else class="btn quick save" @click="exit">退出圈子</view> -->

			<!-- <view class="button" @click="save">
				<text class="text">保存</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	import CircleAvatar from "../../components/CircleAvatar";
	export default {
		components: {
			CircleAvatar
		},
		data() {
			return {
				onlineSite: this.global.onlineSite,
				headImage: [],
				detailImageList: [],
				circle: {},
				applyCount: 0,
				memberType: 2,
				circles:[],
				// TODO: 抽出
				typeList: [{
						id: 1,
						text: '允许任何人加入圈子'
					},
					{
						id: 2,
						text: '消息验证并由管理员审核'
					},
					{
						id: 3,
						text: '只允许圈子成员邀请入圈'
					},
					{
						id: 4,
						text: '付费入圈'
					}
				],
			};
		},

		onShareAppMessage(res) {
			console.log('/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin?id=' + this.circleId +
				'&recommendId=' +
				this.currentUser.id)
			return {
				title: this.circle.name,
				path: '/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin?id=' + this.circleId + '&recommendId=' +
					this.currentUser.id,
			}
		},

		computed: {
			isPermitSee() {
				return Number(this.cardCirclePublish.isPermitSee) === 1
			},
			hasManagePermission() {
				return this.currentUser.id == this.circle.managerId;
			},
			cardCirclePublish() {
				return this.$store.state.cardCirclePublish;
			},
			isChecked() {
				return Number(this.cardCirclePublish.isPermitSee) === 1
			},
			isSelected() {
				return Number(this.cardCirclePublish.shutupStatus) == 1
			},
			isTopic() {
				return Number(this.cardCirclePublish.topicStatus) == 1
			},

			isPushMoney() {
				return Number(this.cardCirclePublish.pushMoneyStatus) == 1
			}
		},

		onLoad(option) {
			uni.showLoading();
			const id = option.id;
			this.circleId = id;

			this.$api.getCardCircleDetail(id).then(result => {
				// this.circle = result.mpCardCircle;
				const {
					name,
					joinType,
					joinMoney,
					circleIntroduce,
					isPermitSee,
					managerId,
					id,
					headImage,
					shutupStatus,
					pushMoneyStatus,
					percent,
					topicStatus,
					subheading
				} = result.mpCardCircle;
				this.memberType = result.memberType;
				this.$store.commit('updateCardCirclePublish', {
					circleName: name,
					joinType: this.typeList.find(item => item.id == joinType),
					joinMoney: joinMoney,
					pushMoneyStatus: pushMoneyStatus,
					percent: percent,
					id: id,
					headImage: headImage,
					circleTypeId: result.circleTypeId,
					circleTypeName: result.circleTypeName,
					_circleType: {
						id: result.circleTypeId,
						name: result.circleTypeName
					},
					introduce: circleIntroduce,
					isPermitSee: Number(isPermitSee) === 1,
					managerUserId: managerId,
					shutupStatus: parseInt(shutupStatus),
					topicStatus: topicStatus,
					subheading
				})
				this.headImage = result.headImage;
				this.detailImageList = result.detailImageList
				this.circle = result.mpCardCircle;
				this.applyCount = result.applyCount;
				uni.hideLoading();
			}).catch(error => {
				uni.hideLoading();
				this.showError(error)
			})
			this.$api.getCardCircleInfo(id).then(res=>{
				this.circles=res
				this.circles.headImages = [...new Set(this.circles.headImages)]
			})
			.catch(err=>{
				
			})

		},
		onShow() {
			//this.save()
			console.log(this.cardCirclePublish)
		},
		methods: {



			permitPush(e) {
				this.cardCirclePublish.pushMoneyStatus = e.detail.value;
				const postData = {
					pushMoneyStatus: this.cardCirclePublish.pushMoneyStatus ? 1 : 0,
					circleId:this.circleId
				}
				uni.showLoading();	
				this.$api.updateCardCircleDetail(postData).then(result => {
					uni.hideLoading();
					uni.showToast({
						title:'修改成功',
						duration:2000
					})
					
					
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},
			auditClick() { //审核
				this.navigateTo('../businessCC_AuditApply/businessCC_AuditApply', {
					id: this.circleId
				});
			},

			lookClick() { //查看圈子成员
				this.navigateTo('../businessCC_CircleMember/businessCC_CircleMember', {
					id: this.circleId,
					isPermitSee: this.isPermitSee ? 1 : 0,
					memberType: this.memberType
				});
			},
			test() {
				console.log('测试成功')
					// uni.requestSubscribeMessage({
					// 	tmplIds: ['cvBqennzFLLaoDP_5cklMF5Q-XStSnv8Uh4rkN5VfGU', '9Ix6hSNi9bDiX09zssVrjel89TO1FDFdXiyjSD1q3Yo'],
					// 	success(res) {
					// 		console.log('test', res)
					// 		this.shares = share
					// 	}
					// })
				 this.shareInvitePost()
			},
			deleteCircle() {

				const action = () => {
					uni.showLoading();
					this.$api.deleteCircle(this.circleId).then(result => {
						uni.hideLoading();
						this.$store.commit('setNeedCircleHomeUpdate', true)
						uni.switchTab({
							url: '/pages/businessCardCircle/businessCardCircle'
						})
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '提示',
					content: `确定删除圈？`,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},
			shareInvitePost() {
				//'cvBqennzFLLaoDP_5cklMF5Q-XStSnv8Uh4rkN5VfGU',
				uni.requestSubscribeMessage({
					tmplIds: [ '9Ix6hSNi9bDiX09zssVrjel89TO1FDFdXiyjSD1q3Yo'],
					success(res) {
						console.log('test', res)
						this.shares = share
					}
				})
				this.$api.getCardCircleDetail(this.circleId).then(result => {

					this.navigateTo('/item_businessCardCircle/businessCC_invitePost/businessCC_invitePost', {
						id: this.circleId,
						intro: result.mpCardCircle.circleIntroduce,
						name: result.mpCardCircle.name,
						price: Number(result.mpCardCircle.joinType) > 3 ? result.mpCardCircle.percent : 0,
						post: result.isHeadImage == 1 ? result.headImage[0] : null,
						subTitle: result.mpCardCircle.subheading
					})

				});

			},
			exit() {
				this.showDropDown = false;

				const action = () => {
					uni.showLoading();
					this.$api.secedeCardCircle(this.circleId).then(result => {
						uni.hideLoading();
						this.$store.commit('setNeedCircleHomeUpdate', true)
						uni.switchTab({
							url: '/pages/businessCardCircle/businessCardCircle'
						})
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '提示',
					content: `确定退出圈子吗？`,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},
			complain() {

				this.navigateTo('/item_businessCardCircle/businessCC_Complain/businessCC_Complain', {
					circleId: this.circleId,
					circle: true
				});
			},

			erweimaClick() { //圈子二维码
				this.showDropDown = false;

				this.navigateTo('../businessCC_CircleCode/businessCC_CircleCode', {
					id: this.circleId
				});
				//'cvBqennzFLLaoDP_5cklMF5Q-XStSnv8Uh4rkN5VfGU',
				uni.requestSubscribeMessage({
					tmplIds: [ '9Ix6hSNi9bDiX09zssVrjel89TO1FDFdXiyjSD1q3Yo'],
					success(res) {
						console.log('test', res)
						this.shares = share
					}
				})
			},

			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.showLoading({
							title: '上传中...'
						});
						this.uniUploadFile(res.tempFilePaths[0], url => {
							this.cardCirclePublish.headImage = url;
	
							const postData = {
								headImage: this.cardCirclePublish.headImage,
								circleId:this.circleId
							}
							uni.showLoading();	
							this.$api.updateCardCircleDetail(postData).then(result => {
								uni.hideLoading();
								uni.showToast({
									title:'修改成功',
									duration:2000
								})
								
								
							}).catch(error => {
								uni.hideLoading();
								this.showError(error)
							})
						}, null, () => {
							uni.hideLoading();
							
							
						})
					}
				})
			},

			permitSeeChange(e) {
				this.cardCirclePublish.isPermitSee = e.detail.value
				// this.save()
				const postData = {
					isPermitSee: this.cardCirclePublish.isPermitSee ? 1 : 0,
					circleId:this.circleId
				}
				uni.showLoading();	
				this.$api.updateCardCircleDetail(postData).then(result => {
					uni.hideLoading();
					uni.showToast({
						title:'修改成功',
						duration:2000
					})
					
					
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},
			permitVoice(e) {
				console.log(e.detail.value)
				this.cardCirclePublish.shutupStatus = e.detail.value;
				const postData = {
					shutupStatus: this.cardCirclePublish.shutupStatus ? 1 : 0,
					circleId:this.circleId
				}
				uni.showLoading();	
				this.$api.updateCardCircleDetail(postData).then(result => {
					uni.hideLoading();
					uni.showToast({
						title:'修改成功',
						duration:2000
					})
					
					
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
				
			},

			permitTopic(e) {
				console.log(e)
				this.cardCirclePublish.topicStatus = e.detail.value;
				const postData = {
					topicStatus: this.cardCirclePublish.topicStatus ? 1 : 0,
					circleId:this.circleId
				}
			
				uni.showLoading();	
				this.$api.updateCardCircleDetail(postData).then(result => {
					uni.showToast({
						title:'修改成功',
						duration:2000
					})
					
					uni.hideLoading();
					
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},

			//点击事件
			onNameTap(type) {
				uni.navigateTo({
					url: '../businessCC_ChangeCircleName/businessCC_ChangeCircleName?type=' + type+'&circleId='+this.circleId
				});
			},
			onSelecttap() {
				uni.navigateTo({
					url: '../businessCC_JoinCircleType/businessCC_JoinCircleType?circleId='+this.circleId
				});
			},
			onTypetap() {
				uni.navigateTo({
					url: '../businessCC_ChangeCircleType/businessCC_ChangeCircleType'
				});
			},
			onIntroducetap() {
				// if (!this.hasManagePermission) return
				uni.navigateTo({
					url: '../businessCC_CircleIntroduce/businessCC_CircleIntroduce?role='+this.circles.isManager+'&circleId='+this.circleId
				});
			},
			onTransferTap() {
				this.navigateTo('../businessCC_TransferManager/businessCC_TransferManager', {
					id: this.circleId
				})
			},
			onManageList() {
				this.navigateTo('../businessCC_ManageList/businessCC_ManageList', {
					id: this.circleId
				})
			},
			// save() {
			// 	const {
			// 		id,
			// 		headImage,
			// 		circleName,
			// 		joinType,
			// 		joinMoney,
			// 		_circleType,
			// 		introduce,
			// 		isPermitSee,
			// 		managerUserId,
			// 		shutupStatus,
			// 		pushMoneyStatus,
			// 		topicStatus,
			// 		percent,
			// 		subheading
			// 	} = this.cardCirclePublish;
			// 	console.log(pushMoneyStatus)
			// 	//如果是普通团或者付费团 无法修改为商品团

			// 	// if(joinType.id==5 && this.circle.joinType!=5){
			// 	// 	this.showError("普通团或者付费团无法修改为商品团");
			// 	// 	return
			// 	// }

			// 	//如果是普通会员 无法修改为付费圈
			// 	if ((this.currentUser.userType == 1 || this.currentUser.userType > 4) && joinType.id == 4 &&this.circles.isManager==1) {
			// 		this.showError("");
			// 		uni.showModal({
			// 			title: "提示",
			// 			content: "非VIP无法创建付费圈",
			// 			showCancel: false,
			// 			success: (res) => {
			// 				uni.navigateTo({
			// 					url: "/item_businessCard/businessCard_VIP/businessCard_VIP_New"
			// 				})
			// 			}
			// 		})
			// 		return
			// 	}
			// 	const postData = {
			// 		circleId: id,
			// 		headImage: headImage,
			// 		name: circleName,
			// 		joinType: joinType.id,
			// 		joinMoney: joinMoney,
			// 		circleTypeId: _circleType.id || '',
			// 		introduce: introduce,
			// 		isPermitSee: isPermitSee ? 1 : 0,
			// 		managerUserId,
			// 		shutupStatus: shutupStatus?1:0,
			// 		pushMoneyStatus: pushMoneyStatus ? 1 : 0,
			// 		percent: pushMoneyStatus ? percent : 0,
			// 		topicStatus: topicStatus ? 1 : 0,
			// 		subheading
			// 	};

			// 	// uni.showLoading();
			// 	this.$api.updateCardCircleDetail(postData).then(result => {
			// 		// uni.hideLoading();
			// 	}).catch(error => {
			// 		// uni.hideLoading();
			// 		if(error.code=1111){
			// 			uni.showToast({
			// 				title:error.msg,
			// 				duration:2000
			// 			})
			// 		}
			// 	})
			// },

		},

	};
</script>

<style lang="less">
	@import "../../css/jss_base.less";
	@ff: PingFangSC-Regular;

	.manageContainer {
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		background: #f5f5f5;

		.circleImgContainer {
			width: 100%;
			margin: 40upx 0 24upx 0;
			height: 170upx;
			background: #ffffff;
			.flex(@justCon: space-between;
			@alignIt: center;
			);
			padding-right: 30upx;
			box-sizing: border-box;

			.circleAvatar {
				width: 120upx;
				height: 120upx;

			}
		}

		.list {
			display: flex;
		}

		.title {
			font-size: 34rpx;
			font-weight: 400;
			font-family: PingFangSC-Regular, PingFang SC;

			min-width: 190rpx;

		}

		.content {
			height: 106upx;
			font-size: 34rpx;
			color: #888888;
			font-family: PingFangSC-Regular;
			flex: 1;
			text-align: left;
			// width: 50%;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// white-space: nowrap
		}

		.rightImg {
			width: 14upx;
			height: 24upx;
			margin-left: 20upx;
			flex-basis: 14upx;
		}

		.changeContainer {
			width: 100%;
			margin-top: 15rpx;
			margin-bottom: 15rpx;
			background-color: #fff;

			.list {
				height: 114upx;
				line-height: 114upx;

				margin-left: 30rpx;
				border-bottom: 1px solid #eeeeee;
				align-items: center;
				// .flex(@justCon: space-between;
				// @alignIt: center;
				// );
				display: flex;
				flex-direction: row;
				padding-right: 30upx;
				box-sizing: border-box;

				.right {
					margin-right: 30upx;
				}
			}

			.lists {
				min-height: 114rpx;
				max-height: 300rpx;
				display: flex;
				flex-direction: column;
				
				margin-left: 30rpx;
				background: #ffffff;
				.titles{
					display: flex;
					flex-direction: row;
					align-items: center;
					.content {
						
						display: -webkit-box;/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
						-webkit-line-clamp: 2;/*用来限制在一个块元素显示的文本的行数。*/
						-webkit-box-orient: vertical;/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
						text-overflow: ellipsis;
						overflow: hidden;
						margin-bottom: 20rpx;
						font-size: 26rpx;
						color: #999999;
						width: 80%;
					}
				}
				
			}
		}

		.dot {
			width: 30rpx;
			height: 30rpx;
			text-align: center;
			color: white;
			background: red;
			line-height: 30rpx;
			border-radius: 50%;
			font-size: 21rpx;
		}

		.set {
			width: 100%;
			background: #ffffff;
			padding-bottom: 50rpx;

			.list {
				height: 106upx;
				line-height: 106upx;
				margin-left: 30rpx;
				border-bottom: 1px solid #eeeeee;
				display: flex;
				flex-direction: row;
				align-items: center;

				.zh {
					margin-right: 30upx;
				}

				/*swtich整体大小*/
				// .wx-switch-input {
				// 	width: 119rpx !important;
				// 	height: 94rpx !important;
				// 	margin-right: 30upx;
				// 	background: #2D9FFC;
				// 	border: @tabActive  !important;
				// }

				// /*白色样式（false的样式）*/
				// .wx-switch-input::before {
				// 	width: 119rpx !important;
				// 	height: 94rpx !important;
				// 	background: @grayBg  !important;
				// }

				// /*绿色样式（true的样式）*/
				// .wx-switch-input::after {
				// 	width: 38rpx !important;
				// 	height: 37rpx !important;
				// 	border: 1upx solid #fff !important;
				// }
			}
		}

		.avatarContainer {
			padding: 27rpx 30rpx;
			background-color: #fff;

			// background: #eee;
			.seeAll {
				text-align: center;
				
				font-weight: 400;
				color: #2EA1FF;
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 32rpx;
				line-height: 80rpx;
				width:390rpx;
				height:80rpx;
				background:rgba(255,255,255,1);
				border-radius:40rpx;
				border: 2rpx solid #2ea1ff;
				margin: 30rpx auto;

			}

			.avatar {
				width: 122rpx;
				height: 122rpx;
				border-radius: 15rpx;
				margin-left: 20rpx;

				&:nth-child(5n+1) {
					margin-left: 0;
				}

				&:nth-child(n+6) {
					margin-top: 26rpx;
				}

				&.btnshare {
					background: url(https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.x9yqawQXE0vZf1e1f26d63558d78b611f008d881f33d.png);
					background-size: 100%;
				}

				&.btnshares {
					background: url(https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.fgoJe5buw5MS3378273cd0ff0a8aa7cb72736464da0d.png);
					background-size: 100%;
				}

			}
		}

		.btn {
			position: fixed;
			bottom: 39upx;
			.buttonRadius(320rpx, 80rpx, #FDBA44);
			font-size: 36rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 80rpx;
			text-align: center;
			left: 39rpx;

			&.save {
				left: 397rpx;
				background-color: #6B78FA;
			}

			&.quick {
				width: 450rpx;

				left: 150rpx;
			}
		}


		// 		.button {
		// 			margin: 100upx auto;
		// 			line-height: 88upx;
		// 			.buttonRadius();
		// 			text-align: center;
		// 
		// 			.text {
		// 				font-size: 32upx;
		// 				color: #ffffff;
		// 			}
		// 		}
	}

	.back {
		margin: 0 auto;
		width: 92%;
		height: 88rpx;
		line-height: 88rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		text-align: center;
		background-color: #2EA1FF;
		border-radius: 44rpx;
		margin-top: 100rpx;
	}
</style>
