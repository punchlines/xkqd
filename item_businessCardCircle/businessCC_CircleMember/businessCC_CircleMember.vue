<template>
	<view class="container">
		<view class="cicleMember top">
			<!-- 搜索 -->
			<view class="CMsearch-container">
				<view class="CMsearch">
					<view class="CMimage">
						<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
					</view>
					<view class="CMinput">
						<input type="" class="" placeholder="请输入群员的名字" v-model="searchKey" confirm-type="search" @confirm="search"></input>
					</view>
				</view>
			</view>


			<!-- 成员列表 -->
			<view class="CMmemberListBox">
				

				<view class="list" v-for="(item,index) of list" :key="item.id">
					<view class="isCheck" @click="addUid(item.isCheck,index)" v-if="memberType == 1">
						<image :src=" item.isCheck==0?'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.yOucamAENO9619766e00ffedd01b399def5a56424eeb.png':'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.JUF1xYiAQVtm542f9bf31a5ed4b779bf9db807dfa3ae.png'"
						 style="width: 44rpx;height: 44rpx;"></image>
					</view>
					<view class="member" @click="openMemberDetail(item)" :style="memberType!=1?'margin-left:0rpx;width:684rpx':'margin-left:30rpx;width:614;'">
						<image :src="item.headImage" class="avatar"></image>
						<view class="member-meta">
							<view class="user-info">
								<text class="name single-line">{{ item.name }}</text>
								<text class="job">{{ item.job }}</text>
								<!-- <text v-if="item.memberType == 3" class="job">管理员</text> -->
							</view>
							<view class="company"></view>
						</view>

						<view v-if="item.memberType == 1&&memberType !=1"  class="more-container">
						<image  class="more" style="width:30upx;height:30upx;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/wode.png'"></image>
					</view>
					<view v-else-if="item.userId != currentUser.id"  class="more-container" @click.stop="openDropDown(item)">
						<image class="more"  :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/gengduo.png'"></image>
					</view>

						<view class="dropDown" :style="{ display: item._showDropDown && showDropDown ? 'block' : 'none' }">
						
						<view  @click.stop="toComplain">投诉成员</view>
					</view>

					</view>
				</view>
				<uni-load-more :loading-type="loadingType"></uni-load-more>
			</view>
		</view>

		<view class="dropDownBackground" @click="showDropDown = false" v-if="showDropDown"></view>

		<!-- 弹框 -->
		<view class="transBox" v-if="dialogVisible">
			<view class="allInfo">
				<view class="cardInfo" :style="{backgroundImage:'url(http://card-1254165941.cosgz.myqcloud.com/cardImages/images/bg.png)'}">
					<view class="infoBox">
						<image :src="currentDropItem.headImage"></image>
						<view class="info">
							<view class="position">
								<text class="name">{{ currentDropItem.name }}</text>
								<view class="posDe">{{ currentDropItem.job }}</view>
							</view>
							<view class="company">{{ currentDropItem.company }}</view>
						</view>
					</view>
					<view class="date">加入时间：{{ currentDropItem._joinTime }}</view>
					<view class="yaoqing">
						<text v-if="currentDropItem.inviterUserName">由{{ currentDropItem.inviterUserName }}邀请加入</text>
						<text v-else>通过名片圈搜索加入</text>
					</view>
				</view>
				<view class="transTo circle" v-if="hasManagePermission" @click="transferCardCircleManger">{{currentDropItem?currentDropItem.memberType==3?"取消管理员":"设置管理员":"设置管理员"}}</view>
				<view class="out circle" @click="moveCircleMember">移出圈子</view>
			</view>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/tuichu.png'" class="close" @click="dialogVisible = false"></image>
		</view>
		<view class="delete" v-if="uid.length>0" @click="deleteUser">删除（{{uid.length}}）</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				circleId: '',
				currentPage: 1,
				list: [],
				loading: false,
				noMore: false,
				hasPermisson: -1,
				currentMemberId: '',
				showDropDown: false,
				currentDropItem: {},
				searchKey: '',
				currentSearch: '',
				dialogVisible: false,
				memberType: 2,
				managerMap: {},
				uid: [],
				code: '',
				isPermitSee: false,
			};
		},

		computed: {
			cardCirclePublish() {
				return this.$store.state.cardCirclePublish;
			},
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			},
			hasManagePermission() {
				//管理员权限
				//         const manger = this.list[0];
				//         return !!(manger && manger.userId === this.currentUser.id);

				return this.hasPermisson == 0;
			},
		},

		watch: {
			showDropDown(show) {
				if (!show) {
					this.currentDropItem._showDropDown = false;
				}
			},
		},

		onLoad(option) {
			this.circleId = option.id;
			this.memberType = option.memberType || 2;
			//判断权限
			this.$api.myPermission(this.circleId).then(res => {
				this.hasPermisson = res.permission;
			});

			this.isPermitSee = !!Number(option.isPermitSee);

			this.currentMemberId = this.cardCirclePublish.managerUserId
			this.fetch();
		},

		onReachBottom() {
			if (this.noMore || this.loading) return;
			this.fetch();
		},

		methods: {
			search() {
				this.currentSearch = this.searchKey;
				this.reset();
				this.fetch();
			},
			fetch() {
				if (this.loading) return;
				this.loading = true;
				const action = this.currentSearch ?
					this.$api.searchCircleMember(this.circleId, this.currentSearch, this.currentPage)//this.$api.listCircleMember(this.circleId, 1, this.currentPage) //
					:
					this.$api.listCircleMember(this.circleId, 0, this.currentPage)

				action.then(result => {
					this.loading = false;
					const list = result.memberList;
					list.forEach(item => {
						console.log(item)
						item._showDropDown = false;
						item.isCheck = 0
						item._joinTime = this.formatDate(item.joinTime)
					})

					if (list.length === 0) {
						this.noMore = true;
					}
					this.list = this.list.concat(list);
					this.currentPage++;
				}).catch(error => {
					this.loading = false;
					this.showTips('加载失败')
					console.error(error);
				})
			},

			selectMember(user) {
				this.currentMemberId = user.userId;
			},

			openMemberDetail(user) {
				console.log(this.isPermitSee, this.hasManagePermission)
				if (this.isPermitSee || this.hasManagePermission) {
					this.navigateTo('/pages/businessCard2/businessCard2', {
						cardUserId: user.userId
					});
				}
			},
			addUid(isCheck, index) {
				this.code = ''
				if (this.list[index].isCheck == 0) {
					this.list[index].isCheck = 1
					this.uid.push(this.list[index].userId)

					for (let i in this.uid) {
						if (this.uid.length - i === 1) {
							this.code += this.uid[i]
						} else {
							this.code += this.uid[i] + ','
						}
					}
					console.log(this.code)
				} else if (this.list[index].isCheck == 1) {
					this.code = ''
					this.list[index].isCheck = 0
					if (this.uid.length > 0) {
						for (let i in this.uid) {
							if (this.uid[i] == this.list[index].userId) {
								this.uid.splice(i, 1)
								for (let i in this.uid) {
									if (this.uid.length - i === 1) {
										this.code += this.uid[i]
									} else {
										this.code += this.uid[i] + ','
									}
								}
							}
						}
						console.log(this.code)
					}
				}
			},
			confirm() {
				this.cardCirclePublish.managerUserId = this.currentMemberId;
				uni.navigateBack();
			},

			openDropDown(item) {
				this.showDropDown = true;
				this.currentDropItem = item;
				item._showDropDown = !item._showDropDown;
				this.currentDropItem = item;
			},

			transferCardCircleManger() {
				if (this.currentDropItem.memberType == 3) {
					const action = () => {
						uni.showLoading();
						this.$api.relieveAdministrators(this.circleId, this.currentDropItem.userId).then(result => {
							uni.hideLoading();
							this.dialogVisible = false;
							this.reset();
							this.fetch();
						}).catch(error => {
							uni.hideLoading();
							this.dialogVisible = false;
							this.reset();
							this.fetch();
							this.showError(error)
						})
					}

					uni.showModal({
						title: '取消管理员',
						content: `【${this.currentDropItem.name}】将被取消管理员身份`,
						success: (res) => {
							if (res.confirm) {
								action();
							}
						}
					});


					return
				}

				const action = () => {
					uni.showLoading();
					this.$api.setAdministrators(this.circleId, this.currentDropItem.userId).then(result => {
						uni.hideLoading();
						this.dialogVisible = false;
						this.reset();
						this.fetch();
					}).catch(error => {
						uni.hideLoading();
						this.dialogVisible = false;
						this.reset();
						this.fetch();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '设置管理员',
					content: `【${this.currentDropItem.name}】将成为管理员`,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},
			//删除成员
			deleteUser() {
				uni.showModal({
					title: '确定将该用户从社群中删除吗?',
					success: (res) => {
						if (res.confirm) {
							if(this.uid.length<20){
								uni.showLoading();
								this.$api.moveCircleMember(this.circleId,  this.code)
									.then(res => {
										uni.hideLoading();
										this.reset();
										this.fetch();
									})
									.catch(err => {
										uni.hideLoading();
										this.showError(error)
									})
							}else{
								uni.showToast({
									title:"勾选人数不能大于20",
									duration:2000
								})
							}
							
						} else if (res.cancel) {
							console.log("用户取消选择")
						}
					}
				})

			},
			moveCircleMember() {
				const action = () => {
					uni.showLoading();
					this.$api.moveCircleMember(this.circleId, this.currentDropItem.userId).then(result => {
						uni.hideLoading();
						this.dialogVisible = false;
						this.reset();
						this.fetch();
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '提示',
					content: `确定将该用户移出吗？`,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},

			reset() {
				this.currentPage = 1;
				this.list = [];
				this.loading = false;
				this.noMore = false;
			},

			mangeUser(user) {
				this.showDropDown = false;
				this.currentDropItem._showDropDown = false;
				this.dialogVisible = true;
			},

			toComplain() {
				this.showDropDown = false;
				this.currentDropItem._showDropDown = false;
				this.navigateTo('../businessCC_Complain/businessCC_Complain', {
					circleId: this.circleId,
					userId: this.currentDropItem.userId,
				});
			}


		},

	};
</script>

<style lang="less" scoped>
	.CMmemberListBox {
		// padding: 0 30upx;
		/*margin-top: 110upx;*/
	}

	.member {
		height: 180upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 14px 4px rgba(230, 230, 230, 0.5);
		border-radius: 10px;
		display: flex;
		box-sizing: border-box;
		padding: 40upx 30upx;
		position: relative;
		margin-bottom: 20upx;
		width: 614rpx;
		margin-left: 30rpx;
		flex-direction: row;

		.avatar {
			width: 120upx;
			height: 120upx;
			border-radius: 10px;
			margin-right: 30upx;
		}

		.member-meta {}

		.user-info {
			display: flex;
			align-items: center;

			flex-direction: column;
		}

		.name {
			font-size: 32upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			line-height: 45upx;
			margin-bottom: 20rpx;
			max-width: 200rpx;
		}

		.job {
			height: 36upx;
			line-height: 36upx;
			background: #E0F1FF;
			border-radius: 18upx;
			padding: 4upx 18upx;
			font-size: 20upx;
			color: rgba(102, 102, 102, 1);

		}

		.company {
			font-size: 24upx;
			color: rgba(153, 153, 153, 1);
			line-height: 33upx;
		}


		.dropDown {
			width: 280upx;
			position: absolute;
			top: 105upx;
			right: 14upx;
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
				box-shadow: -1upx 1upx 4upx -1upx rgba(187, 187, 187, 0.55);

			}
		}
	}

	@import '../../css/mzl_base.less';
	@bg: bg;

	.container {
		box-sizing: border-box;
		background: #FFFFFF;
		min-height: 100vh;
		position: relative;

		.CMsearch-container {
			padding: 0 30upx;
			height: 110upx;
			background: #FFFFFF;
			position: fixed;
			z-index: 999;
		}

		.cicleMember {
			width: 100%;
			background: #FFFFFF;

			.CMsearch {

				z-index: 999;

				.flex(flex-start);
				text-align: left;
				background: #f2f2f2;
				height: 72upx;
				color: #ccc;
				font-size: 28upx;
				margin: 0 auto;
				margin-top: 20upx;
				border-radius: 2px;

				.CMimage {
					margin: 0 30upx;

					image {
						width: 32upx;
						height: 32upx;
						vertical-align: middle;
					}
				}

				.CMinput {
					input {
						color: #333333;
						width: 600upx;
					}
				}
			}

			.CMmemberListBox {
				width: 100%;
				padding-top: 130upx;

				.auditList {
					padding: 20upx;
					box-sizing: border-box;
					margin: 0 auto;

					.auditCard {
						.ACcardHeader {
							.flex();
							width: 100%;
							background: #fff;
							;
							margin-bottom: 30upx;

							.ACimage {
								width: 20%;
								padding-left: 20upx;

								image {
									width: 100upx;
									height: 100upx;
								}
							}

							.ACtitle {
								width: 80%;
								padding: 20upx;
								box-sizing: border-box;

								.ACTitlebOX {
									width: 100%;
									height: 50upx;
									position: relative;

									.ACTname {
										margin-right: 30upx;
										font-size: @fsContentTitle;
										color: @title;
										font-weight: bold;
									}

									.ACTsubname {
										width: auto;
										padding: 0upx 10upx;
										display: inline-block;
										font-size: 20upx;
										color: #666;
										background: #F8F8F8;
										text-align: center;
										border-radius: 18upx;
									}

									.ACTMessage {
										width: 25upx;
										height: 30upx;
										position: relative;
										right: -160upx;
									}

									.more {
										width: 6upx;
										height: 28upx;
										position: relative;
										right: -230upx;
									}

								}

								.ACcomany {
									width: 100%;
									height: 50upx;
									font-size: @fsNum;
									color: @logoNote;
									position: relative;
									top: 10upx;
								}
							}
						}
					}

				}
			}

		}
	}

	.more-container {
		width: 38upx;
		height: 38upx;
		position: absolute;
		top: 15px;
		right: 15px;

		.more {
			width: 6upx;
			height: 28upx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

	}

	.transBox {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10001;

		.allInfo {
			width: 630upx;
			position: absolute;
			top: 40%;
			left: 50%;
			margin-top: -325upx;
			margin-left: -315upx;
			background: #FFFFFF;
			border-radius: 10upx;

			.cardInfo {
				width: 570upx;
				height: 320upx;
				background-position: 50%;
				background-size: contain;
				background-repeat: no-repeat;
				box-sizing: border-box;

				margin-top: 40upx;
				.flex(@justCon: center;
				@alignIt: flex-start;
				);
				flex-direction: column;

				.infoBox {
					.flex(flex-start);
					margin: 82upx 0 40upx 70upx;

					&>image {
						width: 100upx;
						height: 100upx;
					}

					.info {
						margin-left: 24upx;

						.position {
							.flex(@justCon: center;
							@alignIt: center;
							);

							.name {
								font-size: 32rpx;
								font-weight: bold;
							}

							.posDe {
								margin-left: 14upx;
								height: 36upx;
								line-height: 36upx;
								border-radius: 18upx;
								font-size: 20upx;
								color: #666666;
								background: #F5F5F5;
								text-align: center;
								box-sizing: border-box;
								padding: 0 14upx;
							}
						}

						.company {
							margin-top: 21upx;
							color: #999999;
							font-size: 24upx;
						}
					}
				}

				.date {
					line-height: 33upx;
					margin-bottom: 8upx;
					margin-left: 70upx;
					font-size: 24upx;
					color: #666666;
				}

				.yaoqing {
					margin-left: 70upx;
					margin-bottom: 60upx;
					font-size: 24upx;
					color: #666666;
				}
			}

			.circle {
				width: 90%;
				margin: 0 auto;
				text-align: center;
				height: 80upx;
				line-height: 80upx;
				border-radius: 40upx;
				font-size: 28upx;
				text-align: center;
			}

			.transTo {

				margin-top: 50upx;
				border: 1px solid #6B7AF8;
				color: #6B7AF8;

			}

			.out {
				margin-top: 30upx;
				margin-bottom: 50upx;
				border: 1px solid #979797;
				color: #666666;
			}
		}

		.close {
			width: 70upx;
			height: 70upx;
			position: absolute;
			top: 75%;
			left: 50%;
			margin-left: -35upx;
			margin-top: 35upx;
		}
	}

	.dropDownBackground {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
	}

	.list {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30rpx;

	}

	.delete {
		width: 686rpx;
		height: 88rpx;
		background: rgba(255, 60, 49, 1);
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		font-size: 36rpx;
		position: fixed;
		bottom: 30rpx;
		left: 32rpx;
	}
</style>
