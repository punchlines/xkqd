<template>
  <view class="page">

    <view class="message-list">
      <view class="message" v-for="message in list">
        <view class="message-content">{{ message.content }}</view>
        <view class="message-handle">
          <view class="left" :class="{ active: message.ifPushUp == 1 }" @click="setTop(message)">置顶</view>
          <view class="right btn-group">
            <view class="button" @click="edit(message)">
              <image class="icon icon_edit" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/edit.png'"></image>编辑
            </view>
            <view class="button" @click="remove(message)">
              <image class="icon icon_delete" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/shanchu1.png'" mode="aspectFit"></image>删除
            </view>
          </view>
        </view>
      </view>
      <uni-load-more :loading-type="loadingType"></uni-load-more>
    </view>

    <view class="page-footer">
      <button class="btn-primary" @click="addMessage">新增</button>
    </view>


    <quick-edit-modal ref="editModal" @update="update"></quick-edit-modal>

  </view>
</template>

<script>
  import QuickEditModal from "./QuickEditModal";
  import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

  export default {
    name: "QuickMessage",

    components: {QuickEditModal},

    mixins: [loadMoreMixins],

    mounted () {
      this.fetch();
    },

    methods: {
      fetch () {
        this.loading = true;
        this.$api.listQuickMessage(this.currentPage).then(result => {
          setTimeout(() => {
            this.loading = false;
          }, 100)
          const list = result.mpQuickMessages;
          if (list.length === 0) {
            this.noMore = true;
          }
          this.list = this.list.concat(list);
          this.currentPage++;
        }).catch(error => {
          setTimeout(() => {
            this.loading = false;
          }, 100)
        })
      },

      update () {
        this.reset();
        this.fetch();
      },

      setTop (message) {
        if (message.ifPushUp == 1) {
          return;
        }
        uni.showLoading();
        this.$api.pushUpQuickMessage(message.id).then(result => {
          uni.hideLoading();
          this.update();
        }).catch(error => {
          this.showError(error);
          uni.hideLoading();
        })
      },

      addMessage () {
        this.$refs.editModal.show();
      },
      edit (message) {
        this.$refs.editModal.show(message);
      },
      remove (message) {
        uni.showLoading();
        this.$api.deleteQuickMessage(message.id).then(result => {
          uni.hideLoading();
          this.update();
        }).catch(error => {
          this.showError(error);
          uni.hideLoading();
        })
      },
    },

  }
</script>

<style scoped lang="less">

  .page {
    background-color: #f5f5f5;
    padding-bottom: 100upx;
    box-sizing: border-box;
    min-height: calc(100vh - 100upx);
  }

  .page-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100upx;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-primary {
      width: 620upx;
      font-size: 32upx;
      color: #FFFFFF;
      height: 80upx;
      line-height: 80upx;
    }

  }

  .message-list {
    padding: 30upx;
  }

  .message {
    background-color: #ffffff;
    margin-bottom: 30upx;

    .message-content {
      font-size:28upx;
      color:rgba(51,51,51,1);
      padding: 33upx 30upx;
      border-bottom: 1upx solid #E1E1E1;
    }
    .message-handle {
      padding: 30upx;
      overflow: hidden;
    }
    .left {
      width:100upx;
      height:48upx;
      line-height:48upx;
      text-align: center;
      background-color:rgba(204,204,204,1);
      border-radius:24upx;
      font-size:24upx;
      color:rgba(255,255,255,1);
      float: left;

      &.active {
        background-color: #6B7AF8;
      }
    }
    .right {
      float: right;
    }

    .btn-group {
      display: flex;
      height:48upx;
      align-items: center;
    }
    .button {
      display: flex;
      align-items: center;
      font-size: 24upx;
      color: #666666;
      &+.button {
        margin-left: 40upx;
      }
    }
    .icon {
      display: inline-block;
      width: 30upx;
      height: 30upx;
      margin-right: 10upx;
    }
  }


</style>