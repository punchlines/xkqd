<template>
	<view class="page">
		<!-- <title-bar :title="referFromHome?'销刻渠道':'购买商品'" :showHome="!referFromHome" class="titleBar"></title-bar> -->
		<view class="header" :style="{'min-height':headerMinHeight+'px'}">		
			<view class="title-bar-container">
			  <view class="title-bar-container-safe-area"></view>
			  <view class="title-bar-container-fixed">
			    <view class="status-bar" :style="statusBarStyle"></view>
			    <view class="title-bar">
			      <view class="action-list">
							<wx-view custom-class="icon back" v-if="canBack">
									<view class="icon back" @click="navigateBack">
										<image v-if="!black" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/backw.jpg" mode="aspectFit" style="height: 28upx; width: 28upx; margin-left: 4upx"></image>
										<image v-else src="http://card-1254165941.cosgz.myqcloud.com/images/icon_back.png" mode="aspectFit" style="height: 28upx; width: 28upx; margin-left: 4upx"></image>
									</view>
							</wx-view>
							<wx-view  custom-class="icon home" v-if="!referFromHome">
								<view class="icon home" @click="navigateHome" style="width: 95upx">
									<image v-if="!black" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/homew.jpg"></image>
								    <image v-else src="http://card-1254165941.cosgz.myqcloud.com/images/icon_home.png"></image>
								</view>
							</wx-view>			
			      </view>
			      <view class="title" :style="{'color':black?'black':'white'}">{{ referFromHome?'销刻渠道':'购买商品' }}</view>
			    </view>
			  </view>
			</view>
			
			<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/viptopbg.jpg" :style="{'height':bgHeight}" class="topbg">
				
			</image>
			
			<view class="swiper-container" :style="{'top':bannerTop+'px'}">
				<swiper class="swiper" 
				  @change="swiperChange"  
				  autoplay 
				  :interval="3000" :circular="true" 
				  :duration="500"  previous-margin="20rpx"
				   next-margin="20rpx">
					<swiper-item v-for="(item,index) in lists" :key="index" :display-multiple-items="index">
						<Image class="swiper-item" :src="item.img"></Image>
					</swiper-item>								
				</swiper>			
			</view>
			
		</view>
		<view class="dotBox">
			<view class="dot" :style="{'width':(100/lists.length)+'%','left':currentSwiper*(100/lists.length)+'%'}">
				
			</view>
			
		</view>

			<vip-detail :recommendLevel="recommendLevel" v-if="initial" :vipLevel="currentVipLevel"
								:ref="'vipPane'"
			@change="goodsChange" @openVipShareModal="openVipShareModal"></vip-detail>
		
	
		<view class="footer-action">
			<button v-if="isNormalUser && currentUser.id" class="btn-primary" @click="buyVip" :disabled="!currentSelectGoods">立即购买</button>
			<button v-else-if="isNormalUser || !currentUser.id" class="btn-primary"  open-type="getPhoneNumber" @getphonenumber="buyVip" :disabled="!currentSelectGoods">购买任意商品一键开店</button>
			<button v-else class="btn-primary" @click="openVipShareModal">我要推广</button>
		</view>

		<vip-share-modal ref="vipShareModal" @channelClick="channelClick"></vip-share-modal>

		<goods-sku-select-modal  @select="onSelect" v-if="skuModalVisible" :goods-sku='goodSku' @close="skuModalVisible = false" @confirm="confirm" isGift></goods-sku-select-modal>

		<canvas canvas-id="posterCanvas" style="position: absolute; transform: translateX(-2000px); width: 420px; height: 667px" :style="posterCanvasStyle"></canvas>

		<canvas canvas-id="shareCanvas" style="position: absolute; transform: translateX(-2000px); width: 420upx; height: 335upx"></canvas>

		<vip-share-poster-modal ref="vipSharePosterModal" :path="posterFilePath"></vip-share-poster-modal>
		
		<get-user-info-modal v-if="authShow && !currentUser.id" @hideModal="authShow=false" @getUserInfo="setUserInfo"></get-user-info-modal>
		
		
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="showLoadings">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->
				
				<image class="rotate" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png'"
				 mode="widthFix"></image>
				<view class="succ">请稍等，正在保存</view>
				<!-- <view class="txt">{{isLoading?'您的信息已提交，正在审核中...':'点击按钮返回首页'}}</view> -->
				<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<!-- <view v-if="!isLoading" class="shop but" @click="retIndex">回到首页</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/price';
	import VipShareModal from "./VipShareModal";
	import goodsSkuSelectModal from '@/components/shop/modal/goodsSkuSelectModal';
	import { processSkuData } from '@/js/util';
	import VipDetail from "./VipDetail";
	import VipSharePosterModal from "./VipSharePosterModal";
	import {mapState} from 'vuex';
	import GetUserInfoModal from '@/components/getUserInfoModal.vue'
	const VIP_INTRO = 'http://card-1254165941.cosgz.myqcloud.com/vip/vipSharePoster.jpg';

	export default {

		components: {VipSharePosterModal, VipDetail, VipShareModal, price, goodsSkuSelectModal,GetUserInfoModal},

		data() {
			return {
				lists:[
					{img:'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/banner01.png'},
					{img:'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/banner02.png'},
					{img:'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/icon/banner03.png'},
				],
				currentSwiper:0,
				canBack: false,
				initial:false,
				vipLevel: 1,
				currentSelectGoods: null,
				recommendId: '',
				skuId: 0,
				goodSku: null,
				skuModalVisible: false,
				shareVipLevel: '',
				posterFilePath: '',
				posterCanvasStyle: '',
				shareFilePath: '',
				currentShowVipLevel: 1,
				inviteQty: 0,
				vip2inviteQty:0,
				vip3inviteQty:0,
				vip2InviteTargetQty: 0,
				vip3InviteTargetQty: 0,
				authPhone:'',
				recommendLevel:'',
				isCreateCircle:false,//购买完成后是否重定向到名片圈开圈
				referFromHome:0,
				defaultAvatar:'',
				defaultName:'',
				authShow:false,
				orderNum:'',
				black:false,
				showLoadings:false
			};
		},

		computed: {
			systemInfo () {
				return this.$store.state.systemInfo;
			},
			statusBarHeight () {
				return this.systemInfo.statusBarHeight;
			},
			rate () {
				return this.systemInfo.screenWidth / 750;
			},
			statusBarStyle () {
				return `height: ${this.statusBarHeight}px`;
			},
			safeAreaStyle () {
			    return `height: ${this.statusBarHeight + 88 * this.rate}px`;
			},
			
				
			headerMinHeight(){
				return this.statusBarHeight + uni.upx2px(88+17+310);
			},
			
			
			
			bannerTop(){
					return this.statusBarHeight + uni.upx2px(88+17);
			},
		
			bgHeight(){
				return this.statusBarHeight + uni.upx2px(333)+'px';
			},

		
			isShowFooter () {
				if (this.isNormalUser || !this.currentUser.id) {
					return true;
				}
				return this.isOpen;
			},
			currentVipLevel(){
				const userType = Number(this.currentUser.userType);
				return [2, 3, 4].includes(userType)
								? userType - 1
								: 0;
			},
			
			isOpen () {
				const userType = Number(this.currentUser.userType);
				const vipLevel = [2, 3, 4].includes(userType)
								? userType - 1
								: 0;
				return vipLevel >= this.currentShowVipLevel;
			},
			isLock () {
				return !this.isOpen && this.isVipUser;
			},
		},

		onLoad (option) {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			this.canBack = pages.length > 1;
			uni.showLoading({
				title: '加载中'
			});

			this.isCreateCircle = option.isCreateCircle==1?1:0;
			this.referFromHome = option.referFromHome || 0;
			this.doLoginHandle((hasReg)=>{
				if(!hasReg) this.authShow = true; //没注册显示授权弹窗
				
				
				this.init(option);
				this.hideLoading();
			});
		},

		mounted () {
			this.showLoading();
			this.vipLevel = 1;
			
		},
		
		onPageScroll(e) {
			if(e.scrollTop>this.headerMinHeight-this.statusBarHeight-uni.upx2px(88+17)){
				console.log("black")
				if(!this.black) this.black = true;
				uni.setNavigationBarColor({
					frontColor:"#000000",
					backgroundColor: 'transparent'
				});
				
			}else if(this.black){
				this.black = false;
				uni.setNavigationBarColor({
					frontColor:"#ffffff",
					backgroundColor: 'transparent'
				});
			}
		},

		methods: {
			swiperChange(e){
				this.currentSwiper = e.detail.current;
			},
			
			navigateBack () {
			  uni.navigateBack();
			},
			navigateHome () {
			  uni.switchTab({url: '/pages/businessCard/businessCard'});
			},
			
			onSelect(data){
				//选中
				const {sIndex,pIndex} = data;
				let parent = this.goodSku.list[pIndex];
				let sku = parent.sku[sIndex];
				parent.sku.forEach(item => item.select = false);
				sku.select = true;
				
			},
			
			setUserInfo(e){
				console.log(e)
					if(e.detail.errMsg == 'getUserInfo:fail auth deny'){
					}else{
							this.defaultAvatar = e.detail.userInfo.avatarUrl;
							this.defaultName = e.detail.userInfo.nickName;
					}
				
				this.authShow =false;
			},
			init(option){
				this.referFromHome = option.referFromHome || 0;
				
				if (option.scene) {
					const scene = decodeURIComponent(option.scene);
					this.recommendId = scene.match(/recommendId=(\d+)/) ? scene.match(/recommendId=(\d+)/)[1] || '' : '';
				} else {
					this.recommendId = option.recommendId || '';
					this.shareVipLevel = option.vipLevel || '';
				}
				
					this.recommendLevel = 3;
					this.initial = true;

				if (this.isNormalUser || !this.currentUser.id) {
					// #ifdef MP-WEIXIN
					wx.hideShareMenu({
						
					})
					// #endif
					
				}

				this.drawShareImage();
			},
			
			goodsChange ({ goods, vipLevel }) {
				this.currentShowVipLevel  = vipLevel;
				this.currentSelectGoods = goods;
				
			},

			openVipShareModal () {
				this.$refs.vipShareModal.show();
			},

			channelClick (channel) {
				if (channel === 'poster') {
					if (this.posterFilePath) {
						this.$refs.vipSharePosterModal.show();
						return;
					}
					
					
					uni.showLoading();
					this.$api.getVipInviteWXCodeUrlLimitless(this.vipLevel).then(result => {
						return Promise.all([
							this.getImageInfo(VIP_INTRO.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')),
							this.getImageInfo(result.WXCodeUrl.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')),
							this.getImageInfo(this.currentUser.headImage.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/').replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')),
						]);
					}).then(infoList => {
						const [vipImageInfo, wxCodeImageInfo, avatarInfo] = infoList;
						console.log(infoList)
						this.drawPoster(vipImageInfo, wxCodeImageInfo, avatarInfo);
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					})
				}
			},

			getImageInfo (src) {
				//console.log(src)
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: src,
						success: (res) => {
							resolve(res);
						},
						fail: (error) => {
							reject(error)
						}
					})
				});
			},

			drawPoster (vipImageInfo, wxCodeImageInfo, avatarInfo) {
				const context = uni.createCanvasContext('posterCanvas')
				context.scale(1, 1)

				context.drawImage(vipImageInfo.path, 0, 0, 420, 667);
				context.drawImage(wxCodeImageInfo.path, 135, 385, 150, 150);

				const AVATAR_SIZE = 95;
				const x = 420 / 2 - AVATAR_SIZE / 2;
				const y = 95;

				context.save();
				context.beginPath();
				context.arc(AVATAR_SIZE / 2 + x, AVATAR_SIZE / 2 + y, AVATAR_SIZE / 2, 0, Math.PI * 2, false);
				context.clip();
				context.drawImage(avatarInfo.path, x, y, AVATAR_SIZE, AVATAR_SIZE);
				context.restore();

				context.setFontSize(18)
				context.setTextAlign('center')
				context.setFillStyle('#333')
				context.fillText(this.currentUser.name, 210, 215)
				context.fillText(this.currentUser.name, 210, 215)

				this.$nextTick(() => {
					context.draw(true, () => {
						uni.canvasToTempFilePath({
							x: 0,
							y: 0,
							width: 450,
							height: 667,
							canvasId: 'posterCanvas',
							success: res => {
								this.hideLoading();
								this.posterFilePath = res.tempFilePath;
								this.$refs.vipSharePosterModal.show();
								// this.previewPoster();
							},
							fail: (err) => {
								this.showError(err);
								this.hideLoading();
							}
						})
					});
				});
			},

			previewPoster () {
				uni.previewImage({
					current: this.posterFilePath,
					urls: [this.posterFilePath]
				})
			},

			buyVip (e) {
				uni.showLoading();
					if (!this.currentUser.id) {
						//静默注册  &  支付
						
						let token = uni.getStorageSync('token');
						
						if(token){
							let { iv, encryptedData, errMsg } = e.detail;
							//解密数据
							if (errMsg.indexOf('fail') !== -1){
									this.showError("请授权获取手机号");
									uni.hideLoading();
									return;
							}
							
							if(e.target){
								let errMsg2 = e.target.errMsg;
								if(errMsg2 && errMsg2.indexOf('deny')!==-1){
										this.showError("请授权获取手机号");
										uni.hideLoading();
										return;
								}
							}
							
							encryptedData  = encodeURIComponent(encryptedData).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
								return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
							});
							
							iv  = encodeURIComponent(iv).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
								return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
							});
							
							this.$api.WXDecrypt(encryptedData, iv, token).then(res=>{
								this.authPhone = JSON.parse(res).phoneNumber;
								//注册
								let form={
									// phone: this.authPhone,
									name: "游客"+this.authPhone.slice(-4),
									headImage: 'http://card-1254165941.cosgz.myqcloud.com/timg.jpeg',
									company: '未填写',
									job:'游客',
									token:token,
									refereeUserId:this.recommendId
								};
								form.headImage = this.defaultAvatar?this.defaultAvatar:form.headImage;
								form.name = this.defaultName?this.defaultName:form.name;
								
								
								this.$api.register(form).then(value=>{
									uni.hideLoading();
									//console.log(value);
									if(value.ERROR==10001){
										this.showTips('该手机号已经注册！').then(res=>{})
									}else if(value.ERROR==10002){
										this.showTips('该微信号已经绑定！').then(res=>{})
									}else if(value.ERROR==2000){
										this.showTips('上级用户不存在！').then(res=>{})
									}else{
										//设置userId 更新用户信息
										uni.setStorageSync('userId',value.userInfoId);
										this.$store.dispatch('updateCurrentUserInfo').then(res=>{
											//拉起选择框
											//TODO 如果是分享的 直接拉起商品选择框 如果是首页进来的 直接跳转到首页
											// if(this.referFromHome){
											// 	this.showTips('注册成功').then(()=>{
											// 		uni.switchTab({
											// 			url:"/pages/businessCard/businessCard"
											// 		})
											// 	})
											// }
											
											this.getSkuAndShow();	
										});
									
										
									}
								}).catch(error => {
									uni.hideLoading();
									this.showError(error)
								})
								
								uni.hideLoading();
							}).catch(error=>{
									uni.hideLoading();
									this.showError(error)
							});
							
							
							
						}
						

					}else{
						this.getSkuAndShow();
						
					}
			},
			
			getSkuAndShow(){
					this.$api.getGoodsSku(this.currentSelectGoods.id).then(result => {
							this.goodSku = {};

							this.$nextTick(() => {
								this.goodSku = processSkuData(result);

								this.$nextTick(() => {
									this.skuModalVisible = true;
									uni.hideLoading();
								});

							});
						
							// this.goodSku = processSkuData(result);
							// this.skuModalVisible = true;
						
						}).catch(err => {
							this.showError(err);
							uni.hideLoading();
						});
			},
			

			confirm (callbackData) {
				
				// if (!this.currentUser.id) {
				// 	this.reLaunch('/pages/register/register', {
				// 		redirect: encodeURIComponent(`/item_businessCard/businessCard_VIP/businessCard_VIP_New?recommendId=${this.recommendId}&vipLevel=${this.vipLevel}`),
				// 		cardUserId: this.recommendId
				// 	});
				// 	return;
				// }

				this.skuId = callbackData.data.id;
				this.buyVipRequest();
				
			},

			buyVipRequest () {
				this.showLoading();
				let data = {
					currentShowVipLevel:this.currentShowVipLevel,
					skuId:this.skuId,
					recommendId:this.recommendId || 1,
					isCreateCircle:this.isCreateCircle
				}
				
				if(this.recommendId  && this.recommendId != this.currentUser.id){
					//TODO 新支付流程
					
					if(!this.orderNum){
						this.$api.insertVipOrderNew(data.currentShowVipLevel, data.skuId, data.recommendId || 1).then(result => {
							if(result){
								this.orderNum = result;
								this.requestPay(result);
							} else {
								this.hideLoading();
								this.showTips('下单失败');
							}
							
						})
					}else this.requestPay(this.orderNum);
					
					
					
				}else{
					this.hideLoading();
					this.navigateTo('./businessCard_VIP_Addr',data);
				} 

			},
			
			
			requestPay(orderNum){
				this.$api.unifiedorder(orderNum).then(result => {
					this.showLoading();
					return this.requestPayment(result.prePayInfo)
				}).then(result => {
					this.hideLoading();
					this.showLoadings = true;
					setTimeout(()=>{
						this.showLoadings = false;
						this.$api.paymentStatusCallback(orderNum,4);
						this.showTips('支付成功').then(res => {
						//跳转到填写收货地址页面
						this.$store.dispatch('updateCurrentUserInfo').then(()=>{
								this.reLaunch('./VIPOrderAddressAdd',{orderNum})
								})
						});
						
					},15000)
					
					
				}).catch(error => {
					console.log(error)
					//this.showError(error);
					this.hideLoading();
				});
				
			},

			drawShareImage () {
				const user = Object.assign({}, this.currentUser);
				if (!user.id) return;
				user.headImage = user.headImage
								.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
								.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')

				this.getImageInfo(user.headImage).then(imageInfo => {
					const context = uni.createCanvasContext('shareCanvas');
					context.scale(0.5, 0.5);
					let avaPath = imageInfo.path;
					
					this.getImageInfo('https://xk.gzskxx.com/myqcloud/images/vipShareBg.jpg').then(
						BGINFO=>{
								context.drawImage(BGINFO.path, 0, 0, 420, 335);
								const AVATAR_SIZE = 120;
								const x = 420 / 2 - AVATAR_SIZE / 2;
								const y = 35;

								context.save();
								context.beginPath();
								context.arc(AVATAR_SIZE / 2 + x, AVATAR_SIZE / 2 + y, AVATAR_SIZE / 2, 0, Math.PI * 2, false);
								context.clip();
								context.drawImage(avaPath, x, y, AVATAR_SIZE, AVATAR_SIZE);
								context.restore();

								context.draw(true, () => {
									uni.canvasToTempFilePath({
										x: 0,
										y: 0,
										width: 420,
										height: 335,
										canvasId: 'shareCanvas',
										success: res => {
											this.shareFilePath = res.tempFilePath;
										},
										fail: (err) => {
										}
									})
								});
						
						}
					);

				});
			},

		},

		onShareAppMessage (res) {
			return {
				title: `${this.currentUser.name}邀请您零成本开店啦！限时免费，快来申请吧`,
				imageUrl: this.shareFilePath,
				path: `/item_businessCard/businessCard_VIP/businessCard_VIP_New?recommendId=${this.currentUser.id}&vipLevel=${this.vipLevel}`,
			}
		},

	}
</script>

<style lang="less" scoped>
	@keyframes rotateicon {
		0% {
			transform: rotate(0deg)
		}
	
		100% {
			transform: rotate(360deg)
		}
	}
	
	.rotate {
		animation: rotateicon 3s infinite linear;
	}
	.page {
		/*padding-bottom: 98upx;*/
		overflow: hidden;
		box-sizing: border-box;
		padding-bottom: 0upx;
		background-color: white;

	}
	
	// 弹出层
	.saveModel {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	
		.saveCon {
			width: 84%;
			margin: 0 auto;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 40upx;
			border-radius: 20upx;
	
			image {
				width: 120upx;
				height: 120upx;
				margin-top: 10upx
			}
	
			.succ {
				font-size: 36upx;
				color: #333333;
				margin: 32upx 0 20upx 0;
			}
	
			.txt {
				font-size: 28upx;
				color: #666666;
				margin: 20upx 0 50upx 0;
				text-align: center;
			}
	
			.but {
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 28upx;
				border-radius: 40upx;
			}
	
			.bindC {
				border: 1px solid #6B7AF8;
				color: #6B7AF8;
				margin-bottom: 24upx;
			}
	
			.shop {
				border: 1px solid #CCCCCC;
				color: #CCCCCC
			}
		}
	}
	.header{
		position: relative;
		.topbg{
			width: 100%;
		}
		
		.swiper-container{
			width: 100%;
			height: 291upx;
			position: absolute;
			background: transparent;
				.swiper{
					width: 100%;
					height: 291upx;
					// padding-top: 50upx;
					.swiper-item{
						width: 699upx;
						height: 291upx;
						border-radius: 21upx;
					}
				}	
				
		}
	}
	
	.dotBox{
		width:122rpx;
		height:6rpx;
		background:rgba(201,201,201,0.3);
		// opacity:0.3;
		border-radius:2rpx;
		margin: 0 auto;
		position: relative;
		.dot{
			background: black;
			height: 100%;
			position: absolute;
			left:0;
			transition: .3s;
		}
	}
	
	.vip-cover {
		width: 100%;
		height: 374upx;
		background-color: #6B7AF8;
	}

	.footer-action {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98upx;
		border-top: 1upx solid #E1E1E1;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #FFFFFF;

		.btn-primary {
			width:620upx;
			height:80upx;
			line-height:80upx;
			background:#6B78FA;
			color: #fff;
		}
	}

	
	.title-bar-container-fixed {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  background: transparent;
	  z-index: 99999;
	  // border-bottom: 1upx solid #E1E1E1;
	}
	
	.title-bar {
	  height: 88upx;
	  display: flex;
	  position: relative;
	
	  .action-list {
	    display: flex;
	    align-items: center;
	    .icon {
	      width: 78upx;
	      height: 88upx;
	      background: transparent;
	      position: relative;
	      &:active {
	        background: transparent;
	      }
	      image {
	        width: 36upx;
	        height: 36upx;
	        position: absolute;
	        left: 50%;
	        top: 50%;
	        transform: translate(-50%, -50%);
	      }
	      &+.icon {
	        &:after{
	          content: "";
	          position: absolute;
	          width:1upx;
	          height:30upx;
	          background:rgba(204,204,204,1);
	          left: 0;
	          top: 50%;
	          transform: translateY(-50%);
	        }
	      }
	    }
	    .back {}
	    .home {}
	  }
	  .title {
	    font-size:36upx;
	    font-weight: bold;
	    color:#fff;
	    line-height:50upx;
	    width: 250upx;
	    height: 50upx;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    text-align: center;
	    transform: translate(-50%, -50%);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	  }
	}
</style>
