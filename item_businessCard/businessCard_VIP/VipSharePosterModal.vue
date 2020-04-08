<template>
  <view class="modal" :class="{ hide: !visible }">

    <view class="modal-mask" :class="{ show: isShow }" @click="close"></view>

    <view class="modal-content" :class="{ show: isShow }">
      <view style="margin: 50upx auto;">
        <image :src="path" class="posterImage" @click="previewImage"></image>
      </view>
      <button class="btn-primary" @click="save">保存到手机</button>
    </view>

  </view>
</template>

<script>
  export default {
    name: "VipSharePosterModal",

    data () {
      return {
        isShow: false,
        visible: false,

        user: null,
        tid: 0,

        init: false,
      }
    },

    props: {
      path: String,
    },

    methods: {
      show() {
        this.isShow = true;
        this.visible = true;
      },
      close () {
        this.isShow = false;
        this.visible = false;
      },
      previewImage () {
        uni.previewImage({
          current: this.path,
          urls: [this.path]
        })
      },
      save () {
        uni.saveImageToPhotosAlbum({
          filePath: this.path,
          success: (res) => {
            uni.showToast('保存成功')
          },
          fail: (err) => {}
        })
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
    /*background:rgba(255,255,255,1);*/
    z-index: 2000;
    top: 50%;
    left: 50%;
    width: 660upx;
    height: 988upx;
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

  .posterImage {
    width: 504upx;
    height: 800upx;
    display: block;
    margin: 0 auto;
  }

  .hide {
    transform: scale(0);
  }



</style>
