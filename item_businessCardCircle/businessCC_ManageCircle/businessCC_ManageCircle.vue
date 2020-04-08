<template>
	<view class="container">

		<view class="manageContainer">
			<view class="avatarContainer">
				<view class="box fx-row fx-wrap fx-row-start">
						<image  v-for="(item,index) in detailImageList"  :key="index" class="avatar"  :src="item"></image>
						<button  open-type="share"  class="avatar btnshare"></button>
				</view>
				
				<view class="seeAll" v-if="isPermitSee || hasManagePermission || memberType!=2" @click="lookClick">
					查看圈内成员
				</view>
			</view>
			<view class="circleImgContainer" v-if="memberType!=2">
				<text class="title">圈子头像</text>
				<view @click="changeAvatar">
					<circle-avatar :avatar="cardCirclePublish.headImage" :images="headImage"></circle-avatar>
				</view>

				<!--<image @click="changeAvatar" :src="cardCirclePublish.headImage" class="circleAvatar fr"></image>-->
			</view>
			<view class="changeContainer" v-if="memberType!=2">
				<view class="list" @click="onNameTap(0)">
					<text class="title">圈子名称</text>
					<text class="content single-line">{{ cardCirclePublish.circleName }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
				
				<view class="list" @click="onNameTap(1)">
					<text class="title">圈子副标题</text>
					<text class="content single-line">{{ cardCirclePublish.subheading }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>

			
					<view class="list" @click="onSelecttap">
						<text class="title">加圈方式</text>
						<text class="content">{{ cardCirclePublish.joinType.text }}</text>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
					</view>
					
					<view class="list" @click="onTypetap">
						<text class="title">圈子类型</text>
						<text class="content">{{ cardCirclePublish._circleType ? cardCirclePublish._circleType.name : '' }}</text>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
					</view>
					
					<view class="list" @click="auditClick">
						<text class="title">审核申请</text>
						<!-- <text class="content">{{ cardCirclePublish._circleType ? cardCirclePublish._circleType.name : '' }}</text> -->
						<view v-if="applyCount>0" class="fx-row fx-row-center fx-row-right">
							<view class="dot">1</view>
						</view>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
					</view>

			</view>
			
			<view class="changeContainer" style="margin-top: 28upx">
				
				<view class="list"  @click="erweimaClick">
					<text class="title">圈子二维码</text>
					
					<view class="fx-row fx-row-center fx-row-right">
						<image  style="width: 50rpx; height: 50rpx;opacity:0.78;" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/erweima.png" mode=""></image>
						<!-- <text class="content single-line">{{ cardCirclePublish.introduce }}</text> -->
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
					</view>
					
				</view>
				
				<view class="list" @click="onIntroducetap">
					<text class="title">圈子介绍</text>
					<text class="content single-line">{{ cardCirclePublish.introduce }}</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
				
				<view class="list" @click="complain">
					<text class="title">投诉圈子</text>
					<!-- <text class="content single-line">{{ cardCirclePublish.introduce }}</text> -->
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg"></image>
				</view>
			</view>
	
			<view class="set" style="margin-top: 28upx" v-if="memberType!=2">
				<view class="list" v-if="hasManagePermission" @click="onTransferTap">
					<text class="title">转让群主</text>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="rightImg fr zh"></image>
				</view>
				<view class="list">
					<text class="title">允许成员查看名片</text>
					<switch :checked="isChecked" @change="permitSeeChange"></switch>
				</view>
				<view class="list">
					<text class="title">全成员禁言</text>
					<switch :checked="isSelected" @change="permitVoice"></switch>
				</view>
				
				<view class="list">
					<text class="title">关闭话题区</text>
					<switch :checked="isTopic" @change="permitTopic"></switch>
				</view>
				
				<view class="list" v-if="cardCirclePublish.joinType.id==4">
					<text class="title">开启提成</text>
					<switch :checked="isPushMoney" @change="permitPush"></switch>
				</view>
			</view>


			<template v-if="memberType!=2">
				<view class="btn" v-if="hasManagePermission" @click="deleteCircle">删除圈</view>
				<view class="btn save" :class="{'quick':!hasManagePermission}"  @click="save">保存</view>
			</template>
			<view v-else class="btn quick save" @click="exit">退出圈子</view>
			
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
				detailImageList:[],
				circle: {},
				applyCount:0,
				memberType:2,
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
			console.log('/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin?id=' + this.circleId + '&recommendId=' +
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
			
			isPushMoney(){
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
					pushMoneyStatus:pushMoneyStatus,
					percent:percent,
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
					shutupStatus:shutupStatus,
					topicStatus:topicStatus,
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

		},

		methods: {
			
			
			
			permitPush(e){
				this.cardCirclePublish.pushMoneyStatus = e.detail.value;
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
					memberType:this.memberType
				});
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
						}, null, () => {
							uni.hideLoading();
						})
					}
				})
			},

			permitSeeChange(e) {
				this.cardCirclePublish.isPermitSee = e.detail.value
			},
			permitVoice(e){
			
				this.cardCirclePublish.shutupStatus = e.detail.value;
				
			},
			
			permitTopic(e){
				console.log(e)
				this.cardCirclePublish.topicStatus = e.detail.value;
				
			},

			//点击事件
			onNameTap(type) {
				uni.navigateTo({
					url: '../businessCC_ChangeCircleName/businessCC_ChangeCircleName?type='+type
				});
			},
			onSelecttap() {
				uni.navigateTo({
					url: '../businessCC_JoinCircleType/businessCC_JoinCircleType'
				});
			},
			onTypetap() {
				uni.navigateTo({
					url: '../businessCC_ChangeCircleType/businessCC_ChangeCircleType'
				});
			},
			onIntroducetap() {
				if(!this.hasManagePermission) return
				uni.navigateTo({
					url: '../businessCC_CircleIntroduce/businessCC_CircleIntroduce'
				});
			},
			onTransferTap() {
				this.navigateTo('../businessCC_TransferManager/businessCC_TransferManager', {
					id: this.circleId
				})
			},

			save() {
				const {
					id,
					headImage,
					circleName,
					joinType,
					joinMoney,
					_circleType,
					introduce,
					isPermitSee,
					managerUserId,
					shutupStatus,
					pushMoneyStatus,
					topicStatus,
					percent,
					subheading
				} = this.cardCirclePublish;
				console.log(pushMoneyStatus)
				//如果是普通团或者付费团 无法修改为商品团
				
				// if(joinType.id==5 && this.circle.joinType!=5){
				// 	this.showError("普通团或者付费团无法修改为商品团");
				// 	return
				// }
				
				//如果是普通会员 无法修改为付费圈
				if((this.currentUser.userType==1 || this.currentUser.userType>4) && joinType.id==4){
					// this.showError("");
					uni.showModal({
						title:"提示",
						content:"非VIP无法创建付费圈",
						showCancel:false,
						success: (res) => {
							uni.navigateTo({
								url:"/item_businessCard/businessCard_VIP/businessCard_VIP_New"
							})
						}
					})
					return
				}
				
				
				
				const postData = {
					circleId: id,
					headImage: headImage,
					name: circleName,
					joinType: joinType.id,
					joinMoney: joinMoney,
					circleTypeId: _circleType.id || '',
					introduce: introduce,
					isPermitSee: isPermitSee ? 1 : 0,
					managerUserId,
					shutupStatus:shutupStatus?1:0,
					pushMoneyStatus:pushMoneyStatus?1:0,
					percent:pushMoneyStatus?percent:0,
					topicStatus:topicStatus?1:0,
					subheading
				};

				uni.showLoading();
				this.$api.updateCardCircleDetail(postData).then(result => {
					this.showTips('修改成功');
					uni.hideLoading();
					uni.navigateBack();
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},

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
		background: #f8f8f8;
		padding-bottom: 200rpx;
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
			font-size: @fsSubTitle;
			font-weight: 400;
			font-family: @ff;
			margin-left: 30upx;
			min-width: 200upx;
		}

		.content {
			height: 106upx;
			font-size: @fsSubTitle;
			color: #666666;
			font-family: @ff;
			flex: 1;
			text-align: right;
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

			.list {
				height: 106upx;
				line-height: 106upx;
				background: #ffffff;
				border-bottom: 1px solid #eeeeee;
				.flex(@justCon: space-between;
				@alignIt: center;
				);
				padding-right: 30upx;
				box-sizing: border-box;

				.right {
					margin-right: 30upx;
				}
			}
		}
		.dot{
			width: 30rpx;
			height:30rpx; 
			text-align:center;
			color:white;
			background: red;
			line-height: 30rpx;
			border-radius: 50%;
			font-size: 21rpx;
		}

		.set {
			.list {
				height: 106upx;
				line-height: 106upx;
				background: #ffffff;
				border-bottom: 1px solid #eeeeee;
				.flex(@justCon: space-between;
				@alignIt: center;
				);

				.zh {
					margin-right: 30upx;
				}

				/*swtich整体大小*/
				.wx-switch-input {
					width: 82rpx !important;
					height: 40rpx !important;
					margin-right: 30upx;
					background: @tabActive  !important;
					border: @tabActive  !important;
				}

				/*白色样式（false的样式）*/
				.wx-switch-input::before {
					width: 82rpx !important;
					height: 40rpx !important;
					background: @grayBg  !important;
				}

				/*绿色样式（true的样式）*/
				.wx-switch-input::after {
					width: 38rpx !important;
					height: 37rpx !important;
					border: 1upx solid #fff !important;
				}
			}
		}
		.avatarContainer{
			padding: 27rpx 45rpx;
			// background: #eee;
			.seeAll{
				width:450rpx;
				height:65rpx;
				margin: 45rpx auto 0;
				background:rgba(253,186,68,1);
				border-radius:33rpx;
				font-size:36rpx;
				text-align: center;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height:65rpx;
			}
			
			.avatar{
				width:108rpx;
				height:108rpx;
				border-radius:15rpx;
				margin-left: 30rpx;
				&:nth-child(5n+1){
					margin-left:0;
				}
				&:nth-child(n+6){
					margin-top: 26rpx;
				}
				&.btnshare{
					background: url(https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/%E7%BB%84%203%402x.png);
					background-size:100%;
				}
				
			}
		}
		
		.btn{
			position: fixed;
			bottom: 39upx;
			.buttonRadius(320rpx,80rpx,#FDBA44);
			font-size:36rpx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:80rpx;
			text-align: center;
			left:39rpx;
			&.save{
				left: 397rpx;
				background-color: #6B78FA;
			}
			
			&.quick{
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
</style>
