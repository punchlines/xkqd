<template>
	<view class="container">

		<title-bar title="店铺资料"></title-bar>
		<!-- 提示 -->
		<!-- <view class="point">填写越多企业信息，消费者信任度越高</view> -->
		<!-- 店铺logo -->
		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap">
			<text class="left">店铺logo</text>
			<image v-if="logo" :src="logo" mode="widthFix"></image>
			<image v-if="!logo" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>
		
		<view class="alarmbox">
			<text class="alarmText">用于入驻过程中接收销刻反馈的入驻通知,请务必正确填写</text>
		</view>
		<!-- 店铺名称 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>店铺名称</text>
			<input v-model="shopName" type="text"  placeholder="请输入店铺名称" placeholder-class="beforeinput" class="input" />
		</view>
	
		<!-- 品类 -->
		<view class="type oneList fx-row fx-row-center fx-row-left" @click="selectCate">
			<text class="left"><text class="pot">*</text>经营品类</text>
			<view class="perRight fx-row fx-row-space-between fx-row-center">
				<input type="text" :value="itemShopClassify.name" placeholder="请选择经营品类" placeholder-class="hintMessage" disabled='true'></input>
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" mode="widthFix" class="go"></image>
			</view>
		</view>
		<!--店铺地址 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>店铺地址</text>
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
		
		<!-- 详细地址 -->
		<view class="company oneList fx-row fx-row-center">
			<text class="left"><text class="pot">*</text>店铺详细地址</text>
			<input v-model="address" type="text"  placeholder="请输入详细地址" placeholder-class="beforeinput" class="input"/>
		</view>

		<!-- 保存按钮 -->
		<!-- <view class="btn" v-if="shopRegInfo.regMer==1" @click="next(false)">下一步</view> -->
		<view class="btn"  @click="next(true)">保存</view>
		
		
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
				shopName:'',
				shopClassifyId:-1,
				shopClassify:'',
				logo:'',
				province:'',
				city:'',
				area:'',
				address:'',
				value1: ["广东省","广州市","天河区"],
				shopId:'',
				shopType:1,
				timer:null, // 轮询timer
				data:{}
			};
		},
		methods: {
			retIndex(){
				uni.reLaunch({url: '/pages/businessCard/businessCard?showFirstVipModal=0'});
			},
			// 地址
			regionChange(e){
				this.value1=e.detail.value
			},
			// log上传
			uplogTap(){
				let that=this;
				upImg((res)=>{
					console.info(res)
					that.logo=res
				});
			},
				next(save){
					console.log(save,'save')
					this.data={
						shopName:this.shopName,
						shopClassifyId:this.itemShopClassify.id,
						logo:this.logo,
						province:this.value1[0],
						city:this.value1[1],
						area:this.value1[2],
						address:this.address,
						userId:uni.getStorageSync('userId'),

					}
					
					var jg=this.CheckTap()
					if(!jg)	return false;
					
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
		

				},
				
				savePass(res){
					uni.hideLoading();
					this.$store.dispatch('updateCurrentUserInfo').then(()=>{
						this.shopId = res.shopId;
						uni.setStorageSync('shopId',this.shopId);
						this.isSave = true;
						this.isLoading = false;
					});
				
				},
				
				CheckTap(){
					
					if(!this.shopName){
						this.showTips('请输入店铺名称');
						return false
					}else if(this.shopName.length>19){
						this.showTips('店铺名称不能超过20个字符');
						return false
					}else if(!this.shopClassifyId || this.shopClassifyId==-1){
						console.info(this.shopClassifyId)
						this.showTips('请选择经营品类');
						return false
					}else if(!this.logo){
						this.showTips('请上传店铺logo');
						return false
					}else if(!this.address){
						this.showTips('请填写店铺详细地址');
						return false
					}else{
						return true;
					}
				},

				selectCate(){//选择行业类别
					uni.navigateTo({
						url:'../../businessCard_ShopIndustryCategory/businessCard_ShopIndustryCategory'
					})
				},
				// 上传视频
				UpVideo(){
					uni.navigateTo({
						url:'../../businessCard_UpVideo/businessCard_UpVideo?type=1'
					})
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
					this.shopType = options.type;
					// 初始化全局变量
					this.setItemShopClassify("")
					this.setVideoInfo("")
				  },
				  // 监听页面显示
				  onShow: function () {
					//console.log(this.itemShopClassify.id);
					this.shopClassifyId=this.itemShopClassify.id
					console.info(this.VideoInfo)
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
