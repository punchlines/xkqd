<template>
	<view class="card">
		<view class="money_get">
			<view class="money_get_type">
				<view class="text">
					现金收益
				</view>
				<view class="money">
					{{money}}
				</view>
				<view class="btn">
					去提现
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				anchorUserId:'',
				money:0
			}
		},
		onLoad(e) {
			this.anchorUserId=e.anchorUserId
			this.init()
		},
		methods:{
			init(){
				this.anchorUserId=uni.getStorageSync('userId');
				this.$api.getLiveIncome(this.anchorUserId)
					.then(res=>{
						
						this.money=res
						console.log(this.money)
					})
			}
			
		}
	}
</script>

<style lang="less">
	.money_get {
		width: 100%;
		height: 23vh;
		background: #E02E24;

		.money_get_type {
			text-align: center;
			padding-top: 90rpx;

			.text {
				color: #FDCA12;
				font-size: 20px;
			}

			.money {
				color: #FDCA12;
				font-size: 24px;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}

			.btn {
				width: 150rpx;
				background: #fff;
				height: 45rpx;
				border-radius: 25rpx;
				margin: 0 auto;
				padding: ;
				padding-top: 5rpx;
				color: #E02E24;

			}
		}
	}
</style>
