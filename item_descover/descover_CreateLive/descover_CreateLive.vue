<template>
	<view>
		<live-pusher :url="readyLives" class="lp" :beauty="beauty" :enable-mic="enablemic" mode="HD" :device-position="position"></live-pusher>
		<view class="live-number">
			直播间ID:{{liveId}}
		</view>
		<view class="card" @click="openCard">
			<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.GTkmskHIB5Ebcc15a8d9cb9477da377a21f83cb7a82c.png"
			 style="width: 44rpx;height: 44rpx;"></image>
		</view>
		<view class="set" @click="openPopup">
			<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Rj7Sl8xjsQ7g855a5f4e0bae72a59940472fcedc1705.png"
			 style="width: 44rpx;height: 44rpx;"></image>
		</view>
		<view class="history" @click="goHistory">
			<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.8fPkDOksy40tfdbcda439a249adc04414270fb50a0f1.png"
			 style="width: 44rpx;height: 44rpx;"></image>
		</view>
		<view class="top-box">
			<view class="top-cont">
				<view class="top-cont-one">
					<image :src="cover" @click="setImage"></image>
					<view class="top-cont-one-but">更换封面</view>
				</view>
				<view class="cont">
					<view class="title"><input type="text" value="" v-model="title" placeholder="请填写标题" @blur="titleBlur" /></view>
					<view class="address">
						<view class="getAddress" v-if="isshow" @click="getLocation"> 获取当前地址</view>
						<image src="../../static/chat/icon-location.png" mode="" style="width: 36rpx;height: 36rpx;" v-else></image>
						<view class="showAddress" v-if="!isshow">{{address}}</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
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

		<view class="selectGoods" @click="selectGood">
			<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.tsNcSNyRkvf12aff0839e3dcc66d4b8c419ef9658bd7.png"
			 mode="" style="width: 90rpx;height: 90rpx;"></image>
			<!-- <view class="goodsSum">{{goodsSum}}</view> -->
		</view>
		<view @click="open" class="but">发起直播</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {
		upVideo,
		upImg,
		uploadFile,
		formatTime
	} from '../../js/mzl.js'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				noShop: false,
				selToID: 61,
				isTimReady: false,
				userInfo: {},
				groupInfo: {},
				isshow: true,
				ownerInfo: {},
				noticeText: '',
				message: '',
				position: 'front',
				address: '',
				enablemic: false,
				cover: '',
				beauty: '',
				sliderShow: false,
				recommendGoods: null,
				latitude: '',
				liveIds: '',
				longitude: '',
				livePusher: '',
				readyLives: '',
				goodsSum: 0,
				playUrl: '',
				liveId: '',
				title: '',
				urls: 'rtmp://11576.livepush.myqcloud.com/xkqd-live/6989456?txSecret=a221f3c8762ce7e06c78c9fcc90bdc69&txTime=5ED282FF',
				relatedGoods: []
			}
		},
		onLoad() {
			this.cover = uni.getStorageSync('headImage')
			this.$store.dispatch('resetJournalPublish');
			this.context = uni.createLivePusherContext("livePusher", this);
			this.ready()
			console.log(this.urls)
		},
		onShow() {
			const journal = this.journal;
			if (journal.goodsList.length > 0 ||journal.list.length>0) {
				this.goodsSum = journal.goodsList.length + journal.list.length
			}
			console.log(this.goodsSum)
		},
		onReady() {
			setTimeout(() => {

				this.startPreview()
			}, 1000)
		},
		methods: {
			ready() {
				uni.showLoading();
				this.$api.readyLive().then(res => {
					uni.hideLoading()
					//this.readyLives = res.pushUrl
					this.liveId = res.liveId

				})
			},
			open() {
				if (this.title == '') {
					uni.showModal({
						title: '提示',
						content: '请填写直播间标题',
						success: function(res) {
							if (res.confirm) {}
						}
					})
					return
				}
				const journal = this.journal;
				let e = []
				let f = []
				let c = []
				let g = []
				let h = []
				g = journal.goodsList.map(item => {
					return {
						identity: 0,
						goodsId: item.goodsId,
						title: item.title,
						repertory: item.repertory,
						coverImage: item.coverImage,
						preferentialPrice: item.preferentialPrice,
						type: 2,
					}
				})
				h = journal.list.map(item => {
					return {
						identity: 0,
						goodsId: item.goodsId,
						title: item.goodsName,
						id: item.id,
						repertory: item.repertory,
						coverImage: item.cover,
						preferentialPrice: item.preferentialPrice,
						type: 2,
					}
				})
				for (let i in g) {
					f.push(g[i])
				}
				for (let i in h) {
					f.push(h[i])
					c.push(h[i].goodsId, h[i].id)
				}
				let a = journal.goodsList.map(item => item.goodsId)
				if (a.length > 0) {
					a = a.map(item => {
						return {
							goodsId: item,
							type: 2,
							identity: 0
						}
					})
					for (let i = 0; i < a.length; i++) {
						e.push(a[i])
					}
				}
				if (c.length > 0) {
					c = journal.list.map(item => {
						return {
							goodsId: item.goodsId,
							identity: item.id,
							type: 2,
						}
					})
					for (let i = 0; i < c.length; i++) {
						e.push(c[i])
					}
				}
				var obj = {};
				e = e.reduce(function(item, next) {
					obj[next.goodsId] ? '' : obj[next.goodsId] = true && item.push(next);
					return item;
				}, []);
				this.relatedGoods = JSON.stringify(e)
				wx.showLoading()
				this.$api.openLive(this.liveId, this.cover, this.recommendGoods, this.relatedGoods, this.latitude, this.title,
					this.longitude).then(res => {
					wx.hideLoading()
					this.livePusher = res.pushUrl
					this.playUrl = res.playUrl
					uni.setStorageSync('livePusher', this.livePusher)
					uni.setStorageSync('playUrl', this.playUrl)
					uni.navigateTo({
						url: '../descover_Live/descover_Live?liveId=' + this.liveId + '&relatedGoods=' + JSON.stringify(f)
					})
					this.stopPreview()
				})
				.catch(err=>{
					uni.showToast({
						title:err.message,
						duration:2000
					})
				})

			},
			sliderChange(e) {
				console.log(e.detail.value)
				this.beauty = e.detail.value
			},
			titleBlur(event) {
				this.title = event.detail.value
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
			selectGood() {
				console.log(123)
				uni.navigateTo({
					url: 'descover_SelectGoods?livePusher=' + this.livePusher
				});
			},
			goHistory() {
				uni.navigateTo({
					url: 'descover_History'
				})
			},
			switchCamera() {
				this.context.switchCamera({
					success: (a) => {
						console.log("livePusher.switchCamera:" + JSON.stringify(a));
					}
				});
			},
			stopPreview() {
				this.context.stopPreview({
					success: (a) => {
						console.log("livePusher.stopPreview:" + JSON.stringify(a));
					}
				});
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
			openCard() {
				uni.navigateTo({
					url: 'descover_getMoney'
				})
			},
			openPopup() {
				this.$refs.popup.open()
			},
			setImage() {
				upImg(res => {
					this.cover = res
				})
			},

			startPreview() {
				this.context.startPreview({
					success: (a) => {
						console.log("livePusher.startPreview:" + JSON.stringify(a));
					}
				});
			},
			stop() {
				this.context.stop({
					success: (a) => {
						console.log(JSON.stringify(a));
					}
				});
			},
		},
		computed: {
			journal() {
				return this.$store.state.journalPublish;
			},

		}
	}
</script>

<style>
	.top-box {
		border-radius: 20rpx;
		background: rgba(0, 0, 0, .2);
		padding: 20rpx;
		margin-left: 30rpx;
		width: 650rpx;
		margin-top: 100rpx;
		position: fixed;
		z-index: 999;
	}

	.but {
		position: fixed;
		bottom: 50rpx;
		width: 690rpx;
		border-radius: 40rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		text-align: center;
		font-size: 30rpx;
		color: white;
		margin-left: 30rpx;
		background: #E02E24;
	}

	.top-title {
		color: white;
		font-size: 30rpx;

	}

	.top-cont {
		padding-top: 20rpx;
		display: flex;
		align-items: flex-start;

	}

	.address {
		padding-left: 20rpx;
		color: white;
		font-size: 30rpx;
		display: flex;
		flex-direction: row;
	}

	.live-number {
		position: fixed;
		margin-top: 30rpx;
		font-size: 14px;
		color: #FFFFFF;
		margin-left: 30rpx;
	}

	.top-cont-one {
		position: relative;
		width: 150rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
	}

	.card {
		position: fixed;
		margin-top: 20rpx;
		right: 230rpx;
		width: 62rpx;
		height: 52rpx;
		border-radius: 40rpx;
		background-color: rgba(0, 0, 0, .2);
		padding-top: 8rpx;
		text-align: center;
	}

	.history {
		position: fixed;
		margin-top: 20rpx;
		right: 130rpx;

		width: 62rpx;
		height: 52rpx;
		border-radius: 40rpx;
		background-color: rgba(0, 0, 0, .2);
		padding-top: 8rpx;
		text-align: center;
	}

	.set {
		position: fixed;
		margin-top: 20rpx;
		right: 30rpx;
		width: 62rpx;
		height: 52rpx;
		border-radius: 40rpx;
		background-color: rgba(0, 0, 0, .2);
		padding-top: 8rpx;
		text-align: center;

	}

	.slider {
		position: absolute;
		bottom: 300rpx;
		left: 50rpx;
		right: 50rpx;

	}

	.top-cont-one>image {
		width: 150rpx;
		height: 150rpx;
		position: absolute;
		top: 0rpx;
	}

	.bottomPopup {
		text-align: center;
		margin-top: 50rpx;
	}

	.selectGoods {
		width: 90rpx;
		height: 90rpx;
		right: 40rpx;
		bottom: 300rpx;
		position: fixed;
	}

	.popup {
		height: 200rpx;
		display: inline-flex;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.showAddress {
		padding-left: 15rpx;
	}

	.popupImg {
		height: 50rpx;
		width: 50rpx;
	}

	.top-cont-one-but {
		width: 150rpx;
		position: relative;
		z-index: 1;
		background: rgba(0, 0, 0, .2);
		color: white;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		text-align: center;
		font-size: 24rpx;
	}

	.goodsSum {
		position: absolute;
		top: 30rpx;
		font-size: 24px;
		color: #fff;
		left: 31rpx;
	}

	.lp {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}

	.title {
		padding-left: 20rpx;
		color: white;
		font-size: 30rpx;
		margin-bottom: 70rpx;
	}
</style>
