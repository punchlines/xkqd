<template>
  <view class="guide" v-if="isFirst" @click="nextStep">

    <view class="mask"></view>

    <image class="guide-item info" v-if="step === 1" src="http://card-1254165941.cosgz.myqcloud.com/guide/wanshanmingpian.png" />

    <image class="guide-item video" v-if="step === 2"  src="http://card-1254165941.cosgz.myqcloud.com/guide/shangchuanshipin.png" />

    <image class="guide-item vip" v-if="step === 3"  src="http://card-1254165941.cosgz.myqcloud.com/guide/kaitongVIP.png" />

    <image class="guide-item journal" v-if="step === 4"  src="http://card-1254165941.cosgz.myqcloud.com/guide/faburizhi.png" />

  </view>
</template>

<script>
  export default {

    name: "CardGuide",

    data () {
      return {
        isFirst: false,
        step: 0,
      };
    },

    props: {
      user: Object,
      hasUploadVideo: Boolean,
      hasPublishJournal: Boolean,
    },

    watch: {
      step () {
        if (this.step === 3) {
          uni.pageScrollTo({
            scrollTop: 3000,
            duration: 300
          });
        }
        if (this.step === 5) {
          this.isFirst = false;
          uni.setStorageSync('notFirstFlag', true);
        }
        this.$emit('stepChange', this.step);
      },
    },

    mounted () {
      //const notFirstFlag = uni.getStorageSync('notFirstFlag');
			const notFirstFlag = true;
      if (!notFirstFlag && uni.getStorageSync('userId')) {
        this.isFirst = true;
        this.step++;
      }
    },

    methods: {
      finish () {
        uni.setStorageSync('notFirstFlag', true);
        this.isFirst = false;
      },
      nextStep () {
        if (this.hasUploadVideo && this.step === 1) {
          uni.pageScrollTo({
            scrollTop: 3000,
            duration: 300
          });
          this.step = 3;
          return;
        }
        if (!this.isNormalUser && (this.step === 1 || this.step === 2 || this.step === 3)) {
          if (this.hasPublishJournal) {
            this.step = 5;
          } else {
            uni.pageScrollTo({
              scrollTop: 3000,
              duration: 300
            });
            this.step = 4;
          }
          return;
        }
        if (this.hasPublishJournal && this.step === 3) {
          this.step = 5;
          return;
        }
        this.step++;
      },
    }

  }
</script>

<style scoped lang="less">

  .guide {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(255, 255, 255, 0.5);
      z-index: 998;
    }

  }

  image {
    position: absolute;
    z-index: 999;
  }

  .info {
    width: 411upx;
    height: 162upx;
    right: 0;
    top: 180upx;
  }

  .video {
    width: 367upx;
    height: 162upx;
    left: 280upx;
    top: 760upx;
  }

  .vip {
    width: 349upx;
    height: 162upx;
    left: 120upx;
    bottom: 70upx;
  }

  .journal {
    width: 472upx;
    height: 162upx;
    left: 0;
    bottom: 550upx;
  }

</style>
