<template>
	<view class="">
		<!-- 成员列表模板 -->
		<view class="memberListContainer">
			<view class="memberBox">
				<view class="list" v-for="(item,index) of list" :key="item.id">
					<view class="isCheck" @click="addUid(item.isCheck,index)">
						<image :src=" item.isCheck==0?'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.yOucamAENO9619766e00ffedd01b399def5a56424eeb.png':'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.JUF1xYiAQVtm542f9bf31a5ed4b779bf9db807dfa3ae.png'"
						 style="width: 44rpx;height: 44rpx;margin-top: -10rpx;"></image>
					</view>
					<view class="member">
						<!-- :class="{ active: currentMemberId == item.userId }" -->
						<image :src="item.headImage" class="avatar"></image>
						<view class="member-meta">
							<view class="user-info">
								<text class="name">{{ item.name }}</text>
							</view>
						</view>
					</view>
					<uni-load-more :loading-type="loadingType"></uni-load-more>
				</view>

			</view>

		</view>
		<!-- 转让确定按钮 -->
		<view class="sureButton">
			<view class="createBtn" @click="confirm">
				<text class="createTxt">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				id: '',
				uid: [],
				code: ''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.fetch()
		},
		onShow() {

		},
		methods: {
			fetch() {
				uni.showLoading();
				this.$api.getCircleManagerList(this.id).then(res => {
					uni.hideLoading();
					this.list = res
					this.list.forEach(item => {
						item.isCheck = 0
					})
				})
			},
			addUid(isCheck, index) {
				this.code = ''
				if (this.list[index].isCheck == 0) {
					this.list[index].isCheck = 1
					this.uid.push(this.list[index].id)

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
							if (this.uid[i] == this.list[index].id) {
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
				// this.cardCirclePublish.managerUserId = this.currentMemberId;
				uni.showModal({
					title: '确认将此用户移除管理员？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading();
							this.$api.relieveAdministrators(this.id, this.code)
								.then(res => {
									uni.hideLoading();
									uni.showToast({
										title:'设置成功',
										duration:2000
									})
									this.fetch();
									uni.navigateBack()
								})
								.catch(err => {
									uni.hideLoading();
									this.showError(error)
								})

						} else if (res.cancel) {
							console.log("用户取消选择")
						}
					}
				})
				// uni.navigateBack();
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
	}

	.memberListContainer {
		width: 100%;
		box-sizing: border-box;

		height: 100%;
		padding-top: 20rpx;


		.memberBox {
			height: 100%;
			overflow-y: auto;
		}

		.member {


			border-radius: 10px;
			display: flex;
			box-sizing: border-box;
			padding: 20rpx;
			position: relative;
			margin-bottom: 20upx;
			width: 100%;
			padding: 20rpx 0rpx 20rpx 20rpx;
			margin-left: 30rpx;
			flex-direction: row;

			&.active {
				&:after {
					content: "";
					width: 28upx;
					height: 22upx;
					position: absolute;
					top: 50%;
					right: 30upx;
					transform: translateY(-50%);
					background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png");
					background-size: 100% 100%;
				}
			}

			.avatar {
				width: 100upx;
				height: 80upx;
				border-radius: 10rpx;
				margin-right: 30upx;
			}

			.member-meta {
				width: 100%;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #E5E5E5;
			}

			.user-info {
				display: flex;
				align-items: center;
				margin-top: 20rpx;

			}

			.name {
				font-size: 32upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 45upx;
				margin-right: 22upx;
			}

			.job {
				height: 36upx;
				line-height: 36upx;
				background: rgba(241, 241, 241, 1);
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
		}
	}

	.sureButton {
		position: fixed;
		width: 100%;
		height: 100upx;
		background: #ffffff;
		bottom: 10rpx;
		display: flex;
		align-items: center;

		.createBtn {
			background-color: #2EA1FF;
			width: 686rpx;
			height: 88upx;
			border-radius: 44rpx;
			line-height: 88upx;
			margin: 0 auto;
			text-align: center;

			.createTxt {
				line-height: 80upx;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}

	.list {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30rpx;

	}
</style>
