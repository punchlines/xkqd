<template>
  <view class="goods" :class="{ auto: auto }" @click="openGoodsDetail" @longtap="showNoFeel" @touchend="onTouchend">
		<view class="goods_cover">
			<!-- <default-image :src="goods.coverImage"></default-image> -->
			<image class="goods_cover-image" :src="goods.covermage || goods.coverImage" style="width: 100%;height: 100%;position: absolute;"></image>
			<text class="godds_score">评分 {{score}}</text>
		</view>
		<view class="goods_info_container">
			<view class="goods_name single-line">{{ goods.title }}</view>
			<view class="goods_meta">
				<view class="godds_price">
					<price v-model="goods.preferentialPrice"></price>
				</view>
				<text v-if="!showBtn" class="goods_sell_count">已售{{ goods.salesNum||0 }}</text>
				<image v-else-if="isSelfShop" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/more.png'" class="btn_add" @click.stop="$emit('allMoreInfo',goods)"></image>
				<image v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/goumai3x.png'" class="btn_add" @click.stop="$emit('addCar',goods.goodsId)"></image>
			</view>
		</view>
		<!-- 不感兴趣 -->
		<view class="no_feel" v-if="noFeel">
			<view class="button" @click.stop="setUninterestedGoods">不喜欢</view>
		</view>
  </view>
</template>

<script>
  import price from './price';
  export default {
    name: "goodsItem",
    components: {
      price
    },
    data () {
      return {
        noFeel: false,
				lock: false,
      }
    },
	props: {
      goods: Object,
      shopId: String,
      SignIn: Boolean,
      cardUserId: String,
      recommendId: String,
      auto: Boolean,
	  isSelfShop:Boolean,
	  showBtn:{
		  type:Boolean,
		  default:false
	  }
	},
	computed:{
		score:function(){
		  if (!this.goods.score) return 0;
				return this.goods.score==0 ? 0 : this.goods.score.toFixed(1)
		}
	},
    methods: {
      openGoodsDetail () {
				if (this.lock) return;

        this.navigateTo('/module/shop/goodsDetail/goodsDetail',{
          id:this.goods.goodsId || this.goods.id ,
		  shopId: this.shopId || this.goods.shopId,
		  SignIn:this.SignIn,
		  recommendId: this.recommendId,
          cardUserId: this.cardUserId,
        })
      },
      showNoFeel () {
				this.lock = true;
				this.noFeel = true;
      },
			onTouchend () {
				if (this.lock) {
					setTimeout(() => {
						this.lock = false;
					}, 100);
				}
			},
			setUninterestedGoods () {
      	this.$api.setUninterestedGoods(this.goods.goodsId || this.goods.id).then(result => {
      		this.$emit('onUnlike', this.goods);
				}).catch(error => {
					console.error(error)
				})
			},
		},
  }
</script>

<style scoped lang="less">

	.goods {
		//width: calc(~"50% -"9upx);
		width: 334upx;
		margin-right:9upx;
		border-radius: 8upx;
		margin-bottom: 20upx;
		position: relative;

		&.auto {
			width: auto;
		}
		
		&:nth-child(2n) {
			margin-right: 0;
		}
		
		.goods_cover {
			width: 100%;
			padding-bottom: 100%;
			height: 0;
			background-color: #EEEEEE;
			position: relative;
			
			.goods_cover-image {
				width: 100%;
				height: 100%;
				position: absolute;
			}
			
			.godds_score {
				position: absolute;
				bottom: 0;
				right: 20upx;
				width: 100upx;
				height: 40upx;
				line-height: 40upx;
				background: #DDAB5C;
				border-radius: 4px;
				transform: translateY(50%);
				font-size: 20upx;
				color: #FFFFFF;
				text-align: center;
			}
			
		}
		
		.goods_name {
			font-size: 28upx;
			color: #333333;
			margin-bottom: 20upx;
		}
		
		.goods_meta {
			display: flex;
			align-items: center;
				.btn_add {
			  width: 50upx;
			  height: 50upx;
			}
		}
		
		.godds_price {
			flex: 1;
			color: #FF5858;
		}
		
		.goods_sell_count {
			font-size: 24upx;
			color: #999999;
		}
		
		.goods_info_container {
			background-color: #FFFFFF;
			padding: 0 20upx;
			padding-top: 30upx;
			padding-bottom: 37upx;
		}
		
		
	}
	
	.no_feel {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.button {
			width: 140upx;
			height: 140upx;
			background: #7483FF;
			border-radius: 50%;
			font-size: 28upx;
			color: #FFFFFF;
			line-height: 140upx;
			text-align: center;
		}
		
	}

</style>