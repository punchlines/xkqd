<template>
	<view class="creat">
		<view class="imgBox"> 
			<view class="img">
				<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/pay.png"></image>
				<view class="btn">我知道了</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.creat{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.5);
		position:fixed;
		top:0;
		left:0;
		.imgBox{
			width:600upx;
			height:660upx;
			position:absolute;
			top:50%;
			left:50%;
			margin-left:-300upx;
			margin-top:-330upx;
			.img{
				width: 600upx;
				height: 660upx;
				margin: 0 auto;
				border-radius: 5upx;
				image{
					width: 600upx;
					height: 660upx;
				}
				.btn{
					width:400upx;
					height:80upx;
					background:rgba(107,120,250,1);
					border-radius:40upx;
					margin: 0 auto;
					color: #fff;
					font-size: 32upx;
					line-height: 80upx;
					text-align: center;
					position: absolute;
					left: 100upx;
					bottom: 65upx;
				}
			}
		}
		
	}
	
	
</style>
