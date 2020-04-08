<template>
	<view class="commContainer">
		<topic-comment v-for="(item, index) in list"
					   :comment="item"
					   :index="index"
					   @reply="onReply"
					   @removeSuccess="onRemoveSuccess"
		>

		</topic-comment>
		<uni-load-more :loading-type="loadingType"></uni-load-more>

		<view class="faSong">
			<input type="text" class="input"
				   :focus="isFocus" @blur="isFocus = false"
				   :placeholder="commentPlaceholder" v-model="commentContent" confirm-type="send" @confirm="send">
			<text class="send" @click="send">发送</text>
		</view>
	</view>
</template>

<script>

  import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

  import TopicComment from "../../components/TopicComment";

  const TYPE_COMMENT = 1;
  const TYPE_REPLY   = 2;

  export default {

    components: { TopicComment },

    data() {
      return {
        topicId: '',
        commentContent: '',

        isFocus: false,
        currentReply: null,
        parentComment: null,
      };
    },

	mixins: [loadMoreMixins],

	onLoad (option) {
      this.topicId = option.id;
	},

	computed: {
      commentPlaceholder () {
        if (this.currentReply) {
          return `回复@${this.currentReply.name || this.currentReply.replyUser}`
        }
        return '说点什么'
      },
	},

	mounted () {
      this.fetch();
	},

	methods: {
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

      send () {
        if (this.commentContent.trim().length === 0) {
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
          // this.topic.commentCount++;
          this.list.push(result);
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

      onReply (event) {
        const { comment, parentComment } = event;
        this.parentComment = parentComment;
        this.currentReply = comment;
        this.commentContent = ''
		this.isFocus = true;
      },

      onRemoveSuccess (index) {
        this.list.splice(index, 1);
	  },

	},

  }
</script>

<style lang="less">
	@import '../../css/jss_base.less';
.commContainer{margin-bottom: 100upx;}


.faSong{
	position: fixed;
	bottom: 0;
	height: 93upx;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background: #FFFFFF;
	border-top: 1px solid #E1E1E1;
	.input{
		width: 80%;
		height: 70upx;
		line-height: 70upx;
		padding-left: 30upx;
		background: #F8F8F8;
		border-radius: 35upx;
		font-size: 28upx;
		color: #333333;
	}
	.send{
		margin-left: 20upx;
		color: #6B7AF8;
		font-size: 30upx;
	}

}
</style>
