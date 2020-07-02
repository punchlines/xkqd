import {
	upImg
} from '@/js/mzl.js'
export default {
	data() {
		return {
			emoiconExpand: false,
			showToolArea: false,
			emoicon: [],
			showVoiceCtrl: false,
			cancelSend: false,
			inputText: '',
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			list: [

			],
			audioContext: null, //播放器实例
			currentId: null, //当前播放id
			recorderManager: null, //录音
			startTime: 0,
			voicePath: null,
			videoContext: null,
			src: "",
			showVideo: false,
			lastMsgId: ''
		}
	},
	computed: {

	},

	onLoad() {
		this.audioContext = uni.createInnerAudioContext();
		this.recorderManager = uni.getRecorderManager();
		this.videoContext = uni.createVideoContext('myVideo')
		// #ifdef MP-WEIXIN
		//获取录音授权
		uni.authorize({
			scope: 'scope.record',
			success() {
				console.log("授权成功")
			}
		});
		// #endif

		this.recorderManager.onStop(async (res) => { //停止
			if (this.cancelSend) {
				this.showVoiceCtrl = false;
				this.cancelSend = false;
				this.hideLoading();
				return;
			}
			if (res.duration <= 800) {
				this.showVoiceCtrl = false;
				this.hideLoading();
				return this.showTips("录音时间太短")
			}
			console.log(res)

			this.showVoiceCtrl = false;

			this.voicePath = res.tempFilePath;
			//上传cos
			const uploadUrl = await this.uploadFile(this.voicePath);
			const duration = Math.round(res.duration / 1000);


			this.$api.sendMessage(this.circleId, uploadUrl, duration, 1).then(res => {
				this.hideLoading();

				this.list.push({
					id: res,
					type: 1,
					data: uploadUrl,
					isPlaying: false,
					duration: duration,
					own: true,
					headImage: this.currentUser.headImage
				});

				this.scrollToEnd();
			}).catch(err => {
				this.hideLoading();
				this.showError(err);
			});



		});

		this.recorderManager.onError((err) => { //出错
			console.log('recorder err' + JSON.stringify(err));
			this.showVoiceCtrl = false;
			this.cancelSend = false;
			if (err.errMsg.indexOf('auth deny') != -1) {
				//授权拒绝
				uni.showModal({
					content: "请授权获取录音权限",
					success(res) {
						if (res.confirm) {
							uni.openSetting({
								success(res) {
									console.log(res.authSetting)
								}
							});
						}
					}
				})

			}

		});

		this.audioContext.onEnded(() => {
			console.log("ended")
			const currentIndex = this.resetVoice();
			//向下遍历找下一个语音
			for (let i = currentIndex + 1; i < this.list.length; i++) {
				const item = this.list[i];
				if (item.type == 1) {
					this.playVoice(i);
					break
				} else continue;
			}
		})
	},

	methods: {

		transMsg() {
			const msgId = this.list[this.actionIndex].id;
			this.navigateTo('/item_businessCardCircle/businessCC_TransMsg/businessCC_TransMsg', {
				msgId
			});
		},

		deleteMsg() {
			if (!this.list[this.actionIndex].own) {
				return this.showTips("只能删除自己的消息");
			}

			uni.showModal({
				title: '提示',
				content: '确定删除?',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						const msgId = this.list[this.actionIndex].id;
						this.$api.deleteCircleMessage(this.circleId, msgId).then(res => {
							this.list.splice(this.actionIndex, 1);
						}).catch(err => {
							this.showError(err);
						});
					}

				}
			});

		},

		goTuan() {
			if (this.currentUser.userType > 1 && this.currentUser.userType < 5) {
				uni.navigateTo({
					url: "/item_pinGroup/businessCC_setPinGroup/businessCC_setPinGroup"
				});
			} else {
				uni.navigateTo({
					url: "/item_businessCard/businessCard_VIP/businessCard_VIP_New"
				});
			}
		},
		kaiShop() {
			let shopId = uni.getStorageSync('shopId');
			let goodsNum = uni.getStorageSync('goodsNum');
			if (this.currentUser.userType <= 1) { //未开通 到VIP页面
				uni.showModal({
					content:'尚未开通VIP',
					confirmText:'开通',
					success: (res) => {
						if(res.confirm){
							uni.navigateTo({
								url: "/item_businessCard/businessCard_VIP/businessCard_VIP_New"
							});
						}else if(res.cancel){
							 console.log('用户点击取消');
						}
					}
	
				})
				
			} else if(!shopId) {
				// 我的店铺
					uni.showModal({
						content:'尚未开通店铺',
						confirmText:'开通',
						success: (res) => {
							if(res.confirm){
								this.navigateTo('/item_businessCard/businessCard_ShopInfo/step2_1/step2_1')
							}else if(res.cancel){
								 console.log('用户点击取消');
							}
						}
					})
				} else if(goodsNum<1){ //TODO
					uni.showModal({
						content:'店铺没有商品，请添加商品',
						confirmText:'进入',
						success: (res) => {
							if(res.confirm){
								this.navigateTo('../../item_businessCard/businessCard_MyShop/businessCard_MyShop', {
									shopId: shopId,
									userId: this.currentUser.id,
									cardUserId: this.currentUser.id,
									recommendId: this.currentUser.id
								});
							}else if(res.cancel){
								 console.log('用户点击取消');
							}
						}
						
					})
				}else{
					uni.showModal({
						content:'分享店铺名片',
						confirmText:'分享',
						success: (res) => {
							if(res.confirm){
								const content={
									"userId":JSON.stringify(this.currentUser.id),
									"shopId":JSON.stringify(shopId)
								}
								
								
								uni.showLoading()
								this.$api.sendMessage(this.circleId,JSON.stringify(content),"",5).then(res1=>{
									
									 this.$api.getMessageShopInfo(this.circleId,shopId).then(res2=>{
										uni.hideLoading()
										this.list.push({
											id: res1,
											type: 5,
											data: res2,
											own: true,
											headImage: this.currentUser.headImage
										});
									})
									this.scrollToEnd()
									
									
								})
							}
						}
					})
				}
			},

		

		scroll(e) {
			this.old.scrollTop = e.detail.scrollTop
		},

		scrollToEnd() {
			console.log('123',this.currentPage)
				const lastId = 	this.list.length - 1;
			this.lastMsgId = 'msg' + lastId;
			console.log(this.lastMsgId)
		},
		playVoice(index) {
			if (this.list[index].isPlaying) {
				this.resetVoice();
			} else {
				if (this.currentId) {
					this.resetVoice();
				}
				this.currentId = this.list[index].id;
				this.audioContext.src = this.list[index].data;
				this.audioContext.play();
				this.$set(this.list[index], 'isPlaying', true);
			}
		},

		uploadFile(path) {
			return new Promise((res, rej) => {
				this.$api.uploadFile(path,
					(url) => {
						if (url) {
							res(url)

						} else rej(url)
					},
					(err) => {
						rej(url)
					}
				)
			});

		},

		fetchMessage(scroll) {
			console.log(scroll, "scroll")
			if (this.noMore || this.loading) return;
			this.loading = true;
			uni.showLoading({
				mask: true
			});
			this.$api.messageList(this.circleId, this.currentPage).then(res => {
				
				

				for (let i=0;i<res.length;i++) {
						try{
							if (res[i].createTime - res[i+1].createTime > 300000) {
								console.log(res[i].createTime)
							}else{
								res[i].createTime=null
							}
						}catch(e){
							//TODO handle the exception
							console.log(e)
						}		
				}
				
				 
				const _list = res.map(item => {
					if (item.type == 0) {
						const message = this.disposeEmoji(item.content);

						return {
							id: item.id,
							type: 0,
							own: item.userId == this.currentUser.id,
							data: message,
							headImage: item.headImage,
							userId: item.userId,
							userName: item.userName,
							isManager: item.isManager,
							createTime: item.createTime
						}
					} else if (item.type == 1 || item.type == 2) {

						return {
							id: item.id,
							type: item.type,
							idPlaying: false,
							own: item.userId == this.currentUser.id,
							data: item.content,
							headImage: item.headImage,
							duration: item.time,
							userId: item.userId,
							userName: item.userName,
							isManager: item.isManager,
							createTime: item.createTime
						}

					} else if (item.type == 4) {

						return {
							id: item.id,
							type: 4,
							own: item.userId == this.currentUser.id,
							data: item.content,
							headImage: item.headImage,
							userId: item.userId,
							userName: item.userName,
							isManager: item.isManager,
							createTime: item.createTime
						}

					}else if(item.type==5){
						return{
							id: item.id,
							type: 5,
							own: item.userId == this.currentUser.id,
							data: JSON.parse(item.content),
							headImage: item.headImage,
							userId: item.userId,
							userName: item.userName,
							isManager: item.isManager,
							createTime: item.createTime,
						}
						
					}else if(item.type==6){
						return{
						id: item.id,
						type: 6,
						own: item.userId == this.currentUser.id,
						data: JSON.parse(item.content),
						headImage: item.headImage,
						userId: item.userId,
						userName: item.userName,
						isManager: item.isManager,
						createTime: item.createTime,
						}
					}


				}).reverse();


				this.list = _list.concat(this.list);

				if (res.length < 20) {

					this.noMore = true;
				}

				if (scroll && scroll.detail) {
					uni.hideLoading();
					this.loading = false;
					//console.log(this.currentPage)
					 //if(this.currentPage>=2){
						 //this.scrollToEnd();
					 //}
					// this.$nextTick(()=>{
					// 	setTimeout(()=>{
					// 		//this.loading=false;
					// 		//uni.hideLoading();
					// 		this.lastMsgId="msg"+_list.length-1;
					// 	}, 300);
					// 	console.log(this.lastMsgId)
					// });
					
					// return;
				} else {
					this.$nextTick(() => {
						uni.hideLoading();
						this.loading = false;
						console.log('列表',this.list)
						this.scrollToEnd();
					})
				}


				this.currentPage += 1;
			});
		},

		sendVideo() {
			if (this.isShutUp) {
				return this.showTips("该群已禁言,无法发言")
			}
			uni.chooseVideo({
				success: async (res2) => {
					this.showLoading();

					const uploadUrl = await this.uploadFile(res2.tempFilePath);
					const duration = Math.round(res2.duration);

					this.$api.sendMessage(this.circleId, uploadUrl, duration, 2).then(res => {
						this.hideLoading();

						this.list.push({
							id: res,
							type: 2,
							data: uploadUrl,
							duration: duration,
							own: true,
							headImage: this.currentUser.headImage
						});

						this.scrollToEnd();
					}).catch(err => {
						this.hideLoading();
						this.showError(err);
					});
				}
			});
		},

		resetVoice() {
			const currentIndex = this.list.findIndex(item => item.id == this.currentId);
			this.$set(this.list[currentIndex], 'isPlaying', false);
			this.audioContext.stop();
			this.currentId = null;
			this.audioContext.src = "url";
			return currentIndex;
		},

		chooseLocation() {
			if (this.isShutUp) {
				return this.showTips("该群已禁言,无法发言")
			}
			uni.chooseLocation({
				success: (res) => {
					this.showToolArea = false;

					const message = this.disposeEmoji(`[我的位置]${res.address}${res.name}`);
					this.showLoading();
					this.$api.sendMessage(this.circleId, `[我的位置]${res.address}${res.name}`, "", 0).then(res2 => {
						this.hideLoading();
						this.list.push({
							id: res2,
							type: 0,
							own: true,
							headImage: this.currentUser.headImage,
							data: [{
								type: "text",
								msg: `[我的位置]${res.address}${res.name}`
							}]
						});
						this.inputText = "";
						this.scrollToEnd();
					}).catch(err => {
						this.hideLoading();
						this.showError(err);
					});

				}
			});
		},

		disposeEmoji(text) {
			var b = text.split(/(:\[\d*\])/);
			b = b.filter(item => item != "").map(item => {
				if (item.match(/:\[\d*\]/)) {
					let msg = item.replace(/:\[(\d*)\]/, '$1.gif')
					return {
						type: 'img',
						msg: msg
					}
				} else {
					return {
						type: 'text',
						msg: item
					}
				}
			})
			return b;
		},

		appendEmoji(index) {
			this.inputText += this.emoicon[index].key;
		},
		startRecord() {
			if (this.isShutUp) {
				return this.showTips("该群已禁言,无法发言")
			}
			this.showVoiceCtrl = true;
			this.recorderManager.start({
				format: 'mp3'
			});
		},

		moveToCancel(e) {
			const sh = this.$store.state.systemInfo.screenHeight;
			// #ifdef MP-WEIXIN
			var safeArea = this.$store.state.systemInfo.safeArea.bottom - this.$store.state.systemInfo.safeArea.height || 0;
			// #endif

			// #ifndef MP-WEIXIN
			var safeArea = 0;
			// #endif

			const maxY = sh - uni.upx2px(176 + safeArea);
			const minY = sh - uni.upx2px(176 + 365 + safeArea);
			const pY = e.mp.touches[0].pageY;
			const maxX = uni.upx2px(194.5 + 361);
			const minX = uni.upx2px(194.5);
			const pX = e.mp.touches[0].pageX;
			if (pY <= maxY && pY >= minY && pX <= maxX && pX >= minX) {
				this.cancelSend = true;

			} else this.cancelSend = false;
		},

		sendVoice() {
			if (this.isShutUp) {
				return
			}
			this.recorderManager.stop();
			uni.showLoading();
		},

		sendMessage() {
			console.log("send");
			if (this.isShutUp) {
				return this.showTips("该群已禁言,无法发言")
			}

			const message = this.disposeEmoji(this.inputText);
			this.showLoading();
			this.$api.sendMessage(this.circleId, this.inputText, "", 0).then(res => {
				this.hideLoading();
				this.list.push({
					id: res,
					type: 0,
					own: true,
					data: message,
					headImage: this.currentUser.headImage
				})
				this.inputText = "";
				this.scrollToEnd();
			}).catch(err => {
				this.hideLoading();
				this.showError(err);
			});


		},

		sendPic() {
			if (this.isShutUp) {
				return this.showTips("该群已禁言,无法发言")
			}
			this.showToolArea = false;

			upImg((url) => {

				this.showLoading();
				this.$api.sendMessage(this.circleId, url, "", 4).then(res => {
					this.hideLoading();
					this.list.push({
						id: res,
						type: 4,
						own: true,
						data: url,
						headImage: this.currentUser.headImage
					})
					this.scrollToEnd();
				}).catch(err => {
					this.hideLoading();
					this.showError(err);
				});
			}, 1, 1);
		},

		playVideo(index) {
			console.log(index)
			this.showVideo = true;
			this.src = this.list[index].data;

			this.videoContext.requestFullScreen({
				direction: 0
			});
		},

		exitFullScreen(e) {
			console.log(e)
			if (!e.detail.fullScreen) {
				this.videoContext.pause();
				this.videoContext.stop();
			} else {
				this.videoContext.play();
			}
		},
	}

}
