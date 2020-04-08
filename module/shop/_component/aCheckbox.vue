<template>
	<view class="inputImage" @click="changeValue">
		<image class="inputImage" v-if="newVal" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouxuan.png'"></image>
		<image class="inputImage" v-else :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouxuan_un.png'"></image>
	</view>
</template>

<script>
	
	export default {
		
		data () {
			return {
				onlineSite:this.global.onlineSite,
				newVal: false,
			}
		},
		
		props: {
			value: Boolean,
          disabled: Boolean,
		},
		
		watch: {
			newVal () {
				this.$emit('input', this.newVal);
			},
			value () {
				this.newVal = this.value
			},
		},

	  mounted () {
		  this.newVal = this.value;
	  },

	  methods: {
		  changeValue () {
		    if (this.disabled) return;
            this.newVal = !this.newVal
		  },
	  },
		
	}
	
</script>

<style scoped lang="less">
	
	
	image, view {
		width: 30upx;
		height: 30upx;
		display: inline-block;
	}
	
</style>