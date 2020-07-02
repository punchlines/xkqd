<template>
	<view class="container">
		<view class="name">
			<input type="text" v-model="name" class="input" maxlength="10" placeholder="请输入社群名称，最多不超过10个字符" />
			<image @click="deleteName" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/del.png'" class="del"></image>
		</view>
		<view class="button" @click="confirm">
			<text class="text">确定</text>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				onlineSite: this.global.onlineSite,
				name: '',
				type: 0,
				circleId:''
			};
		},

		onLoad(options) {
			this.type = options.type;
			this.circleId=options.circleId
			console.log(options)
			this.name = options.type == 1 ? this.cardCirclePublish.subheading : this.cardCirclePublish.circleName
		},

		computed: {
			cardCirclePublish() {
				return this.$store.state.cardCirclePublish;
			},
		},

		methods: {
			confirm() {
				if (!this.name) {
					this.showTips('请输入圈子名称')
					return;
				}
				if (this.type == 0) {
					this.cardCirclePublish.circleName = this.name;
					// uni.navigateBack();
					const postData = {
						name:this.name,
						circleId:this.circleId
					}
					uni.showLoading();	
					this.$api.updateCardCircleDetail(postData).then(result => {
						uni.hideLoading();
						uni.showToast({
							title:'修改成功',
							duration:2000
						})
						
						uni.navigateBack();
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				} else {
					this.cardCirclePublish.subheading = this.name;
					// uni.navigateBack();
				}
				// uni.showToast({
				// 	title:'设置成功',
				// 	duration:2000,
				// 	success: () => {
				// 		uni.navigateBack();
				// 	}
				// })
			},
			deleteName() {
				this.name = ''
			}
		},

	};
</script>

<style lang="less">
	@import "../../css/jss_base.less";

	page {
		background: #FFFFFF;
	}

	.container {
		width: 100%;

		.name {
			height: 106upx;
			margin-top: 41upx;
			background: #ffffff;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			;
			color: #666666;
			display: flex;

			.input {
				flex: 1;
				color: #666666;
				font-size: 28upx;
				font-family: PingFangSC;
				font-weight: 400;
			}

			.flex(@justCon: space-between;
			@alignIt: center;
			);

			input {
				margin-left: 30upx;
			}

			.del {
				width: 30upx;
				height: 30upx;
				margin-right: 30upx;
			}
		}

		.button {
			width: 686rpx;
			height: 94rpx;
			background: rgba(46, 161, 255, 1);
			border-radius: 47rpx;
			background-color: #2EA1FF;
			margin: 100upx auto;
			line-height: 94upx;
			text-align: center;

			.text {
				font-family: PingFangSC;
				color: #ffffff;
				font-weight: 400;
			}
		}
	}
</style>
