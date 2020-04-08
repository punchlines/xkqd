<template>
  <view class="page">
    <image src="http://card-1254165941.cosgz.myqcloud.com/logo/icon.png"></image>
    <view class="h1">销刻渠道</view>
    <view class="download-container">
      <view class="ios" @click="downloadIOS">iOS 下载</view>
      <view class="android" @click="downloadAndroid">Android 下载</view>
    </view>
  </view>
</template>

<script>

  const IOS_URL = 'https://www.pgyer.com/cprs';
  const ANDROID_URL = 'https://www.pgyer.com/cprs';

  export default {
    name: "AppDownload",

    methods: {
      downloadIOS () {
        plus.runtime.openURL(IOS_URL);
      },
      downloadAndroid () {
        plus.runtime.openURL(ANDROID_URL);
      },
    },

  }
</script>

<style scoped lang="less">

  .page {
    text-align: center;
    padding-top: 200upx;
  }

  image {
    width: 260upx;
    height: 260upx;
    margin-bottom: 12upx;
  }

  .h1 {
    font-size: 38upx;
  }

  .download-container {
    margin-top: 100upx;

    view {
      margin: 0 60upx;
      line-height: 80upx;
      color: #ffffff;
      border-radius: 48upx;
      font-size: 30upx;

      &+view {
        margin-top: 46upx;
      }

      &.ios {
        /*background-color: #0b101c;*/
        background-color: #237ec2;
      }

      &.android {
        /*background-color: #a5c736;*/
        background-color: #237ec2;
      }

      &:active {
        background-color: #24639c;
      }

    }

  }

</style>