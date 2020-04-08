<template>

  <view class="container">
    <view class="SuccessTrade">
      <view class="STimage">
					<default-image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/Rectangle17.png'" custom-class="Simage"></default-image>
      </view>
      <view class="STtitle fs3a30">评价成功</view>
      <view class="STbutton fx-row fx-row-center fx-row-space-around">
        <view class="stBack">
          <view class="STgoback fsf28" @click="goback">返回列表</view>
        </view>
        <!-- <view class="stGoodsList">
          <view class="GLitem fsf28">评价商品</view>
        </view> -->
      </view>
    </view>
  </view>

</template>

<script>

  export default {
    data () {
      return {
				onlineSite:this.global.onlineSite,
      }
    },
    methods:{
      goback(){
        uni.setStorageSync('_tempOrderId', 'none');
        uni.navigateBack({
        	delta: 3
        });
      }
    }

  }

</script>

<style lang="less">


	@import '../../css/mzl_base.less';
  .container{
    background:#fff;width:100%;border-top:1upx solid #eee;position: fixed;height:100%;padding:40upx;text-align:center;
    .SuccessTrade{
      margin-top:100upx;
      .STimage{
        .Simage{width:200upx;height: 200upx;vertical-align: middle;}
      }
      .STtitle{margin:30upx 0;}
      .STbutton{
        .stBack{
          .STgoback{
            .buttonRadius(@w:300upx,@h:80upx);
          };
        }
        .stGoodsList{
          margin:50upx 0;
          .GLitem{
            .buttonRadius(@w:240upx,@h:80upx);
          }
        }
      }
    }
}


</style>