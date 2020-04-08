<template>
  <view class="modal" :class="{ hide: !visible }">

    <view class="modal-mask" @click="close" :class="{ show: isShow }"></view>

    <view class="modal-content" :class="{ show: isShow }">

      <view class="modal-title">我要推广</view>
      <view class="intro">分享邀约微信好友，生成分享海报</view>

      <view class="share-channel-list">
        <button class="share-channel-item" open-type="share" @click="channelClick('wechat')">
          <view class="share-channel-item-icon">
            <image src="/static/vip/weixin.png"></image>
          </view>
          <view class="share-channel-item-text">微信好友</view>
        </button>
        <button class="share-channel-item" @click="channelClick('poster')">
          <view class="share-channel-item-icon" style="border-color: #6B7AF8">
            <image src="/static/vip/poster.png"></image>
          </view>
          <view class="share-channel-item-text">生成海报</view>
        </button>
      </view>

    </view>

  </view>
</template>

<script>

  import price from '@/components/price';

  export default {

    name: "VipShareModal",

    components: { price },

    data () {
      return {
        isShow: false,
        visible: false,
      }
    },

    props: {
      // visible: Boolean,
    },

    mounted () {
     this.loading = false;
    },

    methods: {


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

      channelClick (chanel) {
        this.$emit('channelClick', chanel);
        this.close();
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
    height: 380upx;
    box-sizing: border-box;
    overflow: hidden;

    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    text-align: center;
    /*opacity: 0.5;*/

    &.show {
      /*opacity: 1;*/
      transform: initial;
    }

  }
  .modal-title {
    font-weight: bold;
    font-size:32upx;
    color:rgba(51,51,51,1);
    line-height:45upx;
    margin-bottom: 10upx;
    margin-top: 34upx;
  }

  .intro {
    font-size:24upx;
    color:rgba(102,102,102,1);
    line-height:33upx;
    margin-bottom: 50upx;
  }

  .share-channel-list {
    display: flex;
    align-items: center;
    justify-content: center;

    .share-channel-item {
      width: 100upx;
      margin-right: 150upx;

      &:last-child {
        margin-right: 0;
      }

      .share-channel-item-icon {
        width:100upx;
        height:100upx;
        border:1px solid rgba(36,188,39,1);
        border-radius: 50%;
        margin-bottom: 18upx;
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 54upx;
          height: 54upx;
        }
      }
      .share-channel-item-text {
        font-size:24upx;
        color:rgba(51,51,51,1);
        line-height:34upx;
      }
    }
  }

  button {
    background: none;
    padding: 0;
    margin: 0;
    &:after {
      display: none;
    }
  }

  .hide {
    transform: scale(0);
  }


</style>
