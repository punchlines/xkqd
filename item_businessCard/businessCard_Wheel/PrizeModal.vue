<template>
  <view class="modal" :class="{ hide: !visible }">

    <view class="modal-mask" :class="{ show: isShow }" @click="close"></view>

    <view class="modal-content" :class="{ show: isShow }">
      <view class="close" @click="close"><image src="http://card-1254165941.cosgz.myqcloud.com/images/tuichu@2x.png"></image></view>

      <image class="icon" src="http://card-1254165941.cosgz.myqcloud.com/images/tuanchuang.jpg" />

      <view class="h3" :class="{ gray: isNoWin }">{{ isNoWin ? '很遗憾' : '恭喜您' }}</view>
      <view class="prize-content">{{ isNoWin ? '什么也没抽到' : '获得' + prize.name }}</view>
			
			 <!-- <button class="btn-primary" @click="next">继续抽奖</button> -->

      <button class="btn-primary" @click="next">继续抽奖</button>

    </view>

  </view>
</template>

<script>
  /**
   * 1：优惠券；2：积分；3：模板；4：抽奖次数；5：谢谢参与
   */
  export default {
    name: "QuickEditModal",

    data () {
      return {
        isShow: false,
        visible: false,

        prize: {},

        user: null,
      }
    },

    computed: {
      isCardTemplate () {
        return this.prize.type == 3;
      },
      isNoWin () {
        return this.prize.type == 5;
      },
    },

    methods: {
      show (prize) {
        this.prize = prize;
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
      },

      next () {
        this.$emit('next')
        this.close();
      },

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
    width:540upx;
    height:598upx;
    box-sizing: border-box;
    overflow: hidden;
    border-radius:10upx;
    transition: 0.3s cubic-bezier(0.25, 0.1, 0.26, 1.22);
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

  .icon {
    width:355upx;
    height:263upx;
    display: block;
    margin: 40upx auto 33upx;
  }

  .h3 {
    font-size:36upx;
    font-weight: bold;
    color:rgba(255,96,96,1);
    line-height:50upx;
    text-align: center;
    &.gray {
      color: #AAAAAA;
    }
  }

  .prize-content {
    text-align: center;
    font-size:28upx;
    color:rgba(51,51,51,1);
    line-height:40upx;
    margin-top: 13upx;
    margin-bottom: 40upx;
  }

  .hide {
    transform: scale(0);
  }

</style>
