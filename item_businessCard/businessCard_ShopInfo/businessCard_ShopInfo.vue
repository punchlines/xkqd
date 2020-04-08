<template>
	<view class="container">

		<title-bar title="店铺资料"></title-bar>

		<!-- 提示 -->
		<view class="point">填写越多企业信息，消费者信任度越高</view>
		<!-- 店铺logo -->
		<view class="logoCon fx-row fx-row-space-between fx-row-center" @click="uplogTap">
			<text class="left">店铺logo</text>
			<image v-if="logo" :src="logo" mode="widthFix"></image>
			<image v-if="!logo" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>
		<!-- 店铺名称 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left">店铺名称</text>
			<input v-model="shopName" type="text"  placeholder="请输入店铺名称" placeholder-class="beforeinput" class="input" />
		</view>
		<!-- 店铺名称 -->
		<view class="shopName oneList fx-row fx-row-center">
			<text class="left">联系方式</text>
			<input v-model="phone" type="number"  placeholder="请输入联系方式" placeholder-class="beforeinput" class="input" />
		</view>
		<!-- 品类 -->
		<view class="type oneList fx-row fx-row-center fx-row-left" @click="selectCate">
			<text class="left">行业类别</text>
			<view class="perRight fx-row fx-row-space-between fx-row-center">
				<input type="text" :value="itemShopClassify.name" placeholder="请选择行业品类" placeholder-class="hintMessage" disabled='true'></input>
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" mode="widthFix" class="go"></image>
			</view>
		</view>
		<!-- 公司名称 -->
		<view class="company oneList fx-row fx-row-center">
			<text class="left">公司名称</text>
			<input v-model="companyName" type="text"  placeholder="请输入公司名称" placeholder-class="beforeinput" class="input"/>
		</view>
		<!-- 所在地 -->
		<view class="local oneList fx-row fx-row-center fx-row-left">
			<text class="left">所在地</text>
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
		<view class="address oneList fx-row fx-row-center">
			<text class="left">详细地址</text>
			<input type="text" v-model="address" placeholder="请输入详细地址" placeholder-class="beforeinput" class="input" />
		</view>
		<!-- 宣传视频 -->
		<view class="video oneList fx-row fx-row-center fx-row-left" @click="UpVideo">
			<text class="left">宣传视频</text>
			<view class="perRight fx-row fx-row-space-between fx-row-center">
				<input type="text" placeholder="请选择视频" placeholder-class="hintMessage" :value="VideoInfo.id?'已选':''" disabled="disabled"></input>
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" mode="widthFix" class="go"></image>
			</view>
		</view>
		<!-- 营业执照 
		* -->
		<view class="permitCon" >
			<view>营业执照</view>
			<image @click="permitConTap" v-if="businessLicence" :src="businessLicence" mode="widthFix"></image>
			<image @click="permitConTap" v-if="!businessLicence" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/adda.png'" mode="widthFix"></image>
		</view>

		<!-- 保存按钮 -->
		<view class="btn" @click="saveClick">保存</view>
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="isSave">
			<view class="saveCon fx-column fx-row-center">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/save.png'" mode="widthFix"></image>
				<view class="succ">保存成功</view>
				<view class="txt">绑定银行卡后，每笔完成的订单金额会自动进您的账户</view>
				<view class="bindC but" @click="bindCa">绑定银行卡</view>
				<view class="shop but" @click="myShop">我的商城</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {upImg} from '@/js/mzl.js'
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				isSave:false,
				onlineSite:this.global.onlineSite,
				shopName:'',shopClassifyId:-1,shopClassify:'',phone:'',logo:'',
				companyName:'',province:'',city:'',area:'',address:'',businessLicence:'',
				value1: ['广东省', '广州市', '海珠区'],
				shopId:'',
			};
		},
		methods: {
			//上传营业执照
			permitConTap(){
				let that=this;
				upImg((res)=>{
					console.info(res)
					that.businessLicence=res
				});
			},
			// 地址
			regionChange(e){
				console.info(e.detail.value)
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
				//保存店铺信息 this.VideoInfo
				saveClick(){
					if(this.userType==2){
						var shopGrade=1
					}else if(this.userType==3){
						var shopGrade=2
					}else if(this.userType==4){
						var shopGrade=3
					}
					let data={
						shopName:this.shopName,shopClassifyId:this.itemShopClassify.id,phone:this.phone,logo:this.logo,
						companyName:this.companyName,province:this.value1[0],city:this.value1[1],area:this.value1[2],address:this.address,businessLicence:this.businessLicence,
						shopGrade:shopGrade,userId:uni.getStorageSync('userId')
					}

					console.info(data)
					if(!(/^\d{11}$/.test(this.phone))){
						this.showTips('手机号码有误，请重填').then(res=>{});
						return false;
					}
					var jg=this.CheckTap()
					if(!jg){
						return false;
					}
					console.info(data)
					uni.showLoading();
					this.$api.insertShopData(data).then(res=>{
						console.info(res)
						if(res.ERROR==80001){
							this.showTips('创建店铺已创建');
						}else{
							this.$store.dispatch('updateCurrentUserInfo');
							if (this.VideoInfo.id) {
								this.updateVideo(res.shopId);
							}
						}
						uni.hideLoading();
						var pages = getCurrentPages();
						if (pages.length === 1) {
							uni.switchTab({url: '/pages/businessCard/businessCard'});
						}
					}).catch(err=>{
						uni.hideLoading();
						this.showError(err)
						console.info(err)
					})

				},
				CheckTap(){
					if(!this.shopName){
						this.showTips('请输入店铺名称');
						return false
					}else if(this.shopClassifyId==-1){
						console.info(this.shopClassifyId)
						this.showTips('请选择行业类型');
						return false
					}else if(!this.phone){
						this.showTips('请输入手机号码');
						return false
					}else if(!this.logo){
						this.showTips('请上传公司log');
						return false
					}else if(!this.companyName){
						this.showTips('请输入公司名称');
						return false
					}else{
						return true;
					}
				},
				//更新服务器缓存
				updateVideo(shopId){
					this.$api.updateVideo(this.VideoInfo.id, this.VideoInfo.video,this.VideoInfo.videoImage,2,this.VideoInfo.videoTime,shopId).then(res=>{
						console.info(res)
						this.isSave=true
						this.shopId=shopId
						uni.setStorageSync('shopId',shopId);
					}).catch(err=>{
						console.info(err)
					})
				},
				bindCa(){//绑定银行卡
					uni.navigateTo({
						url:'../../item_my/myself_bankCardManage/myself_bankCardManage?from=0'
					})
				},
				myShop(){

					uni.navigateTo({
						url:'../businessCard_MyShop/businessCard_MyShop?shopId='+this.shopId
					})
				},
				selectCate(){//选择行业类别
					uni.navigateTo({
						url:'../businessCard_ShopIndustryCategory/businessCard_ShopIndustryCategory'
					})
				},
				// 上传视频
				UpVideo(){
					uni.navigateTo({
						url:'../businessCard_UpVideo/businessCard_UpVideo?type=2'
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

					// 初始化全局变量
					this.setItemShopClassify("")
					this.setVideoInfo("")
				  },
				  // 监听页面显示
				  onShow: function () {
					console.log(this.itemShopClassify.id);
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

<style lang="less">

@import "../../css/jss_base.less";
.container{
	font-size: 28upx;color: #333333;font-family: PingFangSC;background:#F5F5F5;
	min-height: 100vh;
	padding-bottom: 40upx;
	.point{
		width:100%;height:64upx;line-height:64upx; background:#FFFBCE;color:#FF7A2A;font-size:24upx;text-align:center;margin-bottom:24upx;
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
	.left{width: 28%;}
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
