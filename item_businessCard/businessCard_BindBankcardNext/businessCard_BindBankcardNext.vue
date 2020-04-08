<template>
	<view class="container">
		<view class="tell list fx-row fx-row-left fx-row-center">
			<text class="left">手机号码</text>
			<input type="text" disabled  placeholder="请输入注册手机号" placeholder-class="before" v-model="pwPhone" />
		</view>
		<view class="check list fx-row fx-row-left fx-row-center">
			<text class="left">验证码</text>
			<view class="right fx-row fx-row-space-between fx-row-center">
				<input type="text" value="" placeholder="请输入验证码" placeholder-class="before" v-model="userCodeNum" />
				<view v-show="show" class="getNum" @click="settingPhone">获取验证码</view>
				<view v-show="!show" class="getNum fs6a24">{{count}} s</view>
			</view>
		</view>
		<view class="btn" @click="finishClick">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  option: {},
			  getParam:'',//获取从哪个页面过来的参数
				countdown:60,
				show: true,
				count: '',
				timer: null,
				userCodeNum:'',//用户输入的验证码
				checkP:false,//校验手机号正确
			};
		},
		computed:{
			pwPhone(){
				return this.currentUser.phone.split("").map((item,index)=>{ return index>2&&index<7?"*":item }).join("");
			},
			phone(){
				return this.currentUser.phone;
			}
			
		},
		
		methods: {
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
					if (!this.phone) {
						this.checkP=false;
						this.showError('请输入手机号', '提示');
						return;
					}
					if (!this.phone.match(/\d{11}/)) {
						this.checkP=false;
						this.showError('请输入有效的手机号', '提示');
						return;
					}
					this.$api.sendSms(this.phone,3).then(res=>{
						console.log(res);
						this.showTips('验证码在发送中，请注意查收验证码').then(res=>{});
						this.getCode();
						
					}).catch(error=>{
						this.showError(error);
					})
				},  
				// 校验手机号码
				CheckPhone(){
					if (!this.phone) {
						this.checkP=false;
					  this.showError('请输入手机号', '提示');
					  return;
					}
					if (!this.phone.match(/\d{11}/)) {
						this.checkP=false;
						this.showError('请输入有效的手机号', '提示');
						return;
					}
					this.checkP=true;
				},
		
			 //点击事件
			finishClick(){//完成绑定银行卡
              if (!this.phone) {
                this.showError('请输入手机号', '提示');
                return;
              }
              if (!this.phone.match(/\d{11}/)) {
                this.showError('请输入有效的手机号', '提示');
                return;
              }
              // if(this.userCodeNum!=this.getCodeNum){
              //   this.showTips('验证码输入错误，请重新输入');
              //   return;
              // }
			  
			  if(!this.userCodeNum || this.userCodeNum==""){
				  this.showTips('请输入验证码');
                  return;
			  }

				const card = {
					bankName: this.option.bankName,
					cardType: this.option.cardType,
					cardNum: this.option.cardNum,
					userName: this.option.username,
					userPhone: this.phone,
					bankAka:this.option.bankCode,
					code:this.userCodeNum
			  }
			  this.showLoading();
					this.$api.addBankCard(card).then(result => {
					this.hideLoading();
					this.redirect();
			  }).catch(error => {
			    console.log(error)
			    this.showError(error)
                this.hideLoading();
			  })

			},

		  redirect () {
			  uni.setStorageSync("_resetWallet",true)
            uni.navigateBack({
              delta: 2
            });
			

            if(this.getParam==0){
              uni.navigateTo({
                url: '../businessCard_MyShop/businessCard_MyShop'
              });
            }else if(this.getParam==1){
              // uni.navigateTo({
              //   url: '../../item_my/myself_PutForward/myself_PutForward',
              // })
            }else if(this.getParam==2){
              // uni.navigateTo({
              //   url: '../../item_my/myself_bankCardManage/myself_bankCardManage',
              // })
            }


		  },

		},
		 onLoad(options){
			this.getParam=options.from;
			this.option = options;
		 },
	}
</script>

<style lang="less">

@import "../../css/jss_base.less";
.container{
	width:100%;height:100%; position:fixed;background:#F5F5F5;font-size:28upx;color:#333333;
	.list{width:100%;height:106upx;background:#ffffff;box-sizing:border-box;padding:0 30upx;}
	.left{width:25%;}
	.TleftName,.right{width:75%;}
	.right{
		input{width:60%;text-align: left;}
		.getNum{width:40%;}
	}
	.text{color: #333333;}
	.before{color: #CCCCCC;}
	.tell{border-bottom: 1px solid #E1E1E1;margin-top:42upx;}
	.getNum{height: 64upx;padding:0 20upx;line-height: 64upx;color: #6B7AF8;border: 1px solid #6B7AF8;text-align: center;border-radius: 32upx;}
	.btn{
		.buttonRadius();
		margin: 101upx auto;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;font-family: PingFangSC;
	}
}
</style>
