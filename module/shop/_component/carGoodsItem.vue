<template>

  <view class="car_goods_item">
    <view class="car-goods-container">
      <view class="car-check">
				<view class="inputImage" @click="changeValue">
					<image class="inputImage" v-if="newVal" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouxuan.png'"></image>
					<image class="inputImage" v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouxuan_un.png'"></image>
				</view>
			</view>
      <view class="container">
        <img class="cover">
        <view class="content">
          <view class="name single-line">
            <view class="mod_tag">品牌</view>
            悦诗风吟绿茶精粹保湿洁面乳
          </view>
          <view class="sku">化妆品净含量 60ml</view>
          <view class="footer">
            <view class="price"><price :size="36"></price></view>
            <view class="numberInput"></view>
          </view>
        </view>
      </view>
    </view>
    <button class="btn-delete">删除商品</button>
  </view>

</template>

<script>
  import price from '../_component/price';

  export default {
		data(){
			return{
				onlineSite:this.global.onlineSite,
				newVal: false,
			}
		},
		watch: {
			newVal () {
				this.$emit('input', this.newVal);
			},
			value () {
				this.newVal = this.value
			},
		},
		mounted () {
			this.newVal = this.value;
		},
		methods:{
			changeValue () {
				if (this.disabled) return;
						this.newVal = !this.newVal
			},
		},
    components: { price },

  }

</script>

<style scoped lang="less">

	.inputImage{
		width: 30upx;
		height: 30upx;
		display: inline-block;
	}
  .car-check {
    width: 30upx;
    height: 30upx;
    display: inline-block;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .car_goods_item {
    padding-top: 32upx;
    padding-bottom: 24upx;
    border-bottom: 1upx solid #E1E1E1;

    .car-goods-container {
      display: flex;
      align-items: center;
    }
    .car-check {
      margin-left: 16upx;
      margin-right: 23upx;
    }
    .container {
      display: flex;
      margin-bottom: 24upx;
      padding-right: 22upx;
      box-sizing: border-box;
      flex: 1;
    }
    .cover {
      width: 202upx;
      height: 202upx;
      margin-right: 20upx;
    }
    .content {
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 28upx;
      color: #333333;
      margin-bottom: 20upx;
    }
    .mod_tag {
      display: inline-block;
      background: #E0B97A;
      border-radius: 19upx;
      font-size: 20upx;
      color: #FFFFFF;
      padding: 5upx 16upx;
    }
    .sku {
      font-size: 24upx;
      color: #666666;
      line-height: 46upx;
      flex: 1;
    }
    .footer {
      display: flex;
    }
    .price {
      flex: 1;
    }
    .numberInput {

    }
    .btn-delete {
      background: #F8F8FF;
      border-radius: 20upx;
      font-size: 20upx;
      color: #666666;
      line-height: 40upx;
      width: 140upx;
      margin-left: 70upx;
    }
  }







</style>