<template>
  <view class="download-banner-container">
    <!-- #ifdef H5 -->
    <view class="download-banner">
      <image src="http://card-1254165941.cosgz.myqcloud.com/logo/icon.png"></image>
      <view class="app-name">销刻渠道</view>
      <view class="btn_download" @click="openDownloadPage">下载 APP</view>
    </view>
    <view class="block"></view>
    <!-- #endif -->
  </view>
</template>

<script>
  export default {
    name: "AppShareTopBanner",

    methods: {
      openDownloadPage () {
        uni.navigateTo({ url: '/pages/Download' })
      },
    },

  }
</script>

<style scoped lang="less">

  .download-banner {
    width: 100%;
    height: 120upx;
    background-color: #ffffff;
    border-bottom: 1upx solid #eee;
    position: fixed;
    z-index: 9999;
    display: flex;
    align-items: center;
    font-size: 28upx;
    box-sizing: border-box;
    padding: 0 30upx;

    image {
      width: 80upx;
      height: 80upx;
      margin-right: 30upx;
    }

    .app-name {
      flex: 1;
    }

    .btn_download {
      font-size: 24upx;
      background-color: #7b84f6;
      color: #ffffff;
      padding: 16upx 28upx;
      border-radius: 12upx;
    }

  }

  .block {
    height: 120upx;
  }

</style>