<template>
	<view class="journal-item">

		<!-- 头部 -->
		<view v-if="descover">
			<view class="TBHeader">
				<view class="Himage" @click="gotoCard2(userMap.userId)">
					<image :src="userMap.headImage" class="Pimage" mode=""></image>
					<text class="fs6a24">{{userMap.userName}}</text>
				</view>
				<view class="Hmore" @click="getMore()">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/more.png'" mode="aspectFit"></image>
				</view>
			</view>

			<!-- 更多 -->
			<view class="getMore">
				<view class="popup" v-if="popupVisble">
					<view class="ProupList fs3a28">
						<view class="ListTitle borderB" @click="share">
							<button class="fs3a28" open-type="share" style="border: none; padding: 0; background: none; line-height: inherit;"
							 :data-id="journalMap.id">分享到微信好友</button>
						</view>
						<view class="ListTitle borderB" @click="makeShareImage(journalMap.showShareImage)">生成分享图</view>
						<!-- <view v-if="journalMap.userId!=currentUser.id" class="ListTitle borderB" @click="loseInterest">不感兴趣</view> -->
						<view v-if="journalMap.userId!=currentUser.id" class="ListTitle borderB" @click="report">举报</view>
						<view class="ListTitle cancle" @click="cancle">取消</view>
					</view>
				</view>
			</view>

			<report v-if="reportVisible" @close="reportVisible = false" :journalId="journalMap.id"></report>
			<!-- <make-share-image :WXCodeUrl="WXCodeUrl" :journal="journal" v-if="makeShareImageVisible" @close="makeShareImageVisible = false"></make-share-image> -->

		</view>

		<view class="TBmiddle" v-if="journalMap.images.length > 0|| journalMap.videoUrl.length>0">
			<swiper @change="changeSwiperNum($event)" indicator-dots :interval="5000" :duration="1000" indicator-color="#E1E1E1"
			 circular="true" indicator-active-color="#6B7AF8" display-multiple-items="1">
				<swiper-item v-for="(item, index) in journalMap.images" :key="index" :display-multiple-items="index">
					<image :src="item" mode="aspectFill" class="journal-image" @click="previewImage(item)"></image>
					
				</swiper-item>
				<swiper-item v-if="journalMap.videoUrl.length>0">
					<video :src="journalMap.videoUrl" mode="aspectFill" class="journal-image"></video>
				</swiper-item>
			</swiper>
			<view class="TBMswiperNum fsf24">{{ currentNum + 1 }}/{{journalMap.videoUrl.length>1?journalMap.images.length+1:journalMap.images.length+0 }}</view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list" v-if="journal.goodsList.length > 0">
			<view class="goods" v-for="(goods, index) in journal.goodsList" :key="index" @click="openGoodsDetail(goods)">
				<view class="goods-container">
					<image class="goods-cover" :src="goods.coverImage"></image>
					<view class="goods-meta">
						<view class="goods-name single-line">{{ goods.title }}</view>
						<view class="price">￥{{ goods.preferentialPrice }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="detailCon">
			<view class="content-container" :class="{ expand }" :id="contentId" @click="openJournalDetail">
				<text>{{ journalMap.content }}</text>
			</view>

			<view class="expand-button" @click="expand = !expand" v-if="showExpand">{{ expand ? '收起' : '展开' }}</view>

		</view>
		<!-- 轮播底部段落 -->
		<view class="TBbottom">
			<view class="TBCenter fs9a24 fx-row fx-row-center fx-row-space-between">
				<view class="TBCtime">{{ journal.formatTime }}</view>
				<view class="TBCinfor fx-row fx-row-center fx-col-space-around">
					<!-- 删除 -->
					<view class="item" @click="removeJournal" v-if="isSelf">
						<image style="width: 21upx; height: 25upx" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/undel.png'"></image>
						<text>删除</text>
					</view>

					<!-- 点赞 -->
					<view class="Czan" @click="changeLike">
						<image v-if="!journalMap.praiseType" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"
						 mode=""></image>
						<image v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'" mode=""></image>
						<text>{{ journalMap.praiseCount }}</text>
					</view>

					<!-- 评论 -->
					<view class="Cmessage" @click="openJournalComment">
						<image style="width: 28upx; height: 28upx" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'"
						 mode=""></image>
						<text>{{ journalMap.commentCount }}</text>
					</view>

					<!-- 分享 -->
					<button class="Csend" open-type="share" :data-id="journalMap.id" v-if="isWechat">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/share.png'" mode=""></image>
						<text>{{ journalMap.shareCount }}</text>
					</button>
					<button class="Csend" :data-id="journalMap.id" @click="shareJournal" v-else>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/share.png'" mode=""></image>
						<text>{{ journalMap.shareCount }}</text>
					</button>

				</view>
			</view>
			<view class="TBcomment" v-if="currentUser.id">
				<image :src="currentUser.headImage"></image>
				<input v-model="commentContent" :class="{'fs3a28':!blur,'fontSizeColor':blur}" type="text" placeholder="添加评价"
				 :placeholder-style="placeholder" confirm-type="send" @confirm="sendComment" @blur="blurContent" @focus="focusContent">
			</view>
		</view>
		<!-- 轮播底部段落结束 -->
		
	
	</view>
</template>

<script>
	import report from './report.vue';
	// import makeShareImage from './makeShareImage.vue';
	export default {
		name: "JournalItem",
		components: {
			report,
			// makeShareImage,
		},
		data() {
			return {
				currentNum: 0,
				commentContent: '',
				expand: false,
				showExpand: false,
				popupVisble: false,
				reportVisible: false,
				// makeShareImageVisible: false,
				WXCodeUrl: '',
				placeholder: 'color: #AAAAAA',
				blur: false,
			};
		},

		props: {
			journal: Object,
			detail: Boolean,
			isSelf: Boolean,
			descover: Boolean,
			cardUserId: String,
		},

		mounted() {
			setTimeout(() => {
				this.calcHasExpand();
			}, 1000)

			if (this.detail) {
				this.showExpand = false;
				this.expand = true;
			}
		},

		computed: {
			journalMap() {
				return this.journal.journalMap
			},
			userMap() {
				return this.journal.userMap || this.journal.journalUserInfo
			},
			contentId() {
				return `journalContent${this.journalMap.id}`;
			},
		},

		// // #ifdef  MP-WEIXIN
		// onShareAppMessage(res) {
		// 	console.log(res);
		// 	return {
		// 		title: this.userDetails.name,
		// 		path: '/pages/item_descover/JournalDetail?id=' + this.journalMap.id,
		// 		success(p) {
		// 			this.$api.share(this.journalMap.id, 4);
		// 		}
		// 	}
		// },
		// // #endif

		methods: {
			
			// 获取二维码
			getJournalWXCodeUrlLimitless() {
				return new Promise((RES, REJ) => {
					uni.hideLoading();
					this.$api.getJournalWXCodeUrlLimitless(this.journalMap.id).then(res => {
						console.info(res);
						this.WXCodeUrl = res.WXCodeUrl;
						uni.hideLoading();
						RES();
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					})
				})

			},
			// 生成分享图
			makeShareImage(showShareImage) {
				this.getJournalWXCodeUrlLimitless().then(res => {
					this.popupVisble = false;
					// this.makeShareImageVisible = true;
					this.$emit('shareImage', {
						WXCodeUrl: this.WXCodeUrl,
						journal: this.journal
					});
				});
			},
			// 举报
			report() {
				this.popupVisble = false;
				this.reportVisible = true;
			},
			// 取消
			cancle() {
				this.popupVisble = false;
			},
			// #ifdef  APP-PLUS
			share() {
				let path='/pages/item_descover/JournalDetail?id=' + this.journalMap.id;
				this.appShare(path);
				this.popupVisble = false;
			},
			// #endif

			// 浏览别人的名片
			gotoCard2(id) {
				this.navigateTo('../businessCard2/businessCard2', {
					cardUserId: id
				});
			},
			// 更多
			getMore() {
				this.popupVisble = true;
			},
			changeSwiperNum(event) { // 轮播图图片数量
				this.currentNum = event.detail.current;
			},

			changeLike() {
				if (!this.checkHasLogin()) {
					return;
				}
	
				
				this.$api.praise(this.journalMap.id, 1).then(()=>{
					this.journalMap.praiseType = this.journalMap.praiseType ? 0 : 1;
					this.journalMap.praiseCount += this.journalMap.praiseType ? 1 : -1;
					this.$forceUpdate();
				}).catch(error => {
					
					this.showError(error);
				});
			},

			previewImage(url) {
				uni.previewImage({
					current: url,
					urls: this.journalMap.images,
				});
			},

			openJournalComment() {
				if (!this.checkHasLogin()) {
					return;
				}

				// #ifdef H5
				// 分享页面不判断是否已登录
				// 对所有需要登录的操作都跳转至下载页
				uni.navigateTo({ url: '/pages/Download' })
				return false;
				// #endif
				this.navigateTo('/item_descover/descover_Comment/descover_Comment', {
					id: this.journalMap.id,
					count: this.journalMap.commentCount
				});
			},

			openGoodsDetail(goods) {
				this.navigateTo('/module/shop/goodsDetail/goodsDetail', {
					goodsId: goods.id,
					shopId: goods.shopId,
					cardUserId: this.userMap ? this.userMap.id : this.cardUserId
				});
			},
			blurContent() {
				this.blur = true;
			},
			focusContent() {
				this.blur = false;
			},
			sendComment() {
				if (!this.checkHasLogin()) {
					return;
				}
				if (this.commentContent.trim().length === 0) {
					this.showTips('请输入评价内容')
					return;
				}
				if (this.checkHasSensitiveWord(this.commentContent)) {
					return;
				}

				uni.showLoading();
				this.$api.setJournalComment(this.journalMap.id, this.commentContent).then(result => {
					this.showTips('评价成功');
					this.commentContent = '';
					this.journalMap.commentCount++;
				}).catch(error => {
					uni.hideLoading();
					this.showError(error);
				})
			},
			calcHasExpand() {
				var query = uni.createSelectorQuery();
				query.select(`#journalContent${this.journalMap.id}`).boundingClientRect()
				query.exec(res => {
					if (this.detail) return;
					console.log(res)
					if (res[0]) {
						this.showExpand = res[0].height >= 18 * 3;
					} else {
						this.showExpand = this.journalMap.content.length > 60;
					}
				})
			},

			openJournalDetail() {
				if (this.detail) return;
				this.navigateTo('/item_descover/journalDetail/journalDetail', {
					id: this.journalMap.id
				});
			},

			removeJournal() {
				const postDelete = () => {
					uni.hideLoading();
					this.$api.deleteUserJournal(this.journalMap.id).then(result => {
						uni.hideLoading();
						this.showTips('删除成功')
						this.$emit('deleteSuccess');
						this.$store.commit('setNeedUpdateDiscovery', true);
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					})
				}

				uni.showModal({
					title: '提示',
					content: '是否删除该日志？',
					success: (res) => {
						if (res.confirm) {
							postDelete();
						}
					}
				});
			},

			shareJournal () {
				this.appShare('/pages/item_descover/JournalDetail?id=' + this.journalMap.id, '发现一条有意思的动态')
			},

		},

	}
</script>

<style scoped lang="less">
	.journal-item {
		background: rgba(255, 255, 255, 1);
		border-radius: 8upx;
		margin-bottom: 30upx;
		border-radius: 8upx;
	}

	.TBHeader {
		padding: 30upx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.Himage {
			width: 80%;

			.Pimage {
				width: 60upx;
				height: 60upx;
				vertical-align: middle;
				margin-right: 30upx;
			}
		}

		.Hmore {
			width: 20%;
			text-align: right;

			image {
				width: 36upx;
				height: 8upx;
				vertical-align: middle;
			}
		}
	}

	.getMore {
		z-index: 99999999;

		.popup {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
			text-align: center;
			z-index: 99999999;

			.ProupList {
				width: 100%;
				height: auto;
				position: absolute;
				bottom: 0;

				.ListTitle {
					padding: 25upx 0;
					background: #fff;

					button::after {
						border: 0;
					}
				}

				.cancle {
					margin-top: 8upx;
				}
			}
		}
	}

	.image-empty-padding {
		height: 30upx;
	}

	.journal-image {
		width: 100%;
		height: 100%;
	}

	// 轮播图片
	.TBmiddle {
		position: relative;
		width: 100%;

		swiper {
			width: 100%;
			height: 750upx;
			z-index: 0;

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
			display: flex;

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
				width: 80%;
				text-align: right;
				display: flex;

				.item {
					display: flex;
					align-items: center;
				}

				.Czan,
				.Cmessage,
				.Csend {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					/*width: 33.33%;*/
				}

				.Csend {
					border: none;
					background: none;
					padding: 0;
					font-size: 24upx;
					color: #999999;
					text-align: right;
					line-height: initial;

					&:after {
						display: none;
					}
				}
			}
		}

		.TBcomment {
			image {
				width: 50upx;
				height: 50upx;
				vertical-align: top;
				margin-right: 20upx;
			}

			input {
				font-size: 28upx;
				width: 80%;
				display: inline-block;
			}

			.fontSizeColor {
				color: #aaa;
			}
		}
	}

	.detailCon {
		width: 90%;
		margin: 0 auto;
		padding: 28upx 0;
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

	.goods-list {
		background-color: #ffffff;
		padding: 30upx;
		overflow-x: auto;
		white-space: nowrap;
		z-index: 0;

		.goods {
			padding: 20upx;
			background: rgba(245, 245, 245, 1);
			display: inline-block;
			width: 610upx;
			position: relative;
			margin-right: 20upx;
		}

		.goods-container {
			display: flex;
			overflow: hidden;
		}

		.goods-cover {
			width: 140upx;
			height: 140upx;
			margin-right: 44upx;
			flex-basis: 140upx;
		}

		.goods-meta {
			flex: 1;
			position: relative;
			width: 0;
		}

		.goods-name {
			font-size: 28upx;
			color: rgba(51, 51, 51, 1);
			line-height: 40upx;
		}

		.price {
			position: absolute;
			font-size: 30upx;
			color: rgba(255, 88, 88, 1);
			line-height: 42upx;
			bottom: 0;
			left: 0;
		}

		.close-area {
			width: 36upx;
			height: 36upx;
			position: relative;

			image {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 18upx;
				height: 18upx;
			}
		}
	}

	.detailCon {
		position: relative;
		line-height: 36upx;

		.content-container {
			max-height: 108upx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;

			&.expand {
				max-height: initial;
				-webkit-line-clamp: initial;
				/*height: auto;*/
			}
		}

		.expand-button {
			position: absolute;
			right: 0;
			bottom: 0;
			font-weight: bold;
			font-size: 28upx;
		}
	}
</style>
