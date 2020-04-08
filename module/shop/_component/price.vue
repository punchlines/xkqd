<template>
  <view class="goods_price" :style="{ fontSize: size + 'upx', color: color }">
		<text class="small">¥</text>
		<text>{{ showInteger }}</text>
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
      	if (!value.toFixed) return '00';
        if (Math.floor(value) === value) return "00";
        return value.toFixed(2).split(".")[1];
      }
    }
  }
</script>

<style scoped lang="less">

  .goods_price {
	  display:inline-block;
	  color: #FF5858;
    font-weight: bold;
    flex: 1;
		letter-spacing: 1upx;
  }

  .small {
    font-size: smaller;
    // font-weight: normal;
  }

</style>
