<template>
	<view class="container1">

		<view class="clickable" v-for="(item, index) in commentList" :key="index" @click="replyComment(item.journalCommentMap)">
			<!-- 评论主体 -->
			<view class="commentBox">
				<view class="CBimage">
					<image :src="item.journalCommentMap.headImage" class="Pimage"></image>
				</view>
				<view class="commnentList">
					<view class="CLtitle fs6a24 fx-row fx-row-center fx-row-space-around">
						<view class="CLname">{{ item.journalCommentMap.name }}</view>
						<view class="CLBfloor">{{index+1}}楼</view>
					</view>
					<view class="CLsubTitle">{{ item.journalCommentMap.content }}</view>
					<view class="cLbottom">
						<view class="CLBtime">
							<view class="CLBnowTime">{{ item.formatTime }}</view>
						</view>
						<view class="CLBmessage">
							<view class="item CLBmess" style="display: flex; align-items: center" @click.stop="removeComment(item, index)"
							 v-if="item.journalCommentMap.commentUserId == currentUser.id">
								<image style="width: 21upx; height: 25upx" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/undel.png'"></image>
								<text class="CLBMessNum">删除</text>
							</view>
							<view class="item CLBmess" style="display: flex; align-items: center" @click.stop="replyComment(item.journalCommentMap, item)">
								<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'"></image>
								<text class="CLBMessNum">{{ item.replyList.length }}</text>
							</view>
							<view class="item CLBzan" @click.stop="changeLike(item.journalCommentMap)">
								<image v-if="!item.journalCommentMap.praiseType" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'"></image>
								<image v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'"></image>
								<text class="ClBzanNum">{{ item.journalCommentMap.praiseCount }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论回复 -->
			<view class="CommentInfor fx-row fx-row-center fx-row-right" v-if="item.replyList.length > 0">
				<view class="CIcontent">
					<view class="CIcallBack" v-for="(reply, rIndex) in item.replyList" @click.stop="replyComment(reply, item)">
						<template v-if="reply.toUser">
							<text class="CBmy">{{ reply.replyUser }}</text> 回复
							<text class="CByou">{{ reply.toUser }}</text>：{{ reply.content }}
						</template>
						<template v-else>
							<text class="CBmy">{{ reply.replyUser }}</text>：{{ reply.content }}
						</template>
					</view>

					<view class="CIcallBack" v-if="item.replyList.length > 0 && item.replyList[0].replyCount > 2" @click.stop="openReplyList(item)">
						<text class="CBmy">共{{ item.replyList[0].replyCount }}条回复 >></text>
					</view>

				</view>
			</view>
		</view>

		<uni-load-more :loading-type="loadingType"></uni-load-more>

		<view class="CpublishCom">
			<view class="CPlist fx-row fx-row-center fx-row-space-around">
				<view class="CPinput">
					<input v-model="commentContent" type="text" :placeholder="commentPlaceholder" :focus="isFocus" @blur="isFocus = false"
					 confirm-type="send" @confirm="sendComment">
				</view>
				<view class="PCsend" @click="sendComment">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	const TYPE_COMMENT = 1;
	const TYPE_REPLY = 2;

	export default {

		components: {
			uniLoadMore
		},

		data() {
			return {
				currentPage: 1,
				loading: false,
				noMore: false,
				commentList: [],

				isFocus: false,

				journalId: 0,
				commentContent: '',
				commentCount: 0,

				currentReply: null,
				parentComment: null,
			};
		},

		computed: {
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			},
			commentPlaceholder() {
				if (this.currentReply) {
					return `回复@${this.currentReply.name || this.currentReply.replyUser}`
				}
				return '说点什么'
			},
		},

		onLoad(option) {
			this.journalId = option.id
			this.commentCount = option.count // TODO: 后续接口带上 count
			this.fetch();
		},

		onReachBottom() {
			if (this.loading || this.noMore) return;
			this.fetch();
		},

		methods: {
			fetch() {
				this.loading = true;
				this.$api.listJournalComment(this.journalId, this.currentPage).then(result => {
					this.loading = false;
					const list = result.journalCommentList;
					if (list.length === 0) {
						this.noMore = true;
					}
					list.forEach(item => {
						item._replyList = item.replyList.slice(0, 2);
					})
					this.currentPage++;
					this.commentList = this.commentList.concat(list);
				}).catch(error => {
					console.error(error)
					this.loading = false;
					this.showError(error)
				})
			},

			sendComment() {
				if (this.commentContent.trim().length === 0) {
					this.showTips('请输入评价内容')
					return;
				}
				if (!this.checkHasLogin()) {
					return;
				}

				if (this.currentReply) {
					this.sendCommentReply();
					return;
				}
				if (this.checkHasSensitiveWord(this.commentContent)) {
					return;
				}

				uni.showLoading();
				this.$api.setJournalComment(this.journalId, this.commentContent).then(result => {
					this.showTips('评价成功');
					this.commentContent = '';
					this.commentList.push(result);
					this.commentCount++;
					this.updateCommentCount();
				}).catch(error => {
					uni.hideLoading();
					this.showError(error);
				})
			},

			sendCommentReply() {
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
				this.$api.setCommentReply(
					this.parentComment ? this.parentComment.journalCommentMap.id : this.currentReply.id,
					this.commentContent,
					this.currentReply._type,
					this.currentReply._type === TYPE_REPLY ? this.currentReply.replyUserId : '',
					this.currentReply._type === TYPE_REPLY ? this.currentReply.id : '',
				).then(result => {
					this.showTips('评价成功');
					this.commentContent = '';
					if (this.parentComment) {
						console.log(this.parentComment)
						this.parentComment.replyList.push(result);
					}
					this.currentReply = null;
				}).catch(error => {
					uni.hideLoading();
					this.showError(error);
				})

			},

			changeLike(comment) {
				if (!this.checkHasLogin()) {
					return;
				}
				comment.praiseType = comment.praiseType ? 0 : 1;
				comment.praiseCount += comment.praiseType ? 1 : -1
				this.$api.praise(comment.id, 2).catch(error => {
					this.showError(error);
				})
			},

			reset() {
				this.currentPage = 1;
				this.loading = false;
				this.noMore = false;
				this.commentList = [];
			},

			replyComment(comment, parentComment) {
				this.parentComment = parentComment;
				// 如果是评论
				if ('commentUserId' in comment) {
					comment._type = TYPE_COMMENT;
				} else {
					comment._type = TYPE_REPLY;
				}
				this.currentReply = comment;
				this.isFocus = true;
			},

			updateCommentCount() {
				uni.setStorageSync('_tempCommentCount', {
					id: this.journalId,
					count: this.commentCount
				});
			},

			openReplyList(comment) {
				this.navigateTo('./descover_Comment_Detail', {
					data: JSON.stringify(comment.journalCommentMap),
					count: comment.replyList[0].replyCount
				})
			},

			removeComment(comment, index) {
				const postDelete = () => {
					uni.showLoading();
					this.$api.deleteJournalComment(comment.journalCommentMap.id).then(result => {
						uni.hideLoading();
						this.commentList.splice(index, 1);
						this.commentCount--;
						uni.setStorageSync('_tempCommentCount', {
							id: this.journalId,
							count: this.commentCount
						});
					}).catch(error => {
						uni.hideLoading();
						this.showError(error);
					})
				}

				uni.showModal({
					title: '提示',
					content: '是否删除该评论？',
					success: (res) => {
						if (res.confirm) {
							postDelete();
						}
					}
				});
			}

		},

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	/*.clickable {*/
	/*&:active {*/
	/*background-color: #eeeeee;*/
	/*}*/
	/*}*/

	.container1 {
		border-top: 1upx solid @grayBg;
		margin-bottom: 100upx;

		.commentBox {
			box-sizing: border-box;
			padding: 30upx;
			display: flex;

			.CBimage {
				width: 60upx;
				margin-right: 23upx;

				.Pimage {
					width: 60upx;
					height: 60upx;
					vartical-align: top;
				}
			}

			.commnentList {
				flex: 1;
				border-bottom: 1upx solid @grayBg;
				padding-bottom: 20upx;

				image {
					width: 28upx;
					height: 28upx
				}

				.CLtitle {
					.CLname {
						width: 50%;
						text-align: left;
					}

					.CLBfloor {
						width: 50%;
						text-align: right;
					}
				}

				.CLsubTitle {
					padding: 15upx 0;
					line-height: 40upx;
					color: @title;
					font-size: @fsSubTitle;
				}

				.cLbottom {
					.flex(space-between);

					color: #999;
					font-size: @fsNum;

					image {
						margin-right: 10upx;
						vertical-align: center;
					}

					.CLBtime {
						.flex(flex-start);
						width: 40%;

						.CLBfloor {
							margin-right: 30upx;
						}
					}

					.CLBmessage {
						display: flex;
						.flex(flex-between);
						width: 60%;
						justify-content: flex-end;

						view {
							display: flex;
							align-items: center;
							justify-content: flex-end;
							width: 33.33%;
						}

						.CLBzan {
							text-align: right;
						}


					}
				}
			}
		}

		.CommentInfor {
			padding: 20upx;
			color: @fsC6;

			.CIcontent {
				font-size: 28upx;
				width: 83%;
				background: #F8F8F8;
				padding: 20upx;

				.CIcallBack {
					line-height: 40upx;
					margin-bottom: 10upx;

					.CBmy,
					.CByou {
						color: #4E7CB1;
					}
				}

				.CIhideCallBack {
					color: #4E7CB1;
					margin-top: 20upx;
				}
			}
		}

		.CpublishCom {
			width: 100%;
			height: 93upx;
			position: fixed;
			border-top: 1upx solid #E1E1E1;
			bottom: 0;
			padding: 10upx;
			background: #fff;

			.CPlist {
				input {
					width: 610upx;
					height: 70upx;
					border-radius: 35upx;
					font-size: 28upx;
					padding-left: 20upx;
					background: #F8F8F8;
				}
			}

			.PCsend {
				color: #6B7AF8;
				font-size: 30upx;
				display: inline-block;
			}
		}
	}
</style>
