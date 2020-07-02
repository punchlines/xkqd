<template>
	<view class="container page">
		<title-bar title="社群详情"></title-bar>
		<!--圈子标题  -->
		<!-- 圈子头部名片信息 -->
		<template v-if="showInfoPanel">
			<view class="HeaderCardBox">
				<!-- style="background-image: url('http://card-1254165941.cosgz.myqcloud.com/cardImages/images/bgcc.png');" -->
				<view class="headerCard top">
					<view class="HcardContent">
						<!-- <view class="HCimage">
							<circle-avatar :avatar="circle.mpCardCircle.headImage" :images="circle.headImage"></circle-avatar>
						</view> -->
						<view class="HCcenter">
							<view class="Ctitle single-line">{{ circle.title}}( {{circle.memberNum}} ) </view>
							<view class="CsubTitle">ID：{{ circle.number }}</view>

							<wx-view custom-class="Cmanage">
								<view class="Cmanage">
									<view class="Cmtn" @click="goEditPage">编辑资料</view>
									<view class="Cmtn" v-if="shopId!=0" @click="goShop">群主的店</view>
									<view class="Cmtn" @click="goMorePin">拼团赚佣</view>
									<view class="Cmtn" @click="shareInvitePost">邀请好友</view>
								</view>
								<view class="tishi" v-if="circle.mproveDataStatus==0" @click="circle.mproveDataStatus=2">完善资料能提升90%让别人认识您噢</view>
								<view class="tishi" v-if="three">完善资料能提升90%让别人认识您噢</view>
							</wx-view>

						</view>
						<wx-view custom-class="HCcode">
							<template>
								<view class="message" v-if="navActive==0&&circle.topicStatus==0" @click="refurbish">
									<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.1gX2h2R1PokW7c82ab718fed535ec59335f62a209436.png"
									 style="width: 39rpx;height: 39rpx; position: absolute;right: 51rpx;top: 60rpx;"></image>

									<text style="font-size: 16px;position: absolute;right: -43rpx;width: 80rpx; top: 56rpx;">刷新</text>
								</view>
							</template>
						</wx-view>
						<wx-view custom-class="HCcode">
							<!-- 	<view v-if="hasManagePermission">
								<image @click="erweimaClick" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/erweima.png'"></image>
							</view> -->
							<template @click="manageClick">
								<view v-if="circle.applyNum>0" style="position: absolute; width: 17rpx; height: 17rpx; background-color: #E02E24; border-radius: 12px;right: -30rpx;z-index: 999;text-align: center;line-height: 32rpx;">
									<!-- {{circle.applyNum}} -->
								</view>
								<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.I3WzZyKQ03fve19662e8fea60cfa892d481f12944e37.png'"
								 mode="aspectFit" @click="manageClick" style="position: absolute; right: 50rpx; top: 6rpx;"></image>
								<text style="position: absolute; right: -32rpx;width: 70rpx; font-size: 16px; top: 1rpx;" @click="manageClick">更多</text>
							</template>

						</wx-view>

					</view>
				</view>
			</view>

			<!-- <view class="pinBox">
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
				
			</view> -->

		</template>

		<!-- 话题 -->
		<view class="topicBox" @click="hidePanel">
			<view class="topicTitle fx-row fx-row-center">
				<view class="TTtitle fx-row fx-row-center gird-60">
					<!-- || hasManagePermission || circle.memberType!=2 -->
					<image v-if="circle.topicStatus==0 " :src="navActive==0?'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.JhY1FabkIoNlf257fae0171862d93ce481f9bdc518c8.png':'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.erCZdjfj8h642f2c0d2be7f99efe6e73e8dc4b73b3bd.png'"></image>
					<view class="TTname fs3a30" :class="{'active':navActive==0}" @click="changeTitle(0)" v-if="circle.topicStatus==0 ">消息
						<view :style="navActive==0? 'width: 50rpx; height: 2px; background-color:#2EA1FF; margin: 10rpx auto; border-radius: 2rpx;':'width: 50rpx; height: 2px;margin: 10rpx auto;'"></view>
					</view>
					<image :src="navActive==1?'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.QMsl6UxrQmU6a9711919f1a5810dd2475ff8c029348a.png':'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.m0jCRoglpEbJe135bf12634a2472ef7df6ddddd933b8.png'"></image>
					<view class="TTname fs3a30 voice" :class="{'active':navActive==1}" @click="changeTitle(1,circle.topicStatus)">
						需求 ({{ circle.topicNum }})
						<!-- v-if="circle.topicStatus==0 || hasManagePermission || circle.memberType!=2" -->
						<!-- <view class="topicNum">1</view> -->
						<view :style="navActive==1? 'width: 50rpx; height: 2px; background-color:#2EA1FF; margin: 10rpx auto; border-radius: 2rpx;':'width: 50rpx; height: 2px;margin: 10rpx auto;'"></view>
					</view>
					<image :src="navActive==2?'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.es0BCR3jSORC621fec1f0df598f4e7fa36f2dc11bb25.png':'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.bxGTJvsdZ0vg073e86cd98d1677a8cded32e08995dd4.png'"></image>
					<view class="TTname fs3a30 voice" :class="{'active':navActive==2}" @click="changeTitle(2)">
						视频 ({{ circle.courseNum }})
						<!-- <view class="topicNum">1</view> -->
						<view :style="navActive==2? 'width: 50rpx; height: 2px; background-color:#2EA1FF; margin: 10rpx auto; border-radius: 2rpx;':'width: 50rpx; height: 2px;margin: 10rpx auto;'"></view>
					</view>
					<!-- <text v-else class="TTname fs3a30">拼团商品信息</text> -->
				</view>
				<!-- <view class="topTotalNum gird-40">总浏览量{{ circle.mpCardCircle.pageView }}</view> -->
				<!-- <view  v-else class="topTotalNum">倒计时中</view> -->
			</view>

			<!-- 语音列表 -->
			<!-- :scroll-into-view="lastMsgId" -->
			<scroll-view class="chatWindow" @scrolltoupper="fetchMessage" :scroll-into-view="lastMsgId" scroll-y :style="{'height':chatWindowHeight+'px'}"
			 v-if="navActive==0&&circle.topicStatus==0 ">
				<view v-for="(item,index) in list" :key="index" :id="'msg'+index">
					<chat-item @longClick="showTrans($event,index)" :item="item" @playVideo="playVideo(index)" @play="playVoice(index)"
					 :reserve="item.own" :userId="userId"></chat-item>
				</view>
			</scroll-view>

			<!-- <view class="tip" v-if="navActive==0">禁止分享黄赌毒等非法文字图片以及链接,禁止讨论政治问题</view> -->

			<video id="myVideo" @fullscreenchange="exitFullScreen" style="position: absolute;top: -9999px;left:-9999px" v-show="showVideo"
			 :src="src"></video>

			<!-- 话题列表 -->
			<template v-if="navActive==1">
				<view class="talkList">
					<view class="topicList" v-for="(item, index) in list" :key="index">
						<!-- 语音item -->
						<view class="topicCard">
							<view @click="goCard(item.userId)">
								<image :src="item.headImage"></image>
							</view>
							<view class="TLtime">
								<text class="topicCname">{{ item.userName }}</text>
								<text class="TLtime">{{ item.time }}</text>
							</view>
							<view class="TLImageGive">
								<template v-if="item.praiseType == 0">
									<view @click="onLike(index)">
										<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ILlKusvnJgUN60380a2b88e427e64d848b91e3d506f4.png'"></image>
										{{ item.praiseCount }}
									</view>
								</template>
								<template v-else>
									<view @click="onLike(index)">
										<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.nol02scBedA56d1d0a155f28065bdc2ed8037dfb2d74.png'"></image>
										{{ item.praiseCount }}
									</view>
								</template>
							</view>
							<view class="TlImageMess" @click="topicConClick(item)">
								<image class="" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.tYLrToOAWPSe74d06d23a07ef0b6dda7102684ef1e06.png'"></image>
								{{ item.commentCount }}
							</view>

						</view>
						<view class="TLlist fx-row" @click="topicConClick(item)">
							<view class="TLtitle">
								<view class="TLtname">{{ item.content }} </view>
							</view>
							<view class="TLimage" v-if="item.images.length==1">
								<image :src="item.images" mode="aspectFill"></image>
							</view>
							<view class="TLimages" v-if="item.images.length>1">
								<image :src="item" mode="aspectFill" v-for="(item,index) in item.images" :key="index"></image>
							</view>
						</view>


					</view>
				</view>
				<view style="position: fixed; bottom:0; height: 118rpx; padding-top: 18rpx; background-color: #ffff; width: 100%;">
					<view style="margin: 0 auto; border-radius: 44rpx; width: 90%; text-align: center; height: 88rpx; color: #fff; line-height: 88rpx; background-color: #47ACFF;"
					 @click="publishClick"> 发布需求</view>
				</view>
			</template>


			<!-- 课程列表 -->
			<view class="courseList  fx-row fx-wrap fx-row-space-around" v-if="navActive==2">


				<view class="courseItem" v-for="(item,index) in list" :key="index" @click="goCourseDetail(item.id)">
					<!-- {{1}} -->
					<view style="position: relative; display: flex;">
						<image :src="item.cover" class="courseImage" mode=""></image>
						<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Diy5vaCCRaLX38e1aca00bc48288d1d3d8000a71f585.png" style="width: 80rpx; height: 80rpx; position: absolute; top: 0px; right: 0px; bottom: 0px; right: 0px; margin: auto; left: 0px;"></image>
					</view>
					<view class="chapterTip">{{item.num}}视频</view>
					<view class="info">
						<view class="title">{{item.courseName}}</view>
					</view>

				</view>
			</view>

		</view>
		<!-- 工具栏 -->
		<wx-view v-if="navActive==0 &&circle.topicStatus==0">
			<view class="publishTopic">
				<view class="inputbar fx-row fx-row-center">
					<image v-if="sendText" @click="sendText=false;emoiconExpand=false;showToolArea=false" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.C3DWceBaBOBY244dad637c3ae5b4482dd6c66a3595ef.png'"
					 class="iconbtn"></image>
					<image v-else @click="sendText=true;emoiconExpand=false" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.RbBCci0DAAFiecd4b3f481035400d2e1d6f21b7ea697.png'"
					 class="iconbtn"></image>
					<input v-if="sendText" v-model="inputText" confirm-type="send" type="text" @confirm="sendMessage" class="item inputArea">
					<view v-else class="voiceArea" @touchstart="startRecord" @touchmove.stop="moveToCancel" @touchend="sendVoice">
						按住说话
					</view>
					<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.jq83GPm5B2FAb880532286290eef347e47c1c6c96c9a.png'"
					 @click="emoiconExpand=!emoiconExpand;sendText=true;showToolArea=false" class="item iconbtn"></image>
					<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.qp1jHFi1Yoq383a6278c08d3bbfe1a9c9909bb3a61a4.png'"
					 @click="showToolArea=!showToolArea;emoiconExpand=false;sendText=true;" class="item iconbtn"></image>
				</view>
				<view class="faceArea" v-if="emoiconExpand">
					<image v-for="(icon,index) in emoicon" :key="index" :src="'http://card-1254165941.cosgz.myqcloud.com/emoticon/emoicon/' + icon.src"
					 @click="appendEmoji(index)" />
				</view>

				<view class="toolArea fx-row fx-row-center fx-wrap" v-if="showToolArea">
					<view class="toolItem fx-column fx-row-center" @click="sendPic">
						<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.gltnKwEKJpKf710652d1d3933788ee737b7843dacc3d.png'"
						 mode=""></image>
						相册
					</view>
					<view class="toolItem fx-column fx-row-center" @click="sendVideo">
						<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.JndyfYLJTGiV9556b16a8dd50d4b404ac74868787af7.png'"
						 mode=""></image>
						拍照
					</view>
					<view class="toolItem fx-column fx-row-center" @click="chooseLocation">
						<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.UkCWsG5uxbTif4c659b955a49c828274a2e45cef1067.png'"
						 mode=""></image>
						位置
					</view>
					<view class="toolItem fx-column fx-row-center" @click="kaiShop">
						<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.dQkWWB0srsnla0e6d28f7724a31f6f9ca2fedb6ed99a.png'"
						 mode=""></image>
						店铺
					</view>
					<view class="toolItem fx-column fx-row-center" @click="publishClick">
						<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.q3rZHQgFtIkF5531f1b4f044f6e7c95a7d988fd30fc7.png'"
						 mode=""></image>
						需求
					</view>
					<!-- v-if="circle.memberType==1" -->
					<view class="toolItem fx-column fx-row-center" @click="publishClass" v-if="circle.isManager==1">
						<view class="image">
							<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.f1pkBtIlaDXQ241755fbd510435b327c37fb3b109b92.png"
							 mode=""></image>
						</view>
						课程
					</view>
					<!-- <view class="toolItem fx-column fx-row-center" @click="goTuan">
						<image :src="baseURL+'/tuan.png'" mode=""></image>
						开团
					</view> -->
				</view>

			</view>
		</wx-view>


		<view class="transBox" @click="showTransBox=false" v-if="showTransBox">
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
			<view class="invite" @click="publishClass" v-if="circle.isManager==1">
				<text style="font-size: 10px;z-index: 10;position: absolute;bottom: 43rpx;left: 34rpx;color: #D73A49;">发布视频</text>
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.J7Zc0NUU58yA14eaafee06827da2c855d429eac0a635.png"
				 style="width: 105rpx; height: 125rpx;"></image>
			</view>
			<!-- <view class="fbtn orange" v-if="currentUser.userType <= 1" @click="kaiShop">升级会员</view> -->
			<view class="fbtn orange" @click="publishClick">
				<text style="font-size: 10px;z-index: 10;position: absolute;bottom: 43rpx;left: 34rpx;color: #FCB82F;">发布需求</text>
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.5DdQ5HXaKgdl363179acbf37c6e25c0ef92425ab4b5c.png"
				 style="width: 105rpx; height: 125rpx;"></image>
			</view>
			<view class="fbtn blue" @click="navigateTo('/item_businessCardCircle/businessCC_CreateCircle/businessCC_CreateCircle')">
				<text style="font-size: 10px;z-index: 10;position: absolute;bottom: 43rpx;left: 34rpx;color: #2294E1;">新建社群</text>
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.PTD6H2rUj3UZ6ae67f4ef8314ecb765de9d62f239a6f.png"
				 style="width: 105rpx; height: 125rpx;"></image>
			</view>
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
		mixins: [chatMixins],
		data() {
			return {
				onlineSite: this.global.onlineSite,
				baseURL: "https://card-1254165941.cos.ap-guangzhou.myqcloud.com/chat",
				circleId: '',
				circle: {
					mpCardCircle: {},
				},
				sendText: true,
				showDropDown: false,
				needUpdate: true,
				currentPage: 1,
				loading: false,
				noMore: false,
				navActive: 0,
				autoNext: true,
				shopId: 0,
				pinList: [],
				hasAnimated: false,
				annimating: false,
				showTransBox: false,
				boxTop: 0,
				boxLeft: 0,
				actionIndex: null,
				userId: '',
				tips: true,
				three: false,
			};
		},

		computed: {
			isShutUp() {
				return this.circle.isManager == 0 && this.circle.shutupStatus == 1 //&& this.circle.userType == 2;!this.hasManagePermission
			},
			showInfoPanel() {
				return !this.emoiconExpand && !this.showToolArea;
			},

			hasManagePermission() {
				// return this.currentUser.id == this.circle.mpCardCircle.managerId;
				return this.currentUser.id == this.circle.userId;
			},
			isNeedApply() {
				return this.circle.joinType == 2
			},
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			},
			isPermitSee() {
				return Number(this.circle.isPermitSee) === 1
			},
			chatWindowHeight() {
				if (this.$store.state.systemInfo && this.$store.state.systemInfo.screenHeight) {
					const sh = this.$store.state.systemInfo.screenHeight;
					const sbh = this.$store.state.systemInfo.statusBarHeight;
					// #ifdef MP-WEIXIN
					if (this.$store.state.systemInfo.safeArea) {
						var safeArea = this.$store.state.systemInfo.safeArea.bottom - this.$store.state.systemInfo.safeArea.height;
					} else var safeArea = 0;

					// #endif

					// #ifndef MP-WEIXIN
					var safeArea = 0;
					// #endif

					const innerHeight = this.showToolArea ? 98 : 0;

					return sh - sbh - uni.upx2px(88 + 250 + 44 + 106 + safeArea - innerHeight);
				} else return uni.upx2px(466)

			}
		},

		onLoad(option) {
			uni.showLoading();
			// #ifdef MP-WEIXIN
			uni.hideShareMenu()
			// #endif

			this.emoicon = []

			for (let i = 1; i < 100; i++) {
				this.emoicon.push({
					key: `\:[${i}]`,
					src: i + '.gif'
				})
			}

			setTimeout(() => {
				this.annimating = true;
			}, 1000);

			setTimeout(() => {
				this.hasAnimated = true;
				this.annimating = false;
			}, 3000);

			this.circleId = option.id;
			// this.fetchTopic();

			this.userId = uni.getStorageSync('userId');
			uni.startPullDownRefresh();
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
					//console.log(123)
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
				console.log(this.circle.topicStatus)
			});

		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			uni.showLoading()
			this.list = [];
			this.currentPage = 1;
			this.loading = false;
			this.noMore = false;
			if (this.navActive == 0) {
				this.fetchMessage()
			} else {
				this.fetchTopic(this.navActive);
			}

			uni.hideLoading()
			// uni.showToast({
			// 	title:'刷新成功',
			// 	duration:2000
			// })
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onHide() {
			if (this.$refs.vpanel && this.$refs.vpanel.status <= 1) {
				this.$refs.vpanel.reset();
			} else if (this.$refs.vpanel) this.$refs.vpanel.pauseVoice();
		},

		onShareAppMessage(res) {
			console.log(res)
			if (res.target.id.indexOf("shareBtn") != -1) {
				const id = res.target.id.split('Btn')[1];
				const title = this.circle.title;
				return {
					title: title + "邀请你开团",
					path: '/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id=' + id + '&recommendId=' +
						this.currentUser.id,
				}
			} else
				return {
					title: this.circle.title,
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
			goCourseDetail(id) {
				//memberType
				uni.navigateTo({
					url: "../businessCC_CourseDetail/businessCC_CourseDetail?id=" + id + "&circleId=" + this.circleId + "&canEdit=" +
						(this.circle.isManager == 1 ? 1 : 0)

				})
			},
			goCard(id) {
				console.log(id)
				uni.navigateTo({
					url: "../../pages/businessCard2/businessCard2?cardUserId=" + id

				})
			},
			onLike(index) {
				if (!this.checkHasLogin()) {
					return;
				}
				this.list[index].praiseType = Number(this.list[index].praiseType) ? 0 : 1;
				this.list[index].praiseCount += Number(this.list[index].praiseType) ? 1 : -1
				this.$api.praise(this.list[index].id, 5).catch(error => {
					this.showError(error);
				})
			},
			hidePanel() {
				if (this.emoiconExpand) {
					this.emoiconExpand = false;
				}

				if (this.showToolArea) {
					this.showToolArea = false;
				}
			},


			showTrans(e, index) {
				console.log(e, index);
				if (index || index === 0) {
					this.boxLeft = e.detail.x - uni.upx2px(160);
					this.boxTop = e.detail.y - uni.upx2px(120);
					this.showTransBox = true;
					this.actionIndex = index;

				}
			},

			goMorePin() {
				// const mid = this.circle.mpCardCircle.managerId;
				const mid = this.circle.userId;
				uni.navigateTo({
					url: "../businessCC_MorePin/businessCC_MorePin?uid=" + mid
				})
			},


			shareInvitePost() {
				//'cvBqennzFLLaoDP_5cklMF5Q-XStSnv8Uh4rkN5VfGU', 
				uni.requestSubscribeMessage({
					tmplIds: ['9Ix6hSNi9bDiX09zssVrjel89TO1FDFdXiyjSD1q3Yo'],
					success(res) {
						console.log('test', res)
						this.shares = share
					}
				})
				this.$api.getCardCircleDetail(this.circleId).then(result => {

					this.navigateTo('/item_businessCardCircle/businessCC_invitePost/businessCC_invitePost', {
						id: this.circleId,
						intro: result.mpCardCircle.circleIntroduce,
						name: result.mpCardCircle.name,
						price: Number(result.mpCardCircle.joinType) > 3 ? result.mpCardCircle.percent : 0,
						post: result.isHeadImage == 1 ? result.headImage[0] : null,
						subTitle: result.mpCardCircle.subheading
					})

				});

			},

			goShop() {
				//const mid = this.circle.mpCardCircle.managerId;
				const mid = this.circle.userId;
				if (mid == this.currentUser.id) {
					this.navigateTo('../../item_businessCard/businessCard_MyShop/businessCard_MyShop', {
						shopId: this.shopId,
						userId: mid,
						cardUserId: mid,
						recommendId: mid
					})
				} else {
					this.navigateTo('../../module/shop/home/home', {
						shopId: this.shopId,
						cardUserId: mid,
						recommendId: mid,
					});
				}
			},



			retHome() {
				uni.switchTab({
					url: "/pages/businessCard/businessCard"
				})
			},

			sendHandle(e) {
				//发送插入数据
				console.log(e)
				if (e && this.navActive == 0) this.list.push(e)
			},

			playHandle() {
				if (this.$refs.vpanel && this.$refs.vpanel.status <= 1) {
					this.$refs.vpanel.reset();
				} else if (this.$refs.vpanel) this.$refs.vpanel.pauseVoice();
			},
			changeTitle(index, topicStatus) {
				if (this.navActive == index) return
				console.log(this.navActive)
				this.list = [];
				this.currentPage = 1;
				this.loading = false;
				this.noMore = false;

				this.$nextTick(() => {
					this.navActive = index;
					this.fetchTopic(index);
					if (index == 0) {
						this.fetchMessage();

					}
				})

			},

			//编辑资料
			goEditPage() {
				this.navigateTo('/item_businessCard/businessCard_EditCard/businessCard_EditCard')
			},

			//发布语音
			publishVoice() {
				if (this.isShutUp) {
					return this.showTips("该群已禁言，无法发言");
				}

			},

			goPinDetail(id) {
				uni.navigateTo({
					url: '/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id=' + id
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

				this.$api.getCardCircleInfo(this.circleId).then(result => {
					// result.applyCount = Number(result.applyCount) || 0;
					//result.applyCount = 9;


					this.circle = result

					console.log(this.circle, this.circle.userId)
					if (this.circle.mproveDataStatus == 1) {
						this.three = true
						setTimeout(() => {
							this.three = false
						}, 3000)
					}

					// if (!this.isPermitSee && !this.hasManagePermission) {
					// 	//隐藏头像
					// 	this.circle.detailImageList = this.circle.detailImageList.map(item =>
					// 		'http://card-1254165941.cosgz.myqcloud.com/timg.jpeg');
					// }
					//获取shopId
					//const mid = this.circle.mpCardCircle.managerId;
					const mid = this.circle.userId;
					this.$api.getUserCardDetails2(mid).then(({
						userMap
					}) => {
						this.shopId = userMap.shopId;
					});
					//获取拼团商品
					this.$api.getMyAssembleList(1, mid).then(res => {
						this.pinList = res.splice(0, 5);
					})
					if (this.circle.topicStatus == 1) {
						this.navActive = 1
						this.loading = true;
						this.$api.listCircleTopic(this.circleId, this.currentPage)
							.then(result => {
								this.loading = false;
								this.currentPage++;
								let list = result.circleTopicList
								list.forEach(item => {
									item.time = this.formatDate(item.time, 'MM月DD日HH:MM')
									if (item.images) {
										item.images = JSON.parse(item.images)
									}
								});
								this.list = []
								this.list = list;
								console.log(list)
							})
							.catch(err => {
								this.loading = false;
								this.showTips('加载失败')
							})
					}
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
			fetchTopic(index = 0) {
				if (index == 0) {
					return this.hideLoading();
				}
				console.log(1)
				if (this.loading) return;

				this.loading = true;
				const action = index == 1 ? this.$api.listCircleTopic(this.circleId, this.currentPage) :
					index == 0 ? this.$api.circleVoiceList(this.circleId, this.currentPage) :
					this.$api.getCourseList(this.circleId, this.currentPage);
				action.then(result => {
					this.hideLoading();
					this.loading = false;

					this.currentPage++;

					let list = index == 1 ? result.circleTopicList : result || [];

					if (index == 1) {

						list.forEach(item => {
							item.time = this.formatDate(item.time, 'MM月DD日HH:MM')
							if (item.images) {
								item.images = JSON.parse(item.images)
							}

						});
					}

					if (list.length === 0) {
						this.noMore = true;
						return;
					}
					console.log(list)
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
				this.showToolArea = false;
				this.navigateTo('../businessCC_PublishTopic/businessCC_PublishTopic', {
					id: this.circleId
				});
			},

			publishClass() { //发布课程
				this.showToolArea = false;
				if (this.circle.isCourse == 0) {
					uni.showModal({
						content: "请先升级会员",
						showCancel: false,
						success: () => {
							uni.navigateTo({
								url: "/item_businessCard/businessCard_VIP/businessCard_VIP_New"
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
			//刷新消息
			refurbish() {
				uni.showLoading()
				this.list = [];
				this.currentPage = 1;
				this.loading = false;
				this.noMore = false;
				this.fetchMessage()
				this.lastMsgId = 'msg' + this.list.length - 1
				uni.hideLoading()
				uni.showToast({
					title: '刷新成功',
					duration: 2000
				})
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

	@keyframes move {
		0% {
			width: 265rpx;
			height: 99rpx;
			right: 30rpx;
			border-radius: 50rpx;
			line-height: 38rpx;
			padding: 18rpx 13rpx 14rpx 38rpx;
		}

		40% {
			width: 265rpx;
			height: 99rpx;
			right: 30rpx;
			border-radius: 50rpx;
			line-height: 38rpx;
			padding: 18rpx 13rpx 14rpx 38rpx;
		}

		66% {
			right: 30rpx;
			border-radius: 50rpx;
		}

		100% {
			width: 100rpx;
			right: 30rpx;
		}


	}

	.page {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		// position: relative;
		// padding-bottom: 100upx;


		.courseList {
			box-sizing: border-box;
			padding: 20rpx 0rpx;
			background-color: #f5f5f5;

			.courseItem {
				width: 330rpx;
				box-sizing: border-box;
				position: relative;
				.chapterTip {
					position: absolute;
					right: 15rpx;
					top: 182rpx;
					color: white;
					font-size: 28rpx;
				}

				&:nth-of-type(n+3) {
					margin-top: 30rpx;
				}

				.courseImage {
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					width: 330rpx;
					height: 230rpx;
				}

			}

			.info {
				width: 100%;
				padding: 15rpx;
				background-color: white;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
				.title {
					font-size: 28rpx;
					font-weight: bold;
					text-overflow: ellipsis;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}


		.fbtn {
			position: fixed;
			right: 0rpx;
			padding: 17rpx;
			line-height: 36upx;

			&.blue {
				bottom: 350upx;
			}

			&.orange {
				// background:rgba(253,186,68,11);
				bottom: 200upx;
			}
		}

		.invite {
			line-height: 36rpx;
			position: fixed;
			padding: 17rpx;
			right: 0rpx;
			bottom: 500rpx;

			// animation: 2.5s move;
		}

		.voiceCtrlBox {
			width: 361rpx;
			height: 365rpx;
			background: rgba(0, 0, 0, 1);
			opacity: 0.54;
			border-radius: 30rpx;
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 176rpx;
			bottom: calc(176rpx + constant(safe-area-inset-bottom));
			bottom: calc(176rpx + env(safe-area-inset-bottom));
			z-index: 9999;

			.voiceIcon {
				width: 128rpx;
				height: 186rpx;
				margin: 55rpx auto;
				display: block;
			}

			.text {
				font-size: 32rpx;
				font-family: PingFangSC-Thin;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				// line-height:100rpx;
				text-align: center;
			}
		}


		.pinBox {
			width: 690rpx;
			height: 190rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1rpx 13rpx 0px rgba(107, 121, 245, 0.2);
			border-radius: 10rpx;
			margin: 10rpx auto;
			box-sizing: border-box;
			padding: 21rpx;

			.title {
				font-size: 30rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 18rpx;
			}

			.more {
				font-size: 26rpx;
				font-family: PingFangSC-Thin;
				font-weight: bold;
				color: rgba(107, 121, 245, 1);
				line-height: 36rpx;
			}

			.item {
				margin-top: 8rpx;
				width: 110rpx;
				height: 110rpx;
				border-radius: 12rpx;

				&:not(:nth-of-type(1)) {
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

	.transBox {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		position: fixed;
		left: 0;
		z-index: 99999;
		top: 0;

		.box {
			width: 320rpx;
			height: 70rpx;
			background: #333;
			position: absolute;
			// left: calc(271px - 160rpx);
			// top: (433px - 60rpx);
			border-radius: 15rpx;
			box-sizing: border-box;

			.set {
				color: white;

				font-size: 25rpx;
				width: 50%;
				text-align: center;
				height: 50rpx;
				line-height: 50rpx;

				&:nth-of-type(1) {
					border-right: 1px white solid;
				}

				z-index: 99998;
			}

			&::before {
				content: "";
				width: 45rpx;
				height: 45rpx;
				position: absolute;
				left: calc(160rpx - 22.5rpx);
				background: #333;
				top: calc(70rpx - 25rpx);
				transform: rotate(45deg);
				z-index: 99997;
			}
		}

	}

	// 圈子头部名片信息
	.HeaderCardBox {
		width: 100%;
		height: 250upx;

		.headerCard {
			width: 100%;
			height: 250upx;
			padding: 20upx;
			background-size: 100%;
			background-repeat: no-repeat;

			.HcardContent {
				display: flex;
				justify-content: space-between;
				height: 190upx;
				font-size: 30upx;
				padding-right: 30rpx;
				margin: 0upx auto;
				background: rgba(255, 255, 255, 1);
				// box-shadow:0px 0px 14px 4px rgba(230,230,230,0.5);
				border-radius: 10px;
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
					width: 100%;

					.Ctitle {
						color: @title;
						font-size: 38upx;
						font-weight: 900;
						margin-bottom: 10rpx;

					}

					.CsubTitle {
						color: #666;
						font-size: @fsNum;
						padding: 5upx 0 30upx 0;
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
							.buttonRadius(150upx, 50upx, #5293D5);
							border-radius: 25rpx;
							line-height: 50upx;
							font-size: 13px;
							font-family: PingFangSC-Light;
							font-weight: 300;
							color: rgba(255, 255, 255, 1);
							// word-spacing: 20rpx;
							//letter-spacing: 10rpx;
							text-align: center;
							//text-indent: 20rpx;
							// margin-left: 24upx;
						}

						.Cmtn:nth-child(2) {
							background-color: #F2B863;
							margin-left: 25rpx;
						}

						.Cmtn:nth-child(3) {
							background-color: #F1C101;
							margin-left: 25rpx;
						}

						.Cmtn:nth-child(4) {
							background-color: #EE8A48;
							margin-left: 25rpx;
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
					right: -30upx;

					image {
						width: 38upx;
						height: 38upx;
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

		// padding-bottom: 30rpx;
		// padding-top: 30rpx;
		.chatWindow {
			width: 100%;
			background-color: #F0F0F0;
		}

		.tip {
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
			padding-left: 30rpx;
			// margin-bottom: 15upx;
			height: 44rpx;
			display: flex;
			flex-direction: row;

			.TTtitle {
				width: 100%;

				image {
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
					margin-bottom: 20rpx;
				}

				.TTname {
					font-size: 32upx;
					color: #333333;
					margin-right: 80upx;

					&.active {
						color: #2EA1FF;
						font-family: PingFangSC-Semibold, PingFang SC;

					}

					&.voice {
						padding-bottom: 5rpx;
						position: relative;

						.topicNum {
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
			position: relative;
			background: #fff;
			// margin: 0 auto;
			// margin-top: 30upx;
			border-radius: 10px;
			padding: 30rpx;
			// padding: 30upx;
			margin: 30rpx;

			.TLlist {
				display: flex;
				flex-direction: column;

				.TLimage {
					text-align: left;

					image {
						width: 345upx;
						height: 345upx;
						vertical-align: middle;
					}

				}

				.TLimages {
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;

					image {
						width: 200rpx;
						height: 200rpx;
						vertical-align: middle;
						margin-right: 15rpx;
						margin-bottom: 15rpx;
					}

					image:nth-child(3n+0) {
						margin-right: 0rpx;
					}

				}

				.TLtitle {
					flex: 1;

					.TLtname {
						width: 100%;
						font-size: 30upx;
						color: #242424;
						font-weight: 600;
						max-height: 150upx;
						margin-top: 20rpx;
						text-overflow: ellipsis;
						line-height: 42upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						margin-bottom: 20rpx;
						-webkit-line-clamp: 3;
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
				// margin-top: 30upx;
				// ;
				display: flex;
				flex-direction: row;

				// padding: 20upx 30upx 0 10upx;
				//border-top: 1upx solid @grayBg;

				image {
					width: 78upx;
					height: 78upx;
					border-radius: 8rpx;
					vertical-align: middle;
					display: inline-block;
					margin-right: 18upx;
				}

				.TLtime {
					display: flex;
					flex-direction: column;
					width: 35%;

					.topicCname {
						font-size: 32rpx;
						font-weight: 600;
						color: #0064B6;
					}

					.TLtime {
						color: #808080;
						font-size: 22rpx;
						margin-top: 5px;
						width: 200rpx;
					}
				}

				.TlImageMess {
					width: 150rpx;
					text-align: right;
					line-height: 80rpx;

					image {
						width: 30upx;
						height: 28upx;
						vertical-align: middle;
						margin-right: 12upx;
						margin-top: -6rpx;

					}
				}

				.TLImageGive {
					width: 150rpx;
					line-height: 80rpx;
					text-align: right;

					image {
						width: 30upx;
						height: 28upx;
						vertical-align: middle;
						margin-right: 12upx;
						margin-top: -6rpx;
					}
				}

			}
		}
	}

	// 发布话题
	.publishTopic {
		width: 100%;
		z-index: 999;
		background: #fff;
		font-size: @fsContentTitle;
		margin: 0 auto;
		position: fixed;
		bottom: 0;
		border-top: 1upx solid #EEEEEE;
		background: rgba(240, 240, 240, 1);

		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.item {
			margin-left: 18rpx;
		}

		.iconbtn {
			width: 52rpx;
			height: 52rpx;
		}

		.inputbar {
			height: 106rpx;
			background: #F7F7F7;
			padding: 0 19rpx;
		}

		.inputArea {
			width: 496rpx;
			height: 76rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 12rpx;
			padding-left: 15rpx;
		}


		.toolArea {
			width: 100%;
			height: 380rpx;
			background: #F7F7F7;
			box-sizing: border-box;
			padding: 0 68rpx;

			.toolItem {
				width: 25%;

				image {
					width: 105rpx;
					height: 105rpx;
					margin-bottom: 10rpx;
				}

				.image {
					width: 105rpx;
					height: 105rpx;
					background: white;
					margin-bottom: 10rpx;
					border-radius: 15rpx;

					image {
						width: 55rpx;
						height: 55rpx;
						margin: 25rpx auto;
						margin-bottom: 10rpx;
					}
				}

				font-size:28rpx;
				font-family:PingFangSC-Thin;
				font-weight:bold;
				color:rgba(127, 127, 127, 1);
				text-align: center;
			}

		}

		.voiceArea {
			width: 496rpx;
			height: 76rpx;
			background: rgba(215, 215, 215, 1);
			border-radius: 12rpx;
			text-align: center;
			margin-left: 18rpx;
			line-height: 76rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Thin;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);

		}

		.faceArea {
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

	.tishi {
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 39rpx;
		width: 345rpx;
		height: 39rpx;
		background: rgba(98, 199, 255, 1);
		border-radius: 4px;
		margin-top: 10rpx;
		margin-left: 60rpx;
		text-align: center;

		&::before {
			content: '';
			width: 0;
			height: 0;
			border: 14rpx solid transparent;
			border-top-color: rgba(98, 199, 255, 1);
			transform: rotate(70deg);
			position: absolute;
			left: 42px;
			top: 90rpx;
			margin-top: -20px;
		}
	}

	.message {
		// position: absolute;
		// right: 25rpx;
		// //top: 260rpx;
		// top: 255rpx;
		// width: 120rpx;
		// height: 50rpx;
		z-index: 999;
	}

	.talkList {
		background-color: #F5F5F5;
		width: 100%;
		min-height: 100%;
		padding-top: 5rpx;
		padding-bottom: 10rpx;
	}
</style>
