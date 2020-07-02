<template>
	<view class="container page">
		<title-bar title="名片圈"></title-bar>
		<!--圈子标题  -->
		<!-- 圈子头部名片信息 -->
		<template v-if="showInfoPanel">
			<view class="HeaderCardBox">
				<view class="headerCard top" style="background-image: url('http://card-1254165941.cosgz.myqcloud.com/cardImages/images/bgcc.png');">
					<view class="HcardContent">
						<view class="HCimage">
							<circle-avatar :avatar="circle.mpCardCircle.headImage" :images="circle.headImage"></circle-avatar>
						</view>
						<view class="HCcenter">
							<view class="Ctitle single-line">{{ circle.mpCardCircle.name }}</view>
							<view class="CsubTitle">ID：{{ circle.mpCardCircle.number }}</view>

							<wx-view custom-class="Cmanage" >
								<view class="Cmanage">
									<view class="Cmtn" @click="goEditPage">编辑资料</view>
									<view class="Cmtn" v-if="shopId!=0" style="background: rgba(253,186,68,1);margin-left: 16rpx;" @click="goShop">进店</view>
								</view>

							</wx-view>

						</view>
						<wx-view custom-class="HCcode">
						<!-- 	<view v-if="hasManagePermission">
								<image @click="erweimaClick" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/erweima.png'"></image>
							</view> -->
							<template>
								<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/gengduo.png'" mode="aspectFit" @click="manageClick"></image>				
							</template>

						</wx-view>

					</view>
				</view>
			</view>
			
			<view class="pinBox">
				<view class="head fx-row fx-row-space-between">
					<view class="title">
						购买/代理群主家的商品
					</view>
					<view class="more" @click="goMorePin">
						更多
					</view>
				
				</view>
				
					
				<view class="fx-row fx-row-start" v-if="pinList.length>0">
					<image :src="item.cover" @click="goPinDetail(item.id)" class="item" v-for="(item,index) in pinList" :key="index">
						
					</image>
				</view>
				
			</view>
	
		</template>

		<!-- 话题 -->
		<view class="topicBox" @click="hidePanel">
			<view class="topicTitle fx-row fx-row-center">
				<view class="TTtitle fx-row fx-row-center gird-60">
					<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/huati_un.png'"></image>
					<view class="TTname fs3a30" :class="{'active':navActive==0}" @click="changeTitle(0)">语音</view>
					<view class="TTname fs3a30 voice" :class="{'active':navActive==1}"  v-if="circle.mpCardCircle.topicStatus==0 || hasManagePermission || circle.memberType!=2" @click="changeTitle(1)">
						话题 ({{ circle.mpCardCircle.topicNum }})
						<!-- <view class="topicNum">1</view> -->
					</view>
					<view class="TTname fs3a30 voice" :class="{'active':navActive==2}" @click="changeTitle(2)">
						课程 ({{ circle.mpCardCircle.courseNum }})
						<!-- <view class="topicNum">1</view> -->
					</view>
					<!-- <text v-else class="TTname fs3a30">拼团商品信息</text> -->
				</view>
				<view class="topTotalNum gird-40">总浏览量{{ circle.mpCardCircle.pageView }}</view>
				<!-- <view  v-else class="topTotalNum">倒计时中</view> -->
			</view>
			
			<!-- 语音列表 -->
			<!-- :scroll-into-view="lastMsgId" -->
			<scroll-view class="chatWindow" 
				@scrolltoupper="fetchMessage" 
				:scroll-into-view="lastMsgId"
				scroll-y 
				:style="{'height':chatWindowHeight+'px'}"  
				v-if="navActive==0" >
				<view  v-for="(item,index) in list"  :key="index" :id="'msg'+index">
					<chat-item @longClick="showTrans($event,index)" :item="item" @playVideo="playVideo(index)" @play="playVoice(index)" :reserve="item.own"></chat-item>
				</view>
			</scroll-view>
			
			<view class="tip" v-if="navActive==0">禁止分享黄赌毒等非法文字图片以及链接,禁止讨论政治问题</view>
		
			<video id="myVideo" @fullscreenchange="exitFullScreen" style="position: absolute;top: -9999px;left:-9999px" v-show="showVideo" :src="src"></video>
			
			<!-- 话题列表 -->
			<template  v-if="navActive==1">
				<view class="topicList" v-for="(item, index) in list" :key="index">
					<!-- 语音item -->
					<view class="TLlist fx-row fx-row-center fx-row-space-around" @click="topicConClick(item)">
						<view class="TLimage" v-if="item.coverImage">
							<image :src="item.coverImage" mode="aspectFill"></image>
						</view>
						<view class="TLtitle">
							<view class="TLtname">{{ item.title }} </view>
							<view class="TLtimeNum">
								<view class="TLtime">
									<text class="TLtime">{{ item.time }}</text>
								</view>
								<view class="TLnum fx-row fx-row-center fx-row-space-around">
									<view class="TlImageMess">
										<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'"></image> {{ item.commentCount }}
									</view>
									<view class="TLImageGive">
										<template v-if="item.praiseType == 0">
											<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image> {{ item.praiseCount }}
										</template>
										<template v-else>
											<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/like_2.png'"></image> {{ item.praiseCount }}
										</template>
									</view>
								</view>
							</view>
						</view>
					</view>
				
					<view class="topicCard">
						<image :src="item.headImage"></image>
						<text class="topicCname">{{ item.userName }} | {{ item.company }}</text>
					</view>
				</view>
			</template>
		
			
			<!-- 课程列表 -->
			<view class="courseList  fx-row fx-wrap fx-row-space-between" v-if="navActive==2">
				
				
				<view class="courseItem" v-for="(item,index) in list" :key="index" @click="goCourseDetail(item.id)">
					<!-- {{1}} -->
					<image :src="item.cover" class="courseImage" mode=""></image>
					
					<view class="chapterTip">{{item.num}}章节</view>
					<view class="info">
						<view class="title">{{item.courseName}}</view>
					</view>
					
				</view>
			</view>
			
		</view>
		<!-- 工具栏 -->
		<wx-view v-if="navActive==0">
			<view class="publishTopic">
				<view class="inputbar fx-row fx-row-center">
					<image v-if="sendText" @click="sendText=false;emoiconExpand=false;showToolArea=false" :src="baseURL+'/voiceicon%402x.png'" class="iconbtn"></image>
					<image v-else @click="sendText=true;emoiconExpand=false" :src="baseURL+'/keyboard%402x.png'" class="iconbtn"></image>
					<input v-if="sendText" v-model="inputText" confirm-type="send" type="text" @confirm="sendMessage" class="item inputArea">
					<view  v-else class="voiceArea" @touchstart="startRecord" @touchmove.stop="moveToCancel" @touchend="sendVoice">
						按住说话
					</view>
					<image :src="baseURL+'/face%402x.png'" @click="emoiconExpand=!emoiconExpand;sendText=true;showToolArea=false" class="item iconbtn"></image>
					<image :src="baseURL+'/add%402x.png'" @click="showToolArea=!showToolArea;emoiconExpand=false;sendText=true;" class="item iconbtn"></image>
				</view>
				<view class="faceArea" v-if="emoiconExpand">
					<image v-for="(icon,index) in emoicon" :key="index" :src="'http://card-1254165941.cosgz.myqcloud.com/emoticon/emoicon/' + icon.src" @click="appendEmoji(index)"/>
				</view>
				
				<view class="toolArea fx-row fx-row-center fx-wrap" v-if="showToolArea">
					<view class="toolItem fx-column fx-row-center" @click="sendPic">
						<image :src="baseURL+'/pic@2x.png'" mode=""></image>
						相册
					</view>
					<view class="toolItem fx-column fx-row-center" @click="sendVideo">
						<image :src="baseURL+'/camera@2x.png'" mode=""></image>
						拍摄
					</view>
					<view class="toolItem fx-column fx-row-center" @click="goTuan">
						<image :src="baseURL+'/tuan.png'" mode=""></image>
						开团
					</view>
					<view class="toolItem fx-column fx-row-center" @click="chooseLocation">
						<image :src="baseURL+'/location@2x.png'" mode=""></image>
						位置
					</view>
					<view class="toolItem fx-column fx-row-center" @click="kaiShop">
						<image :src="baseURL+'/shop.png'" mode=""></image>
						开店
					</view>
					
					<view class="toolItem fx-column fx-row-center" @click="publishClick">
						<image :src="baseURL+'/topic@2x.png'" mode=""></image>
						话题
					</view>
					<view class="toolItem fx-column fx-row-center" v-if="circle.memberType==1" @click="publishClass">
						<view class="image">
							<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/lesson.png" mode=""></image>
						</view>
						课程
					</view>
				</view>
				
			</view>
		</wx-view>


		<view class="transBox" @click="showTransBox=false"  v-if="showTransBox">
			<view class="box fx-row fx-row-center" :style="{'left':boxLeft+'px','top':boxTop+'px'}">
				<view class="set" @click="transMsg">转发</view>
				<view class="set" @click="deleteMsg">删除</view>
			</view>
			
		</view>
		<!-- 语音悬浮窗 -->

		<view class="voiceCtrlBox" id="voiceCtrlBox" v-if="showVoiceCtrl">
			<image class="voiceIcon" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/chat/voice.png" mode=""></image>
			<view class="text">{{cancelSend?'松开取消发送':'手指上滑，取消发送'}}</view>
		</view>
		
		<!-- 底部悬浮按钮 -->
		<template>
			<!-- <view class="invite" v-show="circle.mpCardCircle.joinType==4 && circle.mpCardCircle.pushMoneyStatus==1" @click="shareInvitePost">
				<template v-if="!annimating">
					<view v-if="!hasAnimated">邀请好友进群可立赚{{circle.mpCardCircle.percent}}元现金</view>
					<view v-else>邀请立赚</view>
				</template>
				
			</view> -->
			<view class="invite" @click="shareInvitePost">
				邀请好友
			</view>
			<view class="fbtn orange" v-if="currentUser.userType <= 1" @click="kaiShop">升级会员</view>
			<view class="fbtn orange" v-else @click="goTuan">快速开团</view>
		</template>
		
	</view>
</template>

<script>
	import chatMixins from '../_mixins/chatMixins.js'
	import CircleAvatar from "../../components/CircleAvatar";
	import chatItem from '../_components/chatitem.vue'
	export default {
	
		components: {
			CircleAvatar,
			chatItem
		},
		mixins:[chatMixins],
		data() {
			return {
				onlineSite: this.global.onlineSite,
				baseURL:"https://card-1254165941.cos.ap-guangzhou.myqcloud.com/chat",
				circleId: '',
				circle: {
					mpCardCircle: {},
				},
				sendText:true,
				showDropDown: false,
				needUpdate: true,
				currentPage: 1,
				loading: false,
				noMore: false,
				navActive:0,
				autoNext:true,
				shopId:0,
				pinList:[],
				hasAnimated:false,
				annimating:false,
				showTransBox:false,
				boxTop:0,
				boxLeft:0,
				actionIndex:null
			};
		},

		computed: {
			isShutUp(){
				return !this.hasManagePermission && this.circle.mpCardCircle.shutupStatus==1 && this.circle.memberType==2;
			},
			showInfoPanel(){
				return !this.emoiconExpand && !this.showToolArea;
			},			
			
			hasManagePermission() {
				return this.currentUser.id == this.circle.mpCardCircle.managerId;
			},
			isNeedApply() {
				return this.circle.mpCardCircle.joinType == 2
			},
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			},
			isPermitSee() {
				return Number(this.circle.mpCardCircle.isPermitSee) === 1
			},
			chatWindowHeight(){
				if(this.$store.state.systemInfo && this.$store.state.systemInfo.screenHeight){
					const sh  = this.$store.state.systemInfo.screenHeight;
					const sbh = this.$store.state.systemInfo.statusBarHeight;
					// #ifdef MP-WEIXIN
					if(this.$store.state.systemInfo.safeArea){
						var safeArea = this.$store.state.systemInfo.safeArea.bottom - this.$store.state.systemInfo.safeArea.height;
					}else var safeArea = 0;
					
					// #endif
					
					// #ifndef MP-WEIXIN
					var safeArea = 0;
					// #endif
					
					const innerHeight = this.showToolArea?98:0;
					
					return sh - sbh - uni.upx2px(88+300+190+44+20+106+60+safeArea-innerHeight);
				}else return uni.upx2px(466)
				
			}
		},

		onLoad(option) {
			uni.showLoading();
			// #ifdef MP-WEIXIN
			uni.hideShareMenu()
			// #endif
			
			this.emoicon = [
			]
			
			for (let i = 1; i < 100; i++) {
			  this.emoicon.push({ key: `\:[${i}]`, src: i + '.gif' })
			}
			
			setTimeout(()=>{
				this.annimating=true;
			},1000);
			
			setTimeout(()=>{
				this.hasAnimated=true;
				this.annimating=false;
			},3000);

			this.circleId = option.id;
			// this.fetchTopic();
			
			
		},

		onShow() {
			this.doLoginHandle(hasReg => {
				if (this.needUpdate) {
					this.fetch();
					this.needUpdate = false;
				} else this.hideLoading();

				if (uni.getStorageSync('_needVoiceList')) {
					this.list = [];
					this.currentPage = 1;
					this.noMore = false;
					this.navActive = 0;
					this.fetchTopic(0);
					uni.setStorageSync('_needVoiceList', false)
				}
				

				if (uni.getStorageSync('_needFetchTopic')) {
					this.list = [];
					this.currentPage = 1;
					this.noMore = false;
					this.navActive = 1;
					this.fetch();
					uni.setStorageSync('_needFetchTopic', false)
				} 
				
				if (uni.getStorageSync('_needFetchCourse')) {
					this.list = [];
					this.currentPage = 1;
					this.noMore = false;
					this.navActive = 2;
					this.fetch();
					uni.setStorageSync('_needFetchCourse', false)
				} 

			});

		},
		
		onHide(){
			if(this.$refs.vpanel && this.$refs.vpanel.status<=1){
				this.$refs.vpanel.reset();
			}else if(this.$refs.vpanel) this.$refs.vpanel.pauseVoice();
		},

		onShareAppMessage(res) {
			console.log(res)
			if (res.target.id.indexOf("shareBtn") != -1) {
				const id = res.target.id.split('Btn')[1];
				const title = this.circle.managerName;
				return {
					title: title + "邀请你开团",
					path: '/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id=' + id + '&recommendId=' +
						this.currentUser.id,
				}
			} else
				return {
					title: this.circle.mpCardCircle.name,
					path: '/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin?id=' + this.circleId + '&recommendId=' +
						this.currentUser.id,
				}
		},

		onReachBottom() {
			if (this.noMore || this.loading) return;
			this.fetchTopic(this.navActive);
			// this.list = this.list.concat();
		},

		methods: {
			goCourseDetail(id){
				uni.navigateTo({
					url:"../businessCC_CourseDetail/businessCC_CourseDetail?id="+id+"&circleId="+this.circleId+"&canEdit="+(this.circle.memberType==1?1:0)
					
				})
			},
			
			hidePanel(){
				if(this.emoiconExpand){
					this.emoiconExpand =false;
				}
					
				if(this.showToolArea){
					this.showToolArea =false;
				}
			},
			
			
			showTrans(e,index){
				console.log(e,index);
				if(index || index===0){
					this.boxLeft = e.detail.x - uni.upx2px(160);
					this.boxTop = e.detail.y - uni.upx2px(120);
					this.showTransBox = true;
					this.actionIndex = index;		
					
				}
			},
			
			goMorePin(){
				const mid = this.circle.mpCardCircle.managerId;
				uni.navigateTo({
					url:"../businessCC_MorePin/businessCC_MorePin?uid="+mid
				})
			},
		
			
			shareInvitePost(){
				
				uni.requestSubscribeMessage({
					tmplIds: ['cvBqennzFLLaoDP_5cklMF5Q-XStSnv8Uh4rkN5VfGU','9Ix6hSNi9bDiX09zssVrjel89TO1FDFdXiyjSD1q3Yo'],
					success(res) {
						console.log('test', res)
						this.shares=share
					}
				})
				this.$api.getCardCircleDetail(this.circleId).then(result => {

					this.navigateTo('/item_businessCardCircle/businessCC_invitePost/businessCC_invitePost',{
						id:this.circleId,
						intro:result.mpCardCircle.circleIntroduce,
						name:result.mpCardCircle.name,
						price:Number(result.mpCardCircle.joinType)>3?result.mpCardCircle.percent:0,
						post:result.isHeadImage==1?result.headImage[0]:null,
						subTitle:result.mpCardCircle.subheading
					})
					
					});
			
			},
			
			goShop(){
				const mid = this.circle.mpCardCircle.managerId;
				if(mid==this.currentUser.id){
					this.navigateTo('../../item_businessCard/businessCard_MyShop/businessCard_MyShop', {
						shopId: this.shopId,
						userId: mid,
						cardUserId: mid,
						recommendId: mid
					})
				}else{
					this.navigateTo('../../module/shop/home/home', {
						shopId: this.shopId,
						cardUserId: mid,
						recommendId: mid,
					});
				}	
			},
			
			
			
			retHome(){
				uni.switchTab({
					url:"/pages/businessCard/businessCard"
				})
			},
			
			sendHandle(e){
				//发送插入数据
				console.log(e)
				if(e && this.navActive==0) this.list.push(e)
			},
			
			playHandle(){
				if(this.$refs.vpanel && this.$refs.vpanel.status<=1){
					this.$refs.vpanel.reset();
				}else if(this.$refs.vpanel) this.$refs.vpanel.pauseVoice();
			},
			changeTitle(index){
				if(this.navActive==index) return
				
				this.list = [];
				this.currentPage = 1;
				this.loading = false;
				this.noMore = false;
				
				this.$nextTick(()=>{
					this.navActive = index;
					this.fetchTopic(index);
					if(index==0){
						this.fetchMessage();
					}
				})
			
			},
			
			//编辑资料
			goEditPage(){
				this.navigateTo('/item_businessCard/businessCard_EditCard/businessCard_EditCard')
			},
			
			//发布语音
			publishVoice() {
				if(this.isShutUp){
					return this.showTips("该群已禁言，无法发言");
				}
				
			},
			
			goPinDetail(id){
				uni.navigateTo({
					url:'/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id='+id
				})
			},

			//开通VIP
			businessCard_VIP() {
				this.navigateTo('/item_businessCard/businessCard_VIP/businessCard_VIP_New');
			},

			fetch() {
				this.showLoading();
				this.currentPage = 1;
				this.loading = false;
				this.noMore = false;
				// this.list = [];

				this.$api.getCardCircleDetail(this.circleId).then(result => {
					result.applyCount = Number(result.applyCount) || 0;
					//result.applyCount = 9;
					
					
					this.circle = result;
					if (!this.isPermitSee && !this.hasManagePermission) {
						//隐藏头像
						this.circle.detailImageList = this.circle.detailImageList.map(item =>
							'http://card-1254165941.cosgz.myqcloud.com/timg.jpeg');
					}
					//获取shopId
					const mid = this.circle.mpCardCircle.managerId;
					
					this.$api.getUserCardDetails2(mid).then(({userMap})=>{
						this.shopId = userMap.shopId;
					});
					//获取拼团商品
					this.$api.getMyAssembleList(1,mid).then(res=>{
						this.pinList = res.splice(0,5);
					})
					
					this.fetchTopic(this.navActive);
					
					this.fetchMessage();
						
					
					
				}).catch(error => {
					uni.hideLoading();
					this.showError(error)
				})



			},
			share() {
				let path = '/item_businessCardCircle/businessCC_InviteJoin/businessCC_InviteJoin?id=' + this.circleId +
					'&recommendId=' + this.currentUser.id;
				this.appShare(path);
			},



			fetchTopic(index=0) {
				if(index==0){
					return this.hideLoading();
				}
				
				if (this.loading) return;
			
				this.loading = true;
				const action = index==1?this.$api.listCircleTopic(this.circleId, this.currentPage):
								index==0?this.$api.circleVoiceList(this.circleId, this.currentPage):
								this.$api.getCourseList(this.circleId,this.currentPage);
				action.then(result => {
					this.hideLoading();
					this.loading = false;

					this.currentPage++;
					
					let list = index==1?result.circleTopicList:result||[];
					
					if(index==1){
						
						list.forEach(item => {
							item.time = this.formatDate(item.time, 'YYYY.MM.DD')
						});
					}
					
					if (list.length === 0) {
						this.noMore = true;
						return;
					}
					console.log(this.list)
					this.list = this.list.concat(list);

				}).catch(error => {
					this.loading = false;
					this.showTips('加载失败')
					console.error(error);
				})
			},

			//点击事件
			manageClick() { //管理圈子
				this.navigateTo('../businessCC_ManageCircle/businessCC_ManageCircle', {
					id: this.circleId
				});
			},
			auditClick() { //审核
				this.navigateTo('../businessCC_AuditApply/businessCC_AuditApply', {
					id: this.circleId
				});
			},
			lookClick() { //查看圈子成员
				this.navigateTo('../businessCC_CircleMember/businessCC_CircleMember', {
					id: this.circleId,
					isPermitSee: this.isPermitSee ? 1 : 0
				});
			},
			topicConClick(item) { //话题详情
				this.navigateTo('../businessCC_TopicDetail/businessCC_TopicDetail', {
					id: item.id
				});
			},
			erweimaClick() { //圈子二维码
				this.showDropDown = false;

				this.navigateTo('../businessCC_CircleCode/businessCC_CircleCode', {
					id: this.circleId
				});
			},
			publishClick() { //发布话题
				this.showToolArea= false;
				this.navigateTo('../businessCC_PublishTopic/businessCC_PublishTopic', {
					id: this.circleId
				});
			},

			publishClass() { //发布课程
				this.showToolArea= false;
				if(this.circle.isCourse==0){
					uni.showModal({
						content:"请先升级会员",
						showCancel:false,
						success: () => {
							uni.navigateTo({
								url:"/item_businessCard/businessCard_VIP/businessCard_VIP_New"
							})
						}
					})
					return
				}
				
				this.navigateTo('../businessCC_PublishClass/businessCC_PublishClass', {
					id: this.circleId
				});
			},
			complain() {
				this.showDropDown = false;
				this.navigateTo('/item_businessCardCircle/businessCC_Complain/businessCC_Complain', {
					circleId: this.circleId,
					circle: true
				});
			},

			deleteCircle() {

				this.showDropDown = false;

				const action = () => {
					uni.showLoading();
					this.$api.deleteCircle(this.circleId).then(result => {
						uni.hideLoading();
						this.$store.commit('setNeedCircleHomeUpdate', true)
						uni.switchTab({
							url: '/pages/businessCardCircle/businessCardCircle'
						})
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '提示',
					content: `确定删除圈？`,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},

			exit() {
				this.showDropDown = false;

				const action = () => {
					uni.showLoading();
					this.$api.secedeCardCircle(this.circleId).then(result => {
						uni.hideLoading();
						this.$store.commit('setNeedCircleHomeUpdate', true)
						uni.switchTab({
							url: '/pages/businessCardCircle/businessCardCircle'
						})
					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '提示',
					content: `确定退出圈子吗？`,
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},


		},
	}
</script>

<style lang="less" scoped>
	@import '../../css/mzl_base.less';
	
	@keyframes move{
		0%{
			width:265rpx;
			height:99rpx;
			right: 30rpx;
			border-radius:50rpx;
			line-height:38rpx;
			padding: 18rpx 13rpx 14rpx 38rpx;
		}
		
		40%{
			width:265rpx;
			height:99rpx;
			right: 30rpx;
			border-radius:50rpx;
			line-height:38rpx;
			padding: 18rpx 13rpx 14rpx 38rpx;
		}
		
		66%{
			right: 30rpx;
			border-radius:50rpx;
		}
		
		100%{
			width:100rpx;
			right: 30rpx;
		}
	
	
	}
	
	.page {
		width: 100%;
		min-height: 100vh;
		background: #F5F5F5;
		// position: relative;
		// padding-bottom: 100upx;
	
	
		.courseList{
			box-sizing: border-box;

			.courseItem{
				width: 330rpx;
				box-sizing: border-box;
				border: 1rpx solid #ddd;
				box-shadow: 1rpx 1rpx 10rpx 1rpx #ccc;
				position: relative;
				.chapterTip{
					position: absolute;
					right: 5rpx;
					top: 193rpx;
					color: white;
					font-size: 28rpx;
					background: rgba(0,0,0,0.3);
				}
				&:nth-of-type(n+3){
					margin-top: 30rpx;
				}
				.courseImage{
					width: 330rpx;
					height:  230rpx;
				}
				
			}
			.info{
				width: 100%;
				padding: 15rpx;
				
				.title{
					font-size: 28rpx;
					font-weight: bold;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				}
		}
	
		
		.fbtn{
			width: 100upx;
			height: 100upx;
			padding: 15upx 10upx;
			position: fixed;
			bottom: 277upx;
			bottom:calc(277rpx + constant(safe-area-inset-bottom));
			bottom:calc(277rpx + env(safe-area-inset-bottom));
			right: 29upx;
			background:rgba(107,120,250,1);
			font-size:32upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:32upx;
			text-align: center;
			border-radius: 50%;
			&.orange{
				// background:rgba(253,186,68,11);
				background: red;
				bottom: 163upx;
				bottom:calc(163rpx + constant(safe-area-inset-bottom));
				bottom:calc(163rpx + env(safe-area-inset-bottom));
			}
		}
		
		.invite{
			width:100rpx;
			height:100rpx;
			border-radius:50rpx;
			color:rgba(255,255,255,1);
			background:rgba(107,121,245,1);
			font-size:30rpx;
			font-family:PingFangSC-Light;
			font-weight:bold;
			box-sizing: border-box;
			line-height:36rpx;
			text-align: center;
			position: fixed;
			padding: 17rpx;
			right: 30rpx;
			bottom: 307rpx;
			bottom:calc(307rpx + constant(safe-area-inset-bottom));
			bottom:calc(307rpx + env(safe-area-inset-bottom));
			// animation: 2.5s move;
		}
		
		.voiceCtrlBox{
			width:361rpx;
			height:365rpx;
			background:rgba(0,0,0,1);
			opacity:0.54;
			border-radius:30rpx;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 176rpx;
			bottom:calc(176rpx + constant(safe-area-inset-bottom));
			bottom:calc(176rpx + env(safe-area-inset-bottom));
			z-index: 9999;
			.voiceIcon{
				width: 128rpx;
				height:186rpx;
				margin: 55rpx auto;
				display: block;
			}
			.text{
				font-size:32rpx;
				font-family:PingFangSC-Thin;
				font-weight:bold;
				color:rgba(255,255,255,1);
				// line-height:100rpx;
				text-align: center;
			}
		}
		
		
		.pinBox{
			width:690rpx;
			height:190rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 1rpx 13rpx 0px rgba(107,121,245,0.2);
			border-radius:10rpx;
			margin: 10rpx auto;
			box-sizing: border-box;
			padding: 21rpx;
			.title{
				font-size:30rpx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:18rpx;
			}
			.more{
				font-size:26rpx;
				font-family:PingFangSC-Thin;
				font-weight:bold;
				color:rgba(107,121,245,1);
				line-height:36rpx;
			}
			
			.item{
				margin-top: 8rpx;
				width:110rpx;
				height:110rpx;
				border-radius:12rpx;
				&:not(:nth-of-type(1)){
					margin-left: 24rpx;
				}
			}
		}
		

		.open-vip-container {
			padding-top: 20upx;
			line-height: 136upx;
			height: 156upx;
			text-align: center;

			.invite-banner {
				width: 680upx;
				height: 136upx;
				margin-top: 30upx auto;
			}

			>view {
				color: #333333;
				font-size: 28upx;
				line-height: 34upx;
				margin-top: 16upx;
				text-align: center;
			}
		}
	}

	.transBox{
		width: 100%;
		height: 100%;
		min-height: 100vh;
		position: fixed;
		left: 0;
		z-index: 99999;
		top: 0;
		.box{
			width: 320rpx;
			height: 70rpx;
			background: #333;
			position: absolute;
			// left: calc(271px - 160rpx);
			// top: (433px - 60rpx);
			border-radius: 15rpx;
			box-sizing: border-box;
			.set{
				color: white;
				
				font-size:25rpx;
				width:50%;
				text-align:center;
				height:50rpx;
				line-height:50rpx;
				&:nth-of-type(1){
					border-right: 1px white solid;
				}
					z-index: 99998;
			}
			&::before{
				content: "";
				width: 45rpx;
				height: 45rpx;
				position: absolute;
				left: calc(160rpx - 22.5rpx);
				background: #333;
				top:calc(70rpx - 25rpx);
				transform: rotate(45deg);
				z-index: 99997;
			}
		}
		
	}
	
	// 圈子头部名片信息
	.HeaderCardBox {
		width: 100%;
		height: 300upx;

		.headerCard {
			width: 100%;
			height: 250upx;
			padding: 30upx;
			background-size: 100%;
			background-repeat: no-repeat;

			.HcardContent {
				.flex();
				height: 220upx;
				font-size: 30upx;
				background: #fff;
				padding: 30upx;
				;
				margin: 30upx auto;
				border-radius: 8upx;
				box-shadow: 0px 2px 16px 4px rgba(141, 150, 224, 0.24);
				align-items: initial;

				.HCimage {
					width: 30%;
					text-align: left;

					image {
						width: 140upx;
						height: 140upx;
					}
				}

				.HCcenter {
					width: 64%;

					.Ctitle {
						color: @title;
						font-size: 30upx;
						font-weight: 900;
					}

					.CsubTitle {
						color: #666;
						font-size: @fsNum;
						padding: 5upx 0 15upx 0;
					}

					.Cmanage {
						color: #fff;
						font-size: @fsNum;
						display: flex;

						.CMcircle {
							.buttonRadius(152upx, 46upx, #6B7AF8);
							text-align: center;
							line-height: 48upx;
							margin-right: 24upx
						}

						.CMexamine {
							.buttonRadius(152upx, 46upx, @orange);
							text-align: center;
							line-height: 48upx;
							position: relative;
							margin-right: 24upx
						}

						.CMdelete {
							.buttonRadius(152upx, 46upx, #666);
							text-align: center;
							line-height: 48upx;

							&.or {
								background: rgba(255, 187, 69, 1);
								color: white;
								width: 200upx;
							}

						}
						.Cmtn {
							.buttonRadius(250upx, 60upx, #6B79F5);
							border-radius: 30rpx;
							line-height: 60upx;
							font-size:30rpx;
							font-family:PingFangSC-Light;
							font-weight:300;
							color:rgba(255,255,255,1);
							// word-spacing: 20rpx;
							letter-spacing: 10rpx;
							text-align: center;
							text-indent: 20rpx;
							// margin-left: 24upx;
						}

						.HCnum {
							.borderRadius(@w: 30upx);
							position: absolute;
							top: -16upx;
							right: -6upx;
							font-size: 23upx;
							color: #fff;
							text-align: center;
							line-height: 30upx;
						}
					}
				}

				.HCcode {
					width: 6%;
					position: relative;
					right: -20upx;

					image {
						width: 46upx;
						height: 46upx;
					}

					//                 width:6%;position: relative;top:-70upx;right:0;text-align: right;
					//                 image{width:6upx;height:28upx;}
					.more {
						position: relative;
						top: -40upx;
						left: 15upx;

						.dropDown {
							width: 280upx;
							position: absolute;
							top: 70upx;
							right: -10upx;
							background: rgba(255, 255, 255, 1);
							box-shadow: 0upx 1upx 8upx 0upx rgba(187, 187, 187, 0.55);
							z-index: 1000;
							zoom: 1;
							border-radius: 8upx;

							view {
								font-size: 28upx;
								color: #333333;
								line-height: 104upx;
								text-align: center;

								&:after {
									content: "";
									display: block;
									width: calc(~"100%"- 40upx);
									height: 2upx;
									background-color: #E1E1E1;
									margin-left: 20upx;
								}

								&:active {
									background-color: #eee;
								}

								&:last-child {
									&:after {
										display: none;
									}
								}
							}

							&:before {
								content: "";
								position: absolute;
								width: 0;
								height: 0;
								top: 0;
								right: -15upx;
								box-sizing: border-box;
								border: 16upx solid black;
								border-color: transparent transparent #fff #fff;
								transform-origin: 0 0;
								transform: rotate(135deg);
								// box-shadow: -1upx 1upx 8upx -1upx rgba(187, 187, 187, 0.55);
								box-shadow: -1upx 1upx 0upx rgba(187, 187, 187, 0.55);

							}
						}
					}
				}

			}
		}
	}

	// 圈内成员
	.cardPerson {
		.CPtitle {
			padding: 30upx;

			image {
				width: 27upx;
				height: 22upx;
				margin-right: 20upx;
			}

			text {
				color: @title;
				font-size: 30upx;
			}
		}

		.CPmemberList {
			padding: 0 30upx;

			.CPmember {
				.CPImageList {
					width: 100%;
					display: flex;
					justify-content: flex-start;

					image {
						width: 80upx;
						height: 80upx;
						margin-right: 22upx
					}
				}

				.CPnum {
					margin: 0;
					border: none;
					border-radius: 0;
					width: 80upx;
					height: 80upx;
					padding: 0;

					&:after {
						display: none;
					}

					.CPInvite {
						width: 80upx;
						height: 80upx;
						background: #6B7AF8;
						text-align: center;
						line-height: 80upx;
					}
				}
			}

			.CPseeMember {
				margin: 0 auto;
				height: 100upx;
				margin-top: 40upx;
				.buttonRadius(@w: 300upx;
				@h: 58upx;
				@bg: @orange;
				);
				//border: 1upx solid #BBBBBB;
				text-align: center;
				font-size: @fsNum;
				color: white;
				line-height: 58upx;
			}
		}
	}

	// 话题
	.topicBox {
		box-sizing: border-box;
		// margin-bottom: 150upx;
			position: relative;
		padding: 30upx;
		.chatWindow{
			width: 100%;
		
		
			
			
		}
		.tip{
			color: white;
			font-size: 23rpx;
			text-align: center;
			position: absolute;
			bottom: -5rpx;
			bottom: calc(-5rpx - constant(safe-area-inset-bottom));
			bottom: calc(-5rpx - env(safe-area-inset-bottom));
			background: #ccc;
			left: 50%;
			transform: translateX(-50%);
			white-space: nowrap;
			padding: 3rpx;
		}
		
		
		.topicTitle {
			margin-bottom: 15upx;
			height: 44rpx;
			.flex(@justCon: space-between);

			.TTtitle {
				image {
					width: 26upx;
					height: 26upx;
					margin-right: 20upx;
				}

				.TTname {
					font-size: 33upx;
					color:#AAAAAA;
					&.active{
						color: @title
					}
					&.voice{
						margin-left: 20upx;
						position: relative;
						.topicNum{
							position: absolute;
							right: 0;
							top: 0;
							min-width: 30rpx;
							height: 30rpx;
							font-size: 21rpx;
							text-align: center;
							line-height: 30rpx;
							background: red;
							border-radius: 50%;
							color: white;
						}
					}
				}
			}

			.topTotalNum {
				font-size: @fsNum;
				color: #666;
				text-align: right;
			}
		}

		.topicList {
			background: #fff;
			margin: 0 auto;
			margin-top: 30upx;
			border-radius: 10upx;
			padding: 30upx;

			.TLlist {
				display: flex;

				.TLimage {
					width: 43%;
					text-align: left;

					image {
						width: 240upx;
						height: 180upx;
						vertical-align: middle;
					}
				}

				.TLtitle {
					flex: 1;

					.TLtname {
						width: 100%;
						font-size: 30upx;
						color: @title;
						font-weight: 900;
						height: 150upx;
						text-overflow: ellipsis;
						line-height: 50upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.TLtimeNum {
						.flex(@justCon: space-between);
						font-size: @fsNum;
						color: @logoNote;
						height: 35upx;

						.TLnum {
							width: 50%;
							text-align: right;
							display: flex;

							image {
								width: 24upx;
								height: 24upx;
								vertical-align: middle;
								margin-right: 4upx
							}

							.TlImageMess {
								width: 50%;
								text-align: right;
							}

							.TLImageGive {
								width: 50%;
								text-align: right;
							}
						}
					}
				}
			}

			.topicCard {
				width: 100%;
				margin-top: 30upx;
				;
				padding: 20upx 30upx 0 10upx;
				border-top: 1upx solid @grayBg;

				image {
					width: 50upx;
					height: 50upx;
					vertical-align: middle;
					display: inline-block;
					margin-right: 30upx;
				}

				.topicCname {
					font-size: @fsNum;
					color: #666;
				}
			}
		}
	}

	// 发布话题
	.publishTopic {
		width:100%;
		z-index: 999;
		background: #fff;
		font-size: @fsContentTitle;
		margin: 0 auto;
		position: fixed;
		bottom: 0;
		border-top: 1upx solid #EEEEEE;
		background:rgba(240,240,240,1);
		
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);
		.item{
			margin-left: 18rpx;
		}
		
		.iconbtn{
			width: 52rpx;
			height: 52rpx;
		}
		
		.inputbar{
			height:106rpx;
			background: white;
		    padding: 0 19rpx;
		}
		.inputArea{
			width:496rpx;
			height:76rpx;
			box-sizing: border-box;
			background:rgba(240,240,240,1);
			border-radius:12rpx;
			padding-left: 15rpx;
		}
		
		
		.toolArea{
			width:100%;
			height:380rpx;
			background:rgba(240,240,240,1);
			box-sizing: border-box;
			padding: 0 68rpx;
			.toolItem{
				width: 25%;
				image{
					width: 105rpx;
					height: 105rpx;
					margin-bottom: 10rpx;
				}
				.image{
					width: 105rpx;
					height: 105rpx;
					background: white;
					margin-bottom: 10rpx;
					border-radius: 15rpx;
					image{
						width: 55rpx;
						height: 55rpx;
						margin: 25rpx auto;
						margin-bottom: 10rpx;
					}
				}
				
				font-size:28rpx;
				font-family:PingFangSC-Thin;
				font-weight:bold;
				color:rgba(127,127,127,1);
				text-align: center;
			}
			
		}
		
		.voiceArea{
			width:496rpx;
			height:76rpx;
			background:rgba(215,215,215,1);
			border-radius:12rpx;
			text-align: center;
			margin-left: 18rpx;
			line-height: 76rpx;
			font-size:32rpx;
			font-family:PingFangSC-Thin;
			font-weight:bold;
			color:rgba(0,0,0,1);

		}
		
		.faceArea{
			height: 478upx;
			display: flex;
			flex-wrap: wrap;
			padding: 10upx;
			box-sizing: border-box;
			overflow-y: auto;
			justify-content: center;
			
			image {
			  display: inline-block;
			  width: 56upx;
			  height: 56upx;
			  margin-right: 8upx;
			  margin-bottom: 8upx;
			}
			
		}
	}

	.dropDownBackground {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
	}
</style>
