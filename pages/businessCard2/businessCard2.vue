<template>
	<view class="container">
		<app-share-top-banner></app-share-top-banner>

		<!-- 个人信息 -->
		<view class="perInfoCon">
			<view class="bg"></view>

			<view class="bgCon">
				<view class="br_l">{{viewNum}}人看过Ta</view>
				<view class="bg_r">
					<view @click="praise" class="praise">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like2.png'" v-if="praiseState==1"></image>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like.png'" v-else></image>
						<text>{{userDetails.praiseNum}}</text>
					</view>
					<view class="shouCang" @click="collectCard">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang2.png'" v-if="collectState==1"></image>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang.png'" v-else></image>
						<text>{{userDetails.collectNum}}</text>
					</view>
				</view>
			</view>
			<!-- 信息详情 -->
			<view class="infoDeP">
				<card-bg-item1 :userDetails="userDetails" :cardBgId="userDetails.cardBackgroundId"></card-bg-item1>

				<!-- 别人资料按钮 -->
			<!-- 	<button v-if="!currentUser.id && isWechat" plain="true"  @click="gotoRegPage" class="data-container" style="line-height: initial;">
					<view class="data">个人资料</view>
				</button> -->
				<!-- <button v-if="!currentUser.id && isWechat" plain="true" open-type="getUserInfo" @getuserinfo="WXgetUserInfor" class="data-container" style="line-height: initial;">
					<view class="data">个人资料</view>
				</button> -->
				<view class="data-container" @click.stop="lookInfo">
					<view class="data">个人资料</view>
				</view>

			</view>
		</view>

		<!-- 导航（别人的名片） -->
		<view class="subNav fx-row fx-row-center" :class="{ disabled: isPrivacy }" :disabled="isPrivacy">
			<view class="fx-column fx-row-center" @click.stop="callClick">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/phone.png'"></image>
				<text class="nav_ti">拨打电话</text>
			</view>
			<view class="fx-column fx-row-center" @click.stop="savephoneBook">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/tongxunlu2.png'"></image>
				<text class="nav_ti">保存至通讯录</text>
			</view>

			<!-- <button v-if="!currentUser.id && isWechat" plain="true" open-type="getUserInfo" @getuserinfo="WXgetUserInfor" class="fx-column fx-row-center" style="line-height: initial;">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/huiidi.png'"></image>
				<text class="nav_ti">{{ isApplyCollectCard ? '已回递名片' : '回递名片' }}</text>
			</button> -->
			
			<button v-if="!currentUser.id && isWechat" plain="true" @click="gotoRegPage" class="fx-column fx-row-center" style="line-height: initial;">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/huiidi.png'"></image>
				<text class="nav_ti">{{ isApplyCollectCard ? '已回递名片' : '回递名片' }}</text>
			</button>
			
			<view v-else class="fx-column fx-row-center" @click.stop="giveCard">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/huiidi.png'"></image>
				<text class="nav_ti">{{ isApplyCollectCard ? '已回递名片' : '回递名片' }}</text>
			</view>

		</view>
		<!-- 个人视频 -->
		<view class="VideoList" v-if="videoResult.userVideoMap || videoResult.shopVideoMap">
			<view class="VLtitle fx-row fx-row-center fx-row-space-left">
				<view @click.stop="changeVideoTitle(index)" :class="{'Tname':true,'titleActive':VideoList.VTitleActive==index}"
				 v-for="(item,index) in VideoList.VideoTitle" :key='index' v-if="item.id !== 1 || !!shopId">{{item.title}}</view>
			</view>
			<view class="Vlvideo">
				<view class="VLVitem" v-if="VideoList.VTitleActive==0">
					<view class="video-container" v-if="videoResult.userVideoMap">
						<video-container :mobileNetworkAutoplay="userDetails.mobileNetworkAutoplay" :cover="videoResult.userVideoMap.videoImage" :video="videoResult.userVideoMap.videoUrl"></video-container>
					</view>
					<view v-else>
						<defaultpage :messageToPage="messageToPage5"></defaultpage>
					</view>
				</view>
				<view class="VLVitem" v-if="VideoList.VTitleActive==1">
					<view class="video-container" v-if="videoResult.shopVideoMap">
						<video-container :mobileNetworkAutoplay="userDetails.mobileNetworkAutoplay" :cover="videoResult.shopVideoMap.videoImage" :video="videoResult.shopVideoMap.videoUrl"></video-container>
					</view>
					<view v-else>
						<defaultpage :messageToPage="messageToPage5"></defaultpage>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品日志 -->
		<view class="dayCon" :class="{ noVideo: !videoResult.userVideoMap && !videoResult.shopVideoMap }" v-if="goodsMixins.list.length > 0 || journalMixins.list.length > 0">
			<!-- 标题切换 -->
			<view class="dayCon_title fx-row">
				<view v-for="(item,index) in auditTitleBox.auditTitle"
							:key="index"
							@tap.stop="changeTitle($event,index)"
							:class="{'ATname':true,'ATactive':audiTitleActive==index}"
							v-if="(index == 0 && goodsMixins.list.length > 0) || (index == 1 && journalMixins.list.length > 0)"
				 class="title">{{item.title}}

				</view>
			</view>


			<!-- 商品 -->
			<view class="shopContainer fx-column fx-col-center" v-if="audiTitleActive==0">

				<!-- 判断1——有没有开店（有没有店铺id）&&VIPuserId!=0&&userDetails.userType!=1 -->
				<view v-if="!!shopId">
					<!-- 店铺logo -->
					<view class="bannerCon" @click.stop="toShop">
						<image :src="cardShopData.logo||''"></image>
						<view class="shopName">
							<view class="name">
								{{cardShopData.shopName}}
								<text class="mod_tag" :class="'PActiveVip' + cardShopData.shopGrade" v-if="shopGrade">{{ shopGrade }}</text>
							</view>
							<view class="goodsNum">{{cardShopData.goodsNum||0}}个商品</view>
						</view>
						<view class="shopButton">进店</view>
					</view>
					<!-- 商品列表 -->
					<view class="goodsListCon fx-wrap fx-row fx-row-space-between">

						<!-- 判断2——有没有商品  (是否有商品数量)-->
						<view class="goodsCon" v-for="(item,index) of goodsMixins.list" :key="index" @click.stop="goodsDetail(item)">
							<view class="imgCon">
								<image :src="item.coverImage" ></image>
								<view class="score">评分<text>{{item.score?item.score:0}}</text></view>
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
						<view v-if="goodsMixins.list.length === 0 && !!shopId" style="align-items: center;width: 100%; padding: 200upx">
							<view>
								<!-- 别人没商品 -->
								<defaultpage :messageToPage="messageToPage2"></defaultpage>
							</view>
						</view>

					</view>

					<uni-load-more :loading-type="loadingType2" v-if="showLoadMore2"></uni-load-more>


				</view>

				<view v-else>
					<!-- 别人没开店 -->
					<view style="padding: 200upx">
						<!-- 他还没有开通店铺 -->
						<defaultpage :messageToPage="messageToPage1"></defaultpage>
					</view>
				</view>

			</view>

			<view class="logCon" v-if="audiTitleActive==1" style="background: none;">
				<view v-if="journalMixins.list.length === 0" style="padding: 200upx">
					<defaultpage :messageToPage="{ image: '	http://card-1254165941.cosgz.myqcloud.com/images/wurizhi.png', title: '他没有发布的日志' }"></defaultpage>
				</view>

				<journal-item v-for="journal in journalMixins.list" :journal="journal" :key="journal.id" :cardUserId="cardUserId"></journal-item>
				<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
			</view>

		</view>

		<!-- 拨打电话弹框 -->
		<view class="callModel fx-column fx-row-center fx-clo-center" v-if="isCall">
			<view class="cmCon fx-column fx-row-center fx-col-center">
				<view class="callNum">{{userDetails.phone}}</view>
				<view class="isCall">是否要拨打该号码</view>
				<view class="confim fx-row fx-row-center fx-col-center">
					<view class="conNo" @click.stop="canCall">取消</view>
					<view class="line"></view>
					<view class="conYes" @click.stop="callPhoneNumber">确定</view>
				</view>
			</view>
		</view>

		<!--&lt;!&ndash;消息通知按钮  &ndash;&gt;-->
		<!--<view class="notice" @click="messageTo">-->
		<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'" mode="widthFix" class="noticeImg"></image>-->
		<!--<view class="number">1</view>-->
		<!--</view>-->
		<!-- 创建名片按钮 -->

		<!-- #ifndef APP-PLUS -->

		<cover-view class="createCon" style="position: fixed;bottom: 0;" v-if="!userId">
			<!-- #ifdef MP-WEIXIN -->
			<button plain="true" class="creButton" lang="zh_CN" @click="gotoRegPage">10秒创建我的名片</button>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<button plain="true" class="creButton" lang="zh_CN" @click="APPgetUserInfor">10秒创建我的名片</button>
			<!-- #endif -->
		</cover-view>

		<cover-view class="createCon"  style="position: fixed;bottom: 0;" v-else>
			<template v-if="collectState == 0">
				<button plain="true" class="creButton" @click="returnHome">返回我的名片</button>
			</template>
			<template v-else>
				<cover-view plain="true" class="footer-button left-button" @click="returnHome">打开我的名片
					
				</cover-view>
				<cover-view class="left_radiusfix"></cover-view>
				<cover-view plain="true" class="footer-button right-button" @click="collectCard">从名片夹移出
					
				</cover-view>
				 <cover-view class="right_radiusfix"></cover-view>
			</template>
		</cover-view>


		<!-- #endif -->
		
		<!-- #ifndef APP-PLUS -->
			<!-- 原生会话按钮 -->
			<cover-view v-if="!currentUser.id" class="fab_container" @click="chat">
				 <cover-image  class="uImage" src="http://card-1254165941.cosgz.myqcloud.com/images/home_chat.png"></cover-image>
				 <cover-view class="unread"  v-if="unreadCount > 0">{{ unreadCount }}</cover-view>

			</cover-view>
			
			<cover-view v-else class="fab_container" @click.stop="chat">
				 <cover-image  class="uImage" src="http://card-1254165941.cosgz.myqcloud.com/images/home_chat.png"></cover-image>
				 <cover-view class="unread"  v-if="unreadCount > 0">{{ unreadCount }}</cover-view>
			
			</cover-view>
			
			<!-- 原生打开名片 移除名片按钮 -->
			
			<!-- 	<button v-if="!currentUser.id" class="fab" plain="true" @getuserinfo="chat" lang="zh_CN" open-type="getUserInfo" style="line-height: initial;">
					<image src="http://card-1254165941.cosgz.myqcloud.com/images/home_chat.png"></image>
					<view class="unread" v-if="unreadCount > 0">{{ unreadCount }}</view>
				</button>
				<button v-else class="fab" plain="true" @click.stop="chat" style="line-height: initial;">
					<image src="http://card-1254165941.cosgz.myqcloud.com/images/home_chat.png"></image>
					<view class="unread" v-if="unreadCount > 0">{{ unreadCount }}</view>
				</button> -->
		<!-- #endif -->

	</view>
</template>

<script>
	import appConfig from '@/js/config'
	// const DEFAULT_CARD_ID = 54;
	const DEFAULT_CARD_ID = appConfig.DEV ? 34 : 67;

	const SHOP_GRADE = {
	  1: ' 黄金商家',
	  2: ' 铂金商家',
	  3: ' 钻石商家',
	}

	import store from "@/js/store.js";
	import JournalItem from "../../components/JournalItem";
	import journalMixins from "../businessCard/journalMixins";
	import goodsMixins from "../businessCard/goodsMixins";
	import uniLoadMore from '@/template/uni-load-more.vue';

	import cardBgItem1 from '../../components/cardBg/cardBgItem1.vue';


	import defaultpage from '@/components/defaultPage.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';

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
	
	// #ifdef APP-PLUS
	import appView from "@/js/app-plus/appViewPaint"
	// #endif

	export default {

		components: {
			JournalItem,
			defaultpage,
			uniLoadMore,
			cardBgItem1
		},

		mixins: [journalMixins, goodsMixins],

		data() {
			return {
				appCreateCon:null,
				appRetHomeBtn:null, //10秒创建
				appCollectedBtns:null, // 移除名片夹
				showLog: false,
				userDetails: {}, //名片信息详情
				collectState: 0,
				praiseState: 0,
				viewNum: 0,
				showMenu: '',
				//别人的店id
				shopId: '',
				cardShopData: {}, //店铺信息
				userId: '', //缓存中的用户ID
				cardUserId: '', //名片所属人ID
				isShowCreate: false, //是否显示注册按钮
				isCall: false, //是否拨打电话
				VIPuserId: 0,
				//缺省页
				messageToPage1: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '他还没有开通店铺'
				},
				messageToPage2: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '店家还没上传商品'
				},
				messageToPage5: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '该用户还没上传视频哦~'
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
				videoResult: {
					shopVideoMap: {
						videoImage: '',
						videoTime: '',
						videoUrl: '',
					},
					userVideoMap: {
						videoImage: '',
						videoTime: '',
						videoUrl: '',
					},
				},
				// 轮播图-日志
				SwiperList: [{
						id: 0,
						image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'
					},
					{
						id: 1,
						image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'
					},
					{
						id: 2,
						image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'
					},
					{
						id: 3,
						image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'
					},
					{
						id: 4,
						image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'
					},
					{
						id: 5,
						image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png'
					}
				],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				currentNum: 0,
				showPhone: '',
				recommendId: '',
				isDefaultCard: false,
				journalId: '',
				loadCount: 0,
				unreadCount: 0,
				isApplyCollectCard: false,
				appCreCon:null, //app端底部浮动栏
				hasInit:false,
			}
		},

		computed: {
			...mapState(['UPinfo']),
			isLogin() {
				//是否登录
				return !!this.userId;
			},
			isSelf() {
				//是否本人
				return this.userId == this.cardUserId && this.userId !== '';
			},
			isPrivacy() {
				//陌生人是否可见 0可见 1不可见
				return Number(this.userDetails.strangerCanSee) != 0;
			},
			isHidePhone() {
				//是否有手机号码
				return !!Number(this.userDetails.hidePhoneNum);
			},
          shopGrade () {
			  return SHOP_GRADE[Number(this.cardShopData.shopGrade)] || '';
		  },
		},

		watch: {
			loadCount (count) {
				if (count === 2) {
					if (this.goodsMixins.list.length === 0) {
						this.audiTitleActive = 1;
					}
				}
			},
		},

		onLoad(option) {
			
			if (option.journalId) {
				this.navigateTo('/item_descover/journalDetail/journalDetail', {
					id: option.journalId
				})
				this.journalId = option.journalId;
			}
			

			this.isDefaultCard = !option.cardUserId
			this.cardUserId = option.cardUserId || DEFAULT_CARD_ID;
			this.recommendId = option.recommendId || '';	

			// uni.showLoading({
			// 	title: '加载中',
			// 	mask:true
			// });
				
			this.doLoginHandle(hasRegister=>{
				
				uni.showLoading({
					title: '加载中',
					mask:true
				}).then(res=>{
					if(hasRegister){
						this.userId =uni.getStorageSync('userId');
						this.loginIM();
						this.$api.viewCard(this.cardUserId).then(res => {});
					}
						
					this.init();
				})
		
					//uni.hideLoading();
			});
			
			
		},

		onShow() {
			//this.init();
			this.journalOnShow();
			this.goodsOnShow();
			// #ifdef APP-PLUS
				if(this.hasInit)
					this.reDrawBtn();
			// #endif
		},	
		
		onUnload(){
			// #ifdef APP-PLUS
				if(this.appCreateCon){
					this.appCreateCon.close();
					this.appCreateCon=null;
				
				}
				if(this.appRetHomeBtn){
					this.appRetHomeBtn.close();
					this.appRetHomeBtn = null;
			
				}
				if(this.appCollectedBtns){
					this.appCollectedBtns[0].close();
					this.appCollectedBtns[1].close();
					this.appCollectedBtns = null;
				}
			// #endif
		},
		
		onHide(){
			// #ifdef APP-PLUS
				if(this.appCreateCon){
					this.appCreateCon.hide();
				
				}
				if(this.appRetHomeBtn){
					this.appRetHomeBtn.hide();
					
				}
				
				if(this.appCollectedBtns){
					this.appCollectedBtns[0].hide();
					this.appCollectedBtns[1].hide();
				}
			// #endif
		},

		onReachBottom () {
			if (this.audiTitleActive == 0) {
				if (this.goodsMixins.noMore || this.goodsMixins.loading) return;
				this.fetchGoods();
			}
			if (this.audiTitleActive == 1) {
				if (this.journalMixins.noMore || this.journalMixins.loading) return;
				this.fetchJournal();
			}
		},
		

		methods: {
			// #ifdef APP-PLUS
			drawCreateCon(){
				//绘制底部浮动栏
				//10 秒创建
				if(this.appRetHomeBtn){
					this.appRetHomeBtn.hide();
				}
				
				if(this.appCollectedBtns){
					this.appCollectedBtns[0].hide();
					this.appCollectedBtns[1].hide();
				}
				
				if(this.appCreateCon){
					this.appCreateCon.show();
					return;
				}
				let view =  new appView('CreateCon',{left:0,bottom:0,height:98,width:750,backgroundColor:"#FFFFFF"});
				view.drawRectUpx({radius:44,color:"#6B7AF8"}, {top:10,left:65,width:620,height:80},'CreateConBtn');
				view.drawTextUpx("10秒创建名片",{top:10,left:65,width:620,height:80,align:"center"},{size:32,color:'#FFFFFF'},'BtnText');
				view.addEventListener('click',this.gotoRegPage);
				view.show();
				this.appCreateCon = view;
		
			},
			
			drawRetHomeBtn(){
				//返回我的名片
				
				if(this.appCollectedBtns){
					this.appCollectedBtns[0].hide();
					this.appCollectedBtns[1].hide();
				}
				
				if(this.appCreateCon){
					this.appCreateCon.hide();
				}
				
				if(this.appRetHomeBtn){
					this.appRetHomeBtn.show();
					return;
				}
				let view =  new appView('appRetHomeBtn',{left:0,bottom:0,height:98,width:750,backgroundColor:"#FFFFFF"});
				view.drawRectUpx({radius:44,color:"#6B7AF8"}, {top:10,left:65,width:620,height:80},'RetHomeBtn');
				view.drawTextUpx("返回我的名片",{top:10,left:65,width:620,height:80,align:"center"},{size:32,color:'#FFFFFF'},'retHomeBtnText');
				view.addEventListener('click',this.returnHome);
				view.show();
				// setTimeout(function() {
				// 	plus.nativeObj.View.startAnimation({type:'pop-out',duration:1000}, view);
				// }, 3000);
				
				
				this.appRetHomeBtn = view;

			},
			
			drawCollectedBtns(){
				//绘制已经收藏名片的按钮 有两个
				if(this.appCreateCon){
					this.appCreateCon.hide();
				}
				
				if(this.appRetHomeBtn){
					this.appRetHomeBtn.hide();
				}
				
				if(this.appCollectedBtns){
					this.appCollectedBtns[0].show();
					this.appCollectedBtns[1].show();
					return;
				}
				let view_left =  new appView('appCollectedBtns_left',{left:0,bottom:0,height:98,width:375,backgroundColor:"#FFFFFF"});
				let view_right =  new appView('appCollectedBtns_right',{left:375,bottom:0,height:98,width:375,backgroundColor:"#FFFFFF"});
				//左边 打开我的名片
				//4CA5FF
				view_left.drawRectUpx({radius:44,color:"#4CA5FF"}, {top:10,left:65,width:88,height:80},'CollectedBtns_lradius');
				view_left.drawRectUpx({color:"#4CA5FF"}, {top:10,left:109,width:269,height:80},'CollectedBtns_left');
				view_left.drawTextUpx("打开我的名片",{top:10,left:65,width:309,height:80,align:"center"},{size:29,color:'#FFFFFF'},'CollectedBtns_leftText');
				
				//右边 从名片夹移出
				//#6B7AF8
				view_right.drawRectUpx({color:"#6B7AF8"}, {top:10,left:0,width:266,height:80},'CollectedBtns_right');
				view_right.drawRectUpx({radius:44,color:"#6B7AF8"}, {top:10,left:222,width:88,height:80},'CollectedBtns_rradius');
				view_right.drawTextUpx("从名片夹移出",{top:10,left:0,width:309,height:80,align:"center"},{size:29,color:'#FFFFFF'},'CollectedBtns_rightText');
				
				//事件监听
				view_left.addEventListener('click',this.returnHome);
				view_right.addEventListener('click',this.collectCard);
				
		
				view_left.show();
				view_right.show();
				this.appCollectedBtns = [view_left,view_right];
			},
			
			// #endif

			gotoRegPage(){
				this.navigateTo('../register/register',{
					cardUserId:this.cardUserId,
					recommendId:this.recommendId
					
				});
				
			},
			
			// 初始化
			init() {
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				this.userId = uni.getStorageSync('userId');
				// 获取名片信息
				this.$api.getUserCardDetails2(this.cardUserId, this.cardUserId).then(result => {
					this.isApplyCollectCard = result.isApplyCollectCard == 1;
					this.userDetails = result.userMap;
					
					//自动播放改为根据当前用户的播放设置
					//去掉换行符
					this.userDetails.autograph = this.userDetails.autograph.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, "");
					
					//this.userDetails.mobileNetworkAutoplay = result.userMap.mobileNetworkAutoplay || this.$store.state.currentUser.mobileNetworkAutoplay;
					this.mobileNetworkAutoplay2=result.userMap.mobileNetworkAutoplay;
				
					//console.log(result.userMap.mobileNetworkAutoplay);
					// uni.setStorageSync('userId',result.userMap.id);
					//console.info(this.userDetails)
					this.viewNum = result.viewNum;
					this.collectState = result.collectState;
					this.praiseState = result.praiseState;
					this.VIPuserId = result.userMap.vipId;

					if (Number(result.userMap.vipId) > 0) {
						this.shopId = this.userDetails.shopId;
					}

				//默认展示日志
				if(result.logStatus==1){
					this.changeTitle(null,1)
				}
					this.showPhone = this.isHidePhone && !this.isSelf ?
						this.hidePhone(this.userDetails.phone) :
						this.userDetails.phone;
					// 判断是否是本人-
					if (this.isSelf && !this.journalId) {
						//调转首页
						this.returnHome()
					} else {
						uni.setNavigationBarTitle({
							title: this.userDetails.name
						});
						this.getUserCardShowVideo();
						// #ifdef APP-PLUS
							this.hasInit=true;
							this.reDrawBtn();
						// #endif
						
					}
					uni.hideLoading()
				}).catch(error => {
					setTimeout(this.init,3000);
				})
			},
			reDrawBtn(){
					if(this.userId){
						if(Number(this.collectState)===1){
							this.drawCollectedBtns();
						}else this.drawRetHomeBtn();
						
					}else{
						this.drawCreateCon();
					}
			},
			
			//返回首页
			returnHome() {
				console.log('00000');
				uni.switchTab({
					url: '/pages/businessCard/businessCard'
				});
			},
			// 获取用户视频
			getUserCardShowVideo() {
				this.$api.getUserCardShowVideo(this.cardUserId, this.shopId).then(result => {
					this.videoResult = result;
					if (!this.videoResult.userVideoMap && this.videoResult.shopVideoMap) {
						this.VideoList.VTitleActive = 1;
					}
				}).catch(error => {
					console.log(error)
				})
			},

			// 点赞
			praise() {
				if (!this.checkHasLogin()) {
					this.showTips('未登录,请先登录');
					return false;
				}
				this.praiseState = this.praiseState == 0 ? 1 : 0 //点赞状态
				this.$api.praise(this.cardUserId, 3).then(result => {
					this.userDetails.praiseNum = result.praiseNum;
				}).catch(error => {
					this.showError(error);
				})
			},

			loginIM () {
				if (!this.currentUser.id) {
				  config.identifier = uni.getStorageSync('openid');
				  config.identifierNick = this.UPinfo.nickName;
				} else {
				  config.identifier = this.currentUser.id;
				  config.identifierNick = this.currentUser.name;
				}

				const chatList = uni.getStorageSync('firstChatList') || [];
				let isFirst = false;
				if (chatList) {
				  const hasChat = chatList.indexOf(Number(this.cardUserId)) !== -1;
				  // 如果没有沟通过，则发送一条介绍信息
				  if (!hasChat) {
					this.$api.sendIntroMsgByServe(this.cardUserId, config.identifier).then(result => {
					  const chatList = uni.getStorageSync('firstChatList') || [];
					  chatList.push(Number(this.cardUserId));
					  uni.setStorageSync('firstChatList', chatList)
					  this.unreadCount = 1;
					  isFirst = true;
					});
				  }
				}

				const action = this.currentUser.id
					? this.$api.getTLSSig()
					: this.$api.getTLSSigByOpenId(config.identifier);
				action.then(result => {
				  config.userSig = result;
				  console.log(config)
				  webim.login(config, {}, {}, () => {
					webim.syncMsgs(msgList => {
					  if (!isFirst) {
						this.unreadCount = msgList.filter(msg => msg.fromAccount == this.cardUserId).length
					  }
					})
				  });
				}).catch(error => {
				  console.error(error)
				})
			},

			// 收藏
			collectCard() {
				if (!this.checkHasLogin()) {
					this.showTips('未登录,请先登录');
					return false;
				}
				this.collectState = this.collectState == 0 ? 1 : 0 //收藏状态
				this.$api.collect(this.userId, this.cardUserId, 1).then(() => {
					
					this.userDetails.collectNum+=this.collectState==0?-1:1;
					// #ifdef APP-PLUS
						this.reDrawBtn();
					// #endif
				}).catch(error => {
					console.log(error)
				})
			},

			innerCheckHasLogin () {
				// #ifdef H5
				// 分享页面不判断是否已登录
				// 对所有需要登录的操作都跳转至下载页
				uni.navigateTo({ url: '/pages/Download' })
				return false;
				// #endif
				return this.isLogin;
			},

	

			changeVideoTitle(index) { // 切换视频标题
				// if(!this.isShowCreate){return false}
				this.VideoList.VTitleActive = index;
			},
			changeTitle(e, index) { //切换标题(日志，商品)
				// if(!this.isShowCreate){return false}
				this.audiTitleActive = index;
			},
			callClick() { //拨打电话
				if (this.isPrivacy) {
					this.showTips('陌生人不可见');
					return false;
				}
				if (this.isHidePhone) {
					this.showTips('对方已设置隐私保护');
					return false;
				}
				this.isCall = true
			},
			canCall() { //取消拨打电话
				this.isCall = false
			},
			callPhoneNumber() { //拨打别人的电话
				let phoneNumber = this.userDetails.phone
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			savephoneBook() { //保存至通讯录
				// 仅仅是对 H5 环境的操作跳转
				this.innerCheckHasLogin();
				if (this.isPrivacy) {
					this.showTips('陌生人不可见');
					return false;
				}
				if (this.isHidePhone) {
					this.showTips('对方已设置隐私保护');
					return false;
				}
				uni.addPhoneContact({
					firstName: this.userDetails.name,
					mobilePhoneNumber: this.userDetails.phone,
					addressCity: this.userDetails.address,
					organization: this.userDetails.company,
					url: this.userDetails.personalUrl,
					success: function() {
						console.log('success');
					},
					fail: function() {
						console.log('fail');
					}
				});
			},
			giveCard() { //回递名片
				if (this.isPrivacy) {
					this.showTips('陌生人不可见');
					return false;
				} else if (!this.checkHasLogin()) {
					return false;
				} else if (this.isApplyCollectCard) {
					return;
				}
				this.$api.giveCard(this.cardUserId, this.userId).then(result => {
					this.showTips('回递成功！');
					this.isApplyCollectCard = true;
				}).catch(error => {
					console.log(error)
				})
			},
			createCard() { //创建名片
				this.navigateTo('../register/register', {
					id: this.cardUserId,
					isDefault: this.isDefaultCard ? '1' : ''
				})
			},

			getOpenUserInfo(openId) {
				this.$api.GetUserId(openId).then(res => {
					uni.hideLoading();
					if (res.userInfoId) {
						this.showTips('登录成功').then(value => {
							uni.setStorageSync('userId', res.userInfoId)
							this.userId = res.userInfoId;
							uni.setStorageSync('shopId', res.shopId)
							// 更新上次登录时间
							this.$api.updateLastLoginTime().then(value => {
								console.log(' 更新上次登录时间');
							})

							//
							if (this.isDefaultCard) {
								uni.switchTab({
									url: '/pages/businessCard/businessCard'
								});
							}

						})
					} else {
						// TODO: APP 处理
						this.createCard();
					}
				}).catch(error => {
					this.showError(error)
				})
			},

			goodsDetail(item) { //商品详情
				this.navigateTo('/module/shop/goodsDetail/goodsDetail', {
					goodsId: item.goodsId,
					shopId: this.shopId,
					recommendId: this.recommendId,
					cardUserId: this.cardUserId,
				})
			},
			messageTo() { //查看消息
				uni.navigateTo({
					url: '/module/message/home/home'
				});
			},
			lookInfo() { //查看别人的个人资料
				// if(!this.isShowCreate){return false}
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_OtherPersonInfo/businessCard_OtherPersonInfo?userId=' + this.cardUserId
				})
			},

			toShop() {
				// 别人的店铺
				if (!this.userId) {
					this.showTips('请先授权创建名片');
					this.weixinLogin();
					//this.gotoRegPage();
					return;
				}
				
				// this.navigateTo('../../module/shop/model/model3', {
				// 	shopId: this.shopId,
				// 	cardUserId: this.cardUserId,
				// 	recommendId: this.cardUserId,
				// });
				 
				this.navigateTo('../../module/shop/home/home', {
					shopId: this.shopId,
					cardUserId: this.cardUserId,
					recommendId: this.cardUserId,
				});
			},
			changeSwiperNum(event) { // 轮播图图片数量
				// console.log(event.detail.current);
				this.currentNum = event.detail.current;
			},
			videoErrorCallback() { //视频错误信息
				// console.log('视频错误信息:' + e.target.errMsg)
			},
			//登录
			loginTap() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			APPgetUserInfor() {
				// 去登录
				this.loginTap()
			},

      chat (e) {
//         if(e.detail.errMsg !== 'getUserInfo:fail auth deny'){
//         	console.log(e)
          this.$store.commit('setUPinfo', e.detail.userInfo);
          uni.showLoading();
          uni.login({
            provider: 'weixin',
            success: loginRes => {
              this.$api.getOpenId(loginRes.code).then(res=>{
                uni.hideLoading();
                uni.setStorageSync('openid',res.openId);
                this.navigateTo('/module/message/chat/chat', { selToID: this.cardUserId ,channel: 'card'})
								this.unreadCount = 0;
              }).catch(error => {
                this.showError(error);
                uni.hideLoading();
              })
            }
          });
        //}

      },

			//Vuex引入方法
			...mapMutations(['setCardUserId', 'setUPinfo'])
		},



		/**
		 * 页面分享
		 */
		onShareAppMessage(res) {
			const journalId = res.target ? res.target.dataset.id : ''
			let recommendId = this.currentUser.id || '';

			if (journalId) {
				this.$api.share(journalId, 4);
				return {
					path: '/pages/businessCard2/businessCard2?cardUserId=' + this.cardUserId + '&journalId=' + journalId +
						'&recommendId=' + recommendId,
				}
			}

			return {
				title: this.userDetails.name,
				path: '/pages/businessCard2/businessCard2?cardUserId=' + this.cardUserId + '&recommendId=' + recommendId,
			}
		},




	}
</script>

<style lang="less">
	@import "../../css/mzl_base.less";
	@import "../../css/jss_base.less";

	.container {
		font-family: PingFangSC;
		background: #F5F5F5;
		padding-bottom: 100upx;
		overflow-x: hidden;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.Box {
		width: 100%;
		height: auto;
		background: rgba(0, 0, 0, .8);
		border: 1upx solid red;
	}

	//顶部个人信息
	.perInfoCon {
		position: relative;

		.bg {
			width: 100%;
			height: 390upx;
			background: -webkit-linear-gradient(90deg, #8D8DF1, #5670FF);
		}

		.bgCon {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			padding: 0 30upx;
			height: 390upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			z-index: 1000;

			image {
				width: 26upx;
				height: 25upx;
				margin-right: 18upx;
			}

			.br_l {
				margin-top: 40upx;
				font-size: 24upx;
				color: #FFFFFF;
			}

			.bg_r {
				z-index: 999;
				margin-top: 40upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 24upx;
				color: #FFFFFF;

				.praise {
					width: 100upx;
					text-align: center;
					height: 50upx;
				}

				.shouCang {
					margin-left: 40upx;
					width: 100upx;
					text-align: center;
					height: 50upx;

				}
			}
		}

		.infoDeP {
			position: absolute;
			z-index: 1999;
			// left: 20upx;
			top: 100upx;
			width: calc(100% - 60upx);
			height: 379upx;
			box-sizing: border-box;
			margin-left: 30upx;
			border-radius: 10upx;
			background-size: 100% !important;
			background-position: 50%;
			background-repeat: no-repeat;

			.data-container {
				z-index:9999;
				position: absolute;
				right: 0upx;
				top: 0upx;
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
		padding-top: 130upx;
		background: #FFFFFF;

		.nav-item {
			width: 25%;
		}

		&[disabled],
		&.disabled {
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
			margin-top: 20upx;
			margin-bottom: 50upx;
			font-size: 28upx;
			color: #666666;
			font-family: PingFangSC;
		}
	}

	//个人视频
	.VideoList {
		padding: 30upx;

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

		&.noVideo {
			margin-top: 30upx;
		}

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

		// 轮播图片
		.TBmiddle {
			position: relative;
			width: 100%;

			swiper {
				width: 100%;
				height: 750upx;

				image {
					width: 100%;
					border-top-left-radius: 8upx;
					border-top-right-radius: 8upx;
				}
			}

			.TBMswiperNum {
				width: 80upx;
				height: 42upx;
				background: rgba(0, 0, 0, .4);
				position: absolute;
				top: 20upx;
				right: 30upx;
				border-radius: 21upx;
				text-align: center;
				line-height: 42upx;
				color: #FFFFFF;
				font-size: 24upx;
			}

		}

		//轮播底部文字
		.TBbottom {
			padding: 25upx;

			.TBtitle {
				margin: 10upx 0 20upx 0;
				position: relative;
				font-size: 30upx;

				.countTextNum {
					width: 100%;
					position: relative;
					right: 0;
					font-weight: bold;
				}

				.countTextNum2 {
					width: 100%;
					position: relative;
					right: 20upx;
					text-align: right;
					font-weight: bold;
					margin: 10upx 0;
				}
			}

			.TBCenter {
				margin-bottom: 40upx;
				font-size: 24upx;
				color: #999999;

				image {
					width: 28upx;
					height: 24upx;
					vertical-align: middle;
					margin-right: 10upx;
				}

				.TBCtime {
					width: 40%;
				}

				.TBCinfor {
					width: 60%;
					text-align: right;

					.Czan,
					.Cmessage,
					.Csend {
						width: 33.33%;
					}
				}
			}


		}

		.detailCon {
			width: 90%;
			margin: 0 auto;
			margin-bottom: 28upx;
			font-size: 28upx;
			color: #333333;

		}

		.operationCon {
			width: 90%;
			margin: 0 auto;

			.time {
				width: 45%;
				color: #999999;
				font-size: 24upx;
			}

			.opCon_r {
				display: flex;
				flex-direction: row;
				justify-content: center;

				image {
					width: 28upx;
					height: 24upx;
				}

				font-size:24upx;
				color:#999999;
				line-height: 48upx;
				//超出两行显示...
				width:100%;
				overflow:hidden;
				text-overflow:ellipsis;
				display:-webkit-box;

				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
			}
		}

	}

	//商品
	.shopContainer {
		margin-bottom: 130upx;

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

			&>image {
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
						.priceIcon{
							color: #FF5858;
							font-size: 24upx;
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

	// 创建按钮
	.createCon {
		position: fixed;
		bottom: 0;
		z-index: 999999;
		width: 100%;
		height: 98upx;
		text-align: center;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.left_radiusfix{
			position: absolute;
			background: #4CA5FF;
			right: 375upx;
			top: 10upx;
			width: 44upx;
			height: 80upx;
		}
		
		.right_radiusfix{
			position: absolute;
			background: #6B7AF8;
			left: 375upx;
			top: 10upx;
			width: 44upx;
			height: 80upx;
		}

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
				border-top: 1upx solid #E1E1E1;
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

	.footer-button {
		width: 311upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		color: rgba(255, 255, 255, 1);
		border: none;
		margin: 0;
	}

	.left-button {
		background: #4CA5FF;
		border-radius: 44upx;
	
		&:active {
			background: #4796ea;
		}

	}

	.right-button {
		background: #6B7AF8;
		border-radius: 44upx;

		

		&:active {
			background: #6270e0;
		}

	}

	.mod_tag {
		display: inline-block;
		background: #E0B97A;
		border-radius: 19upx;
		font-size: 20upx;
		color: #FFFFFF;
		padding: 5upx 16upx;
		margin-left: 10upx;

		&.PActiveVip1{ background-image: linear-gradient(rgba(244,215,147,0.8) 0%,rgba(222,175,97,0.8) 100%,#A36E19);}
		&.PActiveVip2{ background-image: linear-gradient(rgba(199,220,254,0.8) 0%,rgba(135,162,227,0.8) 100%,#404F7A);}
		&.PActiveVip3{ background-image: linear-gradient(rgba(134,138,255,0.8) 0%,rgba(81,82,200,0.8) 100%,#5355AD);}
	}
.fab_container{
		position: fixed;
		
		right: 30upx;
		bottom: 160upx;
		z-index: 99999;
		width: 100upx;
		height: 100upx;
	
		.unread {
			font-size: 24upx;
			position: absolute;
			width: 34upx;
			height: 34upx;
			line-height: 34upx;
			text-align: center;
			background: #FF5858;
			color: #FFFFFF;
			border-radius: 50%;
			z-index: 99999;
			top: 0;
			right: 0;
		}

		.uImage {
			width: 100upx;
			height: 100upx;
		}

	


}
</style>
