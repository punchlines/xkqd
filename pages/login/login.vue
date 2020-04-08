<template>
	<view class="container">
		<view class="Login">
			<view class="LoginHeader">
				<view class="Lname">欢迎登录/注册</view>
				<view class="register">未注册的用户，输入验证码后即完成注册</view>
			</view>
			<view class="Lphone fx-row fx-row-center fx-row-space-around">
				<view class="Limage">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shouji.png'"></image>
				</view>
				<view class="LphoneNum">
					<input type="number" placeholder="请输入手机号码" v-model="phone">
				</view>
			</view>
			<view class="Lcode fx-row fx-row-center fx-row-space-around">
				<view class="Limage">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/zhuce.png'"></image>
				</view>
				<view class="Linput">
					<input type="number" placeholder="请输入验证码" v-model="code">
				</view>
				<view v-show="show" class="LsendCode" @click="sendCode">{{sendCodeNum}}</view>
				<view v-show="!show" class="LsendCode">{{count}} s</view>
			</view>
		</view>


		<button plain class="wechat-login" lang="zh_CN" @click="appWXgetUserInfor" style="border: none">
			<image src="http://card-1254165941.cosgz.myqcloud.com/images/icon-wechat.png" class="icon"></image>微信快捷登录
		</button>
	
		<view class="LoginBtn">
			<view class="LBtn" @click="Login">登录</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				onlineSite: this.global.onlineSite,
				phone: '', //输入的手机号码
				code: '', //验证码
				sendCodeNum: '发送验证码',
				countdown: 60,
				show: true,
				count: '',
				timer: null,
				redirect:''
			};
		},
		onLoad(option) {
			// #ifdef APP-PLUS
				this.doLoginHandle((hasLogin)=>{
					if(hasLogin){
						uni.reLaunch({
							url:'/pages/businessCard/businessCard'
						});
					}
					this.redirect = option.redirect || "";
					uni.hideLoading();
				});
				
		
			// #endif
			
		},
		methods: {
			// 验证码倒计时60s
			getCode() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			// 失去焦点校验手机号码
			CheckPhone() {
				if (!(/^\d{11}$/.test(this.phone))) {
					this.showTips('手机号码有误，请重填').then(res => {});
					return false;
				}
			},
			// 发送验证码
			sendCode() {
				if (!(/^\d{11}$/.test(this.phone))) {
					this.showTips('手机号码有误，请重填').then(res => {});
					return;
				}
				this.showTips('验证码在发送中，请注意查收验证码').then(res => {
					this.getCode();
				});
				this.$api.sendSms(this.phone, 1).then(res => {
					console.log(res);
				}).catch(err=>{this.showError(err)})
			},
			// 登录
			Login() {
              if (!(/^\d{11}$/.test(this.phone))) {
                this.showTips('手机号码有误，请重填').then(res => {});
                return;
              }

    //           if (this.code != this.GetCode) {
    //             this.showTips('验证码输入错误，请检查').then(res => {})
				// return;
    //           }

				uni.showLoading();
				this.$api.appLogin(this.phone,this.code).then(res => {
						uni.setStorageSync('token', res.token);
						uni.setStorageSync('tokenTime',new Date().getTime());
						uni.setStorageSync('userId', res.userId);
						console.log(JSON.stringify(res));
						uni.reLaunch({
							url:this.redirect?this.redirect:"/pages/businessCard/businessCard"
						})
						
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})
			},
			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo'])
		},
		computed: {
			//Vuex引入属性
			...mapState(['cardUserId', 'UPinfo'])
		},
		onShow() {
			// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen();
			// #endif
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page {
		width: 100%;
		background: #fff;
		height: 100%;
		position: fixed;
	}

	.container {
		padding: 30upx;
		margin-top: 50upx;

		.Login {
			.LoginHeader {
				.Lname {
					font-size: 50upx;
					font-weight: 900;
					margin-bottom: 20upx;
				}

				.register {
					font-size: 32upx;
					color: #666;
				}
			}

			.Lphone {
				margin-top: 100upx;
				border: 1upx solid #E1E1E1;
				border-radius: 8upx;

				.Limage {
					width: 20%;
					text-align: center;
					padding: 30upx 0;

					image {
						width: 24upx;
						height: 32upx;
						vertical-align: middle;
					}
				}

				.LphoneNum {
					width: 80%;
					font-size: 28upx;
					color: #333333;
					padding: 30upx 0;
				}
			}

			.Lcode {
				margin-top: 30upx;
				border: 1upx solid #E1E1E1;
				border-radius: 8upx;
				padding: 0;

				.Limage {
					width: 20%;
					padding: 30upx 0;
					text-align: center;

					image {
						width: 27upx;
						height: 30upx;
						vertical-align: middle;
					}
				}

				.Linput {
					width: 50%;
					font-size: 28upx;
					color: #333333;
					padding: 30upx 0;
					border: none;
				}

				.LsendCode {
					width: 30%;
					font-size: 24upx;
					color: #666;
					text-align: center;
					padding: 30upx 0;
					border-left: 1upx solid #E1E1E1;
				}
			}
		}

		.LoginBtn {
			width: 100%;
			margin-top: 100upx;

			.LBtn {
				.buttonRadius();
				margin: 0 auto;
				color: #fff;
				font-size: 32upx;
			}
		}
	}

	.wechat-login {
		border: none;
		border-radius: 0;
		font-size: 28upx;
		margin-top: 20upx;

		.icon {
			width: 48upx;
			height: 48upx;
			vertical-align: middle;
			margin-right: 16upx;
		}

	}
</style>
