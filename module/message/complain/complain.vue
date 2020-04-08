<template>
  <view class="page">
    <view class="complain" v-for="item in list">

      <view class="remove-icon" @click="removeComplain(item)"><image src="http://card-1254165941.cosgz.myqcloud.com/images/shanchu1@2x.png"></image></view>

      <view class="circle">
        <image class="avatar" :src="item.headImage || '	http://card-1254165941.cosgz.myqcloud.com/images/moren@2x.png'"></image>
        <text class="name">{{ item.circleName }}</text>
      </view>
      <view class="complain-content">成员 <text class="username">{{ item.userName }}</text> 被投诉</view>
      <view class="footer">
        <view class="date">{{ item._time }}</view>
        <view class="button" @click="openComplainDetail(item)">查看详情</view>
      </view>
    </view>

    <uni-load-more :loading-type="loadingType"></uni-load-more>

  </view>
</template>

<script>
  import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

  export default {

    data () {
      return {
      }
    },

    mixins: [loadMoreMixins],

    mounted () {
      this.fetch();
    },

    methods: {
      fetch() {
        this.loading = true;
        this.$api.listCircleComplain(this.currentUser.id, this.currentPage).then(result => {
          this.loading = false;
          const list = result.memberComplainList;
          list.forEach(item => {
            item._time = this.formatDate(item.createTime, 'YYYY.MM.DD')
          })
          if (list.length === 0) {
            this.noMore = true;
          }
          this.list = this.list.concat(list);
          this.currentPage++;
        }).catch(error => {
          this.loading = false;
        })
      },

      openComplainDetail (item) {
        this.navigateTo('./complainDetail', { id: item.id });
      },

      removeComplain (item, index) {
        const post = () => {
          uni.showLoading();
          this.$api.deleteMemberComplain(item.id).then(result => {
            uni.hideLoading();
            this.showTips('删除成功');
            this.list.splice(index, 1);
          }).catch(error => {
            this.showError(error)
            uni.hideLoading();
          })
        }

        uni.showModal({
          title: '提示',
          content: '是否删除该投诉信息',
          success: (res) => {
            if (res.confirm) {
              post();
            }
          }
        });
      }

    }

  }

</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 30upx;
    box-sizing: border-box;
  }

  .complain {
    padding: 30upx;
    background-color: #ffffff;
    position: relative;
    margin-bottom: 30upx;

    .remove-icon {
      width: 30upx;
      height: 30upx;
      padding: 30upx;
      position: absolute;
      top: 0;
      right: 0;

      image {
        width: 30upx;
        height: 30upx;
        position: absolute;
        top: 30upx;
        left: 30upx;
      }
    }

    .circle {
      display: flex;
      align-items: center;

      .avatar {
        width:80upx;
        height:80upx;
        margin-right: 25upx;
      }
      .name {
        font-size:32upx;
        font-weight: bold;
        color:rgba(51,51,51,1);
        line-height:80upx;
      }
    }

    .complain-content {
      padding: 34upx 0;
      font-size:28upx;
      color:rgba(51,51,51,1);
      border-bottom: 1upx solid #EEEEEE;
      margin-bottom: 26upx;

      .username {
        font-weight: bold;
      }

    }

    .footer {
      display: flex;
      .date {
        font-size:24upx;
        color:rgba(153,153,153,1);
        flex: 1;
      }
      .button {
        font-size:28upx;
        color:rgba(107,122,248,1);
      }
    }

  }




</style>