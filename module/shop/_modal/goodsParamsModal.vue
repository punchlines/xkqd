<template>
  <view class="shop_dialog">

    <view class="dialog-background" @click="$emit('close')"></view>

    <view class="dialog-content-container">

      <view class="dialog-content">

        <view class="dialog_title">产品参数</view>

        <view class="row" v-for="option in value">
          <view class="label">{{ option.name }}</view>
          <view class="value">{{ option.value }}</view>
        </view>

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



  }
</script>

<style scoped lang="less">

  .row {
    display: flex;
    margin-bottom: 30upx;

    .label {
      display: inline-block;
      font-size: 28upx;
      color: #999999;
      width: 112upx;
      margin-right: 40upx;
    }
    .value {
      font-size: 28upx;
      color: #333333;
      display: inline-block;
    }

  }


</style>