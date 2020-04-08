<template>
  <view class="page">
    <view class="comment">
      <image class="avatar" :src="comment.headImage"></image>
      <view class="comment-meta">
        <view class="header">{{ comment.name }}</view>
        <view class="content">{{ comment.content }}</view>
        <view class="comment-footer time">{{ commentDate }}</view>
      </view>
    </view>

    <view class="reply-list">
      <view class="count-title">{{ replyCount }}条回复</view>
      <view class="comment" v-for="(item, index) in list" @click="setCurrentReply(item)">
        <image class="avatar" :src="item.replyUserHeadImage"></image>
        <view class="comment-meta">
          <view class="header">
            <view class="name">{{ item.replyUser }}</view>
            <view class="index">{{ index + 1 }}楼</view>
          </view>

          <view class="content">
            <text v-if="item.toUser">回复<text class="toUsername">{{ item.toUser }}：</text></text>
            {{ item.content }}
          </view>

          <view class="comment-footer">
            <view class="time">{{ item.formatTime }}</view>
            <view class="right">
              <view class="item" @click.stop="removeReply(item, index)" v-if="item.replyUserId == currentUser.id">
                <image style="width: 21upx; height: 25upx; margin-right: 10upx" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/undel.png'"></image>
                <text class="ClBzanNum">删除</text>
              </view>
              <view class="like" @click.stop="changeLike(item)">
                <image class="icon" v-if="!item.praiseType == 0" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'" ></image>
                <image class="icon" v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/like.png'" ></image>
                <text class="ClBzanNum">{{ item.praiseCount }}</text>
              </view>
            </view>
          </view>

        </view>
      </view>

      <uni-load-more :loading-type="loadingType"></uni-load-more>

    </view>


    <view class="CpublishCom">
      <view class="CPlist fx-row fx-row-center fx-row-space-around">
        <view class="CPinput">
          <input v-model="commentContent"
                 type="text"
                 :placeholder="commentPlaceholder" :focus="isFocus" @blur="isFocus = false" confirm-type="send" @confirm="sendCommentReply">
        </view>
        <view class="PCsend" @click="sendCommentReply">发送</view>
      </view>
    </view>

  </view>
</template>

<script>

  import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

  export default {
    name: "descover_Comment_Detail.vue",

    mixins: [loadMoreMixins],

    data () {
      return {
        comment: null,
        replyCount: 0,
        commentDate: '',
        isFocus: false,
        list: [],
        commentContent: '',

        currentReply: null,
      }
    },

    computed: {
      commentPlaceholder () {
        if (this.currentReply) {
          return `回复@${this.currentReply.replyUser}`
        }
        return '说点什么'
      },
    },

    onLoad (option) {
      let comment;
      this.replyCount = option.count;
      try {
        comment = JSON.parse(option.data);
        this.comment = comment;

        this.commentDate = this.formatDate(comment.time, 'YYYY.MM.DD HH:mm')
      } catch (e) {
      }
      console.log(comment)

      this.fetch();
    },

    methods: {
      fetch () {
        this.loading = true;
        this.$api.getTopicComment(this.comment.id, this.currentPage).then(result => {
          this.loading = false;
          const list = result.replyList;
          if (list.length === 0) {
            this.noMore = true;
          }
          this.currentPage++;
          this.list = this.list.concat(list);
        }).catch(error => {
          this.loading = false;
          this.showError(error)
        })
      },

      setCurrentReply (item) {
        this.currentReply = item;
        this.isFocus = true;
      },

      sendCommentReply () {
        if (!this.checkHasLogin()) {
          return;
        }
        if (this.commentContent.trim().length === 0) {
          this.showTips('请输入回复内容')
          return;
        }
        if (this.checkHasSensitiveWord(this.commentContent)) {
          return;
        }

        uni.showLoading();
        this.$api.setTopicCommentReply(
            this.comment.id,
            this.commentContent,
            2,
            this.currentReply ? this.currentReply.replyUserId : '',
            this.currentReply ? this.currentReply.id : '',
        ).then(result => {
          this.showTips('评价成功');
          this.commentContent = '';
          this.list.push(result);
          this.currentReply = null;
        }).catch(error => {
          uni.hideLoading();
          this.showError(error);
        })

      },

      changeLike (comment) {
        comment.praiseType = comment.praiseType ? 0 : 1;
        comment.praiseCount += comment.praiseType ? 1 : -1
        this.$api.praise(comment.id, 7).catch(error => {
          this.showError(error);
        })
      },

      removeReply (reply, index) {
        const postDelete = () => {
          uni.showLoading();
          this.$api.deleteTopicCommentReply(reply.id).then(result => {
            uni.hideLoading();
            this.list.splice(index, 1);
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

<style scoped lang="less">

  .page {
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 130upx;
  }

  .comment {
    display: flex;
    padding: 46upx 30upx;
    .avatar {
      width:60upx;
      height:60upx;
      margin-right: 23upx;
    }
    .comment-meta {
      flex: 1;
      position: relative;

      .header {
        font-size:24upx;
        color:rgba(102,102,102,1);
        line-height:33upx;
        margin-bottom: 13upx;
      }
      .content {
        font-size:28upx;
        color:rgba(51,51,51,1);
        line-height:40upx;
        margin-bottom: 15upx;
      }
      .comment-footer {
        font-size:24upx;
        color:rgba(153,153,153,1);
        line-height:33upx;
        display: flex;

        .time {
          flex: 1;
        }

        .icon {
          width:28upx;
          height:24upx;
          margin-right: 8upx;
          vertical-align: middle;
        }

        .right {
          width: 60%;
          float: right;
          display: flex;
          justify-content: flex-end;

          > view {
            width: 33%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }

        }

      }
    }
  }

  .reply-list {
    background:rgba(248,248,248,1);
    margin: 0 30upx;

    .count-title {
      font-size:24upx;
      line-height:33upx;
      color:rgba(102,102,102,1);
      padding: 30upx;
      padding-bottom: 10upx;
    }

    .comment-meta {
      padding-bottom: 30upx;
      border-bottom: 1px solid #E1E1E1;
    }
    .comment-meta:last-of-type {
      border-bottom: none;
    }

    .index {
      position: absolute;
      top: 0;
      right: 0;
    }

    .toUsername {
      color: #4E7CB1;
      margin-left: 10upx;
    }

  }

  .CpublishCom{

    width:100%;height:93upx;position: fixed;border-top:1upx solid #E1E1E1;bottom: 0;padding:10upx;background: #fff;
    .CPlist{
      display: flex;
      align-items: center;
      input{
        width:610upx;height:70upx;border-radius:35upx;font-size: 28upx;
        padding-left:20upx;background:#F8F8F8;
      }
    }
    .PCsend{color:#6B7AF8;font-size:30upx;display: inline-block;}
  }


</style>
