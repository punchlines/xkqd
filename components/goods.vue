<template>
	<view>
		<view class="" >
		<image @tap="showgoods" src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.tsNcSNyRkvf12aff0839e3dcc66d4b8c419ef9658bd7.png" class="goods"  />
	</view>
	</view>
</template>

<script>
	export default {
		name:'goods',
		data() {
			return {
				
			};
		},
		methods : {
		            showgoods(){
						console.log(123)
		                this.$emit('showgoods') 
						
		            }
		        },
	}
</script>

<style type="less">
	.goods {
        width: 64rpx;
        height: 64rpx;
    }
</style>
