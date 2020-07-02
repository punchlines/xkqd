<template>
  <view class="container1">
    <view class="commentBox">
      <view class="CBimage" @click="goCard">
        <image :src="commentData.headImage"></image>
      </view>
      <view class="commnentList">
        <view class="CLcon">
          <view class="CLtitle">{{ commentData.name }}</view>
          <view class="CLBfloor"></view>
        </view>
        <view class="CLsubTitle">{{ commentData.content }}</view>
        <view class="cLbottom">
          <view class="CLBtime">
            <view class="CLBnowTime">{{ comment.formatTime }}</view>
          </view>
          <view class="CLBmessage">
						<wx-view  v-if="isSelf">
								 <view class="CLBdel"  @click="deleteComment">
									<image style="width: 21upx; height: 25upx" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.dMLjjsYTuqMP1d0e534fa29821a89d32c7e99ac0f976.png'"></image>
									<text class="txt">删除</text>
								</view>
						</wx-view>
							<view class="CLBzan" @click.stop="changeLike">
							  <image v-if="commentData.praiseType == 0" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.ILlKusvnJgUN60380a2b88e427e64d848b91e3d506f4.png'" ></image>
							  <image v-else :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.nol02scBedA56d1d0a155f28065bdc2ed8037dfb2d74.png'" ></image>
							  <text class="ClBzanNum"> {{ commentData.praiseCount }}</text>
							</view>
							 <view class="CLBmess" @click="replyComment(commentData)">
								<image class="" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.tYLrToOAWPSe74d06d23a07ef0b6dda7102684ef1e06.png'" mode="widthFix" lazy-load="false" binderror="" bindload=""></image>
								<text class="CLBMessNum">{{ comment.replyList.length }}</text>
							</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论回复 -->
    <view class="CommentInfor fx-row fx-row-center fx-row-right" v-if="comment.replyList.length > 0">
      <view class="CIcontent">
        <view class="CIcallBack" v-for="(reply, rIndex) in comment.replyList" :key="rIndex" @click.stop="replyComment(reply)">
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
	 goCard(){
		uni.navigateTo({
			url: "../../pages/businessCard2/businessCard2?cardUserId="+this.comment.userId
		
		}) 
	 },
      changeLike () {
        let comment = this.commentData;
				//4.20修复评论错误
        comment.praiseType = parseInt(comment.praiseType) ? 0 : 1;
        comment.praiseCount += parseInt(comment.praiseType) ? 1 : -1
        this.$api.praise(comment.id, 6)
		.then(res=>{
			this.$emit('changeLikes',this.index);
		})
		.catch(error => {
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
	padding-bottom: 30rpx;
    .commentBox{
      display: flex;
      .flex(@alignIt:top;);padding:0 30upx;box-sizing: border-box;
      padding-top: 45upx;
      .CBimage{
        width:78upx;
        margin-right: 23upx;
        image{width:78upx;
          height:78upx;border-radius:8rpx;vertical-align: top;}
      }
      .commnentList{
        flex: 1;
        image{width:28upx;height:28upx}
        .CLcon{
          .flex(space-between);
          .CLtitle{color:#0064B6;font-size:28rpx;font-weight: 500;}
          .CLBfloor{font-size: 24upx;color: #999999;}
        }

        .CLsubTitle{padding:15upx 0;color:@title;font-size:@fsSubTitle;line-height: 40upx; margin-bottom: 15upx}
        .cLbottom{
          .flex(space-between);
          color:#999;font-size:@fsNum;
          .CLBtime{
            .flex(flex-start);width:40%;
			 font-size: 23rpx;white-space: nowrap;
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
    color:@fsC6; margin-bottom: 20rpx;
    .CIcontent{
      font-size: 28upx;width:79%;background:#F8F8F8;padding:20upx; margin-top: 15rpx; margin-right: 30rpx;
      .CIcallBack{
        line-height:40upx;margin-bottom:10upx;
        .CBmy,.CByou{color:#2EA1FF;}
      }
      .CIhideCallBack{color:#2EA1FF;margin-top:20upx;}
    }
  }

</style>