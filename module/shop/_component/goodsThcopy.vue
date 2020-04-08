<template>
  <view class="goods" @click="openGoodsDetail">
		<!-- <default-image :src="value.covermage" custom-class="goods_cover" ></default-image> -->
			<image :src="value.covermage" class="goods_cover"></image>
    <view class="goods-info-container">
      <view class="goods-info">
        <view class="goods_name single-line">{{value.title?value.title:'迪奥小姐花漾淡ANESSA安热沙资生堂小金瓶防'}}</view>
        <view class="goods_meta">
          <price :size="40" :value="value.preferentialPrice"></price>
					<view class="btn_add">
						<image v-if="isSelfShop" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/more.png'" class="btn_add" @click.stop="$emit('allMoreInfo',value)"></image>
						 <image v-else src="http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/goumai3x.png" @click.stop="$emit('addCar',value.goodsId)"></image>
					</view>
         
        </view>
      </view>
    </view>
  </view>
</template>

<script>

  import price from './price';
		
  export default {
		props:['value','shopId','SignIn','cardUserId', 'recommendId','isSelfShop'],
    name: "goodsThcopy",
		data(){
			return{
				onlineSite:this.global.onlineSite,
			}
		},
    components: {
      price,
    },

    methods: {
			//详情
      openGoodsDetail () {
				this.navigateTo('../goodsDetail/goodsDetail', {
							id: this.value.goodsId,
							shopId:this.shopId,
							SignIn:this.SignIn,
							cardUserId:this.cardUserId,
							recommendId: this.recommendId
				})
      },
    },

  }
</script>

<style scoped lang="less">

  .goods {
    position: relative;
    height: 270upx;
		width: 100%;
    margin-bottom: 30upx;
		z-index:0;
  }

  .goods_cover {
    width: 230upx;
    height: 194upx;
    background-color: #eee;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
  }

  .goods-info-container {
    width: calc(~"100% - "50upx);
    height: 178upx;
    box-sizing: border-box;
    padding-top: 26upx;
    padding-bottom: 40upx;
    background: #FFFFFF;
    box-shadow: 0 0 29upx 0 rgba(97,97,97,0.16);
    border-radius: 20upx;
    position: absolute;
    top: 45upx;
    left: 51upx;
  }

  .goods-info {
    width: calc(~"100% -"234upx);
    float: right;
    box-sizing: border-box;
    padding: 0 10upx;
  }

  .goods_name {
    font-size: 32upx;
    color: #333333;
    font-weight: bold;
  }

  .goods_meta {
    display: flex;
    align-items: center;
		justify-content: space-between;
	padding: 50upx 0 0 115upx;
    .goods_price {
		
    }
    .btn_add {
      width: 56upx;
      height: 56upx;
			margin-right: 12upx;
			margin-top: -17upx;
			image{
				width: 56upx;
				height: 56upx;
			}
    }
  }

</style>