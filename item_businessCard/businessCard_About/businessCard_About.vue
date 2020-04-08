<template>
	<view>
		<view class="topBox">
			<view class="f-top">
				<image src="http://card-1254165941.cosgz.myqcloud.com/images/2.png"></image>
			</view>
			<view class="qrcode">
				<image src="https://xk.gzskxx.com/QRCODE/?app=qr.get&data=https://xk.gzskxx.com/joinCircle/860_462&level=L&size=6"></image>
		<!-- 		<image src="http://card-1254165941.cosgz.myqcloud.com/images/qrcode.jpg"></image> -->
				<view class="f-miao">扫描二维码，下载销刻渠道APP!</view>
			</view>
		</view>
		<view class="conBox">
			<view class="f-list">
				<text class="f-left">特别声明</text>
				<text class="f-right"> > </text>
			</view>
			<view class="f-list">
				<text class="f-left">使用帮助</text>
				<text class="f-right"> > </text>
			</view>
			<view class="f-list">
				<text class="f-left">给我评分</text>
				<text class="f-right"> > </text>
			</view>
			<view class="f-list">
				<text class="f-left">隐私政策</text>
				<text class="f-right"> > </text>
			</view>
		</view>
		<view class="footBox">
			<view>Copyright©2017-2019</view>
			<view>销刻渠道版权所有</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	.topBox{
		.f-top{
			width: 100%;
			padding-top: 50upx;
			text-align: center;
			image{
				width: 200upx;
				height: 80upx;
			}		
		}
		.qrcode{
			width: 100%;
			text-align: center;
			margin-top: 20upx;
			padding-bottom: 50upx;
			image{
				width: 198upx;
				height: 198upx;
			}
			.f-miao{
				margin-top: 20upx;
				font-size: 30upx;
			}
		}
	}
	.conBox{
		.f-list{
			border-top: 1upx solid #f3f4f6;
			height:100upx;
			font-size: 32upx;
			.f-left{
				float: left;
				margin-left: 40upx;
				line-height: 100upx;
			}
			.f-right{
				float: right;
				color: #bbb;
				font-size: 40upx;
				margin-right: 25upx;
				line-height: 100upx;
				
			}
		}
	}
	.footBox{
		border-top: 1upx solid #f3f4f6;
		width: 100%;
		text-align: center;
		color: #aeafb3;
		font-size: 30upx;
		padding-top: 100upx;
	}
</style>
