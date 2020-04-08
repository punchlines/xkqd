<template>
	<view class="container">

		<title-bar title="企业资料"></title-bar>

		<!-- <view class="alarmbox">
			<text class="alarmText">以下所需要上传电子版资质仅支持jpg,gif,png格式的图片,大小不能超过1M,且必须加盖企业彩色公章。</text>
		</view> -->
		
		
			
		<!-- 真实姓名 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>真实姓名</text>
			<input v-model="name" type="text"  placeholder="请输入真实姓名" placeholder-class="beforeinput" class="input" />
		</view>
		
		<!-- 手机号 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>手机号</text>
			<input v-model="phone" type="text"  placeholder="请输入手机号" placeholder-class="beforeinput" class="input" />
		</view>
		
		<!-- 银行卡号 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>银行卡号</text>
			<input v-model="bankAccountNo" type="text"  placeholder="请输入银行卡号" placeholder-class="beforeinput" class="input" />
		</view>
		
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>银行卡类型</text>
			 <picker @change="bindPickerChange" :value="bankaccountType" :range="typeRange">
				<view class="uni-input">{{typeRange[bankaccountType-1]}}</view>
			</picker>
		</view>
		
		<!-- 身份证号 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>身份证号</text>
			<input v-model="idCrad" type="text"  placeholder="请输入身份证号" placeholder-class="beforeinput" class="input" />
		</view>
		

		
		<!--法人身份证电子版-->
<!-- 		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap">
			<text class="left" style="white-space: nowrap;"><text class="pot">*</text>法人身份证电子版</text>
			<image v-if="logo" :src="logo" mode="widthFix"></image>
			<image v-if="!logo" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view> -->
		

		<!-- 公司名称 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left" >公司名称</text>
			<input v-model="merchantName" type="text"  placeholder="请输入公司名称" placeholder-class="beforeinput" class="input" />
		</view>
		

		


		<!-- 保存按钮 -->
		<view class="btn" @click="next">下一步</view>
		
	</view>
</template>

<script>
	import {upImg} from '@/js/mzl.js'
	import {mapState,mapMutations} from 'vuex';
	import { getBankCard } from '@/js/lib/bankCard';
	export default {
		data() {
			return {
				isSave:false,
				onlineSite:this.global.onlineSite,
				typeRange:["借记卡","贷记卡","存折"],
				shopId:'',
				userId: 1, //当前用户的ID
				name: "", //真实姓名
				phone: "", //手机号
				bankAccountNo: "", //银行卡号
				bankName: "", //银行名称
				bankaccountType: 1, //银行卡类型 1=借记卡 2=贷记卡 3=存折
				idCrad: "", //身份证号
				merchantName: "" //公司名称
			};
		},
		methods: {
			bindPickerChange(e){
				this.bankaccountType = 1 + parseInt( e.target.value);
			},
			next(){
				const postData = {
					name: this.name, //真实姓名
					phone: this.phone, //手机号
					bankAccountNo: this.bankAccountNo, //银行卡号
					bankName: "", //银行名称
					bankaccountType: this.bankaccountType, //银行卡类型 1=借记卡 2=贷记卡 3=存折
					idCrad: this.idCrad, //身份证号
					merchantName: this.merchantName, //公司名称
					bankAka:""
				}
				getBankCard(this.bankAccountNo).then(data => {
						postData.bankName = data.bankName;
						postData.bankAka = data.bankCode;
						 // console.log(data)
						this.$api.registerPrivateMerchant(postData).then(res=>{
							uni.setStorageSync("_resetWallet",true)
							uni.redirectTo({
								url:"/item_businessCard/businessCard_ShopInfo/step2_2/step2_2_2"
							})

						})
					}
				);
			}
		},
	

	}
</script>

<style lang="less" scoped>

@import "../../../css/jss_base.less";
.container{
	font-size: 28upx;color: #333333;font-family: PingFangSC;background:#F5F5F5;
	min-height: 100vh;
	padding-bottom: 40upx;
	.bottomspace{
		margin-bottom: 25upx;
	}
	
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
		width: 35%;
		.pot{
			margin: 0 5upx;
			color: red;
		}
	}
	.perRight{width:65%;}
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
