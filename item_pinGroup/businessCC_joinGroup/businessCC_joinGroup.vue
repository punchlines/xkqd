<template>
	<!-- 参与拼团页面 -->
	<view class="page">
		<!-- 顶部banner -->
		<view class="banner fx-row fx-row-top">
			<view class="tips">公告</view>
			<view class="content fx-row fx-row-top">
				<view class="scrollText1  fx-row fx-row-top">
					<view v-for="(it,index) in scrollList" :Key="index" class="text">
						{{it.n}} 完成{{it.t}}次拼团赚取佣金{{it.m}}元
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 中间 滚动区域 -->
		<view class="scrollArea fx-column fx-column-top">
			<pin-chat-item :avatar="Detail.ownerCover">
				拼团价：{{goodPrice.toFixed(2)}}元, {{conditionString}},多拼多优惠，快来参与吧！！！
			</pin-chat-item>
			
			
			<pin-chat-item :avatar="Detail.ownerCover">
				代理团长，每单收益{{Detail.proxyGain}}元，好友开团每单获益{{Detail.spreadGainOne}}元
			</pin-chat-item>
			
			<pin-chat-item class="details" :avatar="Detail.ownerCover" @oclick="gotoDetail">
				<wxParse v-if="detailsHasImage" :content="details" ></wxParse>
				<view class="btnArea" v-else>
					<button v-if="Detail.goodsCreateUser==currentUser.id" class="btn" @click="updateGoodsDetails">没有图片请上传</button>
					<text v-else>暂无图片</text>
				</view>
			</pin-chat-item>
			
		</view>
		
		<!-- 底部操作栏 -->
		
		<view class="bottomArea">
			<!-- 抬头 -->
			<view class="topbar fx-row fx-row-center">
				<view>
					正在拼团
				</view>
				
				<view class="tipBox" v-if="Detail">
					再邀请{{Detail.conditions[targetLevel].targetNum-Detail.images.length}}人即可享受返现{{Detail.conditions[targetLevel].rebateAmount}}元
				</view>
			</view>
			<!-- 头像栏 邀请栏 -->
			<view class="bottomContainer">
				<view class="avatarBox fx-row fx-row-start">
					<view class="left">
						<!-- <button  class="avatar" style="padding: 0;" v-if="overtime>0" type="pain"  open-type="share" >
							<image class="avatar" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/addpin.png"></image>
						</button>
						
						<image v-else class="avatar" @click="showEndInfo" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/addpin.png"></image> -->
						<image class="avatar" @click="goSharePost" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/addpin.png"></image>
					</view>
					<view class="fx-row fx-row-start right">
						<view  v-for="(item,index) in Detail.images" class="avatar">
							<image mode="aspectFill" :src="item"></image>
						</view>
						
					</view>

				</view>
				
				<!-- 下方信息栏 -->
				<view class="InfoBox fx-row fx-row-start">
					<view class="fx-row fx-row-bottom goodsBox" :style="{backgroundImage:`url(${cover})`}">
						
						
						<view class="goodsprice ">￥{{goodPrice.toFixed(2)}}</view>
					</view>
					
					<view class="fx-column fx-row-space-between groupinfobBox">
						<view class="gi" v-for="(it,inx) in conditionArr" :key="inx">{{it}}</view>
					</view>
					
					<view class="fx-row fx-row-bottom fx-row-right inviteBox">
						<!-- v-if="Detail.ownerId!=currentUser.id" -->
						<view class="btn" @click="getSku" v-if="currentUser.id && Detail.ownerId!=currentUser.id">立即付款</view>
						<button  class="btn" v-else-if="!currentUser.id"  style="padding: 0;" type="pain"  open-type="getPhoneNumber" @getphonenumber="regAndPay" >
							<view style="margin: 0;"  class="btn">立即付款</view>
						</button>
						
						
						
							<view class="btn blue" @click="goSharePost">
								邀请好友
							</view>
						
						
						
				
				<!-- 			<button  class="btn blue"  v-if="overtime > 0" style="padding: 0;" type="pain" open-type="share">
								<view style="margin: 0;"  class="btn blue">邀请好友</view>
							</button>
							
							<view class="btn blue" @click="showEndInfo" v-else>
								邀请好友
							</view> -->
			
						
				
						<!-- 	<view class="btn blue"  type="pain" >
								邀请好友
							</view> -->
				
						
					
					</view>
					
				</view>	
			</view>
		
			
		</view>
	
		
		<!-- 倒计时 -->

		<view class="clock">
			
			{{overtime>0?otime.length>0?`倒计时:${otime}`:"售完即止":'拼团已结束'}}
		</view>

		<view class="clock blue">
			{{pinNum}}人完成拼团
		</view>

		<!-- 侧边浮动按钮 -->
		<view class="fbtn bg1" @click="retHome"></view>
		<view class="fbtn bg2" @click="goToRule"></view>
		<button v-if="!currentUser.id"  open-type="getPhoneNumber" @getphonenumber="regAndPay" class="fbtn bg3"></button>
		<view v-else class="fbtn bg3" @click="ClonePin"></view>


		<!-- 侧边跑马灯 -->
		<view class="racelamp">
			<race-lamp></race-lamp>
		</view>
		<share-friend :otime="otime" v-if="showShareModal" @share="goSharePost" @close="showShareModal=false"></share-friend>
		<pin-sku-modal v-if="skuModalVisible" :goods-sku='goodSku' @close="skuModalVisible = false" @select="onSelect" @confirm="confirm" :isGift="false"></pin-sku-modal>
		<get-user-info-modal v-if="authShow && !currentUser.id" @hideModal="authShow=false" @getUserInfo="setUserInfo"></get-user-info-modal>
	</view>
</template>

<script>
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import {XING} from '@/js/constant.js';
	import { pinChatItem } from "../_components/pinChatItem/pinChatItem.vue";
	import { raceLamp } from '../_components/raceLamp/raceLamp'
	import {pinSkuModal} from '../_components/pinSkuModal/pinSkuModal';
	import { processSkuData } from '@/js/util';
	import GetUserInfoModal from '@/components/getUserInfoModal.vue';
	import { shareFriend } from '../_components/shareFriend';
	export default {
		data() {
			return {
				overtime: 0, //毫秒
				timer:null,
				scrollList:[
					
				],
				pinNum:0,
				pid:0,
				recommendId:'',
				Detail:null,
				cover:'',
				details:'',
				goodPrice:0,
				goodSku:null,
				authShow:false,
				skuModalVisible:false,
				franking:0,//邮费
				defaultAvatar: '',
				defaultName: '',
				showShareModal:false,
				shareObject:{
					goodsName:'',
					price:'',
					sku:'',
					cdtext:'',
					cover:'',
					id:0,
					oprice:0
				},
			};
		},
		
		components: {pinChatItem,raceLamp,pinSkuModal,GetUserInfoModal,shareFriend,wxParse},
		
		computed: {
			targetLevel(){
				if(this.Detail){
					const pnum = this.Detail.images.length;
					if(this.Detail.level==0){
						if(pnum<=this.Detail.conditions[0].targetNum) return 0
						else return 1;
					}else{
						let tl = this.Detail.level+1; //2
						tl = tl<this.Detail.conditions.length?tl:this.Detail.conditions.length-1;
						return tl;
					}
					//level = 0; 
					
				}else return 0
			},
			otime() {
				let m = (parseInt(this.overtime / 1000 / 60));
				if(m>24*60*10){
					return ""
				}
				
				return  m + "分" + (parseInt(this.overtime / 1000) % 60) + "秒"
			},
			conditionString(){
				/*
				* 
				* 拼团价：XX元，购买满3人每人返现0.01元，购买满5人每人返现2元，购买满7人每人返现5元，多拼多优惠，快来参加吧！！！
				* 
				* */
				if(this.Detail)
				return this.Detail.conditions.map(it=>`购买满${it.targetNum}人每人返现${it.rebateAmount}元`).join(',');
				else return '';
			},
			conditionArr(){
				if(this.Detail)
				return this.Detail.conditions.map(it=>`拼到${it.targetNum}人，每人返${it.rebateAmount}元`);
				else return [];
			},
			
			detailsHasImage(){
				/**
				 * 详情是否有图片 如果没有 则显示上传按钮 如果有则显示富文本
				 */
				if(this.details)
				return this.details.indexOf("<img src=")!=-1
				else return false
			}
		},
		 
		onShow(){
			if(uni.getStorageSync('setNeedUpdatePinDetail')){
					this.$api.getAssembleDetail(this.pid).then(res=>{
						this.Detail = res;
						
								this.$api.getGoodsDetail(this.Detail.goodsId).then(res=>{
									this.details = res.goodsDetail.details;
									uni.setStorageSync('setNeedUpdatePinDetail',false)
								});
						
					});
				
			}
		},

		onLoad(option) {
			this.doLoginHandle(hr=>{
				if(!hr) this.authShow =true;
				this.$store.dispatch('updateCurrentUserInfo').then(()=>{	this.init(option);	});
			});
			
			
			
		},
		
		onUnload() {
			this.overtime = 0;
			clearInterval(this.timer);
		},
		
		methods: {
			/**
			 * 生成海报
			 */
			goSharePost(){
				this.showShareModal = false;
				if(!this.shareObject.sku){
					//拉sku
					this.$api.getGoodsSku(this.Detail.goodsId).then(result => {
						this.goodSku = processSkuData(result);
						let sku = this.goodSku.list[0].name+"-"+this.goodSku.list[0].sku[0].name;
						this.shareObject.sku = sku;
						this.navigateTo(`../../item_pinGroup/businessCC_Share/businessCC_Share`,this.shareObject);
						
					}).catch(err => {
						console.info(err)
					});
					
				}else this.navigateTo(`../../item_pinGroup/businessCC_Share/businessCC_Share`,this.shareObject);
				
			},
			
			
			/**
			 * 更新商品详情
			 */
			
			updateGoodsDetails(){
				//updateMode = 1 的时候 只更新详情  =0或者不传则为原来的
				this.navigateTo('/item_businessCard/businessCard_GoodsDescribe/businessCard_GoodsDescribe',{
					updateMode:1,
					details:this.details,
					goodsId:this.Detail.goodsId
				});
			},
			
			retHome(){
				uni.switchTab({
					url:'../../pages/businessCard/businessCard'
				})
			},
			
			gotoDetail(){
				if(this.detailsHasImage)
					this.navigateTo('/module/shop/goodsDetail/goodsDetail',{
						id:this.Detail.goodsId,
						recommendId:this.recommendId
					});
				
			},
			
			showEndInfo(){
				this.showError('拼团已结束');
			},
			
			ClonePin(){
				this.showLoading();
				
				if(this.Detail.ownerId==this.currentUser.id){
					this.hideLoading()
					return this.showError('不能代理自己的团');
				}
				// if(this.overtime<=0) return this.showError('拼团已结束');
				
				if(this.Detail.bou==0){
					if(this.overtime<=0) {
						this.hideLoading();
						return this.showError('拼团已结束');
					}
					this.$store.dispatch('setShopRegInfo').then(()=>{
							this.hideLoading()
							this.getSku();
					});
					
				}else{
						this.$api.createAgencyGroup(this.pid).then(res=>{
							this.hideLoading();
							uni.switchTab({
								url:'/pages/pinGroup/pinGroup'
							})
							
							// uni.redirectTo({
							// 		url:"../businessCC_joinGroup/businessCC_joinGroup?id="+res
							// })
						}).catch(err=>this.showError(err));
					
				}
				
			},
			
			goToRule(){
				uni.navigateTo({
					url:'../businessCC_rule/businessCC_rule'
				})
			},
			
			regAndPay(e){
				if(this.overtime<=0){
					this.showEndInfo();
					return;
				}
				
				
				console.log(e)
				
				let token = uni.getStorageSync('token');
				if (!this.currentUser.id) {
					let {
						iv,
						encryptedData,
						errMsg
					} = e.detail;
					//解密数据
					if (errMsg.indexOf('fail') !== -1) {
						this.showError("请授权获取手机号");
						uni.hideLoading();
						return;
					}

					if (e.target) {
						let errMsg2 = e.target.errMsg;
						if (errMsg2 && errMsg2.indexOf('deny') !== -1) {
							this.showError("请授权获取手机号");
							uni.hideLoading();
							return;
						}
					}

					encryptedData = encodeURIComponent(encryptedData).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
						return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
					});

					iv = encodeURIComponent(iv).replace(/%20/gi, '+').replace(/(!)|(')|(\()|(\))|(\~)/gi, item => {
						return '%' + item.charCodeAt(0).toString(16).toLocaleUpperCase();
					});


					this.$api.WXDecrypt(encryptedData, iv, token).then(res => {
						this.authPhone = JSON.parse(res).phoneNumber;
						//注册
						let form = {
							// phone: this.authPhone,
							name: "游客" + this.authPhone.slice(-4),
							headImage: 'http://card-1254165941.cosgz.myqcloud.com/timg.jpeg',
							company: '未填写',
							job: '游客',
							token: token,
							refereeUserId: this.recommendId
						};
						form.headImage = this.defaultAvatar ? this.defaultAvatar : form.headImage;
						form.name = this.defaultName ? this.defaultName : form.name;


						this.$api.register(form).then(value => {
							uni.hideLoading();
							//console.log(value);
							if (value.ERROR == 10001) {
								this.showTips('该手机号已经注册！').then(res => {})
							} else if (value.ERROR == 10002) {
								this.showTips('该微信号已经绑定！').then(res => {})
							} else if (value.ERROR == 2000) {
								this.showTips('上级用户不存在！').then(res => {})
							} else {
								//设置userId 更新用户信息
								uni.setStorageSync('userId', value.userInfoId);
								this.$store.dispatch('updateCurrentUserInfo').then(res => {
									//this.verify();
									
									this.$store.dispatch('setShopRegInfo').then(()=>{
										if(this.overtime<=0) return this.showError('拼团已结束');
										this.getSku();
									});
									
								});


							}
						}).catch(error => {
							uni.hideLoading();
							this.showError(error)
						})

						uni.hideLoading();
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					});



				}
			},
			
			init(option){
				this.recommendId = option.recommendId;
				this.pid=option.id;
				this.shareObject.id = option.id;
				
				//处理扫码进入的用户
				if (option.q) {
					console.log("扫方形码进入")
					let q = decodeURIComponent(option.q).replace('https://xk.gzskxx.com/joinGroup/', '');
					this.pid = q.split('_')[0];
					this.recommendId = q.split('_')[1];
					this.shareObject.id = this.pid;
					console.log(q)
				} 
				
				this.scrollList.push({
					n:XING[this.rad(0,309)]+'**',
					t:this.rad(0,70),
					m:this.rad(0,999)
				});
				this.scrollList.push({
					n:XING[this.rad(0,309)]+'**',
					t:this.rad(0,70),
					m:this.rad(0,999)
				});
				this.showLoading();
				
			
				
				//抓取团信息
				this.$api.getAssembleNum().then(res=>this.pinNum=res);

				this.$api.getAssembleDetail(this.pid).then(res=>{
					this.Detail = res;
					this.overtime = res.overTime - new Date().getTime();
					this.shareObject.cdtext = this.conditionArr.join(',');
					this.shareObject.proxyGain = this.Detail.proxyGain;
					if(option.showShareModal==1){
						this.showShareModal = true;
					}
					// this.cover = res.cover;
					// this.goodPrice = res.perPrice;
					this.hideLoading();
					this.timer = setInterval(function() {
						if (this.overtime - 1000 > 0)
							this.overtime -= 1000;
						else {
							//停止定时器 TODO 
							this.overtime = 0;
							clearInterval(this.timer);
						}
					}.bind(this), 1000);
				
					this.$api.getGoodsDetail(this.Detail.goodsId).then(res=>{
						this.cover = res.goodsDetail.coverImage;
						this.details = res.goodsDetail.details;
						this.goodPrice = res.goodsDetail.preferentialPrice;
						this.franking = res.goodsDetail.franking;
						this.shareObject.goodsName = res.goodsDetail.title;
						this.shareObject.price = res.goodsDetail.preferentialPrice;
						this.shareObject.cover = res.goodsDetail.coverImage;
						this.shareObject.oprice = res.goodsDetail.originalPrice;
						
					});
				
					
					
				});
				
			},
			setUserInfo(e){
				if (e.detail.errMsg == 'getUserInfo:fail auth deny') {} else {
					this.defaultAvatar = e.detail.userInfo.avatarUrl;
					this.defaultName = e.detail.userInfo.nickName;
				}

				this.authShow = false;
			},
			
			rad(min,max) {
				 return Math.floor(Math.random()*(max-min)+min); 
			},
			
			onSelect(data){
				//选中
				const {sIndex,pIndex} = data;
				let parent = this.goodSku.list[pIndex];
				let sku = parent.sku[sIndex];
				parent.sku.forEach(item => item.select = false);
				sku.select = true;
				
			},
			
			confirm(callbackData) {
				console.info(callbackData)
				
			
				
				
					this.$store.dispatch('setShopRegInfo').then(()=>{
						const form = {
							number:callbackData.number,
							skuName:callbackData.skuName,
							skuId:callbackData.skuId,
							goodName:callbackData.title,
							goodPrice:callbackData.data.preferentialPrice,
							franking:this.franking,
							fullPrice:this.Detail.conditions[this.Detail.conditions.length-1].rebateAmount,
							cover:this.cover,
							pinId:this.pid
						};
						
						
						uni.navigateTo({
							url:'/item_pinGroup/businessCC_payOrder/businessCC_payOrder?data='+encodeURIComponent(JSON.stringify(form))
						});
					});
			
	
				// this.skuData = callbackData.skuName + ' 数量：' + callbackData.number;
				// this.callbackData = callbackData
				// console.log(callbackData)
				// // 立即购买
				// if (this.buyType === BUY_TYPE_BUY) {
				// 	this.buy()
				// } else if (this.buyType == BUY_TYPE_ADD) {
				// 	// 加入购物车
				// 	this.addCar();
				// } else if (this.buyType == BUY_TYPE_VIP) {
				// 	this.buyVipRequest();
				// }
			},
			

			
			
			onShareAppMessage(res) {
				// if(this.overtime<=0) return this.showError('拼团已结束');
				let rid = this.currentUser.id || 67;
				if(this.showShareModal) this.showShareModal = false;
				return {
					title: "快来加入我的团",
					path: '/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id=' + this.pid + '&recommendId=' +
						rid,
				}
	
			},
			
			// 规格
			getSku(flag) {
				if (this.goodSku && Object.keys(this.goodSku).length > 0) {
				  this.skuModalVisible = true;
				  return;
				}
				this.$api.getGoodsSku(this.Detail.goodsId).then(result => {
					this.goodSku = processSkuData(result);
					this.skuModalVisible = true;
				}).catch(err => {
					console.info(err)
				});
			},
		},
	}
</script>

<style lang="less" scoped>
	@keyframes scrolla {
		0% {
			transform: translateX(600upx)
		}

		100% {
			transform: translateX(-100%);
		}
	}

	.page {
		background-color: #f5f5f5;
		height: 100vh;
		width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;

		
		.details{
			
			.btnArea{
				width: 300upx;
				height: 140upx;
				padding-top:60upx; 
				line-height: 200upx;
				text-align: center;
				.btn{
					
					width: 180upx;
					height: 65upx;
					display: block;
					margin: 0 auto;
					font-size: 19upx;
					line-height: 65upx;
					background: #6b78fa;
					color: white;
					text-align: center;
					padding: 0;
				}
			}
			
		}
		
		.details /deep/ .img{
			
			max-width: 460upx;
			display: block;
		}
		

		.clock {
			position: fixed;
			right: 0;
			top: 100upx;
			height: 40upx;
			padding: 0 10upx;
			background: rgba(255, 197, 86, 1);
			border-radius: 20upx 0upx 0upx 20upx;
			font-size: 20upx;
			font-family: PingFangSC-Medium;
			font-weight: bold;
			color: rgba(245, 245, 245, 1);
			line-height: 40upx;

			&.blue {
				top: 150upx;
				background: rgba(107, 120, 250, 1);
			}
		}
		
		
		.racelamp{
			position: fixed;
			bottom: 350upx;
			left:30upx;
			overflow: hidden;
			height: 210upx;
			width:170upx;
		}


		.fbtn {
			width: 80upx;
			height: 110upx;
			position: fixed;
			right: 31upx;
			top: 340upx;


			&.bg1 {
				background: url('https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/retpin.png') no-repeat;
				background-size: 80upx 102upx;
			}

			&.bg2 {
				background: url('https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/whatpin.png') no-repeat;
				background-size: 80upx 102upx;
				top: 470upx;
			}

			&.bg3 {
				background: url('https://card-1254165941.cos.ap-guangzhou.myqcloud.com/pingroup/startpin.png') no-repeat;
				background-size: 80upx 80upx;
				top: 610upx;
			}

		}


		&::before {
			display: table;
			content: '';
			width: 0;
			height: 0;
		}

		.banner {
			width: 689upx;
			margin: 15upx 29upx;
			background: rgba(170, 170, 170, 1);
			border-radius: 20px;
			height: 40upx;
			font-size: 24upx;
			color: white;
			line-height: 40upx;

			.tips {
				background: rgba(255, 197, 86, 1);
				border-radius: 20px;
				height: 40upx;
				width: 89upx;
				text-align: center;
				border-bottom-right-radius: 0;
				border-top-right-radius: 0;

			}

			.content {
				overflow: hidden;
				width: 600upx;
				white-space: nowrap;
				font-size: 23upx;
				text-align: center;
				padding: 0 15upx;

				.scrollText1 {
					width: auto;
					transform: translateX(600upx);
					animation: scrolla infinite 10s linear;
				}

				.text {
					margin-left: 15upx;
				}
			}

		}


		.scrollArea{
			width: 100%;
			// background: skyblue;
			padding: 29upx;
			padding-bottom:300upx;
			letter-spacing: 3upx;
		}


			
		.bottomArea{
			width: 100%;
			height: 240upx;
			position: fixed;
			bottom: 0;
			background: white;
			
			.topbar{
				height: 40upx;
				padding: 0 25upx;
				background:rgba(170,170,170,0.5);
				font-size:24upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(241,9,9,1);
				line-height:40upx;
				
				.tipBox{
					width:291upx;
					height:25upx;
					background:rgba(255,0,0,1);
					border-radius:13upx;
					font-size:20upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(255,255,255,1);
					line-height:26upx;
					margin-left: 10upx;
					text-align: center;
				}
			}
		
				
			.bottomContainer{
				width:calc(100% - 60upx);
				padding: 10upx 30upx;
				
				.avatarBox{
					.avatar,.left{
						width:70upx;
						height:70upx;
						border-radius:35upx;
					}
					
					.right{
						width: calc(100% - 100upx);
						height:70upx;
						overflow-x:scroll;
						overflow-y: hidden;
						.avatar{
							width:70upx;
							height:70upx;
							margin-left:15upx;
								
							Image{
								width:70upx;
								height:70upx;
								border-radius: 50%;
							}
						}
					}
					
					
				}
			
				.InfoBox{
					margin-top: 10upx;
					
					.goodsBox{
						height: 90upx;
						//max-width: 90upx;
						position: relative;
						width: auto!important;
						background-size:100% 90upx;
						background-repeat: no-repeat;
						// white-space: nowrap;
						// text-overflow: ellipsis;
						// overflow: hidden;
						// 
						.goodsprice{
							 //max-width: 90upx;
							// white-space: nowrap;
							// text-overflow: ellipsis;
							// overflow: hidden;
							
							height:30upx;
							background:rgba(255,197,86,1);
							// border-radius:0upx 0upx 6upx 6upx;
							font-size:20upx;
							font-family:PingFangSC-Regular;
							font-weight:bold;
							color:rgba(255,255,255,1);
							line-height:30upx;
						}
					}
					
				}
			
			
				.groupinfobBox{
					margin-left: 25upx;
					width: auto!important;
					.gi{
						width:230upx;
						height:25upx;
						background:rgba(107,120,250,1);
						border-radius:2upx;
						font-size:20upx;
						font-family:PingFangSC-Regular;
						font-weight:bold;
						color:rgba(255,255,255,1);
						line-height:25upx;
						text-align: center;
					}
				}
			
				.inviteBox{
					margin-left: 25upx;
					.btn{
						width:165upx;
						height:55upx;
						background:rgba(255,197,86,1);
						border-radius:28upx;
						font-size:30upx;
						font-family:PingFangSC-Regular;
						font-weight:bold;
						color:rgba(255,255,255,1);
						line-height:55upx;
						text-align: center;
						&.blue{
							background:rgba(107,120,250,1);
							margin-left: 25upx;
						}
					}
				}
			}
		}

	}
</style>
