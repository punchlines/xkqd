<template>
	<view>
		<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.WmpgBVeqBFv86a44562de0c2981a6eaa6fedcff632c7.png"
		 class="room-back" @click="back" />
	</view>
</template>

<script>
	export default {
		name:"back",
		data() {
			return {

			};
		},
		methods: {
			back() {
				this.$emit('quitGroup')
			}
		}
	}
</script>

<style lang="less">
	.room-back {
		width: 32px;
		height: 32px;
	}
</style>
