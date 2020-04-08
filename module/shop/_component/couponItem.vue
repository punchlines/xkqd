<template>
	<view>
		<view class="coupon-item" v-for="item in couponMessage">
		  <view class="left">
		    <view class="coupon-content">
		      <view class="price">
		        <text class="symbol">¥</text> {{item.preferentialMoney}}
		      </view>
		      <view class="coupon-detail">
		        <view class="name">{{item.nameCoupon}}</view>
		        <view class="condition">消费满{{item.satisfiedMoney}}元使用</view>
		        <view class="date">{{item.beginTime}}至{{item.endTime}}</view>
		      </view>
		    </view>
		  </view>
		  <view class="right" @click="useCoupon(item)">
		    <view>立即<br>使用</view><view></view>
		  </view>
		</view>
	</view>

</template>

<script>
	import {mapState,mapMutations} from 'vuex';
  export default {
    name: "orderItem",
		data(){
			return{
				list:[],
			}
		},
		props:{
			couponMessage: {
				type: Object,
				default:null
			}
		},
		mounted() {
			console.log(this.couponMessage);
		},
		computed:{
			 //Vuex引入属性
			...mapState(['couponTitle','couponMoney','couponId', 'currentOrderItem', 'carGoods'])
		},
    methods: {
			//Vuex引入方法
			...mapMutations(['orderCouponTitle','orderCouponMoney','orderCouponId']),
      useCoupon (item) {
				// 如果其它商品已经选择该优惠券，清除该商品的优惠券
				console.log(item, this.carGoods)
				const find = this.carGoods.find(goods => goods.coupon && goods.coupon.couponId === item.couponId)
				console.log(find)
				if (find) {
					find.coupon = null;
				}
				this.$set(this.currentOrderItem, 'coupon', item)
				console.log(this.currentOrderItem)
				uni.navigateBack();
      },
    },

  }

</script>

<style scoped lang="less">


  .coupon-item {
    display: flex;
    height: 200upx;
    margin-bottom: 30upx;

    .left {
      flex: 1;
      background: #FFFFFF;
      border-radius: 10upx;
      padding: 14upx 18upx;
      position: relative;

      &:before, &:after {
        content: "";
        width: 30upx;
        height: 30upx;
        background-color: #f5f5f5;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        border-radius: 50%;
        z-index: 99;
      }

      &:before {

      }

      &:after {
        right: 0;
        top: initial;
        bottom: 0;
        transform: translate(50%, 50%);
      }

      .coupon-content {
        height: 100%;
        border: 1upx solid #E0B97A;
        display: flex;
        align-items: center;
        border-radius: 16upx;

        .price {
          width: 160upx;
          font-size: 60upx;
          color: #F03329;
          text-align: center;
          letter-spacing: -3upx;
          font-weight: bold;

          .symbol {
            vertical-align: middle;
            display: inline-block;
            font-size: 30upx;
            color: #F03329;
          }
        }
      }
      .coupon-detail {
        .name {
          font-size: 30upx;
          color: #333333;
          margin-bottom: 20upx;
        }
        .condition {
          font-size: 20upx;
          color: #999999;
          margin-bottom: 9upx;
        }
        .date {
          font-size: 20upx;
          color: #999999;
        }
      }
    }


    .right {
      background-color: #7483FF;
      color: #ffffff;
      width: 184upx;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 48upx;
      font-size: 28upx;
			position: relative;
			
    &:after {
      content: ' ';
      width: 0;
      height: calc(~"100% -" 10upx);
      position: absolute;
      top: 5upx;
      border-left: 15upx dotted #f5f5f5;
      right: -7.5upx;
    }
			
    }


  }


</style>