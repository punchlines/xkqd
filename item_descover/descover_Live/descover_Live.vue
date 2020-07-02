<template>
	<view>

		<!-- 头部 -->
		<roomheader :userInfo="userInfo" @attention="attention" :groupinfo="groupInfo" :ownerInfo="ownerInfo" @coupon="coupon"
		 class="livePusher" :attentionStatus="attentionStatus" :speakImg="speakImg" :show="false" @goBack="quitGroup"
		 :tuiJian="tuiJian"></roomheader>
		<!-- 头部 -->
		<!-- 推流 -->
		<live-pusher :beauty="beauty" style="width: 100vw; height: 100vh;" id="livePusher" mode="FHD" :url="pushUrl"></live-pusher>
		<!-- 这是聊天室 -->
		<view class="chat">
			<chatroom class="chatroom" :message="messageQueen"></chatroom>
		</view>
		<!-- 底部 -->
		<view style="width: 100vw;" class="but">
			<view class="likes">
				{{likeNum}}
			</view>
			<!-- <view class="goodsSum">
				{{goodsSum}}
			</view> -->
			<roombottom class="room-bottom" @send-message="sendMessage" :isTimReady="isTimReady" @quitGroup="onshares" @showGift="showGift"
			 @showgoods="showgoods"></roombottom>
			<view class="set" @click="openPopup">
				<image class="gift" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.9fSHHuImUoMUba26ac535892cd27766fdd4667619bdd.png"
				 mode=""></image>
			</view>
		</view>
		<!-- 商品面板 start -->
		<uni-popup ref="popupes" type="bottom">
			<scroll-view class="goodsList" scroll-y>
				<view class="goods-title" @click="goMore">选择更多</view>
				<view class="goods-item" v-for="(item,index) in good" :key="item.goodsId">
					<image class="carts" v-if="item.idstext==1" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.RRlFQTkRj97L47ab82e0685e4604d544ff256cb93cad.png"></image>
					<image class="goods-img" :src="item.coverImage" />
					<view class="goods-info">
						<view class="name">{{item.title}}</view>
						<view class="price">￥ {{item.preferentialPrice}}</view>
					</view>
					<view class="" @click="sendgoods(index,item.ids,item.coverImage)" v-if="item.ids==0">
						<view class="tuiGoods">{{item.idstext==0?'立即推荐':'取消推荐'}}</view>
					</view>
					<view class="upSpeak" v-if="item.idss==0" @click="speak(item.coverImage,index,item.ids)">{{item.idsstext==0?'立即讲解':'结束讲解'}}</view>
				</view>

			</scroll-view>
		</uni-popup>
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
		<uni-popup ref="popupe" type="bottom">
			<view style="" class="popup">
				<view v-if="sliderShow" class="slider">
					<slider value="5" @change="sliderChange" show-value max="10" backgroundColor="#F0F0F0" activeColor="#000000" />
				</view>
				<view id="0001" @tap="onshare(1)" class="bottomPopup">
					<image class="popupImg" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.11JnJDnkCV255cf44f0d96b7c33e69ba303e88bcc0b0.png"></image>
					<view style="width: 120rpx;color: #FFFFFF; font-size: 12px;"><text>美颜</text></view>
				</view>
				<view id="0002" @tap="onshare(2)" class="bottomPopup">
					<image class="popupImg" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.I8QvgLo60DEU58f70765dbc2ac1fb8642ade58d7832a.png"></image>
					<view style="width: 120rpx;color: #FFFFFF;font-size: 12px;"><text>麦克风</text></view>
				</view>
				<view id="0003" @tap="onshare(3)" class="bottomPopup">
					<image class="popupImg" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ifx5r9hVBECv1f14663707502257ee1486993b1ff999.png"></image>
					<view style="width: 120rpx;color: #FFFFFF;font-size: 12px;"><text>定位</text></view>
				</view>
				<view id="0004" @tap="onshare(4)" class="bottomPopup">
					<image class="popupImg" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.vcYqoK4dB6oB6affdd32a5f7db202f96f6494f843a80.png"></image>
					<view style="width: 120rpx;color: #FFFFFF;font-size: 12px;"><text>翻转相机</text></view>
				</view>
			</view>
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
	import goodsList from "@/components/goodsList.vue"
	import noowner from "@/components/noowner.vue"
	import TLS from 'im-live-sells'
	import TIM from 'tim-wx-sdk'
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
	export default {
		components: {
			uniPopup,
			chatroom,
			roombottom,
			roomheader,
			noowner,

			goodsList
		},
		data() {
			return {
				type: "",
				context: null,
				animation2: null,
				activeIndex: 0,
				isTimReady: false,
				userInfo: {},
				groupInfo: {},
				ownerInfo: {},
				noticeText: '',
				sliderShow: false,
				message: [],
				arr: [],
				roomId: '',
				longitude: '',
				text: '',
				watchNum: 0,
				pushUrl: '',
				address: '',
				goodsSum: 0,
				showSpeak: true,
				likeNum: 0,
				anchorUserId: '', //主播ID
				attentionStatus: 0, //关注状态
				latitude: '',
				code: 0,
				good: [],
				playUrl: '',
				speakImg: '', //讲解商品图片
				tuiJian: '', //商品图片
				recommendGood: [], //初始推荐商品
				recommendGoods: [], //推荐商品
				relatedGoods: [], //关联商品
				ids: '',
				idss: '',
				beauty: 0,
				updata: false,
				recommend: []
			};
		},

		computed: {
			messageQueen: function() {
				let _self = this
				const queenLen = 100 //内存里面放100条消息，以免观看直播太久撑爆内存
				if (_self.message.length > queenLen) {
					const vl = _self.message.length - queenLen
					for (let i = 0; i < vl; i++) {
						_self.message.shift()
					}
				}
				console.log(_self.message)
				return _self.message
			},

			journal() {
				return this.$store.state.journalPublish;
			},
		},
		onLoad(option) {
			this.pushUrl = uni.getStorageSync('livePusher');
			uni.removeStorageSync('livePusher');
			this.roomId = option.liveId
			this.good = option.relatedGoods
			this.good = JSON.parse(this.good)
			this.goodsSum = this.good.length
			this.good.forEach(item => {
				item.ids = 0
			})
			this.good.forEach(item => {
				item.idss = 0
			})
			this.good.forEach(item => {
				item.idstext = 0
			})
			this.good.forEach(item => {
				item.idsstext = 0
			})
			this.context = uni.createLivePusherContext("livePusher", this);
			this.$store.dispatch('resetJournalPublish');
			this.init()
			this.updateLiveLikeAndWatchs()
			this.getPeople()
			setTimeout(() => {
				this.start()
			}, 2000)
		},
		onUnload() {
			this.tls.destroy()
		},
		onBackPress(){
			console.log('我返回了')
		},
		onShow() {
			const journal = this.journal;
			let f = []
			for (let i in journal.goodsList) {
				f.push(journal.goodsList[i])
			}
			for (let i in journal.list) {
				f.push(journal.list[i])
			}
			if (f.length > 0) {
				for (let i in f) {
					this.good.unshift(f[i])
				}
				var obj = {};
				this.good = this.good.reduce(function(item, next) {
					obj[next.goodsId] ? '' : obj[next.goodsId] = true && item.push(next);
					return item;
				}, []);
				this.good.forEach(item => {
					item.ids = 0
				})
				this.good.forEach(item => {
					item.idss = 0
				})
				this.good.forEach(item => {
					item.idstext = 0
				})
				this.good.forEach(item => {
					item.idsstext = 0
				})
				this.relatedGoods = f.map(item => {
					return {
						goodsId: item.goodsId,
						type: 2,
						identity: item.identity
					}
				})
				this.goodsSum = this.relatedGoods.length
				this.relatedGoods = JSON.stringify(this.relatedGoods)
				this.$api.updateLiveInfo(this.roomId, this.relatedGoods)
					.then(res => {
						console.log(res)
					})
			}
			//关联商品
			this.listen()

		},
		onHide() {
			console.log('从前台进入后台')
		},
		methods: {
			init() {
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
						console.log('查看商品', this.groupInfo, 'id', this.userInfo.userID)
						let goods
						try {
							goods = this._getVarsByKey(groupInfo.groupCustomField, 'addgoods')
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
						console.log('已经加入了直播间', data)
						//有人加群
						// let msg = []
						if (this._formatNick(data.userID, data.nick) != '') {
							msg.push({
								name: this._formatNick(data.userID, data.nick),
								message: '加入了直播间',
								id: `id${Date.now()}`
							})
							this.message = this.message.concat(msg)
							//最高人数
							this.watchNum += 1
						}
						//this.message = msg

					})
					this.tls.on(TLS.EVENT.EXIT_GROUP, async (data) => {
						//有人退群
						console.log('退出', data)
						// let msg = []
						// msg.push({
						// 	name: this._formatNick(data.userID, data.nick),
						// 	message: '退出了群聊',
						// 	id: `id${Date.now()}`
						// })
						// this.message = this.message.concat(msg)
						//  this.groupInfo.memberNum =this.groupInfo.memberNum-1
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
						this.message = this.message.concat(msg)
						let buyGoods = {}
						let test = []
						if (this.message[this.message.length - 1].name == 'admin') {
							test = JSON.parse(this.message[this.message.length - 1].message)
							if (test.type == 1) {
								//下单成功
								buyGoods = JSON.parse(test.Text)
								uni.showToast({
									title: buyGoods.msg,
									duration: 2000
								})
							}
						}
					})
					this.tls.on(TLS.EVENT.ATTENTION, async (data) => {
						//有人关注了主播
						let msg = []
						let userID = []
						userID.push(data.userID)
						//userID = [...new Set(userID)]
						for (let i in userID) {
							console.log(userID[i])
						}
						msg.push({
							name: this._formatNick(data.userID, data.nick),
							message: '关注了主播',
							id: `id${Date.now()}`
						})
						this.message = this.message.concat(msg)
						const a = await this.tls.getUserInfo()
						console.log(data, a)
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
						this.likeNum = this.likeNum + 1
						this.message = this.message.concat(msg)

					})
					this.tls.on(TLS.EVENT.ADD_GOODS, async (data) => {
						//该场直播推荐商品有变更
						wx.showToast({
							title: '有新的商品上架'
						})
						let goods
						try {
							goods = JSON.parse(data.value)
						} catch (err) {
							goods = []
						}
						this.goods = goods
					})
					this.f.on(TLS.EVENT.NETWORK_CHANGE, async () => {
						console.log("网络掉线")
					})
					this.tls.on(TLS.EVENT.SDK_NOT_READY, async () => {
						console.log('SDK不可触发')
					})
					this.tls.on(TLS.EVENT.ERROR, async (error) => {
						console.log('SDK发生错误', error)
					})
					this.tls.on(TLS.EVENT.ROOM_STATUS_CHANGE, async (data) => {
						console.log('上下线', data)
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
				if (userID == this.userInfo.userID) {
					return '我'
				} else if (userID == 'admin') {
					return userID
				}
				return nick
			},
			listen() {
				let _this = this
				uni.onNetworkStatusChange(res => {
					console.log('网络监听', res.isConnected);
					console.log('网络监听', res.networkType);
					//let _this =this
					if (res.networkType == 'none') {
						console.log('网络连接断开')
						_this.pause()
					} else {
						//if(_this.code==0){
						_this.resume()
						//}
					}
				});
			},
			sliderChange(e) {
				this.beauty = e.detail.value
			},
			hidegoods() {
				const ani = wx.createAnimation({
					duration: 200
				})
				ani.bottom('-45vh').step()
				this.animation2 = ani.export()
			},
			start() {
				this.context.start({
					success: (a) => {
						console.log("livePusher.start:" + JSON.stringify(a));
					}
				});
			},
			//暂停推流
			pause() {
				this.context.pause({
					success: (a) => {
						console.log("livePusher.pause:" + JSON.stringify(a));
					}
				});
			},
			//恢复推流
			resume() {
				this.context.resume({
					success: (a) => {
						console.log("livePusher.resume:" + JSON.stringify(a));
					}
				});
			},
			like() {
				this.tls.like().then(function(data) {})
			},
			updateLiveLikeAndWatchs() {
				let updata = setInterval(() => {
					setTimeout(() => {
						this.$api.updateLiveLikeAndWatch(this.roomId, this.watchNum, this.likeNum)
							.then(res => {
								console.log('更新成功', res)
							})
					})
					if (this.updata) {
						clearInterval(updata)
					}
				}, 10000)

			},
			coupon() {
				this.hascoupon = true
			},

			onshares() {
				this.$refs.popups.open()
			},
			onshare(index) {
				if (index == 1) {
					this.sliderShow = true
				} else if (index == 2) {
					this.sliderShow = false
					if (this.enablemic == false) {
						this.enablemic = true
						uni.showToast({
							title: '麦克风以打开',
							duration: 2000
						})
						return
					}
					if (this.enablemic == true) {
						this.enablemic = false
						uni.showToast({
							title: '麦克风以关闭',
							duration: 2000
						})
						return
					}

				} else if (index == 3) {
					this.sliderShow = false
					let _this = this
					if (_this.longitude == '' && _this.latitude == '') {
						_this.getLocation()
						uni.showToast({
							title: '定位以打开',
							duration: 2000
						})
					} else {
						_this.address = ''
						_this.longitude = ''
						_this.latitude = ''
						_this.isshow = true
						uni.showToast({
							title: '定位以关闭',
							duration: 2000
						})
					}
				} else if (index == 4) {
					this.switchCamera()
					this.sliderShow = false
				}
			},
			switchCamera() {
				this.context.switchCamera({
					success: (a) => {
						console.log("livePusher.switchCamera:" + JSON.stringify(a));
					}
				});
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
			getLocation() { //获取当前地理位置
				let _this = this
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						_this.latitude = res.latitude
						_this.longitude = res.longitude
						_this.address = res.address
						_this.isshow = false
					}
				});
			},
			goMore() {
				uni.navigateTo({
					url: '../descover_CreateLive/descover_SelectGoods?relatedGoods=' + this.relatedGoods
				})
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
			shareBill() {
				uni.navigateTo({
					url: 'descover_LiveShare?LiveId=' + this.roomId
				})
			},

			openPopup() {
				this.$refs.popupe.open()
			},
			showgoods() {
				this.$refs.popupes.open()
			},
			speak(img, index) {
				this.recommendGoods = []
				this.relatedGoods = []
				//讲解商品
				if (this.good[index].idsstext == 0) {
					this.speakImg = img
					this.good[index].idsstext = 1
					this.good[index].ids = 1
					this.recommendGoods.push(this.good[index])
					this.recommendGoods = this.recommendGoods.map(item => {
						return {
							goodsId: item.goodsId,
							type: 1,
							setStatus: 1
						}
					})
					this.recommendGoods = JSON.stringify(this.recommendGoods)
					uni.showLoading()
					this.$api.updateLiveInfos(this.roomId, this.recommendGoods)
						.then(res => {
							uni.hideLoading()
						})
					return
				}
				//取消讲解
				else if (this.good[index].idsstext == 1) {
					this.speakImg = ''
					this.good[index].idsstext = 0
					this.good[index].ids = 0
					this.recommendGoods.push(this.good[index])
					this.recommendGoods = this.recommendGoods.map(item => {
						return {
							goodsId: item.goodsId,
							type: 1,
							setStatus: 2 //取消讲解
						}
					})
					this.recommendGoods = JSON.stringify(this.recommendGoods)
					uni.showLoading()
					this.$api.updateLiveInfos(this.roomId, this.recommendGoods)
						.then(res => {
							uni.hideLoading()
						})
					return
				}
			},
			sendgoods(index, id, img) {
				this.recommendGoods = []
				this.relatedGoods = []

				//推荐商品
				if (this.good[index].idstext == 0) {
					this.recommendGoods.push(this.good[index])
					this.tuiJian = img
					this.recommendGoods = this.recommendGoods.map(item => {
						return {
							goodsId: item.goodsId,
							type: 1,
							setStatus: 0
						}
					})
					this.good[index].idstext = 1
					this.good[index].idss = 1
					this.recommend.push(this.recommendGoods[0].goodsId)
					if (this.recommend.length == 3) {
						for (let i in this.good) {
							if (this.good[i].goodsId == this.recommend[0]) {
								this.good[i].idstext = 0
								this.good[index].idss = 0
							}
						}
						this.recommend.splice(0, 1)
					}
					this.recommendGoods = JSON.stringify(this.recommendGoods)
					uni.showLoading()
					this.$api.updateLiveInfos(this.roomId, this.recommendGoods)
						.then(res => {
							uni.hideLoading()
						})
				} //取消推荐
				else if (this.good[index].idstext == 1) {
					this.recommendGoods.push(this.good[index])
					this.tuiJian = ''
					this.recommendGoods = this.recommendGoods.map(item => {
						return {
							goodsId: item.goodsId,
							type: 2,
							setStatus: 3 //取消推荐
						}
					})
					this.good[index].idstext = 0
					this.good[index].idss = 0
					this.recommendGoods = JSON.stringify(this.recommendGoods)
					uni.showLoading()
					this.$api.updateLiveInfos(this.roomId, this.recommendGoods)
						.then(res => {
							uni.hideLoading()
						})
				}
			},
			quitGroup() {
				let _this = this
				let res = []
				uni.showModal({
					title: '提示',
					content: '确认退出直播间?',
					success: function(res) {
						if (res.confirm == true) {
							uni.showLoading()
							_this.tls.exitRoom().then(() => {
								uni.hideLoading()
								_this.$api.endLive(_this.roomId)
									.then(res => {
										res = res
										_this.updata = true
										uni.navigateTo({
											url: '../descover_EndLive/descover_EndLive?watchNum=' + res.watchNum + '&addAttentionNum=' + res.addAttentionNum +
												'&likeNum=' + res.likeNum + '&goodsAmount=' + res.goodsAmount
										})

										//uni.navigateBack()

									})
								_this.isTimReady = false
							}).catch((err) => {
								wx.navigateBack()
							})
						}
					}
				})

			},
			onShareAppMessage() {
				// 名片的分享
				// this.$api.share(this.userId, 1)
				// 	.then(res => {

				// 	});
				return {
					title: '您好，这是我直播间',
					path: '/item_descover/descover_LookLive/descover_LookLive?id=' + this.roomId,
				}

			},
			getVarsByKey(arr, key) {
				var res
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].key === key) {
						res = arr[i].value;
						break;
					}
				}
				return res
			},
			sendMessage(data) {
				this.tls.sendMessage(data).then((res) => {
					this.message = this.message.concat([{
						name: this._formatNick(this.userInfo.userID, this.userInfo.nick),
						message: res.message,
						id: `id${Date.now()}`
					}])
				})
				console.log('消息', data)
			}

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

	.popup {
		height: 200rpx;
		display: inline-flex;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.but {
		position: fixed;
		bottom: 0px;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-bottom: 20px;
	}

	.livePusher {
		z-index: 999;
		position: absolute;
	}

	.goodsList {
		overflow-y: auto;
		height: 45vh;
		width: 100%;
		background-color: #FFFFFF;
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

	.close {
		height: 64rpx;
		width: 64rpx;
		position: absolute;
		right: 24rpx;
		top: 24rpx;
	}

	.slider {
		position: absolute;
		bottom: 300rpx;
		left: 50rpx;
		right: 50rpx;

	}

	.arrow {
		width: 15px;
		height: 15px;
	}

	.bottomPopup {
		text-align: center;
		margin-top: 50rpx;
		background: none;
		line-height: 2;
	}

	.popupImg {
		height: 50rpx;
		width: 50rpx;
	}

	.tuiGoods {
		position: absolute;
		bottom: 28rpx;
		right: 24rpx;
		width: 200rpx;
		height: 50rpx;
		text-align: center;
		padding-top: 10rpx;
		color: #FFFFFF;
		right: 24rpx;
		border-radius: 10rpx;
		background-color: #E02E24;
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

	.goods-item {
		padding: 24rpx 10px;
		border-bottom: 1px solid #DBDBDB;
		height: 140rpx;
		position: relative;
	}

	.goods-box {
		padding: 24rpx;
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

	.goods-img {
		height: 140rpx;
		width: 140rpx;
		display: inline-block;
		vertical-align: middle;
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

	.cart {
		position: absolute;
		right: 24rpx;
		width: 36rpx;
		height: 36rpx;
		bottom: 28rpx;
	}

	.upSpeak {
		position: absolute;
		width: 200rpx;
		height: 50rpx;
		text-align: center;
		padding-top: 10rpx;
		color: #FFFFFF;
		right: 24rpx;
		bottom: 98rpx;
		border-radius: 10rpx;
		background-color: #E02E24;

	}

	.gift {
		width: 64rpx;
		height: 64rpx;
	}

	.set {
		right: 230rpx;
		position: absolute;
	}

	.popupImg {
		height: 50rpx;
		width: 50rpx;
	}

	.carts {
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

	.goodsSum {
		position: absolute;
		top: 10px;
		left: 66rpx;
		font-size: 20px;
		color: #Fff;
	}
</style>
