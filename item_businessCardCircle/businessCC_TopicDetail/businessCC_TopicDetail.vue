<template>
	<view class="topicDetailContainer">
		<!-- 轮播图片 -->
		<!-- <view class="TBmiddle" v-if="topic.images.length > 0">
			<swiper @change="changeSwiperNum($event)" :autoplay="autoplay" :interval="interval"
					:duration="duration" indicator-color="#E1E1E1" circular="true" indicator-active-color="#6B7AF8" display-multiple-items="1">
				<swiper-item v-for="(item, index) in topic.images" :key="index" :display-multiple-items="index">
					<image @click="previewImage(item)" class="bannerImage" :src="item" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view class="TBMswiperNum fsf24">{{currentNum+1}}/{{topic.images.length}}</view>
		</view> -->
		<!-- 话题内容 -->
		<view class="topicContainer">
			<!-- <view class="title">
				<text>{{ topic.title }}</text>
			</view> -->
			<view class="topicAuthor">
				<view @click="goCard">
					<image :src="topic.headImage" class="authorImg"></image>
				</view>
				<view class="nameTime">
					<text class="auName">{{ topic.userName }}</text>
					<text class="TLtime">{{ topic.time }}</text>
				</view>
				<wx-view  v-if="isSelfPublish">
					<view class="delContainer" @click="removeTopic">
						<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.dMLjjsYTuqMP1d0e534fa29821a89d32c7e99ac0f976.png'" class="delImg"></image>
						<text class="text">删除</text>
					</view>
				</wx-view>
			</view>
			<view class="topicContent">
				<view v-for="(line,index) in contentLine" :key="index" class="topContent">{{ line }}</view>
				<view class="TLimage" v-if="topic.images.length==1">
					<image :src="topic.images" mode="aspectFill" @click="previewImage(topic.images)" ></image>
				</view>
				<view class="TLimages" v-if="topic.images.length>1">
					<image :src="topic" mode="aspectFill" v-for="(topic,index) in topic.images" :key="index" @click="previewImage(topic)"></image>
				</view>
			</view>
			<!-- <view class="dateContainer"> -->
				<!-- <text class="date">{{ formatTime }}</text> -->
			<!-- </view> -->
			
		</view>
		<!-- 评价 -->
		<view style="height: 20rpx; width: 100%; background-color: #F5F5F5;"></view>
		<view class="commentContainer">
			<view class="topicTitle">
				<view class="titleTxt">
					<text class="title_txt">评论</text>
					<text class="title_txt">({{ topic.commentCount }})</text>
				</view>
				<!-- <wx-view>
					<view class="more" @click="seeAll">
						<text class="title_txt more_txt">查看全部</text>
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'"></image>
					</view>
				</wx-view> -->
				<view class="like" @click="changeLike">
					<image v-if="topic.praiseType == 0" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ILlKusvnJgUN60380a2b88e427e64d848b91e3d506f4.png'"></image>
					<image v-else :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.nol02scBedA56d1d0a155f28065bdc2ed8037dfb2d74.png'"></image>
					<text class="num">{{ topic.praiseCount }}</text>
				</view>
			</view>

			<topic-comment v-for="(item, index) in list"
						   :comment="item"
						   :index="index"
						   :key="index"
						   @changeLike="changeLikes"
						   @reply="onReply"
						   @removeSuccess="onRemoveSuccess">
			</topic-comment>
			<uni-load-more :loading-type="loadingType"></uni-load-more>

		</view>

		<!-- 浮在整个页面上面的输入框 -->
	
		<view class="sayContainer" >
			<input v-model="commentContent" confirm-type="send" @confirm="send" type="text" :placeholder="commentPlaceholder" class="input" placeholder-class="tishi" :focus="isFocus" @blur="onBlur" />
			<text class="sendMess" @click="send">发送</text>
		</view>

	
		<!-- 底部tab(评价总数和点赞总数) -->
		<!-- <view class="total" v-else>
			
			<view class="line"></view>
			<view class="pinglun" @click="onCommentTap">
				<image :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.tYLrToOAWPSe74d06d23a07ef0b6dda7102684ef1e06.png'"></image>
				<text class="num">{{ topic.commentCount }}</text>
			</view>
		</view> -->
		<!-- 浮动的按钮 -->
	<!-- 	<view class="fabu" @click="fabu">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/fabu.png'" class="fabuImg"></image>
		</view> -->
	</view>
</template>

<script>

	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	import TopicComment from "../../components/TopicComment";
	
	const TYPE_COMMENT = 1;
	const TYPE_REPLY   = 2;
	export default {
		components: {TopicComment},
		data() {
			return {
				onlineSite:this.global.onlineSite,
				isEdit:false,
				isTabBar:true,
				indicatorDots:true,
				autoplay:true,
				interval:5000,
				duration:1000,
				currentNum:0,

				formatTime: '',
				topicId: '',
				circleId:'',
				topic: {
					content: '',
					images: [],
				},

				showCommentInput: false,
				isFocus: false,
				commentContent: '',

				currentReply: null,
				parentComment: null,
			};
		},

		mixins: [loadMoreMixins],

		computed: {
			isSelfPublish () {
				return this.topic.circleManagerId == this.currentUser.id || this.topic.userId === this.currentUser.id;
			},
			commentPlaceholder () {
				if (this.currentReply) {
					return `回复@${this.currentReply.name || this.currentReply.replyUser}`
				}
				return '说点什么'
			},
			contentLine () {
				return this.topic.content.split('\n')
			}
		},

		onLoad (option) {
			this.topicId = option.id;
			this.circleId = option.circleId;
			uni.showLoading();
		},

		onShow () {
			this.reset();
			this.fetch();
			this.fetchTopic();
		},

		methods: {
			fetchTopic () {
				this.$api.getTopicDetail(this.topicId,this.circleId).then(result => {
					this.formatTime = result.formatTime
					try {
						result.circleTopic.images = JSON.parse(result.circleTopic.images) || [];
					} catch (e) {
						result.circleTopic.images = [];
					}
					result.circleTopic.time = this.formatDate(result.circleTopic.time, 'MM月DD日HH:MM')
					
					this.topic = result.circleTopic;
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading();
					this.showError(error);
				})
			},
			goCard(){
				
				uni.navigateTo({
					url: "../../pages/businessCard2/businessCard2?cardUserId="+this.topic.userId
				
				})
			},
			fetch () {
				this.loading = true;
				this.$api.listTopicComment(this.topicId, this.currentPage).then(result => {
					this.loading = false;
					const list = result.topicCommentList;
					if (list.length === 0) {
						this.noMore = true;
					}
					this.list = this.list.concat(list);
					this.currentPage++;
				}).catch(error => {
					this.loading = false;
				})
			},

			removeTopic () {
				const action = () => {
					uni.showLoading();
					this.$api.deleteTopic(this.topicId).then(result => {
						uni.hideLoading();
						this.showTips('删除成功').then(() => {
							uni.setStorageSync("_needFetchTopic",true);
							uni.navigateBack();
						})

					}).catch(error => {
						uni.hideLoading();
						this.showError(error)
					})
				}

				uni.showModal({
					title: '提示',
					content: `话题删除后无法恢复，确定删除吗？`,
					confirmText: '删除',
					success: (res) => {
						if (res.confirm) {
							action();
						}
					}
				});
			},

			changeLike () {
				if (!this.checkHasLogin()) {
					return;
				}
				this.topic.praiseType = Number(this.topic.praiseType) ? 0 : 1;
				this.topic.praiseCount += Number(this.topic.praiseType) ? 1 : -1
				this.$api.praise(this.topic.id, 5).catch(error => {
					this.showError(error);
				})
			},
			changeLikes(index){
				// this.list.splice(index, 1);
				this.list[index].topicCommentMap.praiseCount++
				this.list[index].topicCommentMap.praiseType=1
			},
			onRemoveSuccess (index) {
				this.list.splice(index, 1);
				this.topic.commentCount--;
			},
			
			onBlur () {
				setTimeout(() => {
					this.showCommentInput = false;
					this.isFocus = false;
				}, 200)
			},

			onReply (event) {
				const { comment, parentComment } = event;
				this.parentComment = parentComment;
				this.currentReply = comment;
				this.commentContent = ''
				this.onCommentTap();
			},

			send () {
				if (!this.commentContent) {
					this.showTips('请输入评论内容')
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
				this.$api.setTopicComment(this.topicId, this.commentContent).then(result => {
					uni.hideLoading();
					this.commentContent = '';
					this.topic.commentCount++;
					this.list.push(result);
					//console.log(result,"222222")
				}).catch(error => {
					this.showError(error)
					uni.hideLoading();
				})
			},

			sendCommentReply () {
				if (this.commentContent.trim().length === 0) {
					this.showTips('请输入评价内容')
					return;
				}
				if (this.checkHasSensitiveWord(this.commentContent)) {
					return;
				}

				uni.showLoading();
				this.$api.setTopicCommentReply(
								this.parentComment ? this.parentComment.topicCommentMap.id : this.currentReply.id,
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

			previewImage (url) {
				uni.previewImage({
					current: url,
					urls: this.topic.images,
				});
			},

			//点击事件
			onCommentTap(){

				this.showCommentInput = true;
				this.$nextTick(() => {
					this.isFocus = true;
				})
			},
			seeAll(){//查看全部评价
				this.navigateTo('../businessCC_Comment/businessCC_Comment', { id: this.topicId });
			},
			fabu(){//发布话题
				uni.navigateTo({
					url: '../businessCC_PublishTopic/businessCC_PublishTopic?id='+this.circleId
				});
			},
			// 轮播图图片数量
			changeSwiperNum(event){
				// console.log(event.detail.current);
				this.currentNum=event.detail.current;
			}
		},
	}
</script>


<style lang="less" scoped>
@import "../../css/jss_base.less";
@import '../../css/mzl_base.less';

@ff:PingFangSC;
.topicDetailContainer{
  width: 100%;
  font-family: @ff;
  .flex(@justCon:center;@alignIt:center;);
  flex-direction: column;
	//轮播图片
  .TBmiddle{
  	// position: relative;
		width: 100%;
  	swiper{
  		width:100%;height:750upx;
  		image{width:100%;}
  	}
  	.TBMswiperNum{
  		width:80upx;height: 42upx;background:rgba(0,0,0,.4);position: absolute;top:20upx;right:30upx;border-radius:21upx;text-align: center;line-height: 42upx;
  	}

  }
  .topicContainer{
    padding: 0 30upx;
	margin-top: 30rpx;
	  box-sizing: border-box;
	  width: 100%;
    .title{
		font-weight: bold;
      padding: 50upx 0 32upx 0;
      text-align: center;
      color: @title;
      font-size: @fsPageTitle;
    }
    .topicAuthor{
     display: flex; 
     flex-direction: row;
      .flex(@justCon:flex-start;@alignIt:center;);
      .authorImg{
        width: 78upx;
        height: 78upx;
		border-radius: 8rpx;
		margin-right: 18rpx;
        // margin: auto 14upx auto 30upx;
      }
	  .nameTime{
		  display: flex;
		  flex-direction: column;
		  width: 72%;
		  .auName{
		    font-size: 32rpx;
		    color: #0064B6;
		  }
		  .TLtime{
			  color: #808080;
			  font-size: 22rpx;
			  margin-top: 5px;
		  }
	  }
      .delContainer{
        height: 50upx;
        line-height: 50upx;
        
        border-radius: 25upx;
      		  display: flex;
      		  align-items: center;
      		  justify-content: center;
        .delImg{
          width: 22upx;
          height: 28upx;
      					margin-left: 10upx;
        }
        .text{
          color: #333333;
          font-size: 26rpx;
          margin-left: 13upx;
		  margin-top: 4rpx;
        }
      }
    }
    .topicContent{
	  display: flex;
	  flex-direction: column;
	  .topContent{
		  font-size: @fsSubTitle;
		  color: @title;
		  font-family:PingFangSC-Regular;
		  margin-bottom: 20rpx;
		  margin-top: 20rpx;
	  }
	  .TLimage {
	  	text-align: left;
	  	image {
	  		width: 345upx;
	  		height: 345upx;
	  		vertical-align: middle;
			padding-bottom: 30rpx;

	  	}
	  	
	  }
	  .TLimages{
	  	display: flex;
	  	flex-wrap: wrap;
	  	align-content: flex-start;
	  	image{
	  		width: 200rpx;
	  		height: 200rpx;
	  		vertical-align: middle;
	  		margin-right: 25rpx;
	  		margin-bottom: 25rpx;
	  	}
	  	image:nth-child(3n+0){
	  		margin-right: 0rpx;
	  	}
	  	
	  }
	  
	  
	  
    }
    .dateContainer{
      height: 50upx;
      margin-bottom: 30upx;
      line-height: 50upx;
      text-align: center;
      .flex(@justCon:space-between;@alignIt:center;);
      .date{
        font-size: @fsNum;
        color: @logoNote;
        background: #f8f8f8;
        border-radius: 25upx;
		  padding: 0 27upx;
      }
      
    }
  }


  .title_txt{
    font-size:28upx;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color: #333333;
  }
.commentContainer{
	margin-bottom: 80upx;
	width: 100%;
  .topicTitle{
	  padding: 0 30upx;

	  width: 100%;
    height: 92upx;
    border-bottom: 1px solid #EEEEEE;
    .flex(@justCon:space-between;@alignIt:center;);
    .more{
      &>image{
        width: 14upx;
        height: 24upx;
        margin-left: 16upx;
      }
      .more_txt{
        color: #666666;
					}
			}
			.like{
				  width: 12%;
				  display: flex;
				  align-items: center;
				  justify-content: center;
			  &>image{
			    width: 34upx;
			    height: 30upx;
			  }
			  .num{
				font-size: 14px;
				margin-left: 13rpx;
				 
			  }
			}
		}
		//评价列表
		.topicList{
			.flex(@justCon:space-between;@alignIt:flex-start;);
			border-bottom: 1px solid #EEEEEE;
			.avaImg{
				width: 60upx;
				height: 60upx;
				margin: 40upx 23upx 0 0;
			}
			.author{
				.floor{
					margin-top: 35upx;
					margin-bottom: 13upx;
					.flex(@justCon:space-between;@alignIt:center;);
					font-size: 24upx;
					color: #999999;
					font-family: PingFangSC;
				}
			.commemtCon{
				line-height: 40upx;
					font-size:28upx;
					font-family:PingFangSC-Regular;
					color: #333333;
					font-weight:400;
					letter-spacing: 2;
			}
			.operation{
				margin: 15upx 0 30upx 0;
				.flex(@justCon:space-between;@alignIt:center;);
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color: #999999;
				.iconContainer{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					.delContainer{
						&>image{
							width: 22upx;
							height: 28upx;
							margin-right: 14upx;
						}
						.deltxt{
							padding-top: 2upx;
						}
					}
					.pinglunContainer{
						margin-left: 40upx;
						&>image{
							width: 28upx;
							height: 28upx;
							margin-right: 9upx;
						}
					}
					.upContainer{
						margin-left: 72upx;
						&>image{
							width: 28upx;
							height: 24upx;
							margin-right: 8upx
						}
					}
				}
			}
			}
		}
}
// 底部小tab
.total{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 88upx;
  background: #333333;
  .flex(@justCon:center;@alignIt:center;);
  text-align: center;
  
  .pinglun{
    width: 50%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
    &>image{
      width: 34upx;
      height: 34upx;
    }
  }
  .line{
    width: 1px;
    height: 40upx;
    line-height: 88upx;
		background:rgba(255,255,255,0.3);
  }
  .num{
    font-size: 24upx;
    margin-left: 15upx;
    color: #ffffff;
  }
}
}
// 浮动按钮
.fabu{
	position: fixed;
	bottom: 148rpx;
	right: 30rpx;
	.fabuImg{
		width: 100rpx;
		height: 100rpx;
		}
}
//评价输入框
.sayContainer{
	.flex(center);
	width: 100%;
	height: 98upx;
	position: fixed;
	bottom: 0;
	z-index:99;
	background:#ffffff;
	.input{
		width: 80%;
		height: 70upx;
		margin-right: 20upx;
		border-radius: 35upx;
		background: #F8F8F8;
		padding-left:50upx;
		box-sizing: border-box;
		font-size:30upx;
	}
	.tishi{
		font-size: 28upx;
		color: #AAAAAA;
	}
	.sendMess{
		font-size: 30upx;
		color: #333333;
		font-family: PingFangSC;
	}
}

	.bannerImage {
		height: 750upx;
	}

</style>
