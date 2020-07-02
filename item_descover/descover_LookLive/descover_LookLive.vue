<template>
	<view @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
		<!-- <swiper class="swipers" :duration="duration" :vertical="true" @change="onChange" :current="activeIndex">
			<swiper-item v-for="(item,index) in dataList" :key="index"> -->
		<!-- 头部 -->
		<!-- <view class="arrow-boxs">
					<view class="arrow-chat">
						<view class="arrow-img"></view>
						<view class="arrow-text">换音频</view>
					</view>
					<view class="arrow-chat" style="left: 420rpx;">
						<view class="arrow-img"></view>
						<view class="arrow-text">找客服</view>
					</view>
				</view> -->
		<!-- 头部 -->
		<roomheader :userInfo="userInfo" @attention="attention" @attentionBtn="attentionBtn" :groupinfo="groupInfo"
		 :ownerInfo="ownerInfo" @coupon="coupon" class="livePusher" :attentionStatus="attentionStatus" :speakImg="speakImg"
		 :show="true" @goBack="quitGroup" :tuiJian="tuiJian"></roomheader>
		<!-- 拉流 -->

		<live-player style="width: 100vw;height: 100vh;" id="livePlay" mode="RTC" :src="playUrl" autoplay @statechange="statechange"
		 @error="error" object-fit="fillCrop" @fullscreenchange="fullscreenchange" @enterpictureinpicture="enterpictureinpicture"
		 :picture-in-picture-mode="[]"></live-player>
		<!-- <no-owner v-else :ownerInfo="ownerInfo"></no-owner> -->
		<!-- 这是聊天室 -->
		<view class="chat">
			<chatroom class="chatroom" :message="messageQueen"></chatroom>
		</view>
		<!-- 底部 -->
		<view :style="{width: width + 'px'}" class="but">
			<view class="likes">
				{{likeNum}}
			</view>
			<roombottom class="room-bottom" @send-message="sendMessage" :isTimReady="isTimReady" @quitGroup="onshares" @like="like"
			 @showGift="showGift" @showgoods="showgoods" :show="true"></roombottom>
		</view>
		<goods-sku-select-modal v-if="skuModalVisible" :goods-sku='goodSku' @close="skuModalVisible = false" @select="onSelect"
		 @confirm="confirm()"></goods-sku-select-modal>
		<uni-popup ref="popups" type="bottom">
			<view style="" class="popup">
				<wx-view>
					<button id="0001" class="bottomPopup" open-type="share">
						<image class="popupImg" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.h42oxh3E0mnlcca2a60dfa9d7a78e176ffb8bdf9fc99.png"></image>
						<view style="width: 120rpx;color: #FFFFFF; font-size: 12px;"><text>发给好友</text></view>
					</button>
				</wx-view>
				<view id="0002" @tap="shareBill" class="bottomPopup">
					<image class="popupImg" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Yy5c39ZeurHy42c22f61a2a25c54c8bce162c9f8e389.png"></image>
					<view style="width: 120rpx;color: #FFFFFF;font-size: 12px;"><text>生成海报</text></view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupes" type="bottom">
			<scroll-view class="goodsList" scroll-y>
				<view class="goods-title">商品列表</view>
				<view class="goods-item" v-for="(item,index) in relatedGoods" :key="item.goodsId">
					<image class="cart" v-if="item.setStatus==0" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.RRlFQTkRj97L47ab82e0685e4604d544ff256cb93cad.png"></image>
					<image class="goods-img" :src="item.coverImage" />
					<view class="goods-info">
						<view class="name">{{item.title}}</view>
						<view class="price">￥ {{item.preferentialPrice}}</view>
					</view>
					<view class="upSpeak" @click="buys(item.goodsId,index)">选择规格</view>
					<!-- <view class="upSpeak" @click="buy(item.goodsId)" v-if="item.ids==1">立即购买</view> -->
				</view>

			</scroll-view>
		</uni-popup>
		<!-- </swiper-item>
		</swiper> -->
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import chatroom from "@/components/chatroom.vue"
	import roombottom from "@/components/roombottom.vue"
	import roomheader from "@/components/roomheader.vue"
	import noowner from "@/components/noowner.vue"
	import goodsSkuSelectModal from '@/components/shop/modal/goodsSkuSelectModal';
	import TLS from 'im-live-sells'
	import {
		processSkuData
	} from '@/js/util';
	import TIM from 'tim-wx-sdk'
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
	const BUY_TYPE_SELECT = 0; // 选择 SKU
	const BUY_TYPE_ADD = 1; // 添加购物车
	const BUY_TYPE_BUY = 2; // 立即购买
	const BUY_TYPE_VIP = 3; // 立即购买
	const SHOP_GRADE_MAP = {
		1: '',
		2: '品牌',
		3: '旗舰',
	};
	export default {
		components: {
			uniPopup,
			chatroom,
			roombottom,
			roomheader,
			noowner,
			goodsSkuSelectModal
		},
		data() {
			return {
				type: "",
				width: '',
				height: '',
				enableCamera: false,
				context: null,
				markact: true,
				duration: 300,
				activeIndex: 0,
				selToID: 61,
				isTimReady: false,
				buyType: 'BUY_TYPE_BUY', //
				userInfo: {},
				groupInfo: {},
				ownerInfo: {},
				goodSku: {}, //规格
				noticeText: '',
				goodsId: '',
				serviceIdList: [],
				roomStatus: '0',
				message: [],
				relatedGoods: [],
				arr: [],
				skuModalVisible: false,
				likeNum: 0,
				roomId: '',
				attentionStatus: 0, //关注状态
				playUrl: '',
				isSelect: true,
				anchorUserId: '', //主播ID
				watchNum: 0, //最高观看人数
				shopArr: [],
				isGift: false,
				beauty: 0,
				hasEvent: 0,
				goods: {},
				speakImg: '',
				pinId: '', //拼团ID
				trundleImageList: [],
				// 该商品所属的商家用户 ID
				goodsUserId: '',
				tuiJian:'',
				shopId: '',
				ids: 0,
				authShow: false,
			};
		},
		computed: {
			messageQueen: function() {
				let self = this
				const queenLen = 100 //内存里面放100条消息，以免观看直播太久撑爆内存
				if (self.message.length > queenLen) {
					const vl = self.message.length - queenLen
					for (let i = 0; i < vl; i++) {
						self.message.shift()
					}
				}
				console.log('消息', self.message)
				return self.message

			},

		},
		onLoad(option) {
			this.roomId = option.id
			this.context = uni.createLivePlayerContext("livePlay", this);
			this.doLoginHandle((hasReg) => {
				uni.hideLoading();
			});
			this.getPeople()
		},
		onShow() {
			this.init()
			this.getLiveData()
			//this.getLiveData()
			setTimeout(() => {
				this.startPaly()
			}, 2000)

		},
		methods: {
			init() {
				let res = uni.getSystemInfoSync()
				this.width = res.windowWidth;
				this.height = res.windowHeight;
				var userSig = ''
				this.$api.getTLSSig().then(result => {
					userSig = result;
					let userName = uni.getStorageSync('userId');
					userName = userName + ''
					this.tls = new TLS({
						SDKAppID: config.sdkAppID,
						roomID: this.roomId,
						userSig: userSig,
						userName: userName,
						TIM: TIM
					})
					this.tls.on(TLS.EVENT.SDK_READY, async (res) => {
						const {
							groupInfo,
							userInfo
						} = await this.tls.joinRoom({
							roomID: this.roomId,
							getOwnerInfo: true
						})

						this.isTimReady = true
						this.userInfo = userInfo
						this.groupInfo = groupInfo
						this.ownerInfo = groupInfo.ownerInfo
						this.noticeText = groupInfo.notification
						console.log('查看商品', this.userInfo)
						let goods
						try {
							goods = JSON.parse(this._getVarsByKey(groupInfo.groupCustomField, 'addgoods'))
						} catch (err) {
							goods = []
						}
						this.goods = goods
						//if (this.noticeText) {
						let msg = []
						msg.push({
							name: '公告',
							message: '欢迎来到直播间！时刻销销提倡绿色直播，禁止在平台诈骗、赌博、非法转移财产、低俗色情、吸烟酗酒等行为，否则平台暂停支付收益或封禁账号',
							id: `id${Date.now()}`,
							type: 2
						})
						//this.message = msg
						this.message = this.message.concat(msg)
						//}
					})
					this.tls.on(TLS.EVENT.JOIN_GROUP, async (data) => {
						console.log('已经加入了群聊', data)
						//有人加群
						let msg = []
						msg.push({
							name: this._formatNick(data.userID, data.nick),
							message: '加入了直播间',
							id: `id${Date.now()}`
						})
						//this.message = msg
						let userId = uni.getStorageInfoSync('userId')
						//if(this.anchorUserId != userId){
						//this.getLiveData()
						//}
						this.message = this.message.concat(msg)
					})
					this.tls.on(TLS.EVENT.EXIT_GROUP, async (data) => {
						//有人退群
						let msg = []
						// msg.push({
						// 	name: this._formatNick(data.userID, data.nick),
						// 	message: '退出了群聊',
						// 	id: `id${Date.now()}`
						// })
						// this.message = this.message.concat(msg)
					})
					this.tls.on(TLS.EVENT.NOTIFACATION, async (data) => {
						//有新的公告
						this.noticeText = data.notification
						let msg = []
						msg.push({
							name: '公告',
							message: this.noticeText,
							id: `id${Date.now()}`,
							type: 2
						})
						this.message = this.message.concat(msg)
					})
					this.tls.on(TLS.EVENT.MESSAGE, async (data) => {
						//有人发消息
						let msg = []
						msg.push({
							name: this._formatNick(data.userID, data.nick),
							message: data.message,
							id: `id${Date.now()}`
						})
						console.log(data)
						this.message = this.message.concat(msg)
						let like = {}
						let goodsList = []
						let updataGoodsList = []
						let test = []
						//for (let i in this.message) {
						if (this.message[this.message.length - 1].name == 'admin') {
							test = []
							test = JSON.parse(this.message[this.message.length - 1].message)
							console.log(test)
							if (test.type == 0) {
								//更新点赞
								like = test
								//return like
							} else if (test.type == 2) {
								//修改推荐商品
								updataGoodsList = JSON.parse(test.goodsList)
								console.log('更新商品状态', updataGoodsList)
								//return updataGoodsList
							} else if (test.type == 3) {
								//添加关联商品和
								goodsList = JSON.parse(test.goodsList)
								console.log('添加关联商品', goodsList)
								//return goodsList
							} else if (test.type == 4) {
								uni.showModal({
									title: '提示',
									content: '主播以结束直播，请返回主页',
									success: function(res) {
										uni.switchTab({
											url: '../../pages/businessCard/businessCard'
										})
									}
								})
							}

						}
						//}
						//添加关联商品
						if (goodsList.length > 0) {
							//添加标识ids
							goodsList.forEach(item => {
								item.ids = 0
							})
							//倒排
							goodsList.reverse()
							for (let i in goodsList) {
								this.relatedGoods.unshift(goodsList[i])
							}
							//去重
							var obj = {};
							this.relatedGoods = this.relatedGoods.reduce(function(item, next) {
								obj[next.goodsId] ? '' : obj[next.goodsId] = true && item.push(next);
								return item;
							}, []);

						}
						//更新商品状态
						if (updataGoodsList.length > 0) {
							//添加标识ids
							updataGoodsList.forEach(item => {
								item.ids = 0
							})
							//倒排
							updataGoodsList.reverse()
							for (let i in updataGoodsList) {
								this.relatedGoods.unshift(updataGoodsList[i])
							}
							//去重
							var obj = {};
							this.relatedGoods = this.relatedGoods.reduce(function(item, next) {
								obj[next.goodsId] ? '' : obj[next.goodsId] = true && item.push(next);
								return item;
							}, []);
							console.log('商品', this.relatedGoods)
							if (this.relatedGoods[0].type == 1) {
								for (let i in this.relatedGoods) {
									
									if (this.relatedGoods[i].setStatus == 1) {
										this.speakImg = this.relatedGoods[i].coverImage
									}
									else if (this.relatedGoods[i].setStatus == 2) {
										this.speakImg = ''
									}
									else if (this.relatedGoods[i].setStatus == 0) {
										this.tuiJian = this.relatedGoods[i].coverImage
									}
									else if (this.relatedGoods[i].setStatus == 3) {
										this.tuiJian = ''
									}
								}
							}
						}
						//更新点赞
						if (like.type == 0) {
							this.likeNum = parseInt(like.likeNum)
						}
					})
					this.tls.on(TLS.EVENT.ATTENTION, async (data) => {
						//有人关注了主播
						let msg = []
						if (this.attentionStatus == 0) {
							msg.push({
								name: this._formatNick(data.userID, data.nick),
								message: '关注了主播',
								id: `id${Date.now()}`
							})
							this.message = this.message.concat(msg)
						} 
						const a = await this.tls.getUserInfo()
					})
					this.tls.on(TLS.EVENT.BUY_GOODS, async (data) => {
						//有人购买了商品
						let msg = []
						msg.push({
							name: this._formatNick(data.userID, data.nick),
							message: `购买了商品（${JSON.parse(data.value).name}）`,
							id: `id${Date.now()}`
						})
						this.message = this.message.concat(msg)
					})
					this.tls.on(TLS.EVENT.LIKE, async (data) => {
						//有人给主播点赞
						let msg = []
						msg.push({
							name: this._formatNick(data.userID, data.nick),
							message: '给主播点赞了',
							id: `id${Date.now()}`,

						})
						this.message = this.message.concat(msg)
						this.likeNum = this.likeNum + 1
						console.log(this.likeNum)
					})
					this.tls.on(TLS.EVENT.NETWORK_CHANGE, async () => {
						console.log("网络掉线")
					})
					this.tls.on(TLS.EVENT.SDK_NOT_READY, async () => {
						console.log('SDK不可触发')
					})
					this.tls.on(TLS.EVENT.ERROR, async (error) => {
						console.log('SDK发生错误', error)
					})
					this.tls.on(TLS.EVENT.ROOM_STATUS_CHANGE, async (data) => {
						console.log('上下线12312312312312', data)
					})
				})
			},
			onChange(e) {
				var index = e.detail.current;
				this.activeIndex = index;
				if (index == this.dataList.length - 3) {
					console.log("add data");
					this.getList();
				}
			},
			_formatNick(userID, nick) {
				if (userID === this.userInfo.userID) {
					return '我'
				} else if (userID == 'admin') {
					return userID
				}
				return nick
			},
			EnableCamera() {
				this.enableCamera = true;
			},
			getPeople() {
				let updata = setInterval(() => {
					setTimeout(() => {
						this.tls.getRoomInfo(this.ownerInfo).then(res => {
							this.groupInfo.memberNum = res.memberNum
							console.log('房间人数', this.groupInfo.memberNum)
						})
					})
					if (this.updata) {
						clearInterval(updata)
					}
				}, 3000)
			},
			getLiveData() {
				this.$api.getLiveDataInfo(this.roomId)
					.then(res => {
						this.likeNum = res.likeNum
						this.attentionStatus = res.attentionStatus
						this.anchorUserId = res.anchorUserId
						this.pinId = res.pinId
						this.playUrl = res.playUrl
						this.relatedGoods = res.relatedGoods
						if (this.relatedGoods.length > 0) {
							this.relatedGoods.forEach(item => {
								item.ids = 0
							})
						}
						let obj = {}
						this.relatedGoods = this.relatedGoods.reduce(function(item, next) {
							obj[next.goodsId] ? '' : obj[next.goodsId] = true && item.push(next);
							return item;
						}, []);
					})
					.catch(err => {
						if (err.code == 2222) {
							uni.showModal({
								title: '提示',
								content: '主播以结束直播，请返回主页',
								success: function(res) {
									uni.switchTab({
										url: '../../pages/businessCard/businessCard'
									})
								}
							})
						}
					})
			},
			startPaly() {
				let self = this;
				this.context.play({
					success: a => {
						self.markact = false;
						console.log('livePusher.play:' + JSON.stringify(a));
					}
				});
			},
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			fullscreenchange(e) {
				console.log(e)
			},
			error(e) {
				console.error('live-player error:', e.detail.errMsg)
			},
			handletouchmove: function(event) {
				// console.log(event)
				if (this.flag !== 0) {
					return;
				}
				let currentX = event.touches[0].pageX;
				let currentY = event.touches[0].pageY;
				let tx = currentX - this.lastX;
				let ty = currentY - this.lastY;
				let text = '';
				this.mindex = -1;
				//左右方向滑动
				if (Math.abs(tx) > Math.abs(ty)) {
					if (tx > 0) {

						this.exitFullScreen()
						this.flag = 2;
					}
				}
				//将当前坐标进行保存以进行下一次计算
				this.lastX = currentX;
				this.lastY = currentY;
				this.text = text;
			},
			handletouchstart: function(event) {
				// console.log(event)
				this.lastX = event.touches[0].pageX;
				this.lastY = event.touches[0].pageY;
			},
			handletouchend: function(event) {
				this.flag = 0;
				this.text = '没有滑动';
			},
			onSelect(data) {
				//选中
				const {
					sIndex,
					pIndex
				} = data;
				let parent = this.goodSku.list[pIndex];
				let sku = parent.sku[sIndex];
				parent.sku.forEach(item => item.select = false);
				sku.select = true;

			},
			shareBill() {
				uni.navigateTo({
					url: 'descover_LiveShare?LiveId=' + this.roomId
				})
			},
			//处理立即购买数据
			disposeBuy() {
				if (!this.checkHasLogin()) {
					return;
				}

				//console.log(this.callbackData)
				let arr1 = this.callbackData.skuName.split('-');
				var arr1_s = ''
				for (var j = 0; j < arr1.length; j++) {
					arr1_s += arr1_s ? '-' + arr1[j] : arr1[j]
				}
				let arr3 = []
				let data = {
					//this.callbackData.skuNum,this.userId,this.callbackData.number,this.goodsId
					discountPrice: this.goods.preferentialPrice,
					franking: this.goods.franking,
					skuId: this.callbackData.skuId,
					goodsId: this.goods.id,
					goodsImage: this.goods.trundleImages[0],
					goodsName: this.goods.title,
					goodsNum: this.callbackData.number,
					goodsTitle: this.goods.title,
					isSelected: false,
					originalPrice: this.goods.originalPrice,
					propertySku: arr1,
					propertySku_S: arr1_s,
					shopGrade: this.shop.shopGrade,
					shopId: this.goods.shopId,
					shopLogo: this.shop.logo,
					shopName: this.shop.shopName,
					skuValue: this.callbackData.skuNum,
					totalPrice: this.callbackData.number * this.goodsPrice,
					frankingType: this.shop.frankingType || 1,
					recommendId: this.recommendId,
					cod: !!this.serviceIdList.find(item => item.id === 5) ? 1 : 0
				}
				console.info(data)
				arr3.push(data);
				return arr3;
			},
			buys(goodsId, index, flag) {
				this.goodsId = goodsId
				console.log(this.goodsId)
				uni.setStorageSync('Index', index)
				if (Object.keys(this.goodSku).length > 0 && !flag) {
					this.skuModalVisible = true;
					return;
				}
				this.getGoodsDetail()
				uni.showLoading()
				this.$api.getGoodsSku(this.goodsId).then(result => {
					uni.hideLoading()
					this.goodSku = processSkuData(result);
					this.skuModalVisible = true;


				}).catch(err => {
					console.info(err)
				})
			},
			onshares() {
				this.$refs.popups.open()
			},
			buy(goodsId) {

				if (!this.checkHasLogin()) {
					return;
				}

				// 立即购买
				this.buyType = BUY_TYPE_BUY;
				if (this.callbackData) {
					console.log(this.goods)
					console.log(this.shop)
					console.info(this.callbackData)
					uni.navigateTo({
						url: '../../module/shop/order/order?anchorUserId=' + this.anchorUserId + '&liveId=' + this.roomId + '&pinId' +
							this.pinId + '&urlType=0'

					});
					var aa = this.disposeBuy();
					this.setCarGoods(aa)

				} else {
					//拿规格
					this.showSkuModal();
				}
			},
			confirm(callbackData) {
				console.info(callbackData)
				this.skuData = callbackData.skuName + ' 数量：' + callbackData.number;
				this.callbackData = callbackData
				this.buy()
				let index = uni.getStorageSync('Index')
				this.ids = this.relatedGoods[index].ids
				if (this.ids == 0) {
					this.relatedGoods[index].ids = 1
					return
				}

				// 立即购买
				if (this.buyType === 'BUY_TYPE_BUY') {
					//this.buy()
				} else if (this.buyType == BUY_TYPE_ADD) {
					// 加入购物车
					this.addCar();
				} else if (this.buyType == BUY_TYPE_VIP) {
					this.buyVipRequest();
				}
			},
			like() {
				this.tls.like().then(function(data) {

				})
				//let _this=this

			},
			enterpictureinpicture() {
				console.log(123)
			},
			leavepictureinpicture() {
				console.log(456)
			},
			showGift() {
				uni.showActionSheet({
					itemList: ["举报", "下载App"],
					success: (res) => {
						if (res.tapIndex + 1 == 1) {
							uni.navigateTo({
								url: 'descover_Report?liveId=' + this.roomId + '&anchorUserId=' + this.anchorUserId
							})
						}
					}

				})
			},
			onShareAppMessage() {
				// 名片的分享
				this.$api.share(this.userId, 1)
					.then(res => {

					});
				return {
					title: '您好，这是我直播间',
					path: '/item_descover/descover_LookLive/descover_LookLive?id=' + this.roomId,
				}

			},
			coupon() {
				this.hascoupon = true
			},
			attention() {
				uni.showLoading()
				this.tls.attention().then((data) => {
					if (this.attentionStatus == 0) {
						uni.hideLoading()
						this.$api.attentionAnchor(this.roomId, this.anchorUserId)
							.then(res => {
								this.attentionStatus = 1

								console.log(res)
							})
							.catch(err => {
								console.log(err)
							})
						// this.attentionStatus=1
						// console.log(this.attentionStatus)
						return
					}
					if (this.attentionStatus == 1) {
						uni.hideLoading()
						//uni.showLoading()
						this.$api.cancelAttentionAnchor(this.roomId, this.anchorUserId)
							.then(res => {
								this.attentionStatus = 0
								console.log(res)
							})
							.catch(err => {
								console.log(err)
							})

						// this.attentionStatus==0
						// console.log(this.attentionStatus)
						return
					}

				}).catch(() => {
					wx.hideLoading()
				})
			},
			showgoods() {
				this.$refs.popupes.open()
			},
			_getVarsByKey(arr, key) {
				var res
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].key === key) {
						res = arr[i].value;
						break;
					}
				}
				return res
			},
			stopLive() {
				this.context.stop({
					success: a => {
						console.log(JSON.stringify(a));
					}
				});
			},
			requestFullScreen() {
				this.context.requestFullScreen({
					direction: 0,
					success: a => {
						console.log(JSON.stringify(a))
					}
				})
			},
			//出去全屏
			exitFullScreen() {
				this.context.exitFullScreen({
					success: a => {
						console.log(JSON.stringify(a))
					}
				})
			},

			goodsPrice() {
				if (this.callbackData) {
					return this.callbackData.data.preferentialPrice;
				}
				return this.goods.preferentialPrice
			},

			quitGroup() {
				console.log(this.noticeText)
				this.exitFullScreen()
				this.enterpictureinpicture()
				if (this.noticeText == '') {
					uni.switchTab({
						url: '../../pages/businessCard/businessCard'
					})
				} else {
					wx.showLoading({
						mask: true
					})
					this.tls.exitRoom().then(() => {
						console.log("成功")
						uni.hideLoading()
						uni.switchTab({
							url: '../../pages/businessCard/businessCard'
						})
						this.isTimReady = false
					}).catch((err) => {
						wx.navigateBack()
					})
				}
			},
			sendMessage(data) {
				this.tls.sendMessage(data).then((res) => {
					this.message = this.message.concat([{
						name: this._formatNick(this.userInfo.userID, this.userInfo.nick),
						message: res.message,
						id: `id${Date.now()}`
					}])
				})
			},
			getGoodsDetail() {
				// 商品详情
				uni.showLoading()
				this.$api.getGoodsDetail(this.goodsId).then(result => {
					uni.hideLoading()
					console.info(result)
					console.info('商品详情')

					result.goodsDetail.details = result.goodsDetail.details.replace(/\<img/gi,
						'<img style=" display:block; width: 100%; max-width:100%;height:auto" ');
					this.hasEvent = result.hasEvent;
					this.goods = result.goodsDetail
					this.serviceIdList = result.serviceIdList
					this.goods.trundleImages = JSON.parse(result.goodsDetail.trundleImages)
					this.shop = result.shopDetail
					this.trundleImageList = result.trundleImageList
					this.goodsUserId = result.shopDetail.userId;
					this.shopId = result.goodsDetail.shopId;
					// 判断是否收藏
					if (result.collectStatus) {
						if (result.collectStatus == 0) {
							this.isCollect = false
						} else {
							this.isCollect = true
						}
					} else {
						this.isCollect = false
					}

					// 如果从其它入口进入，没有带上销售人员的 id
					// 则默认为该店的店主
					if (!this.cardUserId) {
						this.cardUserId = result.vipId
					}


					// uni.setNavigationBarTitle({
					// 	title: this.shop.shopName
					// });
					this.title = this.shop.shopName;

					// 获取店家推荐
					// if(!this.isGift)
					// 	this.listShopRecommendGoods()

					// #ifdef APP-PLUS
					if (this.goods.coverVideo) {
						this.bannerTabBtn.show();
					}
					uni.$off('evv').$on('evv', data => {
						let index = data.index;
						this.bannerTabActive = index == 1 ? 'image' : 'video';


					})

					// #endif


					this.$nextTick(() => {
						uni.hideLoading();
					})
				})
			},

			originalPrice() {
				if (this.callbackData) {
					return this.callbackData.data.goodsPrice;
				}
				return this.goods.originalPrice
			},

			...mapMutations(['setCardUserId', 'setUPinfo', 'setCarGoods'])
		},
		watch: {

		},
	}
</script>

<style lang="less">
	.chatroom {
		width: 50vw;
		max-height: 40vh;
		position: absolute;
		bottom: 70px;
		z-index: 10;
		padding: 22rpx
	}

	.id {
		font-size: 14px;
		color: white;
	}

	.arrow-box {
		position: fixed;
		top: 60px;
		left: 20px;
		z-index: 10;
		border-radius: 20px;
		background-color: rgba(0, 0, 0, .4);
	}

	.goodsList {
		overflow-y: auto;
		height: 45vh;
		width: 100%;
		background-color: #FFFFFF;
	}

	.but {

		position: fixed;
		bottom: 0px;
		display: flex;
		align-items: center;
		flex-direction: row;
		padding-bottom: 20px;
	}

	.bottomPopup {
		text-align: center;
		margin-top: 50rpx;
		background: none;
		line-height: 2;
	}

	.livePusher {
		z-index: 999;
		position: absolute;
	}

	.goods-title {
		padding-left: 20rpx;
		height: 114rpx;
		line-height: 114rpx;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #111111;
		letter-spacing: 0;
		text-align: left;
		display: block;
		padding-left: 20rpx;
		border-bottom: 1px solid #DBDBDB;
	}

	.goods-item {
		padding: 24rpx 10px;
		border-bottom: 1px solid #DBDBDB;
		height: 140rpx;
		position: relative;
	}

	.goods-item-img {
		width: 84rpx;
		height: 171rpx;
		margin-top: 24rpx;
	}

	.goods-info {
		display: inline-block;
		vertical-align: middle;
		padding-left: 24rpx;
	}

	.name {
		height: 110rpx;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #333333;
		letter-spacing: 0;
		line-height: 30rpx;
	}

	.price {
		height: 30rpx;
		line-height: 30rpx;
		font-size: 14px;
		color: #EE4E4E;
	}

	.upSpeak {
		position: absolute;
		width: 200rpx;
		height: 50rpx;
		text-align: center;
		padding-top: 10rpx;
		color: #FFFFFF;
		right: 24rpx;
		bottom: 28rpx;
		border-radius: 10rpx;
		background-color: #E02E24;

	}

	.arrow-boxs {

		display: flex;
		align-items: center;
		flex-direction: row;
		position: fixed;
		top: 48px;
		left: 50px;
		z-index: 10;
		border-radius: 30px;

	}

	.arrow {
		width: 15px;
		height: 15px;
	}

	.goods-img {
		height: 140rpx;
		width: 140rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.arrow-chat {
		position: fixed;
		top: 52px;
		left: 350rpx;
		font-size: 11px;
		// color: #FFFFFF;
		display: flex;
		flex-direction: column;

		.arrow-img {
			width: 50rpx;
			height: 50rpx;
			border-radius: 25rpx;
			background-color: #C56162;
			text-align: center;
			margin: 0 auto;
			margin-bottom: 5rpx;
		}

		.arrow-text {
			text-align: center;
		}
	}

	.cart {
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		top: 13rpx;
		left: 10rpx;

	}

	.likes {
		position: absolute;
		top: -35rpx;
		right: 90rpx;
		color: red;
		width: 100rpx;
		text-align: center;
	}
</style>
