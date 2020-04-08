<template>

  <view class="page">
    <view class="comment-item" v-for="(comment, index) in list" :key="comment.appraiseId">
      <view class="comment_user">
        <img class="avatar" :src="comment.headImage">
        <text class="user">{{ comment.name }}</text>
        <star-list v-model="comment.score"></star-list>
      </view>
      <view class="comment_info">
        {{ comment.appraiseContent }}
      </view>
      <view class="image-grid">
        <img v-for="(image, index2) in comment.imageList" :src="image" @click="previewImage(image, comment)">
      </view>
      <view class="comment-footer">
        <view class="comment_goods_sku">
          <view class="comment_goods_sku_item">{{comment.skuList.length>1?comment.skuList[0]+'-'+comment.skuList[1]:comment.skuList[0]}}</view>
        </view>
        <view class="date">{{ comment.createTime }}</view>
      </view>

      <view class="comment_reply" v-if="comment.appraiseReply">
        店家回复：{{ comment.appraiseReply }}
      </view>

    </view>

    <view class="load-more-text">{{ loadMoreText }}</view>

  </view>

</template>

<script>

  import loadMoreMixins from '../../../js/mixins/loadMoreMixins'
  import StarList from "./StarList";

  export default {
    components: {StarList},
    data () {
      return {
        goodsId: '',
        list: [],
      }
    },

    mixins: [loadMoreMixins],

    onLoad (option) {
      this.goodsId = option.goodsId;
    },

    mounted () {
      this.fetch();
    },

    methods: {
      fetch () {
        this.$api.getGoodsAppraise(this.goodsId, this.currentPage).then(result => {
          const commentList = result.goodsAppraiseList
          commentList.forEach(item => {
            item.score = Number(item.score)
            try {
              item.imageList = JSON.parse(item.image)
            } catch (error) {
              item.imageList = [];
            }

          })
          commentList.forEach(item => {
            item.createTime = this.formatDate(item.createTime, 'YYYY.MM.DD')
          })

          this.list = this.list.concat(commentList)
          this.currentPage += 1;
          this.loadMoreLoading = false;
          if (commentList.length === 0) {
            this.noMore = true;
          }
        }).catch(error => {
          this.loadMoreLoading = false;
        })
      },

      previewImage (current, item) {
        uni.previewImage({
          urls: item.imageList,
          current,
        });
      },

    },

  }

</script>

<style scoped lang="less">


  .comment-item {
    padding: 40upx 30upx;
    border-bottom: 1upx solid #E1E1E1;
  }

  .comment_user {
    margin-bottom: 14upx;
    display: flex;
    align-items: center;
    .avatar {
      width: 62upx;
      height: 62upx;
      margin-right: 23upx;
    }
    .user {
      font-size: 24upx;
      color: #999999;
      flex: 1;
    }

  }

  .comment_info {
    font-size: 28upx;
    color: #333333;
    letter-spacing: 0.7upx;
    line-height: 38upx;
    margin-bottom: 26upx;
  }

  .image-grid {
    margin-bottom: 30upx;
    img {
      width: 220upx;
      height: 220upx;
      margin-right: 13upx;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .comment-footer {
    font-size: 24upx;
    color: #999999;
  }
  .comment_goods_sku {
    display: inline-block;
  }
  .comment_goods_sku_item {
    font-size: 24upx;
    color: #999999;
  }
  .date {
    font-size: 24upx;
    color: #999999;
    float: right;
  }

  .comment_reply {
    position: relative;
    background-color: #F5F5F5;
    font-size:28upx;
    color:rgba(102,102,102,1);
    line-height:40upx;
    padding: 24upx 30upx;
    margin-top: 30upx;
    border-radius: 10upx;

    &:after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      top: 0;
      left: 60upx;
      box-sizing: border-box;
      border: 8upx solid black;
      border-color: transparent transparent #F5F5F5 #F5F5F5;
      transform-origin: 0 0;
      transform: rotate(135deg);
    }

  }


</style>