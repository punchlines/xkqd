<template>

	<view class="page">
		<title-bar :showHome="false" title="填写订单地址"></title-bar>
		<view class="importFormWechat" @click="importFormWechat"> 从微信导入地址
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
		</view>

		<view class="form">
			<view class="form-item">
				<view class="label">收件人</view>
				<view class="control">
					<input placeholder="请输入收件人" v-model="form.name">
				</view>
			</view>
			<view class="form-item">
				<view class="label">联系电话</view>
				<view class="control">
					<input placeholder="请输入收件人常用电话" v-model="form.phone" maxlength="12">
				</view>
			</view>

			<view class="form-item">
				<view class="label">收货地址</view>
				<view class="control">
					<view class="perRight fx-row fx-row-space-between fx-row-center">
						<input placeholder="请选择省市区" placeholder-class="hintMessage" :value="pickerText" disabled="disabled" @click="showMulLinkageThreePicker"></input>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" class="go"></image>
					</view>
				
				</view>
			</view>


			<view class="form-item">
				<view class="label">详细地址</view>
				<view class="control">
					<input placeholder="请输入详细地址" v-model="form.detailedAddress">
				</view>
			</view>

		</view>

		  <!--城市三级联动 -->
		<mpvue-city-picker themeColor="#6B7AF8" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm">
		</mpvue-city-picker>
		<!--城市三级联动 -->

		<button class="btn-primary" @click="post">保存</button>


		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="isSave">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->
				<image v-if="!isLoading" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/save.png'" mode="widthFix"></image>
				<image v-else class="rotate" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png'"
				 mode="widthFix"></image>
				<view class="succ">{{isLoading?'请稍等，正在保存':'保存成功'}}</view>
				<view class="txt">{{isLoading?'您的信息已提交，正在审核中...':'点击按钮返回首页'}}</view>
				<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<view v-if="!isLoading" class="shop but" @click="retIndex">回到首页</view>
			</view>
		</view>


	</view>

</template>

<script>
	 import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components: {
		
			 mpvueCityPicker
		},


		data() {
			return {
				onlineSite: this.global.onlineSite,
				themeColor: '#6B7AF8',
				checkPhone: true,
				isSave: false, //点击保存按钮后展示弹窗
				isLoading: false,
				form: {

					name: '', // 收件人
					phone: '',
					province: '',
					city: '',
					area: '',
					detailedAddress: '',
					zipCode: '0,0,1',
					isDefault: 0
				},
				timer: null, // 轮询timer
				pickerText:'北京市-市辖区-西城区',
				cityPickerValueDefault: [0, 0, 0]

			}
		},

		onLoad(options) {
			this.orderNum = options.orderNum;

		},



		methods: {
			retIndex() {

				this.$store.dispatch('updateCurrentUserInfo').then(res => {
					this.$store.dispatch('setShopRegInfo').then(() => {
						uni.reLaunch({
							url: '/pages/businessCard/businessCard?showFirstVipModal=1'
						});
					})
				});

			},
			onConfirm(e) {
				 console.log(e)
				 let [ province, city, area ] = e.label.split('-');
				this.form.province = province;
				this.form.city = city;
				this.form.area = area;
				this.pickerText = e.label;
			},
			    // 三级联动选择选择省市区
			  showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			  },

			importFormWechat() {
				// #ifdef MP-WEIXIN
				uni.chooseAddress({
					success: (res) => {
						console.log("授权成功")
						if (res.errMsg.indexOf('ok') != -1) {
							console.log("获取收货地址成功")
							console.log(res)
							this.form.phone = res.telNumber;
							this.form.name = res.userName;
							const {
								provinceName,
								cityName,
								countyName,
								detailInfo
							} = res;
							//this.value1 = [provinceName, cityName, countyName];
							this.pickerText = [provinceName,cityName,countyName].join('-');
							this.form.province = provinceName;
							this.form.city = cityName;
							this.form.area = countyName;
							this.form.detailedAddress = detailInfo;
						}

					},
					fail: (err) => {
						//console.log(err)
						if (err.errMsg.indexOf('fail') != -1) {
							console.log("获取收货地址失败")
							this.showSettingModal();

						}
					}
				})

				// #endif
			},

			showSettingModal() {
				uni.showModal({
					title: '获取失败',
					content: '获取收货地址失败,请授权获取地址',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting({
								scope: 'scope.address',
								success: (res) => {
									if (res.authSetting['scope.address'] == true) {
										this.importFormWechat();
									} else {

									}

								},
								fail: () => {
									//this.showSettingModal();
								}
							})
						}


					}
				});
			},


			post() {
				let [ province, city, area ] = this.pickerText.split('-');
			 
				this.form.province = province;
				this.form.city = city;
				this.form.area = area;
				
				if (!this.form.name) return this.showError('请输入收件人');
				if (!this.form.phone) return this.showError('请输入电话号码');
				if (!this.form.phone.match(/^((0\d{2,3}-\d{7,8})|(1[358764]\d{9}))$/)) return this.showError('请输入有效的电话号码');
				if (!this.form.detailedAddress) return this.showError('请输入详细地址');



				const postData = JSON.parse(JSON.stringify(this.form));

				this.showLoading();
				let addressId = "";
				//插入收货地址
				this.$api.addOrUpdateAddress(postData).then(result => {
					//uni.showToast({ title: postData.id ? '修改成功' : '添加成功', duration: 1000 });
					//uni.navigateBack()
					addressId = result;
					//获取到地址ID  填地址信息 
					this.$api.orderAddressComfirm(this.orderNum, addressId).then(res => {
						//填写成功 跳转首页
						uni.hideLoading()
						this.isSave = true;
					
					}).catch(error => {
						uni.hideLoading()
						//未回调 轮询
						console.log(error)
						if (error.message == "无此订单") {
							this.isSave = true;
							this.isLoading = true;
							this.timer = setInterval(() => {
								this.$api.orderAddressComfirm(this.orderNum, addressId).then(res => {
									this.isLoading = false;
									clearInterval(this.timer);
								}).catch(err => {


								});

							}, 15000)

						}

					});


				}).catch(error => {
					uni.hideLoading()
					this.showError(error)
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

	.page {

		.rotate {
			animation: rotateicon 3s infinite linear;
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

		background-color: #f3f3f3;

		.importFormWechat {
			height: 120upx;
			width: 100%;
			background: url('../../static/vip/weixin.png') no-repeat #f3f3f3 15upx 40upx;
			background-size: 40upx;
			font-size: 25upx;
			text-indent: 60upx;
			line-height: 122upx;
			position: relative;

			.go {
				position: absolute;
				right: 10upx;
				top: 48upx;
				width: 14upx;
				height: 24upx;
			}
		}

	}

	.form {
		background: #fff;
		padding: 0 30upx;
		margin-bottom: 26upx;
	}

	.form-item {
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #E1E1E1;
		height: 106upx;

		.label {
			width: 120upx;
			font-size: 28upx;
			color: #000000;
			margin-right: 40upx;
		}

		.control {
			flex: 1;
		}

		input {
			width: 100%;
			height: 104upx;
			line-height: 104upx;
			font-size: 28upx;
			color: #333333;

			&::placeholder {
				color: #CCCCCC;
			}
		}

		image {
			width: 12upx;
			height: 24upx;
			vertical-align: middle;
		}
	}


	.btn-primary {
		width: 670upx;
		margin: 0 calc(50% - 335upx);
		position: fixed;
		bottom: 20upx;

	}
</style>
