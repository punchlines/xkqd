<template>
	<view>
		<view class="content-user-text">
			<QSTabs :current="current_1" :tabs="tabs_1" minWidth="375" @change="changes($event, '1')" activeBold="true"
			 animationLineWidth="30" defaultColor="#333333" activeColor="#2EA1FF" height="100" lineColor="#2EA1FF" />
		</view>
		<view class="bodys" v-if="isshowDetail">
			<view class="Coursetitle">介绍</view>
			<view class="desc">{{detail.course.describe}}</view>
		</view>
		<view class="body" v-if="showVideo">
			<view class="videoBox">
				<video id="myVideo" v-if="detail.nodeList.length>0" class="video" :src="detail.nodeList[currentIndex].video"
				 :poster="detail.nodeList[currentIndex].cover"></video>

			</view>



			<template v-if="canEdit==1">
				<view class="btn" @click="setInvite" v-if="show"><text>推广</text></view>
				<view class="btn cancel" @click="isSetInvite" v-if="isshow"><text>取消</text></view>
				<view class="btn save" @click="editCourse"><text>编辑</text></view>
			</template>

			<view class="h3" style="margin-top: 510rpx; margin-left: 30rpx; margin-right: 30rpx;">视频</view>
			<!-- 章节列表 -->
			<view class="courseList">

				<view class="courseItem" v-for="(item,index) in detail.nodeList" :key="index" @click="goChapterDetail(index)">
					<view style="position: relative;">
						<image :src="item.cover" class="courseImage" mode=""></image>
						<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.Diy5vaCCRaLX38e1aca00bc48288d1d3d8000a71f585.png"
						 style="width: 80rpx; height: 80rpx; position: absolute; top: 0px; right: 0px; bottom: 0px; right: 0px; margin: auto; left: 0px;"></image>
					</view>
					<view class="chapterTip">{{formateSeconds(parseInt(item.time))}}</view>
					<view class="info">
						<view class="title">{{item.title}}</view>
					</view>
				</view>
			</view>
			<!-- 打赏 -->

			<view class="RewardBox fx-column fx-row-space-around fx-row-center">
				<view class="Reward" @click="openReward">赏</view>
				<view style="margin-top: 20rpx;">共有{{reward.count}}人打赏</view>
				<view class="fx-row fx-wrap fx-row-start" style="margin-top: 10rpx;padding: 0 30rpx;width: auto;">
					<image v-for="(item,index) in reward.list" :key="index" :src="item" class="avatar"></image>
				</view>
			</view>
			<!-- 评论 -->
			<view class="commentContainer">
				<view class="topicTitle">
					<view class="titleTxt">
						<text class="title_txt">精彩评论</text>
						<!-- <text class="title_txt">(0)</text> -->
					</view>
					<view style="height: 15rpx; width: 100%; background-color: #F5f5f5;"></view>
				</view>
				<template v-for="(item,index) in list">
					<course-comment :item="item" :key="index" @deleteComment="deleteComment(index)" @reply="reply(index)"></course-comment>
				</template>
			</view>
			<view class="sayContainer">
				<input v-model="commentContent" confirm-type="send" @confirm="send" type="text" :placeholder="commentPlaceholder"
				 class="input" placeholder-class="tishi" />
				<text class="sendMess" @click="send">评论</text>
			</view>
			<uni-popup ref="popup" type="center">
				<view class="RewardContent">
					<view class="title">请选择打赏金额</view>
					<view class="priceBox fx-row fx-row-space-between fx-wrap">
						<view class="price" v-for="(item,index) in detail.rewards" @click="change(index)" :key="index">
							<view class="priceInner" :class="{'active':index==active}">{{item}} 元</view>
						</view>
					</view>
					<view class="pay" @click="pay">微信支付</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	import loadMoreMixins from "@/js/mixins/loadMoreMixins2.js";
	import {
		formateSeconds
	} from '@/js/mzl.js'
	import uniPopup from "../_components/uni-popup/uni-popup.vue"
	import courseComment from "../_components/courseComment.vue"
	export default {
		mixins: [loadMoreMixins],
		data() {
			return {
				id: "",
				detail: "",
				circleId: "",
				currentIndex: 0,
				videoContext: null,
				active: 0,
				show: true,
				current_1: 0,
				tabs_1: ['视频', '视频介绍'],
				isshow: false,
				canEdit: 0,
				commentContent: '',
				showVideo: true,
				isshowDetail: false,
				commentType: 0,
				list: [],
				replyUserId: null,
				replyUserName: "",
				reward: {
					count: 0,
					list: []
				}
			};
		},
		components: {
			uniPopup,
			courseComment,
			QSTabs
		},

		onLoad(option) {
			this.id = option.id;
			this.circleId = option.circleId;
			this.videoContext = uni.createVideoContext('myVideo')
			this.canEdit = option.canEdit;
			this.fetch();
			this.getReward();
			console.log(option)

		},

		onShow() {
			this.$api.getCourseInfo(this.id).then(detail => {
				this.detail = detail;
				if (detail.course.isExtension == 1) {
					this.show = false
					this.isshow = true
				} else {
					this.show = true
					this.isshow = false
				}
			})
		},

		computed: {
			commentPlaceholder() {
				if (this.commentType == 0) {
					return "输入你想说的话"
				} else {
					return "回复: @" + this.replyUserName
				}

			}
		},

		methods: {
			getReward(type = 0) {
				this.$api.getCourseRewardUserList(type, this.id).then(res => {
					this.reward = res;
				})
			},

			resetInput() {
				this.commentType = 0;
				this.commentContent = "";
				this.replyUserId = null;
				this.replyUserName = "";
			},

			send() {
				if (!this.commentContent) {
					return this.showTips("请输入内容！")
				}

				this.$api.saveCourseComment(this.commentContent, this.id, this.replyUserId).then(res => {
					this.showTips("评论成功");
					this.list.unshift({
						callUserFace: "",
						callUserId: this.replyUserId,
						callUserName: this.replyUserName,
						content: this.commentContent,
						courseId: this.id,
						createTime: new Date().getTime(),
						id: res,
						star: 5,
						userFace: this.currentUser.headImage,
						userId: this.currentUser.id,
						userName: this.currentUser.name
					})

					this.resetInput();
				}).catch(err => {
					this.showError(err)
				})


			},
			changes(index, i) {
				this['current_' + i] = index;
				if (index == 0) {
					this.showVideo = true
					this.isshowDetail = false
				} else {
					this.isshowDetail = true
					this.showVideo = false
				}
			},
			reply(index) {

				this.replyUserId = this.list[index].userId
				this.replyUserName = this.list[index].userName
				this.commentType = 1;
			},

			deleteComment(index) {
				uni.showModal({
					showCancel: true,
					content: "确定删除这条评论?",
					success: (res) => {
						if (res.confirm) {
							this.$api.delCourseComment(this.list[index].id).then(res => {
								this.showTips("删除成功")
								this.list.splice(index, 1)
							}).catch(err => {
								this.showError(err)
							})
						}
					}
				})
			},
			fetch() {
				uni.showLoading();
				this.loading = true;
				this.$api.getCourseCommentList(this.id, this.currentPage).then(res => {
					uni.hideLoading();
					this.loading = false;
					this.currentPage++;

					if (res.length == 0) {
						this.noMore = true;
						return;
					}

					this.list = this.list.concat(res);
				}).catch(err => {
					uni.hideLoading();
					this.showError(err)
				})
			},

			change(index) {
				this.active = index
			},

			openReward() {
				this.$refs.popup.open()
			},
			pay() {
				this.$api.saveCircleCourseRewardOrder(this.circleId, this.id, this.detail.rewards[this.active]).then(res => {
					let orderNum = res;
					return this.$api.unifiedorder(orderNum)
					// this.$refs.popup.close();
					// this.showTips("打赏成功")
				}).then(result => {
					// this.$refs.popup.close();
					// this.showTips("打赏成功")
					return this.requestPayment(result.prePayInfo)
				}).then(result => {
					this.getReward(1);
					this.$refs.popup.close();
					this.showTips("打赏成功");


				}).catch(err => {
					uni.hideLoading();
					this.showError(err)
				})

			},
			editCourse() {
				let obj = {
					"courseId": this.id,
					"name": this.detail.course.name,
					"describe": this.detail.course.describe,
					"coverUrl": this.detail.course.cover,
					"nodes": JSON.parse(JSON.stringify(this.detail.nodeList))
				}

				for (let x of obj.nodes) {
					x.time = this.formateSeconds(parseInt(x.time))
				}

				this.$store.commit('setCourse', obj)
				uni.navigateTo({
					url: "../businessCC_PublishClass/businessCC_PublishClass?id=" + this.id + "&edit=1"
				})
			},


			formateSeconds(v) {
				return formateSeconds(v)
			},
			goChapterDetail(index) {
				//if (index != this.currentIndex) {
				this.videoContext.stop();
				this.currentIndex = index;
				setTimeout(() => {
					this.videoContext.play();
				}, 500)
				//}

				// uni.navigateTo({
				// 	url:"../businessCC_ChapterDetail/businessCC_ChapterDetail?bjson="+encodeURIComponent(JSON.stringify(this.detail.nodeList[index]))
				// })
			},
			setInvite() {
				uni.showModal({
					content: "设置成功后将会在您邀请还有关注之前展示给好友，默认可免费观看前4节视频，其他用户关注后可以全部观看",
					success: (res) => {
						if (res.confirm) {
							this.$api.setExtensionCourse(this.circleId, this.id).then(res => {
								this.showTips("设置成功")
								// uni.setStorageSync('_needFetchCourse', true)
								// uni.navigateBack();
								this.show = false
								this.isshow = true
							}).catch(err => {
								this.showError(err)
							})
						}
					}
				})
			},
			isSetInvite() {
				uni.showModal({
					content: "设置成功后将不会在您邀请还有关注之前展示给好友",
					success: (res) => {
						if (res.confirm) {
							this.$api.cancelExtensionCourse(this.circleId, this.id).then(res => {
								this.showTips("取消成功")
								// uni.setStorageSync('_needFetchCourse', true)
								// uni.navigateBack();
								this.show = true
								this.isshow = false
							}).catch(err => {
								this.showError(err)
							})
						}
					}
				})
			}

		}
	}
</script>

<style lang="less">
	@import "../../css/jss_base.less";
	@import '../../css/mzl_base.less';

	page {

		.body {
			padding-bottom: 120rpx;
		}


		// padding-bottom: 150rpx;
		box-sizing: border-box;

		.videoBox {
			width: 100%;
			min-width: 750rpx;
			position: fixed;
			left: 0rpx;
			top: 100rpx;
			z-index: 9999;
			background-color: #fff;
			height: 390rpx;

			.video {
				width: 690rpx;
				// position: fixed;
				// left: 30rpx;
				// top: 0;
				// z-index: 9999;
				margin-left: 30rpx;
				height: 388rpx;
				border-radius: 10rpx;
			}
		}

		.avatar {
			width: 50rpx;
			height: 50rpx;
			border-radius: 5rpx;
			margin-right: 8rpx;
			margin-top: 10rpx;
		}

		

		//评价输入框
		.sayContainer {
			.flex(center);
			width: 100%;
			height: 98upx;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 99;
			background: #ffffff;

			.input {
				width: 80%;
				height: 70upx;
				margin-right: 20upx;
				border-radius: 35upx;
				background: #F8F8F8;
				padding-left: 50upx;
				box-sizing: border-box;
				font-size: 30upx;
			}

			.tishi {
				font-size: 28upx;
				color: #AAAAAA;
			}

			.sendMess {
				font-size: 30upx;

				font-family: PingFangSC;
			}
		}

		.commentContainer {
			margin-top: 50rpx;

			.titleTxt {
				margin: 0 30rpx;
				font-weight: bold;
				padding-bottom: 15rpx;
			}


		}

		.RewardContent {
			height: 402rpx;
			background: white;
			position: relative;
			width: 540rpx;
			border-radius: 8rpx;

			.pay {
				border-top: 1px solid #DDDDDD;
				color: #2EA1FF;
				font-weight: 500;
				height: 100rpx;
				position: absolute;
				bottom: 0;
				text-align: center;
				width: 100%;
				line-height: 100rpx;
			}

			.title {
				padding-top: 30rpx;
				text-align: center;
			}

			.priceBox {
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;

				.price {
					margin-top: 30rpx;

					.priceInner {
						width: 228rpx;
						height: 70rpx;
						text-align: center;
						line-height: 70rpx;
						margin-left: 20rpx;
						margin-right: 20rpx;
						border-radius: 8rpx;
						border: 1px solid black;

						&.active {
							border: 1px solid #FF3C32;
							border-radius: 8rpx;
							color: #FF3C32;
						}
					}
				}
			}
		}

		.RewardBox {
			padding: 100rpx 0;

			.Reward {
				margin: 0 auto;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				line-height: 90rpx;
				text-align: center;
				color: #FDBA44;
				font-size: 50rpx;
				border: 2px solid;

			}
		}

		.courseList {
			box-sizing: border-box;
			margin: 0rpx 30rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.courseItem {
				width: 330rpx;
				box-sizing: border-box;
				position: relative;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				box-shadow: 0px 2px 14px 0px rgba(219, 219, 219, 1);
				margin-right: 30rpx;

				&:nth-of-type(2n+0) {
					margin-right: 0rpx;
				}

				&:nth-of-type(n+3) {
					margin-top: 30rpx;
				}

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
					width: 330rpx;
					height: 230rpx;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
				}

			}

			.info {
				width: 100%;
				padding: 15rpx;
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
	}
	.content-user-text{
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 999;
	}
	.desc {
		min-height: 300rpx;
		font-size: 28rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		line-height: 40rpx;
	}

	.Coursetitle {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		
	}

	.bodys {
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 100rpx;
	}

	.h3 {
		margin: 20rpx 0;
	}

	.btn {
		position: fixed;
		bottom: 200upx;
		background-image: url('https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.vJWsqZQDHJD3ffe31b4c65191a4398dce19ffaa7cfc5.png');

		background-position: 50%;
		background-size: 100%;
		background-repeat: no-repeat;
		width: 130rpx;
		height: 130rpx;
		text-align: center;
		right: 39rpx;
		z-index: 99;

		text {
			font-size: 32rpx;
			font-family: PingFangSC-Regular;
			position: absolute;
			top: 33%;
			left: 0;
			bottom: 50%;
			right: 0;
			margin: auto;
			color: rgba(255, 255, 255, 1);
		}

		&.save {
			// left: 397rpx;
			bottom: 370upx;
			background-image: url('https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.IJ0fulT9LIyQf078288db620a4e9df02848423437f59.png');
			background-position: 50%;
			background-size: 100%;
			background-repeat: no-repeat;
		}

		&.cancel {
			background-image: url('https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.vJWsqZQDHJD3ffe31b4c65191a4398dce19ffaa7cfc5.png');
			background-position: 50%;
			background-size: 100%;
			background-repeat: no-repeat;
		}

	}
</style>
