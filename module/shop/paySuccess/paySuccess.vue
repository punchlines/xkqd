<template>

  <view class="page">

    <view class="info">
      <view class="status">
        <image class="status_image" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/Rectangle17.png'"></image>
        <view>{{ cod ? '提交成功' : '支付成功' }}</view>
      </view>
      <view class="btn-group">
        <button class="btn btn-gray" @click="backHome">返回名片</button>
        <button class="btn btn-primary" @click="continueBuy">继续购物</button>
      </view>
    </view>
	<!-- 猜你喜欢 -->
	 <recommend></recommend>

  </view>

</template>

<script>

	import recommend from '../_component/recommend.vue'
		import {mapState,mapMutations} from 'vuex';
	  export default {

		components: { recommend },

	    data () {
	      return {
					onlineSite:this.global.onlineSite,
          cod: false,
	      }
	    },

      onLoad (option) {
		    this.cod = option.type === 'cod';
      },

        methods: {
          backHome () {
            uni.switchTab({ url: '/pages/businessCard/businessCard' });
          },
          continueBuy () {
            uni.navigateBack({
              delta: 2
            });
          },
        },

		computed: {

			//Vuex引入属性
			...mapState(['cardUserId'])
		},
  }
</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .info {
    background-color: #ffffff;
    padding: 40upx 0;
    margin-bottom: 44upx;
  }

  .status {
    text-align: center;
    font-size: 30upx;
    color: #333333;
    font-weight: bold;
    margin-bottom: 34upx;
    .status_image {
			width: 190upx;
			height: 148upx;
      margin-bottom: 24upx;
    }
  }

  .btn-group {
    display: flex;
    justify-content: center;
    width: 100%;

    .btn {
      width: 240upx;
      height: 80upx;
      line-height: 80upx;
      border-radius: 40upx;
      font-size: 28upx;
      outline: none;
      border: none;
      &+.btn {
        margin-left: 56upx;
      }
    }
		button::after{border:none;}
    .btn-gray {
      background: #F5F5F5;
      color: #666666;
      &:active {
        background: #e7e7e7;
      }
    }

  }


</style>
