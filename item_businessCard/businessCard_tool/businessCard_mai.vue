<template>
	<view class="">
		<view class="content-user-text">
			<QSTabs :current="current_1" :tabs="tabs_1" minWidth="375" @change="change($event, '1')" activeBold="true"
			 animationLineWidth="50" defaultColor="#BEBBBF" height="120" lineColor="#566EE3" />
		</view>
		<view class="mai">
			<view class="img" :style="img=='https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/pu.jpg'?'height:3251upx;':'height:2117upx;'">
				<image :src="img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs,


		},
		data() {
			return {
				img:'https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/pu.jpg',
				current_1: 0,
				tabs_1: ['规则说明', '销售攻略'],
			}
		},
		methods:{
			change(index, i) {
				this['current_' + i] = index;
				if(index==0){
					this.img='https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/pu.jpg'
				}
				else{
					this.img='https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/gong.jpg'
				}
			},
		}
		
	}
</script>

<style lang="less">
	.mai {
		.img {
			width: 100%;
			height: 3251upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
