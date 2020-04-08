<template>
	<view class="container">
		
		<title-bar :title="froms==0?'实名认证':'填写入驻信息'" :showHome="froms==1"></title-bar>

		<!-- 提示 -->
		<!-- <view class="point">填写越多企业信息，消费者信任度越高</view> -->
		
		<view class="alarmbox" style="text-align: center;">
			<text class="alarmText">{{ froms==0?'您的入驻信息需要更新,请认真填写以下信息':'请认真填写以下信息'}}</text>
		</view>

		<!-- 真实姓名 -->
		<view class="company oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>真实姓名</text>
			<input v-model="trueName" type="text"  placeholder="请输入真实姓名" placeholder-class="beforeinput" class="input"/>
		</view>
		
		
	
<!-- 		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>地址</text>
			<picker :value="value1" class="perRight fx-row fx-row-space-between fx-row-center" style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;" mode="region"  @change="regionChange">
					<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
						<text>
							{{value1[0]}}--
						</text>
						<text>
							{{value1[1]}}--
						</text>
						<text>
							{{value1[2]}}
						</text>
					</view>
				</picker>
		</view>
		
	
		<view class="company oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>详细地址</text>
			<input v-model="address" type="text"  placeholder="请输入详细地址" placeholder-class="beforeinput" class="input"/>
		</view> -->
		
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
		<view class="btn"  @click="next">保存</view>
	
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="isSave">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->
				<image  :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/save.png'" mode="widthFix"></image>

				<view class="succ">保存成功</view>
		
			<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<view  class="shop but" @click="retIndex">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	  import { getBankCard } from '@/js/lib/bankCard';
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				isSave:false, //点击保存按钮后展示弹窗
				trueName:'',
				idCard:'',
				province:'',
				city:'',
				area:'',
				address:'',
				value1: ["广东省","广州市","天河区"],
				shopId:'',
				bankAccount:'',
				data:{},
				froms:0 ,//0-强制跳转 1-用户主动填写
				redirect:''
			};
		},
		methods: {
	
			// 地址
			// regionChange(e){
			// 	this.value1=e.detail.value
			// },
			
				//保存信息 this.VideoInfo
				next(){
				
					
					var jg=this.CheckTap()
					if(!jg){
						return false;
					}
					
					this.data={
						address:"广东省广州市天河区",
						userId:uni.getStorageSync('userId'),
						trueName:this.trueName,
						idCard:this.idCard,
						bankAccount:this.bankAccount
					}
					
					uni.showLoading();
					//判断银行卡类型
					getBankCard(this.bankAccount).then(res=>{
						//console.log(res)

						this.data.bankAka = res.bankCode;
						//生成店铺
						this.$api.registerMer(this.data).then(res=>{
							
								this.savePass();
							
						}).catch(err=>{
							//TODO 错误处理
							uni.hideLoading()
							this.showError(err, '提示');
							
						})

					}).catch(err=>{
						 uni.hideLoading()
						 this.showError(err, '提示');
					});
					


				},
				
				savePass(){
					uni.hideLoading();
					this.$store.dispatch('updateCurrentUserInfo');
				
						//vuex数据存入
					this.$store.dispatch('setShopRegInfo').then(res=>{this.isSave = true;});
						
					
					
				},
				
				CheckTap(){
					
					const bankReg = /^(\d{16}|\d{19})$/;
			
					const idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					
					if(!this.trueName){
						this.showTips('请输入真实姓名');
						return false
					}else if(!bankReg.test(this.bankAccount)){
						this.showTips('请输入正确银行卡号码');
						return false
					}else{
						return true;
					}
				},

				retIndex(){
					if(!!this.redirect){
						uni.redirectTo({
							url:decodeURIComponent(this.redirect)
						})
					}else
					uni.switchTab({url: '/pages/businessCard/businessCard'});

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
					// 初始化全局变量
					this.setItemShopClassify("")
					this.setVideoInfo("")
					this.froms = options.froms;
					this.redirect = options.redirect;
					// if(this.froms==0){
					// 	//强制跳转弹出提醒
					// 	uni.showModal({
					// 		title: '提示',
					// 		content: '由于政策要求，您的店铺信息需要更新，请认真填写以下信息',
					// 		showCancel: false,
					// 		confirmText: '确认'
					// 	});
					// 	
					// }
					
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

@import "../../css/jss_base.less";

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
		position: fixed;
		bottom: 20upx;
		left: 60upx;
		.buttonRadius();
		margin: 0 auto;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;font-family: PingFangSC;
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
