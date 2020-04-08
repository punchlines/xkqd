<template>
	<view class="container">
		<view class="name list fx-row fx-row-left fx-row-center">
			<text class="left">{{getParam==1?"真实姓名":"持卡人"}}</text>
			<input type="text" value=""  placeholder="请输入真实姓名" placeholder-class="before" v-model="username" />
		</view>
		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">银行卡号</text>
			<input style="flex: 1" type="text" value="" placeholder="请输入卡号" placeholder-class="before" v-model="cardNum" />
		</view>
		
		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">银行名称</text>
			<picker @change="bindPickerChange" style="flex: 1" range-key='bankName' :value="index" :range="array">
			        <view class="uni-input">{{array[index].bankName}}</view>
			 </picker>
			
		</view>
		
		
		
		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">手机号</text>
			<input style="flex: 1" type="text" value="" placeholder="请输入手机号" placeholder-class="before" v-model="phone" />
		</view>
		<view class="number list fx-row fx-row-left fx-row-center">
			<text class="left">身份证号</text>
			<input style="flex: 1" type="text" value="" placeholder="请输入身份证号" placeholder-class="before" v-model="idNo" />
		</view>
		<view class="btn" @click="next">{{getParam==1?"确认完善":"绑定银行卡"}}</view>
		<view class="noBind" @click="goBack">{{getParam==1?"暂不完善":"暂不绑定"}}</view>
	</view>
</template>

<script>
  import { getBankCard } from '../../js/lib/bankCard';

  export default {
    data() {
      return {
        username: '',
		idNo:'',
		phone:'',
		cardNum:'',
		array: [],
		index: 0,
        getParam:'',//获取从哪个页面过来的参数
      };
    },
    methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
      //点击事件
      next(){//下一步
        if (!this.username) {
          this.showError('请输入持卡人', '提示');
          return;
        }
        if (!this.cardNum){
          this.showError('请输入卡号', '提示');
          return;
        }
		if (!this.idNo) {
          this.showError('请输入身份证信息', '提示');
          return;
        }
        if (!this.phone){
          this.showError('请输入手机', '提示');
          return;
        }
        uni.showLoading();
		
		const card = {
			bankName: this.array[this.index].bankName,
			bankCardNo: this.cardNum,
			realName: this.username,
			mobile: this.phone,
			idNo:this.idNo
		}
		this.showLoading();
		const action = this.getParam==1?this.$api.registerPersonalMerchant:this.$api.addBankCard;
		
		if(this.getParam==1)
		// card.returnUrl = `https://www.baidu.com`;
			card.returnUrl = `https://xk.gzskxx.com/static/do.html`;
		
		action(card).then(result => {
			this.hideLoading();
			uni.setStorageSync("_resetWallet",true)
			if(this.getParam==1){
				let host = result.url+"?"+result.parameterString
				console.log(host)
				uni.redirectTo({
					url:"/pages/WebView?url="+encodeURIComponent(host)
				})
					
			}else{
					this.showTips("绑定完成").then(res=>{
						uni.navigateBack();
					})
			}
							//this.redirect();
		}).catch(error => {
		  console.log(error)
		  this.showError(error)
		  this.hideLoading();
		})
        // getBankCard(this.cardNum).then(data => {
        //   uni.hideLoading()
        //   this.navigateTo(
        //       '../businessCard_BindBankcardNext/businessCard_BindBankcardNext',
        //       Object.assign({ from: this.getParam, cardNum: this.cardNum, username: this.username }, data)
        //   )
        // }).catch(error => {
        //   uni.hideLoading()
        //   this.showError(error, '提示');
        // })
      },
      // 暂时不绑定
      goBack(){
        uni.navigateBack({
          delta: 1
        });
      },
    },
    onLoad(options){
      this.getParam=options.from;
	  
	  if(this.getParam==1){
		  uni.setNavigationBarTitle({
		  	title:"填写资料"
		  });
	  }
	  this.$api.getBankCode().then(res=>{
		  this.array = res;
	  })
    },


  }
</script>

<style lang="less">

@import "../../css/jss_base.less";
.container{
	width:100%;height:100%; position:fixed;background:#F5F5F5;font-size:28upx;color:#333333;
	.list{width:100%;height:106upx;background:#ffffff;box-sizing:border-box;padding:0 30upx;}
	.left{width:30%;}
	.text{color: #333333;}
	.before{color: #CCCCCC;}
	.name{border-bottom: 1px solid #E1E1E1;margin-top:42upx;}
	.btn{
		.buttonRadius();
		margin: 101upx auto;margin-bottom: 24upx;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;font-family: PingFangSC;
	}
	.noBind{width:100%;text-align: center;color: #999999;}
}
</style>
