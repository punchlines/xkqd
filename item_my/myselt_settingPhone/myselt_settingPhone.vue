<template>
	<view class="container">
		<view class="BindPhone fs6a28">当前绑定手机号</view>
		<view class="PhoneNum fx-row fx-row-center fx-row-space-around borderB">
			<view class="HNphone fs3a28">手机号</view>
			<view class="HNnum fs3a28">{{EncryPphone}}</view>
		</view>
		<view class="Code fx-row fx-row-center fx-row-space-around">
			<view class="Ctitle fs3a28">验证码</view>
			<view class="Cnum fs3a28">
				<input type="tel" placeholder="请输入验证码" v-model="userCodeNum" maxlength="6">
			</view>
			<view class="SCsendCode">
				<view v-show="show" class="CodeNum fs6a24" @click="settingPhone">发送验证码</view>
				<view v-show="!show" class="CodeNum fs6a24">{{count}} s</view>
			</view>
		</view>
		<view class="ChangePhone">
			<view class="Phone" @click="changePhone">换绑手机号</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				EncryPphone:'',//用于加密的手机
				phone:'',
				countdown:60,
				show: true,
				count: '',
				timer: null,
				userCodeNum:'',//用户输入的验证码
				getCodeNum:'1234567',//获取到的验证码

			};
		},
		methods:{
			// 验证码倒计时60s
			getCode(){
		     const TIME_COUNT = 60;
		     if(!this.timer) {
		       this.count = TIME_COUNT;
		       this.show = false;
		       this.timer = setInterval(() => {
		       if (this.count > 0 && this.count <= TIME_COUNT) {
		         this.count--;
		        }else{
		         this.show = true;
		         clearInterval(this.timer);
		         this.timer = null;
		        }
		       }, 1000)
		      }
			 }, 
			// 发送验证码
			settingPhone(){
				this.$api.sendSmsChangePhone(this.phone,2).then(res=>{
					console.log(res);
					this.showTips('验证码在发送中，请注意查收验证码').then(res=>{});
					this.getCode();
					this.getCodeNum=res.code;
				})
			},

			// 更换手机号码
			changePhone(){
				if(this.userCodeNum==this.getCodeNum){
					uni.navigateTo({
						url: '../myselt_settingNewPhone/myselt_settingNewPhone'
					});
				}else{
					this.showTips('请检查验证码是否输入正确').then(res=>{})
				}
			},
		},
		onLoad(options) {
			this.phone=options.phone;
			this.EncryPphone=options.phone;
			console.log(options.phone);
			// 手机加密
			this.EncryPphone = this.EncryPphone.slice(0,3) + '****' + this.EncryPphone.substr(7);
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{width:100%;height:100%;background:@grayBg}
	.container{
		.BindPhone{padding:30upx;}
		.PhoneNum{
			padding:30upx;background: #fff;
			.HNphone{width:30%;text-align: left;}
			.HNnum{width:70%;text-align: left;}
		}
		.Code{
			padding:20upx 30upx;background: #fff;
			.Ctitle{width:30%;text-align: left;}
			.Cnum{width:45%;text-align: left;}
			.SCsendCode{
				width:25%;
				.CodeNum{.buttonRadius(@w:160upx;@h:64upx;@bg:none);border:1upx solid #6B7AF8;color:#6B7AF8;font-size:24upx;}
			}
		}
		.ChangePhone{
			width:100%;margin-top:100upx;
			.Phone{.buttonRadius();margin:0 auto;color:#fff;font-size:32upx;}
		}
	}
</style>
