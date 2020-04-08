<template>
  <view class="modal" v-if="visible">

    <view class="modal-mask" :class="{ show: isShow }" @click="close"></view>

    <view class="modal-content" :class="{ show: isShow }">
      <view class="close" @click="close">
        <image src="http://card-1254165941.cosgz.myqcloud.com/images/tuichu@2x.png"></image>
      </view>

      <view class="modal-title">{{ modalTitle }}</view>
      <view class="textarea-container">
        <textarea v-model="content" placeholder="请输入快捷消息…" placeholder-style="color: #BBBBBB" maxlength="150"></textarea>
        <view class="message-length">{{ content.length }}/150</view>
      </view>

      <button class="btn-primary" @click="save">保存</button>
    </view>

  </view>
</template>

<script>
  export default {
    name: "QuickEditModal",

    data () {
      return {
        isShow: false,
        visible: false,

        content: '',
        currentMessage: null
      }
    },

    computed: {
      modalTitle () {
        return this.currentMessage ? '编辑快捷消息' : '新增快捷消息';
      },
    },

    methods: {
      show (message) {
        this.currentMessage = message;
        this.content = message ? message.content : '';
        this.visible = true;
        this.isShow = true
      },

      close () {
        this.isShow = false;
        setTimeout(() => {
          this.visible = false;
        }, 300);
      },

      save () {
        const action = this.currentMessage
          ? this.$api.updateQuickMessage(this.currentMessage.id, this.content)
          : this.$api.setQuickMessage(this.content);

        uni.showLoading();
        action.then(result => {
          this.$emit('update');
          this.close();
          uni.hideLoading();
        }).catch(error => {
          uni.hideLoading();
          this.showError(error)
        })
      }

    },

  }
</script>

<style scoped lang="less">

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
    top: 50%;
    left: 50%;
    width:690upx;
    height:608upx;
    box-sizing: border-box;
    overflow: hidden;
    border-radius:10upx;
    transition: 0.3s ease;
    padding: 0 30upx;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.5;

    &.show {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      /*transform: initial;*/
    }

  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 40upx;
    width: 24upx;
    height: 24upx;

    image {
      width: 24upx;
      height: 24upx;
      position: absolute;
      right: 20upx;
      top: 20upx;
    }

  }

  .modal-title {
    font-size:32upx;
    color:rgba(51,51,51,1);
    line-height:45upx;
    margin-top: 33upx;
    margin-bottom: 32upx;
    text-align: center;
  }

  .textarea-container {
    position: relative;

    textarea {
      width: 100%;
      height:310upx;
      box-sizing: border-box;
      background:rgba(248,248,248,1);
      border:1px solid rgba(225,225,225,1);
      padding: 24upx 30upx;
    }

    .message-length {
      position: absolute;
      right: 30upx;
      bottom: 24upx;
      font-size:24upx;
      color:rgba(187,187,187,1);
      line-height:33upx;
    }

  }

  .btn-primary {
    width:540upx;
    height:88upx;
    margin-top: 60upx;
  }

  .hide {
    transform: scale(0);
  }

</style>