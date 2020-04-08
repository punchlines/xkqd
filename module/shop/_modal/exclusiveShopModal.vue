<template>

  <view class="shop_dialog">

    <view class="dialog-background" @click="$emit('close')"></view>


    <view class="dialog-content-container">
      <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/tuichu.png'" class="close" @click="$emit('close')"></image>
      <view style="text-align: center">
				<image :src="shopData.logo" class="logo"></image>
      </view>
      <view class="name">{{shopData.shopName}}</view>
      <view class="score">综合评分：{{shopData.shopScore}}</view>

      <view class="recommend-container">
        <view class="title">全部商品</view>
        <scroll-view class="goods-list" scroll-x="true">
          <view class="goods" v-for="(item,index) in myShopGoodsList" :key="index" :value="item">
						<image mode="aspectFill" :src="item.covermage" class="goods-image"></image>
            <view class="goods-name">{{item.title}}</view>
          </view>
        </scroll-view>
      </view>

      <view class="footer">
        <img class="qrcode" :src="qrcodeUrl">
        <view>
          <view class="text">扫描或长按二维码</view>
          <view class="text">可查看店铺详情</view>
        </view>
      </view>

    </view>

  </view>

</template>

<script>

  export default {
    name: "exclusiveShopModal",

    props: {
      shopData: Object,     
      shopId: String,
      cardUserId: String,
			status:0,
			pageNo:1,
			
    },

    data (){
      return{
        onlineSite:this.global.onlineSite,
        qrcodeUrl: '',
				 myShopGoodsList:[],
      }
    },
    components: {

    },

     mounted(){
      this.$api.listMyShopGoods(this.shopId,0,1).then(result => {
        this.qrcodeUrl = result.WXCodeUrl;
				const list =result.myShopGoodsList;
				this.myShopGoodsList = this.myShopGoodsList.concat(list);
				
				console.log(list);
				
      }).catch(error => {
					console.log(error);
      })
    },

  }

</script>

<style scoped lang="less">


  .close {
    width: 50upx;
    height: 50upx;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-100% - 20upx);
  }

  .shop_dialog .dialog-content-container {
    text-align: center;
    padding: 50upx 0 0;
    min-height: initial;
  }

  .logo {
    width: 220upx;
    height: 220upx;
    margin-bottom: 30upx;
    display: inline-block;
  }
  .name {
    font-size: 32upx;
    color: #333333;
    margin-bottom: 8upx;
  }
  .score {
    font-size: 24upx;
    color: #666666;
    margin-bottom: 70upx;
  }

  .recommend-container {
    position: relative;
    background: #FFFFFF;
    border: 2upx solid #303030;
    border-radius: 10upx;
    margin: 0 20upx 40upx;
		display: flex;
		white-space: nowrap;
		width:95%;

    .title {
      width: 360upx;
      height: 88upx;
      position: absolute;
      font-size: 30upx;
      color: #333333;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 50%;
      top: 0;
      transform: translateY(-50%) translateX(-50%);
      background-color: #ffffff;

      &:after, &:before {
        display: inline-block;
        content: "";
        width: 19upx;
        height: 32upx;
				background-size: 100% 100%;
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAABACAYAAAB2kAXpAAABbklEQVRoQ83YPWrDQBCG4V2ECwUVaXyKnEGgNDl0mgh0hpwiTQoRFUEorMCGYFv7930zowvswzAI5vXO0Nf3/blpmt9xHL+9FVdALcvy4Zz76bruzQTsgtq27cV7/9m27as67B5qmqYvVdgjVFgvNdgRSg0WQ6nAUlDisFSUKCwHJQbLRYnASlB0WCmKCqtB0WC1KAoMgYLDUCgoDImCwdAoCIyBqoaxUFUwJqoYxkYVwSRQ2TApVBZMEpUMk0YlwTRQUZg0KqldaKCi7UILddguLKBu2oUV1L/lt4S6wqyhdphF1A4bhuF5nud359xTKHlh8Vj5M2cIex8LuHVdT1ZQ0T8/anI5k7q8SS+KJSj6xEpRVFgNigarRVFgCBQchkJBYUgUDIZGQWAMVDWMhaqCMVHFMDaqCCaByoZJobJgkqhkmDQqCaaBisK0UIcwTdRDmDbqLswC6gZmBaXaLmKn4X6+WZrU9a60iAq4P9NvTqYWNPdZAAAAAElFTkSuQmCC');
      }
      &:before { margin-right: 23upx }
      &:after { margin-left: 23upx }

    }
    .goods-list {
			width: 95%;
      display: flex;
      justify-content: space-between;
      padding: 60upx 20upx;
			// height: 200upx;
    }
    .goods {
			// width: 98upx;
			height: 100%;
			display: inline-block;
      position: relative;
			padding-right: 8upx;
    }
    .goods-image {
      width: 190upx;
      height: 190upx;
      border: 2upx solid #303030;
    }
    .goods-name {
      position: absolute;
      bottom: 27upx;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
      line-height: 50upx;
      font-size: 24upx;
      color: #333333;
      width: 162upx;
      border: 2upx solid #303030;
      background-color: #ffffff;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			height: 45upx;
    }
  }

  .footer {
    height: 140upx;
    background: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-right-radius: 20upx;
    border-bottom-left-radius: 20upx;
    .qrcode {
      width: 80upx;
      height: 80upx;
      margin-right: 20upx;
    }
    .text {
      font-size: 24upx;
      color: #666666;
    }
  }



</style>