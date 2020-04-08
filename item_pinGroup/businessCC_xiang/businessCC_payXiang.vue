<template>
	<view class="xiang">
		<view class="qing">
			<view class="content">
				<view class="cheng">团长收益来源,查看收益,快速提现</view>
				<view class="list">
					<view class="shou">
                        <view>团长收益有三种来源:团友参团收益,团友开团益,团友团团收益。</view>
						<view>具体说,团长成功的团里有多少个团友下的单,团长
就有多少单10元以上的收益(团友参团收益);团长团友的团友成功开团下的单,团长每一单还有2.5元以上收益(团友团团收益)。</view>
						<view>团长收益在团友购买成功后,T+1自动到账。</view>
                    </view>
					<!-- 1 -->
					<view class="buZhou">1、可在"销刻渠道个人中心"我的钱包中查看"总收入"、"可提现"。可提现金额大于等于100元方可提取。点击"立即提现"</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/6.png"></image>
					</view>
					<!-- 2 -->
					<view class="buZhou">2、输入提现金额,点击"发起提现"</view>
					<view class="img">
						<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/7.png"></image>
					</view>
										
				</view>
				<view class="shou">提现成功后,团长收益直接到"银行卡"。到账后微信服务通知会有消息提醒。</view>
				
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
				width:480upx;
				height:69upx;
				background:rgba(107,120,250,1);
				border-radius:10upx;
				color: #fff;
				text-align: center;
				line-height:69upx;
				margin: 0 auto;
				font-size: 28upx;
			}
			.list{
				.buZhou{
					width: 482upx;
					margin: 0 auto;
					font-size:22upx;
					font-weight:bold;
					color:rgba(51,51,51,1);
					margin-top: 66upx;
					letter-spacing: 3upx;
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
		font-size:18upx;
		font-family:PingFangSC-Regular;
		font-weight:bold;
		color:rgba(102,102,102,1);
		letter-spacing: 5upx;
		margin: 0 auto;
		margin-top: 32upx;
		padding-bottom: 32upx;
		line-height: 36upx;
	}
</style>

