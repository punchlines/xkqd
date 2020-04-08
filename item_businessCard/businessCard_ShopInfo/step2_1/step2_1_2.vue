<template>
	<view class="container">

		<title-bar title="店铺资料"></title-bar>

		<!-- 提示 -->
		<!-- <view class="point">填写越多企业信息，消费者信任度越高</view> -->
	
		<view class="alarmbox">
			<text class="alarmText">用于入驻过程中接收销刻反馈的入驻通知,请务必正确填写</text>
		</view>
		<!-- 真实姓名 -->
		<view class="company oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>真实姓名</text>
			<input v-model="trueName" type="text"  placeholder="请输入真实姓名" placeholder-class="beforeinput" class="input"/>
		</view>
		

		<!-- 身份证号 -->
		<view class="company oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>身份证号</text>
			<input v-model="idCard" type="text"  placeholder="请输入身份证号" placeholder-class="beforeinput" class="input"/>
		</view>
		<!-- 银行卡号 -->
		<view class="company oneList fx-row fx-row-center" style="margin-bottom: 35upx;">
			<text class="left"><text class="pot">*</text>银行卡号</text>
			<input v-model="bankAccount" type="text"  placeholder="请输入银行卡号" placeholder-class="beforeinput" class="input"/>
		</view>

		<!-- 保存按钮 -->
		<view class="btn" @click="next">保存</view>
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="isSave">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->
				<image v-if="!isLoading"  :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/save.png'" mode="widthFix"></image>
				<image v-else class="rotate" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png'" mode="widthFix"></image>
				<view class="succ">{{isLoading?'请稍等，正在开通':'店铺开通成功'}}</view>
				<view class="txt">{{isLoading?'您的店铺正在开通,请耐心等待1-2分钟,以免开通失败':'点击按钮返回首页'}}</view>
			<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<view v-if="!isLoading" class="shop but" @click="retIndex">回到首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {upImg} from '@/js/mzl.js'
	  import { getBankCard } from '@/js/lib/bankCard';
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				isSave:false, //点击保存按钮后展示弹窗
				isLoading:false,
				trueName:'',
				idCard:'',
				shopId:'',
				bankAccount:'',
				timer:null, // 轮询timer
				data:{}
			};
		},
		methods: {
	


				//保存店铺信息 this.VideoInfo
				next(){

					this.data=Object.assign(this.data,{
						trueName:this.trueName,
						idCard:this.idCard,
						bankAccount:this.bankAccount
					});

					var jg=this.CheckTap()
					if(!jg){
						return false;
					}
					
					uni.showLoading();
					//判断银行卡类型
					getBankCard(this.bankAccount).then(res=>{
						console.log(res)
							this.data.bankAka = res.bankCode;
							//生成店铺
							this.$api.saveShop(this.data).then(res=>{
								
									this.savePass(res);
								
							}).catch(err=>{
								//TODO 错误处理
								//uni.hideLoading()
								//this.showTips("请稍后，数据正在处理中");
								if(err.code==80001){
									uni.hideLoading()
									this.showTips("店铺已经创建");
								}else if(err.message=="用户不是vip"){
									this.isSave=true;
									this.isLoading=true;
									uni.hideLoading()
									//启动timer 轮询
									this.timer = setInterval(()=>{
										
										this.$api.saveShop(this.data).then(res=>{
								
												this.savePass(res);
												clearInterval(this.timer);
											
										}).catch(err=>{
											//
											if(err.code==80001){
												uni.hideLoading()
												this.isSave = false;
												this.isLoading = false;
												this.showTips("店铺已经创建");
											}else if(err.message=="用户不是vip"){
												
											}else{
												uni.hideLoading()
												this.isSave = false;
												this.isLoading = false;
												this.showTips(err.message);
											}
											
										});
									
									},15000)
								}else{
									uni.hideLoading()
									this.showError(err);
								}
								
								
							})
						
					}).catch(err=>{
						 uni.hideLoading()
						 this.showError(err);
					});
					
					
					
					// this.$api.insertShopData(data).then(res=>{
					// 	console.info(res)
					// 	if(res.ERROR==80001){
					// 		this.showTips('创建店铺已创建');
					// 	}else{
					// 		this.$store.dispatch('updateCurrentUserInfo');
					// 		if (this.VideoInfo.id) {
					// 			this.updateVideo(res.shopId);
					// 		}
					// 	}
					// 	uni.hideLoading();
					// 	var pages = getCurrentPages();
					// 	if (pages.length === 1) {
					// 		uni.switchTab({url: '/pages/businessCard/businessCard'});
					// 	}
					// }).catch(err=>{
					// 	uni.hideLoading();
					// 	this.showError(err)
					// 	console.info(err)
					// })

				},
				
				savePass(res){
					uni.hideLoading();
					this.$store.dispatch('updateCurrentUserInfo');
					this.shopId = res.shopId;
					uni.setStorageSync('shopId',this.shopId);
				
						this.$store.dispatch('setShopRegInfo').then(res=>{
							this.isSave = true;
							this.isLoading = false;
						});
					
				},
				
				CheckTap(){
					
					const bankReg = /^(\d{16}|\d{19})$/;
			
					const idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					
					if(!this.trueName){
						this.showTips('请输入真实姓名');
						return false
					}else if(!idReg.test(this.idCard)){
						this.showTips('请输入正确身份证号码');
						return false
					}else if(!bankReg.test(this.bankAccount)){
						this.showTips('请输入正确银行卡号码');
						return false
					}else{
						return true;
					}
				},
				
				bindCa(){//绑定银行卡
					uni.navigateTo({
						url:'../../item_my/myself_bankCardManage/myself_bankCardManage?from=0'
					})
				},
				retIndex(){
					uni.switchTab({url: '/pages/businessCard/businessCard'});
						// var pages = getCurrentPages();
						// if (pages.length === 1) {
						// 	uni.switchTab({url: '/pages/businessCard/businessCard'});
						// }
			
				},
				//Vuex引入方法
				...mapMutations(['setCardUserId','setUPinfo','setCarGoods','setItemShopClassify','setVideoInfo'])
				  },
				  //注册组件
				  components:{
				  },
					//监听计算属性
				  computed: {
				   	//Vuex引入属性
					...mapState(['cardUserId','userType','carGoods','shareId','itemShopClassify','VideoInfo'])
				  },

				// 监听页面加载
				  onLoad: function (options) {
					
					this.data = JSON.parse(decodeURIComponent(options.data));
					// 初始化全局变量
					
					
				  },
				  // 监听页面显示
				  onShow: function () {
					
				  },
				  //监听页面隐藏
				  onHide: function () {
				   console.log('监听页面隐藏');
				  },
				  
				  // 监听页面卸载
				  onUnload: function () {
				   console.log('监听页面卸载');
				  },
				  //监听下拉刷新
				  onPullDownRefresh() {
				   console.log('onPullDownRefresh');
				   
				  },
				  //监听上拉刷新
				  onReachBottom() {
				   console.log('onReachBottom');
				  },
	}
</script>

<style lang="less" scoped>

@import "../../../css/jss_base.less";

@keyframes rotateicon{
	0%{
		transform: rotate(0deg)
	}
	
	100%{
		transform: rotate(360deg)
	}
}

.container{
	font-size: 28upx;color: #333333;font-family: PingFangSC;background:#F5F5F5;
	min-height: 100vh;
	padding-bottom: 40upx;
	.rotate{
		animation: rotateicon 3s infinite linear;
	}
	
	.point{
		width:100%;height:64upx;line-height:64upx; background:#FFFBCE;color:#FF7A2A;font-size:24upx;text-align:center;margin-bottom:24upx;
	}
	.alarmbox{
		height: 50upx;
		line-height: 50upx;
		margin-bottom: 12upx;
		margin-left: 8upx;
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
		width: 28%;
		.pot{
			margin: 0 5upx;
			color: red;
		}
	}
	.perRight{width:72%;}
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
		position: fixed;
		bottom:20upx;
		left:65upx;
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
