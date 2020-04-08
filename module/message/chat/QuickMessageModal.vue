<template>
  <view class="modal" :class="{ hide: !visible }">

    <view class="modal-mask" @click="close" :class="{ show: isShow }"></view>

    <view class="modal-content" :class="{ show: isShow }">
      <view class="modal-title">
        <text>快捷消息</text>
        <view class="right-action" @click="editMessage"><image class="icon" src="http://card-1254165941.cosgz.myqcloud.com/images/bianji@2x.png" />编辑</view>
      </view>
      <view class="message-list">
        <view class="message"
              :class="{ active: currentMessage.id === message.id }"
              @click="currentMessage = message"
              v-for="message in messageList">{{ message.content }}</view>
      </view>
      <view class="modal-footer">
        <button class="btn-primary" @click="sendMessage" :disabled="!currentMessage.id">发送</button>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    name: "QuickMessageModal",

    data () {
      return {
        isShow: false,
        visible: false,

        messageList: [],
        currentMessage: {},
      }
    },

    props: {
      // visible: Boolean,
    },

    mounted () {
      this.onShows();
    },

    methods: {
      onShows () {
        this.loading = true;
        this.$api.listQuickMessage().then(result => {
          this.loading = false;
          this.messageList = result.mpQuickMessages;
          if (this.messageList.length > 0) {
            this.currentMessage = this.messageList[0]
          }
        }).catch(error => {
          this.loading = false;
        })
      },

      show () {
        this.visible = true;
        this.isShow = true
        setTimeout(() => {
          this.isFocus = true;
        }, 300)
      },

      close () {
        this.isShow = false;
        setTimeout(() => {
          this.visible = false;
        }, 300);
        this.isFocus = false;
      },

      editMessage () {
        this.navigateTo('/module/message/chat/QuickMessage')
      },

      sendMessage () {
        if (!this.currentMessage.id) return;
        this.close();
        this.$emit('send', this.currentMessage);
      }

    },

  }
</script>

<style scoped lang="less">

  .modal {

  }

  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background:rgba(34,34,34, 0.5);
    transition: 0.3s ease;
    opacity: 0;
    z-index: 1999;

    &.show {
      opacity: 1;
    }

  }
  .modal-content {
    position: fixed;
    background:rgba(255,255,255,1);
    z-index: 2000;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 750upx;
    box-sizing: border-box;
    overflow: hidden;
    border-radius:20upx 20upx 0px 0px;

    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    /*opacity: 0.5;*/

    &.show {
      /*opacity: 1;*/
      transform: initial;
    }

  }
  .modal-title {
    font-size:32upx;
    font-weight: bold;
    color:rgba(51,51,51,1);
    line-height:45upx;
    margin-top: 33upx;
    text-align: center;
    position: relative;
    padding: 0 30upx;
  }
  .right-action {
    position: absolute;
    right: 30upx;
    top: 50%;
    transform: translateY(-50%);
    font-size:24upx;
    color:rgba(107,122,248,1);
    line-height:28upx;

    .icon {
      width: 28upx;
      height: 28upx;
      margin-right: 15upx;
      vertical-align: middle;
      margin-top: -.2em;
    }
  }
  .message-list {
    margin-top: 3upx;
    flex: 1;
    overflow-y: auto;
  }
  .message {
    font-size:28upx;
    color:rgba(51,51,51,1);
    line-height:40upx;
    padding: 33upx 30upx;
    border-bottom: 1upx solid #E1E1E1;
    position: relative;

    &.active {
      &:after {
        content: "";
        width: 28upx;
        height: 22upx;
        position: absolute;
        top: 50%;
        right: 30upx;
        transform: translateY(-50%);
        background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png");
        background-size: 100% 100%;
      }

    }

    &:last-of-type {
      border-bottom: none;
    }

  }
  .modal-footer {
    height:100upx;
    border-top: 1upx solid #E1E1E1;
    display: flex;
    align-items: center;
  }
  .btn-primary {
    width:620upx;
    height:80upx;
    border-radius:40upx;
    font-size:32upx;
  }

  .hide {
    transform: scale(0);
  }


</style>