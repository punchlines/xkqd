<template>

  <view class="container">
    <!-- 物流单号 -->
    <view class="SendGoodsBox">
      <view class="SendGoods fx-row fx-row-center fx-col-space-around">
        <view class="Stitle fs6a28">物流单号</view>
        <view class="Scode fs6a28">
          <input type="number" placeholder="请填写物流单号">
        </view>
        <view class="Sscanning">
          <image class="Simage" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/like_2.png'" alt=""></image>
        </view>
      </view>
    </view>
    <!-- 发货商品列表 -->
    <view class="GoodsList">
      <view class="ProductList" v-for="(item,index) in list" :key="index">
			<view class="ProductItem fx-row fx-row-center fx-row-space-around">
				<view class="PIimage">
					<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
				</view>
				<view class="PIinformation">
					<view class="PFheader fx-row fx-row-top fx-row-space-around">
						<view class="Htitle fs3a28">ANESSA安热沙资生堂小…</view>
					</view>
					<view class="Hdescript fs6a24">化妆品净含量：60ml</view>
					<view class="Hprice fx-row fx-row-center fx-row-space-around">
						<view class="price"><text>¥ </text> 78.00</view>
						<view class="Num fs6a24">× 1</view>
					</view>
				</view>
			</view>
		</view>
    </view>
    <!-- 发货按钮 -->
    <view class="sendProduct">
      <view class="SPbtn">发货</view>
    </view>
  </view>

</template>

<script>
  export default {
    data () {
      return {
			 onlineSite:this.global.onlineSite,
       list:[
					{id:0},{id:1}
				]
      }
    },
    methods:{
    }
  }
</script>

<style scoped lang="less">


	@import '../../css/mzl_base.less';
  .container{
    background:@grayBg;width:100%;border-top:1upx solid #eee;height:100%;position:fixed;
    // 物流单号
    .SendGoodsBox{
      width:100%;background:#fff;padding:30upx;margin-top:30upx;
      .SendGoods{
          .Stitle{width:25%;text-align: left;color:#000;}
          .Scode{width:65%;}
          .Sscanning{
            width:10%;text-align:right;
            .Simage{width:32upx;height: 32upx;vertical-align: middle;}
          }
      }
    }
    // 商品列表
    .GoodsList{
      margin-top:30upx;
        .ProductList{
           border-bottom:1upx solid #eee;background:#fff;
          .ProductItem{
            padding:30upx;
            .PIimage{
              width:25%;
              .Pimage{width:160upx;height: 160upx;}
            }
            .PIinformation{
              width:73%;
              .PFheader{
                height:50upx;
                .Htitle{width:100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
                // .Hrefund{width:30%;text-align: center;line-height: 48upx;height: 48upx;background:#B1B1B1;border-radius:24upx;}
              }
              .Hdescript{
                margin:10upx 0;height:70upx;
              }
              .Hprice{
                height:40upx;
                .price{
                  width:50%;text-align: left;
                  text{font-size:28upx;}
                }
                .Num{width:50%;text-align: right;}
              }
            }
          }
        }
        .ProductList:last-child{border:none;}
    }
    // 按钮
    .sendProduct{
      margin-top:80upx;
      .SPbtn{
        .buttonRadius();color:#fff;font-size:32upx;margin:0 auto;
      }
    }

}


</style>
