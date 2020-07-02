<template>
  <view class="goods_price" :style="{ fontSize: size + 'rpx', color: color }">
		<!-- <text class="update_price">¥220000</text> -->
		<text class="update_price"><text style="font-size: 12px;">¥</text>{{ showInteger }}</text>
		<text class="small">.{{ showDecimal }}</text>
	</view>
</template>

<script>
  export default {
    name: "price",

	data () {
      return {
        showInteger: 0,
        showDecimal: '00',
	  }
	},

    props: {
      size: {
        type: Number,
        default: 32
      },
      color:{
        type:String,
        default:'#FF5858'
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
	  color: #FF3B30;
    font-weight: bold;
    flex: 1;
		letter-spacing: 1upx;
  }

  .small {
    font-size: 30upx;
    

  }

</style>