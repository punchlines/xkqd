<template>
  <view class="shop_dialog">

    <view class="dialog-background" @click="$emit('close')"></view>

    <view class="dialog-content-container">

      <view class="dialog-content">

        <view class="dialog_title">服务保障</view>

        <template v-for="(item, index) in value">
          <view class="h2">{{ index + 1 }}.{{ item.serviceKey }}</view>
          <view class="text">{{ item.serviceValue }}</view>
        </template>

      </view>

      <button class="btn-primary" @click="$emit('close')">确定</button>
    </view>

  </view>
</template>

<script>


  export default {
    name: "goodsSkuSelectDialog",

    components: {

    },

    props: {
      visible: Boolean,
      value: Array,
    },

    data () {
      return {
        count: 1,
      }
    },

  }
</script>

<style scoped lang="less">


  .h2 {
    font-size: 28upx;
    color: #333333;
    margin-bottom: 8upx;
  }

  .text {
    font-size: 24upx;
    color: #888888;
    line-height: 33upx;
    margin-bottom: 25upx;
  }

</style>