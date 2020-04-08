<template>
  <!-- 银行卡管理 -->
  <view class="BankCardManage top" @click="gotoManageCard">
    <view class="BMessage fx-row fx-row-center fx-row-space-around">
      <view class="Mimage">
        <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/yinhangkaguanl.png'"></image>
      </view>
      <view class="Mtitle">
        <view class="MtitleName">银行卡管理</view>
        <view class="MaddCard">当前有{{bankCartListNum || 0}}张银行卡</view>
      </view>
      <view class="MgoBack">
        <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/youzi.png'"></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {

    name: "BankCardManage",
		props:{
			bankCartListNum:Number
		},

    methods: {
      // 管理银行卡
      gotoManageCard(){
		  // return this.showTips("功能维护中")
        uni.navigateTo({
          url: '../myself_bankCardManage/myself_bankCardManage?from=2'
        });
      }
    },

  }
</script>

<style scoped lang="less">

  // 银行卡管理
  .BankCardManage{
    .MtitleName {
      font-size:32upx;
      font-weight: bold;
      color:rgba(51,51,51,1);
      line-height:45upx;
      margin-bottom: 17upx;
    }

    .MaddCard {
      font-size:24upx;
      color:rgba(102,102,102,1);
      line-height:33upx;
    }


    margin:0 auto;
    padding:20upx;box-shadow: 0 0 12px 0 rgba(93,107,229,0.16);border-radius: 10px;height: 180upx;
    box-sizing: border-box;
    .Mimage{
      width:35%;
      image{width:201upx;height:125upx;vertical-align: middle;}
    }
    .Mtitle{
      width:60%;line-height: 60upx;margin-top:25upx;
    }
    .MgoBack{
      width:5%;text-align: right;
      image{width:30upx;height:30upx;vertical-align: middle;}
    }
  }

</style>
