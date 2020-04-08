<template>
  <view class="goods" @click="openGoodsDetail">
		<!-- <default-image :src="value.covermage" custom-class="goods_cover" ></default-image> -->
		<!-- <view class="goods_img">
			
		</view> -->
			
		<!-- <view class="goods-info"> -->
			<!-- <image :src="value.covermage" class="goods_img"></image>
			<view class="goods_name single-line">{{value.title?value.title:'迪奥小姐花漾淡ANESSA安热沙资生堂小金瓶防'}}</view>
			<view class="goods_meta">
			<price :size="40" :value="value.preferentialPrice"></price>
			<view class="s_add">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/goumai3x.png'" class="btn_add" @click.stop="$emit('addCar',value.goodsId)"></image>
			</view>
         
        </view> -->
		<!-- <view class="lateral-sliding"> -->
			<!-- <view class="lateral-sliding-item" > -->
				<!-- <view class="each-img" > -->
					<image :src="value.covermage" alt="" class="goods-img"></image>
					<view class="goods_name">{{value.title?value.title:'迪奥小姐花漾淡ANESSA安热沙资生堂小金瓶防'}}</view>
					<view class="price">
						<price :size="34" :value="value.preferentialPrice"></price>
						<view class="btn_add">
							<image v-if="isSelfShop" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/more.png'" class="btn_add" @click.stop="$emit('allMoreInfo',value)"></image>
							<image v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/goumai3x.png'" class="btn_add" @click.stop="$emit('addCar',value.goodsId)"></image>
						</view>
					</view>
				<!-- </view> -->
			<!-- </view> -->
		<!-- </view> -->
		
		
      <!-- </view> -->
	  
  </view>
</template>

<script>

  import price from './price';
		
  export default {
		props:['value','shopId','SignIn','cardUserId', 'recommendId','isSelfShop'],
    name: "goodsFour",
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
// .goods {
//   display: flex;
//   overflow-y: hidden;
//   overflow-x: scroll;
// }
.goods {
	margin-right: 15upx;
	width: 245upx;
	height: 378upx;
	background-color:#f5f5f5;
	border-radius: 20upx;
}
// .each-img {
// 	width: 245upx;
// 	height: 378upx;
	.goods-img{
		width: 228upx;
		height: 194upx;
		margin-left: 10upx;
		border-radius: 10upx;
	}
	.goods_name{
		width:239upx;
		height:110upx;
		font-size:24upx;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(127,125,125,1);
		padding-left: 15upx;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;

	}
	.price{
		font-size: 34upx;
		padding-left: 15rpx;
		.btn_add{
			width: 50upx;
			height: 50upx;
			float: right;
			margin-right: 10upx;
			image{
				width: 50upx;
				height: 50upx;
			}
		}
	}
	



</style>