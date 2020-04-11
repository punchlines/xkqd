<template>
	<view class="container">
		<!-- 个人信息 -->
		<view class="perInfoCon">
			<view class="bgCon">
				<view class="br_l">{{viewNum || 0}}人看过我</view>
				<view class="bg_r">
					<view class="praise">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like2.png'" v-if="praiseState==1"></image>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like.png'" v-else></image>
						<text>{{userDetails.praiseNum}}</text>
					</view>
					<view class="shouCang">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang2.png'" v-if="collectState==1"></image>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang.png'" v-else></image>
						<text>{{userDetails.collectNum}}</text>
					</view>
					<!--  #ifdef  APP-PLUS -->
					<button class="shareBtn" @click="AppShare">
						<view class="hShare">
							<image class="HLimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/34_share.png'" alt=""></image>
							分享
						</view>
					</button>
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<button class="shareBtn" open-type="share">
						<view class="hShare">
							<image class="HLimage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/34_share.png'" alt=""></image>
							分享
						</view>
					</button>
					<!--  #endif -->

				</view>
			</view>
			<!-- 信息详情 -->
			<view class="infoDe">
				<card-bg-item1 :userDetails="userDetails" :cardBgId="userDetails.cardBackgroundId"></card-bg-item1>
				<!-- 个人资料按钮 -->
				<view :class="guideStep === 1?'data-container guideShow':'data-container'" style="position: absolute">
					<wx-view>
						<view @click="editCard">
							<view class="data">编辑资料</view>
						</view>
					</wx-view>
				</view>

			</view>
		</view>


		<!-- 导航（我的名片） -->
		<view class="subNav fx-row fx-row-center">
			<!--  #ifdef  APP-PLUS -->
			<button @click="AppShare" class="fx-column fx-row-center nav-item" style="border: none; padding: 0; background: none; line-height: inherit;">
				<image src="http://card-1254165941.cosgz.myqcloud.com/images/home_share_icon.png" mode="widthFix"></image>
				<text class="nav_ti">分享</text>
			</button>
			<!--  #endif -->

			<!--  #ifdef  MP-WEIXIN -->

			<view class="nav-item">
				<wx-view>
					<button class="fx-column fx-row-center" open-type="share" style="border: none; padding: 0; background: none; line-height: inherit;">
						<image src="http://card-1254165941.cosgz.myqcloud.com/images/home_share_icon.png" mode="widthFix"></image>
						<text class="nav_ti">分享</text>
					</button>
				</wx-view>
			</view>

			<!--  #endif -->
			<view class="nav-item">
				<wx-view>
					<view class="fx-column fx-row-center" @click="toWheel">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/caifulunp.png'" mode="widthFix"></image>
						<text class="nav_ti">财富轮盘</text>
					</view>
				</wx-view>
			</view>

			<view class="nav-item">
				<wx-view>

					<view class="fx-column fx-row-center" @click="tosearchCard">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email%20copy%203.png'" mode="widthFix"></image>
						<text class="nav_ti">搜名片</text>
					</view>
				</wx-view>
			</view>

			<view class="nav-item">
				<wx-view>
					<view class="fx-column fx-row-center" @click="toThematic">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/zhuanti.png'" mode="widthFix"></image>
						<text class="nav_ti">VIP设置</text>
					</view>
				</wx-view>
			</view>
		</view>

		<!-- 判断1 没开店 -->
		<wx-view>
			<view class="open-vip-container" :class="{ 'guideShow': guideStep === 3 }" @click="businessCard_VIP">
				<image class="invite-banner" :src="userType<=1?'http://card-1254165941.cosgz.myqcloud.com/3.gif':'http://card-1254165941.cosgz.myqcloud.com/2.gif'"></image>
			</view>
		</wx-view>

		<!-- 个人视频 -->
		<view class="VideoList">
			<view class="VLtitle fx-row fx-row-center fx-row-space-left">
				<view @click.stop="changeVideoTitle(index)" :class="{'Tname':true,'titleActive':VideoList.VTitleActive==index}"
				 v-for="(item,index) in VideoList.VideoTitle" :key='index' v-if="item.id !== 1 || !!shopId">{{item.title}}</view>
			</view>
			<view class="Vlvideo">
				<view class="VLVitem" v-if="VideoList.VTitleActive==0">

					<view class="video-container" v-if="videoResult.userVideoMap">
						<video-container :mobileNetworkAutoplay="userDetails.mobileNetworkAutoplay" :cover="videoResult.userVideoMap.videoImage"
						 :video="videoResult.userVideoMap.videoUrl"></video-container>
						<!-- <video :src="videoResult.userVideoMap.videoUrl" autoplay controls></video> -->
					</view>

					<!--<view class="video-container" v-if="videoResult.userVideoMap"  @click="navigateTo('/pages/VideoPlay', { src: videoResult.userVideoMap.videoUrl })">-->
					<!--<image class="video-cover" :src="videoResult.userVideoMap.videoImage" mode="aspectFit"></image>-->
					<!--<image class="play-icon" src="http://card-1254165941.cosgz.myqcloud.com/images/video_play.png"></image>-->
					<!--</view>-->

					<!--<video v-if="videoResult.userVideoMap" :src="videoResult.userVideoMap.videoUrl" @error="videoErrorCallback" controls></video>-->
					<wx-view v-else>
						<view @click="UploadVideo" class="no-video-container">
							<image src="http://card-1254165941.cosgz.myqcloud.com/Video_Player.jpg"></image>
							<button class="btn-primary">上传视频</button>
							<!--<defaultpage :messageToPage="messageToPage5"></defaultpage>-->
						</view>
					</wx-view>

				</view>
				<view class="VLVitem" v-if="VideoList.VTitleActive==1">

					<view class="video-container" v-if="videoResult.shopVideoMap">
						<video-container :mobileNetworkAutoplay="userDetails.mobileNetworkAutoplay" :cover="videoResult.shopVideoMap.videoImage"
						 :video="videoResult.shopVideoMap.videoUrl"></video-container>
						<!-- <video :src="videoResult.shopVideoMap.videoUrl" autoplay controls></video> -->
					</view>

					<view v-else @click.stop="editCardShop">
						<defaultpage :messageToPage="messageToPage5"></defaultpage>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品日志 -->
		<view class="dayCon">
			<!-- 标题切换 -->
			<view class="dayCon_title fx-row">
				<!-- <view v-for="(item,index) in auditTitleBox.auditTitle" :key="index" @tap.stop="changeTitle($event, item.id)" :class="{'ATname':true,'ATactive':audiTitleActive == item.id}"
				 class="title">
					{{item.title}}
				</view> -->

				<wx-view :custom-class="audiTitleActive == 0?'ATactive title ATname':'title ATname'">
					<text @click="changeTitle($event, 0)">商品</text>
				</wx-view>

				<wx-view :custom-class="audiTitleActive == 1?'ATactive title ATname':'title ATname'">
					<text @click="changeTitle($event, 1)">日志</text>
				</wx-view>
			</view>
			<!-- 商品 -->
			<view class="shopContainer fx-column fx-col-center" v-if="audiTitleActive==0">


				<!-- 判断1——有没有开店（有没有店铺id） -->
				<view v-if="userType>1">
					<!-- 店铺logo -->
					<view class="bannerCon" @click.stop="toShop" v-if="userType>1">
						<default-image :src="cardShopData.logo" custom-class="shoplogo"></default-image>
						<view class="shopName">
							<view class="name">{{cardShopData.shopName}}<text class="mod_tag" :class="'PActiveVip' + cardShopData.shopGrade"
								 v-if="shopGrade">{{ shopGrade }}</text></view>
							<view class="goodsNum">{{cardShopData.goodsNum||0}}个商品</view>
						</view>
						<view class="shopButton">进店</view>
					</view>
					<!-- 商品列表 -->
					<view class="goodsListCon fx-wrap fx-row fx-row-space-between">

						<!-- 判断2——有没有商品  (是否有商品数量)-->
						<view class="goodsCon" v-for="(item,index) of goodsMixins.list" :key="index" @click.stop="goodsDetail(item)">
							<view class="imgCon">
								<image :src="item.coverImage"></image>
								<view v-if="item.score" class="score">评分<text>{{item.score?item.score:0}}</text></view>
								<!-- <view v-if="!item.score" class="score">暂无评分<text></text></view> -->
							</view>
							<view class="textDetail">
								<view class="goodsName single-line">{{item.title}}</view>
								<view class="goodsDe fx-row fx-row-space-between fx-col-center">
									<view>
										<text class="priceIcon">￥</text>
										<text class="price">{{item.preferentialPrice}}</text>
									</view>
									<text class="saleNum">已售{{item.salesNum}}</text>
								</view>
							</view>
						</view>

						<!-- 判断2-没有商品-->
						<view v-if="goodsMixins.list.length === 0 && userType>1" style="align-items: center;width: 100%;">
							<view>
								<!-- 您还没有上传商品哦，赶紧去上传吧~ -->
								<defaultpage :messageToPage="messageToPage4"></defaultpage>
							</view>

						</view>

					</view>

					<uni-load-more :loading-type="loadingType2" v-if="showLoadMore2"></uni-load-more>


				</view>
				
				<view style="margin-top: 50upx;" v-else>
					<view class="shopping">
						<button class="btn-primary" style="width: 579upx;font-size: 36upx;" @click="businessCard_VIP">购买任意商品马上开店</button>
					</view>
					
				</view>

			</view>

			<view class="logCon" v-if="audiTitleActive==1" style="background: none;">
				<!-- 发布日志 -->
				<view class="pubCon" @click="publishJournal" :class="{ 'guideShow': guideStep === 4 }">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/play%20copy.png'" mode=""></image>
					<text>发布日志，记录生活美好</text>
				</view>

				<view v-if="journalMixins.list.length === 0" style="padding: 200upx">
					<defaultpage :messageToPage="{ image: 'http://card-1254165941.cosgz.myqcloud.com/images/wurizhi.png', title: '暂无日志，快去发布吧' }"></defaultpage>
				</view>

				<journal-item v-for="(journal, index) in journalMixins.list" :cardUserId="cardUserId" :journal="journal" :key="journal.id"
				 @deleteSuccess="onDeleteSuccess(index, $event)" is-self></journal-item>
				<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
				<view class="warning-info">* 名片请勿包含违法违规内容，否则将被封禁</view>

			</view>
		</view>

		<!-- 发布按钮 -->
		<!-- <view class="ConsultaButton" v-if="audiTitleActive == 1">
			<view class="CBbtn" @click="publishJournal">
				<image class="image" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/publish1.png'"></image>
			</view>
		</view> -->


		<card-guide @stepChange="stepChange" :user="userDetails" v-if="userDetails.id" :has-upload-video="!!videoResult.userVideoMap"
		 :has-publish-journal="journalMixins.list.length > 0"></card-guide>


		<!-- #ifndef APP-PLUS -->
		<!-- 原生发布按钮 -->
		<cover-view class="pop-up" @click="messageTo">
			<cover-image class="image noticeImg" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'"></cover-image>
			<cover-view class="number" v-if="messageCount + unreadCount > 0">{{messageCount + unreadCount}}</cover-view>
		</cover-view>

		<!-- 原生消息通知按钮  -->
		<cover-view class="pop-up camera" @click="publishJournal" v-if="audiTitleActive == 1">
			<cover-image class="image cameraImg" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/publish1.png'"></cover-image>
		</cover-view>
		<!-- #endif -->


		<!-- VIP开通成功后的模态框 -->
		<view v-if="showVIPModal">

			<view class="VIPmask">

			</view>
			<view class="VIPmodal">
				<view class="text_box">

					<text>恭喜您,商品购买成功</text>
				</view>

				<view class="btn_box">
					<button @click="editCard">装修名片</button>
					<button @click="toShop">去开店</button>
				</view>
				<view class="skipHref" @click="showVIPModal=false">X</view>
			</view>

		</view>


	</view>

</template>

<script>
	const DEFAULT_CARD_ID = 1;

	import JournalItem from "../../components/JournalItem";
	import journalMixins from "./journalMixins";
	import goodsMixins from "./goodsMixins";
	import uniLoadMore from '@/template/uni-load-more.vue';
	import cardBgItem1 from '../../components/cardBg/cardBgItem1.vue';

	const SHOP_GRADE = {
		1: ' 黄金商家',
		2: ' 铂金商家',
		3: ' 钻石商家',
	}

	import store from "@/js/store.js";
	import defaultpage from '@/components/defaultPage.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		isLog
	} from '../../js/mzl.js'

	var webim = require('@/js/lib/im/webim_wx.js');
	var IMConfig = require('@/js/lib/im/config').IM;

	var config = {
		sdkAppID: IMConfig.sdkAppID,
		appIDAt3rd: IMConfig.appIDAt3rd, //用户所属应用id，必填
		accountType: IMConfig.accountType, //用户所属应用帐号类型，必填
		identifier: '', //当前用户ID,必须是否字符串类型，选填
		identifierNick: '', //当前用户昵称，选填
		userSig: '', //当前用户身份凭证，必须是字符串类型，选填
	};

	import CardGuide from './CardGuide';
	// #ifdef APP-PLUS
	import appView from '@/js/app-plus/appViewPaint'
	// #endif
	export default {


		data() {
			return {
				appCameraBtn: null,
				appNoticeBtn: null,
				onlineSite: this.global.onlineSite,
				userDetails: {}, //名片信息详情
				messageCount: 0, //未读消息数量
				collectState: 0,
				praiseState: 0,
				viewNum: 0,
				shopId: '',
				cardShopData: {}, //店铺信息
				userId: '', //缓存中的用户ID
				//缺省页
				messageToPage4: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '您还没有上传商品哦，赶紧去上传吧~'
				},
				messageToPage5: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '您还没有上传视频哦，赶紧去上传吧~'
				},
				//商品日志切换
				auditTitleBox: {
					auditTitle: [{
							id: 0,
							title: '商品'
						},
						{
							id: 1,
							title: '日志'
						},
					],
				},
				audiTitleActive: 0,
				// 视频
				VideoList: {
					VideoTitle: [{
						id: 0,
						title: '个人视频'
					}, {
						id: 1,
						title: '企业视频'
					}],
					VTitleActive: 0,
				},
				//用户视频
				videoResult: {},
				currentNum: 0,
				showPhone: '',
				vipUserId: 0,
				cardUserId: '',
				unreadCount: 0,
				isLogin: false,//是否初始化完成
				longitude: '',
				latitude: '',
				currentWebview: null,
				guideStep: 0,
				showVIPModal: false
			}
		},

		components: {
			JournalItem,
			defaultpage,
			uniLoadMore,
			cardBgItem1,
			CardGuide
		},

		mixins: [journalMixins, goodsMixins],

		computed: {
			...mapState(['UPinfo', 'userType', 'cardbgId', 'cardBgImage']),

			shopGrade() {
				return SHOP_GRADE[Number(this.cardShopData.shopGrade)] || '';
			},
			isHidePhone() {
				return !!Number(this.userDetails.hidePhoneNum);
			}
		},


		onLoad(option) {
			
			

			uni.showLoading({
				title: '加载中',
				mask: true
			});
			
			// #ifdef APP-PLUS
			let view = new appView('test', {
					left: 620,
					bottom: 180,
					height: 100,
					width: 100
				});
			this.appNoticeBtn = view;
			// #endif
			
			
			

			this.doLoginHandle(hasRegister => {
				if (hasRegister) {
					this.init(option);
				} else this.otherPeople();
			});


			// #ifdef  APP-PLUS

			uni.getProvider({
				service: 'push',
				success: (res) => {

					// 个推的名称为 igexin
					if (~res.provider.indexOf('igexin')) {
						uni.subscribePush({
							provider: 'igexin',
							success: (res) => {
								const clientId = res.clientid;
								if (clientId) {
									this.$api.saveCID(clientId).then(result => console.log('save cid success, cid: ' + clientId))
								}
								console.log('success:' + JSON.stringify(res));
							}
						});
					}
				}
			});
			// #endif

		},
		onShow() {
			
			this.userId = uni.getStorageSync('userId');

			// #ifdef APP-PLUS
			if (this.appNoticeBtn) {
				this.appNoticeBtn.show();
				
			}

			if (this.appCameraBtn && this.audiTitleActive == 1) {
				this.appCameraBtn.show();
			}

			// #endif

			this.journalOnShow();
			this.goodsOnShow();


			if (uni.getStorageSync('_needUpateUserInfo')) {
				//refetch UserInfo
				this.showLoading();
				this.$api.getUserCardDetails(this.userId).then(result => {
					this.getUserCardShowVideo();
					this.updateCurrentUser(result.userMap);

					this.userDetails = result.userMap;
					this.userDetails.autograph = this.userDetails.autograph.replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "");
					uni.setStorageSync('_needUpateUserInfo', false)
					this.hideLoading();
				});
			}

			if(this.isLogin){
				
				this.unreadCount = 0;
				var sessMap = webim.MsgStore.sessMap();
				for (var i in sessMap) {
					var sess = sessMap[i];
					this.unreadCount += sess.unread();

				}

				this.getSystemMessageCount();
				
			}
			
		},

		onReachBottom() {
			if (this.audiTitleActive == 0) {
				if (this.goodsMixins.noMore || this.goodsMixins.loading) return;
				this.fetchGoods();
			}
			if (this.audiTitleActive == 1) {
				if (this.journalMixins.noMore || this.journalMixins.loading) return;
				this.fetchJournal();
			}
		},


		onHide() {
			// #ifdef APP-PLUS
			this.$nextTick(() => {
				if (this.appNoticeBtn) {
					this.appNoticeBtn.hide();
				};
				if (this.appCameraBtn) {
					this.appCameraBtn.hide();
				};

			});

			// #endif
		},

		onPageScroll(e) {
			if(e.scrollTop>=uni.upx2px(390)){
				uni.setNavigationBarColor({
					frontColor:"#000000",
					backgroundColor: '#ffffff'
				})
			}else{
					uni.setNavigationBarColor({
					frontColor:"#ffffff",
					backgroundColor: '#787df5'
				})
			}
		},

		methods: {
			drawAppCamera() {
				//绘制APP端 日志按钮
				// #ifdef APP-PLUS

				if (this.appCameraBtn) {
					this.appCameraBtn.show();

					return;
				}
				let view = new appView('test', {
					left: 620,
					bottom: 340,
					height: 100,
					width: 100
				});
				this.appCameraBtn = view;
				plus.io.getImageInfo({
					src: "/static/app-plus/publish1.png",
					success: (info) => {
						console.log(info.path);
						view.drawBitmap(info.path);
						view.show();
						console.log("draw3")
					},
					fail: (err) => {
						console.log(err)
					}
				})


				view.addEventListener('click', this.publishJournal);



				// #endif

			},


			drawAppNotice(messageCount) {
				//绘制APP端 原生notice按钮 

				// #ifdef APP-PLUS
				//messageCount = 9;

				const view = this.appNoticeBtn;
					if(this.isLogin){
					if (messageCount > 0) {
							view.drawRectUpx({
								radius: 17,
								color: "#FF0000"
							}, {
								top: 0,
								left: 66,
								width: 34,
								height: 34
							}, 'messageCircle');
							view.drawTextUpx(messageCount, {
								top: 0,
								left: 66,
								width: 34,
								height: 34
							}, {
								size: 21,
								color: '#FFFFFF'
							}, 'messageText');
					}
					return;
				
				}
				
				
				view.drawRectUpx({
					radius: 50
				}, {
					top: 0,
					left: 0,
					width: 100,
					height: 100
				});
				view.addEventListener('click', this.messageTo);
				//获取图片信息


				plus.io.getImageInfo({
					src: "/static/app-plus/notice_circle.jpg",
					success: info => {
						console.log(info.path);
						view.drawBitmap(info.path);
						if (messageCount > 0) {
							view.drawRectUpx({
								radius: 17,
								color: "#FF0000"
							}, {
								top: 0,
								left: 66,
								width: 34,
								height: 34
							}, 'messageCircle');
							view.drawTextUpx(messageCount, {
								top: 0,
								left: 66,
								width: 34,
								height: 34
							}, {
								size: 21,
								color: '#FFFFFF'
							}, 'messageText');
						}
						
						this.isLogin = true;
						//view.show();
					}
				});




				// #endif
			},
			// 地理位置
			getLocationS() {
				if (!this.currentUser.id) return;
				if (!uni.getStorageSync('longitude') || !uni.getStorageSync('latitude')) return;
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						uni.setStorageSync('longitude', res.longitude);
						uni.setStorageSync('latitude', res.latitude);
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						this.updateUserPosition()
					}
				});
			},
			updateUserPosition() {
				uni.showLoading();
				this.$api.updateUserPosition(this.longitude, this.latitude).then(result => {
					uni.hideLoading()
					console.log('保存地理位置到后台');
				}).catch(error => {
					this.showError(error)
					uni.hideLoading()
				})
			},
			// 初始化
			init(option) {
				uni.showLoading({
					mask: true
				});
				
		
				
				var userId = uni.getStorageSync('userId');
				// 地理位置授权
				if (!uni.getStorageSync('longitude')) {
					this.getLocationS();
				}

				setTimeout(() => {
					this.$api.viewCard(this.userId);
				}, 1500)


				//登陆im
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				this.currentWebview = page.$getAppWebview();
				if (!userId) {
					uni.navigateTo({
						url: '../businessCard2/businessCard2?cardUserId=54'
					});
					return;
				}
				// #endif

				this.userId = uni.getStorageSync('userId');
				this.cardUserId = this.userId;
				if (!this.userId) {
					return
				}


				this.$api.getUserCardDetails(this.userId).then(result => {

					this.updateCurrentUser(result.userMap);

					this.vipUserId = result.userMap.vipId;
					this.userDetails = result.userMap;
					//去掉换行符
					this.userDetails.autograph = this.userDetails.autograph.replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "");

					this.viewNum = result.viewNum;
					this.collectState = result.collectState;
					this.praiseState = result.praiseState;
					this.shopId = this.userDetails.shopId;
					uni.setStorageSync('shopId', this.shopId)
					//默认展示日志
					if(result.logStatus==1){
						this.changeTitle(null,1)
					}
					this.showPhone = this.isHidePhone ?
						this.hidePhone(this.userDetails.phone) :
						this.userDetails.phone;

					uni.setNavigationBarTitle({
						title: '我的名片'
					});
					this.$store.commit('updateCurrentUser', this.userDetails);
					this.setUserType(this.userDetails.userType)
					console.info(this.userDetails)
					//获取用户视频
					this.getUserCardShowVideo();

					//#是否填写显示vip开通成功模态框
					//TODO
					if (option.showFirstVipModal == 1) {
						this.showVIPModal = true;
					}
					

					uni.hideLoading();

					//vuex
					this.$store.dispatch('setShopRegInfo').then(res => {

						//登录IM
						var listeners = {
							"onMsgNotify": () => {
								this.unreadCount = 0;
								var sessMap = webim.MsgStore.sessMap();
								for (var i in sessMap) {
									var sess = sessMap[i];
									this.unreadCount += sess.unread();
								}
							},
						};
						config.identifier = this.userId;
						// config.identifierNick = this.currentUser.name;

						this.$api.getTLSSig().then(result => {
							config.userSig = result;
							//uni.hideLoading();
							console.log(config)
							webim.login(config, listeners, {}, () => {
								console.log('tim 登录成功')
								
								const options = {
									"ProfileItem": [{
											"Tag": "Tag_Profile_IM_Nick",
											"Value": this.currentUser.name
										},
										{
											"Tag": "Tag_Profile_IM_Image",
											"Value": this.currentUser.headImage
										}
									]
								}



								webim.setProfilePortrait(
									options,
									(resp) => {
										console.log('更新资料成功')
									},
									function(err) {}
								);


								webim.syncMsgs(msgList => {
									this.unreadCount = msgList.length;
									//获取系统未读消息
									this.getSystemMessageCount();
								});

								//是否填写VIP收货信息
								this.$api.unFillAddressOrder().then(res => {
									this.hideLoading();
									if (res.length == 0) {

									} else if (res[0].type == 1) {
										let orderNum = res[0].orderNum;
										uni.showModal({
											title: "提示",
											content: "您有VIP订单没有填写收货地址，请填写",
											showCancel: false,
											confirmText: '确定',
											success: () => {
												this.reLaunch('/item_businessCard/businessCard_VIP/VIPOrderAddressAdd', {
													orderNum
												});
											}
										})


									}

								})

							}, error => {
								uni.hideLoading()
								this.showError(error);
								console.error(error)
							});
						});

					}).catch(error => {
						uni.hideLoading()
					})



				}).catch(error => {
					//this.showError(error);
					//this.showError("网络似乎有点问题哦，请关闭打开重试");
					uni.setStorageSync('_needUpateUserInfo', true);
					setTimeout(() => {
						this.init(option)
					}, 3000)
					//uni.hideLoading()
				});
			},
			//跳转别人的名片
			otherPeople() {
				//this.reLaunch('/pages/businessCard2/businessCard2',{ hasToken:true});
				this.reLaunch('/item_businessCard/businessCard_VIP/businessCard_VIP_New', {
					recommendId: 67,
					referFromHome: 1
				});
			},
			// 获取用户视频
			getUserCardShowVideo() {
				this.$api.getUserCardShowVideo(this.userId, this.shopId).then(result => {
					console.info(result)
					this.videoResult = result;
				}).catch(error => {
					console.log(error)
				})
			},
			//获取未读消息数量
			getSystemMessageCount() {
				if (!this.currentUser.id) return;
				this.$api.getSystemMessageCount().then(res => {
					
					this.messageCount = res.messageCount || 0

					// #ifdef APP-PLUS
					this.drawAppNotice(this.messageCount + this.unreadCount);
					// #endif
				})
			},


			//开通VIP
			businessCard_VIP() {
				this.navigateTo('/item_businessCard/businessCard_VIP/businessCard_VIP_New');
			},

			listCardShop() {

			},
			// 上传个人视频
			UploadVideo() {
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_UpVideo/businessCard_UpVideo'
				});
			},
			changeVideoTitle(index) { // 切换视频标题
		
				this.VideoList.VTitleActive = index;
			},
			changeTitle(e, index) { //切换标题(日志，商品)
				
				this.audiTitleActive = index;
				// #ifdef APP-PLUS
				if (index == 1) {
					this.drawAppCamera();
				} else if (this.appCameraBtn) {
					this.appCameraBtn.hide();
				}
				// #endif

			},

			toWheel() { //财富轮盘
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_Wheel/businessCard_Wheel?userId=' + this.userId
				});
			},
			myCustomer() { //我的客户页面
				if (this.isNormalUser) {
					uni.showModal({
						title: '提示',
						content: '该功能对VIP开放，去开通VIP',
						success: (res) => {
							if (res.confirm) {
								this.businessCard_VIP();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return;
				}
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_MyCustomer/businessCard_MyCustomer?userId=' + this.userId
				});
			},
			toThematic() { //专题数据
				if (this.isNormalUser) {
					uni.showModal({
						title: '提示',
						content: '该功能对VIP开放，去开通VIP',
						success: (res) => {
							if (res.confirm) {
								this.businessCard_VIP();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return;
				}
				// 如果没有填写店铺资料
				let shopId = uni.getStorageSync('shopId');
				if (!shopId && this.isVipUser) {
					this.navigateTo('/item_businessCard/businessCard_ShopInfo/step2_1/step2_1')
					return;
				}
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_DataTopic/businessCard_DataTopic?userId=' + this.userId
				});
			},
			tosearchCard() { //搜索名片
				if (!isLog()) {
					return false
				}
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_SearchCard/businessCard_SearchCard?userId=' + this.userId
				});
			},
			goodsDetail(item) { //商品详情
				this.navigateTo('/module/shop/goodsDetail/goodsDetail', {
					goodsId: item.goodsId,
					shopId: this.shopId,
					recommendId: this.cardUserId,
					cardUserId: this.cardUserId,
				})
			},
			messageTo() { //查看消息
				uni.navigateTo({
					url: '../../module/message/home/home'
				});
			},
			editCard() { //编辑自己的资料
				if (this.guideStep === 1) return;
				this.showVIPModal = false;
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_EditCard/businessCard_EditCard?userId=' + this.userId
				})

			},
			toUpVideo() { //上传个人视频
				uni.navigateTo({
					url: '/item_businessCard/businessCard_UpVideo/businessCard_UpVideo?type=1'
				});
			},
			//编辑店铺信息
			editCardShop() {
				if (!this.isVipUser) return;
				uni.navigateTo({
					url: '/item_businessCard/businessCard_UpVideo/businessCard_UpVideo?type=2&shopId=' + this.shopId
				});
				// uni.navigateTo({
				// 	url: '../../item_businessCard/businessCard_EditCard/businessCard_EditCard?userId=' + this.userId,
				// });
			},
			toShop() {
				// #ifdef APP-PLUS
				if (!this.userId) {
					this.showTips('请先授权创建名片').then(res => {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					})
					return;
				}
				// #endif

				if (this.userType > 1) {
					if (this.userType >= 5) { //员工 到他老板的店铺
						this.navigateTo('../../module/shop/home/home', {
							shopId: this.shopId,
							cardUserId: this.cardUserId,
							recommendId: this.cardUserId,
						});
					} else {
						// 我的店铺
						let shopId = uni.getStorageSync('shopId');
						if (!shopId) {
							this.navigateTo('/item_businessCard/businessCard_ShopInfo/step2_1/step2_1')
						} else { //TODO
							this.showVIPModal = false;
							this.navigateTo('../../item_businessCard/businessCard_MyShop/businessCard_MyShop', {
								shopId: shopId,
								userId: this.userId,
								cardUserId: this.cardUserId,
								recommendId: this.cardUserId
							})

						}
					}

				} else {
					this.showTips('等级不够..')
				}

			},
			
			
			
			changeSwiperNum(event) { // 轮播图图片数量
				// console.log(event.detail.current);
				this.currentNum = event.detail.current;
			},
			videoErrorCallback() { //视频错误信息
				// console.log('视频错误信息:' + e.target.errMsg)
			},

			publishJournal() {
				if (this.guideStep === 4) return;
				uni.navigateTo({
					url: '/item_businessCard/businessCard_PublishLog/businessCard_PublishLog'
				});
			},

			stepChange(step) {
				this.guideStep = step;
				if (step === 4) {
					this.audiTitleActive = 1;
				} else if (step === 5) {
					this.audiTitleActive = 0;
				}
			},

			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo', 'setUserType', 'updateCurrentUser']),
			// #ifdef APP-PLUS
			AppShare() {
				console.log('分享');
				// 				uni.navigateTo({
				// 					url: './share'
				// 				});

				let recommendId = '';
				if (this.shopId === this.currentUser.shopId && !this.isVipUser) {
					recommendId = this.userId;
				}
				let imageUrl = this.currentWebview;
				let title = '您好，这是我的名片，请惠存！';
				let path = '/pages/businessCard2/businessCard2?cardUserId=' + this.userId + '&recommendId=' + recommendId +
					'&from=singlemessage&isappinstalled=0';

				this.appShare(path, title)
			},
			// #endif
		},
		/**
		 * 页面分享
		 */
		// 微信小程序
		onShareAppMessage(res) {
			const journalId = res.target ? res.target.dataset.id : ''

			let recommendId = this.userId;
			// 日志的分享
			if (journalId) {
				this.$api.share(journalId, 4);
				return {
					path: '/pages/businessCard2/businessCard2?cardUserId=' + this.cardUserId + '&journalId=' + journalId +
						'&recommendId=' + recommendId,
				}
			}
			// 名片的分享
			this.$api.share(this.userId, 1);

			return {
				title: '您好，这是我的名片，请惠存！',
				path: '/pages/businessCard2/businessCard2?cardUserId=' + this.userId + '&recommendId=' + recommendId,
			}
		},




	}
</script>

<style lang="less">
	@import "../../css/mzl_base.less";
	@import "../../css/jss_base.less";

	.VIPmodal {
		width: 500upx;
		height: 270upx;
		background: #f3f3f3;
		position: fixed;
		border-radius: 10upx;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		z-index: 1000;
		overflow: visible;

		.text_box {
			text-align: center;
			margin: 50upx;
			font-size: 34upx;
			color: #333;

		}

		.btn_box {
			display: flex;
			position: absolute;
			bottom: 0;
			width: 100%;

			button {
				font-size: 34upx;
				color: #8390FF;
				width: 50%;
			}
		}

		.skipHref {
			position: absolute;
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			line-height: 80upx;
			text-align: center;
			border: 2px solid white;
			bottom: -180upx;
			color: white;
			left: 50%;
			font-size: 35upx;
			transform: translateX(-50%) translateY(-50%);

		}
	}

	.VIPmask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #333;
		opacity: 0.5;
		z-index: 999;
	}



	.pop-up {
		position: fixed;
		right: 30upx;
		bottom: 60upx;
		// 	  width: 200upx;
		// 	  height: 200upx;
		// 	  background-color: red;
		z-index: 999999;



		&.camera {
			bottom: 210upx;
		}

		.noticeImg {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
		}

		.cameraImg {

			width: 100upx;
			height: 100upx;
			border-radius: 50%;
		}

		.number {
			font-size: 24upx;
			position: absolute;
			width: 34upx;
			height: 34upx;
			line-height: 34upx;
			text-align: center;
			background: #FF5858;
			color: #FFFFFF;
			border-radius: 50%;
			top: 0;
			right: 0;
		}
	}



	.container {
		font-family: PingFangSC;
		background: #F5F5F5;
		// padding-bottom: 100upx;
		overflow-x: hidden;
	}

	.Box {
		width: 100%;
		height: auto;
		background: rgba(0, 0, 0, .8);
		border: 1upx solid red;
	}

	//顶部个人信息
	.perInfoCon {
		.bgCon {
			position: relative;
			width: 100%;
			box-sizing: border-box;
			padding: 0 30upx;
			height: 390upx;
			background-color: white;
			background-image: url(https://card-1254165941.cos.ap-guangzhou.myqcloud.com/homebg.jpg);
			background-size:100% 390rpx; 
			background-repeat: no-repeat;
			// background: -webkit-linear-gradient(90deg, #8D8DF1, #5670FF);
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			image {
				width: 26upx;
				height: 25upx;
				margin-right: 18upx;
			}

			.br_l {
				margin-top: 40upx;
				font-size: 24upx;
				color: #FFFFFF;
				width: 70%;
			}

			.bg_r {
				margin-top: 40upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 24upx;
				color: #FFFFFF;
				width: 50%;
				z-index: 99;
				height: 50upx;

				.praise {
					width: 34%;
				}

				.shouCang {
					width: 30%;
				}

				.shareBtn {
					width: 40%;
					height: 70upx;
					border: none;
					display: inline-block;
					background: none !important;
					padding: 0;
					line-height: 33upx;
					color: #fff !important;
					font-size: 24upx;
					overflow: visible;
				}

				button::after {
					border: 0;
				}
			}
		}

		.infoDe {
			position: absolute;
			// z-index: 10;
			// left: 20upx;
			top: 50upx;
			width: 690upx;
			height: 379upx;
			box-sizing: border-box;
			padding: 0 30upx 0 30upx;
			border-radius: 10upx;
			background-size: 100% !important;
			background-position: 50%;
			background-repeat: no-repeat;


			.data-container {
				position: absolute;
				right: -34upx;
				top: 45upx;
				padding-top: 15px;
				padding-left: 15px;
				padding-bottom: 15px;
			}

			.data {

				width: 134upx;
				height: 54upx;
				line-height: 54upx;
				background: #F4F5FF;
				color: #6D7CF8;
				font-size: 24upx;
				text-align: center;
				border-radius: 27upx 0 0 27upx;
			}
		}
	}

	//导航栏
	.subNav {
		padding-top: 144upx;
		background: #FFFFFF;

		.nav-item {
			width: 25%;

			&:after {
				display: none;
			}
		}

		&[disabled] {
			filter: grayscale(100%);
		}

		image {
			width: 90upx;
			height: 90upx;
		}

		.cuCon {
			width: 90upx;
			height: 90upx;
			background: #F8F8FF;
			text-align: center;
			border-radius: 50%;

			.cuNum {
				font-size: 34upx;
				color: #6B7AF8;
				line-height: 90upx;
				font-family: Arial-BoldMT;
				font-weight: bold;
			}
		}

		.nav_ti {

			margin-top: 15upx;
			margin-bottom: 50upx;
			font-size: 28upx;
			color: #666666;
			font-family: PingFangSC;
		}
	}

	//个人视频
	.VideoList {
		padding: 30upx;
		padding-top: 0;

		.VLtitle {
			.Tname {
				padding: 30upx 0;
				width: 30%;
				font-size: 36upx;
				font-weight: 600;
				color: #AAAAAA;
			}

			.titleActive {
				color: #333333;
			}
		}

		.Vlvideo {
			margin-top: 15upx;

			.VLVitem {
				height: 388upx;

				.video-container {
					width: 100%;
					height: 388upx;
					position: relative;

					.video-cover {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						z-index: 8;
						border-radius: 8upx;
						background-color: #000;
					}

					.play-icon {
						position: absolute;
						width: 90upx;
						height: 90upx;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						z-index: 9;
					}

				}
			}
		}
	}

	// 日志
	.dayCon {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30upx;

		.logCon {
			background: #FFFFFF;
			margin-bottom: 30upx;
		}

		.dayCon_title {
			margin-bottom: 10upx;
			font-size: 36upx;
			color: #333333;
			font-family: PingFangSC;
			font-weight: 600;
			color: #AAAAAA;

			.title {
				margin-right: 68upx;
				padding: 15upx;
			}

			.ATactive {
				color: #333333;
			}

			.goods {
				margin-left: 68upx;
			}
		}

	}

	//商品
	.shopContainer {
		// margin-bottom: 130upx;

		.bannerCon {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin: 0 auto;
			height: 170upx;
			padding: 0 30upx;
			background: #FFFFFF;
			margin-bottom: 30upx;

			.shoplogo {
				width: 110upx;
				height: 110upx;
				margin-right: 20upx;
			}

			.shopName {
				width: 60%;
				font-family: PingFangSC;

				.name {
					margin-bottom: 18upx;
					font-size: 30upx;
					color: #333333;
				}

				.goodsNum {
					font-size: 24upx;
					color: #666666;
				}
			}

			.shopButton {
				width: 130upx;
				height: 64upx;
				line-height: 64upx;
				text-align: center;
				background: #F8F9FF;
				color: #6B7AF8;
				border-radius: 32upx;
				font-size: 28upx;
			}
		}

		//商品列表
		.goodsListCon {
			width: 100%;
			@ff: PingFangSC;

			.goodsCon {
				width: 334upx;

				.imgCon {
					position: relative;
					font-size: 0;

					&>image {
						width: 334upx;
						height: 334upx;
					}

					.score {
						position: absolute;
						right: 14upx;
						bottom: -20upx;
						width: 100upx;
						height: 40upx;
						line-height: 40upx;
						background: #DDAB5C;
						font-size: 20upx;
						color: #FFFFFF;
						border-radius: 4upx;
						text-align: center;
					}
				}

				.textDetail {
					padding: 35upx 20upx 0 20upx;
					background: #FFFFFF;
					font-family: @ff;

					.goodsName {
						margin-bottom: 21upx;
						font-size: 28upx;
						color: #333333;
					}

					.goodsDe {
						margin-bottom: 33upx;

						.priceIcon {
							font-size: 24upx;
							color: #FF5858;
						}

						.price {
							color: #FF5858;
							font-size: 30upx;
							font-family: Arial;
							font-weight: bold;
						}

						.saleNum {
							font-size: 24upx;
							color: #999999;
							margin-bottom: 33upx;
						}
					}
				}

			}
		}

	}


// 购买商品
	.shopping{
		width: 100%;
		height: 1139upx;
		background-image: url('https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/shop.jpg');
		background-size:100% 100%;
		position: relative;
		.btn-primary{
			position: absolute;
			bottom: 51upx;
			left: 52upx;
		}
	}
	// 创建按钮
	.createCon {
		position: fixed;
		bottom: 0;
		z-index: 999999;
		width: 100%;
		height: 98upx;
		text-align: center;
		background: #FFFFFF;

		.creButton {
			width: 620upx;
			height: 80upx;
			line-height: 80upx;
			margin: 10upx auto;
			font-size: 28upx;
			color: #FFFFFF;
			background: #6B7AF8;
			border-radius: 44upx;
			border: none;
		}
	}

	//消息提醒按钮
	.notice {
		position: fixed;
		right: 30upx;
		bottom: 60upx;
		z-index: 9999;

		.noticeImg {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
		}

		.number {
			font-size: 24upx;
			position: absolute;
			width: 34upx;
			height: 34upx;
			line-height: 34upx;
			text-align: center;
			background: #FF5858;
			color: #FFFFFF;
			border-radius: 50%;
			top: 0;
			right: 0;
		}
	}

	//是否拨打电话
	.callModel {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999999;
		background: rgba(0, 0, 0, 0.5);

		.cmCon {
			width: 630upx;
			background: #FFFFFF;
			position: absolute;
			top: 50%;
			margin-top: -130upx;
			left: 50%;
			margin-left: -315upx;
			border-radius: 8upx;

			.callNum {
				margin: 29upx 0 21upx 0;
				font-size: 36upx;
				color: #333333;
			}

			.isCall {
				margin-bottom: 30upx;
				font-size: 28upx;
				color: #666666;
			}

			.confim {
				border-top: 1px solid #E1E1E1;
				width: 100%;
				height: 87upx;
				line-height: 87upx;
				text-align: center;

				.conNo {
					width: 50%;
					font-size: 28upx;
					color: #666666;
				}

				.conYes {
					width: 50%;
					font-size: 28upx;
					color: #6B7AF8;
				}

				.line {
					background: #D8D8D8;
					height: 88upx;
					width: 1px;
				}
			}
		}

	}

	.pubCon {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 124upx;
		margin-bottom: 30upx;
		border: 1px dashed #6B7AF8;
		border-radius: 8upx;
		font-size: 28upx;
		color: #666666;

		&>image {
			width: 40upx;
			height: 40upx;
			margin: 0 24upx 0 40upx;
		}
	}

	// 发布按钮
	.ConsultaButton {
		width: 100%;
		position: fixed;
		bottom: 50upx;
		text-align: right;
		padding-right: 30upx;
		z-index: 999;

		.CBbtn {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			box-shadow: 0upx 0upx 10upx 0upx rgba(43, 57, 175, 0.4);
			position: absolute;
			right: 30upx;
			bottom: 160upx;


			.image {
				width: 100upx;
				height: 100upx;
				vertical-align: middle;
			}
		}
	}

	.warning-info {
		font-size: 24upx;
		color: #999999;
		text-align: center;
	}

	.mod_tag {
		display: inline-block;
		border-radius: 19upx;
		font-size: 20upx;
		color: #FFFFFF;
		padding: 5upx 16upx;
		margin-left: 10upx;
	}

	.invite-banner {
		width: 680upx;
		height: 136upx;
		margin-top: 30upx auto;
	}

	.no-video-container {
		text-align: center;

		image {
			width: 180upx;
			height: 180upx;
		}

		button {
			width: 300upx;
			margin: 30upx auto;
			font-size: 28upx;
			line-height: 80upx;
			height: 80upx;
		}
	}

	.guideShow {
		position: relative;
		z-index: 9999;
	}

	.open-vip-container {
		padding-top: 20upx;
		line-height: 136upx;
		height: 156upx;
		text-align: center;

		>view {
			color: #333333;
			font-size: 28upx;
			line-height: 34upx;
			margin-top: 16upx;
			text-align: center;
		}
	}
</style>
