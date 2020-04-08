<template>

  <view class="page">

    <view class="content">
      <image class="logo" :src="shop.logo" mode="aspectFit"></image>
      <view class="name">{{ shop.shopName }}</view>
      <view class="score" v-if="shop.shopScore">综合评分：{{ shop.shopScore }}</view>
      <view class="score" v-if="!shop.shopScore">暂无评分</view>
      <video :src="shop.video"></video>
      <view class="props-list">
        <view class="props-item">
          <view class="label">品类</view>
          <view class="value">{{ shop.shopClassify }}</view>
        </view>
        <view class="props-item">
          <view class="label">公司名称</view>
          <view class="value">{{ shop.companyName }}</view>
        </view>
        <view class="props-item">
          <view class="label">公司地址</view>
          <view class="value">{{ shop.province }}{{ shop.city }}{{ shop.area }}{{ shop.address }}</view>
        </view>
        <view v-if="shop.businessLicence">
          <view class="props-item">
            <view class="label">营业执照</view>
            <view class="value"></view>
          </view>
					<view class="businessImage">
						<image class="license_image" :src="shop.businessLicence"></image>
					</view>
        </view>
      </view>
    </view>

  </view>

</template>

<script>

  //import shopMixins from '../_mixins/shopMixins'

  export default {

    data () {
      return {
        shop: {},
				shopId:0,
      }
    },
		
		onLoad(e) {
			this.shopId=e.shopIdOtherPeople;
		},
		
   // mixins: [shopMixins],
		
    mounted () {
      this.$api.getShopDetail(this.shopId).then(result => {
        this.shop = result.shopData
      })
    },

  }


</script>

<style scoped lang="less">


  .page {
    background-color: #ffffff;
    padding: 40upx;
    box-sizing: border-box;
  }

  .content {
    border: 1upx solid #DDDDDD;
    border-radius: 12upx;
    text-align: center;
    padding: 40upx;
  }

  .logo {
    width: 120upx;
    height: 120upx;
    margin-bottom: 30upx;
  }
  .name {
    font-size: 32upx;
    color: #333333;
    margin-bottom: 8upx;
  }
  .score {
    font-size: 24upx;
    color: #666666;
    margin-bottom: 30upx;
  }
  video {
    width: 100%;
    height: 342upx;
    margin-bottom: 33upx;
    background-color: #000;
  }
  .props-list {
    text-align: left;
  }
  .props-item {
    margin-bottom: 26upx;
    display: flex;
    .label {
      font-size: 28upx;
      color: #333333;
      width: 120upx;
      margin-right: 40upx;
      text-align: justify;
      text-align-last: justify;
    }
    .value {
      font-size: 28upx;
      color: #333333;
      flex: 1;
    }
  }
	.businessImage{
		width: 300upx;
		height: 300upx;
		.license_image {
		  width: 100%;
		  height: 100%;
		}
	}
  



</style>