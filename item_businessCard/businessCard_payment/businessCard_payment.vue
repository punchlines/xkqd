<template>
	<view class="payment">
		<!-- 支付金额 -->
		<view class="pay-e">
			<view class="pay-zhi">支付金额</view>
			<view class="pay-money">￥10.01</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="zhi">
			
			<view class="f-pay" v-for="(item,index) in paymentList" :key="index">
				<view class="img">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/images/'+item.icon"></image>
				</view>
				<view class="wen">
					<view :style="item.subtext?'':'margin-top: 15rpx;'">{{item.text}}</view>
					<view v-if="item.subtext" style="font-size: 26upx;color: #bfc0d2;">{{item.subtext}}</view>
				</view>	
				<view class="sel">
					<view  :class="{active:active==index,fimg:true}" @click="select(index)"></view>
				</view>
				
			</view>
	
			
		</view>
		
		<!-- 确认支付 -->
		<view class="btn">确认支付</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				paymentList:[
					{
						text:"微信支付",
						subtext:"推荐使用微信支付",
						icon:'wei.png'
					},
					{
						text:"支付宝支付",
						subtext:null,
						icon:'zhi.png'
					},
					{
						text:"钱包支付",
						subtext:"可使用余额 ￥100.5",
						icon:'qian.png'
					}
				]
			};
	
			
		},
		
		methods: {
			select(index) {
				this.active = index;
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.pay-e{
		width: 100%;
		height: 200upx;
		line-height: 50upx;
		text-align: center;
		margin-top: 50upx;
		.pay-zhi{
			color: #bbbcbe;
			font-size: 24upx;
		}
		.pay-money{
			color: #000;
			font-weight: bold;
			font-size: 36upx;
		}
	}
	.zhi{
		width: 100%;
		.f-pay{
			display: flex;
			border-bottom: solid 1upx #eee;
			height: 140upx;
			.img{
				margin-top: 50upx;
				flex: 1;
				text-align: center;
				image{
					width: 50upx;
					height: 50upx;
				}
				
			}
			.wen{
				flex: 3;
				margin-top: 35upx;
				line-height: 50upx;
			}
			.sel{
				flex: 1;
				margin-top: 50upx;
				position: relative;
				.fimg{
					width: 50upx;
					height: 50upx;
					background-image: url('http://card-1254165941.cosgz.myqcloud.com/images/rad.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					
					&.active{
						background-image: url('http://card-1254165941.cosgz.myqcloud.com/images/sel.png');
					}
				}
				
			}			
		}
	}
	.btn{
		width:90%;
		height: 100upx;
		margin: 0 auto;
		margin-top: 100upx;
		text-align: center;
		line-height: 100upx;
		background-color: #1296db;
		color: #fff;
		border-radius: 5upx;
	}
</style>
