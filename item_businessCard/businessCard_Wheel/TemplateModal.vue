<template>
  <view class="modal" v-if="visible">

    <view class="modal-mask" :class="{ show: isShow }" @click="close"></view>

    <view class="modal-content" :class="{ show: isShow }">
      <view @click="$refs.template.preview()" v-if="init" style="margin: 50upx auto;">
        <!-- <template1 ref="template" :user="user" v-if="user" :cardIndex="tid" no-lazy custom-class="modalTemplate"></template1> -->
      </view>
      <button class="btn-primary" @click="next">保存到手机</button>
    </view>

  </view>
</template>

<script>
  // import template1 from '@/pages/CardTemplate/template/template1.vue';


  export default {
    name: "QuickEditModal",

    // components: { template1},

    data () {
      return {
        isShow: false,
        visible: false,

        user: null,
        tid: 0,

        init: false,
      }
    },

    methods: {
      onLoad () {
        const user = Object.assign({}, this.currentUser);
        user.headImage = user.headImage
            .replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
            .replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
        this.$api.getShareQRCodeUrl().then(result => {
          let shareQRCodeUrl = result.WXCodeUrl || result.shareQRCodeUrl;
          shareQRCodeUrl = shareQRCodeUrl.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
          console.log(shareQRCodeUrl);
          uni.getImageInfo({
            src: user.headImage,
            success: res => {
              console.log(res);
              user.headImage = res.path;

              uni.getImageInfo({
                src: shareQRCodeUrl,
                success: res => {
                  user.shareQRCodeUrl = res.path;
                  this.user = user;
                  this.init = true;
                  uni.hideLoading()
                },
                fail: error => {
                  this.user = user;
                  this.init = true;

                  this.$nextTick(() => {
                    if (this.$refs.template) {
                      this.$refs.template.draw();
                    }
                  })

                  // this.showError(error);
                  uni.hideLoading();
                }
              })
            },
            fail: error => {
              this.showError(error);
              uni.hideLoading();
            }
          })
        }).catch(error => {
          uni.hideLoading()
          this.showError(error);
        })
      },

      show () {
        this.visible = true;
        this.isShow = true

        this.tid = Math.floor(Math.random() * 4) + 1;
        uni.showLoading();
        this.onLoad();
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
        this.$refs.template.exportImage();
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
    width: 660upx;
    height: 928upx;
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
