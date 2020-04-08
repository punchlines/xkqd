<template>
  <view class="order">

    <!--&lt;!&ndash; # 店铺信息 goodsImage&ndash;&gt;-->
    <view class="shop_info">
      <image class="logo" mode="aspectFill" :src='value1.value[0].shopLogo' ></image>
      <text class="name">{{value1.value[0].shopName}}</text>
    </view>

    <!-- 订单商品列表 -->
    <view class="goods-list" v-for="(item,index) in value1.value">
      <view class="goods">
        <image class="cover"   mode="aspectFill"  :src='item.goodsImage' ></image>
        <view class="goods-info">
          <view class="goods_name single-line">{{item.goodsTitle}}</view>
          <view class="goods_sku">{{item.propertySku_S}}</view>
          <view class="footer">
            <view class="price"><price :size="36" :value="item.discountPrice" color="#151515"></price></view>
            <view class="count">x{{item.goodsNum}}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- options -->
    <view class="option-list">

      <!--<view class="option" v-if="false">-->
        <!--<text class="label">购买数量</text>-->
        <!--<view class="value">-->
          <!--<number-input></number-input>-->
        <!--</view>-->
      <!--</view>-->
      <view class="option">
        <text class="label">快递费</text>
        <text class="value">¥{{value1.franking}}</text>
      </view>
      <!-- <view class="option right"  @click="openCoupon">
        <text class="label">优惠券</text>
        <text v-if="value1.coupon" class="value" style="color: #666666;">{{ value1.coupon.nameCoupon }}元券</text>
      </view> -->
      <view class="option">
        <text class="label" style="flex: initial">买家留言：</text>
        <input type="text" placeholder="填写内容已和卖家协商" v-model="remark" @blur='remarkCallback'>
      </view>
    </view>
		<!-- -couponMoney -->

    <view class="total">共{{itemGoodsNum}}件商品，应付金额：<price :size="36" :value="itemTotalPrice" color="#151515"></price></view>


  </view>
</template>

<script>


  import price from "../_component/price"
	import {mapState} from 'vuex';

  export default {
    name: "orderItem",
		data(){
			return{
				//备注
				remark:''
			}
		},
		props:['value1'],
		components: { price },
		methods: {
			//回调函数
			remarkCallback(){
				if(this.remark){
					this.$emit('remarkTap',{remark:this.remark,shopId:this.value1.value[0].shopId})
				}
			},
			openCoupon () {
			  this.$store.commit('setCurrentOrderItem', this.value1);
			  uni.navigateTo({ url: '../coupon/coupon' });
			},
			propertySkuTap(arr){
				let nameS=''
				for(var i=0;i<arr.length;i++){
					nameS+=nameS?'-'+arr[i]:arr[i]
				}
				return nameS;
			}
		},
		computed:{
      couponMessage () {
        const coupon = this.value1.coupon;
        return coupon ? coupon.nameCoupon : '';
      },
      couponMoney () {
        return this.value1.coupon ? this.value1.coupon.preferentialMoney : 0;
      },
			//Vuex引入属性
			...mapState(['couponTitle']),
			itemTotalPrice(){
				let that=this;
				let a=0
				for(let item of that.value1.value){
					a+=item.discountPrice*item.goodsNum
				}
				return a;
			},
			showTotal () {
        const couponMoney = this.value1.coupon ? this.value1.coupon.preferentialMoney : 0;
        return (this.itemTotalPrice + this.value1.franking - couponMoney > 0 ? (this.itemTotalPrice + this.value1.franking - couponMoney) : 0).toFixed(2)
			},
			itemGoodsNum(){
				let that=this;
				let b=0
				for(let item of that.value1.value){
					b+=item.goodsNum
				}
				return b;
			},

		}
  }

</script>

<style scoped lang="less">
  .order {
    background: #FFFFFF;
    padding: 30upx 0;
    margin-bottom: 24upx;
  }

  .shop_info {
    display: flex;
    align-items: center;
    padding: 0 30upx;
    margin-bottom: 30upx;
    .logo {
      width: 60upx;
      height: 60upx;
      margin-right: 20upx;
    }
    .name {
      font-size: 28upx;
      color: #333333;
    }
  }

  .goods-list {
    background: #F8F8F8;
    margin-bottom: 18upx;
  }

  .goods {
    padding: 32upx;
    display: flex;
    .cover {
      width: 160upx;
      height: 160upx;
      margin-right: 22upx;
    }
    .goods-info {
      width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .goods_name {
      font-size: 28upx;
      color: #333333;
      margin-bottom: 24upx;
    }
    .goods_sku {
      font-size: 24upx;
      color: #666666;
      flex: 1;
    }
    .footer {
      display: flex;
      align-items: center;
    }
    .price {
      font-size: 36upx;
      color: #151515;
      flex: 1;
    }
    .count {
      font-size: 24upx;
      color: #333333;
    }
  }

  .option-list {
    margin-bottom: 28upx;
    padding: 0 30upx;
    .option {
      display: flex;
      height: 101upx;
      align-items: center;
      border-bottom: 1upx solid #EEEEEE;
      .label {
        font-size: 28upx;
        color: #333333;
        flex: 1;
      }
      .value {
        font-size: 28upx;
        color: #333333;
      }
      &.right {
        &:active {
          background-color: #eee;
        }
        &:after {
          content: "";
          width: 22upx;
          height: 22upx;
          background-size: 100% 100%;
          background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTM2MC43MzEsMjI5LjA3NWwtMjI1LjEtMjI1LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwcy01LjMsMTMuOCwwLDE5LjFsMjE1LjUsMjE1LjVsLTIxNS41LDIxNS41ICAgYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0YzMuNCwwLDYuOS0xLjMsOS41LTRsMjI1LjEtMjI1LjFDMzY1LjkzMSwyNDIuODc1LDM2NS45MzEsMjM0LjI3NSwzNjAuNzMxLDIyOS4wNzV6ICAgIiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
          margin-left: 17upx;
        }
      }
      input {
        font-size: 28upx;
        flex: 1;
      }
    }
  }

  .total {
    font-size: 28upx;
    color: #333333;
    text-align: right;
    padding: 0 30upx;
  }



</style>
