<template>

  <view class="container top">
      <view class="invoiceManage">
        <view class="Invoicing fx-row fx-row-center fx-row-space-around borderB" @click="Invoicing">
          <view class="Ititle fs3a28">开具发票</view>
          <view class="Iimage">
            <image class="IIMG" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
          </view>
        </view>
        <view class="Invoicing fx-row fx-row-center fx-row-space-around" @click="InvoiceRecord">
          <view class="Ititle fs3a28">发票记录</view>
          <view class="Iimage">
            <image class="IIMG" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/right.png'" alt=""></image>
          </view>
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
		// 开发票
      Invoicing(){
				uni.navigateTo({
					url: '../myself_drawAbillGoodsList/myself_drawAbillGoodsList'
				});
			},
			// 发票记录
			InvoiceRecord(){
				uni.navigateTo({
					url: '../myself_invoiceRecord/myself_invoiceRecord'
				});
			},	
    }
  }

</script>

<style scoped lang="less">

  @import '../../css/mzl_base.less';
  page{width:100%;height: 100%;background:@grayBg;}
  .container{
    background:@grayBg;width:100%;height: 100%;background:@grayBg;
    .invoiceManage{
      margin-top:40upx;background: #fff;
      .Invoicing{
        padding:30upx;
        .Ititle{width:50%;text-align: left;}
        .Iimage{
          width:50%;text-align: right;
          .IIMG{width:12upx;height:24upx;vertical-align: middle;}
        }
      }
    }
  }
</style>