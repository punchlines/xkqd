<template>
	<view class="xiang">
		<view class="qing">
			<view class="content">
				<view class="cheng">成为团长,开团赚钱</view>
				<view class="list">
					<view class="buZhou">1、打开销刻拼团小程序,在首页选择加入商品团</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/1.png"></image>
					</view>
					<!-- 2 -->
					<view class="buZhou">2、选择"加入拼团圈"或查看"拼团详情"</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/2.png"></image>
					</view>
					<!-- 3 -->
					<view class="buZhou">3、选择该商品,立即付费</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/3.png"></image>
					</view>
					<!-- 4 -->
					<view class="buZhou">4、点击"提交订单"</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/4.png"></image>
					</view>
					<!-- 5 -->
					<view class="buZhou">5、添加收货人地址信息,点击"立即支付"</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/5.png"></image>
					</view>						
				</view>
				<view class="shou">支付成功后,就获得了团长资格,并获得了此商品永久发起拼团资格,可以立即发起拼,开团赚提成。
				成为团长后,立即发起拼团,成功后,不但可以获得团长可以获得团长提成,而且这款商品可永久免费开团,从此可以一个团接着一个团的开,可以一直赚佣金。每次发起拼团,只限时间(每个团可以拼48小时),不限人数,团的人数越多,下单越多,收益就越大。</view>
				
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.xiang{
		background: #f5f5f5;
		width: 100%;
		height: 100%;
	}
	.qing{
		padding-top: 20upx;
		.content{
			width: 690upx;
			margin: 0 auto;
			background: #fff;
			padding-top: 26upx;
			.cheng{
				width:380upx;
				height:69upx;
				background:rgba(107,120,250,1);
				border-radius:10upx;
				color: #fff;
				text-align: center;
				line-height:69upx;
				margin: 0 auto;
				
			}
			.list{
				.buZhou{
					font-size:22upx;
					font-weight:400;
					color:rgba(51,51,51,1);
					text-align: center;
					margin-top: 33upx;
				}
				.img{
					margin: 0 auto;
					margin-top: 21upx;
					width: 436upx;
					height: 896upx;					
					image{
						width: 436upx;
						height: 896upx;
					}
				}
			}
		}
	}
	.shou{
		width:490upx;
		height:197upx;
		font-size:16upx;
		font-family:PingFangSC-Regular;
		font-weight:bold;
		color:rgba(102,102,102,1);
		letter-spacing: 5upx;
		margin: 0 auto;
		margin-top: 32upx;
		padding-bottom: 32upx;
		line-height: 29upx;
	}
</style>
