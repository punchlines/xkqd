<template>
  <view class="goods_price" :style="{ fontSize: size + 'upx', color: color }">
		<!-- <text class="update_price">¥220000</text> -->
		<text class="update_price">{{ showInteger }}</text>
		<text class="small">.{{ showDecimal }}</text>
	</view>
</template>

<script>
  export default {
    name: "price",

	data () {
      return {
        showInteger: 0,
        showDecimal: 0,
	  }
	},

    props: {
      size: {
        type: Number,
        default: 32
      },
      color:{
        type:String,
        default:'#FF0007'
      },
      value: {
        type: Number,
        default: 0,
      },
    },

	watch: {
      value () {
        this.showInteger = this.integer(this.value);
        this.showDecimal = this.decimal(this.value);
	  },
	},

	mounted () {
      this.showInteger = this.integer(this.value);
      this.showDecimal = this.decimal(this.value);
	},

    methods: {
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
		color: red;
		font-weight: bold;
		flex: 1;
		letter-spacing: 1upx;
	}
	.update_price{
		font-size: 34upx;
		font-family:Adobe Heiti Std R;
		font-weight:bold;
	}
  .small {
    font-size: 24upx;
    font-weight: normal;
  }

</style>