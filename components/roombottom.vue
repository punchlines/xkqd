<template>
	<view>
		<view class="room-bottom">
			<!-- 当前商品 start -->
			<goods class="goods" @showgoods="showgoods"></goods>
			<!-- 当前商品 end -->	
			<!-- 消息输入 start -->
			<message class="message" @send-message="sendMessage" :isTimReady="isTimReady" ></message>
			<!-- 消息输入 end -->
			<!-- 送礼物 start -->
			<gift class="gift" @showGift="showGift" :show="show"></gift>
			<!-- 送礼物 end -->
			<!-- 点赞 start -->
			<like class="like" @like="like"></like>
			<!-- 点赞 end -->
			<!-- 点赞 start -->
			<back class="back" @quitGroup="quitGroup" :likeNumber="likeNumber"></back>
			<!-- 点赞 start -->
			
		</view>
	</view>
</template>

<script>
	import like from './like.vue';
	import goods from './goods.vue'
	import message from './message.vue'
	import back from './back.vue'
	import gift from './gift.vue'
	export default {
		name:'roombottom',
		components:{
			like,
			goods,
			message,
			back,
			gift
		},
		props: {
			isTimReady: {
				type: Boolean,
				value: false
			},
			header: {
				type: String,
				value: ''
			},
			likeNumber: {
				type: Number,
				value: 0
			},
			show:{
				type:Boolean,
				value:true
			}
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods: {
			showgoods() {
				this.$emit('showgoods')
			},
			showGift() {
				this.$emit('showGift')
			},
			quitGroup() {
				this.$emit('quitGroup')
			},
			sendMessage(data) {
				this.$emit('send-message', data)
			},
			like() {
				this.$emit('like')
			}
		}
	}
</script>

<style lang="less">
	.goods {
		margin: 0 32rpx 0 32rpx;
		display: inline-block;
		vertical-align: middle
	}

	.gift {
		margin: 0 40rpx 0 70rpx;
		display: inline-block;
		vertical-align: middle
	}

	.like {
		margin-right: 40rpx;
		display: inline-block;
		vertical-align: middle
	}

	.message {
		width: 266rpx;
		height: 66rpx;
		display: inline-block;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 40rpx;
		border-radius: 40rpx;
		vertical-align: middle
	}

	.back {
		display: inline-block;
		vertical-align: middle
	}
</style>
