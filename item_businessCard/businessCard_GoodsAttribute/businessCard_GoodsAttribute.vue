<template>
	<view class="container">
		<!--<web-view src="https://xk.gzskxx.com/static/index.html#/sku-edit" @message="onMessage"></web-view>-->
		<web-view v-if="url" :src="url" @message="onMessage"></web-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				data: '',
				temp: '',
				url: null
			};
		},


		onLoad(option) {
			this.data = option.data; // 商品编辑
			this.temp = option.temp; // 临时数据
			
			let host = `https://xk.gzskxx.com/static/index.html?t=${new Date().getTime()}#/sku-edit?`;
			if (this.data)
				host = host + 'data=' + encodeURIComponent(this.data);
			else if (this.temp)
				host = host + 'temp=' + encodeURIComponent(this.temp);
			this.url = host;

		},

		methods: {
			onMessage(event) {

				this.setNewGoodsSku(event.detail.data[0]);
				uni.setStorageSync('needForceUpdate', true);
			},
			...mapMutations(['setNewGoodsSku'])
		},

	}
</script>

<style>

</style>
