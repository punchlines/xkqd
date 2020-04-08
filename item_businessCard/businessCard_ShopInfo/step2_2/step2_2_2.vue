<template>
	<view class="container">

		<title-bar title="企业资料"></title-bar>

		<view class="alarmbox">
			<text class="alarmText">以下所需要上传仅支持jpg,gif,png格式的图片,大小不能超过1M</text>
		</view>



		
		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap(1)">
			<text class="left" style="white-space: nowrap;">银行卡正面</text>
			<image v-if="pic01" :src="pic01" mode="widthFix"></image>
			<image v-if="!pic01" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>
		
		
		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap(2)">
			<text class="left" style="white-space: nowrap;">身份证正面</text>
			<image v-if="pic02" :src="pic02" mode="widthFix"></image>
			<image v-if="!pic02" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>
		
		
		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap(3)">
			<text class="left" style="white-space: nowrap;">身份证反面</text>
			<image v-if="pic03" :src="pic03" mode="widthFix"></image>
			<image v-if="!pic03" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>
		
		
		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap(5)">
			<text class="left" style="white-space: nowrap;">营业执照</text>
			<image v-if="pic05" :src="pic05" mode="widthFix"></image>
			<image v-if="!pic05" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>

		<!-- 保存按钮 -->
		<view class="btn" @click="next">保存</view>
		
	</view>
</template>

<script>
	import {upImg} from '@/js/mzl.js'
	export default {
		data() {
			return {
				isSave:false,
				onlineSite:this.global.onlineSite,
				pic01:'',
				pic02:'',
				pic03:'',
				pic05:''
			};
		},
		methods: {
			uplogTap(type){
				upImg(url=>{
					// console.log(url)
						
					this.$api.addMerchantImg(`0${type}`,url).then(res=>{
						this[`pic0${type}`] = url
					})
				})
			},
			next(){
				if(this.pic01 && this.pic02 && this.pic03 && this.pic05){
					uni.setStorageSync("_resetWallet",true)
					this.showTips("保存成功").then(()=>{uni.navigateBack();});
					
				}else{
					this.showTips("请完善信息")
				}
				
			}
		},


		// 监听页面加载
	  onLoad(options) {
		// <!-- 01=银行卡正面 02=身份证正面 03=身份证反面 05=营业执照 -->
			const {businessLicenseCard,bankCard,identityCard,identityCardBack} = options;
			
			this.pic05 = businessLicenseCard || "";
			this.pic01 = bankCard || "";
			this.pic02 = identityCard || "";
			this.pic03 = identityCardBack || "";
			
			
	  }
				 
	}
</script>

<style lang="less" scoped>

@import "../../../css/jss_base.less";
.container{
	font-size: 28upx;color: #333333;font-family: PingFangSC;background:#F5F5F5;
	min-height: 100vh;
	padding-bottom: 40upx;
	.point{
		width:100%;height:64upx;line-height:64upx; background:#FFFBCE;color:#FF7A2A;font-size:24upx;text-align:center;margin-bottom:24upx;
	}
	.alarmbox{
		// height: 50upx;
		padding: 20upx 15upx;
			.alarmText{
				font-size: 24upx;
				color: red;
				
			}
	}
	
	.subTitle{
		font-weight: bold;
		font-size: 30upx;
		margin-left: 40upx;
		margin-bottom: 15upx;
	}

	
	.logoCon{
		width: 100%;height: 170upx;box-sizing: border-box;padding: 30upx;margin-bottom: 24upx;
		background:#ffffff;
		image{width:120upx;height: 120upx;}
	}
	.type{margin-bottom:24upx;}
	.oneList{
		width: 100%;height: 106upx;background: #FFFFFF;box-sizing:border-box;padding:0 30upx;border-bottom: 1px solid #E1E1E1;
	}
	.hintMessage{font-size:28upx;color:#cccccc;font-family:PingFangSC;}
	.left{
		width: 40%;
		.pot{
			margin: 0 5upx;
			color: red;
		}
	}
	.perRight{width:60%;}
	.go{width:14upx;height:24upx;}
	.beforeinput{font-size: 28upx;color: #CCCCCC;}
	.video{margin-bottom: 43upx;}
	.input{font-size: 28upx;color: #666666;}
	.permitCon{
		box-sizing: border-box;padding: 0 30upx;font-size: 30upx;color: #000000;
		image{width:220upx;height: 220upx;margin:35upx 0 90upx 0;}
	}
	.btn{
		.buttonRadius();
		margin: 0 auto;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;font-family: PingFangSC;
		position: fixed;bottom: 30rpx;left: 65rpx;
	}
	// 弹出层
	.saveModel{
		position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);z-index: 1;
		.saveCon{
			width: 84%;margin: 0 auto; background: #FFFFFF;box-sizing:border-box;padding:40upx;border-radius:20upx;
			image{width: 120upx;height: 120upx;margin-top:10upx}
			.succ{font-size: 36upx;color: #333333;margin: 32upx 0 20upx 0;}
			.txt{font-size: 28upx;color: #666666;margin: 20upx 0 50upx 0;text-align: center;}
			.but{width:100%;height: 80upx;line-height: 80upx;text-align: center;font-size: 28upx;border-radius: 40upx;}
			.bindC{ border: 1px solid #6B7AF8;color: #6B7AF8;margin-bottom: 24upx;}
			.shop{ border: 1px solid #CCCCCC;color: #CCCCCC}
		}
	}
}
</style>
