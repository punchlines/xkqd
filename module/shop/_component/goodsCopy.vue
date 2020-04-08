<template>
  <view class="goods" @click="openGoodsDetail">
		<!-- <default-image :src="value.covermage" custom-class="goods_cover" ></default-image> -->
		<view class="goods_img">
			<image :src="value.covermage" class="goods_cover"></image>
		</view>
			
    <view class="goods-info-container">
      <view class="goods-info">
        <view class="goods_name single-line">{{value.title?value.title:'迪奥小姐花漾淡ANESSA安热沙资生堂小金瓶防'}}</view>
        <view class="goods_meta">
          <price :size="40" :value="value.preferentialPrice"></price>
					<view class="s_add">
						 <image v-if="isSelfShop" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/more.png'" class="btn_add" @click.stop="$emit('allMoreInfo',value)"></image>
						 <image v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/goumai3x.png'" class="btn_add" @click.stop="$emit('addCar',value.goodsId)"></image>
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
    name: "goodsCopy",
		data(){
			return{
				onlineSite:this.global.onlineSite,
			}
		},
    components: {
      price,
    },
		onLoad() {
			//console.log(this.isSelfShop)
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
		width: 334upx;
    height: 535upx;
    margin-bottom: 30upx;
		border-radius: 8upx;
		position: relative;
		margin-right: 9upx;
  }
	.goods_img{
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		background-color: #eee;
		position: relative;
		.goods_cover {
			width: 100%;
			height: 100%;
			position: absolute;
		}
	}
  

  .goods-info-container {
		background-color: #FFFFFF;
		padding: 0 20upx;
		padding-top: 30upx;
		// padding-bottom: 37upx;
  }

  .goods-info {
    // padding: 0 30upx;
  }

  .goods_name {
    font-size: 32upx;
    color: #333333;
    font-weight: bold;
    margin-bottom: 30upx;
  }

  .goods_meta {
    .s_add{
			text-align: right;
			.btn_add {
			  width: 50upx;
			  height: 50upx;
			}
		}
    
  }

</style>