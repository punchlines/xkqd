<template>
  <view class="btn_fab" @click="openCar">
    <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouwuche.png'"></image>
    <text>{{value}}</text>
  </view>
</template>

<script>
	// import {isLog} from '../../../js/mzl.js'
  export default {
    name: "carFloatButton",
		data(){
			return{
				onlineSite:this.global.onlineSite,
				userId:0,
			}
		},
		props:{
			value: {
				type: Number,
				default: 0
			}
		},
		onShow () {

		},
    methods: {
      openCar () {
        if (!this.checkHasLogin()) {
          return;
        }
        uni.navigateTo({url: '../car/car'});
      },
    },
  }
</script>

<style scoped lang="less">

  .btn_fab {
    position: fixed;
    right: 30upx;
    bottom: 178upx;


    image {
      width: 100upx;
      height: 100upx;
      background-color: #FFBB45;
      border-radius: 50%;
      box-shadow: 0 4upx 10upx 0 rgba(255,187,69,0.24);
    }

    text {
      position: absolute;
      right: 0;
      top: 0;
      background: #FF5858;
      font-size: 20upx;
      color: #FFFFFF;
      width: 34upx;
      height: 34upx;
      line-height: 34upx;
      text-align: center;
      border-radius: 50%;
    }

  }

</style>