<template>
	<view class="headBox">
		<view class="box">
			<view class="headTop">
				<view class="headImg">
					<view class="top">
						<view class="hImage">
							<!-- 头像 -->
						</view>
						<view class="hCenter">
							<view class="hT">买买买</view>
							<view class="IDnum">ID:44544554</view>
						</view>
						<view class="hRight">
							<text>35.6万人完成拼团</text>
						</view>
					</view>
					<view class="member">
						<!-- 成员 -->
						<view class="CPtitle">
							<image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ren.png"></image>
							<text class="CPtitleName">1</text>
						</view>
						<!-- 话题 -->
						<view class="TTtitle">
							<image class="" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/huati_un.png"></image>
							<text class="TTname">0</text>
						</view>
						<!-- 成员头像 -->
						<view class="groupImg">
							<image src="../../static/images/wode.png"></image>
						</view>
					</view>
					
				</view>
				
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	
</script>
<style lang="less" scoped>
	.headBox{
		background: #f5f5f5;
		height: 1205upx;
	}
	.box{
		width: 100%;
		height: 300upx;
		.headTop{
			width: 100%;
			height: 250upx;
			padding-top: 65upx;
			background-size: 100%;
			background-repeat: no-repeat;
			background-image: url("http://card-1254165941.cosgz.myqcloud.com/cardImages/images/bgcc.png");
		}
		.headImg{
			width: 690upx;
			height: 316upx;
			background:rgba(255,255,255,1);
			border: 1upx solid #fff;
			border-radius:5upx; 
			margin: 0 auto;
			.top{
				// width: 630upx;
				height:216upx;
				margin: 0 auto;
				border-bottom: 1upx solid #f5f5f5;
				display: flex;
				.hImage{
					width: 24%;
					background: #f5f5f5;
					height: 160upx;
					height: 160upx;
					margin-top: 30upx;	
					margin-left: 30upx;
				}
				.hCenter{
					padding: 30upx;
					flex: 2;
					.hT{
						color: #666;
						font-size: 30upx;
						font-weight: 900;
					}
					.IDnum{
						color: #666;
						font-size: 24upx;
						padding: 5upx 0 15upx 0;
					}
				}
				.hRight{
					width:204upx;
					height:50upx;
					line-height: 40upx;
					text-align: center;
					background:rgba(255,197,86,1);
					border-radius:25upx 0upx 0upx 25upx;
					margin-top: 63upx;
					text{
						font-size:20upx;
						font-family:PingFangSC-Regular;
						font-weight:bold;
						color:rgba(245,245,245,1);
					}
				}
			}
			.member{
				display: flex;
				width: 630upx;
				margin: 0 auto;
				.CPtitle {
					padding-top: 30upx;				
					image {
						width: 31upx;
						height: 26upx;
						margin-right: 20upx;
						vertical-align: middle;
					}
				
					text {
						color: #999;
						font-size: 28upx;
					}
				}
				.TTtitle {
					padding-top: 30upx;
					margin-left: 130upx;
					image {
						width: 31upx;
						height: 31upx;
						margin-right: 20upx;
						vertical-align: middle;
					}
				
					.TTname {
						font-size: 28upx;
						color: #999;
					}
				}
				.groupImg{
					flex: 3;
					margin-left: 20upx;
					text-align: right;
					margin-top: 10upx;
			
					image{
						width: 50upx;
						height: 50upx;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>