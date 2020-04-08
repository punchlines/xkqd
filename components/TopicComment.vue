<template>
  <view class="container1">
    <view class="commentBox">
      <view class="CBimage">
        <image :src="commentData.headImage"></image>
      </view>
      <view class="commnentList">
        <view class="CLcon">
          <view class="CLtitle">{{ commentData.name }}</view>
          <view class="CLBfloor">{{ index + 1 }}楼</view>
        </view>
        <view class="CLsubTitle">{{ commentData.content }}</view>
        <view class="cLbottom">
          <view class="CLBtime">
            <view class="CLBnowTime">{{ comment.formatTime }}</view>
          </view>
          <view class="CLBmessage">
						<wx-view  v-if="isSelf">
								 <view class="CLBdel"  @click="deleteComment">
									<image style="width: 21upx; height: 25upx" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/undel.png'"></image>
									<text class="txt">删除</text>
								</view>
						</wx-view>
					
							 <view class="CLBmess" @click="replyComment(commentData)">
								<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode="widthFix" lazy-load="false" binderror="" bindload=""></image>
								<text class="CLBMessNum">{{ comment.replyList.length }}</text>
							</view>
			
           
            <view class="CLBzan" @click.stop="changeLike">
              <image v-if="commentData.praiseType == 0" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'" ></image>
              <image v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'" ></image>
              <text class="ClBzanNum"> {{ commentData.praiseCount }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论回复 -->
    <view class="CommentInfor fx-row fx-row-center fx-row-right" v-if="comment.replyList.length > 0">
      <view class="CIcontent">
        <view class="CIcallBack" v-for="(reply, rIndex) in comment.replyList" @click.stop="replyComment(reply)">
          <template v-if="reply.toUser">
            <text class="CBmy">{{ reply.replyUser }}</text> 回复
            <text class="CByou">{{ reply.toUser }}</text>：{{ reply.content }}
          </template>
          <template v-else>
            <text class="CBmy">{{ reply.replyUser }}</text>：{{ reply.content }}
          </template>
        </view>

        <view class="CIcallBack" v-if="comment.replyList.length > 0 && comment.replyList[0].replyCount > 2" @click.stop="openCommentDetail()">
          <text class="CBmy">共{{ comment.replyList[0].replyCount }}条回复 >></text>
        </view>
      </view>
      </view>
  </view>
</template>

<script>

  const TYPE_COMMENT = 1;
  const TYPE_REPLY   = 2;

  export default {
    name: "TopicComment",

    props: {
      comment: Object,
      index: Number,
    },

    computed: {
      commentData () {
        return this.comment.topicCommentMap
      },
      isSelf () {
        return this.commentData.commentUserId == this.currentUser.id;
      }
    },
		onLoad() {
				console.log(this.comment,"111")
		},

    methods: {
      deleteComment () {
        const postDelete = () => {
          uni.showLoading();
          this.$api.deleteTopicComment(this.commentData.id).then(result => {
            uni.hideLoading();
            this.$emit('removeSuccess', this.index);
            // this.commentList.splice(index, 1);
            // this.commentCount--;
            // uni.setStorageSync('_tempCommentCount', { id: this.journalId, count: this.commentCount });
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
      },

      changeLike () {
        let comment = this.commentData;
				//4.20修复评论错误
        comment.praiseType = parseInt(comment.praiseType) ? 0 : 1;
        comment.praiseCount += parseInt(comment.praiseType) ? 1 : -1
        this.$api.praise(comment.id, 6).catch(error => {
          this.showError(error);
        })
      },

      openCommentDetail () {
        this.navigateTo('/item_businessCardCircle/businessCC_Comment/businessCC_Comment_Detail', {
          data: JSON.stringify(this.commentData),
          count: this.comment.replyList[0].replyCount
        })
      },

      replyComment (comment, parentComment) {
        // this.parentComment = parentComment;
        // 如果是评论
        if ('commentUserId' in comment) {
          comment._type = TYPE_COMMENT;
        } else {
          comment._type = TYPE_REPLY;
        }
        // this.currentReply = comment;
        // this.isFocus = true;

        this.$emit('reply', {
          comment,
          parentComment: this.comment,
        })
      },

    },

  }
</script>

<style scoped lang="less">
  @import "../css/jss_base.less";
  @import '../css/mzl_base.less';

  .container1{
    border-bottom:1px solid #EEEEEE;
    .commentBox{
      display: flex;
      .flex(@alignIt:top;);padding:30upx;box-sizing: border-box;
      padding-top: 45upx;
      .CBimage{
        width:60upx;
        margin-right: 23upx;
        image{width:60upx;
          height:60upx;;vertical-align: top;}
      }
      .commnentList{
        flex: 1;
        image{width:28upx;height:28upx}
        .CLcon{
          .flex(space-between);
          .CLtitle{color:#666;font-size:@fsNum;}
          .CLBfloor{font-size: 24upx;color: #999999;}
        }

        .CLsubTitle{padding:15upx 0;color:@title;font-size:@fsSubTitle;line-height: 40upx; margin-bottom: 15upx}
        .cLbottom{
          .flex(space-between);
          color:#999;font-size:@fsNum;
          .CLBtime{
            .flex(flex-start);width:40%;
          }
          .CLBmessage{
            display: flex;
            .flex(flex-between);width:60%;
            justify-content: flex-end;
            > view {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              width:33.33%;
              image {
                margin-right: 8upx;
              }
            }
            .CLBdel{
              &>image{width: 22upx;height: 28upx;margin-right: 10upx;}
              .txt{font-size: 24rpx;color: #999999;}
            }
            .CLBMessNum{margin-left: 9upx;}
            
            .CLBzan{text-align: right;}
          }
        }
      }
    }
  }

  .CommentInfor{
    padding:20upx;color:@fsC6;
    .CIcontent{
      font-size: 28upx;width:83%;background:#F8F8F8;padding:20upx;
      .CIcallBack{
        line-height:40upx;margin-bottom:10upx;
        .CBmy,.CByou{color:#4E7CB1;}
      }
      .CIhideCallBack{color:#4E7CB1;margin-top:20upx;}
    }
  }

</style>