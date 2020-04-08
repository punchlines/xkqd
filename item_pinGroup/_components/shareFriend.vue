<template>
	<view class="creat" @click.stop="close">
		<view class="imgBox" @click.stop="tap"> 
			<view class="img">
				<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/money.png"></image>
				<view class="dao">
					<view class="time" v-if="otime">
						<text>倒计时</text>
						<text>{{otime}}</text>
						
					</view>
					<view class="quick">赶快邀请好友一起来拼团吧!</view>
				</view>
				<button class="btn shareFriend" @click="share">邀请好友</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			otime:{
				type:String,
				default:""
			}
		},
		methods:{
			share(){
				this.$emit("share")
			},
			close(){
				this.$emit("close")
			},
			tap(){
				
			}
		}
	}
	
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
			z-index: 999;
			.img{
				width: 600upx;
				height: 660upx;
				margin: 0 auto;
				border-radius: 5upx;
				image{
					width: 600upx;
					height: 660upx;
				}
				.dao{
					position: absolute;
					width: 450upx;
					height: 190upx;
					text-align: center;
					left: 75upx;
					bottom: 177upx;
					.time{
						font-size:36upx;
						font-family:PingFangSC-Regular;
						font-weight:bold;
						color:rgba(107,120,250,1);
						margin-top: 52upx;
						letter-spacing: 5upx;
					}
					.quick{
						font-size:20upx;
						font-family:PingFangSC-Regular;
						font-weight:bold;
						color:rgba(107,120,250,1);
						letter-spacing: 4upx;
						margin-top: 13upx;
					}
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
					bottom: 53upx;
				}
			}
		}
		
	}
	
	
</style>

