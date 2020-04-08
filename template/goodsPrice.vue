<template>
  <view class="goods_price" :style="{ fontSize: size + 'rpx', color: color }">
		<text class="small">¥</text>
		<text>{{ value | integer }}</text>
		<text class="small">.{{ value | decimal }}</text>
	</view>
</template>

<script>
  export default {
    name: "price",
		props: {
			size: {
				type: Number,
				default: 24
			},
      color: String,
		  value: {
				type: Number,
				default: 0,
		  },
		},
    filters: {
      integer (value) {
        return ~~value;
      },
      decimal (value) {
        if (Math.floor(value) === value) return "00";
        return value.toString().split(".")[1];
      }
    }
  }
</script>

<style scoped lang="less">

  .goods_price {
	  display:inline-block;
	  color: #666;
	flex: 1;
	letter-spacing: 1upx;
	display: inline;
  }

  .small {
    font-size: smaller;
    font-weight: normal;
  }

</style>