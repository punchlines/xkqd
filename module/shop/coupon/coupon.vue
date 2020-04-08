<template>

  <view class="page">

    <view class="coupon-list">
      <coupon-item :couponMessage="couponMessage"></coupon-item>
			
			<uni-load-more :loading-type="loadingType" v-if="showLoadMore"></uni-load-more>
			
			<view v-if="couponMessage.length==0" class="default">
				<default-page :messageToPage="messageToPage"></default-page>
			</view>
    </view>

    <view class="footer">
      <button class="btn-primary" @click="back">不使用优惠券</button>
    </view>


  </view>

</template>

<script>

	import {mapState,mapMutations} from 'vuex';
  import couponItem from '../_component/couponItem.vue';
	import uniLoadMore from '@/template/uni-load-more.vue';
		import {formatTime1} from '../../../js/mzl.js'
  export default {

    components: { couponItem,uniLoadMore },

    data () {
      return {
				couponMessage:[],
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wuyouhuiquan.png',
					title:'当前暂无可用优惠券'
				},
				currentPage: 1,
				loading: false,
				noMore: false,
      }
    },
		onShow() {
			// this.getDataDisplay();
			// this.canUseCoupon();
		},
		onReachBottom () {
		  if (this.noMore || this.loading) return;
		  this.canUseCoupon();
		},
		computed: {
		  loadingType() {
		    if (this.noMore) return 2;
		    if (this.loading) return 1;
		    return 0;
		  },
		  showLoadMore () {
		    return this.couponMessage.length > 0;
		  },
			//Vuex引入属性
			...mapState(['couponTitle','couponMoney','couponId', 'currentOrderItem', 'carGoods'])
		},
		onLoad() {
			this.canUseCoupon();
		},
    methods: {
			//Vuex引入方法
			...mapMutations(['orderCouponTitle','orderCouponMoney','orderCouponId']),
			// 获取可用优惠券的列表
			canUseCoupon(){
				this.showLoading();
				if (this.loading) return;
				this.showLoading();
				this.$api.canUseCoupon(this.currentPage,20).then(res=>{
					this.hideLoading();
					this.loading = false;
					console.info(res);
					if (res&&res.couponMessage.length == 0) {
						this.noMore = true;
					}
					
					if(res&&res.couponMessage){
						res.couponMessage.forEach(detail=>{						
								detail.beginTime=formatTime1(detail.beginTime)
								detail.endTime=formatTime1(detail.endTime)
						})
						this.currentPage++;
						this.couponMessage = this.couponMessage.concat(res.couponMessage);
					}
				}).catch(error=>{
					this.showError(error);
					this.hideLoading();
					this.loading = false;
				})
			},
      back () {
			  this.$set(this.currentOrderItem, 'coupon', null)
        uni.navigateBack();
				
      },
    },

  }


</script>

<style scoped lang="less">


  .page {
    background-color: #f5f5f5;
    min-height: 100vh;
    box-sizing: border-box;
    padding-bottom: 100upx;
  }

  .coupon-list {
    padding: 40upx 24upx;
		.default {
			position: fixed;
			top: 50%;
			left: 50%;
			margin-top: -86upx;
			margin-left: -115upx;
		}
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100upx;
    z-index: 100;

    button {
      width: 620upx;
      height: 80upx;
      line-height: 80upx;
      background-color: #AAAAAA;
      &:active {
        background-color: #9b9b9b;
      }
    }

  }


</style>