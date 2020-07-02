<template>
	<view>
		<view class="gift">
			<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.9fSHHuImUoMUba26ac535892cd27766fdd4667619bdd.png"
			 class="gift" @click="showgift" v-show="show" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "gift",
		props: {
			show: {
				type: Boolean,
				value: true
			}
		},
		data() {
			return {};
		},
		methods: {
			showgift() {
				this.$emit('showGift')
			}
		},
	}
</script>

<style lang="less">
	.gift {
		width: 64rpx;
		height: 64rpx;
	}
</style>
