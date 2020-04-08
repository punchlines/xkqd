<template>
  <view class="guide" v-if="isFirst" @click="nextStep" @touchmove.stop="myCatchTouch">

    <view class="mask" @touchmove.stop="myCatchTouch"></view>

    <image class="guide-item vip" v-if="step === 1" src="http://card-1254165941.cosgz.myqcloud.com/guide/yaoqinghaoyou.png" />

  </view>
</template>

<script>
  export default {

    name: "ShopGuide",

    data () {
      return {
        isFirst: false,
        step: 0,
      };
    },

    watch: {
      step () {
        if (this.step === 2) {
          this.finish();
        }
        this.$emit('stepChange', this.step);
      },
    },

    mounted () {
      const notFirstFlag = uni.getStorageSync('notShopFirstFlag');
      if (!notFirstFlag && uni.getStorageSync('userId')) {
        this.isFirst = true;
        this.step++;
      }
    },

    methods: {
      finish () {
        uni.setStorageSync('notShopFirstFlag', true);
        this.isFirst = false;
      },
      nextStep () {
        this.step++;
      },
      myCatchTouch () {
        return false;
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

  .vip {
    width: 411upx;
    height: 162upx;
    right: 30upx;
    top: 180upx;
  }

</style>
