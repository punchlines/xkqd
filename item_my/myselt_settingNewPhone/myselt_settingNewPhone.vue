<template>
	<view class="container top">
		<view class="PhoneNum fx-row fx-row-center fx-row-space-around borderB">
			<view class="HNphone fs3a28">手机号</view>
			<view class="HNnum fs3a28">
				<input type="text" placeholder="请输入新号码" v-model="phone">
			</view>
		</view>
		<view class="Code fx-row fx-row-center fx-row-space-around">
			<view class="Ctitle fs3a28">验证码</view>
			<view class="Cnum fs3a28">
				<input type="text" placeholder="请输入验证码" v-model="userCodeNum">
			</view>
			<view class="SCsendCode">
				<view v-show="show" class="CodeNum fs6a24" @click="settingPhone">发送验证码</view>
				<view v-show="!show" class="CodeNum fs6a24">{{count}} s</view>
			</view>
		</view>
		<view class="ChangePhone">
			<view class="Phone" @click="changePhone">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				countdown:60,
				show: true,
				count: '',
				timer: null,
				userCodeNum:'',//用户输入的验证码
				getCodeNum:'',//获取到的验证码
				checkP:false,//校验手机号正确
				checkC:false,//校验验证码正确
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

			// 获取验证码
			settingPhone(){
				if(!(/^\d{11}$/.test(this.phone))){
					this.showTips('手机号码有误，请重填').then(res=>{});
					return false;
				}
				this.$api.sendSmsChangePhone(this.phone,2).then(res=>{
					console.log(res);
					this.showTips('验证码在发送中，请注意查收验证码').then(res=>{});
					this.getCode();
					this.getCodeNum=res.code;
				}).catch(error=>{
					this.showError(error);
				})
			},

			// 确定更换手机号码
			changePhone(){
				if(this.userCodeNum==this.getCodeNum){
					uni.showLoading();
					this.$api.updatePhone(this.phone).then(res=>{
						uni.hideLoading();
						if(res&&res.ERROR=='10001'){
							this.showTips('该手机号码已经被注册，请重新输入').then(res=>{});
						}else{
							this.showTips('修改成功').then(res=>{
								uni.navigateBack({
									delta: 2
								});
							});
						}
					})
				}else{
					uni.hideLoading();
					this.showTips('请检查验证码是否输入正确').then(res=>{})
				}
			},
		},
		onLoad() {
			
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{width:100%;height:100%;background:@grayBg}
	.container{
		margin-top:30upx;
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
