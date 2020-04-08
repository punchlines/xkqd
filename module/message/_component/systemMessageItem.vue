<template>
  <view class="message">
    <view class="content">{{ value1.systemMessage ? value1.systemMessage.message : '' }}</view>
    <view class="date">{{value1.time}}</view>
  </view>
</template>

<script>
  export default {
    name: "systemMessage",
		props:['value1']
  }
</script>

<style scoped lang="less">

  .message {
    padding: 35upx 67upx;
    background-color: #ffffff;
    border-bottom: 1upx solid #e1e1e1;

    &:last-child {
      border-bottom: none;
    }

    .content {
      font-size:30upx;
      color: #666666;
      margin-bottom: 17upx;
    }
    .date {
      font-size:24upx;
      color: #999999;
    }
  }

</style>
